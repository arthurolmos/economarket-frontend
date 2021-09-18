import { gql } from "@apollo/client";

export const DELETE_PUSH_NOTIFICATION_TOKEN = gql`
  mutation DeletePushNotificationToken($token: String!) {
    deletePushNotificationToken(token: $token)
  }
`;
