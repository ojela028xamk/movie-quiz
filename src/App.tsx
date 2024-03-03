import css from './App.module.scss'
import Header from './Header/Header'

const App = (): JSX.Element => {
  return (
    <div className={css.App}>
      <Header />
    </div>
  )
}

export default App
