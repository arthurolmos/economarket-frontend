import { gql } from "@apollo/client";

export const UPDATE_LIST_PRODUCT = gql`
  mutation UpdateListProduct(
    $shoppingListId: String!
    $values: ListProductsUpdateInput!
    $id: String!
  ) {
    updateListProduct(
      shoppingListId: $shoppingListId
      values: $values
      id: $id
    ) {
      id
      name
      price
      quantity
      purchased
    }
  }
`;
