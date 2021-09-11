import { gql } from "@apollo/client";

export const UPDATE_USER_EXPO_TOKEN = gql`
  mutation UpdateUserExpoToken($id: String!, $expoToken: String!) {
    updateUserExpoToken(id: $id, expoToken: $expoToken) {
      id
      firstName
      lastName
      email
      expo {
        token
      }
    }
  }
`;
