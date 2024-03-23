import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import { getCategoryProducts } from '@/api';

type CategoryProducts = Awaited<ReturnType<typeof getCategoryProducts>>;

const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Category'],

  endpoints: (builder) => ({
    getCategoryProducts: builder.query<CategoryProducts, string>({
      queryFn: (categoryId) => getCategoryProducts(categoryId).then((data) => ({ data })),
      providesTags: (_res, _err, id) => [{ type: 'Category', id }],
    }),
  }),
});

export default categoryApi;
