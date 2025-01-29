import { FastifyInstance } from "fastify";
import { create } from "./create";

export async function sessionsRoutes(app: FastifyInstance) {
     app.post('/sessions', create)
}