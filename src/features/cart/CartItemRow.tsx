import { Trash2 } from "lucide-react";
import { Link } from "react-router";

import { useAppDispatch } from "@/app/hooks";
import { QuantityStepper } from "@/components/common/QuantityStepper";
import { Button } from "@/components/ui/button";
import { removeItem, setQuantity } from "@/features/cart/cartSlice";
import { formatPrice } from "@/lib/format";
import type { CartItem } from "@/types/cart";

export function CartItemRow({ item }: { item: CartItem }) {
  const dispatch = useAppDispatch();
  const productPath = `/products/${item.slug}`;

  return (
    <li className="flex gap-4 py-6">
      <Link to={productPath} className="shrink-0">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="aspect-[4/5] w-24 rounded-md bg-muted object-cover"
        />
      </Link>

      <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row">
        <div className="space-y-1">
          <Link to={productPath} className="font-medium hover:underline">
            {item.name}
          </Link>
          <p className="text-sm text-muted-foreground">
            {item.colorName} / {item.size}
          </p>
          <p className="text-sm">{formatPrice(item.price)}</p>
        </div>

        <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
          <QuantityStepper
            value={item.quantity}
            max={item.maxQuantity}
            onChange={(quantity) =>
              dispatch(setQuantity({ lineId: item.lineId, quantity }))
            }
          />
          <p className="font-medium">
            {formatPrice(item.price * item.quantity)}
          </p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            aria-label={`Remove ${item.name} from cart`}
            onClick={() => dispatch(removeItem(item.lineId))}
          >
            <Trash2 /> Remove
          </Button>
        </div>
      </div>
    </li>
  );
}
