import { useSearchParams } from "react-router";

import { parseFilters } from "@/features/products/filters";
import type { QuickFilter, SortOption } from "@/types/product";

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = parseFilters(searchParams);

  const hasActiveFilters =
    filters.search !== "" ||
    filters.category !== "" ||
    filters.quickFilter !== null ||
    filters.minPrice !== null ||
    filters.maxPrice !== null ||
    filters.sort !== "featured";

  function updateParams(changes: Record<string, string | null>) {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);

      for (const [key, value] of Object.entries(changes)) {
        if (value === null || value === "") next.delete(key);
        else next.set(key, value);
      }

      if (!("page" in changes)) next.delete("page");

      return next;
    });
  }

  return {
    filters,
    hasActiveFilters,
    setSearch: (query: string) => updateParams({ q: query }),
    setCategory: (slug: string) => updateParams({ category: slug }),
    setQuickFilter: (value: QuickFilter | null) =>
      updateParams({ filter: value }),
    setPriceRange: (min: string, max: string) => updateParams({ min, max }),
    setSort: (sort: SortOption) =>
      updateParams({ sort: sort === "featured" ? null : sort }),
    setPage: (page: number) =>
      updateParams({ page: page > 1 ? String(page) : null }),
    clearAll: () => setSearchParams({}),
  };
}
