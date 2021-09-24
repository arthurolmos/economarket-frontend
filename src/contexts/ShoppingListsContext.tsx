import React from "react";
import { AuthContext } from "./AuthContext";
import { useQuery } from "@apollo/client";
import { GET_SHOPPING_LISTS_BY_USER } from "../apollo/graphql";
import { ShoppingList } from "../interfaces/shoppingList";

interface Props {
  children: React.ReactElement[] | React.ReactElement;
}

interface IContext {
  shoppingLists: ShoppingList[];
  refetch: () => void;
  loading: boolean;
}

export const ShoppingListsContext = React.createContext({} as IContext);

export function ShoppingListsProvider({ children }: Props) {
  const { user } = React.useContext(AuthContext);

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
    startPolling(500);

    return () => stopPolling();
  }, []);

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
