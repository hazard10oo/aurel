import { ProductCard } from "@/components/common/ProductCard";
import { ProductCardSkeleton } from "@/components/common/ProductCardSkeleton";
import { ProductGrid } from "@/components/common/ProductGrid";
import { SectionHeading } from "@/components/common/SectionHeading";
import { useRelatedProducts } from "@/features/products/queries";
import type { Product } from "@/types/product";

export function RelatedProducts({ product }: { product: Product }) {
  const { data, isPending, isError } = useRelatedProducts(product);

  if (isError || (data && data.length === 0)) return null;

  return (
    <section className="pt-16">
      <SectionHeading eyebrow="You may also like" title="Related products" />
      <ProductGrid>
        {isPending
          ? Array.from({ length: 4 }, (_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : data?.map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
      </ProductGrid>
    </section>
  );
}
