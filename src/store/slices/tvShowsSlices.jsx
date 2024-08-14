import { createSlice } from "@reduxjs/toolkit";
import { fetchTvShows } from "../thunk/fetchTvShows";

const initialState = {
    allShows: [],
    page: 1,
    totalPage: null,
    loading: false,
    error: null,
    activeGenre: 28
}

const tvShowsSlice = createSlice({
    name: 'tvShows',
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTvShows.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTvShows.fulfilled, (state, action) => {
                state.loading = false;
                state.allShows = state.allShows.concat(action.payload.results);
                state.totalPage = action.payload.total_pages;
            })
            .addCase(fetchTvShows.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});
export const { setPage } = tvShowsSlice.actions;
export default tvShowsSlice.reducer;