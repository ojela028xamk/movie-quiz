import { Button, Card, Form, InputGroup } from 'react-bootstrap'
import { useState } from 'react'
import { getSearchedMovies } from '../Services/movieDatabaseService'
import { useKeyPressEvent } from 'react-use'
import {
  CurrentMovieList,
  MovieResult,
  MovieSearchResponse,
} from '../globalTypes'
import css from './MovieList.module.scss'
import { isValidMovieData } from '../typeGuards'

type MovieListProps = {
  handleSiteView: (showList: boolean, showQuiz: boolean) => void
  setSelectedMovie: React.Dispatch<React.SetStateAction<MovieResult | null>>
}

const MovieList = ({
  handleSiteView,
  setSelectedMovie,
}: MovieListProps): JSX.Element => {
  const [movieName, setMovieName] = useState<string>('Kill Bill')
  const [currentMovieList, setCurrentMovieList] = useState<CurrentMovieList[]>(
    [],
  )

  const handleSearchMovies = (): void => {
    getSearchedMovies(movieName)
      .then((res) => {
        const searchedMovies = res as MovieSearchResponse
        const newMovieList: CurrentMovieList[] = []

        if (!isValidMovieData(searchedMovies.results)) throw Error

        if (
          searchedMovies &&
          searchedMovies.results &&
          searchedMovies.results.length
        ) {
          searchedMovies.results.map((movie) =>
            newMovieList.push({
              title: movie.title,
              image: movie.poster_path ? movie.poster_path : '',
              data: movie,
            }),
          )
          setCurrentMovieList(newMovieList)
        }
      })
      .catch((err) => {
        console.log(err)
        setCurrentMovieList([])
      })
  }

  const handleSelectMovie = (movie: CurrentMovieList): void => {
    setSelectedMovie(movie.data)
    handleSiteView(false, true)
  }

  useKeyPressEvent('Enter', handleSearchMovies)

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
              onClick={() => handleSelectMovie(movie)}
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
