import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseConfig } from './BaseApi';

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
        })
    })
})

export const { useGetArtistNameIndicesQuery, useGetArtistNamesQuery, useGetRecommendArtistsQuery } = artistApi