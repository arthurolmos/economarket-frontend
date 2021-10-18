import { gql } from "@apollo/client";

export const WHO_AM_I = gql`
  query WhoAmI {
    whoAmI {
      id
      firstName
      lastName
      email
      fullName @client
    }
  }
`;
