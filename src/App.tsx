import css from './App.module.scss'
import Header from './Header/Header'
import MovieList from './MovieList/MovieList'

const App = (): JSX.Element => {
  return (
    <div className={css.App}>
      <Header />
      <MovieList />
    </div>
  )
}

export default App
