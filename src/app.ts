import fastify from 'fastify'
import { userRoutes } from './http/controllers/users/routes';
import { ZodError } from 'zod';
import { movieRoutes } from './http/controllers/movies/routes';
import { sessionRoutes } from './http/controllers/sessions/routes';

export const app = fastify()

app.get('/', async (request, reply) => {
     return { message: 'Hello, World!' };
});

app.register(userRoutes)
app.register(movieRoutes)
app.register(sessionRoutes)

app.setErrorHandler((error, request, reply) => {
     if (error instanceof ZodError) {
          return reply.status(400).send({ message: 'Validation error', issues: error.format() })
     }
     return reply.status(500).send({ message: 'Internal server error.'} )
})