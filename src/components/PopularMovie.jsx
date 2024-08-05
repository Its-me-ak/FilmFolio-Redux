import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component"
import MovieCard from "./MovieCard"
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies } from "../store/thunk/fetchPopularMovies";
import { setPage } from "../store/slices/popularMovieSlice";


const PopularMovie = () => {
    const dispatch = useDispatch();
    const { popularMovies, page, totalPage, loading } = useSelector(state => state.popularMovie)

    useEffect(() => {
        if (popularMovies.length === 0) {
            dispatch(fetchPopularMovies(page));
        }
    }, [dispatch, page, popularMovies.length]);

    const fetchMoreData = () => {
        if (page < totalPage) {
            dispatch(setPage(page + 1));
        }
    };

    useEffect(() => {
        if (page > 1) {
            dispatch(fetchPopularMovies(page));
        }
    }, [dispatch, page]);

    return (
        <div className="movies-container px-6 pb-10 pt-10">
            {
                loading && page === 1 ? (<Loader />) : (
                    <InfiniteScroll
                        dataLength={popularMovies.length} //This is important field to render the next data
                        next={fetchMoreData}
                        hasMore={page < totalPage}
                        loader={<Loader />}
                        scrollThreshold={0.9}
                        style={{ overflow: "visible" }}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {popularMovies.map((trend, index) => (
                                <MovieCard key={index} movie={trend} />
                            ))}
                        </div>
                    </InfiniteScroll>
                )
            }
        </div>
    );
};

export default PopularMovie;
