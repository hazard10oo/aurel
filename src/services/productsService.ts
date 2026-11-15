import { products } from "@/data/products";
import { delay } from "@/lib/delay";
import type { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  await delay();
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await delay();
  return products.find((product) => product.slug === slug) ?? null;
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  await delay();
  return products.filter((product) => product.isFeatured).slice(0, limit);
}

export async function getNewArrivals(limit = 4): Promise<Product[]> {
  await delay();
  return products
    .filter((product) => product.isNew)
    .toSorted((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, limit);
}

export async function getBestSellers(limit = 4): Promise<Product[]> {
  await delay();
  return products
    .toSorted((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, limit);
}

export async function getRelatedProducts(
  product: Product,
  limit = 4,
): Promise<Product[]> {
  await delay();
  return products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, limit);
}
