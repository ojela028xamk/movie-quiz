import { Button, Card, Form, InputGroup } from 'react-bootstrap'
import { useState } from 'react'
import {
  MovieSearchResponse,
  getSearchedMovies,
} from '../Services/movieDatabaseService'
import css from './MovieList.module.scss'

type MovieListProps = {
  handleSiteView: (showList: boolean, showQuiz: boolean) => void
}

const MovieList = ({ handleSiteView }: MovieListProps): JSX.Element => {
  const [movieName, setMovieName] = useState<string>('')
  const [movieList, setMovieList] = useState<string[]>([])

  const handleSearchMovies = (): void => {
    getSearchedMovies(movieName)
      .then((res) => {
        const searchedMovies = res as MovieSearchResponse
        const newMovieList: string[] = []

        if (
          searchedMovies &&
          searchedMovies.results &&
          searchedMovies.results.length
        ) {
          searchedMovies.results.map((movie) => newMovieList.push(movie.title))
          setMovieList(newMovieList)
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className={css.movie_list}>
      <InputGroup className='mb-3'>
        <InputGroup.Text>
          <i className='bi bi-search'></i>
        </InputGroup.Text>
        <Form.Control
          placeholder='Search a movie...'
          value={movieName}
          onChange={(event) => setMovieName(event.currentTarget.value)}
        />
        <Button variant='dark' onClick={handleSearchMovies}>
          Search
        </Button>
      </InputGroup>
      <div className={css.movie_grid}>
        {movieList &&
          movieList.length &&
          movieList.map((movie, index) => (
            <Card
              key={index}
              className={css.movie_grid_card}
              style={{ width: '18rem' }}
              onClick={() => handleSiteView(false, true)}
            >
              <Card.Img
                variant='top'
                // eslint-disable-next-line max-len
                src='data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18e094fb8a0%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18e094fb8a0%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.1953125%22%20y%3D%2296.3%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
              />
              <Card.Body>
                <Card.Title>{movie}</Card.Title>
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  )
}

export default MovieList
