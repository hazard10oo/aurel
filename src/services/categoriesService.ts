import { categories } from "@/data/categories";
import { delay } from "@/lib/delay";
import type { Category } from "@/types/product";

export async function getCategories(): Promise<Category[]> {
  await delay();
  return categories;
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  await delay();
  return categories.find((category) => category.slug === slug) ?? null;
}
