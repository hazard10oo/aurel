import { Link } from "react-router";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="grid items-center gap-10 py-6 md:grid-cols-2 md:py-12">
      <div className="space-y-6">
        <p className="text-sm font-medium tracking-widest text-brand uppercase">
          Autumn / Winter 2026
        </p>
        <h1 className="text-5xl leading-tight font-semibold tracking-tight md:text-6xl">
          Quiet clothes for everyday life
        </h1>
        <p className="max-w-md text-lg text-muted-foreground">
          Timeless pieces in natural fabrics, designed to be worn often and kept
          for years.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/products">Shop the collection</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/products?filter=new">New arrivals</Link>
          </Button>
        </div>
      </div>

      <div className="aspect-[4/5] overflow-hidden rounded-lg bg-muted">
        <img
          src="https://picsum.photos/seed/aurel-hero/1200/1500"
          alt=""
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  );
}
