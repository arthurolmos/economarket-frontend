import { Expo } from "../expo";
import { ShoppingList } from "../shoppingList";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;

  shoppingLists?: ShoppingList[];

  notifications?: any[];
}
