import { createApi } from '@reduxjs/toolkit/query/react';
import { baseConfig } from './BaseApi'

let apiPrefix = "brief";
var qs = require('qs');

export const briefApi = createApi({
    ...baseConfig,
    refetchOnMountOrArgChange: false,
    reducerPath: "briefApi",
    endpoints: (build) => ({
        getBriefList: build.query({
            query: (body) => {
                return {
                    url: `${apiPrefix}/getContentList?${qs.stringify(body)}`,
                    method: 'GET',
                }
            },
            transformResponse: (response) => response.data,
            providesTags: ['Brief'],
        }),
        getBriefContent: build.query({
            query: (body) => {
                return {
                    url: `${apiPrefix}/getContent?${qs.stringify(body)}`,
                    method: 'GET',
                }
            },
            transformResponse: (response) => response.data,
            providesTags: ['Brief'],
        })
    })
})

export const { useGetBriefListQuery, useGetBriefContentQuery, useLazyGetBriefContentQuery, useLazyGetBriefListQuery } = briefApi