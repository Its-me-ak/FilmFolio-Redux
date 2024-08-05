// store/slices/searchedMoviesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchSearchMovies } from '../thunk/fetchSearchMovies';

const initialState = {
    searchMovies: [],
    loading: false,
    error: null,
    page: 1,
    totalPage: 1,
    query: '',
};

const searchedMoviesSlice = createSlice({
    name: 'searchedMovies',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setQuery: (state, action) => {
            state.query = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSearchMovies.fulfilled, (state, action) => {
                state.searchMovies = state.searchMovies.concat(action.payload.results);
                state.totalPage = action.payload.total_pages;
                state.loading = false;
            })
            .addCase(fetchSearchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setPage, setQuery } = searchedMoviesSlice.actions;
export default searchedMoviesSlice.reducer;
