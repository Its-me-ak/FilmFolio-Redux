import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchGenre } from "../store/thunk/fetchGenre"
import { setActiveGenre } from "../store/slices/fetchGenreSlice"

const Genre = ({ onGenreChange }) => {
    const dispatch = useDispatch()
    const { genres, activeGenre } = useSelector(state => state.genre)

    useEffect(() => {
        dispatch(fetchGenre())
    }, [dispatch])

    return (
        <div className="flex flex-wrap gap-4 pe-3 pt-4 justify-center">
            {genres.map((genre) => (
                <button key={genre.id} onClick={() => {
                    dispatch(setActiveGenre(genre.id))
                    onGenreChange(genre.id);
                    
                }} className={`px-2 py-1 rounded-lg text-gray-200 font-semibold ${activeGenre === genre.id ? 'bg-[#38ccd4]' : 'bg-[#455e94]'}`} >
                    {genre.name}
                    {/* {console.log('id', genre.id, "activeGenre", activeGenre)} */}
                </button>
            ))}
        </div>
    )
}

export default Genre
