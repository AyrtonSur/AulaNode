import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { UpdateUserUseCase } from "@/use-cases/update-user-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function update(request: FastifyRequest, reply: FastifyReply) {
     const updateParamsSchema = z.object({
          userId: z.string().uuid()
     })

     const updateBodySchema = z.object({
          name: z.string().optional(),
          username: z.string().optional(),
          email: z.string().email().optional(),
          password: z.string().optional()
     })

     const { userId } = updateParamsSchema.parse(request.params)
     const { name, username, email, password} = updateBodySchema.parse(request.body)

     try {

          const prismaUsersRepository = new PrismaUsersRepository()
          const updateUserUseCase = new UpdateUserUseCase(prismaUsersRepository)
          const user = await updateUserUseCase.execute({
               userId,
               data: {
                    name,
                    username,
                    email,
                    password
               }
          })

          return reply.status(200).send({ user })
     } catch (err) {
          if (err instanceof ResourceNotFoundError) {
               return reply.status(404).send({ message: err.message })
          }
          throw err
     }
}