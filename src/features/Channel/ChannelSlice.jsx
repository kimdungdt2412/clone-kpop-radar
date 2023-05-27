import { createSlice } from '@reduxjs/toolkit';
import { channelApi } from '../../app/services/Channel';

const initialState = {
    startDay: "",
    endDay: "",
    weekList: [],
    monthList: [],
    yearList: [],
    totalCount: {
        weekly: 0,
        monthly: 0
    },
    weeklyData: [],
    monthlyData: [],
    orderCountInPage: 50,
};


export const channelSlice = createSlice({
    name: 'channel',
    initialState,
    extraReducers(builder) {
        builder.addMatcher(channelApi.endpoints.getStartDay.matchFulfilled, (state, action) => {
            state.startDay = action.payload.startDay
            state.endDay = action.payload.endDay
        })
        builder.addMatcher(channelApi.endpoints.getWeekList.matchFulfilled, (state, action) => {
            state.weekList = action.payload
        })
        builder.addMatcher(channelApi.endpoints.getMonthList.matchFulfilled, (state, action) => {
            state.monthList = action.payload
            state.yearList = [...new Map(action.payload?.map(item => [item['year'], item])).values()]
        })
        builder.addMatcher(channelApi.endpoints.getWeeklyData.matchFulfilled, (state, action) => {
            state.weeklyData = action.payload.tasks.map(item => {
                let newItem = {
                    ...item,
                    total: item.subscriberCount
                }
                return newItem
            })
            state.totalCount.weekly = action.payload.maxOrderNo
        })
        builder.addMatcher(channelApi.endpoints.getMonthlyData.matchFulfilled, (state, action) => {
            state.monthlyData = action.payload.tasks.map(item => {
                let newItem = {
                    ...item,
                    total: item.subscriberCount
                }
                return newItem
            })
            state.totalCount.monthly = action.payload.maxOrderNo
        })
    }
});

export const selectChannel = (state) => state.channel;

const channelReducer = channelSlice.reducer
// export reducer
export default channelReducer