import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component"
import MovieCard from "./MovieCard"
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrendingMovies } from "../store/thunk/fetchTrendingMovies";
import { setPage } from "../store/slices/trendingMovieSlice";


const TrendingMovie = () => {
    const dispatch = useDispatch();
    const { trendingMovies, page, totalPage, loading } = useSelector(state => state.trendingMovie)

    useEffect(() => {
        if (trendingMovies.length === 0) {
            dispatch(fetchTrendingMovies(page));
        }
    }, [dispatch, page, trendingMovies.length]);

    const fetchMoreData = () => {
        if (page < totalPage) {
            dispatch(setPage(page + 1));
        }
    };

    useEffect(() => {
        if (page > 1) {
            dispatch(fetchTrendingMovies(page));
        }
    }, [dispatch, page]);

    return (
        <div className="movies-container px-6 pb-10 pt-10">
         {
                loading && page === 1 ? (<Loader />) : (
                    <InfiniteScroll
                        dataLength={trendingMovies.length} //This is important field to render the next data
                        next={fetchMoreData}
                        hasMore={page < totalPage}
                        loader={<Loader />}
                        scrollThreshold={0.9}
                        style={{ overflow: "visible" }}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {trendingMovies.map((trending) => (
                                <MovieCard key={trending.id} movie={trending} />
                            ))}
                        </div>
                    </InfiniteScroll>
            )
         }
        </div>
    );
};

export default TrendingMovie;
