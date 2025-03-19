import { type Session } from '@prisma/client'
import { type SessionsRepository } from '@/repositories/sessions-repository'

interface CreateSessionUseCaseRequest {
  startTime: Date
  movieId: string
}

interface CreateSessionUseCaseResponse {
  session: Session
}

export class CreateSessionUseCase {
  constructor(private readonly sessionsRepository: SessionsRepository) {}

  async execute({
    startTime,
    movieId,
  }: CreateSessionUseCaseRequest): Promise<CreateSessionUseCaseResponse> {
    const session = await this.sessionsRepository.create({
      startTime,
      movieId,
    })
    return { session }
  }
}
