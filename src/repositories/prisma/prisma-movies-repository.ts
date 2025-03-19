import { prisma } from '@/lib/prisma'
import { type Prisma } from '@prisma/client'
import { type MoviesRepository } from '../movies-repository'

export class PrismaMoviesRepository implements MoviesRepository {
  async create(data: Prisma.MovieCreateInput) {
    const movie = await prisma.movie.create({
      data,
    })

    return movie
  }
}
