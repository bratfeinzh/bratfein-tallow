<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep public market facts in `src/lib/markets.ts` for both the location page and MCP listings, so confirmed venues and unknown selling hours stay consistent.
- The locations route uses explicit calendar-date and selling-hour fields from the shared market array; filter past dates using the Europe/Zurich calendar and initialize the client date from route loader data to avoid hydration differences.
- The Standorte AI assistant builds its prompt from `src/lib/markets.ts` server-side (`src/lib/ai/market-assistant.server.ts`, route `/api/market-assistant`), so answers never drift from the published market facts.
- Keep confirmed product facts (jar sizes, weights, prices) in `src/lib/product.ts`; pages, MCP tools and the AI assistant read them from there so quantities and prices never drift apart.
- Legal content routes reuse LegalPage and have leaf metadata and entries in the custom sitemap, so legal pages match the existing presentation and remain discoverable.
