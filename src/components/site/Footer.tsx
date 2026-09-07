import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube } from "lucide-react";

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/bratfein.ch/",
    label: "Bratfein auf Instagram besuchen",
    icon: Instagram,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@bratfein",
    label: "Bratfein auf TikTok besuchen",
    icon: TikTokIcon,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@bratfein_ch",
    label: "Bratfein auf YouTube besuchen",
    icon: Youtube,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61593513461142",
    label: "Bratfein auf Facebook besuchen",
    icon: Facebook,
  },
];

function TikTokIcon({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4c.5.5 2.8 1.8 4 2" />
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
        <div className="text-sm">
          <p className="eyebrow">Folge uns</p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex items-center justify-center rounded-full border border-walnut-foreground/20 p-2.5 text-walnut-foreground/80 transition-colors duration-300 hover:border-copper hover:text-copper-soft"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="relative z-10 border-t border-walnut-foreground/10 px-5 py-6 text-center text-xs text-walnut-foreground/50 md:px-8">
        © {new Date().getFullYear()} Bratfein — Young Enterprise Switzerland Projekt
      </div>
    </footer>
  );
}

