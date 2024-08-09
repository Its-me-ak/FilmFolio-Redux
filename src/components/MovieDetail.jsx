import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import MovieSlider from "./MovieSlider";
import ReactPlayer from "react-player";
import { TiArrowBack } from "react-icons/ti";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails, fetchCastAndCrew, fetchMovieVideos } from "../store/thunk/fetchMovieDetails";
import { setCurrentVideo } from "../store/slices/movieDetailsSlice";


const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { movieDetails, casts, crews, videos, currentVideo, loading } = useSelector(state => state.movieDetails);

    useEffect(() => {
        dispatch(fetchMovieDetails(id));
        dispatch(fetchCastAndCrew(id));
        dispatch(fetchMovieVideos(id));
    }, [dispatch, id]);

    const filteredCasts = casts.filter(cast => cast.profile_path);
    
    const filteredCrews = crews.filter(crew => crew.profile_path);

    // Get video resolution based on video size
    const getVideoResolution = (video) => {
        if (!video) return "HD"; // Default to HD if no video object
        const { size } = video;
        if (size === 720) return "HD";
        if (size === 1080) return "UHD";
        if (size === 2160) return "4K";
        if (size === 1440) return "2K";
        return "HD"; // Default to HD for unrecognized sizes
    };

    return (
        <>
            {loading ? (<Loader />) : (
                <div className="w-full lg:h-screen md:h-[650px] h-[750px] relative">
                    <div className="absolute top-2 left-3 z-30">
                        <button className="backdrop-blur-sm bg-white/30 p-3 text-2xl text-white font-medium rounded-full" onClick={() => navigate(-1)}>
                            <TiArrowBack />
                        </button>
                    </div>
                    {movieDetails && (
                        <>
                            <img src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`} className="h-full w-full object-cover" alt="" />
                            <div className="bg-black/[0.65] w-full h-full absolute top-0 left-0 z-10" ></div>
                            <div className="movie-content absolute top-0 left-0 z-20 lg:w-2/3 md:w-4/5 w-full md:pt-24 pt-16 md:px-5 px-3">
                                <h1 className="font-bold text-gray-100 md:text-5xl text-4xl">{movieDetails.title}</h1>
                                <p className="text-gray-200 font-light pt-2 md:text-left text-justify">{movieDetails.overview}</p>
                                <div className="flex flex-wrap md:justify-start justify-center gap-6 mt-4">
                                    <li className="text-center list-none">
                                        <h5 className="text-gray-200 font-semibold capitalize">movie length</h5>
                                        <p className="text-[#38ccd4] font-medium text-[15px]">{movieDetails.runtime} minutes</p>
                                    </li>
                                    <li className="text-center list-none">
                                        <h5 className="text-gray-200 font-semibold capitalize">release date</h5>
                                        <p className="text-[#38ccd4] font-medium text-[15px]">{movieDetails.release_date}</p>
                                    </li>
                                    <li className="text-center list-none">
                                        <h5 className="text-gray-200 font-semibold capitalize">country</h5>
                                        <p className="text-[#38ccd4] font-medium text-[15px]">{(movieDetails.origin_country) && movieDetails.origin_country.length > 0
                                            ? movieDetails.origin_country.join(' / ')
                                            : movieDetails.origin_country}</p>
                                    </li>
                                    <li className="text-center list-none">
                                        <h5 className="text-gray-200 font-semibold capitalize">IMDB Ratings</h5>
                                        <p className="text-[#38ccd4] font-medium text-[15px]">{movieDetails.vote_average.toFixed(1)}</p>
                                    </li>

                                    <li className="text-center list-none">
                                        <h5 className="text-gray-200 font-semibold capitalize">budget</h5>
                                        <p className="text-[#38ccd4] font-medium text-[15px]">
                                            {movieDetails.budget ? (movieDetails.budget / 1000000).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + ' million' : 'N/A'}
                                        </p>
                                    </li>

                                    <li className="text-center list-none">
                                        <h5 className="text-gray-200 font-semibold capitalize">revenue</h5>
                                        <p className="text-[#38ccd4] font-medium text-[15px]">
                                            {movieDetails.revenue ? (movieDetails.revenue / 1000000).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) + ' million' : 'N/A'}
                                        </p>
                                    </li>
                                </div>

                                <div className="genres mt-7 flex flex-wrap gap-3">
                                    {movieDetails.genres && movieDetails.genres.length > 0 && (
                                        <span className="backdrop-blur-sm bg-white/30 px-2 py-[5px] text-white font-medium">
                                            {movieDetails.genres.map(genre => genre.name).join(' / ')}
                                        </span>
                                    )}

                                    <span className="backdrop-blur-sm bg-white/30 px-2 py-[5px] text-white font-medium">{movieDetails.spoken_languages?.[0]?.name}</span>
                                    <span className="backdrop-blur-sm bg-white/30 px-2 py-[5px] text-white font-medium">{getVideoResolution(currentVideo)}</span>
                                </div>

                                {videos.length > 0 && (
                                    <div className="mt-4">
                                        {videos.map((video, index) => (
                                            <button
                                                key={index}
                                                onClick={() => dispatch(setCurrentVideo(video))}
                                                className="bg-[#38ccd4] text-white font-bold py-2 px-4 rounded me-4"
                                            >
                                                Watch Trailer {index + 1}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            )}

            {currentVideo && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                    <div className="relative w-full md:max-w-4xl">
                        <button onClick={() => dispatch(setCurrentVideo(null))} className="absolute top-1 right-1 text-white bg-red-600 rounded-lg px-2 py-1">
                            Close
                        </button>
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${currentVideo.key}`}
                            className="!w-full md:!h-[550px]"
                            controls
                        />
                    </div>
                </div>
            )}
            <div className="py-4 px-3">
                <h2 className="font-bold text-2xl uppercase text-gray-300 mb-3 md:text-left text-center">The Cast</h2>
                <MovieSlider>
                    {
                        filteredCasts.map((cast) => (
                            <div key={cast.id} className="border-none px-1 outline-none">
                                <img src={`https://image.tmdb.org/t/p/original${cast.profile_path}`} alt={cast.name} className="h-[300px] rounded-lg shadow-xl" onClick={() => navigate(`/person-details/${cast.id}`)} />
                                <h5 className="font-semibold text-gray-100 capitalize mt-1">{cast.name}</h5>
                                <p className="text-sm text-[#38ccd4] font-semibold">{cast.character}</p>
                            </div>
                        ))
                    }
                </MovieSlider>
            </div>

            <div className="mt-985 py-4 px-3">
                <h2 className="font-bold text-2xl uppercase text-gray-300 mb-3 md:text-left text-center">crew members</h2>
                <MovieSlider>
                    {
                        filteredCrews.map((crew) => (
                            <div key={crew.id} className="border-none px-1 outline-none">
                                <img src={`https://image.tmdb.org/t/p/original${crew.profile_path}`} alt={crew.profile_path} className="h-[300px] rounded-lg shadow-xl" />
                                <h5 className="font-semibold text-gray-100 capitalize mt-1">{crew.name}</h5>
                                <p className="text-sm text-[#38ccd4] font-semibold">{crew.job}</p>
                            </div>
                        ))
                    }
                </MovieSlider>
            </div>
        </>
    )
}
export default MovieDetail
