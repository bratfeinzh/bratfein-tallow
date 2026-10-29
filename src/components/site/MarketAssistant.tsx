import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { Loader2, Send, Sparkles } from "lucide-react";

const examples = [
  "Wann sind Sie in Bassersdorf?",
  "Wo genau steht der Stand in Wallisellen?",
  "Wie kann ich ein Glas vorbestellen?",
];

// Renders [text](url) links and line breaks from the assistant answer.
function renderAnswer(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(((?:https?:|mailto:)[^)\s]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[3]) parts.push(<strong key={i++}>{m[3]}</strong>);
    else
      parts.push(
        <a
          key={i++}
          href={m[2]}
          className="font-semibold text-copper underline underline-offset-4 hover:text-accent"
          {...(m[2]?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {m[1]}
        </a>,
      );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export function MarketAssistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  async function ask(q: string) {
    const text = q.trim();
    if (!text || loading) return;
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setAnswer("");
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/market-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Die Antwort konnte nicht geladen werden.");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const l of lines) {
          if (!l) continue;
          const msg = JSON.parse(l) as { t: string; v: string };
          if (msg.t === "text") setAnswer((a) => a + msg.v);
          else if (msg.t === "error") setError(msg.v);
        }
      }
    } catch (e) {
      if (!ctrl.signal.aborted) setError(e instanceof Error ? e.message : "Unbekannter Fehler.");
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void ask(question);
  }

  return (
    <section aria-labelledby="markt-assistent" className="mt-16 gilded rounded-sm bg-card px-6 py-8 md:px-10">
      <p className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-copper">
        <Sparkles className="size-4" strokeWidth={1.75} /> KI-Markt-Assistent
      </p>
      <h2 id="markt-assistent" className="mt-3 text-2xl text-foreground md:text-3xl">
        Fragen zu unseren Märkten?
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Stellen Sie Ihre Frage – der Assistent antwortet mit Terminen, Orten und dem Link zur Vorbestellung.
      </p>

      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label htmlFor="market-question" className="sr-only">
          Ihre Frage
        </label>
        <input
          id="market-question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          maxLength={500}
          placeholder="z. B. Wann kann ich in Wallisellen vorbeikommen?"
          className="flex-1 rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-copper focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-accent disabled:opacity-50"
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
          Fragen
        </button>
      </form>

      <div className="mt-3 flex flex-wrap gap-2">
        {examples.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => {
              setQuestion(ex);
              void ask(ex);
            }}
            className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-copper hover:text-foreground"
          >
            {ex}
          </button>
        ))}
      </div>

      {(answer || loading || error) && (
        <div aria-live="polite" className="mt-6 border-l-2 border-copper/50 pl-5 text-sm leading-relaxed text-foreground">
          {answer ? (
            <p className="whitespace-pre-line">{renderAnswer(answer)}</p>
          ) : loading ? (
            <p className="text-muted-foreground">Antwort wird erstellt …</p>
          ) : null}
          {error && <p className="mt-2 text-destructive">{error}</p>}
        </div>
      )}
    </section>
  );
}
