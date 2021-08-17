import React from "react";
import { AuthProvider } from "./src/contexts/AuthContext";
import StackNavigator from "./src/navigators/StackNavigator";
import { ApolloProvider } from "@apollo/client";
import { client } from "./src/apollo/client";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </ApolloProvider>
  );
}
