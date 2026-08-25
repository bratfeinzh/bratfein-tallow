import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Clock, MapPin, Quote } from "lucide-react";

import { SectionHeading } from "../components/site/SectionHeading";

export const Route = createFileRoute("/referenzen")({
  head: () => ({
    meta: [
      { title: "Referenzen & Standorte — Bratfein am Markt" },
      {
        name: "description",
        content:
          "Stimmen von Steak-Fans und Marktkundschaft sowie alle kommenden Weihnachts- und Quartiermärkte, an denen Bratfein Rindertalg erhältlich ist.",
      },
      { property: "og:title", content: "Referenzen & Standorte — Bratfein am Markt" },
      {
        property: "og:description",
        content: "Unsere Marktstände in und um Zürich – plus Stimmen unserer Kundschaft.",
      },
    ],
  }),
  component: Referenzen,
});

const testimonials = [
  {
    quote:
      "Ich habe jahrelang mit Öl gebraten. Mit Bratfein bekommt das Entrecôte eine Kruste, wie ich sie sonst nur im Restaurant kenne.",
    name: "Marco R.",
    role: "Steak-Enthusiast, Zürich",
  },
  {
    quote:
      "Am Marktstand haben sie mir in fünf Minuten mehr über Fett erklärt als jede Werbung. Und der Geschmack überzeugt sowieso.",
    name: "Andrea B.",
    role: "Marktkundin, Winterthur",
  },
  {
    quote:
      "Sauber gefiltert, neutral im Geruch, sehr hitzestabil. Für Rösti und Bratkartoffeln ist es bei uns zum Standard geworden.",
    name: "Familie Grüninger",
    role: "Stammkundschaft",
  },
  {
    quote:
      "Regional, konsequent verwertet und von Jugendlichen selber gemacht – dieses Projekt unterstütze ich gerne.",
    name: "Peter H.",
    role: "Besucher Weihnachtsmarkt",
  },
];

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

function Referenzen() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-14 md:px-8 md:pt-20">
        <SectionHeading
          as="h1"
          eyebrow="Referenzen"
          title="Was unsere Kundschaft sagt"
          lead="Bratfein verkaufen wir von Hand zu Hand. Diese Stimmen stammen von Menschen, die am Stand probiert und danach wieder bestellt haben."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="rounded-sm border border-border bg-card px-7 py-8 shadow-soft transition-shadow duration-300 hover:shadow-lift"
            >
              <Quote className="size-6 text-copper" strokeWidth={1.4} />
              <p className="mt-5 font-serif text-xl leading-snug text-foreground">„{t.quote}“</p>
              <footer className="mt-6 border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-cream/60 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Standorte"
            title="Kommende Märkte"
            lead="Kommen Sie vorbei, probieren Sie und nehmen Sie ein Glas gleich mit. Bezahlung via Twint, Karte oder bar vor Ort."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {markets.map((m) => (
              <article
                key={m.place}
                className="group overflow-hidden rounded-sm border border-border bg-background shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="surface-walnut grain-overlay flex items-center justify-between px-6 py-4">
                  <span className="relative z-10 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-copper-soft">
                    {m.badge}
                  </span>
                  <span className="relative z-10 text-xs text-walnut-foreground/60">
                    Stand Bratfein
                  </span>
                </div>
                <div className="px-6 py-7">
                  <h3 className="text-2xl text-foreground">{m.place}</h3>
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
        </div>
      </section>
    </>
  );
}
