import fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'

export const app = fastify()

app.get('/hello', (request, reply) => {
     return { message: 'Hello Word'}
})

app.register(appRoutes)

app.setErrorHandler((error, request, reply) => {
     if (error instanceof ZodError) {
          return reply.status(400).send({ message: 'Validation error', issues: error.format()})
     }
     return reply.status(500).send({ message: 'Internal server error' })
})