import { useQuery } from "@tanstack/react-query";

import {
  getBestSellers,
  getFeaturedProducts,
  getNewArrivals,
  getProductBySlug,
  getProducts,
} from "@/services/productsService";

export function useProducts() {
  return useQuery({ queryKey: ["products"], queryFn: getProducts });
}

export function useFeaturedProducts(limit = 4) {
  return useQuery({
    queryKey: ["products", "featured", limit],
    queryFn: () => getFeaturedProducts(limit),
  });
}

export function useNewArrivals(limit = 4) {
  return useQuery({
    queryKey: ["products", "new", limit],
    queryFn: () => getNewArrivals(limit),
  });
}

export function useBestSellers(limit = 4) {
  return useQuery({
    queryKey: ["products", "best-sellers", limit],
    queryFn: () => getBestSellers(limit),
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["products", "detail", slug],
    queryFn: () => getProductBySlug(slug),
  });
}
