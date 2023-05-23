import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({baseUrl:''}) //base url empty as we are using a proxy
export const apiSlice = createApi ({
    baseQuery,
    tagTypes:['User'], //enable is to cache data
    endpoints:(builder) => ({

    })
})