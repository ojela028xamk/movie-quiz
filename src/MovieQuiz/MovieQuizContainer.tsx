import { createNewQuiz } from '../Services/questionService'
import { MovieResult } from '../globalTypes'
import MovieQuiz from './MovieQuiz'

type MovieQuizContainerProps = {
  handleSiteView: (showList: boolean, showQuiz: boolean) => void
  selectedMovie: MovieResult | null
}

const MovieQuizContainer = ({
  handleSiteView,
  selectedMovie,
}: MovieQuizContainerProps): JSX.Element | null => {
  if (!selectedMovie) return <h3>No data found...</h3>

  const quizQuestions = createNewQuiz(selectedMovie)

  return (
    <MovieQuiz
      handleSiteView={handleSiteView}
      movieTitle={selectedMovie.title}
      quizQuestions={quizQuestions}
    />
  )
}

export default MovieQuizContainer
