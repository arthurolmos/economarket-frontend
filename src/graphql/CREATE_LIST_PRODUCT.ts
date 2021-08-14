import { gql } from "@apollo/client";

export const CREATE_LIST_PRODUCT = gql`
  mutation CreateListProduct(
    $shoppingListId: String!
    $data: ListProductsCreateInput!
  ) {
    createListProduct(shoppingListId: $shoppingListId, data: $data) {
      id
      name
      quantity
      price
      brand
      market
      purchased
    }
  }
`;
