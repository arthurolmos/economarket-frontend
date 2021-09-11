import { useQuery } from "@apollo/client";
import { GET_SHOPPING_LIST_BY_USER } from "../graphql";

export function getShoppingListByUser(
  userId: string | null = null,
  shoppingListId: string | null = null
) {
  const { data, loading } = useQuery(GET_SHOPPING_LIST_BY_USER, {
    variables: { id: shoppingListId, userId },
    pollInterval: 500,
  });

  return { loading, data };
}
