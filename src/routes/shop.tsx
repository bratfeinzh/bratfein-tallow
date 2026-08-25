import { createFileRoute } from "@tanstack/react-router";
import { Check, CreditCard, Minus, Plus } from "lucide-react";
import { useState } from "react";

import { SectionHeading } from "../components/site/SectionHeading";
import jarImage from "../assets/tallow-jar.jpg";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Bratfein Rindertalg 250 g bestellen" },
      {
        name: "description",
        content:
          "Bratfein Rindertalg im 250-g-Glas für 8–10 CHF bestellen. Abholung am Markt oder Lieferung nach Absprache, Zahlung via Twint oder bar.",
      },
      { property: "og:title", content: "Shop — Bratfein Rindertalg 250 g bestellen" },
      {
        property: "og:description",
        content: "Bestellung anfragen: 250-g-Glas Rindertalg aus Zürich, 8–10 CHF.",
      },
    ],
  }),
  component: Shop;
});

function Shop() {
  return null;
}
