import {
  MovieCreditsResult,
  MovieDetailsResult,
  MovieResult,
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
const shuffleArray = (array: QuizQuestion[]): QuizQuestion[] => {
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
    const q1 = askReleaseYear(data.release_date)
    const q2 = askDirector(creditsData.crew)
    const q3 = askProductionCompany(detailsData.production_companies)
    const q4 = askMovieBudget(detailsData.budget)
    const q5 = askActorPlaysCharacter(creditsData.cast)
    const q6 = askCharacterIsActor(creditsData.cast)

    const quizQuestionsList = [q1, q2, q3, q4, q5, q6]

    return shuffleArray(quizQuestionsList)
  } else {
    return []
  }
}

export { createNewQuiz, shuffleArray }
