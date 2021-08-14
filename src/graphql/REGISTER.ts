import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($data: UserCreateInput!) {
    register(data: $data) {
      token
      user {
        id
        firstName
        lastName
      }
    }
  }
`;
