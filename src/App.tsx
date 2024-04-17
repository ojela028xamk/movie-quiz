import { useState } from 'react'
import Header from './HeaderFooter/Header'
import MovieList from './MovieList/MovieList'
import css from './App.module.scss'
import MovieQuizContainer from './MovieQuiz/MovieQuizContainer'
import { MovieResult } from './globalTypes'
import Footer from './HeaderFooter/Footer'

const App = (): JSX.Element => {
  const [showMovieList, setShowMovieList] = useState<boolean>(true)
  const [showMovieQuiz, setShowMovieQuiz] = useState<boolean>(false)
  const [selectedMovie, setSelectedMovie] = useState<MovieResult | null>(null)

  const handleSiteView = (showList: boolean, showQuiz: boolean): void => {
    setShowMovieList(showList)
    setShowMovieQuiz(showQuiz)
  }

  return (
    <div className={css.App}>
      <Header />
      {showMovieList && (
        <MovieList
          handleSiteView={handleSiteView}
          setSelectedMovie={setSelectedMovie}
        />
      )}
      {showMovieQuiz && (
        <MovieQuizContainer
          handleSiteView={handleSiteView}
          selectedMovie={selectedMovie}
        />
      )}
      <Footer />
    </div>
  )
}

export default App
