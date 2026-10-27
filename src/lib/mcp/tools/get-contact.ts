import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_contact",
  title: "Kontakt & Bestellung",
  description:
    "Gibt die öffentlichen Kontaktangaben von Bratfein sowie den Bestellweg per E-Mail und die Social-Media-Kanäle zurück.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const contact = {
      company: "Bratfein",
      note: "Offizielles Mini-Unternehmen von Young Enterprise Switzerland (YES)",
      email: "bratfein.zh@gmail.com",
      orderMailto:
        "mailto:bratfein.zh@gmail.com?subject=Bestellung%20Bratfein%20Schweizer%20Speisefett",
      city: "Zürich, Schweiz",
      website: "https://bratfein.lovable.app",
      social: {
        instagram: "https://www.instagram.com/bratfein.ch/",
        tiktok: "https://www.tiktok.com/@bratfein",
        youtube: "https://www.youtube.com/@bratfein_ch",
        facebook: "https://www.facebook.com/profile.php?id=61593513461142",
      },
    };
    return {
      content: [{ type: "text", text: JSON.stringify(contact, null, 2) }],
      structuredContent: contact,
    };
  },
});
