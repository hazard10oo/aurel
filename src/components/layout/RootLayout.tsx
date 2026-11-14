import { Link, Outlet } from "react-router";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <header className="border-b border-stone-200">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-semibold tracking-tight">
            Aurel
          </Link>
          <Link
            to="/products"
            className="text-sm text-stone-600 hover:text-stone-900"
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
