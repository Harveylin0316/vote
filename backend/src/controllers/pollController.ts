import { Response } from 'express'
import prisma from '../utils/prisma'
import { AuthRequest } from '../types'

export async function createPoll(req: AuthRequest, res: Response) {
  try {
    const { title, description, pollType, maxVotesPerUser, deadline, options } = req.body
    const userId = req.user?.userId

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' })
    }

    // 验证输入
    if (!title || !options || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ error: 'Title and at least 2 options are required' })
    }

    // 过滤空选项
    const validOptions = options.filter((opt: string) => opt.trim() !== '')
    if (validOptions.length < 2) {
      return res.status(400).json({ error: 'At least 2 valid options are required' })
    }

    // 创建投票
    const poll = await prisma.poll.create({
      data: {
        title,
        description: description || null,
        pollType: pollType || 'SINGLE',
        maxVotesPerUser: maxVotesPerUser || 1,
        deadline: deadline ? new Date(deadline) : null,
        creatorId: userId,
        options: {
          create: validOptions.map((text: string) => ({
            text: text.trim(),
            voteCount: 0,
          })),
        },
      },
      include: {
        creator: {
          select: {
            id: true,
            phone: true,
          },
        },
        options: true,
      },
    })

    res.status(201).json({
      message: 'Poll created successfully',
      poll,
    })
  } catch (error: any) {
    console.error('Create poll error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getPolls(req: AuthRequest, res: Response) {
  try {
    const polls = await prisma.poll.findMany({
      include: {
        creator: {
          select: {
            id: true,
            phone: true,
          },
        },
        options: true,
        _count: {
          select: {
            votes: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    // 计算总投票数
    const pollsWithStats = polls.map((poll) => {
      const totalVotes = poll.options.reduce((sum, opt) => sum + opt.voteCount, 0)
      return {
        ...poll,
        totalVotes,
      }
    })

    res.json({ polls: pollsWithStats })
  } catch (error: any) {
    console.error('Get polls error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getPollById(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params

    const poll = await prisma.poll.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            phone: true,
          },
        },
        options: {
          orderBy: {
            voteCount: 'desc',
          },
        },
        _count: {
          select: {
            votes: true,
          },
        },
      },
    })

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' })
    }

    // 检查用户是否已投票
    let hasVoted = false
    if (req.user?.userId) {
      const userVote = await prisma.vote.findFirst({
        where: {
          pollId: id,
          userId: req.user.userId,
        },
      })
      hasVoted = !!userVote
    }

    const totalVotes = poll.options.reduce((sum, opt) => sum + opt.voteCount, 0)

    res.json({
      poll: {
        ...poll,
        totalVotes,
        hasVoted,
      },
    })
  } catch (error: any) {
    console.error('Get poll error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function vote(req: AuthRequest, res: Response) {
  try {
    const { id } = req.params
    const { optionIds } = req.body
    const userId = req.user?.userId

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' })
    }

    if (!optionIds || !Array.isArray(optionIds) || optionIds.length === 0) {
      return res.status(400).json({ error: 'At least one option is required' })
    }

    // 获取投票信息
    const poll = await prisma.poll.findUnique({
      where: { id },
      include: {
        options: true,
      },
    })

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' })
    }

    // 检查投票是否已结束
    if (poll.deadline && new Date(poll.deadline) < new Date()) {
      return res.status(400).json({ error: 'Poll has ended' })
    }

    // 检查是否已投票
    const existingVotes = await prisma.vote.findMany({
      where: {
        pollId: id,
        userId,
      },
    })

    if (existingVotes.length > 0) {
      return res.status(400).json({ error: 'You have already voted' })
    }

    // 验证选项
    const validOptionIds = poll.options.map((opt) => opt.id)
    const invalidOptions = optionIds.filter((optId: string) => !validOptionIds.includes(optId))

    if (invalidOptions.length > 0) {
      return res.status(400).json({ error: 'Invalid option IDs' })
    }

    // 检查投票数量限制
    if (poll.pollType === 'SINGLE' && optionIds.length > 1) {
      return res.status(400).json({ error: 'Single choice poll allows only one option' })
    }

    if (optionIds.length > poll.maxVotesPerUser) {
      return res.status(400).json({
        error: `Maximum ${poll.maxVotesPerUser} option(s) allowed`,
      })
    }

    // 创建投票记录并更新选项计数
    await prisma.$transaction(
      optionIds.map((optionId: string) =>
        prisma.vote.create({
          data: {
            pollId: id,
            userId,
            optionId,
          },
        })
      )
    )

    // 更新选项投票数
    await prisma.$transaction(
      optionIds.map((optionId: string) =>
        prisma.option.update({
          where: { id: optionId },
          data: {
            voteCount: {
              increment: 1,
            },
          },
        })
      )
    )

    // 返回更新后的投票信息
    const updatedPoll = await prisma.poll.findUnique({
      where: { id },
      include: {
        options: {
          orderBy: {
            voteCount: 'desc',
          },
        },
      },
    })

    const totalVotes = updatedPoll!.options.reduce((sum, opt) => sum + opt.voteCount, 0)

    res.json({
      message: 'Vote submitted successfully',
      poll: {
        ...updatedPoll,
        totalVotes,
        hasVoted: true,
      },
    })
  } catch (error: any) {
    console.error('Vote error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
