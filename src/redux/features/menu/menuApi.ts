import { api } from '../../api/apiSlice';
import { MenuApiResponse } from './MenuTypes';

const menuApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMenus: build.query<MenuApiResponse, void>({
      query: () => '/menus',
      extraOptions: {
        critical: true,
        meta: { skipLoader: true },
      },
      providesTags: ['Menu'],
      // mark this as critical so loader shows
    }),
    getSingleProduct: build.query({
      query: (id) => `/menus/id/${id}`,
      extraOptions: {
        critical: true,
        meta: { skipLoader: true },
      },
    }),
  }),
});

export const { useGetMenusQuery, useGetSingleProductQuery } = menuApi;
