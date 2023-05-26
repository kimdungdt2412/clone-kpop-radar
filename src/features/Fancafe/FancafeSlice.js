import { createSlice } from '@reduxjs/toolkit';
import { fancafeApi } from '../../app/services/Fancafe';


const formatData = (tasks) => {
    return tasks.map(item => {
        let newItem = {
            ...item,
            total: item.memberCount
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


export const fancafeSlice = createSlice({
    name: 'fancafe',
    initialState,
    extraReducers(builder) {
        builder.addMatcher(fancafeApi.endpoints.getStartDay.matchFulfilled, (state, action) => {
            state.startDay = action.payload.startDay
            state.endDay = action.payload.endDay
        })
        builder.addMatcher(fancafeApi.endpoints.getWeekList.matchFulfilled, (state, action) => {
            state.weekList = action.payload
        })
        builder.addMatcher(fancafeApi.endpoints.getMonthList.matchFulfilled, (state, action) => {
            state.monthList = action.payload
            state.yearList = [...new Map(action.payload?.map(item => [item['year'], item])).values()]
        })
        builder.addMatcher(fancafeApi.endpoints.getDailyData.matchFulfilled, (state, action) => {
            state.dailyData = formatData(action.payload.tasks)
            state.totalCount.daily = action.payload.maxOrderNo
        })
        builder.addMatcher(fancafeApi.endpoints.getWeeklyData.matchFulfilled, (state, action) => {
            state.weeklyData = formatData(action.payload.tasks)
            state.totalCount.weekly = action.payload.maxOrderNo
        })
        builder.addMatcher(fancafeApi.endpoints.getMonthlyData.matchFulfilled, (state, action) => {
            state.monthlyData = formatData(action.payload.tasks)
            state.totalCount.monthly = action.payload.maxOrderNo
        })
    }
});

export const selectFancafe = (state) => state.fancafe;

const fancafeReducer = fancafeSlice.reducer
// export reducer
export default fancafeReducer