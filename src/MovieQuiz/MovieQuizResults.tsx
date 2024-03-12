import { useMount } from 'react-use'
import css from './MovieQuiz.module.scss'
import { TestAnswer, testQuestions } from './testQuestion'
import { useState } from 'react'

type MovieQuizResultsProps = {
  selectedAnswers: string[]
}

const MovieQuizResults = ({
  selectedAnswers,
}: MovieQuizResultsProps): JSX.Element => {
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0)

  const isCorrectAnswer = (answer: TestAnswer, index: number): string => {
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
    testQuestions.map((question, index) => {
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
      <h4>You got {correctAnswersCount} / 10 questions correct!</h4>
      {testQuestions.map((question, questionIndex) => {
        return (
          <div key={question.question_id}>
            <h3>{question.question}</h3>
            {question.answers.map((answer) => (
              <span
                key={answer.answer_id}
                className={isCorrectAnswer(answer, questionIndex)}
              >
                {answer.answer}
              </span>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default MovieQuizResults
