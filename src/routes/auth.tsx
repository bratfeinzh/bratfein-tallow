import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const searchSchema = z.object({
  next: z.string().optional(),
});

function safeNext(next?: string) {
  if (!next) return "/";
  if (!next.startsWith("/") || next.startsWith("//")) return "/";
  return next;
}

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Anmelden | Bratfein" },
      {
        name: "description",
        content:
          "Melde dich bei Bratfein an, um deinen Zugang für verbundene Anwendungen freizugeben.",
      },
      { property: "og:title", content: "Anmelden | Bratfein" },
      {
        property: "og:description",
        content: "Anmeldung für Bratfein – Schweizer Speisefett aus Zürich.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const target = safeNext(next);

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (active && data.session) window.location.replace(target);
    });
    return () => {
      active = false;
    };
  }, [target]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage(null);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}${target}`,
          },
        });
        if (error) throw error;
        if (!data.session) {
          setMessage(
            "Fast fertig: Bitte bestätige deine E-Mail-Adresse über den Link, den wir dir geschickt haben.",
          );
          return;
        }
        window.location.replace(target);
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      window.location.replace(target);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Anmeldung nicht möglich. Bitte versuche es nochmals.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    setMessage(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}${target}`,
    });
    if (result.error) {
      setMessage("Anmeldung mit Google nicht möglich.");
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    window.location.replace(target);
  }

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-6 py-20">
      <h1 className="font-serif text-3xl text-foreground">
        {mode === "signin" ? "Anmelden" : "Konto erstellen"}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Für die Freigabe von Bratfein-Zugängen an verbundene Anwendungen.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-Mail</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Passwort</Label>
          <Input
            id="password"
            type="password"
            autoComplete={
              mode === "signin" ? "current-password" : "new-password"
            }
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={busy}>
          {mode === "signin" ? "Anmelden" : "Registrieren"}
        </Button>
      </form>

      <Button
        type="button"
        variant="outline"
        className="mt-4 w-full"
        onClick={handleGoogle}
        disabled={busy}
      >
        Weiter mit Google
      </Button>

      {message ? (
        <p className="mt-6 text-sm text-muted-foreground">{message}</p>
      ) : null}

      <button
        type="button"
        className="mt-8 text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground"
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
      >
        {mode === "signin"
          ? "Noch kein Konto? Jetzt registrieren"
          : "Bereits registriert? Zur Anmeldung"}
      </button>
    </main>
  );
}
