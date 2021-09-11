import { Product } from "../../interfaces/product";
import { client } from "../client";
import { READ_PRODUCTS_BY_USER } from "../graphql";

export function readProductsByUser(userId: string | null = null) {
  const query = client.readQuery<{
    productsByUser: Product[];
  }>({
    query: READ_PRODUCTS_BY_USER,
    variables: {
      userId,
    },
  });

  return query?.productsByUser;
}
