import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Clock, MapPin } from "lucide-react";

import { SectionHeading } from "../components/site/SectionHeading";
import { markets } from "../lib/markets";

const preorderMailto =
  "mailto:bratfein.zh@gmail.com?subject=Vorbestellung%20Markt";

export const Route = createFileRoute("/standorte")({
  head: () => ({
    meta: [
      { title: "Standorte & Märkte — Bratfein Schweizer Speisefett" },
      {
        name: "description",
        content:
          "Alle Märkte und Verkaufsstandorte, an denen Bratfein Schweizer Speisefett im 250-g-Glas erhältlich ist – in und um Zürich.",
      },
      { property: "og:title", content: "Standorte & Märkte — Bratfein" },
      {
        property: "og:description",
        content: "Unsere Marktstände in und um Zürich – Termine, Zeiten und Orte auf einen Blick.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bratfein.lovable.app/standorte" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://bratfein.lovable.app/standorte" }],
    scripts: markets.map((m) => ({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Event",
        name: `Bratfein am ${m.place}`,
        startDate: m.start,
        ...(m.end ? { endDate: m.end } : {}),
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: m.location,
          address: { "@type": "PostalAddress", addressLocality: m.city, addressCountry: "CH" },
        },
        organizer: {
          "@type": "Organization",
          name: "Bratfein",
          url: "https://bratfein.lovable.app",
        },
        description: `Bratfein Schweizer Speisefett im 250-g-Glas am ${m.place}, ${m.date}, ${m.time}.`,
      }),
    })),
  }),
  component: Standorte,
});

function Standorte() {
  return (
    <section className="mx-auto max-w-5xl px-5 pb-24 pt-14 md:px-8 md:pt-20">
      <SectionHeading
        as="h1"
        eyebrow="Standorte"
        title="Märkte & Verkaufsstandorte in und um Zürich"
        lead="Kommen Sie vorbei, probieren Sie und nehmen Sie ein Glas gleich mit. Bezahlung via Twint, Karte oder bar vor Ort."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {markets.map((m) => (
          <article
            key={m.place}
            className="group flex flex-col overflow-hidden gilded rounded-sm bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
          >
            <div className="surface-walnut grain-overlay flex items-center justify-between px-6 py-4">
              <span className="relative z-10 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-copper-soft">
                Marktstand
              </span>
              <span className="relative z-10 text-xs text-walnut-foreground/60">Stand Bratfein</span>
            </div>
            <div className="flex flex-1 flex-col px-6 py-7">
              <h2 className="text-2xl text-foreground">{m.place}</h2>
              <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                  <CalendarDays className="size-4 text-copper" strokeWidth={1.6} />
                  {m.date}
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="size-4 shrink-0 text-copper" strokeWidth={1.6} />
                  {m.time}
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-copper" strokeWidth={1.6} />
                  {m.location}
                </li>
              </ul>
              <a
                href={m.source}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Veranstalterangaben für ${m.place} (öffnet in neuem Tab)`}
                className="mt-4 text-sm text-copper underline underline-offset-4 transition-colors hover:text-foreground"
              >
                Angaben des Veranstalters
              </a>
              <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                Besuche unseren Marktstand und sichere dir dein Schweizer Speisefett direkt vor Ort.
              </p>
              <a
                href={preorderMailto}
                className="mt-6 inline-flex w-full items-center justify-center rounded-sm bg-primary px-6 py-3.5 text-center text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground transition-colors duration-300 hover:bg-accent"
              >
                Für Abholung vorbestellen
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
