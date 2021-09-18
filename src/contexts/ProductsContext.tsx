import React from "react";
import { AuthContext } from "./AuthContext";
import { getProductsByUser } from "../apollo/queries";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_BY_USER } from "../apollo/graphql";

interface Props {
  children: React.ReactElement;
}

interface IContext {
  products: any[];
  refetch: () => void;
  loading: boolean;
  // addProduct: (product: any) => void;
  // removeProduct: (product: any) => void;
}

export const ProductsContext = React.createContext({} as IContext);

export function ProductsProvider({ children }: Props) {
  const { user } = React.useContext(AuthContext);

  // const [products, setProducts] = React.useState<any[]>([]);

  // const addProduct = async (product: any) => {
  //   setProducts([...products, product]);
  // };

  // const removeProduct = async (product: any) => {
  //   const index = products.indexOf(product);

  //   if (index === -1) return;

  //   setProducts(products.splice(index, 1));
  // };

  const { loading, data, refetch, startPolling, stopPolling } = useQuery(
    GET_PRODUCTS_BY_USER,
    {
      variables: { userId: user?.id },
    }
  );
  const products = data?.productsByUser ? data?.productsByUser : [];

  React.useEffect(() => {
    startPolling(500);

    return () => stopPolling();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        refetch,
        loading,
        // addProduct,
        // removeProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
