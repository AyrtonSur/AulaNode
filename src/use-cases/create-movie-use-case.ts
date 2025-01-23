import { Movie } from "@prisma/client"
import { MoviesRepository } from "@/repositories/movies-repository"

interface CreateMovieUseCaseRequest {
     title: string
     genre: string
     ageRating: number
}

interface CreateMovieUseCaseResponse {
     movie: Movie
}

export class CreateMovieUseCase {
     constructor(private moviesRepository: MoviesRepository) {}

     async execute({ title, genre, ageRating }: CreateMovieUseCaseRequest): Promise<CreateMovieUseCaseResponse> {   
          const movie = await this.moviesRepository.create({
               title,
               genre,
               ageRating
          })
          return { movie }
     }    
}