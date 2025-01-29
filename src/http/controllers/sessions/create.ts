import { PrismaSessionsRepository } from "@/repositories/prisma/prisma-sessions-repository"
import { CreateSessionUseCase } from "@/use-cases/create-sessions-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function create(request: FastifyRequest, reply: FastifyReply) {
     const createBodySchema = z.object({
          startTime: z.string().transform((str) => new Date(str)),
          movieId: z.string().uuid()
     })

     const { startTime, movieId } = createBodySchema.parse(request.body)

     try {

          const prismaSessionsRepository = new PrismaSessionsRepository()
          const createSessionUseCase = new CreateSessionUseCase(prismaSessionsRepository)
          await createSessionUseCase.execute({
               startTime,
               movieId
          })
     } catch (err) {
          throw err
     }

     return reply.status(201).send('Sessão criada com sucesso')
}