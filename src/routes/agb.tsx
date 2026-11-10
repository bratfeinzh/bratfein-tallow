import { createFileRoute } from "@tanstack/react-router";

import { LegalPage } from "../components/site/LegalPage";

export const Route = createFileRoute("/agb")({
  head: () => ({
    meta: [
      { title: "Allgemeine Geschäftsbedingungen — Bratfein" },
      { name: "description", content: "Allgemeine Geschäftsbedingungen von Bratfein für Anfragen und Bestellungen von Schweizer Speisefett." },
      { property: "og:title", content: "Allgemeine Geschäftsbedingungen — Bratfein" },
      { property: "og:description", content: "Allgemeine Geschäftsbedingungen von Bratfein." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://bratfein.lovable.app/agb" }],
  }),
  component: Agb,
});

function Agb() {
  return (
    <LegalPage eyebrow="Rechtliches" title="Allgemeine Geschäftsbedingungen">
      <p>{`\n`}</p>

    </LegalPage>
  );
}