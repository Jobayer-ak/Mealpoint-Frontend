import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mealpoint-server.onrender.com/api/v1',
  }),
  tagTypes: ['Menu', 'Category'],
  endpoints: () => ({}),
});
