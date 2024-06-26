import { Button, Pagination } from 'react-bootstrap'
import { Fragment, useEffect, useState } from 'react'
import MovieQuizResults from './MovieQuizResults'
import css from './MovieQuiz.module.scss'
import { MovieImageItem, QuizQuestion } from '../globalTypes'

type MovieQuizProps = {
  handleSiteView: (showList: boolean, showQuiz: boolean) => void
  movieTitle: string
  quizQuestions: QuizQuestion[]
  quizImages: MovieImageItem[]
}

const MovieQuiz = ({
  handleSiteView,
  movieTitle,
  quizQuestions,
  quizImages,
}: MovieQuizProps): JSX.Element => {
  const initSelectedAnswers = quizQuestions.map(() => '')
  const firstQuestion = quizQuestions[0]

  const [currentPage, setCurrentPage] = useState<number>(0)
  const [selectedAnswers, setSelectedAnswers] =
    useState<string[]>(initSelectedAnswers)
  const [currentQuestion, setCurrentQuestion] =
    useState<QuizQuestion>(firstQuestion)
  const [currentAnswer, setCurrentAnswer] = useState<string>('')
  const [isQuizDone, setIsQuizDone] = useState<boolean>(false)
  const [showResults, setShowResults] = useState<boolean>(false)

  const handleSelectQuestion = (pageNumber: number): void => {
    if (pageNumber === currentPage) return

    setCurrentQuestion(quizQuestions[pageNumber])
    setCurrentPage(pageNumber)
    setCurrentAnswer(selectedAnswers[pageNumber])
  }

  const handleSelectAnswer = (answerId: string): void => {
    if (answerId === currentAnswer) return

    const newAnswers = [...selectedAnswers]
    const nextPage = currentPage + 1
    newAnswers[currentPage] = answerId

    setCurrentAnswer(answerId)
    setSelectedAnswers(newAnswers)

    if (currentPage < 7) {
      setCurrentQuestion(quizQuestions[nextPage])
      setCurrentPage(nextPage)
      setCurrentAnswer(selectedAnswers[nextPage])
    }
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
            <h3>Movie: {movieTitle}</h3>
            <h2>{currentQuestion.question}</h2>
            <Fragment>
              {quizImages.map((image, index) => (
                <img
                  className={css[`image${index + 1}`]}
                  width={200}
                  key={index + 1}
                  src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
                  loading='lazy'
                />
              ))}
            </Fragment>
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
              {quizQuestions.map((question, index) => {
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
            quizQuestions={quizQuestions}
          />
        )}
      </div>
    </>
  )
}

export default MovieQuiz
