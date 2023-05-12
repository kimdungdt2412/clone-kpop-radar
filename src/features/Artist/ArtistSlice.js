import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { artistApi } from '../../app/services/Artist';
import { findKeyOfMap } from '../../utils/function';

const initialState = {
    artistNames: [],
    artistNameIndices: [],
    recommendArtists: [],
    artistInfo: {},
    count: 0,
};

export const getArtistLikeCount = createAsyncThunk(
  'artistApi/getArtistLikeCount',
  async (payload) => {
    console.log("hi")
    const [trigger] = artistApi.endpoints.incArtistLikeCount.useLazyQuery()
    console.log(payload, trigger)
    trigger(payload)
    return {};
  }
);

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
            .addMatcher(artistApi.endpoints.getArtistInfo.matchFulfilled, (state, action) => {
                state.artistInfo[action.payload.artistPath] = action.payload
            })
            .addMatcher(artistApi.endpoints.incArtistLikeCount.matchFulfilled, (state, action) => {
               let key = action.meta.arg.originalArgs?.artistPath
                state.artistInfo[key].count = action.payload.count
            })
    }
});

export const { } = artistSlice.actions;

export const selectArtist = (state) => state.artist;

const artistReducer = artistSlice.reducer
// export reducer
export default artistReducer