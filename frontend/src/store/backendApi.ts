import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  getCategoriesAndCurrencies,
  getProductById,
  getProductsByCategory,
  getProductsByIds,
} from '@/api';

type StoreConfig = Awaited<ReturnType<typeof getCategoriesAndCurrencies>>;
type CategoryProducts = Awaited<ReturnType<typeof getProductsByCategory>>;
type Product = Awaited<ReturnType<typeof getProductById>>;
type Products = Awaited<ReturnType<typeof getProductsByIds>>;

const backendApi = createApi({
  reducerPath: 'backendApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Config', 'CategoryProducts', 'Product'],

  endpoints: (builder) => ({
    getStoreConfig: builder.query<StoreConfig, void>({
      queryFn: () => getCategoriesAndCurrencies().then((data) => ({ data })),
      providesTags: ['Config'],
    }),

    getCategoryProducts: builder.query<CategoryProducts, string>({
      queryFn: (categoryId) => getProductsByCategory(categoryId).then((data) => ({ data })),
      providesTags: (_res, _err, id) => [{ type: 'CategoryProducts', id }],
    }),

    getProductById: builder.query<Product, string>({
      queryFn: (productid) => getProductById(productid).then((data) => ({ data })),
      providesTags: (_res, _err, id) => [{ type: 'Product', id }],
    }),

    getProductsByIds: builder.query<Products, string[]>({
      queryFn: (ids) => getProductsByIds(ids).then((data) => ({ data })),
      providesTags: (_res, _err, ids) => ids.map((id) => ({ type: 'Product', id })),
    }),
  }),
});

export default backendApi;
