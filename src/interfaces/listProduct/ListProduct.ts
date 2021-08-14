import { ShoppingList } from "../shoppingList";

export interface ListProduct {
  id: string;
  name: string;
  quantity: number;
  price: number;
  brand?: string;
  market?: string;
  purchased: boolean;

  productId?: string;
  shoppingList: ShoppingList;
}
