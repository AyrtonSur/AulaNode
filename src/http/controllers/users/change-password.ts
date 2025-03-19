import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { ChangePasswordUserUseCase } from '@/use-cases/change-password-user-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { z } from 'zod'

export async function changePassword(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const changePasswordParamsSchema = z.object({
    userId: z.string(),
  })

  const changePasswordBodySchema = z.object({
    password: z.string().min(6),
  })

  try {
    const { userId } = changePasswordParamsSchema.parse(request.params)
    const { password } = changePasswordBodySchema.parse(request.body)

    const prismaUsersRepository = new PrismaUsersRepository()
    const changePasswordUserUseCase = new ChangePasswordUserUseCase(
      prismaUsersRepository,
    )

    const { user } = await changePasswordUserUseCase.execute({
      userId,
      password,
    })

    return await reply.status(200).send({ user })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      reply.status(404).send({ message: err.message })
    }
    
    throw err
  }
}
