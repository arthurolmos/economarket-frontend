import { gql } from "@apollo/client";

export const FINISH_SHOPPING_LIST = gql`
  mutation FinishShoppingList($id: String!, $userId: String!) {
    finishShoppingList(userId: $userId, id: $id) {
      id
      name
    }
  }
`;
