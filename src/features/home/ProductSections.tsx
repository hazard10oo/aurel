import { ProductCard } from "@/components/common/ProductCard";
import { ProductCardSkeleton } from "@/components/common/ProductCardSkeleton";
import { SectionHeading } from "@/components/common/SectionHeading";
import {
  useBestSellers,
  useFeaturedProducts,
  useNewArrivals,
} from "@/features/products/queries";
import type { Product } from "@/types/product";

interface ProductGridSectionProps {
  eyebrow: string;
  title: string;
  actionTo: string;
  products?: Product[];
  isPending: boolean;
  isError: boolean;
}

function ProductGridSection({
  eyebrow,
  title,
  actionTo,
  products,
  isPending,
  isError,
}: ProductGridSectionProps) {
  return (
    <section className="py-12">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        actionLabel="View all"
        actionTo={actionTo}
      />

      {isError ? (
        <p className="text-destructive">Could not load products.</p>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
          {isPending
            ? Array.from({ length: 4 }, (_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      )}
    </section>
  );
}

export function TrendingSection() {
  const { data, isPending, isError } = useFeaturedProducts(4);

  return (
    <ProductGridSection
      eyebrow="Curated"
      title="Trending now"
      actionTo="/products"
      products={data}
      isPending={isPending}
      isError={isError}
    />
  );
}

export function NewArrivalsSection() {
  const { data, isPending, isError } = useNewArrivals(4);

  return (
    <ProductGridSection
      eyebrow="Just in"
      title="New arrivals"
      actionTo="/products?filter=new"
      products={data}
      isPending={isPending}
      isError={isError}
    />
  );
}

export function BestSellersSection() {
  const { data, isPending, isError } = useBestSellers(4);

  return (
    <ProductGridSection
      eyebrow="Customer favourites"
      title="Best sellers"
      actionTo="/products?sort=popular"
      products={data}
      isPending={isPending}
      isError={isError}
    />
  );
}
