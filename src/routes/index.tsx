import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, X } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "../components/site/Reveal";
import { SectionHeading } from "../components/site/SectionHeading";
import jarImage from "../assets/tallow-jar.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bratfein – Rindertalg-Speisefett aus Zürich" },
      {
        name: "description",
        content:
          "Bratfein: hitzebeständiges Speisefett aus Rindertalg, in Zürich ausgelassen und abgefüllt. 330 ml (275 g) für 12 CHF oder 205 ml (165 g) für 9 CHF.",
      },
      { property: "og:title", content: "Bratfein — Rindertalg-Speisefett für Steak, Rösti und Gemüse" },
      {
        property: "og:description",
        content:
          "Bratfein: Speisefett aus Schweizer Rindernierenfett, in Zürich ausgelassen und abgefüllt. Hitzebeständiges Bratfett für Steak, Rösti und Gemüse – in 330 ml (275 g) oder 205 ml (165 g).",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bratfein.lovable.app/" },
      { property: "og:image", content: "https://bratfein.lovable.app/og-bratfein.jpg" },
      { name: "twitter:image", content: "https://bratfein.lovable.app/og-bratfein.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://bratfein.lovable.app/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-14 md:px-8 md:pb-28 md:pt-20">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="fade-up">
            <p className="eyebrow">Schweizer Speisefett</p>
            <h1 className="mt-5 text-4xl leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
              Bratfein — Fein in der Pfanne, gross im Geschmack.
            </h1>
            <p className="mt-6 text-xl leading-snug text-muted-foreground sm:text-2xl">
              Speisefett aus Schweizer Rindernierenfett – von einem Schlachthof in Hinwil. Hitzebeständiges Bratfett für Steak, Rösti und Gemüse.
            </p>
            <hr className="copper-rule mt-7" />
            <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground">
              Speisefett aus Schweizer Rindernierenfett, in Zürich ausgelassen und abgefüllt – herzhaft und fein-würzig.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center rounded-sm bg-primary px-7 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground transition-colors duration-300 hover:bg-accent"
              >
                Jetzt bestellen
              </Link>
            </div>
          </div>

          <Reveal delay={150} className="relative">
            <div className="surface-walnut grain-overlay absolute -inset-3 rounded-sm opacity-[0.08]" />
            <img
              src={jarImage}
              alt="Bratfein Schweizer Speisefett im neutralen Glas auf einem Nussholzbrett"
              width={1200}
              height={1200}
              className="relative w-full rounded-sm object-cover shadow-lift"
            />
            <div className="absolute bottom-4 left-4 rounded-sm bg-background/92 px-4 py-3 shadow-soft backdrop-blur">
              <p className="eyebrow">Produkt</p>
              <p className="mt-1 font-serif text-lg text-foreground">Schweizer Speisefett: 330 ml / 205 ml</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Problem / Story */}
      <section className="border-y border-border bg-cream/60" aria-labelledby="problem">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="Warum wir das tun"
              title="Vom Nebenprodukt zum Küchenliebling"
            />
          </Reveal>
          <Reveal delay={120} className="mt-12 max-w-3xl">
            <p className="text-lg leading-relaxed text-foreground md:text-xl">
              In der konventionellen Fleischverarbeitung wird wertvolles Nierenfett häufig schlicht entsorgt und damit verschwendet. Dabei handelt es sich um ein wertvolles Naturprodukt. Wir wirken dieser Verschwendung entgegen: Durch gezieltes Upcycling verwandeln wir dieses ungenutzte Fett in feines Schweizer Speisefett für die Küche.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Product benefits comparison */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28" aria-labelledby="vergleich">
        <Reveal className="text-center">
          <h2 id="vergleich" className="text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl">
            Warum Rindertalg zum Braten?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Die Vorteile auf einen Blick.
          </p>
          <hr className="copper-rule mx-auto mt-6" />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 md:gap-8">
          {/* Bratfein card */}
          <Reveal className="gilded flex flex-col rounded-xl bg-background p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-block size-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px] shadow-emerald-500/40" aria-hidden="true" />
              <h2 className="font-serif text-2xl text-foreground md:text-3xl">Bratfein (Rindertalg)</h2>
            </div>
            <ul className="flex flex-1 flex-col gap-4">
              {[
                "Hitzestabil zum Braten (Rauchpunkt je nach Quelle ca. 200–250 °C)",
                "Herzhafter, fein-würziger Eigengeschmack",
                "Schonend in kleinen Chargen ausgelassen und filtriert",
                "Aus Schweizer Rindernierenfett, das sonst oft ungenutzt bleibt",
                "Ohne Konservierungsstoffe",
              ].map((item, i) => (
                <Reveal as="li" key={item} delay={100 + i * 90} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-emerald-400" strokeWidth={2.5} />
                  <span className="text-base leading-snug text-foreground">{item}</span>
                </Reveal>
              ))}
            </ul>
          </Reveal>

          {/* Conventional oil card */}
          <Reveal delay={150} className="gilded flex flex-col rounded-xl bg-background p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <h2 className="font-serif text-2xl text-foreground md:text-3xl">Raffinierte Pflanzenöle (z. B. Sonnenblumen-, Rapsöl)</h2>
            </div>
            <ul className="flex flex-1 flex-col gap-4">
              {[
                "Ebenfalls zum Braten geeignet",
                "Neutraler Geschmack",
                "Meist industriell raffiniert",
                "Pflanzliche Alternative",
              ].map((item, i) => (
                <Reveal as="li" key={item} delay={100 + i * 90} className="flex items-start gap-3">
                  <X className="mt-0.5 size-5 shrink-0 text-rose-400" strokeWidth={2.5} />
                  <span className="text-base leading-snug text-muted-foreground">{item}</span>
                </Reveal>
              ))}
            </ul>
          </Reveal>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">Rauchpunkte variieren je nach Herstellung und Quelle.</p>
        <p className="mt-1 text-xs text-muted-foreground/80">Quellen: [wird ergänzt]</p>
      </section>

      {/* Upcycling in Zahlen */}
      <section className="border-y border-border bg-cream/60" aria-labelledby="upcycling-zahlen">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center md:px-8 md:py-28">
          <Reveal>
            <p className="eyebrow">Nachhaltigkeit</p>
            <h2 id="upcycling-zahlen" className="mt-4 text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl">
              Upcycling in Zahlen
            </h2>
            <hr className="copper-rule mx-auto mt-6" />
          </Reveal>
          <Reveal delay={120}>
            <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-foreground md:text-xl">
              Bisher haben wir 70 kg Nierenfett vor der Entsorgung bewahrt.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="surface-walnut grain-overlay rounded-sm px-6 py-16 text-center md:px-16 md:py-20">
          <div className="relative z-10">
            <p className="eyebrow">Bratfein bestellen</p>
            <h2 className="mx-auto mt-4 max-w-xl text-3xl leading-tight md:text-4xl">
              Ein Glas, das jedes Steak besser macht.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm text-walnut-foreground/70">
              330 ml (275 g) für 12 CHF, 205 ml (165 g) für 9 CHF. Abholung an unseren Marktständen oder Lieferung – Details unter «Lieferung &amp; Zahlung» im Shop.
            </p>
            <Link
              to="/shop"
              className="mt-9 inline-flex items-center justify-center rounded-sm bg-copper px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-accent-foreground transition-opacity duration-300 hover:opacity-90"
            >
              Jetzt bestellen
            </Link>
          </div>
        </Reveal>
      </section>

      {/* About us / Team */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Über uns"
              title="Jugendunternehmen mit Überzeugung"
            />
          </Reveal>
          <div className="space-y-6">
            <Reveal delay={100}>
              <p className="text-lg leading-relaxed text-foreground">
                Wir sind sieben Schülerinnen und Schüler, die Bratfein im Rahmen von YES (Young Enterprise Switzerland) gegründet haben – mit dem Ziel, regionale Ressourcen wertzuschätzen.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="text-base leading-relaxed text-muted-foreground">
                Wir sind sieben Schweizer Gymnasiastinnen und Gymnasiasten, die im YES-Programm ein echtes Unternehmen aufbauen – von der Idee über die Kalkulation bis zum Marktstand. Unser Ziel: regionale Ressourcen wertschätzen und euch zeigen, wie gut Nachhaltigkeit schmecken kann.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <Link
                to="/ueber-uns"
                className="inline-flex items-center justify-center rounded-sm border border-foreground/20 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-foreground transition-colors duration-300 hover:border-copper hover:text-copper"
              >
                Team kennenlernen
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-border bg-cream/60" aria-labelledby="faq">
        <div className="mx-auto max-w-3xl px-5 py-20 md:px-8 md:py-28">
          <Reveal className="text-center">
            <p className="eyebrow">Fragen & Antworten</p>
            <h2 id="faq" className="mt-4 text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl">
              Häufig gestellte Fragen
            </h2>
            <hr className="copper-rule mx-auto mt-6" />
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <Accordion type="single" collapsible className="gilded rounded-sm bg-card px-5 md:px-8">
              {[
                {
                  q: "Wie lange ist das Schweizer Speisefett haltbar?",
                  a: "Ungeöffnet und kühl und dunkel gelagert mehrere Monate. Das genaue Mindesthaltbarkeitsdatum steht auf dem Glas.",
                },
                {
                  q: "Muss das Glas im Kühlschrank gelagert werden?",
                  a: "Nicht zwingend. Kühl und dunkel gelagert reicht. Im Kühlschrank hält es länger.",
                },
                {
                  q: "Wie verwende ich es am besten beim Anbraten von Fleisch?",
                  a: "Pfanne auf mittlere bis hohe Hitze erhitzen, einen Teelöffel Bratfein hineingeben und schmelzen lassen, dann Fleisch, Rösti oder Gemüse braten.",
                },
                {
                  q: "Woher kommt das Fett?",
                  a: "Das Nierenfett stammt von einem Schlachthof in Hinwil. Wir lassen es in kleinen Chargen aus und filtrieren es.",
                },
              ].map((item, i) => (
                <AccordionItem key={item.q} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>
    </>
  );
}
