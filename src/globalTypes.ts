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
