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
      { title: "Bratfein — Schweizer Rinderfett als hochwertiges Kochfett" },
      {
        name: "description",
        content:
          "Bratfein ist reines Schweizer Rinderfett aus Zürich. Hoher Rauchpunkt, herzhafter Geschmack, regionales Upcycling — das natürliche Fett für unvergleichlichen Geschmack.",
      },
      { property: "og:title", content: "Bratfein — Schweizer Rinderfett als hochwertiges Kochfett" },
      {
        property: "og:description",
        content: "Das natürliche Fett für unvergleichlichen Geschmack. Regional, nachhaltig, aus Zürich.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const comparison = [
  {
    label: "Geschmack",
    fett: "Herzhaft, fein-würzig und aromatisch",
    seed: "Neutral bis leicht eigenartig bei hoher Hitze",
  },
  {
    label: "Rauchpunkt",
    fett: "Sehr hoch (ca. 200 °C bis 250 °C), ideal zum scharfen Anbraten",
    seed: "Ca. 100 °C bis 220 °C (je nach Raffination)",
  },
  {
    label: "Verarbeitung",
    fett: "Naturprodukt aus regionalem Schweizer Upcycling",
    seed: "Oft stark industriell verarbeitet",
  },
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-14 md:px-8 md:pb-28 md:pt-20">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="fade-up">
            <p className="eyebrow">Schweizer Rinderfett</p>
            <h1 className="mt-5 text-4xl leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
              Bratfein — Fein in der Pfanne, gross im Geschmack.
            </h1>
            <p className="mt-6 text-xl leading-snug text-muted-foreground sm:text-2xl">
              Schweizer Rinderfett aus regionaler Zürcher Herkunft. Die natürliche, hitzebeständige Alternative für das perfekte Steak.
            </p>
            <hr className="copper-rule mt-7" />
            <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground">
              Reines Schweizer Rinderfett aus Zürich – herzhaft, hitzestabil und regional. Die natürliche Alternative zu industriellen Speiseölen.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:bratfein.zh@gmail.com?subject=Bestellung%20Bratfein%20Schweizer%20Rinderfett"
                className="inline-flex items-center justify-center rounded-sm bg-primary px-7 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground transition-colors duration-300 hover:bg-accent"
              >
                Jetzt bestellen
              </a>
            </div>
          </div>

          <Reveal delay={150} className="relative">
            <div className="surface-walnut grain-overlay absolute -inset-3 rounded-sm opacity-[0.08]" />
            <img
              src={jarImage}
              alt="Bratfein Schweizer Rinderfett im 250-Gramm-Glas auf einem Nussholzbrett"
              width={1200}
              height={1200}
              className="relative w-full rounded-sm object-cover shadow-lift"
            />
            <div className="absolute bottom-4 left-4 rounded-sm bg-background/92 px-4 py-3 shadow-soft backdrop-blur">
              <p className="eyebrow">Produkt</p>
              <p className="mt-1 font-serif text-lg text-foreground">250 g Schweizer Rinderfett</p>
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
              In der konventionellen Fleischverarbeitung wird wertvolles Nierenfett häufig schlicht entsorgt und wird verschwendet. Dabei handelt es sich um ein erstklassiges, nährstoffreiches Naturprodukt. Wir wirken dieser Verschwendung entgegen: Durch gezieltes Upcycling verwandeln wir dieses ungenutzte Fett in hochqualitatives Schweizer Rinderfett für die Küche.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Product benefits comparison */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28" aria-labelledby="vergleich">
        <Reveal className="text-center">
          <h2 id="vergleich" className="text-3xl leading-tight text-foreground sm:text-4xl md:text-5xl">
            Warum Schweizer Rinderfett?
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
              <h3 className="font-serif text-2xl text-foreground md:text-3xl">Bratfein</h3>
            </div>
            <ul className="flex flex-1 flex-col gap-4">
              {[
                "Rauchpunkt bis ca. 250 °C (bratstabil)",
                "100% natürliches Upcycling aus Zürich",
                "Reines Naturprodukt ",
                "Herzhafter, fein-würziger Geschmack",
                "Keine industrielle Raffination",
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
              <h3 className="font-serif text-2xl text-foreground md:text-3xl">Herkömmliches Speiseöl</h3>
            </div>
            <ul className="flex flex-1 flex-col gap-4">
              {[
                "Tieferer Rauchpunkt, oxidiert schnell bei Hitze",
                "Industrielle Extraktion mit Lösungsmitteln",
                "Mehrfach raffiniert, gebleicht und desodoriert",
                "Neutraler bis flacher Geschmack, kann bitter werden",
                "Stark industriell verarbeitetes Produkt",
              ].map((item, i) => (
                <Reveal as="li" key={item} delay={100 + i * 90} className="flex items-start gap-3">
                  <X className="mt-0.5 size-5 shrink-0 text-rose-400" strokeWidth={2.5} />
                  <span className="text-base leading-snug text-muted-foreground">{item}</span>
                </Reveal>
              ))}
            </ul>
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
              250 g für 9 CHF. Abholung an unseren Marktständen oder Lieferung nach Absprache.
            </p>
            <a
              href="mailto:bratfein.zh@gmail.com?subject=Bestellung%20Bratfein%20Schweizer%20Rinderfett"
              className="mt-9 inline-flex items-center justify-center rounded-sm bg-copper px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-accent-foreground transition-opacity duration-300 hover:opacity-90"
            >
              Jetzt bestellen
            </a>
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
                Vorstellung unseres Teams: Wer wir sind, was wir machen und wofür wir stehen (Schülerunternehmen im Rahmen von YES / Young Enterprise Switzerland).
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
                  q: "Wie lange ist das Schweizer Rinderfett haltbar?",
                  a: "Bei kühl und dunkel gelagert hält sich unser Rinderfett problemlos mehrere Monate. Im Kühlschrank verlängert sich die Haltbarkeit weiter. Wichtig ist, dass das Glas trocken und vor direkter Sonneneinstrahlung geschützt steht.",
                },
                {
                  q: "Muss das Glas im Kühlschrank gelagert werden?",
                  a: "Nein, das ist nicht zwingend nötig. Rinderfett ist bei Raumtemperatur fest und haltbar. Wer es jedoch sehr lange lagern möchte, kann das Glas im Kühlschrank aufbewahren. Vor Gebrauch kurz antrocknen lassen, damit es sich leichter portionieren lässt.",
                },
                {
                  q: "Wie verwende ich es am besten beim Anbraten von Fleisch?",
                  a: "Erhitze eine pfannengeeignete Menge Rinderfett bei mittlerer bis hoher Hitze, bis es schmilzt und leicht duftet. Dann das Fleisch hineingeben und wie gewohnt scharf anbraten. Dank des hohen Rauchpunkts bis ca. 250 °C entsteht kaum bitterer Geschmack.",
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
