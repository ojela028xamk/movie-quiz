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
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
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

export type CurrentMovieList = {
  title: string
  image: string
  data: MovieResult
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
