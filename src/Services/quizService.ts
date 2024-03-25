import {
  MovieCreditsResult,
  MovieDetailsResult,
  MovieResult,
  QuizAnswer,
  QuizQuestion,
} from '../globalTypes'
import { getMovieCredits, getMovieDetails } from './movieDatabaseService'
import {
  askActorPlaysCharacter,
  askCharacterIsActor,
  askDirector,
  askMovieBudget,
  askProductionCompany,
  askReleaseYear,
} from './questionService'

const hasEnoughData = (credits: MovieCreditsResult): boolean => {
  const hasDirector = credits.crew.find(
    (member) => member.department === 'Directing',
  )
  const hasActors = credits.cast.length > 5

  if (!hasDirector || !hasActors) {
    return false
  } else {
    return true
  }
}

// https://bost.ocks.org/mike/shuffle/
const shuffleQuestionsArray = (array: QuizQuestion[]): QuizQuestion[] => {
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

const shuffleAnswersArray = (array: QuizAnswer[]): QuizAnswer[] => {
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

const createNewQuiz = async (data: MovieResult): Promise<QuizQuestion[]> => {
  const getDetails = await getMovieDetails(String(data.id))
  const getCredits = await getMovieCredits(String(data.id))
  let detailsData: MovieDetailsResult | null = null
  let creditsData: MovieCreditsResult | null = null

  return Promise.all([getDetails, getCredits])
    .then((res) => {
      detailsData = res[0] as MovieDetailsResult
      creditsData = res[1] as MovieCreditsResult

      if (detailsData && creditsData && hasEnoughData(creditsData)) {
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

        const quizQuestionsList = [q1, q2, q3, q4, q5, q6, q7, q8]

        return shuffleQuestionsArray(quizQuestionsList)
      } else {
        return []
      }
    })
    .catch((err) => {
      console.log(err)
      return []
    })
}

export { createNewQuiz, shuffleQuestionsArray, shuffleAnswersArray }
