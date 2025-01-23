import { FastifyInstance } from "fastify";
import { create } from "./create";

export async function movieRoutes(app: FastifyInstance) {
     app.post('/movies', create)
}