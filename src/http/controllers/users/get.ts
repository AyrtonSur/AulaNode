import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { UserAlreadyExists } from "@/use-cases/errors/user-already-exists-error"
import { GetUserUseCase } from "@/use-cases/get-user-use-case"
import { RegisterUseCase } from "@/use-cases/register-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function get(request: FastifyRequest, reply: FastifyReply) {
     const getParamsSchema = z.object({
          userId: z.string().uuid()
     })

     const { userId } = getParamsSchema.parse(request.params)

     try {

          const prismaUsersRepository = new PrismaUsersRepository()
          const getUserUseCase = new GetUserUseCase(prismaUsersRepository)
          const user = await getUserUseCase.execute({
               userId
          })

          return reply.status(200).send({ user })
     } catch (err) {
          if (err instanceof ResourceNotFoundError) {
               return reply.status(404).send({ message: err.message })
          }
          throw err
     }
}