import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseConfig } from './BaseApi';

let apiPrefix = "siteArtist";
var qs = require('qs');

export const siteArtistApi = createApi({
    ...baseConfig,
    reducerPath: "siteArtistApi",
    endpoints: (build) => ({
        getStartDay: build.query({
            query: (siteId) => {
                return {
                    url: `${apiPrefix}/startDay`,
                    method: 'POST',
                    body: qs.stringify({
                        sortType: 1,
                        siteId
                    })
                }
            },
            transformResponse: (response) => response.body,
        }),
        getWeekList: build.query({
            query: (siteId) => {
                return {
                    url: `${apiPrefix}/weekList`,
                    method: 'POST',
                    body: qs.stringify({
                        sortType: 1,
                        siteId
                    })
                }
            },
            
            transformResponse: (response) => response.body,
        }),
        getMonthList: build.query({
            query: (siteId) => {
                return {
                    url: `${apiPrefix}/monthList`,
                    method: 'POST',
                    body: qs.stringify({
                        sortType: 1,
                        siteId
                    })
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

export const { useGetStartDayQuery, useGetMonthListQuery, useGetWeekListQuery, useLazyGetDailyDataQuery, useGetDailyDataQuery, useLazyGetMonthlyDataQuery, useGetMonthlyDataQuery, useGetWeeklyDataQuery, useLazyGetWeeklyDataQuery } = siteArtistApi