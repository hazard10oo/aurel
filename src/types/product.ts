export type Size = "XS" | "S" | "M" | "L" | "XL" | "One Size";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  categoryId: string;
  images: string[];
  colors: ProductColor[];
  sizes: Size[];
  rating: number;
  reviewCount: number;
  stock: number;
  isNew: boolean;
  isFeatured: boolean;
  createdAt: string;
}
