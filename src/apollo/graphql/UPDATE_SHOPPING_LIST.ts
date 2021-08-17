import { gql } from "@apollo/client";

export const UPDATE_SHOPPING_LIST = gql`
  mutation UpdateShoppingList(
    $values: ShoppingListsUpdateInput!
    $id: String!
    $userId: String!
  ) {
    updateShoppingList(values: $values, userId: $userId, id: $id) {
      id
      name
    }
  }
`;
