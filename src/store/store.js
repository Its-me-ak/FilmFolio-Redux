import { configureStore } from "@reduxjs/toolkit";
import genreReducer from './slices/fetchGenreSlice';
import filtereGenreReducer from './slices/filteredGenreSlice'
import trendingMovieReducer from './slices/trendingMovieSlice'
import searchedMovieReducer from './slices/searchMovieSlice';
import popularMovieReducer from './slices/popularMovieSlice';
import topRatedMovieReducer from './slices/topRatedMovieSlice.'
import bollywoodMovieReducer from './slices/bollywoodMovieSlice'
import animeMovieReducer from './slices/animeMovieSlice'
import upcomingMovieReducer from './slices/upcomingMovieSlice'
import movieDetailsReducer from './slices/movieDetailsSlice'
import personDetailsReducer from './slices/personDetailsSlice'
import tvShowsReducer from './slices/tvShowsSlices'


export const store = configureStore({
    reducer: {
        genre: genreReducer,
        filterGenre: filtereGenreReducer,
        trendingMovie: trendingMovieReducer,
        searchedMovies: searchedMovieReducer,
        popularMovie: popularMovieReducer,
        topRatedMovie: topRatedMovieReducer,
        bollywoodMovie: bollywoodMovieReducer,
        animeMovie: animeMovieReducer,
        upcomingMovie: upcomingMovieReducer,
        movieDetails: movieDetailsReducer,
        personDetails: personDetailsReducer,
        tvShows: tvShowsReducer,
    },
});
