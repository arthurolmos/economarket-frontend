import { gql } from "@apollo/client";

export const CREATE_NOTIFICATION = gql`
  mutation CreateNotification(
    $data: NotificationsCreateInput!
    $email: String!
  ) {
    createNotification(data: $data, email: $email) {
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
