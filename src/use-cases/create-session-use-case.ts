import { Session } from "@prisma/client"
import { SessionsRepository } from "@/repositories/sessions-repository"

interface CreateSessionUseCaseRequest {
     startTime: Date,
     movieId: string,
}

interface CreateSessionUseCaseResponse {
     session: Session
}

export class RegisterUseCase {
     constructor(private sessionsRepository: SessionsRepository) {}

     async execute({ startTime, movieId }: CreateSessionUseCaseRequest): Promise<CreateSessionUseCaseResponse> {   
          const session = await this.sessionsRepository.create({
               startTime,
               movieId,
          })
          return { session }
     }    
}