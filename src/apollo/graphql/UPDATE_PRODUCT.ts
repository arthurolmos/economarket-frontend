import { gql } from "@apollo/client";

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($values: ProductsUpdateInput!, $id: String!) {
    updateProduct(values: $values, id: $id) {
      id
      name
      price
      market
    }
  }
`;
