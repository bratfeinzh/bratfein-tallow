import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

import { markets } from "../markets";

const GATEWAY = "https://ai.gateway.lovable.dev/v1";
const MODEL = "openai/gpt-6-astra";
const PREORDER = "mailto:bratfein.zh@gmail.com?subject=Vorbestellung%20Markt";

function buildInstructions() {
  const list = markets
    .map(
      (m) =>
        `- ${m.place}: ${m.date}, Zeit: ${m.time}, Ort: ${m.location}, Veranstalter-Infos: ${m.source}`,
    )
    .join("\n");
  return `Du bist der freundliche Markt-Assistent von Bratfein, einem YES-Schülerunternehmen aus Zürich, das Schweizer Speisefett aus Nierenfett vom Rind in zwei Grössen verkauft: 330-ml-Glas (275 g) für 12 CHF und 205-ml-Glas (165 g) für 9 CHF.
Beantworte Fragen zu Märkten und Verkaufsstandorten ausschliesslich anhand dieser bestätigten Angaben:
${list}
Vorbestellung zur Abholung am Markt: per E-Mail an bratfein.zh@gmail.com (Link: ${PREORDER}). Zahlung via Twint, Karte oder bar.
Regeln:
- Antworte kurz auf Schweizer Hochdeutsch (immer "ss", nie "ß"), in Sie-Form.
- Nenne passende Termine, Orte und Zeiten und füge den Vorbestell-Link als Markdown-Link [Jetzt vorbestellen](${PREORDER}) sowie bei Bedarf den Veranstalter-Link hinzu.
- Verwende ausschliesslich die oben aufgeführten Daten der Standorte-Seite. Kein Allgemeinwissen, keine Annahmen.
- Erfinde niemals Termine, Adressen, Zeiten oder weitere Märkte. Ist etwas unbekannt oder bist du unsicher, sag das ehrlich und verweise auf bratfein.zh@gmail.com oder Instagram @bratfein.ch (https://www.instagram.com/bratfein.ch/).
- Bei Fragen ausserhalb von Märkten und Standorten verweise freundlich auf bratfein.zh@gmail.com.`;
}

export async function handleMarketQuestion(request: Request): Promise<Response> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) return Response.json({ error: "KI ist nicht konfiguriert." }, { status: 500 });

  let question = "";
  try {
    const body = (await request.json()) as { question?: unknown };
    question = typeof body.question === "string" ? body.question.trim() : "";
  } catch {
    /* handled below */
  }
  if (!question || question.length > 500) {
    return Response.json({ error: "Bitte eine Frage mit höchstens 500 Zeichen eingeben." }, { status: 400 });
  }

  const provider = createOpenAI({
    baseURL: GATEWAY,
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });

  const result = streamText({
    model: provider.responses(MODEL),
    instructions: buildInstructions(),
    messages: [{ role: "user", content: question }],
    abortSignal: request.signal,
    maxRetries: 0,
    providerOptions: {
      openai: {
        forceReasoning: true,
        reasoningEffort: "low",
        reasoningSummary: "auto",
        store: false,
        include: ["reasoning.encrypted_content"],
      },
    },
  });

  const encoder = new TextEncoder();
  const line = (o: unknown) => encoder.encode(JSON.stringify(o) + "\n");
  const body = new ReadableStream({
    async start(controller) {
      try {
        for await (const part of result.fullStream) {
          if (part.type === "text-delta") controller.enqueue(line({ t: "text", v: part.text }));
          else if (part.type === "error") {
            controller.enqueue(line({ t: "error", v: friendlyError(part.error) }));
          }
        }
      } catch (error) {
        if (!request.signal.aborted) controller.enqueue(line({ t: "error", v: friendlyError(error) }));
      }
      controller.close();
    },
  });

  return new Response(body, {
    headers: { "Content-Type": "application/x-ndjson", "Cache-Control": "no-cache, no-transform" },
  });
}

function friendlyError(error: unknown): string {
  const status = (error as { statusCode?: number })?.statusCode;
  console.error("market assistant error", status, error);
  if (status === 429) return "Gerade sind viele Anfragen unterwegs. Bitte versuchen Sie es in einer Minute erneut.";
  if (status === 402 || status === 403) return "Der Assistent ist momentan nicht verfügbar. Schreiben Sie uns an bratfein.zh@gmail.com.";
  return "Die Antwort konnte nicht geladen werden. Bitte später erneut versuchen.";
}
