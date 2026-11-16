import { EmptyState } from "@/components/common/EmptyState";
import { Pagination } from "@/components/common/Pagination";
import { ProductCard } from "@/components/common/ProductCard";
import { ProductCardSkeleton } from "@/components/common/ProductCardSkeleton";
import { ProductGrid } from "@/components/common/ProductGrid";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/features/categories/queries";
import { ProductFiltersBar } from "@/features/products/ProductFiltersBar";
import { useProductList } from "@/features/products/queries";
import { useProductFilters } from "@/features/products/useProductFilters";
import { cn } from "@/lib/utils";

export function ProductsPage() {
  const {
    filters,
    hasActiveFilters,
    setSearch,
    setCategory,
    setQuickFilter,
    setPriceRange,
    setSort,
    setPage,
    clearAll,
  } = useProductFilters();
  const { data, isPending, isError, isFetching, refetch } =
    useProductList(filters);
  const { data: categories } = useCategories();

  const activeCategory = categories?.find(
    (item) => item.slug === filters.category,
  );
  const title = filters.search
    ? `Results for "${filters.search}"`
    : (activeCategory?.name ?? "All products");

  return (
    <div>
      <header className="mb-8 space-y-1">
        <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {data ? `${data.total} items` : "\u00A0"}
        </p>
      </header>

      <ProductFiltersBar
        filters={filters}
        hasActiveFilters={hasActiveFilters}
        onSearch={setSearch}
        onCategoryChange={setCategory}
        onQuickFilterChange={setQuickFilter}
        onPriceChange={setPriceRange}
        onSortChange={setSort}
        onClearAll={clearAll}
      />

      {isPending && (
        <ProductGrid>
          {Array.from({ length: 8 }, (_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </ProductGrid>
      )}

      {isError && (
        <EmptyState
          title="Something went wrong"
          description="We could not load the products. Please try again."
          action={<Button onClick={() => refetch()}>Try again</Button>}
        />
      )}

      {data && data.items.length === 0 && (
        <EmptyState
          title="No products match your filters"
          description="Try a different search or remove some filters."
          action={
            hasActiveFilters ? (
              <Button variant="outline" onClick={clearAll}>
                Clear all filters
              </Button>
            ) : undefined
          }
        />
      )}

      {data && data.items.length > 0 && (
        <>
          <div className={cn("transition-opacity", isFetching && "opacity-60")}>
            <ProductGrid>
              {data.items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>
          </div>
          <Pagination
            page={data.page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
