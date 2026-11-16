import { Link, useParams } from "react-router";

import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductGallery } from "@/features/product-details/ProductGallery";
import { ProductInfo } from "@/features/product-details/ProductInfo";
import { ProductOptions } from "@/features/product-details/ProductOptions";
import { RelatedProducts } from "@/features/product-details/RelatedProducts";
import { useProduct } from "@/features/products/queries";

function ProductDetailsSkeleton() {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <Skeleton className="aspect-[4/5] w-full rounded-lg" />
      <div className="space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  );
}

function ProductDetails({ slug }: { slug: string }) {
  const { data: product, isPending, isError, refetch } = useProduct(slug);

  if (isPending) return <ProductDetailsSkeleton />;

  if (isError) {
    return (
      <EmptyState
        title="Something went wrong"
        description="We could not load this product. Please try again."
        action={<Button onClick={() => refetch()}>Try again</Button>}
      />
    );
  }

  if (!product) {
    return (
      <EmptyState
        title="Product not found"
        description="This product may have been removed or the link is incorrect."
        action={
          <Button asChild>
            <Link to="/products">Browse all products</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-8">
      <Link
        to="/products"
        className="inline-block text-sm text-muted-foreground hover:text-foreground"
      >
        ← All products
      </Link>
      <div className="grid gap-10 md:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />
        <div className="space-y-8">
          <ProductInfo product={product} />
          <ProductOptions product={product} />
        </div>
      </div>
      <RelatedProducts product={product} />
    </div>
  );
}

export function ProductDetailsPage() {
  const { slug = "" } = useParams();

  return <ProductDetails key={slug} slug={slug} />;
}
