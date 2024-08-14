import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component"
import MovieCard from "./MovieCard"
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpcomingMovies } from "../store/thunk/fetchUpcomingMovies";
import { setPage } from "../store/slices/upcomingMovieSlice";


const UpcomingMovie = () => {
    const dispatch = useDispatch();
    const { upcomingMovies, page, totalPage, loading } = useSelector(state => state.upcomingMovie)

    useEffect(() => {
        if (upcomingMovies.length === 0) {
            dispatch(fetchUpcomingMovies(page));
        }
    }, [dispatch, page, upcomingMovies.length]);

    const fetchMoreData = () => {
        if (page < totalPage) {
            dispatch(setPage(page + 1));
        }
    };

    useEffect(() => {
        if (page > 1) {
            dispatch(fetchUpcomingMovies(page));
        }
    }, [dispatch, page]);

    return (
        <div className="movies-container px-6 pb-10 pt-10">
            {
                loading && page === 1 ? (<Loader />) : (
                    <InfiniteScroll
                        dataLength={upcomingMovies.length} //This is important field to render the next data
                        next={fetchMoreData}
                        hasMore={page < totalPage}
                        loader={<Loader />}
                        scrollThreshold={0.9}
                        style={{ overflow: "visible" }}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {upcomingMovies.map((upcoming) => (
                                <MovieCard key={upcoming.id} movie={upcoming} type={'movie'} />
                            ))}
                        </div>
                    </InfiniteScroll>
                )
            }
        </div>
    );
};

export default UpcomingMovie;
