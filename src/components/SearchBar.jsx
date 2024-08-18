import {useContext, useEffect, useRef, useState } from "react";
import {
    Container,
    SearchInput,
    IconRightArrow,
    IconMagnifyingGlass
} from "../components/styles";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";
import { fetchSearchMovies } from "../store/thunk/fetchSearchMovies";
import { setQuery, setPage, } from "../store/slices/searchMovieSlice";
import { useDispatch } from "react-redux";
import { MovieContext } from "../context/MovieContext";

function SearchBar() {
    const { setHeader } = useContext(MovieContext)
    const navigate = useNavigate()
    const  dispatch = useDispatch();
    const targetRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const showSearchInput = isHovered || isFocused;

    useEffect(() => {
        targetRef.current.value = "";
    }, [showSearchInput]);

    // created a debounce function for fetchMoviesSearch
    const debounceSearch = debounce(() => {
        const query = targetRef.current.value;
        dispatch(setQuery(query));
        dispatch(setPage(1));
        dispatch(fetchSearchMovies({ query, page: 1, clearResult: true }));

        if (query.trim() !== "") {
            setHeader(`Search Results of "${query}"`)
            navigate(`/search/${encodeURIComponent(query)}`);
        } else {
            navigate('/')
            setHeader("Genres")
        }
    }, 700); // Adjust the delay as needed

    return (
        <Container
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            hover={showSearchInput}
        >
            <SearchInput onKeyUp={debounceSearch} ref={targetRef} showSearchInput={showSearchInput} />
            {showSearchInput ? <IconRightArrow /> : <IconMagnifyingGlass />}
        </Container>
    );
}

export default SearchBar;
