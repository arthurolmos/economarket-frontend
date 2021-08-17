import { gql } from "@apollo/client";

export const LEAVE_SHARED_SHOPPING_LIST = gql`
  mutation LeaveSharedShoppingList($id: String!, $userId: String!) {
    leaveSharedShoppingList(id: $id, userId: $userId)
  }
`;
