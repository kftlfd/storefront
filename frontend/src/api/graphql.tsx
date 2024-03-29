import { FC, ReactNode } from 'react';
import { ApolloClient, ApolloProvider, gql, InMemoryCache, useQuery } from '@apollo/client';

import env from '@/env';

import { Currency, Product } from './types';

const client = new ApolloClient({
  uri: env.gqlURL,
  cache: new InMemoryCache(),
});

export const GQlClientProvider: FC<{ children?: ReactNode }> = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

const productSchema = `#graphql
id
name
brand
description
attributes {
  id
  name
  type
  items {
    id
    value
  }
}
prices {
  amount
  currency {
    label
    symbol
  }
}
category
gallery
inStock
`;

export const useCategoriesCurrenciesProductsQuery = (productIds: string[]) =>
  useQuery<{
    categories: string[];
    currencies: Currency[];
    products: Product[];
  }>(
    gql`
      query Query($productIds: [String]!) {
        categories
        currencies {
          label
          symbol
        }
        products(ids: $productIds) {
          ${productSchema}
        }
      }
    `,
    { variables: { productIds } },
  );

export const useProductsQuery = (productIds: string[]) =>
  useQuery<{
    products: Product[];
  }>(
    gql`
      query Query($productIds: [String]!) {
        products(ids: $productIds) {
          ${productSchema}
        }
      }
    `,
    { variables: { productIds } },
  );

export const useCategoryProductsQuery = (categoryId: string) =>
  useQuery<{
    category: Product[];
  }>(
    gql`
      query Category($categoryId: String!) {
        category(id: $categoryId) {
          id
          name
          brand
          inStock
          category
          gallery
          prices {
            amount
            currency {
              label
              symbol
            }
          }
        }
      }
    `,
    {
      variables: { categoryId },
    },
  );
