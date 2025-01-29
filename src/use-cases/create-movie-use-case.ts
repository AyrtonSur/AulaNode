import { MoviesRepository } from "@/repositories/movies-repository"
import { Movie } from "@prisma/client"

interface CreateMovieUseCaseRequest {
     title: string
     genre: string
     ageRating: number
}

interface CreateMovieUseCaseResponse {
     movie: Movie
}


export class CreateMovieUseCase {
     constructor(private MoviesRepository: MoviesRepository) {}

     async execute({ title, genre, ageRating }: CreateMovieUseCaseRequest): Promise<CreateMovieUseCaseResponse> {
          const movie = await this.MoviesRepository.create({
               title,
               genre,
               ageRating
          })
          return { movie }
     }
}