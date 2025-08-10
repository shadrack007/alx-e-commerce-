import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { API_ENDPOINTS, BASE_URL } from "@/constants";
import { Category, Product } from "@/interfaces";

export const fakeStoreApi = createApi({
  reducerPath: "fakeStoreApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => API_ENDPOINTS.CATEGORIES,
    }),
    getProducts: builder.query<Product[], void>({
      query: () => API_ENDPOINTS.PRODUCTS,
    }),
  }),
});

export const { useGetCategoriesQuery, useGetProductsQuery } = fakeStoreApi;
