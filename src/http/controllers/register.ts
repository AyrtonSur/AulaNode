import { registerUseCase } from "@/use-cases/register-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

export async function register(request: FastifyRequest, reply: FastifyReply) {
     const registerBodySchema = z.object({
          name: z.string(),
          username: z.string(),
          email: z.string().email(),
          password: z.string().min(6)
     })

     const { name, username, email, password } = registerBodySchema.parse(request.body)

     try {
          await registerUseCase({
               name,
               username,
               email,
               password
          })
     } catch (err) {
          return reply.status(409).send('Email já existente')
     }

     return reply.status(201).send('Usuário criado com sucesso')
}