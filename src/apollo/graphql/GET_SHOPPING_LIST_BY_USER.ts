import { gql } from "@apollo/client";

export const GET_SHOPPING_LIST_BY_USER = gql`
  query GetShoppingListByUser($id: String!, $userId: String!) {
    shoppingListByUser(id: $id, userId: $userId) {
      id
      name
      user {
        id
        firstName
        lastName
      }
      sharedUsers {
        id
        firstName
        lastName
      }
      listProducts {
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
      totalPrice @client
      isOwner @client
    }
  }
`;
