import { createSlice } from '@reduxjs/toolkit';
import { siteArtistApi } from '../../app/services/SiteArtist';

const formatData = (tasks) => {
    return tasks.map(item => {
        let newItem = {
            ...item,
            total: item.followerCount
        }
        return newItem
    })
}
const initialState = {
    startDay: "",
    endDay: "",
    weekList: [],
    monthList: [],
    yearList: [],
    totalCount: {
        daily: 0,
        weekly: 0,
        monthly: 0
    },
    dailyData: [],
    weeklyData: [],
    monthlyData: [],
    orderCountInPage: 50,
    updateDate: ""
};


export const siteArtistSlice = createSlice({
    name: 'siteArtist',
    initialState,
    extraReducers(builder) {
        builder.addMatcher(siteArtistApi.endpoints.getStartDay.matchFulfilled, (state, action) => {
            state.startDay = action.payload.startDay
            state.endDay = action.payload.endDay
        })
        builder.addMatcher(siteArtistApi.endpoints.getWeekList.matchFulfilled, (state, action) => {
            state.weekList = action.payload
        })
        builder.addMatcher(siteArtistApi.endpoints.getMonthList.matchFulfilled, (state, action) => {
            state.monthList = action.payload
            state.yearList = [...new Map(action.payload?.map(item => [item['year'], item])).values()]
        })
        builder.addMatcher(siteArtistApi.endpoints.getDailyData.matchFulfilled, (state, action) => {
            state.dailyData = formatData(action.payload.tasks)
            state.totalCount.daily = action.payload.maxOrderNo
        })
        builder.addMatcher(siteArtistApi.endpoints.getWeeklyData.matchFulfilled, (state, action) => {
            state.weeklyData = formatData(action.payload.tasks)
            state.totalCount.weekly = action.payload.maxOrderNo
        })
        builder.addMatcher(siteArtistApi.endpoints.getMonthlyData.matchFulfilled, (state, action) => {
            state.monthlyData = formatData(action.payload.tasks)
            state.totalCount.monthly = action.payload.maxOrderNo
        })
    }
});

export const selectSiteArtist = (state) => state.siteArtist;

const siteArtistReducer = siteArtistSlice.reducer
// export reducer
export default siteArtistReducer