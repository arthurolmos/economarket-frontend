import { gql } from "@apollo/client";

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($data: ProductsCreateInput!, $userId: String!) {
    createProduct(data: $data, userId: $userId) {
      id
      name
      price
    }
  }
`;
