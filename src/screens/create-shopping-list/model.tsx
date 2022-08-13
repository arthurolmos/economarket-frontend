import { useMutation } from "@apollo/client";
import { CREATE_SHOPPING_LIST_FROM_PENDING_PRODUCTS, CREATE_SHOPPING_LIST_FROM_SHOPPING_LISTS } from "../../apollo/graphql";
import { ShoppingListCreateInput } from "../../interfaces/shoppingList";
import { validate } from "../../lib/validations";

interface Props {
  data: ShoppingListCreateInput;
  options: 
}

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

export async function useSubmit({ data, options }: Props) {
  try {
    if (!validate(data)) throw new Error("Preencha os campos corretamente!");

    if (options.usePendingProducts) {
      await createShoppingListFromPendingProducts({
        variables: {
          userId: user?.id,
          ids: selectedListsIds,
          remove: removeProductsFromSelectedLists,
          data,
        },
      });
    } else if (options.useShoppingLists) {
      await createShoppingListFromShoppingLists({
        variables: {
          userId: user?.id,
          ids: selectedListsIds,
          data,
        },
      });
    } else {
      await createShoppingList({
        variables: { userId: user?.id, data },
      });
    }

    showToast("Criado com sucesso!");
    navigation.goBack();
  } catch (err: any) {
    console.log("Error on creating Shopping List", err);
    showToast(err.message);
  }
}
