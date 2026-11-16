import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface QuantityStepperProps {
  value: number;
  max: number;
  onChange: (value: number) => void;
}

export function QuantityStepper({
  value,
  max,
  onChange,
}: QuantityStepperProps) {
  return (
    <div className="inline-flex items-center rounded-md border border-border">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Decrease quantity"
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
      >
        <Minus />
      </Button>
      <span className="w-10 text-center text-sm" aria-live="polite">
        {value}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
      >
        <Plus />
      </Button>
    </div>
  );
}
