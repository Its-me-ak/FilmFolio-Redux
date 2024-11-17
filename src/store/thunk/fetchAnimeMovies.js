// src/features/movie/thunks/filteredGenreThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '7643d669824a042f46cc3ac52a98852a';
const BASE_URL = 'https://api.themoviedb.org/3';


export const fetchAnimeMovies = createAsyncThunk(
    'movies/fetchAnimeMovies',
    async (page, { getState }) => {
        const state = getState();
        const activeGenre = state.animeMovie.activeGenre;
        const response = await axios.get(`${BASE_URL}/discover/movie?with_genres=${activeGenre}&api_key=${API_KEY}&with_keywords=210024|287501&page=${page}`)
        return response.data;
    }
);
console.dir(fetchAnimeMovies);

