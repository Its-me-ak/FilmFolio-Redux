import { useEffect } from "react"
import Genre from "./Genre"
import MovieCard from "./MovieCard"
import InfiniteScroll from "react-infinite-scroll-component"
import Loader from "./Loader"
import { useDispatch, useSelector } from "react-redux"
import { setPage, setActiveGenre } from "../store/slices/animeMovieSlice"
import { fetchAnimeMovies } from "../store/thunk/fetchAnimeMovies"

const Anime = () => {
    const dispatch = useDispatch()
    const { animeMovies, page, activeGenre, totalPage, loading } = useSelector(state => state.animeMovie)
    console.log(activeGenre);

    useEffect(() => {
        if (animeMovies.length === 0) {
            dispatch(fetchAnimeMovies(page));
        }
    }, [dispatch, page, activeGenre, animeMovies.length]);

    const fetchMoreData = () => {
        if (page < totalPage) {
            dispatch(setPage(page + 1));
        }
    };

    useEffect(() => {
        if (page > 1) {
            dispatch(fetchAnimeMovies(page));
        }
    }, [dispatch, page,]);

    const handleGenreChange = (genreId) => {
        dispatch(setActiveGenre(genreId));
        dispatch(fetchAnimeMovies(1)); // Fetch movies for the new genre immediately
    };

    return (
        <>
            <Genre onGenreChange={handleGenreChange} />
            <div className="movies-container px-6 pb-10 pt-10">
                {
                    loading && page === 1 ? (<Loader />) : (
                        <InfiniteScroll
                            dataLength={animeMovies.length} //This is important field to render the next data
                            next={fetchMoreData}
                            hasMore={page < totalPage}
                            loader={<Loader />}
                            scrollThreshold={0.9}
                            style={{ overflow: 'visible' }}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {animeMovies.map((anime) => (
                                    <MovieCard key={anime.id} movie={anime} type={'movie'} />
                                ))}
                            </div>
                        </InfiniteScroll>
                    )

                }
            </div>
        </>
    )
}

export default Anime


