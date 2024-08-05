import { createSlice } from '@reduxjs/toolkit';
import { fetchPopularMovies } from '../thunk/fetchPopularMovies';

const initialState = {
    popularMovies: [],
    page: 1,
    totalPage: null,
    loading: false,
};

const popularMovieSlice = createSlice({
    name: 'popularMovie',
    initialState,
    reducers: {
        setMovies: (state, action) => {
            state.popularMovies = action.payload;
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
            .addCase(fetchPopularMovies.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPopularMovies.fulfilled, (state, action) => {
                state.popularMovies = state.popularMovies.concat(action.payload.results);
                state.totalPage = action.payload.total_pages;
                state.loading = false;
            })
            .addCase(fetchPopularMovies.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { setMovies, setTotalPage, setPage } = popularMovieSlice.actions;
export default popularMovieSlice.reducer;
