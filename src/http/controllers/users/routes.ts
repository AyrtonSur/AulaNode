import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { get } from "./get";
import { deleteUser } from "./delete";
import { changePassword } from "./change-password";

export async function userRoutes(app: FastifyInstance) {
     app.post('/users', register)
     app.post('/authenticate', authenticate)

     app.get('/users/:userId', get)
     
     app.patch('/users/:userId', changePassword)
     
     app.delete('/users/:userId', deleteUser)
}