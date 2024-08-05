// src/features/movie/thunks/fetchSearchMovies.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '7643d669824a042f46cc3ac52a98852a';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchSearchMovies = createAsyncThunk(
    'movies/fetchSearchMovies',
    async ({ searchQuery, page }) => {
        const response = await axios.get(`${BASE_URL}/search/movie`, {
            params: {
                api_key: API_KEY,
                language: 'en-US',
                query: searchQuery,
                page,
                include_adult: false
            }
        });
        return response.data;
    }
);
