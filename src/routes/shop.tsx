import { createFileRoute } from "@tanstack/react-router";
import { Check, Flame, Minus, Plus, ShieldCheck, Wallet } from "lucide-react";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { SectionHeading } from "../components/site/SectionHeading";
import jarImage from "../assets/tallow-jar.jpg";
import {
  defaultJarId,
  findJar,
  jars,
  jarOfferLine,
  totalChf,
  totalWeightG,
  type JarId,
} from "../lib/product";


export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Bratfein Schweizer Speisefett in zwei Grössen bestellen" },
      {
        name: "description",
        content:
          "Bratfein Schweizer Speisefett bestellen: 330-ml-Glas (275 g) für 12 CHF oder 205-ml-Glas (165 g) für 9 CHF. Abholung am Markt oder Lieferung nach Absprache, Zahlung via Twint, Karte oder bar.",
      },
      {
        property: "og:title",
        content: "Shop — Bratfein Schweizer Speisefett in zwei Grössen bestellen",
      },
      {
        property: "og:description",
        content:
          "Bestellung anfragen: Schweizer Speisefett aus Zürich in zwei Grössen – 330 ml (275 g) für 12 CHF, 205 ml (165 g) für 9 CHF.",
      },
      { property: "og:type", content: "product" },
      { property: "og:url", content: "https://bratfein.lovable.app/shop" },
      { property: "og:image", content: "https://bratfein.lovable.app/og-bratfein.jpg" },
      { name: "twitter:image", content: "https://bratfein.lovable.app/og-bratfein.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://bratfein.lovable.app/shop" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Bratfein Schweizer Speisefett",
          description:
            "Reines Schweizer Speisefett aus Nierenfett vom Rind, bezogen von einer Zürcher Metzgerei, schonend ausgelassen, zweifach filtriert und von Hand in neutrale Gläser abgefüllt.",
          brand: { "@type": "Brand", name: "Bratfein" },
          category: "Speisefett",
          hasVariant: jars.map((jar) => ({
            "@type": "Product",
            name: `Bratfein Schweizer Speisefett ${jar.label}`,
            weight: { "@type": "QuantitativeValue", value: jar.weightG, unitCode: "GRM" },
          })),
          offers: jars.map((jar) => ({
            "@type": "Offer",
            name: jar.label,
            priceCurrency: "CHF",
            price: String(jar.priceChf),
            availability: "https://schema.org/InStock",
            url: "https://bratfein.lovable.app/shop",
          })),
        }),
      },
    ],
  }),
  component: Shop,
});

const ORDER_EMAIL = "bratfein.zh@gmail.com";

const highlights = [
  "Reines Schweizer Speisefett, zweifach filtriert",
  "Aus Schweizer Nierenfett vom Rind von einer Metzgerei in Zürich",
  "Neutrale Gläser in zwei Grössen, wiederverwendbar",
  "Hoher Rauchpunkt für Steak, Rösti und Gemüse",
];

const fieldClass =
  "mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/70 focus:border-copper";
const labelClass = "block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground";

const deliveryOptions = [
  { value: "bassersdorf", label: "Abholung Markt Bassersdorf (5. Dezember)" },
  { value: "wallisellen", label: "Abholung Markt Wallisellen (10. Dezember)" },
  { value: "lieferung", label: "Lieferung / Übergabe nach Absprache" },
] as const;

const productDetails = [
  { icon: ShieldCheck, text: "100% reines Speisefett aus Zürich" },
  { icon: Check, text: "Ohne Konservierungsstoffe" },
  { icon: Flame, text: "Hohe Hitzebeständigkeit bis ca. 250 °C" },
];

