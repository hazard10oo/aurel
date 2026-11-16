import type { FormEvent } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategories } from "@/features/categories/queries";
import { isSortOption, sortOptions } from "@/features/products/filters";
import { PriceFilter } from "@/features/products/PriceFilter";
import type { ProductFilters, QuickFilter, SortOption } from "@/types/product";

interface ProductFiltersBarProps {
  filters: ProductFilters;
  hasActiveFilters: boolean;
  onSearch: (query: string) => void;
  onCategoryChange: (slug: string) => void;
  onQuickFilterChange: (value: QuickFilter | null) => void;
  onPriceChange: (min: string, max: string) => void;
  onSortChange: (sort: SortOption) => void;
  onClearAll: () => void;
}

export function ProductFiltersBar({
  filters,
  hasActiveFilters,
  onSearch,
  onCategoryChange,
  onQuickFilterChange,
  onPriceChange,
  onSortChange,
  onClearAll,
}: ProductFiltersBarProps) {
  const { data: categories } = useCategories();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = new FormData(event.currentTarget).get("q");
    onSearch(typeof value === "string" ? value.trim() : "");
  }

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <form onSubmit={handleSubmit} role="search" className="relative flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            key={filters.search}
            name="q"
            type="search"
            defaultValue={filters.search}
            placeholder="Search products..."
            aria-label="Search products"
            className="pl-9"
          />
        </form>

        <select
          aria-label="Sort products"
          value={filters.sort}
          onChange={(event) => {
            const value = event.target.value;
            if (isSortOption(value)) onSortChange(value);
          }}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant={filters.category === "" ? "default" : "outline"}
          aria-pressed={filters.category === ""}
          onClick={() => onCategoryChange("")}
        >
          All
        </Button>
        {categories?.map((category) => (
          <Button
            key={category.id}
            size="sm"
            variant={filters.category === category.slug ? "default" : "outline"}
            aria-pressed={filters.category === category.slug}
            onClick={() => onCategoryChange(category.slug)}
          >
            {category.name}
          </Button>
        ))}

        <span className="mx-1 hidden h-5 w-px bg-border sm:block" />

        {(["new", "sale"] as const).map((value) => (
          <Button
            key={value}
            size="sm"
            variant={filters.quickFilter === value ? "default" : "outline"}
            aria-pressed={filters.quickFilter === value}
            onClick={() =>
              onQuickFilterChange(filters.quickFilter === value ? null : value)
            }
          >
            {value === "new" ? "New" : "On sale"}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <PriceFilter
          min={filters.minPrice}
          max={filters.maxPrice}
          onApply={onPriceChange}
        />
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearAll}>
            Clear all
          </Button>
        )}
      </div>
    </div>
  );
}
