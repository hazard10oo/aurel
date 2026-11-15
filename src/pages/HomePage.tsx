import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/format";

export function HomePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Mock data test</h1>
      <p className="text-muted-foreground">
        {categories.length} categories, {products.length} products
      </p>
      <ul className="space-y-1">
        {products.map((product) => (
          <li key={product.id}>
            {product.name} — {formatPrice(product.price)}
          </li>
        ))}
      </ul>
    </div>
  );
}
