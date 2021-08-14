import { gql } from "@apollo/client";

export const DELETE_LIST_PRODUCT = gql`
  mutation DeleteListProduct($id: String!, $shoppingListId: String!) {
    deleteListProduct(id: $id, shoppingListId: $shoppingListId)
  }
`;
