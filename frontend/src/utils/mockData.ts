import { type Poll } from '../types'

// 模拟投票数据
export const mockPolls: Poll[] = [
  {
    id: '1',
    title: '你最喜欢的编程语言是什么？',
    description: '请选择你最熟悉或最喜欢的编程语言',
    pollType: 'SINGLE',
    maxVotesPerUser: 1,
    creatorId: 'user1',
    creator: {
      phone: '0912345678',
    },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    totalVotes: 156,
    options: [
      { id: 'opt1', pollId: '1', text: 'JavaScript', voteCount: 45 },
      { id: 'opt2', pollId: '1', text: 'Python', voteCount: 52 },
      { id: 'opt3', pollId: '1', text: 'Java', voteCount: 28 },
      { id: 'opt4', pollId: '1', text: 'TypeScript', voteCount: 31 },
    ],
  },
  {
    id: '2',
    title: '周末你更想做什么？',
    description: '多选，可以选择多个选项',
    pollType: 'MULTIPLE',
    maxVotesPerUser: 3,
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    creatorId: 'user2',
    creator: {
      phone: '0923456789',
    },
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    totalVotes: 89,
    options: [
      { id: 'opt5', pollId: '2', text: '在家休息', voteCount: 32 },
      { id: 'opt6', pollId: '2', text: '看电影', voteCount: 28 },
      { id: 'opt7', pollId: '2', text: '运动健身', voteCount: 15 },
      { id: 'opt8', pollId: '2', text: '学习新技能', voteCount: 14 },
    ],
  },
  {
    id: '3',
    title: '你最喜欢的框架是？',
    pollType: 'SINGLE',
    maxVotesPerUser: 1,
    creatorId: 'user3',
    creator: {
      phone: '0934567890',
    },
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    totalVotes: 203,
    options: [
      { id: 'opt9', pollId: '3', text: 'React', voteCount: 78 },
      { id: 'opt10', pollId: '3', text: 'Vue', voteCount: 65 },
      { id: 'opt11', pollId: '3', text: 'Angular', voteCount: 35 },
      { id: 'opt12', pollId: '3', text: 'Svelte', voteCount: 25 },
    ],
  },
]

export function getPollById(id: string): Poll | undefined {
  return mockPolls.find(poll => poll.id === id)
}
