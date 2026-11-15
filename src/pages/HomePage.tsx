import { Button } from "@/components/ui/button";

export function HomePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-medium tracking-widest text-brand uppercase">
          New season
        </p>
        <h1 className="text-5xl font-semibold tracking-tight">
          Quiet clothes for everyday life
        </h1>
        <p className="max-w-xl text-muted-foreground">
          Timeless pieces, made to last. This is a temporary design preview.
        </p>
      </div>
      <div className="flex gap-3">
        <Button>Shop now</Button>
        <Button variant="secondary">Learn more</Button>
        <Button variant="outline">Outline</Button>
      </div>
    </div>
  );
}
