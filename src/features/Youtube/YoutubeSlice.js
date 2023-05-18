import { createSlice } from '@reduxjs/toolkit';
import { youtubeApi } from '../../app/services/Youtube';

const initialState = {
    startDay: "",
    endDay: "",
    weekList: [],
    monthList: [],
    totalCount: {
        realtime: 0,
        daily: 0,
        weekly: 0,
        monthly: 0
    },
    realtimeData: [],
    dailyData: [],
    weeklyData: [],
    monthlyData: [],
    orderCountInPage: 50,
    updateDate: ""
};


export const youtubeSlice = createSlice({
    name: 'youtube',
    initialState,
    extraReducers(builder) {
        builder.addMatcher(youtubeApi.endpoints.getStartDay.matchFulfilled, (state, action) => {
            state.startDay = action.payload.startDay
            state.endDay = action.payload.endDay
        })
        builder.addMatcher(youtubeApi.endpoints.getWeekList.matchFulfilled, (state, action) => {
            state.weekList = action.payload
        })
        builder.addMatcher(youtubeApi.endpoints.getMonthList.matchFulfilled, (state, action) => {
            state.monthList = action.payload
        })
        builder.addMatcher(youtubeApi.endpoints.getRealtimeData.matchFulfilled, (state, action) => {
            state.realtimeData = action.payload.tasks
            state.updateDate = action.payload.updateDate
            state.totalCount.realtime = action.payload.maxOrderNo
        })
        builder.addMatcher(youtubeApi.endpoints.getDailyData.matchFulfilled, (state, action) => {
            state.dailyData = action.payload.tasks
            state.totalCount.daily = action.payload.maxOrderNo
        })
        builder.addMatcher(youtubeApi.endpoints.getWeeklyData.matchFulfilled, (state, action) => {
            state.weeklyData = action.payload.tasks
            state.totalCount.weekly = action.payload.maxOrderNo
        })
        builder.addMatcher(youtubeApi.endpoints.getMonthlyData.matchFulfilled, (state, action) => {
            state.monthlyData = action.payload.tasks
            state.totalCount.monthly = action.payload.maxOrderNo
        })
    }
});

export const { } = youtubeSlice.actions;

export const selectYoutube = (state) => state.youtube;

const youtubeReducer = youtubeSlice.reducer
// export reducer
export default youtubeReducer