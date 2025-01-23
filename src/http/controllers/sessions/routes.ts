import { FastifyInstance } from "fastify";
import { create } from "./create";

export async function sessionRoutes(app: FastifyInstance) {
     app.post('/sessions', create)
}