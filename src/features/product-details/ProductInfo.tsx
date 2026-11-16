import { Rating } from "@/components/common/Rating";
import { formatPrice } from "@/lib/format";
import { getDiscountPercent } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

export function ProductInfo({ product }: { product: Product }) {
  const discount = getDiscountPercent(product.price, product.compareAtPrice);
  const soldOut = product.stock === 0;
  const lowStock = product.stock > 0 && product.stock <= 10;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight">
          {product.name}
        </h1>
        <Rating value={product.rating} count={product.reviewCount} />
      </div>

      <div className="flex items-center gap-3">
        <span className="text-2xl">{formatPrice(product.price)}</span>
        {discount > 0 && product.compareAtPrice && (
          <>
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
            <span className="rounded-sm bg-brand px-2 py-0.5 text-xs font-medium text-brand-foreground">
              -{discount}%
            </span>
          </>
        )}
      </div>

      <p className="text-muted-foreground">{product.description}</p>

      <p
        className={cn(
          "text-sm font-medium",
          soldOut && "text-destructive",
          lowStock && "text-brand",
          !soldOut && !lowStock && "text-muted-foreground",
        )}
      >
        {soldOut
          ? "Sold out"
          : lowStock
            ? `Only ${product.stock} left`
            : "In stock"}
      </p>
    </div>
  );
}
