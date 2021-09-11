import { gql } from "@apollo/client";

export const CREATE_SHARE_SHOPPING_LIST_NOTIFICATION = gql`
  mutation CreateShareShoppingListNotification(
    $email: String!
    $userId: String!
  ) {
    createShareShoppingListNotification(email: $email, userId: $userId) {
      id
      title
      body
      read
      user {
        id
      }
    }
  }
`;
