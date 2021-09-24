import { gql } from "@apollo/client";

export const GET_SHOPPING_LISTS_BY_USER = gql`
  query GetShoppingListsByUser($userId: String!) {
    shoppingListsByUser(userId: $userId) {
      id
      name
      date
      done
      user {
        id
        firstName
        lastName
      }
      listProducts {
        id
        quantity
        price
      }
      totalPrice @client
      isOwner @client
    }
  }
`;
