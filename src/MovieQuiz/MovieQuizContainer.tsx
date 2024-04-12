import { Button } from 'react-bootstrap'
import { MovieImageItem, MovieResult, QuizQuestion } from '../globalTypes'
import MovieQuiz from './MovieQuiz'
import { useEffectOnce } from 'react-use'
import { useState } from 'react'
import { createNewQuiz } from '../Services/quizService'
import css from './MovieQuiz.module.scss'

type MovieQuizContainerProps = {
  handleSiteView: (showList: boolean, showQuiz: boolean) => void
  selectedMovie: MovieResult | null
}

const MovieQuizContainer = ({
  handleSiteView,
  selectedMovie,
}: MovieQuizContainerProps): JSX.Element | null => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])
  const [quizImages, setQuizImages] = useState<MovieImageItem[]>([])
  const [hasError, setHasError] = useState<boolean>(false)

  useEffectOnce(() => {
    if (!selectedMovie) return

    createNewQuiz(selectedMovie)
      .then((res) => {
        setQuizQuestions(res.questions)
        setQuizImages(res.images)
      })
      .catch(() => {
        setHasError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  })

  if (!selectedMovie)
    return <h3>Something went wrong while selecting a movie...</h3>

  if (isLoading) return <div className={css.loader}></div>

  if (hasError)
    return (
      <div className={css.movie_quiz_no_data}>
        <h3>Error occured... try another movie.</h3>
        <Button onClick={() => handleSiteView(true, false)}>
          <i className='bi bi-arrow-left'></i> Select another movie{' '}
        </Button>
      </div>
    )

  if (!quizQuestions.length)
    return (
      <div className={css.movie_quiz_no_data}>
        <h3>Not enought data to creata a quiz...</h3>
        <Button onClick={() => handleSiteView(true, false)}>
          <i className='bi bi-arrow-left'></i> Select another movie{' '}
        </Button>
      </div>
    )

  return (
    <MovieQuiz
      handleSiteView={handleSiteView}
      movieTitle={selectedMovie.title}
      quizQuestions={quizQuestions}
      quizImages={quizImages}
    />
  )
}

export default MovieQuizContainer
