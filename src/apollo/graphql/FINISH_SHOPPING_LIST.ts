import { gql } from "@apollo/client";

export const FINISH_SHOPPING_LIST = gql`
  mutation FinishShoppingList($id: String!) {
    finishShoppingList(id: $id) {
      id
      name
    }
  }
`;
