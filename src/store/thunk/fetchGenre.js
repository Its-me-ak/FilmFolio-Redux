// src/features/movie/thunks/fetchGenreThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '7643d669824a042f46cc3ac52a98852a';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchGenre = createAsyncThunk('movie/fetchGenre', async () => {
    const response = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    return response.data.genres;
});
