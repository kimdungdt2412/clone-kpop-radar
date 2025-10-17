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
                    url: `${apiPrefix}/artistNames`,
                    method: 'GET',
                }
            },
            transformResponse: (response) => response.data,
        }),
        getArtistNameIndices: build.query({
            query: () => {
                return {
                    url: `${apiPrefix}/artistNameIndices`,
                    method: 'GET'
                }
            },
            transformResponse: (response) => response.data
        }),
        getRecommendArtists: build.query({
            query: (body) => {
                return {
                    url: `${apiPrefix}/recommendArtists?${qs.stringify(body)}`,
                    method: 'GET',
                }
            },
            transformResponse: (response) => response.data,
        }),
        getArtistInfo: build.query({
            query: (body) => {
                return {
                    url: `${apiPrefix}/getArtistInfo?${qs.stringify(body)}`,
                    method: 'GET',
                }
            },
            transformResponse: (response) => response.data,
            providesTags: ['Artist'],
        }),
        incArtistLikeCount: build.query({
            query: (body) => {
                return {
                    url: `${apiPrefix}/incArtistLikeCount?${qs.stringify(body)}`,
                    method: 'GET',
                }
            },
            transformResponse: (response) => response.data,
        }),
        getArtistBadge: build.query({
            query: (body) => {
                return {
                    url: `${apiPrefix}/badge?${qs.stringify(body)}`,
                    method: 'GET',
                }
            },
            transformResponse: (response) => response.data,
        }),
        getRelatedArtists: build.query({
            query: (body) => {
                return {
                    url: `${apiPrefix}/getRelatedArtists?${qs.stringify(body)}`,
                    method: 'GET',
                }
            },
            transformResponse: (response) => response.data,
        }),
        getBlipData: build.query({
            query: (body) => {
                return {
                    url: `${apiPrefix}/getBlipData?${qs.stringify(body)}`,
                    method: 'GET',
                }
            },
            transformResponse: (response) => response.data,
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
                    url: `${apiPrefix}/realtimeDataNew?${qs.stringify(body)}`,
                    method: 'GET',
                }
            },
            transformResponse: (response) => response.data,
        }),
        getDailyDataNew: build.query({
            query: (body) => {
                // {
                //day
                // }
                return {
                    url: `${apiPrefix}/dailyDataNew?${qs.stringify(body)}`,
                    method: 'GET',
                }
            },
            transformResponse: (response) => response.data,
        }),
        getWeeklyDataNew: build.query({
            query: (body) => {
                // {
                //week
                // }
                return {
                    url: `${apiPrefix}/weeklyDataNew?${qs.stringify(body)}`,
                    method: 'GET',
                }
            },
            transformResponse: (response) => response.data,
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