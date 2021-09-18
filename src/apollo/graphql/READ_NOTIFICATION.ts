import { gql } from "@apollo/client";

export const READ_NOTIFICATION = gql`
  mutation ReadNotification($id: String!) {
    readNotification(id: $id) {
      id
    }
  }
`;
