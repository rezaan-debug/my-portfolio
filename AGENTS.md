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

# Project notes

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history.

## Architecture rules

- All portfolio content (profile, skills, projects, experience, education, contact) lives in a single source of truth: `src/lib/portfolio.ts`. Pages, Zarney's AI system prompt, and the public MCP server all read from it — update content there only.
- Zarney (AI assistant) calls the Lovable AI Gateway inside a server function (`src/lib/zarney.functions.ts`); the API key is server-side only and the model is grounded strictly on portfolio content with anti-fabrication instructions.
- The public read-only MCP server lives at `src/routes/api/public/mcp.ts` (streamable-HTTP JSON-RPC 2.0); it must stay read-only and derive all data from `portfolio.ts`.
- Design tokens (teal + pink brand, #A02B93 primary) are defined in `src/styles.css`; never hardcode raw color classes in components.
- Theme is light by default, applied pre-paint by an inline script in `src/routes/__root.tsx` (see `src/lib/theme.tsx`); theme and surface transitions use 0.6s.
- Content rules: never invent employers, clients, projects, awards, testimonials, certifications, statistics, metrics, dates, or qualifications. Placeholder profile photo must be clearly marked until Rezaan provides a real one.
