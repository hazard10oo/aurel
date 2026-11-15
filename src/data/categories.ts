import type { Category } from "@/types/product";

const img = (seed: string) => `https://picsum.photos/seed/${seed}/800/1000`;

export const categories: Category[] = [
  {
    id: "c-women",
    slug: "women",
    name: "Women",
    description: "Considered essentials for every day.",
    image: img("aurel-women"),
  },
  {
    id: "c-men",
    slug: "men",
    name: "Men",
    description: "Clean lines, natural fabrics.",
    image: img("aurel-men"),
  },
  {
    id: "c-accessories",
    slug: "accessories",
    name: "Accessories",
    description: "Small details that finish a look.",
    image: img("aurel-accessories"),
  },
  {
    id: "c-home",
    slug: "home",
    name: "Home",
    description: "Slow living, beautifully made.",
    image: img("aurel-home"),
  },
];
