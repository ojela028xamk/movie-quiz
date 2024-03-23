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
  const detailsData = (await getMovieDetails(
    String(data.id),
  )) as MovieDetailsResult

  const creditsData = (await getMovieCredits(
    String(data.id),
  )) as MovieCreditsResult

  if (detailsData && creditsData && hasEnoughData(creditsData)) {
    const randomIndexOne = Math.floor(Math.random() * 6)
    let randomIndexTwo = Math.floor(Math.random() * 6)

    do {
      randomIndexTwo = Math.floor(Math.random() * 6)
    } while (randomIndexOne === randomIndexTwo)

    const q1 = askReleaseYear(data.release_date)
    const q2 = askDirector(creditsData.crew)
    const q3 = askProductionCompany(detailsData.production_companies)
    const q4 = askMovieBudget(detailsData.budget)
    const q5 = askActorPlaysCharacter(creditsData.cast, randomIndexOne)
    const q6 = askActorPlaysCharacter(creditsData.cast, randomIndexTwo)
    const q7 = askCharacterIsActor(creditsData.cast, randomIndexOne)
    const q8 = askCharacterIsActor(creditsData.cast, randomIndexTwo)

    const quizQuestionsList = [q1, q2, q3, q4, q5, q6, q7, q8]

    return shuffleQuestionsArray(quizQuestionsList)
  } else {
    return []
  }
}

export { createNewQuiz, shuffleQuestionsArray, shuffleAnswersArray }
