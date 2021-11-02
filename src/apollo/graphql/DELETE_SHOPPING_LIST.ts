import { gql } from "@apollo/client";

export const DELETE_SHOPPING_LIST = gql`
  mutation DeleteShoppingList($id: String!) {
    deleteShoppingList(id: $id)
  }
`;
