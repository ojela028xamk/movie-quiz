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
  const [message, setMessage] = useState<string>('')

  useEffectOnce(() => {
    if (!selectedMovie) {
      setMessage('Something went wrong while selecting a movie...')
      return
    }

    createNewQuiz(selectedMovie)
      .then((res) => {
        setQuizQuestions(res.questions)
        setQuizImages(res.images)
      })
      .catch(() => {
        setQuizQuestions([])
      })
      .finally(() => {
        setIsLoading(false)
      })
  })

  if (!selectedMovie) return <h3>{message}</h3>

  if (isLoading) return <div className={css.loader}></div>

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
