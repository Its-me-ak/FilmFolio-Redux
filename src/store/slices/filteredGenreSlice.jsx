// src/features/genre/genreSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { filteredGenre } from '../thunk/filteredGenre';

const initialState = {
    movies: [],
    page: 1,
    activeGenre: 28,
    totalPage: null,
    loading: false,
};

const filteredGenreSlice = createSlice({
    name: 'filterGenre',
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.movies = action.payload;
        },
        setTotalPage: (state, action) => {
            state.totalPage = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setActiveGenre: (state, action) => {
            state.activeGenre = action.payload;
            state.movies = [],
            state.page = 1
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(filteredGenre.pending, (state) => {
                state.loading = true;
            })
            .addCase(filteredGenre.fulfilled, (state, action) => {
                state.movies = state.movies.concat(action.payload.results);
                state.totalPage = action.payload.total_pages;
                state.loading = false;
            })
            .addCase(filteredGenre.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { setActiveGenre, setMovies, setTotalPage, setPage } = filteredGenreSlice.actions;
export default filteredGenreSlice.reducer;
