// src/features/genre/genreSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchGenre } from '../thunk/fetchGenre';

const initialState = {
    genres: [],
    activeGenre: 28,
};

const genreSlice = createSlice({
    name: 'genre',
    initialState,
    reducers: {
        setActiveGenre: (state, action) => {
            state.activeGenre = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchGenre.fulfilled, (state, action) => {
            state.genres = action.payload;
        });
    },
});

export const { setActiveGenre } = genreSlice.actions;
export default genreSlice.reducer;
