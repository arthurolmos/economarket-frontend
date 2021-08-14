import { gql } from "@apollo/client";

export const CREATE_SHOPPING_LIST = gql`
  mutation CreateShoppingList(
    $data: ShoppingListsCreateInput!
    $userId: String!
  ) {
    createShoppingList(data: $data, userId: $userId) {
      id
      name
    }
  }
`;
