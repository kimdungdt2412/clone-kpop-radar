import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseConfig } from './BaseApi';

let apiPrefix = "artist";
var qs = require('qs');

export const artistApi = createApi({
    ...baseConfig,
    reducerPath: "artistApi",
    refetchOnMountOrArgChange: false,
    endpoints: (build) => ({
        getArtistNames: build.query({
            query: () => {
                return {
                    url: `${apiPrefix}/getArtistNames`,
                    method: 'POST',
                }
            },
            transformResponse: (response) => response.body,
        }),
        getArtistNameIndices: build.query({
            query: () => {
                return {
                    url: `${apiPrefix}/getArtistNameIndices`,
                    method: 'POST'
                }
            },
            transformResponse: (response) => response.body
        }),
        getRecommendArtists: build.query({
            query: (body) => {
                return {
                    url: `${apiPrefix}/getRecommendArtists`,
                    method: 'POST',
                    body: qs.stringify(body)
                }
            },
            transformResponse: (response) => response.body,
        }),
        getArtistInfo: build.query({
            query: (body) => {
                return {
                    url: `${apiPrefix}/getArtistInfo`,
                    method: 'POST',
                    body: qs.stringify(body)
                }
            },
            transformResponse: (response) => response.body,
            providesTags: ['Artist'],
        }),
        incArtistLikeCount: build.query({
            query: (body) => {
                return {
                    url: `${apiPrefix}/incArtistLikeCount`,
                    method: 'POST',
                    body: qs.stringify(body)
                }
            },
            transformResponse: (response) => response.body,
        }),
        getArtistBadge: build.query({
            query: (body) => {
                return {
                    url: `${apiPrefix}/badge`,
                    method: 'POST',
                    body: qs.stringify(body)
                }
            },
            transformResponse: (response) => response.body,
        }),
        getRelatedArtists: build.query({
            query: (body) => {
                return {
                    url: `${apiPrefix}/getRelatedArtists`,
                    method: 'POST',
                    body: qs.stringify(body)
                }
            },
            transformResponse: (response) => response.body,
        }),
        getBlipData: build.query({
            query: (body) => {
                return {
                    url: `${apiPrefix}/getBlipData`,
                    method: 'POST',
                    body: qs.stringify(body)
                }
            },
            transformResponse: (response) => response.body,
        }),
        getRealtimeDataNew: build.query({
            query: (body) => {
                // {
                //     artistId: 326
                //     sortType: 1 //1 GROWTH //2 Total
                // dateOrder: 1 => newest
                //     orderCountInPage: 6
                //     lastOrderNo: 0
                // }
                return {
                    url: `${apiPrefix}/realtimeDataNew`,
                    method: 'POST',
                    body: qs.stringify(body)
                }
            },
            transformResponse: (response) => response.body,
        }),
        getDailyDataNew: build.query({
            query: (body) => {
                // {
                //day
                // }
                return {
                    url: `${apiPrefix}/dailyDataNew`,
                    method: 'POST',
                    body: qs.stringify(body)
                }
            },
            transformResponse: (response) => response.body,
        }),
        getWeeklyDataNew: build.query({
            query: (body) => {
                // {
                //week
                // }
                return {
                    url: `${apiPrefix}/weeklyDataNew`,
                    method: 'POST',
                    body: qs.stringify(body)
                }
            },
            transformResponse: (response) => response.body,
        }),
    })
})

export const { 
    useGetArtistNameIndicesQuery, 
    useGetArtistNamesQuery, 
    useGetRecommendArtistsQuery, 
    useGetArtistInfoQuery, 
    useLazyGetArtistInfoQuery, 
    useLazyIncArtistLikeCountQuery, 
    useIncArtistLikeCountQuery, 
    useGetArtistBadgeQuery, 
    useGetRelatedArtistsQuery,
    useGetBlipDataQuery
} = artistApi