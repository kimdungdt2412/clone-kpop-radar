import { createApi } from '@reduxjs/toolkit/query/react';
import { baseConfig } from './BaseApi'

let apiPrefix = "brief";
var qs = require('qs');

export const briefApi = createApi({
    ...baseConfig,
    reducerPath: "briefApi",
    endpoints: (build) => ({
        getBriefList: build.query({
            query: (body) => {
                return {
                    url: `${apiPrefix}/getContentList`,
                    method: 'POST',
                    body: qs.stringify(body)
                }
            },
            transformResponse: (response) => response.body,
            providesTags: ['Brief'],
        }),
        getBriefContent: build.query({
            query: (body) => {
                return {
                    url: `${apiPrefix}/getContent`,
                    method: 'POST',
                    body: qs.stringify(body)
                }
            },
            transformResponse: (response) => response.body,
            providesTags: ['Brief'],
        })
    })
})

export const { useGetBriefListQuery, useGetBriefContentQuery, useLazyGetBriefContentQuery, useLazyGetBriefListQuery } = briefApi