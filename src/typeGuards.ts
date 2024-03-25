import { MovieResult } from './globalTypes'

const isValidMovieDataObject = (data: MovieResult): data is MovieResult => {
  const hasCorrectKeys =
    'id' in data &&
    'poster_path' in data &&
    'release_date' in data &&
    'title' in data

  if (!hasCorrectKeys) return false
  if (
    typeof data.id !== 'number' ||
    (typeof data.poster_path !== 'string' && data.poster_path !== null) ||
    typeof data.release_date !== 'string' ||
    typeof data.title !== 'string'
  ) {
    return false
  }

  return true
}

const isValidMovieData = (dataArr: MovieResult[]): dataArr is MovieResult[] => {
  const isArray = Array.isArray(dataArr)

  if (!isArray) return false

  const hasValidObjects = dataArr.every(isValidMovieDataObject)

  if (!hasValidObjects) return false

  return true
}

export { isValidMovieData }
