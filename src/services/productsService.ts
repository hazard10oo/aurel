import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { delay } from "@/lib/delay";
import { getDiscountPercent } from "@/lib/pricing";
import type {
  Product,
  ProductFilters,
  ProductListResult,
  SortOption,
} from "@/types/product";

const sorters: Record<SortOption, (a: Product, b: Product) => number> = {
  featured: (a, b) => Number(b.isFeatured) - Number(a.isFeatured),
  newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  popular: (a, b) => b.reviewCount - a.reviewCount,
};

export async function queryProducts(
  filters: ProductFilters,
): Promise<ProductListResult> {
  await delay();

  const {
    search,
    category,
    quickFilter,
    minPrice,
    maxPrice,
    sort,
    page,
    pageSize,
  } = filters;

  const term = search.toLowerCase();
  const categoryId = categories.find((item) => item.slug === category)?.id;

  const filtered = products.filter((product) => {
    if (
      term &&
      !`${product.name} ${product.description}`.toLowerCase().includes(term)
    ) {
      return false;
    }
    if (category && product.categoryId !== categoryId) return false;
    if (minPrice !== null && product.price < minPrice) return false;
    if (maxPrice !== null && product.price > maxPrice) return false;
    if (quickFilter === "new" && !product.isNew) return false;
    if (
      quickFilter === "sale" &&
      getDiscountPercent(product.price, product.compareAtPrice) === 0
    ) {
      return false;
    }
    return true;
  });

  const sorted = filtered.toSorted(sorters[sort]);

  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * pageSize;

  return {
    items: sorted.slice(start, start + pageSize),
    total,
    page: currentPage,
    totalPages,
  };
}

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
