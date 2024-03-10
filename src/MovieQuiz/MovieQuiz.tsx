import { Button, Pagination } from 'react-bootstrap'
import { useState } from 'react'
import { TestQuestion, testQuestions } from './testQuestion'
import css from './MovieQuiz.module.scss'

type MovieQuizProps = {
  handleSiteView: (showList: boolean, showQuiz: boolean) => void
  selectedMovie: string
}

const MovieQuiz = ({
  handleSiteView,
  selectedMovie,
}: MovieQuizProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState<number>(0)
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
    if (pageNumber === currentPage) return
    setCurrentQuestion(testQuestions[pageNumber])
    setCurrentPage(pageNumber)
    setCurrentAnswer(selectedAnswers[pageNumber])
  }

  const handleSelectAnswer = (answerId: string): void => {
    if (answerId === currentAnswer) return

    const newAnswers = [...selectedAnswers]
    newAnswers[currentPage] = answerId
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
        {testQuestions.map((question, index) => {
          return (
            <Pagination.Item
              key={question.question_id}
              active={index === currentPage}
              onClick={() => handleSelectQuestion(index)}
            >
              {index + 1}
            </Pagination.Item>
          )
        })}
      </Pagination>
    </div>
  )
}

export default MovieQuiz
