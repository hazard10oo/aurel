import { Link } from "react-router";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { CartItemRow } from "@/features/cart/CartItemRow";
import {
  clearCart,
  selectCartCount,
  selectCartItems,
} from "@/features/cart/cartSlice";
import { OrderSummary } from "@/features/cart/OrderSummary";

export function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Looks like you have not added anything yet."
        action={
          <Button asChild>
            <Link to="/products">Continue shopping</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div>
      <header className="mb-8 flex items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-semibold tracking-tight">
            Shopping cart
          </h1>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {count} {count === 1 ? "item" : "items"}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <ul className="divide-y divide-border border-y border-border">
          {items.map((item) => (
            <CartItemRow key={item.lineId} item={item} />
          ))}
        </ul>
        <OrderSummary />
      </div>
    </div>
  );
}
