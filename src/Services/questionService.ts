import { nanoid } from 'nanoid'
import {
  MovieCreditsResult,
  MovieCrew,
  MovieDetailsResult,
  MovieProductionCompanies,
  MovieResult,
  QuizQuestion,
} from '../globalTypes'
import { getMovieCredits, getMovieDetails } from './movieDatabaseService'
import {
  getWrongMovieBudgets,
  getWrongMovieCompanies,
} from './wrongAnswerService'

const askReleaseYear = (date: string): QuizQuestion => {
  const correctDate = Number(date.substring(0, 4))

  const newQuestion: QuizQuestion = {
    question_id: nanoid(),
    question: 'What year was movie released?',
    answers: [
      {
        answer_id: nanoid(),
        answer: correctDate,
        isCorrect: true,
      },
    ],
  }

  for (let index = 0; index < 3; index++) {
    const min = correctDate - 5
    const max = correctDate + 5

    let wrongDate = Math.floor(Math.random() * (min - max) + max)
    if (wrongDate >= correctDate) wrongDate++

    newQuestion.answers.push({
      answer_id: nanoid(),
      answer: wrongDate,
      isCorrect: false,
    })
  }

  return newQuestion
}

const askDirector = (movieCrew: MovieCrew[]): QuizQuestion => {
  const newQuestion: QuizQuestion = {
    question_id: nanoid(),
    question: 'Which one of them is part of the directing crew?',
    answers: [],
  }

  const director = movieCrew.find((member) => member.department === 'Directing')

  if (director) {
    newQuestion.answers.push({
      answer_id: nanoid(),
      answer: director.name,
      isCorrect: true,
    })
  }

  for (let index = 0; index < movieCrew.length; index++) {
    const answerAlreadyExists = newQuestion.answers.findIndex(
      (answer) => answer.answer === movieCrew[index].name,
    )

    if (
      movieCrew[index].department !== 'Directing' &&
      answerAlreadyExists < 0
    ) {
      newQuestion.answers.push({
        answer_id: nanoid(),
        answer: movieCrew[index].name,
        isCorrect: false,
      })
    }

    if (newQuestion.answers.length === 4) break
  }

  return newQuestion
}

const askProductionCompany = (
  movieCompanies: MovieProductionCompanies[],
): QuizQuestion => {
  const wrongCompanies = getWrongMovieCompanies(movieCompanies[0].name)

  const newQuestion: QuizQuestion = {
    question_id: nanoid(),
    question:
      'Which one of these movie companies is part of the production of this movie?',
    answers: [
      {
        answer_id: nanoid(),
        answer: movieCompanies[0].name,
        isCorrect: true,
      },
    ],
  }

  wrongCompanies.map((company) => {
    newQuestion.answers.push({
      answer_id: nanoid(),
      answer: company,
      isCorrect: false,
    })
  })

  return newQuestion
}

const askMovieBudget = (movieBudget: number): QuizQuestion => {
  const wrongBudgets = getWrongMovieBudgets(movieBudget)

  const newQuestion: QuizQuestion = {
    question_id: nanoid(),
    question: 'What was the budget of this movie?',
    answers: [
      {
        answer_id: nanoid(),
        answer: movieBudget,
        isCorrect: true,
      },
    ],
  }

  wrongBudgets.map((budget) => {
    newQuestion.answers.push({
      answer_id: nanoid(),
      answer: budget,
      isCorrect: false,
    })
  })

  return newQuestion
}

const createNewQuiz = async (data: MovieResult): Promise<QuizQuestion[]> => {
  const detailsData = (await getMovieDetails(
    String(data.id),
  )) as MovieDetailsResult

  const creditsData = (await getMovieCredits(
    String(data.id),
  )) as MovieCreditsResult

  if (creditsData && detailsData) {
    const q1 = askReleaseYear(data.release_date)
    const q2 = askDirector(creditsData.crew)
    const q3 = askProductionCompany(detailsData.production_companies)
    const q4 = askMovieBudget(detailsData.budget)

    return [q1, q2, q3, q4]
  } else {
    return []
  }
}

export { createNewQuiz }
