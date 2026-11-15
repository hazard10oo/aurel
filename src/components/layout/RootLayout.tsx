import { Link, Outlet } from "react-router";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-heading text-2xl tracking-tight">
            Aurel
          </Link>
          <Link
            to="/products"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Products
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
