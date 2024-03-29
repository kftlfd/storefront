import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { data } from './data.js';
import type { Category } from './entities.js';

const server = new ApolloServer({
  typeDefs: `#graphql
  type Currency {
    label: String
    symbol: String
  }

  type Price {
    currency: Currency
    amount: Float
  }

  type AttributeItem {
    id: String
    value: String
  }

  type Attribute {
    id: String
    name: String
    type: String
    items: [AttributeItem]
  }

  type Product {
    id: String
    name: String
    brand: String
    category: String
    description: String
    inStock: Boolean
    gallery: [String]
    attributes: [Attribute]
    prices: [Price]
  }

  type Query {
    categories: [String]!
    currencies: [Currency!]!
    category(id: String): [Product]!
    products(ids: [String]): [Product!]!
  }
`,
  resolvers: {
    Query: {
      categories: () => data.categories,
      currencies: () => data.currencies,

      category: (_, args: { id: string }) =>
        data.categoryproducts[args.id as Category]?.map((id) => data.productsMap[id]) ?? [],

      products: (_, args: { ids: string[] }) =>
        args.ids.map((id) => data.productsMap[id]).filter((p) => p !== undefined),
    },
  },
});

startStandaloneServer(server, {
  listen: { port: 4000 },
})
  .then(({ url }) => {
    console.log(`GraphQL Server ready at: ${url}`);
  })
  .catch((err) => {
    console.error(err);
  });
