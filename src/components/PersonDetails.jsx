import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { fetchPersonDetails, fetchPersonMovieCredits, fetchSocialLinks } from "../store/thunk/fetchPersonDetails";
import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { format, parseISO } from 'date-fns'
import MovieSlider from "./MovieSlider";
import Loader from "./Loader";
import { TiArrowBack } from "react-icons/ti";


const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }
    return age;
};

const PersonDetails = () => {
    const [isExpand, setIsExpand] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams();
    const dispatch = useDispatch();
    const { personDetails, personSocialLinks, personMovieCredits, loading, creditLoading } = useSelector(state => state.personDetails)



    useEffect(() => {
        dispatch(fetchPersonDetails(id));
        dispatch(fetchPersonMovieCredits(id));
        dispatch(fetchSocialLinks(id))
    }, [id, dispatch])

    const toggleExpand = () => {
        setIsExpand(!isExpand)
    }

    const croppedBiographyWord = (bio) => {
        const words = bio?.split(' ');
        if (words?.length <= 100) return bio;
        return words?.slice(0, 100).join(' ') + '...';
    };

    const birthday = personDetails.birthday ? parseISO(personDetails.birthday) : null;
    const formattedBirthday = birthday ? format(birthday, "MMMM d, yyyy") : "N/A";
    const age = birthday ? calculateAge(personDetails.birthday) : "N/A";

    return (
        <>
            {loading ? (<Loader />) : (
                <div className="w-full grid grid-cols-[1fr] md:grid-cols-[1fr_3fr] gap-4 py-5 px-5">
                    <div className="absolute top-2 left-3 z-30">
                        <button className="backdrop-blur-sm bg-white/30 p-3 text-2xl text-white font-medium rounded-full" onClick={() => navigate(-1)}>
                            <TiArrowBack />
                        </button>
                    </div>
                    <div className="mt-12">
                        <img src={`https://image.tmdb.org/t/p/w500${personDetails.profile_path}`} alt="" />
                        <ul className="mt-5 flex justify-center items-center gap-4">
                            <li className="text-xl text-gray-300 hover:text-[#38ccd4] transition-all duration-300">
                                <a href={`https://www.facebook.com/${personSocialLinks.facebook_id}`} target="_blank">
                                    <FaFacebookF />
                                </a>
                            </li>
                            <li className="text-xl text-gray-300 hover:text-[#38ccd4] transition-all duration-300">
                                <a href={`https://www.instagram.com/${personSocialLinks.instagram_id}`} target="_blank">
                                    <FaInstagram />
                                </a>
                            </li>
                            <li className="text-xl text-gray-300 hover:text-[#38ccd4] transition-all duration-300">
                                <a href={`https://www.x.com/${personSocialLinks.twitter_id}`} target="_blank">
                                    <FaXTwitter />
                                </a>
                            </li>
                            {personSocialLinks.youtube_id && (
                                <li className="text-xl text-gray-300 hover:text-[#38ccd4] transition-all duration-300">
                                    <a href={`https://www.youtube.com/${personSocialLinks.youtube_id}`} target="_blank">
                                        <FaYoutube />
                                    </a>
                                </li>
                            )}
                        </ul>
                        <h3 className="text-2xl text-gray-200 font-bold mt-7 mb-4">Personal Info</h3>
                        <div className="mb-3">
                            <p className="text-lg text-gray-300 font-semibold">Known For</p>
                            <span className="text-gray-400 text-[15px]">{personDetails.known_for_department}</span>
                        </div>
                        <div className="mb-3">
                            <p className="text-lg text-gray-300 font-semibold">Gender</p>
                            <span className="text-gray-400 text-[15px]">{personDetails.gender === 2 ? "Male" : "Female"}</span>
                        </div>

                        <div className="mb-3">
                            <p className="text-lg text-gray-300 font-semibold">Birthday</p>
                            <span className="text-gray-400 text-[15px]">{formattedBirthday} ({age} years old)</span>
                        </div>

                        <div className="mb-3">
                            <p className="text-lg text-gray-300 font-semibold">Place of Birth</p>
                            <span className="text-gray-400 text-[15px]">{personDetails.place_of_birth}</span>
                        </div>

                        <div>
                            <p className="text-lg text-gray-300 font-semibold">Also Known As</p>
                            <ul className="text-gray-400 text-[15px]">
                                {personDetails.also_known_as && personDetails.also_known_as.length > 0 ? (
                                    personDetails.also_known_as.map((known) => (
                                        <li key={known}>{known}</li>
                                    ))
                                ) : (
                                    <li>No alternative names available</li>
                                )}
                            </ul>
                        </div>


                    </div>
                    <div className="overflow-hidden mt-10">
                        <h1 className="text-3xl font-bold text-gray-200 mb-2">{personDetails.name}</h1>
                        <p className="text-gray-400">
                            {isExpand ? personDetails?.biography : croppedBiographyWord(personDetails?.biography)}
                        </p>
                        {personDetails?.biography?.split(' ').length > 100 && (
                            <button
                                onClick={toggleExpand}
                                className="text-[#38ccd4] font-semibold hover:underline"
                            >
                                {isExpand ? 'Show Less' : 'Read More'}
                            </button>
                        )}


                        <div className="pt-5">
                            <h2 className="font-bold text-lg capitalize text-gray-300 mb-3 md:text-left text-center">known for</h2>
                            {creditLoading ? (
                                <Loader />
                            ) : (
                                personMovieCredits.cast && personMovieCredits.cast.length > 0 && (
                                    <MovieSlider>
                                        {personMovieCredits.cast.map((c) => (
                                            <div key={c.id} className="border-none px-1 outline-none">
                                                <img
                                                    src={`https://image.tmdb.org/t/p/original${c.poster_path}`}
                                                    alt={c.name}
                                                    className="h-[266px] cursor-pointer rounded-lg shadow-xl"
                                                    onClick={() => navigate(`/movie-details/${c.id}`)}
                                                />
                                                <h5 className="text-sm font-semibold text-gray-100 capitalize mt-1">{c.title}</h5>
                                            </div>
                                        ))}
                                    </MovieSlider>
                                )
                            )}
                        </div>


                        <div>
                            <h2 className="font-bold text-lg capitalize text-gray-300 mb-3 md:text-left text-center">Acting Credits</h2>
                            {creditLoading ? (
                                <Loader />
                            )
                                : (
                                    personMovieCredits && personMovieCredits.cast && (
                                        <ul>
                                            {personMovieCredits.cast
                                                .filter(credit => credit.release_date)
                                                .sort((a, b) => new Date(b.release_date) - new Date(a.release_date)) // Sort by release_date in descending order
                                                .map((credit, index, array) => {
                                                    const currentYear = new Date(credit.release_date).getFullYear();
                                                    const nextYear = index < array.length - 1 ? new Date(array[index + 1].release_date).getFullYear() : null;
                                                    const isYearChanged = nextYear && currentYear !== nextYear;

                                                    return (
                                                        <li
                                                            key={credit.credit_id}
                                                            style={{
                                                                borderBottom: isYearChanged ? '1px solid #9ca3afb3' : 'none',
                                                                paddingBottom: isYearChanged ? '10px' : '0',
                                                                marginBottom: isYearChanged ? '10px' : '0',
                                                            }}
                                                        >
                                                            <span className="font-semibold text-gray-300">{currentYear}</span> <span className="w-3 h-[2px] bg-gray-400 inline-block mx-3 mb-1"></span> <span className="text-gray-300 font-bold">{credit.title}</span>
                                                            <p className="text-gray-400 text-sm ml-[90px] mb-2">{credit.character && ` as ${credit.character}`}</p>
                                                        </li>
                                                    );
                                                })}
                                        </ul>
                                    )
                                )
                            }
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}

export default PersonDetails
