import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Clock, MapPin } from "lucide-react";

import { SectionHeading } from "../components/site/SectionHeading";

const markets = [
  {
    place: "Weihnachtsmarkt Oerlikon",
    date: "Sa, 5. Dezember 2026",
    time: "10:00 – 19:00",
    badge: "Weihnachtsmarkt",
    location: "Marktplatz Oerlikon, Zürich",
    start: "2026-12-05T10:00:00+01:00",
    end: "2026-12-05T19:00:00+01:00",
    city: "Zürich",
  },
  {
    place: "Quartiermarkt Wiedikon",
    date: "Sa, 12. Dezember 2026",
    time: "09:00 – 16:00",
    badge: "Quartiermarkt",
    location: "Idaplatz, Zürich",
    start: "2026-12-12T09:00:00+01:00",
    end: "2026-12-12T16:00:00+01:00",
    city: "Zürich",
  },
  {
    place: "Adventsmarkt Uster",
    date: "Fr, 18. Dezember 2026",
    time: "16:00 – 21:00",
    badge: "Weihnachtsmarkt",
    location: "Zeughausareal, Uster",
    start: "2026-12-18T16:00:00+01:00",
    end: "2026-12-18T21:00:00+01:00",
    city: "Uster",
  },
  {
    place: "Samstagsmarkt Bürkliplatz",
    date: "Sa, 16. Januar 2027",
    time: "08:00 – 14:00",
    badge: "Wochenmarkt",
    location: "Bürkliplatz, Zürich",
    start: "2027-01-16T08:00:00+01:00",
    end: "2027-01-16T14:00:00+01:00",
    city: "Zürich",
  },
];

export const Route = createFileRoute("/standorte")({
  head: () => ({
    meta: [
      { title: "Standorte & Märkte — Bratfein Schweizer Rinderfett" },
      {
        name: "description",
        content:
          "Alle Märkte und Verkaufsstandorte, an denen Bratfein Schweizer Rinderfett im 250-g-Glas erhältlich ist – in und um Zürich.",
      },
      { property: "og:title", content: "Standorte & Märkte — Bratfein" },
      {
        property: "og:description",
        content: "Unsere Marktstände in und um Zürich – Termine, Zeiten und Orte auf einen Blick.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://bratfein-tallow.lovable.app/standorte" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://bratfein-tallow.lovable.app/standorte" }],
    scripts: markets.map((m) => ({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Event",
        name: `Bratfein am ${m.place}`,
        startDate: m.start,
        endDate: m.end,
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
          url: "https://bratfein-tallow.lovable.app",
        },
        description: `Bratfein Schweizer Rinderfett im 250-g-Glas am ${m.place}, ${m.date}, ${m.time}.`,
      }),
    })),
  }),
  component: Standorte,
});

function Standorte() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 pt-14 md:px-8 md:pt-20">
      <SectionHeading
        as="h1"
        eyebrow="Standorte"
        title="Märkte & Verkaufsstandorte"
        lead="Kommen Sie vorbei, probieren Sie und nehmen Sie ein Glas gleich mit. Bezahlung via Twint, Karte oder bar vor Ort."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {markets.map((m) => (
          <article
            key={m.place}
            className="group overflow-hidden gilded rounded-sm bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
          >
            <div className="surface-walnut grain-overlay flex items-center justify-between px-6 py-4">
              <span className="relative z-10 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-copper-soft">
                {m.badge}
              </span>
              <span className="relative z-10 text-xs text-walnut-foreground/60">Stand Bratfein</span>
            </div>
            <div className="px-6 py-7">
              <h2 className="text-2xl text-foreground">{m.place}</h2>
              <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                  <CalendarDays className="size-4 text-copper" strokeWidth={1.6} />
                  {m.date}
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="size-4 text-copper" strokeWidth={1.6} />
                  {m.time}
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="size-4 text-copper" strokeWidth={1.6} />
                  {m.location}
                </li>
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/shop"
          className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground transition-colors duration-300 hover:bg-accent"
        >
          Glas vorreservieren
        </Link>
      </div>
    </section>
  );
}
