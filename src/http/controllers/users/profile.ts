import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserUseCase } from '@/use-cases/get-user-use-case'
import { type FastifyRequest, type FastifyReply } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const prismaUsersRepository = new PrismaUsersRepository()
  const getUserUseCase = new GetUserUseCase(prismaUsersRepository)

  const { user } = await getUserUseCase.execute({
    userId: request.user.sub,
  })

  return await reply.status(200).send({
    user: {
      ...user,
      password: undefined,
    },
  })
}
