import { defineTool } from "@lovable.dev/mcp-js";

import { jars } from "../../product";

export default defineTool({
  name: "get_product",
  title: "Produkt-Infos",
  description:
    "Liefert die öffentlichen Produktangaben zu Bratfein Schweizer Speisefett: Grössen (330 ml / 205 ml), Gewichte, Preise, Eigenschaften und Verwendung.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const product = {
      name: "Bratfein Schweizer Speisefett",
      sizes: jars.map((jar) => ({
        volume: `${jar.volumeMl} ml`,
        weight: `${jar.weightG} g`,
        price: jar.priceLabel,
        label: jar.label,
      })),
      priceFrom: "9 CHF",
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
