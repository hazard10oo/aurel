import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PriceFilterProps {
  min: number | null;

  max: number | null;

  onApply: (min: string, max: string) => void;
}

function toDollars(cents: number | null): string {
  return cents === null ? "" : String(cents / 100);
}

export function PriceFilter({ min, max, onApply }: PriceFilterProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const rawMin = data.get("min");
    const rawMax = data.get("max");

    onApply(
      typeof rawMin === "string" ? rawMin.trim() : "",
      typeof rawMax === "string" ? rawMax.trim() : "",
    );
  }

  return (
    <form
      key={`${min}-${max}`}
      onSubmit={handleSubmit}
      className="flex items-center gap-2"
    >
      <span className="text-sm text-muted-foreground">Price ($)</span>
      <Input
        name="min"
        type="number"
        min={0}
        step="1"
        inputMode="numeric"
        defaultValue={toDollars(min)}
        placeholder="Min"
        aria-label="Minimum price in dollars"
        className="w-20"
      />
      <span aria-hidden="true">-</span>
      <Input
        name="max"
        type="number"
        min={0}
        step="1"
        inputMode="numeric"
        defaultValue={toDollars(max)}
        placeholder="Max"
        aria-label="Maximum price in dollars"
        className="w-20"
      />
      <Button type="submit" size="sm" variant="outline">
        Apply
      </Button>
    </form>
  );
}
