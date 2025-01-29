import { PrismaMoviesRepository } from "@/repositories/prisma/prisma-movies-repository"
import { CreateMovieUseCase } from "@/use-cases/create-movie-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function create(request: FastifyRequest, reply: FastifyReply) {
     const createBodySchema = z.object({
          title: z.string(),
          genre: z.string(),
          ageRating: z.number()
     })

     const { title, genre, ageRating } = createBodySchema.parse(request.body)

     try {

          const prismaMoviesRepository = new PrismaMoviesRepository()
          const createMovieUseCase = new CreateMovieUseCase(prismaMoviesRepository)
          await createMovieUseCase.execute({
               title,
               genre,
               ageRating
          })
     } catch (err) {
          throw err
     }

     return reply.status(201).send('Filme criado com sucesso')
}