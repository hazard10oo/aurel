import { Heart } from "lucide-react";
import { Link } from "react-router";

import { formatPrice } from "@/lib/format";
import { getDiscountPercent } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
}

export function ProductCard({
  product,
  isWishlisted = false,
  onToggleWishlist,
}: ProductCardProps) {
  const discount = getDiscountPercent(product.price, product.compareAtPrice);
  const soldOut = product.stock === 0;
  const [primaryImage, secondaryImage] = product.images;

  return (
    <article className="group relative">
      <Link to={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
          <img
            src={primaryImage}
            alt={product.name}
            loading="lazy"
            className={cn(
              "absolute inset-0 h-full w-full object-cover",
              soldOut && "opacity-60",
            )}
          />
          {secondaryImage && (
            <img
              src={secondaryImage}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}

          <div className="absolute top-3 left-3 flex flex-col items-start gap-1">
            {soldOut ? (
              <span className="rounded-sm bg-destructive px-2 py-0.5 text-[10px] font-medium tracking-wider text-white uppercase">
                Sold out
              </span>
            ) : (
              <>
                {product.isNew && (
                  <span className="rounded-sm bg-foreground px-2 py-0.5 text-[10px] font-medium tracking-wider text-background uppercase">
                    New
                  </span>
                )}
                {discount > 0 && (
                  <span className="rounded-sm bg-brand px-2 py-0.5 text-[10px] font-medium tracking-wider text-brand-foreground">
                    -{discount}%
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        <div className="mt-3 space-y-1">
          <h3 className="font-sans text-sm font-medium">{product.name}</h3>
          <div className="flex items-center gap-2 text-sm">
            <span>{formatPrice(product.price)}</span>
            {discount > 0 && product.compareAtPrice && (
              <span className="text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
          <div className="flex gap-1.5 pt-1">
            {product.colors.map((color) => (
              <span
                key={color.name}
                title={color.name}
                className="size-3 rounded-full border border-border"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>
      </Link>

      <button
        type="button"
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={isWishlisted}
        onClick={() => onToggleWishlist?.(product)}
        className={cn(
          "absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-colors hover:bg-background",
          isWishlisted && "text-brand",
        )}
      >
        <Heart className={cn("size-4", isWishlisted && "fill-current")} />
      </button>
    </article>
  );
}
