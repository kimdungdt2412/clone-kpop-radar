import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DOMAIN } from '../../utils/config'


const baseQuery = fetchBaseQuery({
    baseUrl: DOMAIN,
    prepareHeaders: (headers) => {
        headers.set('content-type', 'application/x-www-form-urlencoded')
        headers.set('sec-fetch-mode', 'cors')
        // headers.set('same-site', 'none')
    }
})

export const baseConfig = {
    tagTypes: ['Brief', 'Artist', 'Subscribed', 'View', 'IG_follower', 'Tiktok_follower'],
    keepUnusedDataFor: 120,    
    baseQuery: baseQuery,
    refetchOnMountOrArgChange: true
}

// export const api = createApi({
//     reducerPath: "splitApi",

//     endpoints: () => ({})
// })