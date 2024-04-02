export type MovieSearchResponse = {
  page: number
  results: MovieResult[]
  total_pages: number
  total_results: number
}

export type MovieResult = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type MovieDetailsResult = {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: string
  budget: number
  genres: MovieGenres[]
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: MovieProductionCompanies[]
  production_countries: MovieProductionCountries[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: MovieSpokenLanguages[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type MovieGenres = {
  id: number
  name: string
}

export type MovieProductionCompanies = {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export type MovieProductionCountries = {
  iso_3166_1: string
  name: string
}

export type MovieSpokenLanguages = {
  english_name: string
  iso_639_1: string
  name: string
}

export type MovieCreditsResult = {
  id: number
  cast: MovieCast[]
  crew: MovieCrew[]
}

export type MovieCast = {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}

export type MovieCrew = {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  credit_id: string
  department: string
  job: string
}

export type MovieImagesResult = {
  backdrops: MovieImageItem[]
  id: number
  logos: MovieImageItem[]
  posters: MovieImageItem[]
}

export type MovieImageItem = {
  aspect_ratio: number
  height: number
  iso_639_1: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export type CurrentMovieList = {
  title: string
  image: string
  data: MovieResult
}

export type QuizData = {
  questions: QuizQuestion[]
  images: MovieImageItem[]
}

export type QuizQuestion = {
  question_id: string
  question: string
  answers: QuizAnswer[]
}

export type QuizAnswer = {
  answer_id: string
  answer: string | number
  isCorrect: boolean
}
