import css from './HeaderFooter.module.scss'

const Header = (): JSX.Element => {
  return (
    <div className={css.header}>
      <h1>
        Movie Quiz <i className='bi bi-film'></i>
      </h1>
    </div>
  )
}

export default Header
