import React from "react";
import { AuthProvider, ProductsProvider } from "./src/contexts";
import StackNavigator from "./src/navigators/StackNavigator";
import { ApolloProvider } from "@apollo/client";
import { client } from "./src/apollo/client";
import { NotificationsProvider } from "./src/contexts/NotificationsContext";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <NotificationsProvider>
          <ProductsProvider>
            <StackNavigator />
          </ProductsProvider>
        </NotificationsProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
