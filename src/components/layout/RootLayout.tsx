import { Outlet, ScrollRestoration } from "react-router";

import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 py-10">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
