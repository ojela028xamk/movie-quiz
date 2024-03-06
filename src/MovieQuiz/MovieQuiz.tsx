import { Button, Form, Pagination } from 'react-bootstrap'
import css from './MovieQuiz.module.scss'
import { nanoid } from 'nanoid'
import { useState } from 'react'

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
    useState<number>(1)
  const [currentQuestion, setCurrentQuestion] = useState<TestQuestion>(
    testQuestions[0],
  )

  const handleSelectQuestion = (pageNumber: number): void => {
    const newCurrentQuestion = testQuestions.find(
      (question) => pageNumber === question.pagination_number,
    )

    if (newCurrentQuestion) {
      setCurrentQuestion(newCurrentQuestion)
      setCurrentPaginationNumber(pageNumber)
    }
  }

  return (
    <div className={css.movie_quiz}>
      <Button onClick={() => handleSiteView(true, false)}>
        <i className='bi bi-arrow-left'></i> Select another movie{' '}
      </Button>
      <h2>Movie: {selectedMovie}</h2>
      <div className={css.movie_quiz_grid}>
        <h3>{currentQuestion.question}</h3>
        {currentQuestion.answers.map((answer) => (
          <Form.Check
            key={answer.answer_id}
            inline
            label={answer.answer}
            name={currentQuestion.question}
            type='radio'
          />
        ))}
      </div>
      <Pagination size='lg'>
        {' '}
        {testQuestions.map((question) => {
          return (
            <Pagination.Item
              key={question.question_id}
              active={question.pagination_number === currentPaginationNumber}
              onClick={() => handleSelectQuestion(question.pagination_number)}
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
