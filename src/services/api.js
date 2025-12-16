import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = 'http://monolithic-app.test/api';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTags: builder.query({
      query: () => '/tags',
    }),
    getNotes: builder.query({
      query: () => '/notes',
    }),
    login: builder.mutation({
        query: (credentials) => ({
          url: '/auth/login',
          method: 'POST',
          body: credentials,
        }),
      }),
      logout: builder.mutation({
        query: () => ({
          url: '/auth/logout',
          method: 'POST',
        }),
      }),
  }),
});

export const {
  useGetTagsQuery,
  useGetNotesQuery,
  useLoginMutation,
  useLogoutMutation,
} = api;