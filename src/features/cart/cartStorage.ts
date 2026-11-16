import type { CartState } from "@/features/cart/cartSlice";
import type { CartItem } from "@/types/cart";

const STORAGE_KEY = "aurel:cart:v1";

const emptyCart: CartState = { items: [], couponCode: null };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isCartItem(value: unknown): value is CartItem {
  return (
    isRecord(value) &&
    typeof value.lineId === "string" &&
    typeof value.productId === "string" &&
    typeof value.slug === "string" &&
    typeof value.name === "string" &&
    typeof value.image === "string" &&
    typeof value.colorName === "string" &&
    typeof value.size === "string" &&
    typeof value.price === "number" &&
    typeof value.quantity === "number" &&
    typeof value.maxQuantity === "number" &&
    Number.isInteger(value.quantity) &&
    value.quantity >= 1 &&
    value.quantity <= value.maxQuantity
  );
}

export function loadCart(): CartState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyCart;

    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed) || !Array.isArray(parsed.items)) return emptyCart;

    return {
      items: parsed.items.filter(isCartItem),
      couponCode:
        typeof parsed.couponCode === "string" ? parsed.couponCode : null,
    };
  } catch {
    return emptyCart;
  }
}

export function saveCart(cart: CartState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch {
    // التخزين غير متاح (وضع خاص أو مساحة ممتلئة): السلة تفضل شغالة في الذاكرة
  }
}
