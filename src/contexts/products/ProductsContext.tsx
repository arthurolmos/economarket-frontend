import React from "react";
import { Product } from "../../interfaces/product";

interface IContext {
  products: Product[];
  refetch: () => void;
  loading: boolean;
}

export const ProductsContext = React.createContext({} as IContext);

export const useProductsContext = () => React.useContext(ProductsContext);
