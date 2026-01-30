import { PrismaClient } from '@prisma/client'

// 确保 Prisma Client 是单例
const prisma = new PrismaClient()

export default prisma
