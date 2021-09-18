import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
      price
      brand
      market
    }
  }
`;
