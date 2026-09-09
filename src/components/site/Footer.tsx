import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube } from "lucide-react";

const socialLinks = [
  {
    href: "https://www.instagram.com/bratfein.ch/",
    label: "Bratfein auf Instagram besuchen",
    icon: Instagram,
  },
  {
    href: "https://www.tiktok.com/@bratfein",
    label: "Bratfein auf TikTok besuchen",
    icon: TikTokIcon,
  },
  {
    href: "https://www.youtube.com/@bratfein_ch",
    label: "Bratfein auf YouTube besuchen",
    icon: Youtube,
  },
  {
    href: "https://www.facebook.com/profile.php?id=61593513461142",
    label: "Bratfein auf Facebook besuchen",
    icon: Facebook,
  },
] as const;

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4c.667.667 2 2 4 2" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="surface-walnut grain-overlay mt-24">
      <div className="relative z-10 mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-4 md:px-8">
        <div>
          <p className="font-serif text-3xl">Bratfein</p>
          <p className="mt-3 max-w-xs text-sm text-walnut-foreground/70">
            Schweizer Rinderfett aus Zürich. Ein YES-Projekt von sieben Schweizer
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
              <Link to="/standorte" className="transition-colors hover:text-copper-soft">
                Standorte
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
          <p className="eyebrow">Kontakt & Impressum</p>
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
            <li className="pt-2 text-xs leading-relaxed text-walnut-foreground/60">
              Bratfein ist ein offizielles Mini-Unternehmen von Young Enterprise Switzerland (YES).
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="eyebrow">Folge uns</p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-walnut-foreground/20 text-walnut-foreground/80 transition-colors duration-300 hover:border-copper/60 hover:text-copper-soft"
                >
                  <Icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="relative z-10 border-t border-walnut-foreground/10 px-5 py-6 text-center text-xs text-walnut-foreground/50 md:px-8">
        © {new Date().getFullYear()} Bratfein — Young Enterprise Switzerland Projekt
      </div>
    </footer>
  );
}
