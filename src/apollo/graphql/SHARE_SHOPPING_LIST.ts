import { gql } from "@apollo/client";

export const SHARE_SHOPPING_LIST = gql`
  mutation ShareShoppingList(
    $id: String!
    $userId: String!
    $sharedUsersEmail: [String!]!
  ) {
    shareShoppingList(
      id: $id
      userId: $userId
      sharedUsersEmail: $sharedUsersEmail
    ) {
      id
      name
      sharedUsers {
        id
        firstName
        lastName
      }
    }
  }
`;
