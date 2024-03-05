import { Button, Card, Form, InputGroup } from 'react-bootstrap'
import { useState } from 'react'
import {
  MovieSearchResponse,
  getSearchedMovies,
} from '../Services/movieDatabaseService'
import css from './MovieList.module.scss'

type CurrentMovieList = {
  title: string
  image: string
}

type MovieListProps = {
  handleSiteView: (showList: boolean, showQuiz: boolean) => void
}

const MovieList = ({ handleSiteView }: MovieListProps): JSX.Element => {
  const [movieName, setMovieName] = useState<string>('')
  const [currentMovieList, setCurrentMovieList] = useState<CurrentMovieList[]>(
    [],
  )

  const handleSearchMovies = (): void => {
    getSearchedMovies(movieName)
      .then((res) => {
        const searchedMovies = res as MovieSearchResponse
        const newMovieList: CurrentMovieList[] = []

        if (
          searchedMovies &&
          searchedMovies.results &&
          searchedMovies.results.length
        ) {
          searchedMovies.results.map((movie) =>
            newMovieList.push({ title: movie.title, image: movie.poster_path }),
          )
          setCurrentMovieList(newMovieList)
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
        {currentMovieList &&
          currentMovieList.length &&
          currentMovieList.map((movie, index) => (
            <Card
              key={index}
              className={css.movie_grid_card}
              style={{ width: '18rem' }}
              onClick={() => handleSiteView(false, true)}
            >
              <Card.Img
                variant='top'
                src={`https://image.tmdb.org/t/p/original/${movie.image}`}
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  )
}

export default MovieList
