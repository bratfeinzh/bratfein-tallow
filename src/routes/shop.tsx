import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Flame, Leaf, Minus, Plus, ShieldCheck, Wallet } from "lucide-react";
import { useRef, useState } from "react";
import { z } from "zod";

import { supabase } from "@/integrations/supabase/client";

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
  pricePer100gLabel,
  totalChf,
  totalWeightG,
  type JarId,
} from "../lib/product";


export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Bratfein Rindertalg-Speisefett in zwei Grössen bestellen" },
      {
        name: "description",
        content:
          "Bratfein Rindertalg-Speisefett bestellen: 330-ml-Glas (275 g) für 12 CHF oder 205-ml-Glas (165 g) für 9 CHF. Abholung am Marktstand oder Lieferung, Zahlung via Twint, Karte oder bar.",
      },
      {
        property: "og:title",
        content: "Shop — Bratfein Rindertalg-Speisefett in zwei Grössen bestellen",
      },
      {
        property: "og:description",
        content:
          "Bestellung anfragen: Rindertalg-Speisefett, in Zürich ausgelassen und abgefüllt, in zwei Grössen – 330 ml (275 g) für 12 CHF, 205 ml (165 g) für 9 CHF.",
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
            "Speisefett aus Schweizer Rindernierenfett, in Zürich in kleinen Chargen schonend ausgelassen, filtriert und von Hand in neutrale Gläser abgefüllt.",
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
  "Speisefett aus Schweizer Rindernierenfett, in Zürich ausgelassen und abgefüllt",
  "Upcycling von Schweizer Rindernierenfett",
  "Neutrale Gläser in zwei Grössen, wiederverwendbar",
  "Hoher Rauchpunkt für Steak, Rösti und Gemüse",
];

const fieldClass =
  "mt-2 w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted-foreground/70 focus:border-copper";
const labelClass = "block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground";

const deliveryOptions = [
  { value: "zollikon", label: "Marktstand Zollikon (29. November 2026)" },
  { value: "bassersdorf", label: "Marktstand Bassersdorf (5. Dezember 2026)" },
  { value: "wallisellen", label: "Marktstand Wallisellen (10. Dezember 2026)" },
  { value: "lieferung", label: "Lieferung" },
] as const;

const orderSchema = z.object({
  name: z.string().trim().min(1, "Bitte geben Sie Ihren Namen an.").max(100, "Der Name ist zu lang."),
  email: z.string().trim().min(1, "Bitte geben Sie Ihre E-Mail-Adresse an.").email("Bitte geben Sie eine gültige E-Mail-Adresse an.").max(255),
  address: z.string().trim().max(300, "Die Adresse ist zu lang."),
  notes: z.string().trim().max(1000, "Die Bemerkungen sind zu lang."),
  quantity: z.number().int().min(1, "Bitte bestellen Sie mindestens 1 Glas.").max(99),
  delivery: z.enum(["zollikon", "bassersdorf", "wallisellen", "lieferung"], {
    message: "Bitte wählen Sie Abholung oder Lieferung.",
  }),
});

const productDetails = [
  { icon: ShieldCheck, text: "100% reines Rindertalg-Speisefett aus Zürich" },
  { icon: Check, text: "Ohne Konservierungsstoffe" },
  { icon: Flame, text: "Hohe Hitzebeständigkeit (Rauchpunkt ca. 200–220 °C)" },
];

