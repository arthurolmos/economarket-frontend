import React from "react";
import {
  AuthProvider,
  ProductsProvider,
  NotificationsProvider,
  ShoppingListsProvider,
} from "./src/contexts";
import StackNavigator from "./src/navigators/StackNavigator";
import { ApolloProvider } from "@apollo/client";
import { client } from "./src/apollo/client";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <NotificationsProvider>
          <ShoppingListsProvider>
            <ProductsProvider>
              <StackNavigator />
            </ProductsProvider>
          </ShoppingListsProvider>
        </NotificationsProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
