import type { Size } from "@/types/product";

export interface CartItem {
  lineId: string;
  productId: string;
  slug: string;
  name: string;
  image: string;

  price: number;
  colorName: string;
  size: Size;
  quantity: number;

  maxQuantity: number;
}