function Shop() {
  const [jar, setJar] = useState<JarId>(defaultJarId);
  const [quantity, setQuantity] = useState(1);
  const [delivery, setDelivery] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isDelivery = delivery === "lieferung";

  const selectedJar = findJar(jar) ?? jars[0];
  const total = totalChf(jar, quantity);


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
              Schonend in kleinen Chargen ausgelassen, filtriert und von Hand abgefüllt. Das genaue Mindesthaltbarkeitsdatum steht auf dem Glas.
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
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {pricePer100gLabel(option)}
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

            <div id="lieferung-zahlung" className="mt-8 flex items-start gap-3 rounded-sm bg-cream px-5 py-4">
              <Wallet className="mt-0.5 size-5 shrink-0 text-copper" strokeWidth={1.6} />
              <div>
                <p className="eyebrow">Lieferung &amp; Zahlung</p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>
                    <span className="font-semibold text-foreground">Abholung am Marktstand:</span> kostenlos
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Lieferung:</span> (Preis und Lieferzeit nach Absprache)
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Zahlung via</span> Twint, Karte oder Bar
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-sm bg-cream px-5 py-4">
              <Leaf className="mt-0.5 size-5 shrink-0 text-copper" strokeWidth={1.6} />
              <div>
                <p className="eyebrow">Zutaten &amp; Lagerung</p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>
                    <span className="font-semibold text-foreground">Zutaten:</span> 100 % Rindernierenfett
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Lagerung:</span> [kühl und dunkel]
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Haltbarkeit:</span> ungeöffnet haltbar ca. [X Monate], geöffnet [Y Monate]
                  </li>
                  <li>Das genaue MHD steht auf dem Glas.</li>
                </ul>
              </div>
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

          <form
            ref={formRef}
            noValidate
            className="mt-12 space-y-6 gilded rounded-sm bg-card px-6 py-8 md:px-10 md:py-10"
            onSubmit={async (e) => {
              e.preventDefault();
              setStatus(null);
              const data = new FormData(e.currentTarget);
              const parsed = orderSchema.safeParse({
                name: data.get("name") ?? "",
                email: data.get("email") ?? "",
                address: isDelivery ? (data.get("address") ?? "") : "",
                notes: data.get("notes") ?? "",
                quantity,
                delivery,
              });
              if (!parsed.success) {
                setStatus({ ok: false, msg: parsed.error.issues[0]?.message ?? "Bitte prüfen Sie Ihre Angaben." });
                return;
              }
              if (isDelivery && !parsed.data.address) {
                setStatus({ ok: false, msg: "Bitte geben Sie für die Lieferung Ihre Adresse an." });
                return;
              }
              setBusy(true);
              const { error } = await supabase.from("orders").insert({
                name: parsed.data.name,
                email: parsed.data.email,
                address: isDelivery ? parsed.data.address : null,
                jar_size: jar,
                quantity: parsed.data.quantity,
                delivery: parsed.data.delivery,
                notes: parsed.data.notes || null,
              });
              setBusy(false);
              if (error) {
                setStatus({ ok: false, msg: `Die Anfrage konnte leider nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie an ${ORDER_EMAIL}.` });
                return;
              }
              formRef.current?.reset();
              setQuantity(1);
              setDelivery("");
              setJar(defaultJarId);
              setStatus({ ok: true, msg: "Danke! Ihre Anfrage ist bei uns eingegangen. Wir bestätigen sie persönlich per E-Mail." });
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
                {isDelivery && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Details siehe{" "}
                    <a href="#lieferung-zahlung" className="text-copper underline">
                      Lieferung &amp; Zahlung
                    </a>
                    .
                  </p>
                )}
              </div>

              {isDelivery && (
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
              )}

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
                Diese Anfrage ist noch keine verbindliche Bestellung – wir bestätigen sie persönlich.
              </p>

              {status && (
                <p
                  role={status.ok ? "status" : "alert"}
                  className={cn(
                    "rounded-sm border px-4 py-3 text-sm",
                    status.ok ? "border-copper/40 bg-background text-foreground" : "border-destructive/50 text-destructive",
                  )}
                >
                  {status.msg}
                </p>
              )}

              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-sm bg-primary px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground transition-colors duration-300 hover:bg-accent"
              >
                {busy ? "Wird gesendet …" : "Bestellung anfragen"}
              </button>
              <p className="text-center text-xs leading-relaxed text-muted-foreground">
                Wir melden uns innert 48 Stunden per E-Mail mit der Bestätigung.
              </p>
              <p className="text-center text-xs leading-relaxed text-muted-foreground">
                Mit dem Absenden akzeptieren Sie die <Link to="/agb" className="text-copper underline underline-offset-4">AGB</Link>.
              </p>
            </form>
        </div>
      </section>
    </>
  );
}
