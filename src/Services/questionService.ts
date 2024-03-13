import { nanoid } from 'nanoid'
import { MovieResult, QuizQuestion } from '../globalTypes'
import { getMovieCredits } from './movieDatabaseService'

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

const askDirector = (movieId: number): QuizQuestion => {
  getMovieCredits(String(movieId))
    .then((res) => {
      console.log(res)
    })
    .catch((err) => console.log(err))

  const newQuestion: QuizQuestion = {
    question_id: nanoid(),
    question: 'Who is the director of this movie?',
    answers: [
      {
        answer_id: nanoid(),
        answer: 'Quentin Tarantino',
        isCorrect: true,
      },
    ],
  }

  return newQuestion
}

const createNewQuiz = (data: MovieResult): void => {
  const q1 = askReleaseYear(data.release_date)
  const q2 = askDirector(data.id)
}

export { createNewQuiz }
