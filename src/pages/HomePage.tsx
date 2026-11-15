import { useEffect, useState } from "react";

import { formatPrice } from "@/lib/format";
import { getFeaturedProducts } from "@/services/productsService";
import type { Product } from "@/types/product";

export function HomePage() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedProducts()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Featured products</h1>
      <ul className="space-y-1">
        {items.map((product) => (
          <li key={product.id}>
            {product.name} — {formatPrice(product.price)}
          </li>
        ))}
      </ul>
    </div>
  );
}
