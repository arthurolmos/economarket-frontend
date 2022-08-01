import React from "react";
import { useQuery } from "@apollo/client";
import { GET_SHOPPING_LISTS_BY_USER } from "../../apollo/graphql";
import { useAuthContext } from "../auth";
import { ShoppingListsContext } from "./ShoppingListsContext";

interface Props {
  children: React.ReactElement[] | React.ReactElement;
}

export function ShoppingListsProvider({ children }: Props) {
  const { user } = useAuthContext();

  const { loading, data, refetch, startPolling, stopPolling, error } = useQuery(
    GET_SHOPPING_LISTS_BY_USER,
    {
      variables: { userId: user?.id },
    }
  );
  const shoppingLists = data?.shoppingListsByUser
    ? data?.shoppingListsByUser
    : [];

  React.useEffect(() => {
    if (user) startPolling(1000);

    return () => stopPolling();
  }, [user]);

  return (
    <ShoppingListsContext.Provider
      value={{
        shoppingLists,
        refetch,
        loading,
      }}
    >
      {children}
    </ShoppingListsContext.Provider>
  );
}
