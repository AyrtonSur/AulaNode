import fastify from 'fastify'
import { appRoutes } from './http/routes'

export const app = fastify()

app.get('/hello', (request, reply) => {
     return { message: 'Hello Word'}
})

app.register(appRoutes)