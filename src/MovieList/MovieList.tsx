// Placeholder image by Bruno Massao
// https://www.pexels.com/fi-fi/kuva/kamera-valokuvaus-teknologia-linssi-2873486/

import { Button, Card, Form, InputGroup, Pagination } from 'react-bootstrap'
import { Fragment, useState } from 'react'
import { getSearchedMovies } from '../Services/movieDatabaseService'
import { useKeyPressEvent } from 'react-use'
import {
  CurrentMovieList,
  MovieResult,
  MovieSearchResponse,
} from '../globalTypes'
import { isValidMovieData } from '../typeGuards'
import placeholder from '../placeholder.jpg'
import css from './MovieList.module.scss'

type MovieListProps = {
  handleSiteView: (showList: boolean, showQuiz: boolean) => void
  setSelectedMovie: React.Dispatch<React.SetStateAction<MovieResult | null>>
}

const MovieList = ({
  handleSiteView,
  setSelectedMovie,
}: MovieListProps): JSX.Element => {
  const [movieName, setMovieName] = useState<string>('')
  const [currentMovieList, setCurrentMovieList] = useState<CurrentMovieList[]>(
    [],
  )
  const [slicedMovieList, setSlicedMovieList] = useState<CurrentMovieList[]>([])
  const [isEmptyMovieList, setIsEmptyMovieList] = useState<boolean>(false)
  const [paginationNums, setPaginationNums] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)

  const handleSelectListPage = (pageNumber: number): void => {
    if (pageNumber === currentPage) return

    setCurrentPage(pageNumber)

    const startIndex = (pageNumber - 1) * 4
    const endIndex = startIndex + 4
    setSlicedMovieList(currentMovieList.slice(startIndex, endIndex))
  }

  const handleSearchMovies = (): void => {
    setIsLoading(true)
    setHasError(false)

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

          setIsEmptyMovieList(false)
          setPaginationNums(pageNumbers)
          setCurrentPage(1)
          setCurrentMovieList(newMovieList)
          setSlicedMovieList(newMovieList.slice(0, 4))
        } else {
          setIsEmptyMovieList(true)
          setPaginationNums([])
          setCurrentMovieList([])
          setSlicedMovieList([])
        }
      })
      .catch(() => {
        setHasError(true)
        setCurrentMovieList([])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleSelectMovie = (movie: CurrentMovieList): void => {
    setSelectedMovie(movie.data)
    handleSiteView(false, true)
  }

  const truncate = (name: string): string => {
    return name.length > 40 ? name.slice(0, 40 - 1) + '...' : name
  }

  useKeyPressEvent('Enter', handleSearchMovies)

  return (
    <div className={css.movie_list}>
      <InputGroup className={css.movie_list_search}>
        <InputGroup.Text>
          <i className='bi bi-search'></i>
        </InputGroup.Text>
        <Form.Control
          placeholder='Search a movie...'
          value={movieName}
          onChange={(event) => setMovieName(event.currentTarget.value)}
        />
        <Button onClick={handleSearchMovies}>Search</Button>
      </InputGroup>
      <div
        className={css.movie_flex}
        style={{
          gridTemplateColumns:
            paginationNums.length === currentPage
              ? 'repeat(auto-fill, minmax(200px, 1fr))'
              : 'repeat(auto-fit, minmax(200px, 1fr))',
        }}
      >
        {isLoading ? (
          <div className={css.loader}></div>
        ) : (
          <Fragment>
            {slicedMovieList && slicedMovieList.length ? (
              slicedMovieList.map((movie, index) => (
                <Card
                  key={index}
                  className={css.movie_flex_card}
                  onClick={() => handleSelectMovie(movie)}
                >
                  <Card.Img
                    variant='top'
                    src={
                      movie.image
                        ? `https://image.tmdb.org/t/p/original/${movie.image}`
                        : placeholder
                    }
                    loading='lazy'
                  />
                  <Card.Body>
                    <Card.Title>{truncate(movie.title)}</Card.Title>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <div className={css.movie_flex_info}>
                {!hasError ? (
                  <Fragment>
                    {!isEmptyMovieList ? (
                      <span>
                        1. Search a movie <i className='bi bi-search'></i>
                        <br />
                        2. Click a movie to create a quiz{' '}
                        <i className='bi bi-film'></i>
                      </span>
                    ) : (
                      <span>No results found... Try another search.</span>
                    )}
                  </Fragment>
                ) : (
                  <span>Error occured... try searching again.</span>
                )}
              </div>
            )}
          </Fragment>
        )}
      </div>
      <Pagination size='lg' className={css.movie_list_nav}>
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
  )
}

export default MovieList
