import { useState } from 'react'
import css from './App.module.scss'
import Header from './Header/Header'
import MovieList from './MovieList/MovieList'
import MovieQuiz from './MovieQuiz/MovieQuiz'

const App = (): JSX.Element => {
  const [showMovieList, setShowMovieList] = useState<boolean>(true)
  const [showMovieQuiz, setShowMovieQuiz] = useState<boolean>(false)

  const handleSiteView = (showList: boolean, showQuiz: boolean): void => {
    setShowMovieList(showList)
    setShowMovieQuiz(showQuiz)
  }

  return (
    <div className={css.App}>
      <Header />
      {showMovieList && <MovieList handleSiteView={handleSiteView} />}
      {showMovieQuiz && <MovieQuiz handleSiteView={handleSiteView} />}
    </div>
  )
}

export default App
