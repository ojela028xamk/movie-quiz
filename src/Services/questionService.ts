import { nanoid } from 'nanoid'
import {
  MovieCreditsResult,
  MovieCrew,
  MovieDetailsResult,
  MovieResult,
  QuizQuestion,
} from '../globalTypes'
import { getMovieCredits, getMovieDetails } from './movieDatabaseService'

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

const createNewQuiz = async (data: MovieResult): Promise<QuizQuestion[]> => {
  const detailsData = (await getMovieDetails(
    String(data.id),
  )) as MovieDetailsResult
  const creditsData = (await getMovieCredits(
    String(data.id),
  )) as MovieCreditsResult

  if (creditsData && creditsData.crew && creditsData.crew.length) {
    const q1 = askReleaseYear(data.release_date)
    const q2 = askDirector(creditsData.crew)
    return [q1, q2]
  } else {
    return []
  }
}

export { createNewQuiz }
