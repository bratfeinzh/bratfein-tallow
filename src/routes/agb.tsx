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
      {/* REMOVED */}
      {/* REMOVED CONTENT BELOW */}
      {false && <p>{`Ändere Design, Farben und Struktur NICHT. Mache nur Folgendes:


1. Neue Seite /agb mit dem Titel «Allgemeine Geschäftsbedingungen» erstellen. Übernimm den folgenden Text exakt, ohne Kürzung oder Umformulierung:


ALLGEMEINE GESCHÄFTSBEDINGUNGEN (AGB)
Bratfein, Miniunternehmen im Rahmen von YES (Young Enterprise Switzerland), Kantonsschule Zürich Nord


1. Geltungsbereich
Diese AGB gelten für alle Bestellungen über bratfein.lovable.app und für Käufe an unseren Marktständen.


2. Anbieter
Bratfein (YES-Mini-Unternehmen), verantwortlich: Tim Bürer, Emil-Rütti-Weg 4, 8050 Zürich, bratfein.zh@gmail.com


3. Bestellung und Vertragsschluss
Das Bestellformular ist eine unverbindliche Anfrage. Wir bestätigen deine Anfrage innert 48 Stunden per E-Mail. Mit dieser Bestätigung kommt der Kaufvertrag zustande.


4. Produkte
Bratfein ist ein Speisefett aus Rindernierenfett von Schweizer Rindern, bezogen vom Schlachthof in Hinwil. Erhältlich in den Grössen 330 ml (275 g) und 205 ml (165 g). Zutaten, Nettofüllmenge und Mindesthaltbarkeitsdatum stehen auf dem Glas.


5. Preise
Alle Preise verstehen sich in Schweizer Franken (CHF). Bratfein ist nicht mehrwertsteuerpflichtig, es wird daher keine Mehrwertsteuer ausgewiesen. Preisänderungen gelten nicht für bereits bestätigte Bestellungen.


6. Zahlung
Die Zahlung erfolgt per TWINT, Kreditkarte oder bar bei Abholung. Die gewünschte Zahlungsart wird bei der Bestätigung mit dir abgesprochen.


7. Abholung und Lieferung
Die Abholung an den Marktständen ist kostenlos und zu den auf der Website angegebenen Zeiten möglich.
Lieferung ist nach individueller Absprache möglich. Kosten und Lieferzeit teilen wir dir bei der Bestätigung mit.


8. Haltbarkeit und Lagerung
Ungeöffnet im Kühlschrank lagern: mindestens 6 Monate, siehe Mindesthaltbarkeitsdatum auf dem Glas. Nach dem Öffnen im Kühlschrank lagern und innert 3 Monaten verbrauchen.


9. Widerrufsrecht
Bei Online-Bestellungen kannst du innert 14 Tagen nach Erhalt ohne Angabe von Gründen widerrufen. Dazu informierst du uns per E-Mail. Die Ware muss ungeöffnet und unbeschädigt zurückgegeben werden. Bei Käufen an unseren Marktständen besteht kein Widerrufsrecht.


10. Reklamation
Melde beschädigte oder nicht den Angaben entsprechende Ware innert 7 Tagen nach Erhalt per E-Mail. Wir ersetzen die Ware oder erstatten den Kaufpreis.


11. Haftung
Soweit gesetzlich zulässig, haftet Bratfein nur bei Vorsatz oder grober Fahrlässigkeit. Bitte beachte die Lagerungshinweise.


12. Datenschutz
Informationen zum Umgang mit Personendaten findest du in unserer Datenschutzerklärung auf der Website.


13. Anwendbares Recht und Gerichtsstand
Es gilt Schweizer Recht. Gerichtsstand ist Zürich, soweit gesetzlich zulässig.


14. Änderungen
Wir können diese AGB anpassen. Es gilt die jeweils auf der Website veröffentlichte Fassung.


Stand: November 2026


2. In der Fusszeile neben «Impressum» und «Datenschutz» einen Link «AGB» auf /agb ergänzen.


3. Im Bestellformular unter dem Absenden-Button ergänzen: «Mit dem Absenden akzeptierst du die AGB.» Das Wort «AGB» ist ein Link auf /agb.


4. Überall auf der Seite die Haltbarkeitsangabe prüfen: Sie soll ungeöffnet 6 Monate und geöffnet 3 Monate lauten. Keine anderen Änderungen.`}</p>}
    </LegalPage>
  );
}