import { createFileRoute } from "@tanstack/react-router";
import { Check, Minus, Plus, Wallet } from "lucide-react";
import { useState } from "react";

import { SectionHeading } from "../components/site/SectionHeading";
import jarImage from "../assets/tallow-jar.jpg";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Bratfein Rindertalg 250 g bestellen" },
      {
        name: "description",
        content:
          "Bratfein Rindertalg im 250-g-Glas für 8–10 CHF bestellen. Abholung am Markt oder Lieferung nach Absprache, Zahlung via Twint oder bar.",
      },
      { property: "og:title", content: "Shop — Bratfein Rindertalg 250 g bestellen" },
      {
        property: "og:description",
        content: "Bestellung anfragen: 250-g-Glas Rindertalg aus Zürich, 8–10 CHF.",
      },
      { property: "og:type", content: "product" },
      { property: "og:url", content: "https://bratfein-tallow.lovable.app/shop" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://bratfein-tallow.lovable.app/shop" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Bratfein Rindertalg 250 g",
          description:
            "Reiner Rindertalg aus einer Zürcher Metzgerei, schonend ausgelassen, zweifach filtriert und von Hand ins neutrale 250-g-Glas abgefüllt.",
          brand: { "@type": "Brand", name: "Bratfein" },
          category: "Speisefett",
          weight: { "@type": "QuantitativeValue", value: 250, unitCode: "GRM" },
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "CHF",
            lowPrice: "8",
            highPrice: "10",
            availability: "https://schema.org/InStock",
            url: "https://bratfein-tallow.lovable.app/shop",
          },
        }),
      },
    ],
  }),
  component: Shop,
});

const ORDER_EMAIL = "bestellung@bratfein.ch";

const highlights = [
  "Reiner Rindertalg, zweifach filtriert",
  "Von einer Metzgerei in Zürich",
  "Neutrales 250-g-Glas, wiederverwendbar",
  "Hoher Rauchpunkt für Steak, Rösti und Gemüse",
];

const fieldClass =
  "mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/70 focus:border-copper";
const labelClass = "block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground";

function Shop() {
  const [quantity, setQuantity] = useState(1);
  const [delivery, setDelivery] = useState<"markt" | "lieferung">("markt");
  const [sent, setSent] = useState(false);

  return (
    <>
      {/* Product showcase */}
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-14 md:px-8 md:pt-20">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <img
            src={jarImage}
            alt="Bratfein Rindertalg im neutralen 250-Gramm-Glas"
            width={1200}
            height={1200}
            className="w-full rounded-sm object-cover shadow-lift"
          />
          <div>
            <p className="eyebrow">Bratfein · Rindertalg</p>
            <h1 className="mt-4 text-4xl leading-tight text-foreground md:text-5xl">
              250-g-Glas Rindertalg
            </h1>
            <hr className="copper-rule mt-6" />
            <p className="mt-6 font-serif text-3xl text-copper">8 – 10 CHF</p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              Schonend ausgelassen, von Hand abgefüllt. Ein Glas reicht für rund zwanzig Mal
              Anbraten – kühl und dunkel gelagert monatelang haltbar.
            </p>
            <ul className="mt-8 space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-copper" strokeWidth={2} />
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-start gap-3 rounded-sm border border-border bg-cream/70 px-5 py-4">
              <Wallet className="mt-0.5 size-5 shrink-0 text-copper" strokeWidth={1.6} />
              <p className="text-sm text-muted-foreground">
                Zahlung bequem via Twint oder Bar vor Ort / nach Absprache.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Order form */}
      <section className="border-t border-border bg-cream/60 py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Bestellformular"
            title="Bestellung anfragen"
            lead="Füllen Sie das Formular aus – wir melden uns per E-Mail mit der Bestätigung, dem Preis und den Details zur Abholung oder Lieferung."
            align="center"
          />

          {sent ? (
            <div className="mt-12 rounded-sm border border-copper/40 bg-background px-7 py-12 text-center shadow-soft">
              <Check className="mx-auto size-8 text-copper" strokeWidth={1.6} />
              <h3 className="mt-5 text-2xl text-foreground">Vielen Dank für Ihre Anfrage!</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Wir haben Ihre Bestellung erhalten und melden uns in den nächsten Tagen persönlich
                bei Ihnen. Die Zahlung erfolgt via Twint oder bar vor Ort.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-8 rounded-sm border border-foreground/20 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-foreground transition-colors duration-300 hover:border-copper hover:text-copper"
              >
                Weitere Bestellung
              </button>
            </div>
          ) : (
            <form
              className="mt-12 space-y-6 rounded-sm border border-border bg-background px-6 py-8 shadow-soft md:px-10 md:py-10"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Vor- und Nachname"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="email">
                    E-Mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="name@beispiel.ch"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="address">
                  Adresse
                </label>
                <input
                  id="address"
                  name="address"
                  required
                  autoComplete="street-address"
                  placeholder="Strasse, PLZ, Ort"
                  className={fieldClass}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <span className={labelClass}>Anzahl Gläser (250 g)</span>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Anzahl verringern"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="rounded-sm border border-input p-3 text-foreground transition-colors duration-200 hover:border-copper hover:text-copper"
                    >
                      <Minus className="size-4" />
                    </button>
                    <input
                      name="quantity"
                      type="number"
                      min={1}
                      max={99}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                      className="w-20 rounded-sm border border-input bg-background px-3 py-3 text-center text-sm text-foreground outline-none focus:border-copper"
                    />
                    <button
                      type="button"
                      aria-label="Anzahl erhöhen"
                      onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                      className="rounded-sm border border-input p-3 text-foreground transition-colors duration-200 hover:border-copper hover:text-copper"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <span className={labelClass}>Abholung oder Lieferung</span>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {(
                      [
                        { value: "markt", label: "Abholung am Markt" },
                        { value: "lieferung", label: "Lieferung" },
                      ] as const
                    ).map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setDelivery(option.value)}
                        aria-pressed={delivery === option.value}
                        className={`rounded-sm border px-4 py-3 text-xs font-semibold transition-colors duration-200 ${
                          delivery === option.value
                            ? "border-copper bg-copper/10 text-foreground"
                            : "border-input text-muted-foreground hover:border-copper/60"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                    <input type="hidden" name="delivery" value={delivery} />
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="notes">
                  Bemerkungen
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  placeholder="Wunschmarkt, Abholzeit, Fragen …"
                  className={fieldClass}
                />
              </div>

              <p className="text-xs leading-relaxed text-muted-foreground">
                Zahlung bequem via Twint oder Bar vor Ort / nach Absprache. Diese Anfrage ist noch
                keine verbindliche Bestellung – wir bestätigen sie persönlich.
              </p>

              <button
                type="submit"
                className="w-full rounded-sm bg-primary px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground transition-colors duration-300 hover:bg-accent"
              >
                Bestellung anfragen
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
