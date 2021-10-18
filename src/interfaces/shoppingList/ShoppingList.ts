import { ListProduct } from "../list-product";
import { User } from "../user";

export interface ShoppingList {
  id: string;
  name: string;
  date: Date;
  done: boolean;

  user?: User;
  sharedUsers?: User[];
  listProducts?: ListProduct[];

  isOwner?: boolean;
  totalPrice: number;
}
