import { ProductCard } from "@/components/common/ProductCard";
import { useProducts } from "@/features/products/queries";

export function HomePage() {
  const { data: products, isPending, isError, error } = useProducts();

  if (isPending) return <p className="text-muted-foreground">Loading...</p>;
  if (isError) return <p className="text-destructive">{error.message}</p>;

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
