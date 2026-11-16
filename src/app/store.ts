import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "@/features/cart/cartSlice";
import { loadCart, saveCart } from "@/features/cart/cartStorage";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: loadCart(),
  },
});

let previousCart = store.getState().cart;

store.subscribe(() => {
  const cart = store.getState().cart;
  if (cart !== previousCart) {
    previousCart = cart;
    saveCart(cart);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
