// src/features/genre/genreSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchTrendingMovies } from '../thunk/fetchTrendingMovies';

const initialState = {
    trendingMovies: [],
    page: 1,
    totalPage: null,
    loading: false,
};

const trendingMovieSlice = createSlice({
    name: 'trendingMovie',
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.trendingMovies = action.payload;
        },
        setTotalPage: (state, action) => {
            state.totalPage = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrendingMovies.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
                state.trendingMovies = state.trendingMovies.concat(action.payload.results);
                state.totalPage = action.payload.total_pages;
                state.loading = false;
            })
            .addCase(fetchTrendingMovies.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { setMovies, setTotalPage, setPage } = trendingMovieSlice.actions;
export default trendingMovieSlice.reducer;
