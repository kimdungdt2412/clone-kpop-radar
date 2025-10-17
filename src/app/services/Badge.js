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
                    url: `${apiPrefix}/periods?${qs.stringify({
                        sortType: 1
                    })}`,
                    method: 'GET',
                }
            },
            transformResponse: (response) => response.data,
        }),
        getBadgeData: build.query({
            query: (body) => {
                return {
                    url: `${apiPrefix}/badgeData?${qs.stringify(body)}`,
                    method: 'GET',
                }
            },
            transformResponse: (response) => response.data,
        })
    })
})

export const { useGetBadgeDataQuery, useLazyGetBadgeDataQuery, useGetPeriodListQuery} = badgeApi