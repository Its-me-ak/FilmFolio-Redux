import { useContext, useEffect, useState } from 'react'
import { MovieContext } from '../context/MovieContext'
import MovieCard from './MovieCard'

const MyCollection = () => {
    const { movieCollection } = useContext(MovieContext)
    const [bookmarkedMovieData, setBookmarkedMovieData] = useState([])

    useEffect(() =>{
        movieCollection()
        const data = window.localStorage
        setBookmarkedMovieData(data)
    }, [])


    return (
        <>
            <div className="movies-container px-6 pb-10 pt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {
                        Object.keys(bookmarkedMovieData).filter(key => !isNaN(key)).length == 0
                            ?
                            <p className="text-xl text-white">No Bookmark Movie Yet!</p>
                            :
                            Object.keys(bookmarkedMovieData).filter(key => !isNaN(key)).map((key, index) => (<MovieCard key={index} movie={{ ...JSON.parse(bookmarkedMovieData[key]) }} />))
                    }
                </div>
            </div>
        </>
    )
}

export default MyCollection
