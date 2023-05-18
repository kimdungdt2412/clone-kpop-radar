import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseConfig } from './BaseApi';

let apiPrefix = "youtube";
var qs = require('qs');

export const youtubeApi = createApi({
    ...baseConfig,
    reducerPath: "youtubeApi",
    endpoints: (build) => ({
        getStartDay: build.query({
            query: () => {
                return {
                    url: `${apiPrefix}/startDay`,
                    method: 'POST',
                    body: qs.stringify({
                        sortType: 1
                    })
                }
            },
            transformResponse: (response) => response.body,
        }),
        getWeekList: build.query({
            query: () => {
                return {
                    url: `${apiPrefix}/weekList`,
                    method: 'POST',
                    body: qs.stringify({
                        sortType: 1
                    })
                }
            },
            
            transformResponse: (response) => response.body,
        }),
        getMonthList: build.query({
            query: () => {
                return {
                    url: `${apiPrefix}/monthList`,
                    method: 'POST',
                    body: qs.stringify({
                        sortType: 1
                    })
                }
            },
            
            transformResponse: (response) => response.body,
        }),
        getRealtimeData: build.query({
            query: (body) => {
                return {
                    url: `${apiPrefix}/realtimeData`,
                    method: 'POST',
                    body: qs.stringify(body)
                }
            },
            
            transformResponse: (response) => response.body,
        }),
        getDailyData: build.query({
            query: (body) => {
                return {
                    url: `${apiPrefix}/dailyData`,
                    method: 'POST',
                    body: qs.stringify(body)
                }
            },
            transformResponse: (response) => response.body,
        }),
        getWeeklyData: build.query({
            query: (body) => {
                return {
                    url: `${apiPrefix}/weeklyData`,
                    method: 'POST',
                    body: qs.stringify(body)
                }
            },
            transformResponse: (response) => response.body,
        }),
        getMonthlyData: build.query({
            query: (body) => {
                return {
                    url: `${apiPrefix}/monthlyData`,
                    method: 'POST',
                    body: qs.stringify(body)
                }
            },
            transformResponse: (response) => response.body,
        })
    })
})

export const { useLazyGetMonthListQuery, useGetStartDayQuery, useGetMonthListQuery, useGetWeekListQuery, useGetRealtimeDataQuery, useLazyGetRealtimeDataQuery,useLazyGetDailyDataQuery, useGetDailyDataQuery, useLazyGetMonthlyDataQuery, useGetMonthlyDataQuery, useGetWeeklyDataQuery, useLazyGetWeeklyDataQuery } = youtubeApi