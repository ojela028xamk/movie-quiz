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

const getMovieCredits = async (movieId: string): Promise<unknown> => {
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
      `https://api.themoviedb.org/3/movie/${movieId}/credits`,
      options,
    )
    return await response.json()
  } catch (err) {
    throw err
  }
}

export { getSearchedMovies, getMovieCredits }
