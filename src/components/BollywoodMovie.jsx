import { useEffect } from "react"
import Genre from "./Genre"
import MovieCard from "./MovieCard"
import InfiniteScroll from "react-infinite-scroll-component"
import Loader from "./Loader"
import { useDispatch, useSelector } from "react-redux"
import { setPage, setActiveGenre } from "../store/slices/bollywoodMovieSlice"
import { fetchBollywoodMovies } from "../store/thunk/fetchBollywoodMovies"

const BollywoodMovie = () => {
    const dispatch = useDispatch()
    const { bollywoodMovies, page, activeGenre, totalPage, loading } = useSelector(state => state.bollywoodMovie)
    console.log(activeGenre);

    useEffect(() => {
        if (bollywoodMovies.length === 0) {
            dispatch(fetchBollywoodMovies(page));
        }
    }, [dispatch, page, activeGenre, bollywoodMovies.length]);

    const fetchMoreData = () => {
        if (page < totalPage) {
            dispatch(setPage(page + 1));
        }
    };

    useEffect(() => {
        if (page > 1) {
            dispatch(fetchBollywoodMovies(page));
        }
    }, [dispatch, page,]);

    const handleGenreChange = (genreId) => {
        dispatch(setActiveGenre(genreId));
        dispatch(fetchBollywoodMovies(1)); // Fetch movies for the new genre immediately
    };

    return (
        <>
            <Genre onGenreChange={handleGenreChange} />
            <div className="movies-container px-6 pb-10 pt-10">
                {
                    loading && page === 1 ? (<Loader />) : (
                        <InfiniteScroll
                            dataLength={bollywoodMovies.length} //This is important field to render the next data
                            next={fetchMoreData}
                            hasMore={page < totalPage}
                            loader={<Loader />}
                            scrollThreshold={0.9}
                            style={{ overflow: 'visible' }}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {bollywoodMovies.map((bollywood) => (
                                    <MovieCard key={bollywood.id} movie={bollywood}/>
                                ))}
                            </div>
                        </InfiniteScroll>
                    )

                }
            </div>
        </>
    )
}

export default BollywoodMovie
