import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3';


export const fetchBollywoodMovies = createAsyncThunk(
    'movies/fetchBollywoodMovies',
    async (page, { getState }) => {
        const state = getState();
        const activeGenre = state.bollywoodMovie.activeGenre;
        const response = await axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${activeGenre}&include_adult=true&language=en-US&with_origin_country=IN&page=${page}&sort_by=popularity.desc`);
        return response.data;
    }
);
