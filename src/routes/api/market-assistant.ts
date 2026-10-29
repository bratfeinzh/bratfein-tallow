import { createFileRoute } from "@tanstack/react-router";

import { handleMarketQuestion } from "@/lib/ai/market-assistant.server";

export const Route = createFileRoute("/api/market-assistant")({
  server: { handlers: { POST: ({ request }) => handleMarketQuestion(request) } },
});
