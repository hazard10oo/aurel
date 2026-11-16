import { Link } from "react-router";

interface SectionHeadingProps {
  title: string;
  eyebrow?: string;
  actionLabel?: string;
  actionTo?: string;
}

export function SectionHeading({
  title,
  eyebrow,
  actionLabel,
  actionTo,
}: SectionHeadingProps) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div className="space-y-1">
        {eyebrow && (
          <p className="text-xs font-medium tracking-widest text-brand uppercase">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
      </div>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="text-sm underline underline-offset-4 hover:text-brand"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
