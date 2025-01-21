import { FastifyRequest, FastifyReply } from "fastify"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

export async function register(request: FastifyRequest, reply: FastifyReply) {
     const registerBodySchema = z.object({
          name: z.string(),
          username: z.string(),          
          email: z.string().email(),        
          password: z.string().min(6)
     })

     const { name, username, email, password } = registerBodySchema.parse(request.body)

     await prisma.user.create({
          data: {
               name,
               username,
               email,
               password,
          }
     })

     return reply.status(201).send('Usuário criado com sucesso')
}