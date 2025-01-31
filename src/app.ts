import fastify from 'fastify'
import { userRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import { moviesRoutes } from './http/controllers/movies/routes'
import { sessionsRoutes } from './http/controllers/sessions/routes'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { env } from './env'

export const app = fastify()

app.register(fastifyJwt, {
     secret: env.JWT_SECRET,
     cookie: {
          cookieName: 'refreshToken',
          signed: false,
     },
     sign: {
          expiresIn: '10m'
     }
})

app.register(fastifyCookie)

app.register(userRoutes)
app.register(moviesRoutes)
app.register(sessionsRoutes)

app.setErrorHandler((error, request, reply) => {
     if (error instanceof ZodError) {
          return reply.status(400).send({ message: 'Validation error', issues: error.format()})
     }
     console.log(error)
     return reply.status(500).send({ message: 'Internal server error' })
})