import { defineTool } from "@lovable.dev/mcp-js";

const markets = [
  {
    place: "Bassersdorf",
    date: "5. Dezember 2026",
    time: "10:00 – 19:00",
    start: "2026-12-05T10:00:00+01:00",
    end: "2026-12-05T19:00:00+01:00",
  },
  {
    place: "Wallisellen",
    date: "10. Dezember 2026",
    time: "10:00 – 19:00",
    start: "2026-12-10T10:00:00+01:00",
    end: "2026-12-10T19:00:00+01:00",
  },
] as const;

export default defineTool({
  name: "list_markets",
  title: "Markttermine",
  description:
    "Listet die öffentlichen Markttermine und Verkaufsstandorte von Bratfein rund um Zürich.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(markets, null, 2) }],
    structuredContent: { markets: Array.from(markets) },
  }),
});
