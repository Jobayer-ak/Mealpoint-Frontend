import { api } from '../../api/apiSlice';
import { MenuApiResponse } from './MenuTypes';

const menuApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMenus: build.query<MenuApiResponse, void>({
      query: () => '/menus',
      extraOptions: { suspense: true, useErrorBoundary: true, critical: true },
      providesTags: ['Menu'],
      // mark this as critical so loader shows
    }),
  }),
});

export const { useGetMenusQuery } = menuApi;
