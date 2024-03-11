import css from './MovieQuiz.module.scss'
import { TestAnswer, testQuestions } from './testQuestion'

type MovieQuizResultsProps = {
  selectedAnswers: string[]
}

const MovieQuizResults = ({
  selectedAnswers,
}: MovieQuizResultsProps): JSX.Element => {
  const isCorrectAnswer = (answer: TestAnswer, index: number): string => {
    if (answer.answer_id === selectedAnswers[index] && answer.isCorrect) {
      return css.correct_selected
    } else if (
      answer.answer_id !== selectedAnswers[index] &&
      answer.isCorrect
    ) {
      return css.correct
    } else if (
      answer.answer_id === selectedAnswers[index] &&
      !answer.isCorrect
    ) {
      return css.wrong
    } else {
      return css.null
    }
  }

  return (
    <div className={css.movie_quiz_results}>
      <h2>Final Results</h2>
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
