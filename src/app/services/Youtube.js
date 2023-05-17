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
    })
})

export const { useLazyGetMonthListQuery, useLazyGetStartDayQuery, useLazyGetWeekListQuery, useGetRealtimeDataQuery, useLazyGetRealtimeDataQuery } = youtubeApi