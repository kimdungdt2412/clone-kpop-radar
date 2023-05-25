import { createSlice } from '@reduxjs/toolkit';
import { tiktokApi } from '../../app/services/Tiktok';


const formatData = (tasks) => {
    return tasks.map(item => {
        let newItem = {
            ...item,
            total: item.creationCount
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


export const tiktokSlice = createSlice({
    name: 'tiktok',
    initialState,
    extraReducers(builder) {
        builder.addMatcher(tiktokApi.endpoints.getStartDay.matchFulfilled, (state, action) => {
            state.startDay = action.payload.startDay
            state.endDay = action.payload.endDay
        })
        builder.addMatcher(tiktokApi.endpoints.getWeekList.matchFulfilled, (state, action) => {
            state.weekList = action.payload
        })
        builder.addMatcher(tiktokApi.endpoints.getMonthList.matchFulfilled, (state, action) => {
            state.monthList = action.payload
            state.yearList = [...new Map(action.payload?.map(item => [item['year'], item])).values()]
        })
        builder.addMatcher(tiktokApi.endpoints.getDailyData.matchFulfilled, (state, action) => {
            state.dailyData = formatData(action.payload.tasks)
            state.totalCount.daily = action.payload.maxOrderNo
        })
        builder.addMatcher(tiktokApi.endpoints.getWeeklyData.matchFulfilled, (state, action) => {
            state.weeklyData = formatData(action.payload.tasks)
            state.totalCount.weekly = action.payload.maxOrderNo
        })
        builder.addMatcher(tiktokApi.endpoints.getMonthlyData.matchFulfilled, (state, action) => {
            state.monthlyData = formatData(action.payload.tasks)
            state.totalCount.monthly = action.payload.maxOrderNo
        })
    }
});

export const selectTiktok = (state) => state.tiktok;

const tiktokReducer = tiktokSlice.reducer
// export reducer
export default tiktokReducer