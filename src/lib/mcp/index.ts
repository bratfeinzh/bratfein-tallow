import { defineMcp } from "@lovable.dev/mcp-js";

import getContactTool from "./tools/get-contact";
import getFaqTool from "./tools/get-faq";
import getProductTool from "./tools/get-product";
import listMarketsTool from "./tools/list-markets";

export default defineMcp({
  name: "bratfein-webseite",
  title: "Bratfein Webseite",
  version: "0.1.0",
  instructions:
    "Öffentliche Tools zu Bratfein, Schweizer Rinderfett aus Zürich: Produktangaben, Markttermine, häufige Fragen und Kontakt- bzw. Bestellinfos.",
  tools: [getProductTool, listMarketsTool, getFaqTool, getContactTool],
});
