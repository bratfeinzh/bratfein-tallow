import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const nav = [
  { to: "/", label: "Startseite" },
  { to: "/ueber-uns", label: "Über uns" },
  { to: "/referenzen", label: "Referenzen & Standorte" },
  { to: "/shop", label: "Shop" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/85 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-soft border-border" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="group flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-serif text-2xl tracking-tight text-foreground">Bratfein</span>
          <span className="hidden text-[0.6rem] font-bold uppercase tracking-[0.24em] text-copper sm:inline">
            Rindertalg
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="relative text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground data-[status=active]:after:absolute data-[status=active]:after:-bottom-2 data-[status=active]:after:left-0 data-[status=active]:after:h-px data-[status=active]:after:w-full data-[status=active]:after:bg-copper"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/shop"
            className="rounded-sm bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-accent"
          >
            Bestellen
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Menü schliessen" : "Menü öffnen"}
          onClick={() => setOpen((v) => !v)}
          className="rounded-sm border border-border p-2 text-foreground md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-5 pb-6 pt-2 md:hidden">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block border-b border-border/60 py-3.5 text-sm text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
