import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3';


export const fetchTvShowDetails = createAsyncThunk(
    'tvShows/fetchTvShowDetails',
    async (id) => {
        const response = await axios.get(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US`);
        console.log(response.data);
        return response.data;
    }
);


export const fetchTvShowCastAndCrew = createAsyncThunk(
    'tvShows/fetchTvShowCastAndCrew',
    async (id) => {
        const response = await axios.get(`${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}&language=en-US`);
        console.log(response.data);
        return response.data;
    }
);

export const fetchTvShowVideos = createAsyncThunk(
    'tvShows/fetchTvShowVideos',
    async (id) => {
        const response = await axios.get(`${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}&language=en-US`);
        return response.data;
    }
);

