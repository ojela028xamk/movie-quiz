const token = process.env.REACT_APP_TMDB

const getSearchedMovies = async (searchName: string): Promise<unknown> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
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

const getMovieDetails = async (movieId: string): Promise<unknown> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}`,
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
      Authorization: `Bearer ${token}`,
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

const getMovieImages = async (movieId: string): Promise<unknown> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/images`,
      options,
    )
    return await response.json()
  } catch (err) {
    throw err
  }
}

export { getSearchedMovies, getMovieDetails, getMovieCredits, getMovieImages }
