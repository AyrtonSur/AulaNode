import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
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

     const userWithSameEmail = await prisma.user.findUnique({
          where: {
               email
          }
     })

     if (userWithSameEmail) {
          return reply.status(409).send('Email já cadastrado!')
     }

     const password_hash = await hash(password, 6)

     await prisma.user.create({
          data: {
               name,
               username,
               email,
               password: password_hash
          }
     })

     return reply.status(201).send('Usuário criado com sucesso')
}