import { Product } from "./Product";

export default interface ProductState {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product) => void;
  clearProduct: () => void;
}