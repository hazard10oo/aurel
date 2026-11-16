import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product, Size } from "@/types/product";

const MAX_QUANTITY = 10;

export function ProductOptions({ product }: { product: Product }) {
  const [colorName, setColorName] = useState(product.colors[0]?.name ?? "");
  const [size, setSize] = useState<Size | null>(
    product.sizes.length === 1 ? product.sizes[0] : null,
  );
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const soldOut = product.stock === 0;
  const maxQuantity = Math.min(product.stock, MAX_QUANTITY);

  function clearFeedback() {
    setError(null);
    setAdded(false);
  }

  function handleAdd() {
    if (!size) {
      setAdded(false);
      setError("Please select a size.");
      return;
    }
    setError(null);

    setAdded(true);
  }

  return (
    <div className="space-y-6">
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium">
          Color: <span className="text-muted-foreground">{colorName}</span>
        </legend>
        <div className="flex gap-3">
          {product.colors.map((color) => (
            <button
              key={color.name}
              type="button"
              aria-label={color.name}
              aria-pressed={colorName === color.name}
              disabled={soldOut}
              onClick={() => {
                setColorName(color.name);
                clearFeedback();
              }}
              className={cn(
                "size-9 rounded-full border border-border ring-offset-2 ring-offset-background transition disabled:opacity-50",
                colorName === color.name && "ring-2 ring-foreground",
              )}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium">Size</legend>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={size === option}
              disabled={soldOut}
              onClick={() => {
                setSize(option);
                clearFeedback();
              }}
              className={cn(
                "min-w-12 rounded-md border px-3 py-2 text-sm transition-colors disabled:opacity-50",
                size === option
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="space-y-2">
        <p className="text-sm font-medium">Quantity</p>
        <div className="inline-flex items-center rounded-md border border-border">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Decrease quantity"
            disabled={soldOut || quantity <= 1}
            onClick={() => {
              setQuantity((q) => q - 1);
              clearFeedback();
            }}
          >
            <Minus />
          </Button>
          <span className="w-10 text-center text-sm" aria-live="polite">
            {quantity}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Increase quantity"
            disabled={soldOut || quantity >= maxQuantity}
            onClick={() => {
              setQuantity((q) => q + 1);
              clearFeedback();
            }}
          >
            <Plus />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Button
          type="button"
          size="lg"
          className="w-full"
          disabled={soldOut}
          onClick={handleAdd}
        >
          {soldOut ? "Sold out" : "Add to cart"}
        </Button>
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
        {added && (
          <p role="status" className="text-sm text-brand">
            Added to cart (demo, the real cart arrives in the next phase).
          </p>
        )}
      </div>
    </div>
  );
}
