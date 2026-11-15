import { Link } from "react-router";
import { Container } from "@/components/layout/Container";

type FooterLink = { to: string; label: string };
type FooterGroup = { title: string; links: FooterLink[] };

const footerGroups: FooterGroup[] = [
  {
    title: "Shop",
    links: [
      { to: "/products", label: "All products" },
      { to: "/wishlist", label: "Wishlist" },
      { to: "/cart", label: "Cart" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { to: "/faq", label: "FAQ" },
      { to: "/shipping", label: "Shipping & returns" },
    ],
  },
  {
    title: "Legal",
    links: [
      { to: "/terms", label: "Terms" },
      { to: "/privacy", label: "Privacy" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary/50">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
            <div className="col-span-2 space-y-3">
              <Link to="/" className="font-heading text-2xl tracking-tight">
                Aurel
              </Link>
              <p className="max-w-xs text-sm text-muted-foreground">
                Quiet, timeless clothing for everyday life. Designed to last.
              </p>
            </div>

            {footerGroups.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h3 className="mb-3 font-sans text-sm font-semibold">
                  {group.title}
                </h3>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© {year} Aurel. All rights reserved.</p>
            <p>
              Portfolio project by Mohamed. Payments run in test mode only.{" "}
              <a
                href="https://github.com/hazard10oo/aurel"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 hover:text-foreground"
              >
                View on GitHub
              </a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
