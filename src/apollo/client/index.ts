import {
  ApolloClient,
  defaultDataIdFromObject,
  gql,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import * as Constants from "expo-constants";
import { ListProduct } from "../../interfaces/listProduct";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpURI =
  "http://" +
  Constants.default.manifest?.debuggerHost
    .split(`:`)
    .shift()
    .concat(`:3000/graphql`);

const wsURI =
  "ws://" +
  Constants.default.manifest?.debuggerHost
    .split(`:`)
    .shift()
    .concat(`:3000/graphql`);
// .concat(`:3000/subscriptions`);

console.log(httpURI);
console.log(wsURI);

const wsLink = new WebSocketLink({
  uri: wsURI,
  options: {
    reconnect: true,
    // connectionParams: {
    //   authToken: user.authToken,
    // },
  },
});

const httpLink = new HttpLink({
  uri: httpURI,
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: splitLink,
  // uri:
  //   "http://" +
  //   Constants.default.manifest?.debuggerHost
  //     .split(`:`)
  //     .shift()
  //     .concat(`:3000/graphql`),
  // uri: "https://economarket.herokuapp.com/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      ShoppingList: {
        fields: {
          products: {
            merge(existing = [], incoming: any[]) {
              return [...incoming];
            },
          },
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
          notificationsByUser: {
            merge(existing = [], incoming: any[]) {
              return [...incoming];
            },
          },
        },
      },
    },
  }),
});
