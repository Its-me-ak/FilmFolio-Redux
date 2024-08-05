// src/features/genre/genreSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchUpcomingMovies } from '../thunk/fetchUpcomingMovies';

const initialState = {
    upcomingMovies: [],
    page: 1,
    totalPage: null,
    loading: false,
};

const upcomingMovieSlice = createSlice({
    name: 'upcomingMovie',
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.upcomingMovies = action.payload;
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
            .addCase(fetchUpcomingMovies.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
                state.upcomingMovies = state.upcomingMovies.concat(action.payload.results);
                state.totalPage = action.payload.total_pages;
                state.loading = false;
            })
            .addCase(fetchUpcomingMovies.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { setMovies, setTotalPage, setPage } = upcomingMovieSlice.actions;
export default upcomingMovieSlice.reducer;
