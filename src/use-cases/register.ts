import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"

interface RegisterUseCaseRequest {
     name: string
     username: string
     email: string
     password: string
}

export async function registerUseCase({ name, username, email, password }: RegisterUseCaseRequest) {
     const userWithSameEmail = await prisma.user.findUnique({
          where: {
               email
          }
     })

     if (userWithSameEmail) {
          throw new Error('Email already exists')
     }

     const password_hash = await hash(password, 6)

     await prisma.user.create({
          data: {
               name,
               username,
               email,
               password: password_hash
          }
     })
}