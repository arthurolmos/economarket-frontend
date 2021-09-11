import { gql } from "@apollo/client";

export const CREATE_NOTIFICATION = gql`
  mutation CreateNotification(
    $data: NotificationsCreateInput!
    $userId: String!
  ) {
    createNotification(data: $data, userId: $userId) {
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
