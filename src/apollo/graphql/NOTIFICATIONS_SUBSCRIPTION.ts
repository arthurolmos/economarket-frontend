import gql from "graphql-tag";

export const NOTIFICATIONS_SUBSCRIPTION = gql`
  subscription NotificationCreated($userId: String!) {
    notificationCreated(userId: $userId) {
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
