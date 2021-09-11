import { gql } from "@apollo/client";

export const SEND_NOTIFICATION = gql`
  mutation SendNotification(
    $to: [String!]!
    $title: String!
    $body: String!
    $data: String!
  ) {
    sendNotification(to: $to, title: $title, body: $body, data: $data)
  }
`;
