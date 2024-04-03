import {
  MovieCast,
  MovieCreditsResult,
  MovieCrew,
  MovieDetailsResult,
  MovieImageItem,
  MovieImagesResult,
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
  companyObj: MovieProductionCompanies,
): companyObj is MovieProductionCompanies => {
  const hasNameKey = 'name' in companyObj

  if (!hasNameKey || typeof companyObj.name !== 'string') return false

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

const isValidCrewObject = (crewObj: MovieCrew): crewObj is MovieCrew => {
  const hasDepartmentAndNameKeys = 'department' in crewObj && 'name' in crewObj

  if (!hasDepartmentAndNameKeys) return false
  if (
    typeof crewObj.department !== 'string' ||
    typeof crewObj.name !== 'string'
  )
    return false

  return true
}

const isValidCastObject = (castObj: MovieCast): castObj is MovieCast => {
  const hasCharacterAndNameKeys = 'character' in castObj && 'name' in castObj

  if (!hasCharacterAndNameKeys) return false
  if (typeof castObj.character !== 'string' || typeof castObj.name !== 'string')
    return false

  return true
}

const isValidMovieCreditsData = (
  creditsData: MovieCreditsResult,
): creditsData is MovieCreditsResult => {
  if (!creditsData) return false

  const hasCrewCastKeys = 'crew' in creditsData && 'cast' in creditsData

  if (!hasCrewCastKeys) return false

  const crewIsArr = Array.isArray(creditsData.crew)
  const castIsArr = Array.isArray(creditsData.cast)

  if (!crewIsArr || !castIsArr) return false

  const hasValidCrewObjects = creditsData.crew.every(isValidCrewObject)
  const hasValidCastObjects = creditsData.cast.every(isValidCastObject)

  if (!hasValidCrewObjects || !hasValidCastObjects) return false

  return true
}

const isValidBackdropObject = (
  imageObj: MovieImageItem,
): imageObj is MovieImageItem => {
  const hasFilePath = 'file_path' in imageObj

  if (!hasFilePath) return false

  return true
}

const isValidMovieImagesData = (
  imagesData: MovieImagesResult,
): imagesData is MovieImagesResult => {
  if (!imagesData) return false

  const hasBackdropsKey = 'backdrops' in imagesData

  if (!hasBackdropsKey) return false

  const backdropsIsArr = Array.isArray(imagesData.backdrops)

  if (!backdropsIsArr) return false

  const hasValidBackdropObjects = imagesData.backdrops.every(
    isValidBackdropObject,
  )

  if (!hasValidBackdropObjects) return false

  return true
}

export {
  isValidMovieData,
  isValidMovieDetailsData,
  isValidMovieCreditsData,
  isValidMovieImagesData,
}
