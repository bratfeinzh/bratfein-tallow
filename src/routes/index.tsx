import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, MapPin, Leaf, Check, X } from "lucide-react";

import { SectionHeading } from "../components/site/SectionHeading";
import jarImage from "../assets/tallow-jar.jpg";
import steakImage from "../assets/steak-pan.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bratfein — Der natürliche Genuss fürs perfekte Steak" },
      {
        name: "description",
        content:
          "Rindertalg aus Zürich im 250g-Glas: hoher Rauchpunkt, 100% regional vom Metzger, Nose-to-Tail. Die natürliche Alternative zu Samenölen.",
      },
      { property: "og:title", content: "Bratfein — Der natürliche Genuss fürs perfekte Steak" },
      {
        property: "og:description",
        content: "Regionaler Rindertalg aus Zürich. Hoher Rauchpunkt, voller Geschmack.",
      },
    ],
  }),
  component: Index,
});

const features = [
  {
    icon: Flame,
    title: "Hoher Rauchpunkt",
    text: "Rindertalg bleibt bis rund 250 °C stabil. Ideal für die krachende Kruste am Steak, ohne bitteren Beigeschmack.",
  },
  {
    icon: MapPin,
    title: "100% regional",
    text: "Unser Talg stammt ausschliesslich von einer Metzgerei in Zürich. Kurze Wege, klare Herkunft, echte Handwerkskunst.",
  },
  {
    icon: Leaf,
    title: "Nose-to-Tail",
    text: "Wir verwerten, was sonst weggeworfen wird. Aus einem Nebenprodukt entsteht ein Produkt mit Charakter.",
  },
];

