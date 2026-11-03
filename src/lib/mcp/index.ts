import { auth, defineMcp } from "@lovable.dev/mcp-js";

import getContactTool from "./tools/get-contact";
import getFaqTool from "./tools/get-faq";
import getProductTool from "./tools/get-product";
import listMarketsTool from "./tools/list-markets";

const authBaseUrl = import.meta.env["VITE_SUPABASE_URL"] as string;

export default defineMcp({
  name: "bratfein-webseite",
  title: "Bratfein Webseite",
  version: "0.1.0",
  instructions:
    "Tools zu Bratfein, Speisefett aus Schweizer Rindernierenfett, in Zürich ausgelassen und abgefüllt: Produktangaben, Markttermine, häufige Fragen und Kontakt- bzw. Bestellinfos. Zugriff nur für angemeldete Nutzer.",
  auth: auth.oauth.issuer({
    issuer: `${authBaseUrl}/auth/v1`,
    acceptedAudiences: "authenticated",
    resourceName: "Bratfein Webseite",
  }),
  tools: [getProductTool, listMarketsTool, getFaqTool, getContactTool],
});
