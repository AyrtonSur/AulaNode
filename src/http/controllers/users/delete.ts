import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { DeleteUserUseCase } from "@/use-cases/delete-user-use-case"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
     const deleteParamsSchema = z.object({
          userId: z.string().uuid(),
     })

     try {
          const { userId } = deleteParamsSchema.parse(request.params)

          const prismaUsersRepository = new PrismaUsersRepository()
          const deleteUserUseCase = new DeleteUserUseCase(prismaUsersRepository)

          await deleteUserUseCase.execute({
          userId,
          })

          return reply.status(204).send({ message: 'Usuário deletado com sucesso' })
     } catch (err) {
          if (err instanceof ResourceNotFoundError) {
               return reply.status(404).send({ message: err.message })
          }
          throw err
     }
}