const comparison = [
  { label: "Rauchpunkt", tallow: "ca. 250 °C – bratstabil", seed: "Oft tiefer, oxidiert schnell" },
  {
    label: "Verarbeitung",
    tallow: "Ausgelassen, filtriert, abgefüllt",
    seed: "Extraktion mit Lösungsmitteln, Raffination, Bleichung, Desodorierung",
  },
  {
    label: "Geschmack",
    tallow: "Verstärkt den natürlichen Geschmack\n",
    seed: "Neutral bis flach, kann bitter werden",
  },
  {
    label: "Natürlichkeit",
    tallow: "Eine Zutat: Rindertalg",
    seed: "Industriell hochverarbeitetes Raffinat",
  },
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-14 md:px-8 md:pb-28 md:pt-20">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="fade-up">
            <p className="eyebrow">BEEFTALLOW AUS ZÜRICH</p>
            <h1 className="mt-5 text-4xl leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
              Der natürliche Genuss fürs perfekte Steak
            </h1>
            <hr className="copper-rule mt-7" />
            <p className="mt-7 max-w-md text-base leading-relaxed text-muted-foreground">
              Bratfein ist reiner Rindertalg von einer Zürcher Metzgerei –  Hoher Rauchpunkt, voller Geschmack, keine Industrie.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center rounded-sm bg-primary px-7 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground transition-colors duration-300 hover:bg-accent"
              >
                Jetzt bestellen
              </Link>
              <Link
                to="/referenzen"
                className="inline-flex items-center justify-center rounded-sm border border-foreground/20 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-foreground transition-colors duration-300 hover:border-copper hover:text-copper"
              >
                Märkte entdecken
              </Link>
            </div>
            <p className="mt-7 text-sm text-muted-foreground">
              Abholung am Markt oder nach Absprache
            </p>
          </div>

          <div className="relative">
            <div className="surface-walnut grain-overlay absolute -inset-3 rounded-sm opacity-[0.08]" />
            <img
              src={jarImage}
              alt="Bratfein Rindertalg im 250-Gramm-Glas auf einem Nussholzbrett"
              width={1200}
              height={1200}
              className="relative w-full rounded-sm object-cover shadow-lift"
            />
            <div className="absolute bottom-4 left-4 rounded-sm bg-background/92 px-4 py-3 shadow-soft backdrop-blur">
              <p className="eyebrow">Handwerk</p>
              <p className="mt-1 font-serif text-lg text-foreground">Eine Zutat. Nichts sonst.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border bg-cream/60" aria-labelledby="vorteile">
        <h2 id="vorteile" className="sr-only">
          Vorteile von Bratfein Rindertalg
        </h2>
        <div className="mx-auto grid max-w-6xl gap-px bg-border/70 px-0 md:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="group bg-background px-6 py-12 transition-colors duration-300 hover:bg-cream md:px-10"
            >
              <f.icon className="size-7 text-copper" strokeWidth={1.4} />
              <h3 className="mt-6 text-2xl text-foreground">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Storytelling */}
      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <SectionHeading
          eyebrow="Die Wahrheit über die Bratpfanne"
          title="Warum Rindertalg statt Samenöle?"
          lead="Vor hundert Jahren stand in jeder Schweizer Küche ein Topf mit Talg. Heute steht dort eine Plastikflasche mit Öl, das eine industrielle Reise hinter sich hat, die kaum jemand kennt."
        />

        <div className="mt-14 grid items-start gap-12 md:grid-cols-2 md:gap-16">
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              Moderne Samenöle werden aus Saaten gepresst, die von Natur aus kaum Fett hergeben.
              Damit trotzdem etwas fliesst, kommen Lösungsmittel zum Einsatz. Danach folgt, was die
              Industrie „Raffination“ nennt: entschleimen, bleichen, mit hoher Hitze desodorieren –
              bis nichts mehr riecht, nichts mehr schmeckt und nichts mehr an eine Pflanze erinnert.
            </p>
            <p>
              In der Pfanne rächt sich das. Ein Öl, das schon im Werk erhitzt wurde, hält der Hitze
              beim Anbraten nur begrenzt stand. Es beginnt zu rauchen, zu oxidieren, bitter zu
              werden – genau in dem Moment, in dem das Steak seine Kruste braucht.
            </p>
            <p className="border-l-2 border-copper pl-5 font-serif text-xl leading-snug text-foreground">
              Rindertalg braucht keine Fabrik. Er wird ausgelassen, filtriert und abgefüllt. Fertig.
            </p>
            <p>
              Das Fett unserer Zürcher Metzgerei wird bei niedriger Temperatur langsam ausgelassen,
              feinfiltriert und direkt ins Glas gefüllt. Es bleibt bei hoher Hitze stabil, trägt
              Röstaromen statt sie zu überdecken und verwertet einen Rohstoff, der sonst im Abfall
              landet.
            </p>
          </div>

          <img
            src={steakImage}
            alt="Steak brät in einer gusseisernen Pfanne mit Rindertalg"
            width={1408}
            height={912}
            loading="lazy"
            className="w-full rounded-sm object-cover shadow-lift"
          />
        </div>

        {/* Comparison card */}
        <div className="mt-16 overflow-hidden rounded-sm border border-border shadow-soft">
          <div className="surface-walnut grain-overlay grid grid-cols-3 gap-4 px-5 py-6 md:px-8">
            <p className="relative z-10 self-end text-[0.65rem] font-bold uppercase tracking-[0.2em] text-walnut-foreground/60">
              Im Vergleich
            </p>
            <p className="relative z-10 font-serif text-xl text-copper-soft md:text-2xl">
              Bratfein Rindertalg
            </p>
            <p className="relative z-10 font-serif text-xl text-walnut-foreground/70 md:text-2xl">
              Industrielle Samenöle
            </p>
          </div>
          {comparison.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-3 gap-4 px-5 py-6 md:px-8 ${
                i % 2 === 0 ? "bg-background" : "bg-cream/70"
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                {row.label}
              </p>
              <p className="flex gap-2 text-sm text-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-copper" strokeWidth={2} />
                <span>{row.tallow}</span>
              </p>
              <p className="flex gap-2 text-sm text-muted-foreground">
                <X className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" strokeWidth={2} />
                <span>{row.seed}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="surface-walnut grain-overlay rounded-sm px-6 py-16 text-center md:px-16 md:py-20">
          <div className="relative z-10">
            <p className="eyebrow">Bratfein bestellen</p>
            <h2 className="mx-auto mt-4 max-w-xl text-3xl leading-tight md:text-4xl">
              Ein Glas, das jedes Steak besser macht.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm text-walnut-foreground/70">
              250 g für 8–10 CHF. Abholung an unseren Marktständen oder Lieferung nach Absprache.
            </p>
            <Link
              to="/shop"
              className="mt-9 inline-flex items-center justify-center rounded-sm bg-copper px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-accent-foreground transition-opacity duration-300 hover:opacity-90"
            >
              Bestellung anfragen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
