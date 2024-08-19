// src/features/movie/thunks/fetchSearchContent.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { clearSearchResult } from '../slices/searchMovieSlice';

const API_KEY = '7643d669824a042f46cc3ac52a98852a';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchSearchMovies = createAsyncThunk(
    'movies/fetchSearchMovies',
    async ({ searchQuery, page, clearResult, type }, {dispatch}) => {
        if(clearResult){
            dispatch(clearSearchResult());
        }
        try {
            // Fetch movies
            const movieResponse = await axios.get(`${BASE_URL}/search/movie`, {
                params: {
                    type,
                    api_key: API_KEY,
                    language: 'en-US',
                    query: searchQuery,
                    page,
                    include_adult: false,
                },
            });

            // Fetch TV shows
            const tvResponse = await axios.get(`${BASE_URL}/search/tv`, {
                params: {
                    type,
                    api_key: API_KEY,
                    language: 'en-US',
                    query: searchQuery,
                    page,
                    include_adult: false,
                },
            });

            // Combine the results from both requests
            const combinedResults = {
                page: movieResponse.data.page, // Assuming both responses return the same page number
                total_results: movieResponse.data.total_results + tvResponse.data.total_results,
                total_pages: Math.max(movieResponse.data.total_pages, tvResponse.data.total_pages), // This assumes you want to use the maximum page count between the two
                results: [...movieResponse.data.results, ...tvResponse.data.results],
            };

            return combinedResults;
        } catch (error) {
            console.error("Error fetching search content:", error);
            throw error;
        }
    }
);
