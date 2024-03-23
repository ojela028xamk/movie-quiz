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

    return [q1, q2, q3, q4, q5, q6]
  } else {
    return []
  }
}

export { createNewQuiz }
