import { gql } from "@apollo/client";

export const CREATE_SHOPPING_LIST_FROM_PENDING_PRODUCTS = gql`
  mutation createShoppingListFromPendingProducts(
    $ids: [String!]!
    $userId: String!
    $remove: Boolean!
    $data: ShoppingListsCreateInput!
  ) {
    createShoppingListFromPendingProducts(
      ids: $ids
      userId: $userId
      remove: $remove
      data: $data
    ) {
      id
      name
    }
  }
`;
