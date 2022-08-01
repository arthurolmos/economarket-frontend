import React from "react";
import { ShoppingList } from "../../interfaces/shoppingList";

interface IContext {
  shoppingLists: ShoppingList[];
  refetch: () => void;
  loading: boolean;
}

export const ShoppingListsContext = React.createContext({} as IContext);

export const useShoppingListsContext = React.useContext(ShoppingListsContext);
