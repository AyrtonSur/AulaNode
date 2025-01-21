import fastify from 'fastify'

export const app = fastify()

app.get('/', async (request, reply) => {
     return { message: 'Hello, World!' };
});