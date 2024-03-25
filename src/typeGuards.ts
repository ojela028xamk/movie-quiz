import {
  MovieDetailsResult,
  MovieProductionCompanies,
  MovieResult,
} from './globalTypes'

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

const isValidMovieCompanyObject = (
  companiesArr: MovieProductionCompanies,
): companiesArr is MovieProductionCompanies => {
  const hasNameKey = 'name' in companiesArr

  if (!hasNameKey || typeof companiesArr.name !== 'string') return false

  return true
}

const isValidMovieDetailsData = (
  detailsData: MovieDetailsResult,
): detailsData is MovieDetailsResult => {
  if (!detailsData) return false

  const hasCorrectKeys =
    'budget' in detailsData && 'production_companies' in detailsData

  if (!hasCorrectKeys) return false
  if (typeof detailsData.budget !== 'number') return false

  const isArray = Array.isArray(detailsData.production_companies)

  if (!isArray) return false

  const hasStringNameInObjects = detailsData.production_companies.every(
    isValidMovieCompanyObject,
  )

  if (!hasStringNameInObjects) return false

  return true
}

export { isValidMovieData, isValidMovieDetailsData }
