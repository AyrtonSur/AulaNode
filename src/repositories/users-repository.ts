import { Prisma, User } from "@prisma/client";

export interface UserUpdateInput {
     name?: string
     username?: string
     email?: string
     password?: string
}

export interface UsersRepository {
     create(data: Prisma.UserCreateInput): Promise<User>
     findByEmail(email: string): Promise<User | null>
     findById(id: string): Promise<User | null>
     delete(id: string): Promise<User | null>
     update(id: string, data: UserUpdateInput): Promise<User | null>
}