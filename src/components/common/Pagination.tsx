import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageItems(page: number, totalPages: number): (number | "…")[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const visible = [1, page - 1, page, page + 1, totalPages]
    .filter((value) => value >= 1 && value <= totalPages)
    .filter((value, index, all) => all.indexOf(value) === index)
    .sort((a, b) => a - b);

  const items: (number | "…")[] = [];
  visible.forEach((value, index) => {
    if (index > 0 && value - visible[index - 1] > 1) items.push("…");
    items.push(value);
  });
  return items;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-12 flex items-center justify-center gap-1"
    >
      <Button
        variant="ghost"
        size="icon"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft />
      </Button>

      {getPageItems(page, totalPages).map((item, index) =>
        item === "…" ? (
          <span
            key={`gap-${index}`}
            aria-hidden="true"
            className="px-2 text-muted-foreground"
          >
            …
          </span>
        ) : (
          <Button
            key={item}
            variant={item === page ? "default" : "ghost"}
            size="icon"
            aria-label={`Page ${item}`}
            aria-current={item === page ? "page" : undefined}
            onClick={() => onPageChange(item)}
          >
            {item}
          </Button>
        ),
      )}

      <Button
        variant="ghost"
        size="icon"
        aria-label="Next page"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight />
      </Button>
    </nav>
  );
}
