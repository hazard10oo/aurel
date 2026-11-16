import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";
import { findCoupon, getCouponDiscount } from "@/features/cart/coupons";
import type { CartItem } from "@/types/cart";

export interface CartState {
  items: CartItem[];
  couponCode: string | null;
}

const initialState: CartState = { items: [], couponCode: null };

export function getLineId(
  productId: string,
  colorName: string,
  size: string,
): string {
  return `${productId}__${colorName}__${size}`;
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Omit<CartItem, "lineId">>) {
      const { productId, colorName, size, quantity, maxQuantity } =
        action.payload;
      const lineId = getLineId(productId, colorName, size);
      const existing = state.items.find((item) => item.lineId === lineId);

      if (existing) {
        existing.quantity = Math.min(
          existing.quantity + quantity,
          existing.maxQuantity,
        );
      } else {
        state.items.push({
          ...action.payload,
          lineId,
          quantity: Math.min(quantity, maxQuantity),
        });
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.lineId !== action.payload,
      );
    },
    setQuantity(
      state,
      action: PayloadAction<{ lineId: string; quantity: number }>,
    ) {
      const item = state.items.find(
        (entry) => entry.lineId === action.payload.lineId,
      );
      if (!item) return;
      item.quantity = Math.min(
        Math.max(action.payload.quantity, 1),
        item.maxQuantity,
      );
    },
    applyCoupon(state, action: PayloadAction<string>) {
      state.couponCode = action.payload;
    },
    removeCoupon(state) {
      state.couponCode = null;
    },
    clearCart(state) {
      state.items = [];
      state.couponCode = null;
    },
  },
});

export const {
  addItem,
  removeItem,
  setQuantity,
  applyCoupon,
  removeCoupon,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartSubtotal = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

export const selectActiveCoupon = (state: RootState) =>
  findCoupon(state.cart.couponCode ?? "");

export const selectCouponDiscount = (state: RootState) => {
  const coupon = selectActiveCoupon(state);
  return coupon ? getCouponDiscount(selectCartSubtotal(state), coupon) : 0;
};

export const selectCartTotal = (state: RootState) =>
  selectCartSubtotal(state) - selectCouponDiscount(state);
