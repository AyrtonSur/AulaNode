import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExists } from "./errors/user-already-exists-error"

interface RegisterUseCaseRequest {
     name: string
     username: string
     email: string
     password: string
}

export class RegisterUseCase {
     constructor(private usersRepository: UsersRepository) {}

     async execute({name, username, email, password}: RegisterUseCaseRequest) {
          const userWithSameEmail = await this.usersRepository.findByEmail(email)
     
          if (userWithSameEmail) {
               throw new UserAlreadyExists()
          }
     
          const password_hash = await hash(password, 6)

          await this.usersRepository.create({
               name,
               username,
               email,
               password: password_hash
          })
     }
}