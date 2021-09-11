import { gql } from "@apollo/client";

export const GET_NOTIFICATIONS = gql`
  query Notifications {
    notifications {
      id
      title
      read
    }
  }
`;
