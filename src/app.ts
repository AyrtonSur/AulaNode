import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'
import { z } from 'zod'

export const app = fastify()
const prisma = new PrismaClient()

app.get('/hello', (request, reply) => {
     return { message: 'Hello Word'}
})

app.post('/', async (request, reply) => {
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
               password
          }
     })

     return reply.status(201).send('Usuário criado com sucesso')
})