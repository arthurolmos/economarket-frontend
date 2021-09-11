import { gql } from "@apollo/client";

export const READ_PRODUCTS_BY_USER = gql`
  query ReadProductsByUser($userId: String!) {
    productsByUser(userId: $userId) {
      id
      name
      price
      brand
      market
    }
  }
`;
