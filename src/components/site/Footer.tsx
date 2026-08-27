import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="surface-walnut grain-overlay mt-24">
      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-serif text-3xl">Bratfein</p>
          <p className="mt-3 max-w-xs text-sm text-walnut-foreground/70">
            Regionaler Rindertalg aus Zürich. Ein YES-Projekt von sieben Schweizer
            Gymnasiastinnen und Gymnasiasten.
          </p>
        </div>
        <div className="text-sm">
          <p className="eyebrow">Navigation</p>
          <ul className="mt-4 space-y-2 text-walnut-foreground/80">
            <li>
              <Link to="/" className="transition-colors hover:text-copper-soft">
                Startseite
              </Link>
            </li>
            <li>
              <Link to="/ueber-uns" className="transition-colors hover:text-copper-soft">
                Über uns
              </Link>
            </li>
            <li>
              <Link to="/referenzen" className="transition-colors hover:text-copper-soft">
                Referenzen & Standorte
              </Link>
            </li>
            <li>
              <Link to="/shop" className="transition-colors hover:text-copper-soft">
                Shop
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="eyebrow">Kontakt</p>
          <ul className="mt-4 space-y-2 text-walnut-foreground/80">
            <li>
              <a
                className="transition-colors hover:text-copper-soft"
                href="mailto:bratfein.zh@gmail.com"
              >
                bratfein.zh@gmail.com
              </a>
            </li>
            <li>8000 Zürich, Schweiz</li>
            <li>Zahlung via Twint, Karte oder bar vor Ort</li>
          </ul>
        </div>
      </div>
      <div className="relative z-10 border-t border-walnut-foreground/10 px-5 py-6 text-center text-xs text-walnut-foreground/50 md:px-8">
        © {new Date().getFullYear()} Bratfein — Young Enterprise Switzerland Projekt
      </div>
    </footer>
  );
}
