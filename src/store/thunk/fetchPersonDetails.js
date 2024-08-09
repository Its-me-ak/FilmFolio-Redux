import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '7643d669824a042f46cc3ac52a98852a';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPersonDetails = createAsyncThunk(
    'person/fetchPersonDetails',
    async (id) => {
        const response = await axios.get(`${BASE_URL}/person/${id}?api_key=${API_KEY}&language=en-US`);
        console.log(response.data);
        return response.data;
    }
);


export const fetchPersonMovieCredits = createAsyncThunk(
    'person/fetchPersonMovieCredits',
    async (id) => {
        const response = await axios.get(`${BASE_URL}/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`);
        console.log(response.data);
        
        return response.data;
    }
);

export const fetchSocialLinks = createAsyncThunk(
    'person/fetchSocialLinks',
    async (id) => {
        const response = await axios.get(`${BASE_URL}/person/${id}/external_ids?api_key=${API_KEY}&language=en-US`);
        console.log(response.data);
        return response.data;
    }
);

