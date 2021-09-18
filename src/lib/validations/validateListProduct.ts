import { ListProductCreateInput } from "../../interfaces/listProduct";

export function validateListProduct({
  name,
  quantity,
  price,
}: ListProductCreateInput) {
  return !name || name === "" || !quantity || !price ? false : true;
}
