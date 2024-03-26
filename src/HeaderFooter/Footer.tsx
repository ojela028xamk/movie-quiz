import logo from '../TMDB_logo.svg'
import css from './HeaderFooter.module.scss'

const Footer = (): JSX.Element => {
  return (
    <div className={css.footer}>
      <span>Powered by: </span>
      <img src={logo} alt='TMDB logo' />
    </div>
  )
}

export default Footer
