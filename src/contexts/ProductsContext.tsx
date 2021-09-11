import React from "react";
import { AuthContext } from "./AuthContext";
import { getProductsByUser } from "../apollo/queries";

interface Props {
  children: React.ReactElement;
}

interface IContext {
  products: any[];
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

  const { data } = getProductsByUser(user?.id);
  const products = data?.productsByUser ? data?.productsByUser : [];

  return (
    <ProductsContext.Provider
      value={{
        products,
        // addProduct,
        // removeProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
