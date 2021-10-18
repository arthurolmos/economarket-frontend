import { gql } from "@apollo/client";

export const RESTORE_SHOPPING_LIST = gql`
  mutation RestoreShoppingList($id: String!, $userId: String!) {
    restoreShoppingList(userId: $userId, id: $id) {
      id
      name
    }
  }
`;
