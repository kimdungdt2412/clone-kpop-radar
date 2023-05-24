import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseConfig } from './BaseApi';

let apiPrefix = "channel";
var qs = require('qs');

export const channelApi = createApi({
    ...baseConfig,
    reducerPath: "channelApi",
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

export const { useGetMonthListQuery, useGetWeekListQuery, useGetStartDayQuery, useGetWeeklyDataQuery, useGetMonthlyDataQuery, useLazyGetMonthlyDataQuery, useLazyGetWeeklyDataQuery } = channelApi