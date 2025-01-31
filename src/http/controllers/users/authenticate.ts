import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "@/use-cases/authenticate-use-case"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
     const authenticateBodySchema = z.object({        
          email: z.string().email(),        
          password: z.string().min(6)
     })

     const { email, password } = authenticateBodySchema.parse(request.body)

     try {
          const prismaUsersRepository = new PrismaUsersRepository()
          const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)

          const { user } = await authenticateUseCase.execute({
               email,
               password
          })

          const token = await reply.jwtSign({}, {
               sign: {
                    sub: user.id
               }
          })

          const refreshToken = await reply.jwtSign({}, {
               sign: {
                    sub: user.id,
                    expiresIn: '7d'
               }
          })

          return reply
               .status(200)
               .setCookie('refreshToken', refreshToken, {
                    path: '/',
                    secure: true, //frontend não vai conseguir ler este cookie
                    sameSite: true, //esse cookie só vai ser acessivel dentro do mesmo site
                    httpOnly: true, //esse cookie so vai conseguir ser acessado pelo backend e não pelo frontend
               })
               .send({ token })

     } catch (err) {
          throw err
     }
}