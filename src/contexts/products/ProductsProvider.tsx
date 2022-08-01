import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_BY_USER } from "../../apollo/graphql";
import { useAuthContext } from "../auth";
import { ProductsContext } from "./ProductsContext";

interface Props {
  children: React.ReactElement[] | React.ReactElement;
}

export function ProductsProvider({ children }: Props) {
  const { user } = useAuthContext();

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
