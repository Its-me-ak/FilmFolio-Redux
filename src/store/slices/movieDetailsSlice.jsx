// src/features/genre/genreSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchMovieDetails, fetchCastAndCrew, fetchMovieVideos } from '../thunk/fetchMovieDetails';

const initialState = {
    movieDetails: null,
    casts: [],
    crews: [],
    videos: [],
    loading: false,
    error: null,
}

const movieDetailsSlice = createSlice({
    name: 'movieDetails',
    initialState,
    reducers: {
        setCurrentVideo: (state, action) => {
            state.currentVideo = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                state.movieDetails = action.payload;
                state.loading = false;
            })
            .addCase(fetchMovieDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchCastAndCrew.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCastAndCrew.fulfilled, (state, action) => {
                state.casts = action.payload.cast;
                state.crews = action.payload.crew;
                state.loading = false;
            })
            .addCase(fetchCastAndCrew.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchMovieVideos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovieVideos.fulfilled, (state, action) => {
                state.videos = action.payload.results.filter(video => video.name.toLowerCase().includes("official trailer"));
                state.loading = false;
            })
            .addCase(fetchMovieVideos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setCurrentVideo } = movieDetailsSlice.actions;
export default movieDetailsSlice.reducer;
