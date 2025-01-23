import { PrismaSessionsRepository } from "@/repositories/prisma/prisma-sessions-repository"
import { CreateSessionUseCase } from "@/use-cases/create-session-use-case"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function create(request: FastifyRequest, reply: FastifyReply) {
     const createSessionBodySchema = z.object({
          startTime: z.string().transform((str) => new Date(str)),
          movieId: z.string(),
     })

     const { startTime, movieId } = createSessionBodySchema.parse(request.body)

     try {
          const prismaSessionsRepository = new PrismaSessionsRepository
          const createSessionUseCase = new CreateSessionUseCase(prismaSessionsRepository)

          await createSessionUseCase.execute({
               startTime,
               movieId
          })
     } catch (err) {
          throw new Error()
     }

     return reply.status(201).send('Session criada com sucesso')
}