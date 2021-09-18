import gql from "graphql-tag";

export const WHO_AM_I = gql`
  query WhoAmI {
    whoAmI {
      id
      firstName
      lastName
      fullName @client
    }
  }
`;
