import { Button, Form } from 'react-bootstrap'
import css from './MovieQuiz.module.scss'

type MovieQuizProps = {
  handleSiteView: (showList: boolean, showQuiz: boolean) => void
  selectedMovie: string
}

const testQuestions = [
  {
    id: Math.random(),
    question: 'Question 1',
    answers: [
      {
        id: Math.random(),
        answer: 'Answer 1',
        isCorrect: false,
      },
      {
        id: Math.random(),
        answer: 'Answer 2',
        isCorrect: false,
      },
      {
        id: Math.random(),
        answer: 'Answer 3',
        isCorrect: false,
      },
      {
        id: Math.random(),
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
            <>
              <h2>{question.question}</h2>
              <div>
                {question.answers.map((answer) => (
                  <Form.Check
                    key={answer.id}
                    inline
                    label={answer.answer}
                    name={String(question.id)}
                    type='radio'
                    id={String(answer.id)}
                  />
                ))}
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default MovieQuiz
