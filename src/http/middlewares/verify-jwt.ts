// filepath: /C:/Users/DDAL/Desktop/IN Junior/AulaNode/src/http/middlewares/verify-jwt.ts
import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJWT (request: FastifyRequest, reply: FastifyReply) {
     console.log('verifyJWT middleware called'); // Adicione este log
     try {
          const bearerAuth = request.headers.authorization

          if (bearerAuth == null) {
               throw new Error()
          }

          const [, authToken] = bearerAuth.split(" ")

          if (authToken == null || authToken === "") {
               throw new Error()
          }

          await request.jwtVerify();
     } catch (error) {
          console.error('JWT verification failed:', error); // Adicione este log
          return reply.status(401).send({ message: 'Unauthorized' });
     }
}