import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Clock, MapPin, Navigation } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";

import { MarketAssistant } from "../components/site/MarketAssistant";
import { SectionHeading } from "../components/site/SectionHeading";
import { upcomingMarkets, zurichDate, marketMapsUrl } from "../lib/markets";

export const Route = createFileRoute("/standorte")({
  loader: () => ({ today: zurichDate() }),
  head: ({ loaderData }) => ({
    meta: [
      { title: "Standorte & Märkte — Bratfein Rindertalg-Speisefett" },
      {
        name: "description",
        content:
          "Bratfein Rindertalg-Speisefett an Märkten in und um Zürich kaufen: Termine, Orte und Vorbestellung für die Gläser mit 330 ml (275 g) oder 205 ml (165 g).",
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
    scripts: upcomingMarkets(loaderData?.today ?? zurichDate()).map((m) => ({
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
        description: `Bratfein Schweizer Speisefett in zwei Grössen (330 ml und 205 ml) am ${m.place}, ${m.date}, ${m.time}.`,
      }),
    })),
  }),
  component: Standorte,
});

function Standorte() {
  const initial = Route.useLoaderData();
  const [today, setToday] = useState(initial.today);
  useEffect(() => {
    const update = () => setToday(zurichDate());
    update();
    const interval = window.setInterval(update, 60_000);
    return () => window.clearInterval(interval);
  }, []);
  const visibleMarkets = upcomingMarkets(today);
  return (
    <section className="mx-auto max-w-5xl px-5 pb-24 pt-14 md:px-8 md:pt-20">
      <SectionHeading
        as="h1"
        eyebrow="Standorte"
        title="Märkte & Verkaufsstandorte in und um Zürich"
        lead="Kommen Sie vorbei, probieren Sie und nehmen Sie ein Glas gleich mit. Bezahlung via Twint, Karte oder bar vor Ort."
      />

      {visibleMarkets.length === 0 ? (
        <p className="mt-14 text-base leading-relaxed text-muted-foreground">
          Aktuell sind keine Märkte geplant. Sie können trotzdem direkt über den <Link to="/shop" className="text-copper underline underline-offset-4">Shop</Link> bestellen.
        </p>
      ) : <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {visibleMarkets.map((m) => (
          <article
            key={`${m.place}-${m.dateIso}`}
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
                  <div>
                    {m.begins && m.ends ? `${m.begins}–${m.ends}` : "Zeit wird noch bekanntgegeben"}
                    {(!m.begins || !m.ends) && (
                      <p className="mt-1 text-xs text-muted-foreground">{"\n"}</p>
                    )}
                  </div>
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
                Besuchen Sie unseren Marktstand und sichern Sie sich Ihr Schweizer Speisefett direkt vor Ort.
              </p>
              <Button asChild variant="outline" className="mt-6 h-auto w-full rounded-sm border-foreground/20 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] hover:border-copper hover:text-copper">
                <a href={marketMapsUrl(m.location)} target="_blank" rel="noopener noreferrer" aria-label={`Route öffnen: ${m.location} (öffnet in neuem Tab)`}>
                  <Navigation aria-hidden="true" /> Route öffnen
                </a>
              </Button>
              <Button asChild className="mt-3 h-auto w-full rounded-sm px-6 py-3.5 text-center text-xs font-bold uppercase tracking-[0.16em] hover:bg-accent">
                <Link to="/shop">Für Abholung vorbestellen</Link>
              </Button>
            </div>
          </article>
        ))}
      </div>}

      <MarketAssistant />
    </section>
  );
}