function Shop() {
  const [jar, setJar] = useState<JarId>(defaultJarId);
  const [quantity, setQuantity] = useState(1);
  const [delivery, setDelivery] = useState<string>("bassersdorf");
  const [sent, setSent] = useState(false);

  const selectedJar = findJar(jar) ?? jars[0];
  const total = totalChf(jar, quantity);
  const selectedDelivery = deliveryOptions.find((o) => o.value === delivery)?.label ?? delivery;

  return (
    <>
      {/* Product showcase */}
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-14 md:px-8 md:pt-20">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <img
            src={jarImage}
            alt="Bratfein Schweizer Speisefett im neutralen Glas"
            width={1200}
            height={1200}
            className="w-full rounded-sm object-cover shadow-lift"
          />
          <div>
            <p className="eyebrow">Bratfein · Schweizer Speisefett</p>
            <h1 className="mt-4 text-4xl leading-tight text-foreground md:text-5xl">
              Schweizer Speisefett in zwei Grössen
            </h1>
            <hr className="copper-rule mt-6" />
            <p className="mt-6 font-serif text-3xl text-copper">{selectedJar.priceLabel}</p>
            <p className="mt-1 text-sm text-muted-foreground">für das {selectedJar.label}</p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              Schonend ausgelassen, von Hand abgefüllt. Kühl und dunkel gelagert monatelang haltbar.
            </p>

            {/* Size chooser */}
            <div className="mt-8">
              <span className={labelClass}>Grösse wählen</span>
              <div
                className="mt-3 grid gap-3 sm:grid-cols-2"
                role="radiogroup"
                aria-label="Grösse wählen"
              >
                {jars.map((option) => {
                  const active = option.id === jar;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setJar(option.id)}
                      className={cn(
                        "rounded-sm border px-4 py-4 text-left transition-colors duration-200",
                        active
                          ? "border-copper bg-cream"
                          : "border-input hover:border-copper hover:bg-cream/60",
                      )}
                    >
                      <span className="block font-serif text-lg text-foreground">
                        {option.volumeMl} ml
                      </span>
                      <span className="mt-1 block text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        {option.weightG} g
                      </span>
                      <span
                        className={cn(
                          "mt-2 block text-sm font-bold",
                          active ? "text-copper" : "text-foreground",
                        )}
                      >
                        {option.priceLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <ul className="mt-8 space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-copper" strokeWidth={2} />
                  {h}
                </li>
              ))}
            </ul>

            {/* Product details box */}
            <div className="mt-8 gilded rounded-sm bg-cream px-5 py-5">
              <p className="eyebrow">Produkteigenschaften</p>
              <ul className="mt-4 space-y-3">
                {productDetails.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-sm text-foreground">
                    <Icon className="mt-0.5 size-4 shrink-0 text-copper" strokeWidth={2} />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex items-start gap-3 rounded-sm bg-cream px-5 py-4">
              <Wallet className="mt-0.5 size-5 shrink-0 text-copper" strokeWidth={1.6} />
              <p className="text-sm text-muted-foreground">Zahlung via Twint, Karte oder bar.</p>
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
            lead={`Füllen Sie das Formular aus – wir melden uns per E-Mail mit der Bestätigung und den Details zur Abholung oder Lieferung. Zur Wahl stehen ${jarOfferLine}.`}
            align="center"
          />

          {sent ? (
            <div className="mt-12 rounded-sm border border-copper/40 bg-background px-7 py-12 text-center shadow-soft">
              <Check className="mx-auto size-8 text-copper" strokeWidth={1.6} />
              <h2 className="mt-5 text-2xl text-foreground">E-Mail-Programm geöffnet</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Die fertige Bestellanfrage liegt in Ihrem E-Mail-Programm bereit. Übermittelt wird
                sie erst, wenn Sie die E-Mail dort selbst absenden – bitte schicken Sie sie einmal
                ab, damit wir sie erhalten. Falls sich nichts geöffnet hat, schreiben Sie uns
                direkt an{" "}
                <a className="text-copper underline" href={`mailto:${ORDER_EMAIL}`}>
                  {ORDER_EMAIL}
                </a>
                . Die Zahlung erfolgt via Twint, Karte oder bar.
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
              className="mt-12 space-y-6 gilded rounded-sm bg-card px-6 py-8 md:px-10 md:py-10"
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const body = [
                  `Name: ${data.get("name") ?? ""}`,
                  `E-Mail: ${data.get("email") ?? ""}`,
                  `Adresse: ${data.get("address") ?? ""}`,
                  `Grösse: ${selectedJar.label}`,
                  `Anzahl Gläser: ${quantity}`,
                  `Total: ${total} CHF`,
                  `Abholung/Lieferung: ${selectedDelivery}`,
                  `Bemerkungen: ${data.get("notes") ?? ""}`,
                ].join("\n");
                window.location.href = `mailto:${ORDER_EMAIL}?subject=${encodeURIComponent(
                  "Bestellung Bratfein Schweizer Speisefett",
                )}&body=${encodeURIComponent(body)}`;
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
                  <label className={labelClass} htmlFor="jar">
                    Grösse
                  </label>
                  <Select
                    value={jar}
                    onValueChange={(value) => setJar(value as JarId)}
                    name="jar"
                  >
                    <SelectTrigger
                      id="jar"
                      className="mt-2 h-auto rounded-sm border-input bg-background px-4 py-3 text-sm text-foreground focus:ring-copper"
                    >
                      <SelectValue placeholder="Grösse wählen" />
                    </SelectTrigger>
                    <SelectContent className="rounded-sm border-border bg-popover text-popover-foreground">
                      {jars.map((option) => (
                        <SelectItem
                          key={option.id}
                          value={option.id}
                          className="cursor-pointer py-3 text-sm focus:bg-accent focus:text-accent-foreground"
                        >
                          {option.label} – {option.priceLabel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <span className={labelClass}>Anzahl Gläser</span>
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
                      aria-label="Anzahl Gläser"
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
                  <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">
                    Total: <span className="font-semibold text-foreground">{total} CHF</span>
                  </p>
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="delivery">
                  Abholung / Lieferung
                </label>
                <Select value={delivery} onValueChange={setDelivery} name="delivery">
                  <SelectTrigger
                    id="delivery"
                    className="mt-2 h-auto rounded-sm border-input bg-background px-4 py-3 text-sm text-foreground focus:ring-copper"
                  >
                    <SelectValue placeholder="Abholung / Lieferung wählen" />
                  </SelectTrigger>
                  <SelectContent className="rounded-sm border-border bg-popover text-popover-foreground">
                    {deliveryOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="cursor-pointer py-3 text-sm focus:bg-accent focus:text-accent-foreground"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                Zahlung via Twint, Karte oder bar. Diese Anfrage ist noch keine verbindliche
                Bestellung – wir bestätigen sie persönlich. Beim Absenden öffnet sich Ihr
                E-Mail-Programm mit der fertigen Anfrage; übermittelt wird sie erst, wenn Sie die
                E-Mail selbst abschicken.
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
