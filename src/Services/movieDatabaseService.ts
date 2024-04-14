const token = process.env.REACT_APP_TMDB

const fetchMovieData = async (url: string): Promise<unknown> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    const response = await fetch(url, options)
    return await response.json()
  } catch (err) {
    throw err
  }
}

const getSearchedMovies = async (searchName: string): Promise<unknown> => {
  return fetchMovieData(
    `https://api.themoviedb.org/3/search/movie?query=${searchName}`,
  )
}

const getMovieDetails = async (movieId: string): Promise<unknown> => {
  return fetchMovieData(`https://api.themoviedb.org/3/movie/${movieId}`)
}

const getMovieCredits = async (movieId: string): Promise<unknown> => {
  return fetchMovieData(`https://api.themoviedb.org/3/movie/${movieId}/credits`)
}

const getMovieImages = async (movieId: string): Promise<unknown> => {
  return fetchMovieData(`https://api.themoviedb.org/3/movie/${movieId}/images`)
}

export { getSearchedMovies, getMovieDetails, getMovieCredits, getMovieImages }
