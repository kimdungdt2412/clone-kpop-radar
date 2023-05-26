import { createSlice } from '@reduxjs/toolkit';
import { badgeApi } from '../../app/services/Badge';


const initialState = {
    yearList: [],
    badgeData: [],
    rankData: [],
    badgeMap: {},

};


export const badgeSlice = createSlice({
    name: 'badge',
    initialState,
    extraReducers(builder) {
        builder.addMatcher(badgeApi.endpoints.getPeriodList.matchFulfilled, (state, action) => {
            state.yearList = [...new Map(action.payload.tasks?.map(item => [item['year'], item])).values()]
        })
        builder.addMatcher(badgeApi.endpoints.getBadgeData.matchFulfilled, (state, action) => {
            state.rankData = action.payload.rank
            const badgeArtistMap = {}
            action.payload.badges?.forEach(item => {
                if (!badgeArtistMap[item.artistId]) {
                    badgeArtistMap[item.artistId] = action.payload.badges.filter(badge => badge.artistId === item.artistId)
                }
            })
            state.badgeMap = badgeArtistMap
        })
    }
});

export const selectBadge = (state) => state.badge;

const badgeReducer = badgeSlice.reducer
// export reducer
export default badgeReducer