import { api } from './BaseApi'

let apiPrefix = "brief";
var qs = require('qs');

export const briefApi = api.injectEndpoints({
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

export const { useGetBriefListQuery, useGetBriefContentQuery } = briefApi