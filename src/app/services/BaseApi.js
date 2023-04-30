import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { DOMAIN } from '../../utils/config'


const baseQuery = fetchBaseQuery({
    baseUrl: DOMAIN,
    prepareHeaders: (headers) => {
        headers.set('content-type', 'application/x-www-form-urlencoded')
        headers.set('sec-fetch-mode', 'cors')
    }
})

export const api = createApi({
    reducerPath: "splitApi",
    baseQuery: baseQuery,
    tagTypes: ['Brief', 'Artist', 'Subscribed', 'View', 'IG_follower', 'Tiktok_follower'],
    keepUnusedDataFor: 120,
    endpoints: () => ({})
})