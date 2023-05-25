import { createSlice } from '@reduxjs/toolkit';
import { snsApi } from '../../app/services/SNS';

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


export const snsSlice = createSlice({
    name: 'sns',
    initialState,
    extraReducers(builder) {
        builder.addMatcher(snsApi.endpoints.getStartDay.matchFulfilled, (state, action) => {
            state.startDay = action.payload.startDay
            state.endDay = action.payload.endDay
        })
        builder.addMatcher(snsApi.endpoints.getWeekList.matchFulfilled, (state, action) => {
            state.weekList = action.payload
        })
        builder.addMatcher(snsApi.endpoints.getMonthList.matchFulfilled, (state, action) => {
            state.monthList = action.payload
            state.yearList = [...new Map(action.payload?.map(item => [item['year'], item])).values()]
        })
        builder.addMatcher(snsApi.endpoints.getDailyData.matchFulfilled, (state, action) => {
            state.dailyData = formatData(action.payload.tasks)
            state.totalCount.daily = action.payload.maxOrderNo
        })
        builder.addMatcher(snsApi.endpoints.getWeeklyData.matchFulfilled, (state, action) => {
            state.weeklyData = formatData(action.payload.tasks)
            state.totalCount.weekly = action.payload.maxOrderNo
        })
        builder.addMatcher(snsApi.endpoints.getMonthlyData.matchFulfilled, (state, action) => {
            state.monthlyData = formatData(action.payload.tasks)
            state.totalCount.monthly = action.payload.maxOrderNo
        })
    }
});

export const selectSNS = (state) => state.sns;

const snsReducer = snsSlice.reducer
// export reducer
export default snsReducer