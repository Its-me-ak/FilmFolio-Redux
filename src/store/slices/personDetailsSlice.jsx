import { createSlice } from "@reduxjs/toolkit";
import { fetchPersonDetails, fetchPersonMovieCredits, fetchSocialLinks } from "../thunk/fetchPersonDetails";

const initialState = {
    personDetails: [],
    personMovieCredits: [],
    personSocialLinks: [],
    loading: false,
    error: null
}

const personDetialsSlice = createSlice({
    name: 'personDetails',
    initialState,
    extraReducers: (builder) => {
        builder
            // Fetch Person Details
            .addCase(fetchPersonDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPersonDetails.fulfilled, (state, action) => {
                state.personDetails = action.payload;
                state.loading = false;
            })
            .addCase(fetchPersonDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Fetch Person Movie Credits
            .addCase(fetchPersonMovieCredits.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPersonMovieCredits.fulfilled, (state, action) => {
                state.personMovieCredits = action.payload;
                state.loading = false;
            })
            .addCase(fetchPersonMovieCredits.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // Fetch Person Social Id's
            .addCase(fetchSocialLinks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSocialLinks.fulfilled, (state, action) => {
                state.personSocialLinks = action.payload;
                state.loading = false;
            })
            .addCase(fetchSocialLinks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
})

export default personDetialsSlice.reducer