// src/features/genre/genreSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchAnimeMovies } from '../thunk/fetchAnimeMovies';

const initialState = {
    animeMovies: [],
    page: 1,
    totalPage: null,
    loading: false,
    activeGenre: 28
};

const animeMovieSlice = createSlice({
    name: 'animeMovie',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setActiveGenre: (state, action) => {
            state.activeGenre = action.payload;
            state.animeMovies = [],
                state.page = 1
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnimeMovies.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAnimeMovies.fulfilled, (state, action) => {
                state.animeMovies = state.animeMovies.concat(action.payload.results);
                state.totalPage = action.payload.total_pages;
                state.loading = false;
            })
            .addCase(fetchAnimeMovies.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { setActiveGenre, setPage } = animeMovieSlice.actions;
export default animeMovieSlice.reducer;
