import { gql } from "@apollo/client";

export const GET_NOTIFICATIONS_BY_USER = gql`
  query GetNotificationsByUser($userId: String!) {
    notificationsByUser(userId: $userId) {
      id
      title
      body
      read
      shoppingListId
      user {
        id
      }
    }
  }
`;
