import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '7643d669824a042f46cc3ac52a98852a';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTvShows = createAsyncThunk(
    'tvShows/fetchTvShows',
    async (page) => {
        const response = await axios.get(`${BASE_URL}/tv/popular?language=en-US&api_key=${API_KEY}&page=${page}&sort_by=popularity.desc`);
        console.log(response.data);
        return response.data;
    }
);