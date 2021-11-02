import { gql } from "@apollo/client";

export const UPDATE_SHOPPING_LIST = gql`
  mutation UpdateShoppingList(
    $values: ShoppingListsUpdateInput!
    $id: String!
  ) {
    updateShoppingList(values: $values, id: $id) {
      id
      name
    }
  }
`;
