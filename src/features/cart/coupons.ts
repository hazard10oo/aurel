export interface Coupon {
  code: string;
  percent: number;
  description: string;
}

export const coupons: Coupon[] = [
  { code: "AUREL10", percent: 10, description: "10% off your order" },
  { code: "SPRING15", percent: 15, description: "15% off your order" },
];

export function findCoupon(code: string): Coupon | undefined {
  const normalized = code.trim().toUpperCase();
  return coupons.find((coupon) => coupon.code === normalized);
}

export function getCouponDiscount(subtotal: number, coupon: Coupon): number {
  return Math.round((subtotal * coupon.percent) / 100);
}
