import { useState, useEffect } from "react";

export function useMovie(query) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const KEY = "2df7b3f9"

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
      return;
    }

    //befor seacrh again close watched movies
    //   handleCloseMovie()
    fetchMovies()

    return function () {
      controller.abort()
    }
  }, [query])

  return { movies, isLoading, error }
}