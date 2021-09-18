import { gql } from "@apollo/client";

export const SHARE_SHOPPING_LIST = gql`
  mutation ShareShoppingList($id: String!, $sharedUserId: String!) {
    shareShoppingList(id: $id, sharedUserId: $sharedUserId) {
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
