import css from './App.module.scss'
import Header from './Header/Header'
import MovieList from './MovieList/MovieList'
import MovieQuiz from './MovieQuiz/MovieQuiz'

const App = (): JSX.Element => {
  return (
    <div className={css.App}>
      <Header />
      <MovieList />
      <MovieQuiz />
    </div>
  )
}

export default App
