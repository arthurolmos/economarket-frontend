import { useMutation } from "@apollo/client";
import {
  CREATE_SHOPPING_LIST,
  CREATE_SHOPPING_LIST_FROM_PENDING_PRODUCTS,
  CREATE_SHOPPING_LIST_FROM_SHOPPING_LISTS,
} from "../../apollo/graphql";
import { ShoppingListCreateInput } from "../../interfaces/shoppingList";
import { User } from "../../interfaces/user";
import { validate } from "../../lib/validations";

export enum OptionsEnum {
  USE_PENDING_PRODUCTS = "usePendingProducts",
  USE_SHOPPING_LISTS = "useShoppingLists",
}

export type Options = Record<OptionsEnum, boolean>;

interface Props {
  data: {
    values: ShoppingListCreateInput;
    options: Options;
    selectedListsIds: string[];
    removeProductsFromSelectedLists: boolean;
  };
  user: User;
}

const [createShoppingList, creatingShoppingList] = useMutation(
  CREATE_SHOPPING_LIST,
  {
    refetchQueries: ["GetShoppingListsByUser"],
  }
);

const [
  createShoppingListFromPendingProducts,
  creatingShoppingListFromPendingProducts,
] = useMutation(CREATE_SHOPPING_LIST_FROM_PENDING_PRODUCTS, {
  refetchQueries: ["GetShoppingListsByUser"],
});

const [
  createShoppingListFromShoppingLists,
  creatingShoppingListFromShoppingLists,
] = useMutation(CREATE_SHOPPING_LIST_FROM_SHOPPING_LISTS, {
  refetchQueries: ["GetShoppingListsByUser"],
});

export const loadingCreation =
  creatingShoppingListFromPendingProducts.loading ||
  creatingShoppingListFromShoppingLists.loading ||
  creatingShoppingList.loading;

export async function useSubmit({ data, user }: Props) {
  if (!validate(data.values))
    throw new Error("Preencha os campos corretamente!");

  if (data.options.usePendingProducts) {
    await createShoppingListFromPendingProducts({
      variables: {
        userId: user?.id,
        ids: data.selectedListsIds,
        remove: data.removeProductsFromSelectedLists,
        data,
      },
    });
  } else if (data.options.useShoppingLists) {
    await createShoppingListFromShoppingLists({
      variables: {
        userId: user?.id,
        ids: data.selectedListsIds,
        data,
      },
    });
  } else {
    await createShoppingList({
      variables: { userId: user?.id, data },
    });
  }
}
