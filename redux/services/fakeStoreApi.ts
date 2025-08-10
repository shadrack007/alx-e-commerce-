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
    getProducts: builder.query<Product[], { offset: number; limit: number }>({
      query: ({ offset, limit }) =>
        `${BASE_URL}/products?offset=${offset}&limit=${limit}`,
    }),
    getProductsByCategoryId: builder.query<
      Product[],
      {
        id: string;
      }
    >({
      query: (id) => {
        const url = `${BASE_URL}/categories/${id}/products`;
        console.log("url", url);
        return url;
      },
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => {
        const url = `${BASE_URL}/products/${id}`;
        return url;
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryIdQuery,
} = fakeStoreApi;
