import { gql } from "@apollo/client";

export const CREATE_PUSH_NOTIFICATION_TOKEN = gql`
  mutation CreatePushNotificationToken($userId: String!, $token: String!) {
    createPushNotificationToken(userId: $userId, token: $token) {
      id
      token
      user {
        id
        email
      }
    }
  }
`;
