import type { ProductFilters, QuickFilter, SortOption } from "@/types/product";

export const DEFAULT_PAGE_SIZE = 8;

export const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "popular", label: "Most popular" },
];

export function isSortOption(value: string | null): value is SortOption {
  return sortOptions.some((option) => option.value === value);
}

export function isQuickFilter(value: string | null): value is QuickFilter {
  return value === "new" || value === "sale";
}

function parsePrice(value: string | null): number | null {
  if (value === null || value === "") return null;
  const dollars = Number(value);
  return Number.isFinite(dollars) && dollars >= 0
    ? Math.round(dollars * 100)
    : null;
}

export function parseFilters(params: URLSearchParams): ProductFilters {
  const sort = params.get("sort");
  const quickFilter = params.get("filter");
  const page = Number(params.get("page"));

  let minPrice = parsePrice(params.get("min"));
  let maxPrice = parsePrice(params.get("max"));
  if (minPrice !== null && maxPrice !== null && minPrice > maxPrice) {
    [minPrice, maxPrice] = [maxPrice, minPrice];
  }

  return {
    search: params.get("q")?.trim() ?? "",
    category: params.get("category") ?? "",
    quickFilter: isQuickFilter(quickFilter) ? quickFilter : null,
    minPrice,
    maxPrice,
    sort: isSortOption(sort) ? sort : "featured",
    page: Number.isInteger(page) && page > 0 ? page : 1,
    pageSize: DEFAULT_PAGE_SIZE,
  };
}
