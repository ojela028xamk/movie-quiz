import { Button } from 'react-bootstrap'
import css from './MovieQuiz.module.scss'

type MovieQuizProps = {
  handleSiteView: (showList: boolean, showQuiz: boolean) => void
}

const MovieQuiz = ({ handleSiteView }: MovieQuizProps): JSX.Element => {
  return (
    <div className={css.movie_quiz}>
      <Button onClick={() => handleSiteView(true, false)}>
        <i className='bi bi-arrow-left'></i> Select another movie{' '}
      </Button>
      <h2>Movie quiz goes here...</h2>
    </div>
  )
}

export default MovieQuiz
