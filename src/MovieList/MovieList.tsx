import { Button, Card, Form, InputGroup, Pagination } from 'react-bootstrap'
import { useState } from 'react'
import { getSearchedMovies } from '../Services/movieDatabaseService'
import { useKeyPressEvent } from 'react-use'
import {
  CurrentMovieList,
  MovieResult,
  MovieSearchResponse,
} from '../globalTypes'
import { isValidMovieData } from '../typeGuards'
import css from './MovieList.module.scss'

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
  const [slicedMovieList, setSlicedMovieList] = useState<CurrentMovieList[]>([])
  const [paginationNums, setPaginationNums] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState<number>(0)

  const handleSelectListPage = (pageNumber: number): void => {
    if (pageNumber === currentPage) return

    setCurrentPage(pageNumber)

    switch (pageNumber) {
      case 1:
        setSlicedMovieList(currentMovieList.slice(0, 4))
        break
      case 2:
        setSlicedMovieList(currentMovieList.slice(4, 8))
        break
      case 3:
        setSlicedMovieList(currentMovieList.slice(8, 12))
        break
      case 4:
        setSlicedMovieList(currentMovieList.slice(12, 16))
        break
      case 5:
      default:
        setSlicedMovieList(currentMovieList.slice(16, 20))
        break
    }
  }

  const handleSearchMovies = (): void => {
    // Endpoint gives max 20 results
    getSearchedMovies(movieName)
      .then((res) => {
        const searchedMovies = res as MovieSearchResponse
        const pageNumbers: number[] = []
        const newMovieList: CurrentMovieList[] = []

        if (!isValidMovieData(searchedMovies.results)) throw Error

        if (
          searchedMovies &&
          searchedMovies.results &&
          searchedMovies.results.length
        ) {
          const paginationLength = Math.ceil(searchedMovies.results.length / 4)

          for (let i = 1; i < paginationLength + 1; i++) {
            pageNumbers.push(i)
          }

          searchedMovies.results.map((movie) =>
            newMovieList.push({
              title: movie.title,
              image: movie.poster_path ? movie.poster_path : '',
              data: movie,
            }),
          )

          setPaginationNums(pageNumbers)
          setCurrentMovieList(newMovieList)
          setSlicedMovieList(newMovieList.slice(0, 4))
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
        <Button className={css.search_button} onClick={handleSearchMovies}>
          Search
        </Button>
      </InputGroup>
      <div className={css.movie_grid}>
        {slicedMovieList &&
          slicedMovieList.length &&
          slicedMovieList.map((movie, index) => (
            <Card
              key={index}
              className={css.movie_grid_card}
              style={{ width: 'auto' }}
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
      <div className={css.movie_list_nav}>
        <Pagination size='lg' className={css.pagination}>
          {paginationNums.map((pageNum) => {
            return (
              <Pagination.Item
                key={pageNum}
                active={pageNum === currentPage}
                onClick={() => handleSelectListPage(pageNum)}
              >
                {pageNum}
              </Pagination.Item>
            )
          })}
        </Pagination>
      </div>
    </div>
  )
}

export default MovieList
