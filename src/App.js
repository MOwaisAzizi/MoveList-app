import { useEffect, useState } from "react";
import StarRating from "./Star";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);


export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([])
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const KEY = "2df7b3f9"
  const [selectedId, setSelectedId] = useState(null)

  function handleSelectedMovie(id) {
    setSelectedId(selectedId => selectedId == id ? null : id)
  }
  function handleCloseMovie() {
    setSelectedId(null)
  }

  function handleWatchedMovies(movie) {
    setWatched(watched => [...watched, movie])
  }

  function deleteWatchedHandler(id) {
    setWatched(watched => watched.filter(movie => movie.imdId !== id))
  }


  //this method is for browser not react to control the extra fetch data from api
  const controller = new AbortController()

  useEffect(function () {
    async function fetchMovies() {
      try {
        setIsLoading(true)
        setError('')

        const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal })

        if (!res.ok) throw new Error('something went wrong with fetching movies list')

        const data = await res.json()
        if (data.Response == 'False') throw new Error('Movie Not Found!')

        setMovies(data.Search)
        setError('')

      } catch (err) {
        if (err.name !== 'AbortError')
          setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    if (query.length < 3) {
      setError('')
      setMovies([])
      return
    }

    //befor seacrh again close watched movies
    handleCloseMovie()
    fetchMovies()

    return function () {
      controller.abort()
    }
  }, [query])




  return (

    // {/* another way of writing composite Component like children(but in the component, change the children to element  )  */}
    // {/* <Box element = {<MovieList movies={movies} />}>
    // <Box element = {<> <WatchedMovieSummary watched={watched} />  <WatchedMovieList watched={watched}/></>}></Box> */}

    <>
      {/* for preventing drilling props amung the component that thay do not need but just pass it to children use from composite way like bottum */}

      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {/* //a text whin not load yet
          // isLoading ? <Loader/> : <MovieList movies={movies} /> */}
          {isLoading && <Loader />}
          {
            /////////////change Star please
            !isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectedMovie} />
          }
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? <MoviDetails watched={watched} onWatchedMovie={handleWatchedMovies} KEY={KEY} selectedId={selectedId} onClosemovie={handleCloseMovie} /> :
            (
              <>
                <WatchedMovieSummary watched={watched} />
                <WatchedMovieList watched={watched} onDeleteWached={deleteWatchedHandler} />
              </>
            )}

        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>
}

function ErrorMessage({ message }) {
  return <p className="error"><span>⛔</span> {message}</p>
}

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  )
}

function Logo() {
  return (
    <div className="logo hidden">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  )
}

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  )
}


function Main({ children }) {
  return (
    <main className="main">
      {children}
    </main>
  )
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && (
        children
      )}
    </div>
  )
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  )
}

function Movie({ movie, onSelectMovie }) {

  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}

function MoviDetails({ selectedId, onClosemovie, KEY, onWatchedMovie, watched }) {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState('')

  const iswatched = watched.map(movie => movie.imdId).includes(selectedId)
  const watchedUserRating = watched.find(movie => movie.imdId == selectedId)?.userRating


  const { Title: title, Actors: actors, Runtime: runtime, Plot: plot,
    Released: realeased, Year: year, Poster: poster, imdbRating,
    Director: director, Genre: genre } = movie

  useEffect(function () {
    if (!title) return
    document.title = `Movie | ${title}`

    return function () {
      document.title = `usePopcorn`
    }

  }, [title])


  useEffect(function () {
    setIsLoading(true)
    async function getMovieDetail() {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
      const data = await res.json()
      setMovie(data)
      setIsLoading(false)
    }
    getMovieDetail()
  }, [selectedId])

  //whin closing just do it if it is closed already not do it
  useEffect(function () {
    function callback(e) {
      if (e.code == 'Escape') {
        onClosemovie()
      }
    }
    document.addEventListener('keydown', callback)

    //remove already keyDown
    return function () {
      document.removeEventListener('keydown', callback)
    }
  }, [onClosemovie])

  function handleAdd() {
    const newMovie = {
      imdId: selectedId,
      title,
      poster,
      year,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
    }
    onWatchedMovie(newMovie)
    onClosemovie()
  }

  return (
    <div className="details">
      {isLoading ? <Loader /> :
        <>
          <header>
            <button onClick={onClosemovie} className="btn-back">&larr;</button>
            <img src={poster} alt={`poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>{realeased} &bull; {runtime}</p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {
                !iswatched ?
                  <>
                    <StarRating size={24} maxStar={10} color="yellow" onSetsetMovieRating={setUserRating} />
                    {userRating > 0 && <button className='btn-add'
                      onClick={handleAdd}>+ add to list</button>} </>
                  : <p>You Rated This Movie {watchedUserRating} ⭐</p>
              }
            </div>



            <p><em>{plot}</em></p>

            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      }
    </div >
  )
}

function WatchedMovieSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));

  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  )
}

function WatchedMovieList({ watched, onDeleteWached }) {
  return (
    <ul className="list list-watched">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} onDeleteWached={onDeleteWached} />
      ))}
    </ul>
  )
}

function WatchedMovie({ movie, onDeleteWached }) {

  return (
    <li >
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className="btn-delete" onClick={() => onDeleteWached(movie.imdId)}>X</button>
      </div>
    </li>
  )
}