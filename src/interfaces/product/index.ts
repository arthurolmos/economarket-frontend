export interface Product {
  id: string;
  name: string;
  price: number;
  brand?: string;
  market?: string;
}

export interface ProductCreateInput {
  name: string;
  price: number;
  brand?: string;
  market?: string;
}
