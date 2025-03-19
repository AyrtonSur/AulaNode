import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { GetUserUseCase } from '@/use-cases/get-user-use-case'
import { type FastifyRequest, type FastifyReply } from 'fastify'
import { z } from 'zod'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const getParamsSchema = z.object({
    userId: z.string().uuid(),
  })

  try {
    const { userId } = getParamsSchema.parse(request.params)

    const prismaUsersRepository = new PrismaUsersRepository()
    const getUserUseCase = new GetUserUseCase(prismaUsersRepository)

    const { user } = await getUserUseCase.execute({ userId })

    return await reply.status(200).send({ user })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
