import { Star } from "lucide-react";

interface RatingProps {
  value: number;
  count: number;
}

export function Rating({ value, count }: RatingProps) {
  return (
    <div className="flex items-center gap-1.5 text-sm">
      <Star className="size-4 fill-brand text-brand" aria-hidden="true" />
      <span className="font-medium">{value.toFixed(1)}</span>
      <span className="text-muted-foreground">({count} reviews)</span>
    </div>
  );
}
