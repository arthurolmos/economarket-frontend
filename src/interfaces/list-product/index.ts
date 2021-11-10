import { ShoppingList } from "../shoppingList";

export interface ListProduct {
  id: string;
  name: string;
  quantity: number;
  price: number;
  brand?: string;
  market?: string;
  purchased: boolean;
  fav: boolean;

  productId?: string;
  shoppingList: ShoppingList;
}

export interface ListProductCreateInput {
  name: string;
  price: number;
  quantity: number;
  purchased: boolean;
  brand?: string;
  market?: string;
}

export type ListProductUpdateInput = Partial<ListProductCreateInput>;
