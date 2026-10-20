import { createFileRoute } from "@tanstack/react-router";

import { LegalBlock, LegalPage } from "../components/site/LegalPage";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum — Bratfein" },
      { name: "description", content: "Impressum von Bratfein, einem YES-Mini-Unternehmen aus Zürich: Kontakt, Adresse und verantwortliche Person." },
      { property: "og:title", content: "Impressum — Bratfein" },
      { property: "og:description", content: "Kontakt und Angaben zu Bratfein, YES-Mini-Unternehmen aus Zürich." },
      { property: "og:url", content: "/impressum" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/impressum" }],
  }),
  component: Impressum,
});

function Impressum() {
  return (
    <LegalPage eyebrow="Rechtliches" title="Impressum">
      <LegalBlock title="Unternehmen">
        <p>Bratfein (YES-Mini-Unternehmen)</p>
        <p>8000 Zürich, Schweiz</p>
      </LegalBlock>
      <LegalBlock title="Kontakt">
        <p>
          E-Mail:{" "}
          <a className="text-copper underline-offset-4 hover:underline" href="mailto:bratfein.zh@gmail.com">
            bratfein.zh@gmail.com
          </a>
        </p>
      </LegalBlock>
      <LegalBlock title="Vertretungsberechtigte Person">
        <p>Tim (CEO)</p>
      </LegalBlock>
      <LegalBlock title="Hinweis">
        <p>Bratfein ist ein Mini-Unternehmen im Rahmen des Programms von Young Enterprise Switzerland (YES).</p>
      </LegalBlock>
    </LegalPage>
  );
}
