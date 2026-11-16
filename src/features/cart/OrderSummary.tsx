import { useState } from "react";
import type { FormEvent } from "react";
import { X } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  applyCoupon,
  removeCoupon,
  selectActiveCoupon,
  selectCartSubtotal,
  selectCartTotal,
  selectCouponDiscount,
} from "@/features/cart/cartSlice";
import { findCoupon } from "@/features/cart/coupons";
import { formatPrice } from "@/lib/format";

export function OrderSummary() {
  const dispatch = useAppDispatch();
  const subtotal = useAppSelector(selectCartSubtotal);
  const discount = useAppSelector(selectCouponDiscount);
  const total = useAppSelector(selectCartTotal);
  const coupon = useAppSelector(selectActiveCoupon);
  const [error, setError] = useState<string | null>(null);

  function handleApply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const value = new FormData(form).get("coupon");
    const code = typeof value === "string" ? value : "";

    if (!code.trim()) {
      setError("Enter a coupon code.");
      return;
    }

    const found = findCoupon(code);
    if (!found) {
      setError("This code is not valid.");
      return;
    }

    dispatch(applyCoupon(found.code));
    setError(null);
    form.reset();
  }

  return (
    <aside className="h-fit space-y-5 rounded-lg border border-border bg-card p-6 lg:sticky lg:top-24">
      <h2 className="text-xl font-semibold">Order summary</h2>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        {coupon && (
          <div className="flex justify-between text-brand">
            <span>Discount ({coupon.code})</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-muted-foreground">Calculated at checkout</span>
        </div>
        <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {coupon ? (
        <div className="flex items-center justify-between rounded-md bg-secondary px-3 py-2 text-sm">
          <span>
            <strong>{coupon.code}</strong>: {coupon.description}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Remove coupon"
            onClick={() => dispatch(removeCoupon())}
          >
            <X />
          </Button>
        </div>
      ) : (
        <form onSubmit={handleApply} className="space-y-2">
          <div className="flex gap-2">
            <Input
              name="coupon"
              placeholder="Coupon code"
              aria-label="Coupon code"
              aria-invalid={error !== null}
              autoComplete="off"
            />
            <Button type="submit" variant="outline">
              Apply
            </Button>
          </div>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
        </form>
      )}

      <Button size="lg" className="w-full" disabled>
        Checkout
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Checkout opens in a later phase. Payments will run in test mode only.
      </p>
    </aside>
  );
}
