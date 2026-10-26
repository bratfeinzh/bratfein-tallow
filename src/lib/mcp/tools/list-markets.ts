import { defineTool } from "@lovable.dev/mcp-js";
import { markets } from "../../markets";

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
