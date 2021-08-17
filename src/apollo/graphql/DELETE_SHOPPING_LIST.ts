import { gql } from "@apollo/client";

export const DELETE_SHOPPING_LIST = gql`
  mutation DeleteShoppingList($id: String!, $userId: String!) {
    deleteShoppingList(userId: $userId, id: $id)
  }
`;
