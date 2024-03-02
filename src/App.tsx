import logo from './TMDB_logo.svg'
import css from './App.module.scss'

const App = (): JSX.Element => {
  return (
    <div className={css.App}>
      <img src={logo} alt='TMDB logo' />
      <h2>Movie Quiz</h2>
    </div>
  )
}

export default App
