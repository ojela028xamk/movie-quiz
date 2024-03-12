import { nanoid } from 'nanoid'
import { MovieResult, QuizQuestion } from '../globalTypes'

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

const createNewQuiz = (data: MovieResult): void => {
  console.log(askReleaseYear(data.release_date))
}

export { createNewQuiz }
