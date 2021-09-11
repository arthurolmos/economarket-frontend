import { useQuery } from "@apollo/client";
import { GET_SHOPPING_LISTS_BY_USER } from "../graphql";

export function getShoppingListsByUser(userId: string | null = null) {
  const { loading, data, refetch } = useQuery(GET_SHOPPING_LISTS_BY_USER, {
    variables: { userId },
    pollInterval: 500,
  });

  return { loading, data, refetch };
}
