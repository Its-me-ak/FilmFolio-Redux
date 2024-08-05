
import MovieCard from "./MovieCard"
import Loader from './Loader'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { fetchSearchMovies } from "../store/thunk/fetchSearchMovies";
import { setPage } from "../store/slices/searchMovieSlice";
import InfiniteScroll from "react-infinite-scroll-component";

const SearchedMovies = () => {
    const dispatch = useDispatch();
    const { searchMovies, loading, page, totalPage, query } = useSelector(state => state.searchedMovies);

    useEffect(() => {
        if (query && page === 1) {
            dispatch(fetchSearchMovies({ searchQuery: query, page }));
        }
    }, [dispatch, query, page]);

    const fetchMoreData = () => {
        if (page < totalPage) {
            dispatch(setPage(page + 1));
        }
    };

    useEffect(() => {
        if (query && page > 1) {
            dispatch(fetchSearchMovies({ searchQuery: query, page }));
        }
    }, [dispatch, query, page]);


    return (
        <>
            <div className="movies-container px-6 pb-10 pt-10">
                {loading && page === 1 ? (<Loader />) : (
                    <InfiniteScroll
                        dataLength={searchMovies.length} // This is important field to render the next data
                        next={fetchMoreData}
                        hasMore={page < totalPage}
                        loader={<Loader />}
                        scrollThreshold={0.9}
                        style={{ overflow: "visible" }}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {searchMovies.map((searchMovie, index) => (
                                <MovieCard key={index} movie={searchMovie} />
                            ))}
                        </div>
                    </InfiniteScroll>
                )}
            </div>
        </>
    )
}

export default SearchedMovies
