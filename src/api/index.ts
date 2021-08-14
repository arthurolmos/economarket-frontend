import {
  ApolloClient,
  defaultDataIdFromObject,
  InMemoryCache,
} from "@apollo/client";
import * as Constants from "expo-constants";

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
        },
      },
    },
  }),
});
