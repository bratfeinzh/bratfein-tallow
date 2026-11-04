import { defineTool } from "@lovable.dev/mcp-js";

const faq = [
  {
    question: "Wie lange ist das Schweizer Speisefett haltbar?",
    answer:
      "Ungeöffnet und kühl und dunkel gelagert mehrere Monate. Das genaue Mindesthaltbarkeitsdatum steht auf dem Glas.",
  },
  {
    question: "Muss das Glas im Kühlschrank gelagert werden?",
    answer:
      "Nicht zwingend. Kühl und dunkel gelagert reicht. Im Kühlschrank hält es länger.",
  },
  {
    question: "Wie verwende ich es am besten beim Anbraten von Fleisch?",
    answer:
      "Pfanne auf mittlere bis hohe Hitze erhitzen, einen Teelöffel Bratfein hineingeben und schmelzen lassen, dann Fleisch, Rösti oder Gemüse braten.",
  },
  {
    question: "Woher kommt das Fett?",
    answer:
      "Das Nierenfett stammt von einem Schlachthof in Hinwil. Wir lassen es in kleinen Chargen aus und filtrieren es.",
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
