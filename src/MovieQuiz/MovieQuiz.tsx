import { Button, Pagination } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { TestQuestion, testQuestions } from './testQuestion'
import MovieQuizResults from './MovieQuizResults'
import css from './MovieQuiz.module.scss'
import { MovieResult } from '../globalTypes'

type MovieQuizProps = {
  handleSiteView: (showList: boolean, showQuiz: boolean) => void
  movieTitle: string
}

const MovieQuiz = ({
  handleSiteView,
  movieTitle,
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
  const [isQuizDone, setIsQuizDone] = useState<boolean>(false)
  const [showResults, setShowResults] = useState<boolean>(false)

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

  useEffect(() => {
    const arrHasEmptyStrings = selectedAnswers.some((answer) => !answer)
    if (!arrHasEmptyStrings) setIsQuizDone(true)
  }, [selectedAnswers])

  return (
    <>
      <div className={css.movie_quiz}>
        {!showResults && (
          <div className={css.movie_quiz_questions}>
            <Button onClick={() => handleSiteView(true, false)}>
              <i className='bi bi-arrow-left'></i> Select another movie{' '}
            </Button>
            <h2>Movie: {movieTitle}</h2>
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
            <Button disabled={!isQuizDone} onClick={() => setShowResults(true)}>
              {isQuizDone
                ? 'Show results'
                : 'Answer all questions to see results'}
            </Button>
          </div>
        )}
        {showResults && (
          <MovieQuizResults
            selectedAnswers={selectedAnswers}
            handleSiteView={handleSiteView}
          />
        )}
      </div>
    </>
  )
}

export default MovieQuiz
