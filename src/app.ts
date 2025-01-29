import fastify from 'fastify'
import { userRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import { moviesRoutes } from './http/controllers/movies/routes'

export const app = fastify()

app.get('/hello', (request, reply) => {
     return { message: 'Hello Word'}
})

app.register(userRoutes)
app.register(moviesRoutes)

app.setErrorHandler((error, request, reply) => {
     if (error instanceof ZodError) {
          return reply.status(400).send({ message: 'Validation error', issues: error.format()})
     }
     console.log(error)
     return reply.status(500).send({ message: 'Internal server error' })
})