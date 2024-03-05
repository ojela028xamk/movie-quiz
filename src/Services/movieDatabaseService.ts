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

const getSearchedMovies = async (searchName: string): Promise<unknown> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNWY5MDE2ZTJlN2Q0Yjc2MTQxZGQ5NGZiNWJjYmUwNCIsInN1YiI6IjY1ZGRkODhiYzQzM2VhMDE0OTNiZTAwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4xfj8Uziplw7TboRPdkIqD64C--aI9HWoyX2ZLVSHUI',
    },
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchName}`,
      options,
    )
    return await response.json()
  } catch (err) {
    throw err
  }
}

export { getSearchedMovies }
