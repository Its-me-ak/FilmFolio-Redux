// src/features/movie/thunks/filteredGenreThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '7643d669824a042f46cc3ac52a98852a';
const BASE_URL = 'https://api.themoviedb.org/3';


export const fetchTopRatedMovies = createAsyncThunk(
    'movies/fetchTrendingMovies',
    async (page) => {
        const response = await axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`)
        return response.data;
    }
);
