# UI Primitives

The Next.js template uses shadcn-style React primitives under `src/components/ui`.

- `button.tsx` is the canonical button API. Use `ButtonLink` from `button-link.tsx` for Next.js routing.
- `badge.tsx`, `card.tsx`, `accordion.tsx`, `pagination.tsx`, and `dropdown-menu.tsx` are themed with Makers Den CSS variables from `src/styles/globals.css`.
- Storyblok block components should keep `storyblokEditable()` on the outer editable element when wrapping content with UI primitives.
- Do not import from the removed `src/components/button` or `src/components/pill` directories.

Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` after changing shared primitives.
