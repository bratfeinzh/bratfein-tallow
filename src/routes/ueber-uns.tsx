import { createFileRoute, Link } from "@tanstack/react-router";
import { Beef, GraduationCap, Handshake } from "lucide-react";

import { SectionHeading } from "../components/site/SectionHeading";
import timPhoto from "../assets/team-tim.jpg.asset.json";

export const Route = createFileRoute("/ueber-uns")({
  head: () => ({
    meta: [
      { title: "Über uns — Das YES-Projekt hinter Bratfein" },
      {
        name: "description",
        content:
          "Sieben Schweizer Gymnasiasten führen im YES-Programm ein echtes Unternehmen: Bratfein, Schweizer Rinderfett aus einer Zürcher Metzgerei.",
      },
      { property: "og:title", content: "Über uns — Das YES-Projekt hinter Bratfein" },
      {
        property: "og:description",
        content: "Sieben Jugendliche, eine Zürcher Metzgerei und ein Glas Schweizer Rinderfett.",
      },
      { property: "og:url", content: "/ueber-uns" },
    ],
    links: [{ rel: "canonical", href: "/ueber-uns" }],
  }),
  component: UeberUns,
});

type TeamMember = { name: string; role: string; note: string; photo?: string };

const team: TeamMember[] = [
  {
    name: "Tim",
    role: "CEO",
    note: "Führt das Team, hält Kurs und Kalender.",
    photo: timPhoto.url,
  },
  { name: "Finn", role: "CAO", note: "Administration, Struktur und Ordnung." },
  { name: "Nils", role: "CMO", note: "Marke, Auftritt und Geschichten." },
  { name: "Melissa", role: "CMO", note: "Social Media und Marktkommunikation." },
  { name: "Stefan", role: "CFO", note: "Zahlen, Kalkulation und Budget." },
  { name: "Valerio", role: "CTO", note: "Website, Technik und Prozesse." },
  { name: "Victor", role: "CPO", note: "Produkt, Qualität und Abfüllung." },
];

const pillars = [
  {
    icon: GraduationCap,
    title: "Young Enterprise Switzerland",
    text: "Im YES-Programm gründen Mittelschülerinnen und Mittelschüler ein Jahr lang ein echtes Unternehmen – mit echten Kosten, echten Kunden und echter Verantwortung.",
  },
  {
    icon: Handshake,
    title: "Partnerschaft in Zürich",
    text: "Unser Rohstoff kommt von einer Metzgerei in Zürich, die uns ihr Rinderfett überlässt. Wir holen es persönlich ab und lassen es selber aus.",
  },
  {
    icon: Beef,
    title: "Respekt vor dem Tier",
    text: "Nose-to-Tail heisst für uns: Wenn ein Tier geschlachtet wird, soll möglichst alles genutzt werden. Rinderfett ist dabei der unterschätzteste Teil.",
  },
];

function TeamAvatar({ name, photo }: { name: string; photo?: string | undefined }) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={`${name}, Team von Bratfein`}
        className="aspect-4/5 w-full object-cover"
        loading="lazy"
      />
    );
  }

  return (
    <div className="surface-walnut grain-overlay flex aspect-4/5 w-full items-center justify-center rounded-sm">
      <span className="relative z-10 font-serif text-5xl text-copper-soft/80">
        {name.charAt(0)}
      </span>
    </div>
  );
}

function UeberUns() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-14 md:px-8 md:pt-20">
        <SectionHeading
          as="h1"
          eyebrow="ÜBER UNS // YES-MINI-UNTERNEHMEN"
          title="Ein YES-Mini-Unternehmen mit Überzeugung."
          lead="Als offizielles Mini-Unternehmen von Young Enterprise Switzerland (YES) sind wir sieben Schweizer Gymnasiastinnen und Gymnasiasten, die ein Jahr lang ein echtes Unternehmen aufbauen – von der Idee über die Kalkulation bis zum Marktstand."
        />

        <div className="mt-14 grid gap-px bg-border/70 md:grid-cols-3">
          {pillars.map((p) => (
            <article key={p.title} className="bg-background px-6 py-10 md:px-8">
              <p.icon className="size-7 text-copper" strokeWidth={1.4} />
              <h2 className="mt-5 text-2xl text-foreground">{p.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-cream/60 py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionHeading eyebrow="Das Team" title="Wer hinter Bratfein steht" align="center" />
          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {team.map((m) => (
              <article key={m.name + m.role} className="group">
                <div className="overflow-hidden rounded-sm shadow-soft transition-shadow duration-300 group-hover:shadow-lift">
                  <TeamAvatar name={m.name} photo={m.photo} />
                </div>
                <p className="mt-4 font-serif text-2xl text-foreground">{m.name}</p>
                <p className="eyebrow mt-1">{m.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <SectionHeading
            eyebrow="Unsere Geschichte"
            title="Vom Nebenprodukt zum Lieblingsfett"
            lead="Angefangen hat alles mit einer Frage in der Schulküche: Warum braten wir eigentlich mit hochverarbeitetem Öl, wenn direkt um die Ecke ausgezeichnetes Rinderfett übrig bleibt?"
          />
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              Nach einigen Telefonaten sagte eine Zürcher Metzgerei zu. Seither holen wir das
              Rinderfett regelmässig ab, lassen es in kleinen Chargen bei tiefer Temperatur aus,
              filtrieren es zweifach und füllen es von Hand in neutrale 250-Gramm-Gläser.
            </p>
            <p>
              Jedes Glas verkaufen wir dort, wo wir erklären können, was drin ist: an
              Weihnachts- und Quartiermärkten, an Steak-Fans und an Familien, die wieder wissen
              wollen, woher ihr Fett kommt.
            </p>
            <Link
              to="/standorte"
              className="inline-flex items-center justify-center rounded-sm border border-foreground/20 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-foreground transition-colors duration-300 hover:border-copper hover:text-copper"
            >
              Wo Sie uns treffen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
