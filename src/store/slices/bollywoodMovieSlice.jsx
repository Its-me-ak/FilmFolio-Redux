// src/features/genre/genreSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchBollywoodMovies } from '../thunk/fetchBollywoodMovies';

const initialState = {
    bollywoodMovies: [],
    page: 1,
    totalPage: null,
    loading: false,
    activeGenre: 28
};

const bollywoodMovieSlice = createSlice({
    name: 'bollywoodMovie',
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.bollywoodMovies = action.payload;
        },
        setTotalPage: (state, action) => {
            state.totalPage = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setActiveGenre: (state, action) => {
            state.activeGenre = action.payload;
            state.bollywoodMovies = [],
            state.page = 1
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBollywoodMovies.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBollywoodMovies.fulfilled, (state, action) => {
                state.bollywoodMovies = state.bollywoodMovies.concat(action.payload.results);
                state.totalPage = action.payload.total_pages;
                state.loading = false;
            })
            .addCase(fetchBollywoodMovies.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { setActiveGenre, setMovies, setTotalPage, setPage } = bollywoodMovieSlice.actions;
export default bollywoodMovieSlice.reducer;
