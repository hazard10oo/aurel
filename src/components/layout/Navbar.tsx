import { useState } from "react";
import { Heart, Menu, Search, ShoppingBag } from "lucide-react";
import { Link, NavLink } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "/about", label: "About" },
];

const cartCount = 3;

function navLinkClass({ isActive }: { isActive: boolean }) {
  return cn(
    "text-sm transition-colors hover:text-foreground",
    isActive
      ? "text-foreground underline decoration-brand decoration-2 underline-offset-8"
      : "text-muted-foreground",
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="font-heading text-2xl">Aurel</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 px-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === "/"}
                    className={navLinkClass}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <Link to="/" className="font-heading text-2xl tracking-tight">
            Aurel
          </Link>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={navLinkClass}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search />
          </Button>
          <Button asChild variant="ghost" size="icon">
            <Link to="/wishlist" aria-label="Wishlist">
              <Heart />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" className="relative">
            <Link to="/cart" aria-label="Cart">
              <ShoppingBag />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-medium text-brand-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
