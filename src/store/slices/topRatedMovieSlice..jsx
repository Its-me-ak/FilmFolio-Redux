// src/features/genre/genreSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchTopRatedMovies } from '../thunk/fetchTopRatedMovie'; 

const initialState = {
    topRatedMovies: [],
    page: 1,
    totalPage: null,
    loading: false,
};

const topRatedMovieSlice = createSlice({
    name: 'topRatedMovie',
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.topRatedMovies = action.payload;
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
            .addCase(fetchTopRatedMovies.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
                state.topRatedMovies = state.topRatedMovies.concat(action.payload.results);
                state.totalPage = action.payload.total_pages;
                state.loading = false;
            })
            .addCase(fetchTopRatedMovies.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { setMovies, setTotalPage, setPage } = topRatedMovieSlice.actions;
export default topRatedMovieSlice.reducer;
