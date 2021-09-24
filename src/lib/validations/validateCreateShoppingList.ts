import { ListProductCreateInput } from "../../interfaces/listProduct";
import { ShoppingListCreateInput } from "../../interfaces/shoppingList";

export function validateCreateShoppingList({
  name,
  date,
}: ShoppingListCreateInput) {
  return !name || name === "" || !date || !date ? false : true;
}
