import {
  MovieCreditsResult,
  MovieDetailsResult,
  MovieImagesResult,
  MovieResult,
  QuizData,
} from '../globalTypes'
import {
  isValidMovieCreditsData,
  isValidMovieDetailsData,
  isValidMovieImagesData,
} from '../typeGuards'
import {
  getMovieCredits,
  getMovieDetails,
  getMovieImages,
} from './movieDatabaseService'
import {
  askActorPlaysCharacter,
  askCharacterIsActor,
  askDirector,
  askMovieBudget,
  askProductionCompany,
  askReleaseYear,
} from './questionService'

const hasEnoughData = (
  details: MovieDetailsResult,
  credits: MovieCreditsResult,
  images: MovieImagesResult,
): boolean => {
  const hasProductionCompanies = details.production_companies.length
  const hasDirector = credits.crew.find(
    (member) => member.department === 'Directing',
  )
  const hasActors = credits.cast.length > 5
  const hasImages = images.backdrops.length > 2

  if (!hasProductionCompanies || !hasDirector || !hasActors || !hasImages) {
    return false
  } else {
    return true
  }
}

// https://bost.ocks.org/mike/shuffle/
const shuffleArray = <T>(array: T[]): T[] => {
  let m = array.length,
    t,
    i

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--)

    // And swap it with the current element.
    t = array[m]
    array[m] = array[i]
    array[i] = t
  }

  return array
}

const createNewQuiz = async (data: MovieResult): Promise<QuizData> => {
  const getDetails = await getMovieDetails(String(data.id))
  const getCredits = await getMovieCredits(String(data.id))
  const getImages = await getMovieImages(String(data.id))
  let detailsData: MovieDetailsResult | null = null
  let creditsData: MovieCreditsResult | null = null
  let imagesData: MovieImagesResult | null = null
  let quizData: QuizData = {
    questions: [],
    images: [],
  }

  throw Error
  return Promise.all([getDetails, getCredits, getImages])
    .then((res) => {
      detailsData = res[0] as MovieDetailsResult
      creditsData = res[1] as MovieCreditsResult
      imagesData = res[2] as MovieImagesResult

      if (!isValidMovieDetailsData(detailsData)) throw Error
      if (!isValidMovieCreditsData(creditsData)) throw Error
      if (!isValidMovieImagesData(imagesData)) throw Error

      if (
        detailsData &&
        creditsData &&
        imagesData &&
        hasEnoughData(detailsData, creditsData, imagesData)
      ) {
        const randomIndexList: number[] = []
        const targetLength = 4

        do {
          const randomIndex = Math.floor(Math.random() * 6)
          if (!randomIndexList.includes(randomIndex)) {
            randomIndexList.push(randomIndex)
          }
        } while (randomIndexList.length < targetLength)

        const q1 = askReleaseYear(data.release_date)
        const q2 = askDirector(creditsData.crew)
        const q3 = askProductionCompany(detailsData.production_companies)
        const q4 = askMovieBudget(detailsData.budget)
        const q5 = askActorPlaysCharacter(creditsData.cast, randomIndexList[0])
        const q6 = askActorPlaysCharacter(creditsData.cast, randomIndexList[1])
        const q7 = askCharacterIsActor(creditsData.cast, randomIndexList[2])
        const q8 = askCharacterIsActor(creditsData.cast, randomIndexList[3])

        const quizQuestionsList = shuffleArray([q1, q2, q3, q4, q5, q6, q7, q8])
        const quizImagesList = imagesData.backdrops.slice(0, 3)
        quizData = {
          questions: quizQuestionsList,
          images: quizImagesList,
        }

        return quizData
      } else {
        return quizData
      }
    })
    .catch((err) => {
      return err
    })
}

export { createNewQuiz, shuffleArray }
