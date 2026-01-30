import { Request, Response } from 'express'
import prisma from '../utils/prisma'
import { hashPassword, comparePassword } from '../utils/password'
import { generateToken } from '../utils/jwt'

export async function register(req: Request, res: Response) {
  try {
    const { phone, password } = req.body

    // 验证输入
    if (!phone || !password) {
      return res.status(400).json({ error: '手机号和密码都是必填项' })
    }

    // 台灣手機號驗證（10位數字，09開頭）
    const phoneRegex = /^09\d{8}$/
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ error: '請輸入有效的手機號碼（10碼，09開頭）' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: '密碼長度至少6位' })
    }

    // 检查用户是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { phone },
    })

    if (existingUser) {
      return res.status(400).json({ error: '該手機號碼已註冊' })
    }

    // 加密密码
    const hashedPassword = await hashPassword(password)

    // 创建用户
    const user = await prisma.user.create({
      data: {
        phone,
        password: hashedPassword,
        role: 'USER',
      },
      select: {
        id: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    })

    // 生成 JWT token
    const token = generateToken({
      userId: user.id,
      phone: user.phone,
      role: user.role,
    })

    res.status(201).json({
      message: '註冊成功',
      user,
      token,
    })
  } catch (error: any) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { phone, password } = req.body

    // 驗證輸入
    if (!phone || !password) {
      return res.status(400).json({ error: '手機號碼和密碼都是必填項' })
    }

    // 查找用戶
    const user = await prisma.user.findUnique({
      where: { phone },
    })

    if (!user) {
      return res.status(401).json({ error: '手機號碼或密碼錯誤' })
    }

    // 驗證密碼
    const isPasswordValid = await comparePassword(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ error: '手機號碼或密碼錯誤' })
    }

    // 生成 JWT token
    const token = generateToken({
      userId: user.id,
      phone: user.phone,
      role: user.role,
    })

    res.json({
      message: '登入成功',
      user: {
        id: user.id,
        phone: user.phone,
        role: user.role,
      },
      token,
    })
  } catch (error: any) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getMe(req: Request, res: Response) {
  try {
    const authReq = req as any
    const userId = authReq.user?.userId

    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({ user })
  } catch (error: any) {
    console.error('Get me error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
