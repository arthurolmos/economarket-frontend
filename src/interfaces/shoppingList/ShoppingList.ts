import { ListProduct } from "../listProduct";
import { User } from "../user";

export interface ShoppingList {
  id: string;
  name: string;
  date: Date;
  done: boolean;

  user?: User;
  sharedUsers?: User[];
  listProducts?: ListProduct[];
}
