import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-start gap-4">
      <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-stone-600">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="underline underline-offset-4">
        Back to home
      </Link>
    </div>
  );
}
