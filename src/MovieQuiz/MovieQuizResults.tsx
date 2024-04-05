import { useMount } from 'react-use'
import css from './MovieQuiz.module.scss'
import { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { QuizAnswer, QuizQuestion } from '../globalTypes'

type MovieQuizResultsProps = {
  selectedAnswers: string[]
  handleSiteView: (showList: boolean, showQuiz: boolean) => void
  quizQuestions: QuizQuestion[]
}

const MovieQuizResults = ({
  selectedAnswers,
  handleSiteView,
  quizQuestions,
}: MovieQuizResultsProps): JSX.Element => {
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0)

  const isCorrectAnswer = (answer: QuizAnswer, index: number): string => {
    const correctAnswerSelected =
      answer.answer_id === selectedAnswers[index] && answer.isCorrect
    const correctAnswer =
      answer.answer_id !== selectedAnswers[index] && answer.isCorrect
    const wrongAnswer =
      answer.answer_id === selectedAnswers[index] && !answer.isCorrect

    if (correctAnswerSelected) return css.correct_selected
    if (correctAnswer) return css.correct
    if (wrongAnswer) return css.wrong

    return ''
  }

  useMount(() => {
    let count = 0
    quizQuestions.map((question, index) => {
      question.answers.map((answer) => {
        if (answer.answer_id === selectedAnswers[index] && answer.isCorrect)
          count++
      })
    })
    setCorrectAnswersCount(count)
  })

  return (
    <div className={css.movie_quiz_results}>
      <h2>Final Results</h2>
      <h4>
        You got {correctAnswersCount} / {quizQuestions.length}{' '}
      </h4>
      <Button onClick={() => handleSiteView(true, false)}>
        <i className='bi bi-arrow-left'></i> Select another movie{' '}
      </Button>
      <div className={css.quiz_results_grid}>
        {quizQuestions.map((question, questionIndex) => {
          return (
            <Card key={question.question_id} className={css.card}>
              <Card.Header className={css.card_header}>
                {question.question}
              </Card.Header>
              <Card.Body className={css.card_body}>
                {question.answers.map((answer) => (
                  <span
                    key={answer.answer_id}
                    className={isCorrectAnswer(answer, questionIndex)}
                  >
                    {answer.answer}
                  </span>
                ))}
              </Card.Body>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default MovieQuizResults
