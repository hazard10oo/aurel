import { useState } from "react";

import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-3">
      <div className="aspect-[4/5] overflow-hidden rounded-lg bg-muted">
        <img
          src={images[activeIndex]}
          alt={`${name}, image ${activeIndex + 1}`}
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show image ${index + 1}`}
              aria-current={index === activeIndex}
              className={cn(
                "size-20 overflow-hidden rounded-md border-2 bg-muted transition-colors",
                index === activeIndex
                  ? "border-foreground"
                  : "border-transparent hover:border-border",
              )}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
