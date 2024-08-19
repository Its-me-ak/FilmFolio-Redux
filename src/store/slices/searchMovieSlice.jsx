// store/slices/searchedMoviesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchSearchMovies } from '../thunk/fetchSearchMovies';

const initialState = {
    searchMovies: [],
    totalResult: 0,
    loading: false,
    error: null,
    page: 1,
    totalPage: 0,
    query: '',
    type: ''
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
        clearSearchResult(state) {
            state.searchMovies = [];
            state.totalResult = 0;
            state.totalPage = 0;
            state.page = 1;
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

export const { setPage, setQuery, clearSearchResult } = searchedMoviesSlice.actions;
export default searchedMoviesSlice.reducer;
