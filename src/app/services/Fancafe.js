import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseConfig } from './BaseApi';

let apiPrefix = "fancafe";
var qs = require('qs');

export const fancafeApi = createApi({
    ...baseConfig,
    reducerPath: "fancafeApi",
    endpoints: (build) => ({
        getStartDay: build.query({
            query: () => {
                return {
                    url: `${apiPrefix}/startDay?${qs.stringify({
                        sortType: 1
                    })}`,
                    method: 'GET',
                }
            },
            transformResponse: (response) => response.data,
        }),
        getWeekList: build.query({
            query: () => {
                return {
                    url: `${apiPrefix}/weekList?${qs.stringify({
                        sortType: 1
                    })}`,
                    method: 'GET',
                }
            },
            
            transformResponse: (response) => response.data,
        }),
        getMonthList: build.query({
            query: () => {
                return {
                    url: `${apiPrefix}/monthList?${qs.stringify({
                        sortType: 1
                    })}`,
                    method: 'GET',
                }
            },
            
            transformResponse: (response) => response.data,
        }),
        getDailyData: build.query({
            query: (body) => {
                return {
                    url: `${apiPrefix}/dailyData?${qs.stringify(body)}`,
                    method: 'GET',
                }
            },
            transformResponse: (response) => response.data,
        }),
        getWeeklyData: build.query({
            query: (body) => {
                return {
                    url: `${apiPrefix}/weeklyData?${qs.stringify(body)}`,
                    method: 'GET',
                }
            },
            transformResponse: (response) => response.data,
        }),
        getMonthlyData: build.query({
            query: (body) => {
                return {
                    url: `${apiPrefix}/monthlyData?${qs.stringify(body)}`,
                    method: 'GET',
                }
            },
            transformResponse: (response) => response.data,
        })
    })
})

export const { useGetStartDayQuery, useGetMonthListQuery, useGetWeekListQuery, useLazyGetDailyDataQuery, useGetDailyDataQuery, useLazyGetMonthlyDataQuery, useGetMonthlyDataQuery, useGetWeeklyDataQuery, useLazyGetWeeklyDataQuery } = fancafeApi