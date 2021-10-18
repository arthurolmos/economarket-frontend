import React from "react";
import { AuthContext } from "./AuthContext";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_BY_USER } from "../apollo/graphql";
import { Product } from "../interfaces/product";

interface Props {
  children: React.ReactElement[] | React.ReactElement;
}

interface IContext {
  products: Product[];
  refetch: () => void;
  loading: boolean;
}

export const ProductsContext = React.createContext({} as IContext);

export function ProductsProvider({ children }: Props) {
  const { user } = React.useContext(AuthContext);

  const { loading, data, refetch, startPolling, stopPolling } = useQuery(
    GET_PRODUCTS_BY_USER,
    {
      variables: { userId: user?.id },
    }
  );
  const products = data?.productsByUser ? data?.productsByUser : [];

  React.useEffect(() => {
    if (user) startPolling(1000);

    return () => stopPolling();
  }, [user]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        refetch,
        loading,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
