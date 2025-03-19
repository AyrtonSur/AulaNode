import { type Movie, type Prisma } from '@prisma/client'

export interface MoviesRepository {
  create: (data: Prisma.MovieCreateInput) => Promise<Movie>
}
