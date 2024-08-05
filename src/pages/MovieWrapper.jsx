import React from 'react'
import { useParams } from 'react-router-dom'
import SearchedMovies from '../components/SearchedMovies'
import Movies from '../components/Movies'

const MovieWrapper = () => {
    const {query} = useParams()
  return (
    <>
        {query ? <SearchedMovies  query={query}/> : <Movies/>}

    </>
  )
}

export default MovieWrapper
