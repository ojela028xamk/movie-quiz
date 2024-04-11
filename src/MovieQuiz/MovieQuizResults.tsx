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

  const getIcon = (answer: QuizAnswer, index: number): string => {
    const correctAnswerSelected =
      answer.answer_id === selectedAnswers[index] && answer.isCorrect
    const correctAnswer =
      answer.answer_id !== selectedAnswers[index] && answer.isCorrect
    const wrongAnswer =
      answer.answer_id === selectedAnswers[index] && !answer.isCorrect

    if (correctAnswerSelected) return 'bi bi-check-circle'
    if (correctAnswer) return ''
    if (wrongAnswer) return 'bi bi-x-circle'

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
      <h2>
        You got {correctAnswersCount} / {quizQuestions.length} answers correct!
      </h2>
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
                  <div
                    key={answer.answer_id}
                    className={`${css.card_body_answer} ${isCorrectAnswer(answer, questionIndex)}`}
                  >
                    <i className={getIcon(answer, questionIndex)}></i>
                    <span key={answer.answer_id}>{answer.answer}</span>
                  </div>
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
