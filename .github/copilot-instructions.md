# GitHub Copilot Instructions for Sundawa Web

This repository follows strict architectural rules and development guidelines detailed in [AGENTS.md](/AGENTS.md) and [.github/agents/sundawa-web.agent.md](/.github/agents/sundawa-web.agent.md).

## Quick Reference Rules

1. **Feature-First Architecture**:
   - Feature components live in `src/features/<feature>/components/`.
   - Shared cross-cutting UI components live in `src/shared/ui/`.
   - Never create or use a root-level `components/` directory.
   - Public feature exports must go through `src/features/<feature>/index.ts`.

2. **Server vs. Client Components**:
   - Default to React Server Components.
   - Only add `"use client"` when component state, lifecycle hooks, browser DOM APIs, or Framer Motion animation engines are strictly required.

3. **Internationalization (i18n)**:
   - All user-facing strings must use `next-intl` and exist in both `messages/id.json` and `messages/en.json`.
   - Always maintain 100% key parity between English and Indonesian message files.
   - Always import routing utilities (`Link`, `useRouter`, `usePathname`, `redirect`) from `@/src/i18n/navigation`.

4. **Sanity CMS & Data Fetching**:
   - Centralize GROQ queries in `lib/Queries.ts`.
   - Perform all data fetching in `src/features/blog/data.ts` using React `cache()`.
   - Never call `client.fetch()` directly in page components.
   - Validate data with `isPost` from `lib/types.ts`.

5. **Outsource Calculator Domain**:
   - Business calculations for talent rates, modes, and cart items reside in `src/features/outsource/domain.ts` and must be tested in `src/features/outsource/domain.test.ts`.

6. **Quality Gate & Windows CLI**:
   - On Windows, always use `npm.cmd` (e.g. `npm.cmd run check`).
   - Run `npm.cmd run check` before concluding any task to verify `lint`, `typecheck`, and `test`.

