import { gql } from "@apollo/client";

export const GET_PRODUCTS_BY_USER = gql`
  query GetProductsByUser($userId: String!) {
    productsByUser(userId: $userId) {
      id
      name
      price
      brand
      market
    }
  }
`;
