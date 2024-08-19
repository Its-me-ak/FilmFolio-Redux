import { useNavigate } from "react-router-dom"
import { FaRegStar, FaStar } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MovieCard = ({ movie, type }) => {
  const { user } = useAuth0()
  const [isMovieBookmarked, setIsMovieBookmarked] = useState(null)
  const navigate = useNavigate()

  const getReleaseYear = (releaseDate) => {
    return new Date(releaseDate).getFullYear();
  };

  const bookmarkedMovie = () => {
    if (!user) {
      toast.error("You cannot Bookmark a movie before login",
        {
          style: {
            borderRadius: '10px',
            background: '#21263a',
            color: '#fff',
          },
        }
      )
    } else {
      setIsMovieBookmarked(!isMovieBookmarked)
      if (isMovieBookmarked) {
        toast.success("bookmarked movie removed",
          {
            style: {
              borderRadius: '10px',
              background: '#21263a',
              color: '#fff',
            },
          }
        )
        localStorage.removeItem(movie.id);
      } else {
        toast.success("You bookmarked your favorite movie",
          {
            style: {
              borderRadius: '10px',
              background: '#21263a',
              color: '#fff',
            },
          }
        )
        localStorage.setItem(movie.id, JSON.stringify(movie));
      }
    }
  }

  useEffect(()=>{
    if (localStorage.getItem(movie.id)) {
      setIsMovieBookmarked(true)
    }else{
      setIsMovieBookmarked(false)
    }
  },[movie.id])

  const movieTitleOrName = movie.title || movie.name;
  const movieReleaseYear = movie.release_date || movie.first_air_date 

  const itemType = movie.title ? 'movie' : 'tv';
  const handleNavigation = () => {
    navigate(`/${itemType}-details/${movie.id}`);
  };

  return (
    <>
      {/* <Link to={`/movie-details/${movie.id}`} > */}
      <div>
        <div className="card relative hover:scale-105 transition-all duration-300" >
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movieTitleOrName} className="w-full md:h-[350px] h-full shadow-custom object-cover rounded-md" />
          <div className="bg-black/[0.4] absolute cursor-pointer top-0 right-0 h-full w-full z-10 rounded-md" onClick={handleNavigation}></div>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-[#f14748] py-1 px-4 rounded-xl">
            <h5 className="text-[15px] text-gray-100 font-semibold">{movie.vote_average.toFixed(1)}</h5>
          </div>
          <div className="absolute top-2 right-2 z-30 bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 p-2 rounded cursor-pointer" onClick={bookmarkedMovie}>
            {isMovieBookmarked ? <FaStar fill="gold" /> : <FaRegStar fill="gold" />}
          </div>
          <div className="absolute z-20 right-2 bottom-2 bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 py-1 px-2 rounded flex items-center gap-1">
            <img src="/icon/flame.png" className="h-4 w-4" alt="" />
            {/* <FcLike/> */}
            <h5 className="text-sm font-semibold text-gray-100">
              {movie.popularity >= 1000
                ? `${(movie.popularity / 1000).toFixed(1)}k`
                : movie.popularity.toFixed(1)}
            </h5>
          </div>
          <div className="bg-[#455e94] py-1 px-2 absolute bottom-2 left-2 z-20 rounded text-gray-100">
            <h5 className="text-sm font-semibold">{getReleaseYear(movieReleaseYear)}</h5>
          </div>
        </div>
        <div className="text-center text-gray-100 mt-1">
          <h3 className="text-lg font-semibold">{movieTitleOrName}</h3>
        </div>
      </div>
    </>
  )
}


export default MovieCard
