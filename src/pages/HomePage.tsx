import { useEffect, useState } from "react";

import { ProductCard } from "@/components/common/ProductCard";
import { getProducts } from "@/services/productsService";
import type { Product } from "@/types/product";

export function HomePage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    getProducts()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  function toggleWishlist(product: Product) {
    setWishlistIds((ids) =>
      ids.includes(product.id)
        ? ids.filter((id) => id !== product.id)
        : [...ids, product.id],
    );
  }

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
      {items.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isWishlisted={wishlistIds.includes(product.id)}
          onToggleWishlist={toggleWishlist}
        />
      ))}
    </div>
  );
}
