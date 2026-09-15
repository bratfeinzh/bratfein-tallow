import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_product",
  title: "Produkt-Infos",
  description:
    "Liefert die öffentlichen Produktangaben zu Bratfein Schweizer Rinderfett: Grösse, Preis, Eigenschaften und Verwendung.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const product = {
      name: "Bratfein Schweizer Rinderfett",
      size: "250 g Glas",
      price: "9 CHF",
      currency: "CHF",
      origin: "Regionale Metzgerei in Zürich, Schweiz",
      properties: [
        "100% reines Rinderfett aus Zürich",
        "Ohne Konservierungsstoffe",
        "Hohe Hitzebeständigkeit, Rauchpunkt bis ca. 250 °C",
        "Nose-to-Tail / Upcycling von Nierenfett",
      ],
      usage:
        "Pfanne stark erhitzen, ein Löffel Rinderfett schmelzen lassen und das Fleisch scharf anbraten.",
      payment: "Twint, Karte oder bar vor Ort",
      website: "https://bratfein.lovable.app",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(product, null, 2) }],
      structuredContent: product,
    };
  },
});
