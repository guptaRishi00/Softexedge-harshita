# Plan: Fix invisible mobile hero + strip animations on mobile (desktop identical)

**Task:** (a) Hero section invisible on mobile — fix. (b) On mobile, remove the
animations; simple + responsive. Desktop view/animations byte-identical.

**Diagnosis (driver):**
- **Hero bug:** `Herosection` root is `relative lg:min-h-[96.5vh]` with ALL
  children absolutely positioned → below `lg` the element has **0 height** and
  renders as an invisible strip. (Broken on tablet too.)
- **Animations on mobile:** page-level GSAP (about pin+scale/fade, service
  scale/rotate scrub), Lenis smooth-scroll, and PortfolioSection's pinned
  500vw horizontal scroll + cursor + text reveals all run unchanged on phones.

**Interpretation (approve/adjust):** "remove the animations" = the heavy
scroll-jacking/transform animations (pin, scrub scale/rotate, horizontal
scroll, Lenis). Lightweight entrance fades / marquees / card cycling stay (they
don't hurt, and stripping framer-motion everywhere would be a huge diff).
Mechanism: `gsap.matchMedia("(min-width: 768px)")` so mobile never creates the
animations; desktop code path identical.

## Steps

| # | Step | Files | Route | Acceptance check |
|---|---|---|---|---|
| 1 | **Hero visibility.** Root `relative lg:min-h-[96.5vh]` → `relative min-h-[100svh] lg:min-h-[96.5vh]` (base full-viewport hero; lg value unchanged → desktop identical). | `src/components/home/Herosection.tsx` | **sonnet** | tsc clean; grep `min-h-[100svh] lg:min-h-[96.5vh]` |
| 2 | **page.tsx GSAP desktop-only.** Inside the existing `useGSAP`, wrap BOTH animation blocks in `const mm = gsap.matchMedia(); mm.add("(min-width: 768px)", () => { ...both blocks... });` + cleanup `return () => mm.revert()`. No JSX changes. | `src/app/home/page.tsx` | **sonnet** | tsc clean; grep matchMedia; JSX hash unchanged |
| 3 | **Native scroll on mobile.** In `SmoothScroll`, if `window.matchMedia("(max-width: 767px)").matches`: skip Lenis + ticker entirely, but KEEP plugin registration + the delayed `ScrollTrigger.refresh()` + its cleanup. Desktop path byte-identical. | `src/components/layout/SmoothScroll.tsx` | **sonnet** | tsc clean; grep for the guard |
| 4 | **Portfolio: simple vertical stack on mobile.** (a) Wrap the ENTIRE `useGSAP` body (cursor, horizontal-scroll pin, text reveals) in `gsap.matchMedia().add("(min-width: 768px)")` + revert cleanup. (b) Layout: section `h-screen` → `h-auto md:h-screen`; track: drop the inline `width: N*100vw` style, className `flex h-full` → `flex w-full flex-col md:h-full md:w-max md:flex-row` (w-max × w-screen panels = same N·100vw on desktop); panels `h-screen w-screen` → `h-[70svh] w-full md:h-screen md:w-screen`. Desktop computed layout identical (w-max of N w-screen children ≡ 500vw). | `src/components/home/PortfolioSection.tsx` | **opus** | tsc+biome clean; greps for matchMedia + new classes + no inline width |

Routing: 3 sonnet, 1 opus, **0 driver**. Steps 1–3 parallel (disjoint files);
step 4 parallel too (own file). Driver verifies every diff.

## Done gate
- tsc + biome clean; `next build` ✓ /home; SSR /home greps (hero min-h, portfolio
  classes, matchMedia strings in payload where visible).
- Desktop-equivalence review per hunk (md+/lg unchanged; GSAP blocks byte-moved
  into mm callbacks, not edited).
- `spec-verifier` over plan + diff; P0/P1 fixed, max 3 rounds.

Note: SmoothScroll + Header are shared but home-only per the map (`SmoothScroll`
wraps only /home). Portfolio/page/hero are home-specific.
