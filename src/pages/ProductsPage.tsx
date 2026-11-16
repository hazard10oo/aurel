import { EmptyState } from "@/components/common/EmptyState";
import { ProductCard } from "@/components/common/ProductCard";
import { ProductCardSkeleton } from "@/components/common/ProductCardSkeleton";
import { ProductGrid } from "@/components/common/ProductGrid";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/features/products/queries";

export function ProductsPage() {
  const { data: products, isPending, isError, refetch } = useProducts();

  return (
    <div>
      <header className="mb-8 space-y-1">
        <h1 className="text-4xl font-semibold tracking-tight">All products</h1>
        {products && (
          <p className="text-sm text-muted-foreground">
            {products.length} items
          </p>
        )}
      </header>

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

      {products && products.length === 0 && (
        <EmptyState
          title="No products found"
          description="Check back soon, new pieces arrive every week."
        />
      )}

      {products && products.length > 0 && (
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      )}
    </div>
  );
}
