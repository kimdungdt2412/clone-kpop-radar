import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseConfig } from './BaseApi';
import { getArtistLikeCount } from '../../features/Artist/ArtistSlice';

let apiPrefix = "artist";
var qs = require('qs');

export const artistApi = createApi({
    ...baseConfig,
    reducerPath: "artistApi",
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
            async onQueryStarted(body, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled
                if (data.artistId) {
                    console.log("hi")
                    dispatch(getArtistLikeCount({
                        ...body,
                        artistId: data.artistId,
                        likeCount: 0
                    }))
                }
            }
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
        })
    })
})

export const { useGetArtistNameIndicesQuery, useGetArtistNamesQuery, useGetRecommendArtistsQuery, useGetArtistInfoQuery, useLazyGetArtistInfoQuery, useLazyIncArtistLikeCountQuery } = artistApi