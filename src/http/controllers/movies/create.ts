import { PrismaMoviesRepository } from '@/repositories/prisma/prisma-movies-repository'
import { CreateMovieUseCase } from '@/use-cases/create-movie-use-case'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createMovieBodySchema = z.object({
    title: z.string(),
    genre: z.string(),
    ageRating: z.number(),
  })

  const { title, genre, ageRating } = createMovieBodySchema.parse(request.body)

  try {
    const prismaMoviesRepository = new PrismaMoviesRepository()
    const createMovieUseCase = new CreateMovieUseCase(prismaMoviesRepository)

    await createMovieUseCase.execute({
      title,
      genre,
      ageRating,
    })
  } catch (err) {
    return await reply.status(500).send({ message: 'Failed to create Movie' })
  }
}
