import { MovieResult } from '../globalTypes'
import MovieQuiz from './MovieQuiz'

type MovieQuizContainerProps = {
  handleSiteView: (showList: boolean, showQuiz: boolean) => void
  selectedMovie: MovieResult | null
}

const MovieQuizContainer = ({
  handleSiteView,
  selectedMovie,
}: MovieQuizContainerProps): JSX.Element => {
  const movieTitle =
    selectedMovie && selectedMovie.title ? selectedMovie.title : ''

  return <MovieQuiz handleSiteView={handleSiteView} movieTitle={movieTitle} />
}

export default MovieQuizContainer
