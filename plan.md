# Plan: runtime jank fixes, zero visual change

## Context (measured this session, see SESSION_LOG)
Already fixed earlier: offscreen video pause, 12→2 videos on /career, full
next/image migration, hero canvas downscale, homepage mobile nav de-blur,
hero video blur moved onto the video's own layer (found already done).
Remaining measurable costs, all main-thread or per-frame:

1. **Footer clock** — `setInterval(1000)` re-renders the entire ~150-node
   framer-motion footer subtree every second on EVERY page, constructing 4
   fresh `Intl.DateTimeFormat` per tick (~1ms measured, plus the re-render).
2. **Other-pages mobile navbar** — `page/resizable-navbar.tsx` still has the
   exact pattern removed from the homepage navbar: `backdrop-blur-md` on a
   `fixed` bar + `transition-all`, nesting over hero blurs on 15 pages.
   Mobile-only; identical to the change already approved for /home.
3. **BlogSection marquee** — `useAnimationFrame` advances the desktop track
   every frame for the page's entire lifetime, even when the section is far
   offscreen (x.set on every rAF tick).
4. **LogoLoop (hero "Trusted by" strip)** — its internal rAF velocity loop
   likewise runs forever regardless of visibility.
5. **PortfolioSection dead state** — `activeIndex` + `isDesktop` declared,
   never read (the onUpdate that used them is gone). Dead code + 2 biome
   errors; trivial removal.

Pausing an offscreen marquee is visually undetectable by definition: the
gated loops keep their position (early-return, no reset), so re-entry
continues seamlessly. Declarative framer `repeat: Infinity` marquees
(LogoCarousel, testimonials) are NOT gated — stopping those restarts their
keyframes and could visibly jump; their per-frame cost is one transform
write each. Out of scope, flagged: 49.8MB `video1.mp4` re-encode (no ffmpeg
on this machine), `SubServices` ReactLenis-per-section, portfolio chip
blurs (visible change), dev-mode overhead (prod build is the honest judge).

## Steps

| # | route | files | change | acceptance |
|---|---|---|---|---|
| 1 | sonnet | `src/components/layout/Footer.tsx` | Hoist 4 `Intl.DateTimeFormat` to module scope (one per tz, created once). Extract a leaf `<LocalTime timeZone>` client component holding the 1s interval + its own state, so the tick re-renders 4 tiny leaves instead of the whole footer. Markup/classes byte-identical. | `bunx tsc --noEmit` exit 0; grep shows formatters at module scope and no `setInterval` in `Footer()` body |
| 2 | sonnet | `src/components/page/resizable-navbar.tsx`, `src/components/page/Header.tsx` | Mirror the approved homepage fix: in `MobileNav` (:379-380) and `MobileNavHeader` only — `bg-white/90 backdrop-blur-md` → `bg-white`, `transition-all` → `transition-colors`; Header caller (:171) `transition-all` → `transition-colors`. Desktop `NavBody` (:133) and mega-menu overlay (:183) untouched. | grep: zero `backdrop-blur` inside the two Mobile components; `bunx tsc --noEmit` exit 0 |
| 3 | sonnet | `src/components/home/PortfolioSection.tsx` | Delete unused `activeIndex` state, `isDesktop`, and their now-orphaned imports (`useState` stays if still used elsewhere; `useIsDesktop` import goes). | biome no longer reports :91/:92 `noUnusedVariables`; `bunx tsc --noEmit` exit 0 |
| 4 | opus | `src/components/home/BlogSection.tsx` | Gate the `useAnimationFrame` callback with framer's `useInView` on the track's existing wrapper ref (early return when not in view; `x` untouched so position persists — no jump on re-entry). | `bunx tsc --noEmit` exit 0; code shows in-view guard as first statement of the callback |
| 5 | opus | `src/components/ui/LogoLoop.tsx` | Pause the internal rAF loop while the host is outside the viewport: one IntersectionObserver setting a ref flag, frame callback early-returns on it. Measurement (`seqWidth`/ResizeObserver) logic untouched. | `bunx tsc --noEmit` exit 0; frame callback early-returns on the visibility flag |

Routing: 3× sonnet, 2× opus, 0× driver (0% ≤ 20% budget).
Done gate: `spec-verifier` on the combined diff (workers wrote the code — the
T1 carve-out keeps the gate). Then driver runs `bunx next build` + repo biome
totals vs the 145/47 baseline.

## Constraints (echoed into every brief)
- Zero visual change (step 2's mobile nav is the one approved-precedent
  exception, identical to the /home change already shipped).
- Desktop untouched everywhere; mobile-only variants where applicable.
- Minimal diff; no reformatting; no drive-by refactors; no new deps.
- No comments that narrate the change; only why-comments where needed.
