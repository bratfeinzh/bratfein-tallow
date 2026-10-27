import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_product",
  title: "Produkt-Infos",
  description:
    "Liefert die öffentlichen Produktangaben zu Bratfein Schweizer Speisefett: Grösse, Preis, Eigenschaften und Verwendung.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const product = {
      name: "Bratfein Schweizer Speisefett",
      size: "250 g Glas",
      price: "9 CHF",
      currency: "CHF",
      origin: "Schweizer Nierenfett vom Rind von einer regionalen Metzgerei in Zürich, Schweiz",
      properties: [
        "100% reines Speisefett aus Zürich",
        "Ohne Konservierungsstoffe",
        "Hohe Hitzebeständigkeit, Rauchpunkt bis ca. 250 °C",
        "Nose-to-Tail / Upcycling von Nierenfett",
      ],
      usage:
        "Pfanne stark erhitzen, einen Löffel Speisefett schmelzen lassen und das Fleisch scharf anbraten.",
      payment: "Twint, Karte oder bar vor Ort",
      website: "https://bratfein.lovable.app",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(product, null, 2) }],
      structuredContent: product,
    };
  },
});
