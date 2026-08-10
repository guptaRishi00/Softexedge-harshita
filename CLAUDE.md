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

## Mobile rules (`/home` below `md`) — see the map's "Mobile architecture"
- **Carousels use NATIVE scroll-snap, never JS pointer dragging.** JS drag pays
  main-thread latency by construction; native scrolling runs on the compositor.
  `useMarqueeHalf` has one consumer left (`LogoCarousel`) — don't reach for it.
- **No entrance animations below `md`.** They are killed in CSS via
  `[data-no-mobile-entry]` in `globals.css`, not by gating `initial` on a
  viewport hook (that desyncs SSR from the first client render). Tag new
  entrance elements with `data-no-mobile-entry`.
- **Never gate a feature on a flag set by an async callback** (IntersectionObserver,
  `transitionend`, a "one pending rAF" guard). Three features have latched shut
  that way. Use a synchronous check at tick time, or cancel-and-rearm; prefer
  timers to `transitionend`.
- **`will-change` must be breakpoint-scoped** (`md:will-change-transform`) when
  the transform itself is desktop-only — otherwise phones hold GPU texture for
  layers that never move.
- **Verify motion structurally.** The preview pane does not composite: rAF is
  frozen and timers run ~4× slow, so transitions, framer and IntersectionObserver
  never fire there. Check computed styles / `playState` / scroll position, and
  say plainly when frame rate was not measured.
- **Test performance against a production build**, not `bun run dev` — dev ships
  ~22× more JavaScript and masks every optimisation.
