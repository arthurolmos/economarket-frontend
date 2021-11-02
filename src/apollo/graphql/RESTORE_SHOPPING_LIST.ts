import { gql } from "@apollo/client";

export const RESTORE_SHOPPING_LIST = gql`
  mutation RestoreShoppingList($id: String!) {
    restoreShoppingList(id: $id) {
      id
      name
    }
  }
`;
