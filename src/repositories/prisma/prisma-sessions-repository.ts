import { prisma } from '@/lib/prisma'
import { type Prisma } from '@prisma/client'
import { type SessionsRepository } from '../sessions-repository'

export class PrismaSessionsRepository implements SessionsRepository {
  async create(data: Prisma.SessionUncheckedCreateInput) {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    const seatsPerRow = 8

    const session = await prisma.session.create({
      data: {
        ...data,
        seats: {
          create: Array.from({ length: 40 }).map((_, index) => ({
            number: (index % seatsPerRow) + 1,
            row: rows[Math.floor(index / seatsPerRow)],
            price: 15,
            occupierName: '',
          })),
        },
      },
    })

    return session
  }
}
