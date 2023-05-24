import { createSlice } from '@reduxjs/toolkit';
import { youtubeApi } from '../../app/services/Youtube';

const formatData = (tasks) => {
    return tasks.map(item => {
        let newItem = {
            ...item,
            total: item.playCount
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
            state.yearList = [...new Map(action.payload?.map(item => [item['year'], item])).values()]
        })
        builder.addMatcher(youtubeApi.endpoints.getRealtimeData.matchFulfilled, (state, action) => {
            state.realtimeData = formatData(action.payload.tasks)
            state.updateDate = action.payload.updateDate
            state.totalCount.realtime = action.payload.maxOrderNo
        })
        builder.addMatcher(youtubeApi.endpoints.getDailyData.matchFulfilled, (state, action) => {
            state.dailyData = formatData(action.payload.tasks)
            state.totalCount.daily = action.payload.maxOrderNo
        })
        builder.addMatcher(youtubeApi.endpoints.getWeeklyData.matchFulfilled, (state, action) => {
            state.weeklyData = formatData(action.payload.tasks)
            state.totalCount.weekly = action.payload.maxOrderNo
        })
        builder.addMatcher(youtubeApi.endpoints.getMonthlyData.matchFulfilled, (state, action) => {
            state.monthlyData = formatData(action.payload.tasks)
            state.totalCount.monthly = action.payload.maxOrderNo
        })
    }
});

export const selectYoutube = (state) => state.youtube;

const youtubeReducer = youtubeSlice.reducer
// export reducer
export default youtubeReducer