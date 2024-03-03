import logo from '../TMDB_logo.svg'
import css from './Header.module.scss'

const Header = (): JSX.Element => {
  return (
    <div className={css.header}>
      <h1>
        Movie Quiz <i className='bi bi-film'></i>
      </h1>
      <span>Powered by: </span>
      <img src={logo} alt='TMDB logo' />
    </div>
  )
}

export default Header
