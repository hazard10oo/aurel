import { Outlet } from "react-router";

import { Navbar } from "@/components/layout/Navbar";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  );
}
