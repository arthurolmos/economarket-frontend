import { gql } from "@apollo/client";

export const SHARE_SHOPPING_LIST = gql`
  mutation ShareShoppingList($id: String!, $userId: String!) {
    shareShoppingList(id: $id, userId: $userId) {
      id
      name
      sharedUsers {
        id
        firstName
        lastName
      }
    }
  }
`;
