import { gql } from "@apollo/client";

export const CREATE_SHOPPING_LIST_FROM_SHOPPING_LISTS = gql`
  mutation createShoppingListFromShoppingLists(
    $ids: [String!]!
    $userId: String!
    $data: ShoppingListsCreateInput!
  ) {
    createShoppingListFromShoppingLists(
      ids: $ids
      userId: $userId
      data: $data
    ) {
      id
      name
    }
  }
`;
