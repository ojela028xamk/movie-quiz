import { Button, Spinner } from 'react-bootstrap'
import { MovieResult, QuizQuestion } from '../globalTypes'
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
  const [message, setMessage] = useState<string>('')

  useEffectOnce(() => {
    if (!selectedMovie) {
      setMessage('Something went wrong while selecting a movie...')
      return
    }

    createNewQuiz(selectedMovie)
      .then((res) => {
        setQuizQuestions(res)
      })
      .catch(() => {
        setQuizQuestions([])
      })
      .finally(() => {
        setIsLoading(false)
      })
  })

  if (!selectedMovie) return <h3>{message}</h3>

  if (isLoading) return <Spinner animation='border' role='status' />

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
    />
  )
}

export default MovieQuizContainer
