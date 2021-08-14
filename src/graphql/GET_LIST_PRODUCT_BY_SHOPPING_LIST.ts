import { gql } from "@apollo/client";

export const GET_LIST_PRODUCT_BY_SHOPPING_LIST = gql`
  query GetListProductByShoppingList($id: String!, $shoppingListId: String!) {
    listProductByShoppingList(id: $id, shoppingListId: $shoppingListId) {
      id
      name
      quantity
      price
      brand
      market
      purchased
      shoppingList {
        id
      }
    }
  }
`;
