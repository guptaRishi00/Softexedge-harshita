@AGENTS.md

## Codebase map
Read `.claude/CODEBASE_MAP.md` first — it covers stack, routes, commands, and
gotchas so you don't have to re-explore.

## Hard rules
- **Next.js 16 / React 19 are not what you may know.** Per AGENTS.md, read the
  relevant guide in `node_modules/next/dist/docs/` before writing Next.js code;
  heed deprecation notices.
- **Lint/format with Biome** (`bun run lint`, `bun run format`) — not ESLint.
- **Don't create "parked" dead components** — the old `src/components/garbage/` graveyard (deleted 2026-07-24) is not a pattern to revive; unused code gets removed, not stored.
- **Navigation is duplicated** — `layout/Header` serves `/home` only; `page/Header`
  serves every other page. Check the map before editing either.
- **The 8 service pages have their own copies of every section** (CtaSection,
  SubServices, ProcessSection, OurTechStack, ProjectShowcase, FaqSection,
  StrategyHeroSection, AgencyStats — 64 files). Editing one changes ONE page;
  a site-wide change means 8 files. Always confirm the intended scope first.
- **No `test` or `typecheck` script exists** — use `bunx tsc --noEmit`.
- **Use `next/image`, never a raw `<img>`.** The migration is complete (`grep "<img" src/` is 0); new remote hosts must be added to `next.config.ts` `remotePatterns` or they throw at runtime.
- **Every `<video>` is globally paused offscreen** by `ui/VideoViewportPause` (mounted in `layout.tsx`). Never assume an `autoPlay` video keeps running offscreen; if you drive a canvas from a video, guard the `"play"` handler with `cancelAnimationFrame` — it now fires on every resume.
