import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseConfig } from './BaseApi';

let apiPrefix = "badge";
var qs = require('qs');

export const badgeApi = createApi({
    ...baseConfig,
    reducerPath: "badgeApi",
    endpoints: (build) => ({
        getPeriodList: build.query({
            query: () => {
                return {
                    url: `${apiPrefix}/periods`,
                    method: 'POST',
                    body: qs.stringify({
                        sortType: 1
                    })
                }
            },
            transformResponse: (response) => response.body,
        }),
        getBadgeData: build.query({
            query: (body) => {
                return {
                    url: `${apiPrefix}/badgeData`,
                    method: 'POST',
                    body: qs.stringify(body)
                }
            },
            transformResponse: (response) => response.body,
        })
    })
})

export const { useGetBadgeDataQuery, useLazyGetBadgeDataQuery, useGetPeriodListQuery} = badgeApi