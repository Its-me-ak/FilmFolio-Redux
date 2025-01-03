import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3';


export const filteredGenre = createAsyncThunk(
    'movies/filteredGenre',
    async (page, { getState }) => {
        const state = getState();
        const activeGenre = state.filterGenre.activeGenre;
        const response = await axios.get(
            `${BASE_URL}/discover/movie?with_genres=${activeGenre}&api_key=${API_KEY}&with_origin_country=US&page=${page}`
        );
        return response.data;
    }
);
