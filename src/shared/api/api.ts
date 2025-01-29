import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.green-api.com',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
    },
  }),
  endpoints: () => ({}),
})
