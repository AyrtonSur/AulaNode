import { SessionsRepository } from "@/repositories/sessions-repostory"
import { Session } from "@prisma/client"

interface CreateSessionUseCaseRequest {
     movieId: string,
     startTime: Date
}

interface CreateSessionUseCaseResponse {
     session: Session
}


export class CreateSessionUseCase {
     constructor(private sessionsRepository: SessionsRepository) {}

     async execute({ movieId, startTime }: CreateSessionUseCaseRequest): Promise<CreateSessionUseCaseResponse> {
          const session = await this.sessionsRepository.create({
               movieId,
               startTime
          })
          return { session }
     }
}