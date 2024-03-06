import { Button, Form } from 'react-bootstrap'
import css from './MovieQuiz.module.scss'
import { nanoid } from 'nanoid'

type MovieQuizProps = {
  handleSiteView: (showList: boolean, showQuiz: boolean) => void
  selectedMovie: string
}

const testQuestions = [
  {
    question_id: nanoid(),
    question: 'Question 1',
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
  return (
    <div className={css.movie_quiz}>
      <Button onClick={() => handleSiteView(true, false)}>
        <i className='bi bi-arrow-left'></i> Select another movie{' '}
      </Button>
      <h2>Movie: {selectedMovie}</h2>
      <div className={css.movie_quiz_grid}>
        {testQuestions.map((question) => {
          return (
            <div key={question.question_id}>
              <h2>{question.question}</h2>
              <div>
                {question.answers.map((answer) => (
                  <Form.Check
                    key={answer.answer_id}
                    inline
                    label={answer.answer}
                    name={String(question.question)}
                    type='radio'
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MovieQuiz
