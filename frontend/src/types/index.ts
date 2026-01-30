export interface User {
  id: string
  phone: string
  role: 'USER' | 'ADMIN'
}

export interface Poll {
  id: string
  title: string
  description?: string
  pollType: 'SINGLE' | 'MULTIPLE'
  maxVotesPerUser: number
  deadline?: string
  creatorId: string
  creator?: {
    phone: string
  }
  createdAt: string
  options: Option[]
  totalVotes: number
  hasVoted?: boolean
}

export interface Option {
  id: string
  pollId: string
  text: string
  voteCount: number
}

export interface Vote {
  id: string
  pollId: string
  userId: string
  optionId: string
  createdAt: string
}
