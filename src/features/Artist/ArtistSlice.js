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
    relatedArtist: {},
    blipData: {}
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
                action.payload?.forEach(item => {
                    let newItem = {
                        key: item.unit === "10000" ? `${item.number}-${item.unit}` : `${item.number >= 10 ? 10 : item.number}-${item.unit}`,
                        badgeImg: item.summaryImgUrl,
                        songInfo: [],
                        count: 0,
                    }

                    if (!Object.hasOwnProperty(newItem.key)) {
                        newItem.count = action.payload?.filter(badge => {
                            let newNumber = badge.unit === "10000" ? `${badge.number}-${badge.unit}` : `${badge.number >= 10 ? 10 : badge.number}-${badge.unit}`
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

                state.badge[key] = action.payload
                state.summaryBadge[key] = Object.keys(summaryBadges).map((key) => summaryBadges[key]).sort((item1, item2) => (
                    item1.minViewCount > item2.minViewCount
                ))
            })
            .addMatcher(artistApi.endpoints.getRelatedArtists.matchFulfilled, (state, action) => {
                let key = action.meta.arg.originalArgs?.artistId
                state.relatedArtist[key] = action.payload
            })
            .addMatcher(artistApi.endpoints.getBlipData.matchFulfilled, (state, action) => {
                let key = action.meta.arg.originalArgs?.artistId
                state.blipData[key] = action.payload
            })
    }
});

export const selectArtist = (state) => state.artist;

const artistReducer = artistSlice.reducer
// export reducer
export default artistReducer