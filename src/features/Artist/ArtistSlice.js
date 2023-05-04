import { createSlice } from '@reduxjs/toolkit';
import { artistApi } from '../../app/services/Artist';

const initialState = {
    artistNames: [],
    artistNameIndices: [],
    recommendArtists: [],
    count: 0,
};


export const artistSlice = createSlice({
    name: 'artist',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addMatcher(artistApi.endpoints.getArtistNameIndices.matchFulfilled, (state, action) => {
                state.artistNameIndices = action.payload.indices
            })
            .addMatcher(artistApi.endpoints.getArtistNames.matchFulfilled, (state, action) => {
                state.artistNames = action.payload.artists
                let unique = [...new Map(action.payload.artists.map((item) => [item.artistId, item])).values()];
                state.count = unique.length ?? 0
            })
            .addMatcher(artistApi.endpoints.getRecommendArtists.matchFulfilled, (state, action) => {
                state.recommendArtists = action.payload.artists
            })
    }
});

export const { } = artistSlice.actions;

export const selectArtist = (state) => state.artist;

const artistReducer = artistSlice.reducer
// export reducer
export default artistReducer