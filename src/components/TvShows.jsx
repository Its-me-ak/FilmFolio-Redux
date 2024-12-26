import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTvShows } from '../store/thunk/fetchTvShows';
import InfiniteScroll from "react-infinite-scroll-component"
import { setPage } from '../store/slices/tvShowsSlices';
import Loader from './Loader';
import MovieCard from './MovieCard';

const TvShows = () => {
    const dispatch = useDispatch();
    const { allShows, totalPage, page, loading } = useSelector((state) => state.tvShows);
    
    useEffect(() => {
        if (allShows.length === 0) {
            dispatch(fetchTvShows(page));
        }
    }, [dispatch, page, allShows.length]);

    const fetchMoreData = () => {
        if (page < totalPage) {
            dispatch(setPage(page + 1));
        }
    };

    useEffect(() => {
        if (page > 1) {
            dispatch(fetchTvShows(page));
        }
    }, [dispatch, page]);

    const filterTvShows = allShows.filter(allShow => allShow.poster_path)

    return (
  <>
            <div className="movies-container px-6 pb-10 pt-10">
                {
                    loading && page === 1 ? (<Loader />) : (
                        <InfiniteScroll
                            dataLength={filterTvShows.length} //This is important field to render the next data
                            next={fetchMoreData}
                            hasMore={page < totalPage}
                            loader={<Loader />}
                            scrollThreshold={0.9}
                            style={{ overflow: 'visible' }}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {filterTvShows.map((tvShow) => (
                                    <MovieCard key={tvShow.id} movie={tvShow}/>
                                ))}
                            </div>
                        </InfiniteScroll>
                    )

                }
            </div>
  </>
    );
};

export default TvShows;
