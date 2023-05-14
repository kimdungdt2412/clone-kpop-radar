import { createSlice } from '@reduxjs/toolkit';
import { artistApi } from '../../app/services/Artist';

const initialState = {
    count: 0,
    artistNames: [],
    artistNameIndices: [],
    recommendArtists: [],
    artistInfo: {},
    badge: {},
    summaryBadge: {},
    relatedArtist: {}
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
            .addMatcher(artistApi.endpoints.getArtistInfo.matchFulfilled, (state, action) => {
                state.artistInfo[action.payload.artistPath] = action.payload
            })
            .addMatcher(artistApi.endpoints.incArtistLikeCount.matchFulfilled, (state, action) => {
                let key = action.meta.arg.originalArgs?.artistPath
                state.artistInfo[key].count = action.payload.count
            })
            .addMatcher(artistApi.endpoints.getArtistBadge.matchFulfilled, (state, action) => {
                let key = action.meta.arg.originalArgs?.artistId
                let summaryBadges = {}

                action.payload.badges?.forEach(item => {
                    let newItem = {
                        key: item.number >= 10 ? 10 : item.number,
                        badgeImg: item.summaryImgUrl,
                        songInfo: [],
                        count: 0
                    }

                    if (!Object.hasOwnProperty(newItem.key)) {
                        newItem.count = action.payload.badges?.filter(badge => {
                            let newNumber = badge.number >= 10 ? 10 : badge.number
                            if (newNumber === newItem.key) {
                                newItem.songInfo.push({
                                    name: badge.name,
                                    date: badge.date,
                                    thumbnailUrl: badge.thumbnailUrl,
                                    videoUrl: badge.videoUrl
                                })
                                return true
                            }
                            return false
                        })?.length || 0
                        summaryBadges[newItem.key] = newItem
                    }
                })

                state.badge[key] = action.payload.badges
                state.summaryBadge[key] = Object.keys(summaryBadges).map((key) => summaryBadges[key]).reverse()
            })
            .addMatcher(artistApi.endpoints.getRelatedArtists.matchFulfilled, (state, action) => {
                let key = action.meta.arg.originalArgs?.artistId
                state.relatedArtist[key] = action.payload.artists
            })
    }
});

export const { } = artistSlice.actions;

export const selectArtist = (state) => state.artist;

const artistReducer = artistSlice.reducer
// export reducer
export default artistReducer