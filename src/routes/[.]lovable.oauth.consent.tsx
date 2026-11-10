import { useCallback, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

type AuthorizationDetails = {
  client?: { name?: string; client_name?: string; client_id?: string } | null;
  redirect_uri?: string;
  scope?: string;
  scopes?: string[];
  redirect_url?: string;
  redirect_to?: string;
};

type OAuthNamespace = {
  getAuthorizationDetails: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: unknown }>;
  approveAuthorization: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: unknown }>;
  denyAuthorization: (
    id: string,
  ) => Promise<{ data: AuthorizationDetails | null; error: unknown }>;
};

function oauthApi(): OAuthNamespace {
  return (supabase.auth as unknown as { oauth: OAuthNamespace }).oauth;
}

const scopeLabels: Record<string, string> = {
  openid: "Ihre Anmeldung bestätigen",
  email: "Ihre E-Mail-Adresse teilen",
  profile: "Ihr Basisprofil teilen",
};

const searchSchema = z.object({
  authorization_id: z.string().optional(),
});

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Zugriff freigeben | Bratfein" },
      {
        name: "description",
        content:
          "Geben Sie einer verbundenen Anwendung Zugriff auf Bratfein in Ihrem Namen.",
      },
      { property: "og:title", content: "Zugriff freigeben | Bratfein" },
      {
        property: "og:description",
        content: "Freigabe für eine verbundene Anwendung bei Bratfein.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  errorComponent: ({ error }) => (
    <Shell title="Freigabe nicht möglich">
      <p className="text-sm text-muted-foreground">
        {error instanceof Error
          ? error.message
          : "Es ist ein unerwarteter Fehler aufgetreten."}
      </p>
    </Shell>
  ),
  component: ConsentPage,
});

function Shell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-6 py-20">
      <h1 className="font-serif text-3xl text-foreground">{title}</h1>
      <div className="mt-6 space-y-4">{children}</div>
    </main>
  );
}

function ConsentPage() {
  const { authorization_id: authorizationId } = Route.useSearch();
  const [details, setDetails] = useState<AuthorizationDetails | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const fail = useCallback((message: string) => {
    setError(message);
    setStatus("error");
  }, []);

  useEffect(() => {
    let active = true;

    async function load() {
      if (!authorizationId) {
        fail("Diese Freigabe-Anfrage ist unvollständig oder abgelaufen.");
        return;
      }

      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        const next = window.location.pathname + window.location.search;
        window.location.replace(`/auth?next=${encodeURIComponent(next)}`);
        return;
      }
      if (!active) return;
      setAccount(sessionData.session.user.email ?? null);

      const { data, error: detailsError } =
        await oauthApi().getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (detailsError || !data) {
        fail("Diese Freigabe-Anfrage ist nicht mehr gültig.");
        return;
      }

      const redirect = data.redirect_url ?? data.redirect_to;
      if (redirect && !data.client) {
        window.location.replace(redirect);
        return;
      }

      setDetails(data);
      setStatus("ready");
    }

    void load();
    return () => {
      active = false;
    };
  }, [authorizationId, fail]);

  async function decide(approve: boolean) {
    if (!authorizationId) return;
    setBusy(true);
    const api = oauthApi();
    const { data, error: decideError } = approve
      ? await api.approveAuthorization(authorizationId)
      : await api.denyAuthorization(authorizationId);
    if (decideError || !data) {
      setBusy(false);
      fail(
        approve
          ? "Die Freigabe konnte nicht abgeschlossen werden."
          : "Das Ablehnen konnte nicht abgeschlossen werden.",
      );
      return;
    }
    const redirect = data.redirect_url ?? data.redirect_to;
    if (redirect) window.location.replace(redirect);
    else setBusy(false);
  }

  if (status === "loading") {
    return (
      <Shell title="Freigabe wird geladen">
        <p className="text-sm text-muted-foreground">Einen Moment bitte …</p>
      </Shell>
    );
  }

  if (status === "error") {
    return (
      <Shell title="Freigabe nicht möglich">
        <p className="text-sm text-muted-foreground">{error}</p>
      </Shell>
    );
  }

  const clientName =
    details?.client?.name ??
    details?.client?.client_name ??
    "Eine verbundene Anwendung";
  const scopes =
    details?.scopes ??
    (details?.scope ? details.scope.split(/\s+/).filter(Boolean) : []);

  return (
    <Shell title={`${clientName} mit Bratfein verbinden`}>
      {account ? (
        <p className="text-sm text-muted-foreground">
          Angemeldet als <span className="text-foreground">{account}</span>
        </p>
      ) : null}
      {details?.redirect_uri ? (
        <p className="text-sm text-muted-foreground">
          Weiterleitung an{" "}
          <span className="text-foreground break-all">
            {details.redirect_uri}
          </span>
        </p>
      ) : null}
      <p className="text-sm text-muted-foreground">
        Damit kann {clientName} die freigegebenen Bratfein-Funktionen in Ihrem
        Namen nutzen, solange Sie angemeldet sind.
      </p>
      {scopes.length > 0 ? (
        <ul className="space-y-1 text-sm text-muted-foreground">
          {scopes.map((scope) => (
            <li key={scope}>
              •{" "}
              {scopeLabels[scope] ?? `Zusätzliche Berechtigung: ${scope}`}
            </li>
          ))}
        </ul>
      ) : null}
      <p className="text-sm text-muted-foreground">
        Die Berechtigungen und Schutzregeln von Bratfein bleiben davon
        unberührt.
      </p>
      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <Button
          type="button"
          className="sm:flex-1"
          onClick={() => decide(true)}
          disabled={busy}
        >
          Zugriff erlauben
        </Button>
        <Button
          type="button"
          variant="outline"
          className="sm:flex-1"
          onClick={() => decide(false)}
          disabled={busy}
        >
          Verbindung abbrechen
        </Button>
      </div>
    </Shell>
  );
}
