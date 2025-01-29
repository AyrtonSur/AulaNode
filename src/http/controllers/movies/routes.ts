import { FastifyInstance } from "fastify";
import { create } from "./create";

export async function moviesRoutes(app: FastifyInstance) {
     app.post('/movies', create)
}