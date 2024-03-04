import { Button } from 'react-bootstrap'
import css from './MovieQuiz.module.scss'

const MovieQuiz = (): JSX.Element => {
  return (
    <div className={css.movie_quiz}>
      <Button>
        <i className='bi bi-arrow-left'></i> Select another movie{' '}
      </Button>
      <h2>Movie quiz goes here...</h2>
    </div>
  )
}

export default MovieQuiz
