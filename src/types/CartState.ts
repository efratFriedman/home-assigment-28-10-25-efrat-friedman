import { Product } from "./Product";

export default interface CartState {
  products: Product[];
  cartCount: number;
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  deleteItem: (id: number) => void;
  resetCart: () => void;
  setProducts: (products: Product[]) => void;
  sum: number;
}