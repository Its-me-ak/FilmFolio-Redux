import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3';


export const fetchPopularMovies = createAsyncThunk(
    'movies/fetchPopularMovies',
    async (page) => {
        const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
        return response.data;
    }
);
// console.dir(fetchPopularMovies)
