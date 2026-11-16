import { Link } from "react-router";

import { SectionHeading } from "@/components/common/SectionHeading";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/features/categories/queries";

export function CategoriesSection() {
  const { data: categories, isPending, isError } = useCategories();

  return (
    <section className="py-12">
      <SectionHeading eyebrow="Collections" title="Shop by category" />

      {isError ? (
        <p className="text-destructive">Could not load categories.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {isPending
            ? Array.from({ length: 4 }, (_, index) => (
                <Skeleton key={index} className="aspect-[4/5] rounded-lg" />
              ))
            : categories?.map((category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-lg bg-muted"
                >
                  <img
                    src={category.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-4 pt-12 text-white">
                    <h3 className="font-heading text-xl">{category.name}</h3>
                    <p className="text-xs text-white/80">
                      {category.description}
                    </p>
                  </div>
                </Link>
              ))}
        </div>
      )}
    </section>
  );
}
