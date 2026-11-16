import { Link } from "react-router";

import { Button } from "@/components/ui/button";

export function PromoBanner() {
  return (
    <section className="my-12 overflow-hidden rounded-lg bg-foreground text-background">
      <div className="grid items-center md:grid-cols-2">
        <div className="space-y-4 p-8 md:p-12">
          <p className="text-xs font-medium tracking-widest text-brand uppercase">
            Limited time
          </p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Up to 20% off selected pieces
          </h2>
          <p className="max-w-sm text-background/70">
            Use code AUREL10 at checkout for an extra 10% off your first order.
          </p>
          <Button asChild variant="secondary" size="lg">
            <Link to="/products?filter=sale">Shop the sale</Link>
          </Button>
        </div>
        <div className="aspect-[16/10] md:aspect-auto md:h-full">
          <img
            src="https://picsum.photos/seed/aurel-promo/1200/800"
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
