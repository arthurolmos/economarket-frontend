import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import * as Constants from "expo-constants";
import { ListProduct } from "../../interfaces/listProduct";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import storage from "../../storage";

const httpURI =
  process.env.NODE_ENV == "development"
    ? "http://" +
      Constants.default.manifest?.debuggerHost
        .split(`:`)
        .shift()
        .concat(`:3000/graphql`)
    : "https://economarket.herokuapp.com/graphql";

const wsURI =
  process.env.NODE_ENV == "development"
    ? "ws://" +
      Constants.default.manifest?.debuggerHost
        .split(`:`)
        .shift()
        .concat(`:3000/graphql`)
    : // .concat(`:3000/subscriptions`);
      "ws://economarket.herokuapp.com/graphql";

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

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await storage.get("access_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
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
  link: authLink.concat(splitLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          fullName(_, { variables }) {
            console.log("im here");
            return `${variables?.firstName} ${variables?.lastName}`;
          },
        },
      },
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
