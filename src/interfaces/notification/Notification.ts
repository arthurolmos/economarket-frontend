import { User } from "../user";

export interface Notification {
  id: string;
  title: string;
  body: string;
  read: boolean;
  user: User;
  shoppingListId?: string;
}
