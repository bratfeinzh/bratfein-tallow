import { defineTool } from "@lovable.dev/mcp-js";

const faq = [
  {
    question: "Wie lange ist das Schweizer Speisefett haltbar?",
    answer:
      "Ungeöffnet und kühl gelagert rund 12 Monate. Nach dem Öffnen sauber verschlossen mehrere Monate.",
  },
  {
    question: "Muss das Glas im Kühlschrank gelagert werden?",
    answer:
      "Nein. Kühl, trocken und dunkel gelagert bleibt es stabil. Im Kühlschrank hält es noch länger.",
  },
  {
    question: "Wie verwende ich es am besten beim Anbraten von Fleisch?",
    answer:
      "Pfanne stark erhitzen, einen Löffel Speisefett schmelzen lassen und das Steak scharf anbraten – der hohe Rauchpunkt bis ca. 250 °C macht es ideal.",
  },
] as const;

export default defineTool({
  name: "get_faq",
  title: "Häufige Fragen",
  description: "Liefert die öffentlichen Fragen und Antworten zu Lagerung, Haltbarkeit und Verwendung.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(faq, null, 2) }],
    structuredContent: { faq: Array.from(faq) },
  }),
});
