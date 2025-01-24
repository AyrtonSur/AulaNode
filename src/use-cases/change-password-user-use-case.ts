import { UsersRepository } from "@/repositories/users-repository"
import { User } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"
import { compare, hash } from "bcryptjs"

interface ChangePasswordUserUseCaseRequest {
     userId: string,
     password: string,
}

interface ChangePasswordUserUseCaseResponse {
     user: User
}

export class ChangePasswordUserUseCase {
     constructor(private usersRepository: UsersRepository) {}

     async execute( { userId, password }: ChangePasswordUserUseCaseRequest ): Promise<ChangePasswordUserUseCaseResponse> {   

          console.log("userId:", userId);
          console.log("password:", password);

          const user = await this.usersRepository.findById(userId)
          if (!user) {
               throw new ResourceNotFoundError()
          }

          const isSamePassword = await compare(password, user.password)
          if (isSamePassword) {
               throw new Error()
          }

          const password_hash = await hash(password, 6)

          const userUpdated = await this.usersRepository.patchPassword(userId, password_hash)

          if (!userUpdated) {
               throw new ResourceNotFoundError()
          }

          return { user: userUpdated }
     }    
}