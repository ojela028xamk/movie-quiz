import { Button, Form, Pagination } from 'react-bootstrap'
import { nanoid } from 'nanoid'
import { useState } from 'react'
import css from './MovieQuiz.module.scss'

type MovieQuizProps = {
  handleSiteView: (showList: boolean, showQuiz: boolean) => void
  selectedMovie: string
}

type TestQuestion = {
  question_id: string
  question: string
  pagination_number: number
  answers: TestAnswer[]
}

type TestAnswer = {
  answer_id: string
  answer: string
  isCorrect: boolean
}

const testQuestions: TestQuestion[] = [
  {
    question_id: nanoid(),
    question: 'Question 1',
    pagination_number: 1,
    answers: [
      {
        answer_id: nanoid(),
        answer: 'Answer 1',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 2',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 3',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 4',
        isCorrect: true,
      },
    ],
  },
  {
    question_id: nanoid(),
    question: 'Question 2',
    pagination_number: 2,
    answers: [
      {
        answer_id: nanoid(),
        answer: 'Answer 1',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 2',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 3',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 4',
        isCorrect: true,
      },
    ],
  },
  {
    question_id: nanoid(),
    question: 'Question 3',
    pagination_number: 3,
    answers: [
      {
        answer_id: nanoid(),
        answer: 'Answer 1',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 2',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 3',
        isCorrect: false,
      },
      {
        answer_id: nanoid(),
        answer: 'Answer 4',
        isCorrect: true,
      },
    ],
  },
]

const MovieQuiz = ({
  handleSiteView,
  selectedMovie,
}: MovieQuizProps): JSX.Element => {
  const [currentPaginationNumber, setCurrentPaginationNumber] =
    useState<number>(0)
  const [currentQuestion, setCurrentQuestion] = useState<TestQuestion>(
    testQuestions[0],
  )
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ])
  const [currentAnswer, setCurrentAnswer] = useState<string>('')

  const handleSelectQuestion = (pageNumber: number): void => {
    setCurrentQuestion(testQuestions[pageNumber])
    setCurrentPaginationNumber(pageNumber)
    setCurrentAnswer(selectedAnswers[pageNumber])
  }

  const handleSelectAnswer = (answerId: string): void => {
    if (answerId === currentAnswer) return

    const newAnswers = [...selectedAnswers]
    newAnswers[currentPaginationNumber] = answerId
    setCurrentAnswer(answerId)
    setSelectedAnswers(newAnswers)
  }

  return (
    <div className={css.movie_quiz}>
      <Button onClick={() => handleSiteView(true, false)}>
        <i className='bi bi-arrow-left'></i> Select another movie{' '}
      </Button>
      <h2>Movie: {selectedMovie}</h2>
      <div className={css.movie_quiz_questions}>
        <h3>{currentQuestion.question}</h3>
        <div className={css.questions_grid}>
          {currentQuestion.answers.map((answer) => (
            <div
              key={answer.answer_id}
              className={
                currentAnswer === answer.answer_id
                  ? `${css.question_item} ${css.active}`
                  : css.question_item
              }
              onClick={() => handleSelectAnswer(answer.answer_id)}
            >
              {answer.answer}
            </div>
          ))}
        </div>
      </div>
      <Pagination size='lg' className={css.pagination}>
        {' '}
        {testQuestions.map((question, index) => {
          return (
            <Pagination.Item
              key={question.question_id}
              active={index === currentPaginationNumber}
              onClick={() => handleSelectQuestion(index)}
            >
              {question.pagination_number}
            </Pagination.Item>
          )
        })}
      </Pagination>
    </div>
  )
}

export default MovieQuiz
