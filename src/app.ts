import { PrismaClient } from '@prisma/client';
import fastify from 'fastify'
import { z } from 'zod';

export const app = fastify()
const prisma = new PrismaClient()

app.get('/', async (request, reply) => {
     return { message: 'Hello, World!' };
});

app.post('/users', async (request, reply) => {
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
})