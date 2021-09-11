import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_BY_USER } from "../graphql";

export function getProductsByUser(userId: string | null = null) {
  const { loading, data, refetch } = useQuery(GET_PRODUCTS_BY_USER, {
    variables: { userId },
    pollInterval: 500,
  });

  return { loading, data, refetch };
}
