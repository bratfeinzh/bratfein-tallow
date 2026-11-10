import { createFileRoute, Link } from "@tanstack/react-router";

import { LegalBlock, LegalPage } from "../components/site/LegalPage";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutzerklärung — Bratfein" },
      { name: "description", content: "Wie Bratfein personenbezogene Daten bei Bestellungen und Anfragen gemäss Schweizer Datenschutzgesetz (revDSG) bearbeitet." },
      { property: "og:title", content: "Datenschutzerklärung — Bratfein" },
      { property: "og:description", content: "Datenschutz bei Bratfein gemäss revDSG: Zweck, Weitergabe und Ihre Rechte." },
      { property: "og:url", content: "https://bratfein.lovable.app/datenschutz" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://bratfein.lovable.app/datenschutz" }],
  }),
  component: Datenschutz,
});

function Datenschutz() {
  return (
    <LegalPage eyebrow="Rechtliches // revDSG" title="Datenschutzerklärung">
      <LegalBlock title="Verantwortlicher">
        <p>
          Bratfein (YES-Mini-Unternehmen), Emil-Rütti-Weg 4, 8050 Zürich, Schweiz –{" "}
          <a className="text-copper underline-offset-4 hover:underline" href="mailto:bratfein.zh@gmail.com">
            bratfein.zh@gmail.com
          </a>
        </p>
      </LegalBlock>
      <LegalBlock title="Erfassung personenbezogener Daten">
        <p>
          Wir erheben und verarbeiten personenbezogene Daten (wie Name, E-Mail-Adresse, Lieferadresse,
          Telefonnummer), die über das Bestellformular oder per E-Mail freiwillig angegeben werden.
        </p>
      </LegalBlock>
      <LegalBlock title="Zweck der Verarbeitung">
        <p>
          Die Daten werden ausschliesslich zur Abwicklung von Bestellungen, Kundenanfragen sowie für die
          Zahlungsabwicklung (via Twint, Karte oder bar) verwendet.
        </p>
      </LegalBlock>
      <LegalBlock title="Weitergabe an Dritte">
        <p>Es erfolgt keine Weitergabe der Daten an Unbefugte.</p>
      </LegalBlock>
      <LegalBlock title="Google Search Console / Analyse">
        <p>
          Wir nutzen Werkzeuge zur Analyse der Webseitennutzung (z.B. Google Search Console), um unser
          Online-Angebot technisch zu optimieren. Es werden dabei keine sensitiven Personendaten verkauft.
        </p>
      </LegalBlock>
      <LegalBlock title="Ihre Rechte">
        <p>
          Besucherinnen und Besucher haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der
          Verarbeitung ihrer gespeicherten Daten. Kontakt dazu über die im{" "}
          <Link to="/impressum" className="text-copper underline-offset-4 hover:underline">
            Impressum
          </Link>{" "}
          angegebene E-Mail-Adresse.
        </p>
      </LegalBlock>
      <p>Diese Website verwendet nur technisch notwendige Cookies, die für den Betrieb der Seite erforderlich sind. Es werden keine Analyse- oder Marketing-Cookies eingesetzt.</p>
    </LegalPage>
  );
}
