import { createFileRoute } from "@tanstack/react-router";

import { LegalBlock, LegalPage } from "../components/site/LegalPage";

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
      <p>{"Bratfein, Miniunternehmen im Rahmen von YES (Young Enterprise Switzerland), Kantonsschule Zürich Nord"}</p>
      <LegalBlock title={"1. Geltungsbereich"}>
        <p>{"Diese AGB gelten für alle Bestellungen über bratfein.lovable.app und für Käufe an unseren Marktständen."}</p>
      </LegalBlock>
      <LegalBlock title={"2. Anbieter"}>
        <p>{"Bratfein (YES-Mini-Unternehmen), verantwortlich: Tim Bürer, Emil-Rütti-Weg 4, 8050 Zürich, bratfein.zh@gmail.com"}</p>
      </LegalBlock>
      <LegalBlock title={"3. Bestellung und Vertragsschluss"}>
        <p>{"Das Bestellformular ist eine unverbindliche Anfrage. Wir bestätigen deine Anfrage innert 48 Stunden per E-Mail. Mit dieser Bestätigung kommt der Kaufvertrag zustande."}</p>
      </LegalBlock>
      <LegalBlock title={"4. Produkte"}>
        <p>{"Bratfein ist ein Speisefett aus Rindernierenfett von Schweizer Rindern, bezogen vom Schlachthof in Hinwil. Erhältlich in den Grössen 330 ml (275 g) und 205 ml (165 g). Zutaten, Nettofüllmenge und Mindesthaltbarkeitsdatum stehen auf dem Glas."}</p>
      </LegalBlock>
      <LegalBlock title={"5. Preise"}>
        <p>{"Alle Preise verstehen sich in Schweizer Franken (CHF). Bratfein ist nicht mehrwertsteuerpflichtig, es wird daher keine Mehrwertsteuer ausgewiesen. Preisänderungen gelten nicht für bereits bestätigte Bestellungen."}</p>
      </LegalBlock>
      <LegalBlock title={"6. Zahlung"}>
        <p>{"Die Zahlung erfolgt per TWINT, Kreditkarte oder bar bei Abholung. Die gewünschte Zahlungsart wird bei der Bestätigung mit dir abgesprochen."}</p>
      </LegalBlock>
      <LegalBlock title={"7. Abholung und Lieferung"}>
        <p>{"Die Abholung an den Marktständen ist kostenlos und zu den auf der Website angegebenen Zeiten möglich."}</p>
        <p>{"Lieferung ist nach individueller Absprache möglich. Kosten und Lieferzeit teilen wir dir bei der Bestätigung mit."}</p>
      </LegalBlock>
      <LegalBlock title={"8. Haltbarkeit und Lagerung"}>
        <p>{"Ungeöffnet im Kühlschrank lagern: mindestens 6 Monate, siehe Mindesthaltbarkeitsdatum auf dem Glas. Nach dem Öffnen im Kühlschrank lagern und innert 3 Monaten verbrauchen."}</p>
      </LegalBlock>
      <LegalBlock title={"9. Widerrufsrecht"}>
        <p>{"Bei Online-Bestellungen kannst du innert 14 Tagen nach Erhalt ohne Angabe von Gründen widerrufen. Dazu informierst du uns per E-Mail. Die Ware muss ungeöffnet und unbeschädigt zurückgegeben werden. Bei Käufen an unseren Marktständen besteht kein Widerrufsrecht."}</p>
      </LegalBlock>
      <LegalBlock title={"10. Reklamation"}>
        <p>{"Melde beschädigte oder nicht den Angaben entsprechende Ware innert 7 Tagen nach Erhalt per E-Mail. Wir ersetzen die Ware oder erstatten den Kaufpreis."}</p>
      </LegalBlock>
      <LegalBlock title={"11. Haftung"}>
        <p>{"Soweit gesetzlich zulässig, haftet Bratfein nur bei Vorsatz oder grober Fahrlässigkeit. Bitte beachte die Lagerungshinweise."}</p>
      </LegalBlock>
      <LegalBlock title={"12. Datenschutz"}>
        <p>{"Informationen zum Umgang mit Personendaten findest du in unserer Datenschutzerklärung auf der Website."}</p>
      </LegalBlock>
      <LegalBlock title={"13. Anwendbares Recht und Gerichtsstand"}>
        <p>{"Es gilt Schweizer Recht. Gerichtsstand ist Zürich, soweit gesetzlich zulässig."}</p>
      </LegalBlock>
      <LegalBlock title={"14. Änderungen"}>
        <p>{"Wir können diese AGB anpassen. Es gilt die jeweils auf der Website veröffentlichte Fassung."}</p>
      </LegalBlock>
      <p>{"Stand: November 2026"}</p>
    </LegalPage>
  );
}