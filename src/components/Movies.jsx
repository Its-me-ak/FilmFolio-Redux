import { useEffect } from "react"
import Genre from "./Genre"
import MovieCard from "./MovieCard"
import InfiniteScroll from "react-infinite-scroll-component"
import Loader from "./Loader"
import { useDispatch, useSelector } from "react-redux"
import { setPage, setActiveGenre} from "../store/slices/filteredGenreSlice"
import { filteredGenre } from "../store/thunk/filteredGenre"

const Movies = () => {
    const dispatch = useDispatch()
    const { movies, page, activeGenre, totalPage, loading } = useSelector(state => state.filterGenre)

    useEffect(() => {
        if (movies.length === 0) {
            dispatch(filteredGenre(page));
        }
    }, [dispatch, page, activeGenre, movies.length]);

    const fetchMoreData = () => {
        if (page < totalPage) {
            dispatch(setPage(page + 1));
        }
    };

    useEffect(() => {
        if (page > 1) {
            dispatch(filteredGenre(page));
        }
    }, [dispatch, page]);

    const handleGenreChange = (genreId) => {
        dispatch(setActiveGenre(genreId));
        dispatch(filteredGenre(1)); // Fetch movies for the new genre immediately
    };
    return (
        <>
            <Genre onGenreChange={handleGenreChange} />
            <div className="movies-container px-6 pb-10 pt-10">
                {
                    loading && page === 1 ? (<Loader />) : (
                        <InfiniteScroll
                            dataLength={movies.length} //This is important field to render the next data
                            next={fetchMoreData}
                            hasMore={page < totalPage}
                            loader={<Loader />}
                            scrollThreshold={0.9}
                            style={{ overflow: 'visible' }}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {movies.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} type={'movie'} />
                                ))}
                            </div>
                        </InfiniteScroll>
                    )

                }
            </div>
        </>
    )
}

export default Movies
