import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3';


export const fetchMovieDetails = createAsyncThunk(
    'movies/fetchMovieDetails',
    async (id) => {
        const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
        console.log(response.data);
        
        return response.data;
    }
);


export const fetchCastAndCrew = createAsyncThunk(
    'movie/fetchCastAndCrew',
    async (id) => {
        const response = await axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
        console.log(response.data);
        return response.data;
    }
);

export const fetchMovieVideos = createAsyncThunk(
    'movie/fetchMovieVideos',
    async (id) => {
        const response = await axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
        return response.data;
    }
);

