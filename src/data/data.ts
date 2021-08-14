interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ShoppingList {
  id: string;
  name: string;
  products?: Product[];
}

export const products: Product[] = [
  {
    id: "000001",
    name: "Produto 1",
    price: 100,
    quantity: 1,
  },
  {
    id: "000002",
    name: "Produto 2",
    price: 200,
    quantity: 2,
  },
  {
    id: "000003",
    name: "Produto 3",
    price: 300,
    quantity: 3,
  },
  {
    id: "000004",
    name: "Produto 4",
    price: 400,
    quantity: 4,
  },
  {
    id: "000005",
    name: "Produto 5",
    price: 500,
    quantity: 5,
  },
];

export const shoppingLists: ShoppingList[] = [
  {
    id: "000001",
    name: "Lista 1",
    products: [products[0], products[1]],
  },
  {
    id: "000002",
    name: "Lista 2",
    products: [products[2], products[3]],
  },

  {
    id: "000003",
    name: "Lista 3",
    products: [products[3], products[4]],
  },
];
