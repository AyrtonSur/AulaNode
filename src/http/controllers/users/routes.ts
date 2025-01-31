import { FastifyInstance } from "fastify";
import { register } from './register';
import { authenticate } from "./authenticate";
import { get } from "./get";
import { deleteUser } from "./delete";
import { update } from "./update";
import { profile } from "./profile";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function userRoutes(app: FastifyInstance) {
     app.post('/users', register)
     app.post('/authenticate', authenticate)

     app.get('/users/:userId', get)

     app.delete('/users/:userId', deleteUser)

     app.patch('/users/:userId', update)

     //Authenticated
     app.get('/profile', {onRequest: [verifyJWT]}, profile)
}