import {
  ApolloClient,
  defaultDataIdFromObject,
  gql,
  InMemoryCache,
} from "@apollo/client";
import * as Constants from "expo-constants";
import { ListProduct } from "../../interfaces/listProduct";

export const client = new ApolloClient({
  uri:
    "http://" +
    Constants.default.manifest?.debuggerHost
      .split(`:`)
      .shift()
      .concat(`:3000/graphql`),
  // uri: "https://economarket.herokuapp.com/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      ShoppingList: {
        fields: {
          listProducts: {
            merge(existing = [], incoming: any[]) {
              return [...incoming];
            },
          },
          sharedUsers: {
            merge(existing = [], incoming: any[]) {
              return [...incoming];
            },
          },
          totalPrice: {
            read(_, { readField }) {
              const listProducts = readField<ListProduct[]>("listProducts");

              const totalPrice: number | undefined = listProducts?.reduce(
                (accumulator, currentValue) => {
                  return (
                    accumulator + currentValue.quantity * currentValue.price
                  );
                },
                0
              );

              return totalPrice;
            },
          },
          isOwner(_, { variables, readField }) {
            const ownerId = readField("id", readField("user"));

            return variables?.userId === ownerId;
          },
        },
      },
      ListProduct: {
        keyFields: false,
      },
      Query: {
        fields: {
          shoppingListsByUser: {
            merge(existing = [], incoming: any[]) {
              return [...incoming];
            },
          },
        },
      },
    },
  }),
});
