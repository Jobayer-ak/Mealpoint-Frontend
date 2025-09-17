import { api } from '../../api/apiSlice';
import { MenuApiResponse } from './MenuTypes';

const menuApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMenus: build.query<MenuApiResponse, void>({
      query: () => '/menus',
      providesTags: ['Menu'],
    }),
  }),
});

export const { useGetMenusQuery } = menuApi;
