import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";
import type { CartItem } from "@/types/cart";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

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
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, setQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartSubtotal = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
