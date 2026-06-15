# Session Log

## 2026-06-15 — New logo carousel on About page
- Replaced `LogoLoop` marquee on `/about` with a new **spotlight carousel**.
- Added `src/components/ui/LogoCarousel.tsx` (framer-motion, already a dep): a
  glowing highlight auto-advances through logos (active = full colour + scaled,
  others muted/grayscale); hover/focus selects an item and pauses auto-advance;
  active item reveals its title. Accepts `{ node, title?, href? }[]` (same shape
  as the page's existing `techLogos`), so the page change was minimal.
- Edited `src/app/about/page.tsx`: swapped import + the "Trusted By" section
  markup (now a centered column instead of the inline rule + marquee).
- Verified: `npx tsc --noEmit` clean; `@biomejs/biome check` clean on the new
  component. About page's remaining biome warnings (`type Props = {}`,
  empty pattern) are pre-existing debt, left untouched.
- Note: use `npx @biomejs/biome ...`, NOT `npx biome` (latter installs a wrong
  unrelated `biome@0.3.3` package).

## 2026-06-15 — Balance ExperimentalTestimonials layout
- `src/components/home/ExperimentalTestimonials.tsx`: design unchanged, only
  rebalanced the layout to match sibling sections' conventions.
  - Added `max-w-[1400px]` to the inner wrapper so it no longer stretches
    edge-to-edge on wide screens (every other section uses `mx-auto max-w-[1400px]`).
  - Section padding `py-12 md:py-0` → `py-16 md:py-24` for consistent vertical rhythm.
  - Column split: right marquee `lg:w-[67%]` → `lg:flex-1` (left stays `lg:w-1/3`
    shrink-0) and gap `lg:gap-4` → `lg:gap-12`, fixing the >100% width+gap overflow.
- Verified: `npx tsc --noEmit` clean. Biome findings in this file (unused imports,
  svg-without-title, button type, array-index key) are all on unchanged lines —
  pre-existing debt, left untouched per minimal-diff.

## 2026-06-15 — Revert testimonials vertical padding
- Per follow-up, reverted the section's y-axis padding back to the original
  `py-12 md:py-0` (had bumped it to `py-16 md:py-24`). The `max-w-[1400px]`
  container and column-balance changes from the prior entry are kept.
- Verified: `npx tsc --noEmit` clean.

## 2026-06-15 — Restore testimonials horizontal spacing
- Per follow-up, restored the wrapper's x-axis framing to the original: removed
  `max-w-[1400px]`, and reverted `gap-10 → gap-8` and `lg:gap-12 → lg:gap-4`
  (`px-6` was never changed). Wrapper now matches its pre-balance className.
- Kept only the column-overflow fix: right marquee stays `lg:flex-1` (was the
  original `lg:w-[67%]`, which summed >100% with the gap).
- Verified: `npx tsc --noEmit` clean.

## 2026-06-15 — Testimonials marquee bleeds to right edge
- `ExperimentalTestimonials.tsx`: added `-mr-6` to the right marquee column so it
  cancels the wrapper's `px-6` right padding and reaches the extreme right
  viewport edge (no right padding). Section's existing `overflow-hidden` clips
  the bleed, so no horizontal scrollbar. Left column / left padding unchanged.
- Verified: `npx tsc --noEmit` clean.

## 2026-06-15 — Rotating headline word slides horizontally
- `ExperimentalTestimonials.tsx`: the rotating gradient word ("Collective" →
  "Visionaries" …) animated on the Y axis (`y: 40 → 0 → -40`). Switched to X axis
  (`x: 40 → 0 → -40`) so it now slides horizontally. Added `whitespace-nowrap`
  to the word so it can't wrap while offset.
- Verified: `npx tsc --noEmit` clean.

## 2026-06-15 — Testimonial cards: light bg + box texture
- `ExperimentalTestimonials.tsx`: changed cards from near-black `bg-[#100F0F]` to
  one-shade-darker-than-white `bg-[#f4f4f5]` (hover `#ececee`), and added a subtle
  box-grid texture via inline `backgroundImage` (two 1px rgba(0,0,0,0.045) gradients,
  `backgroundSize: 26px`).
- Flipped foregrounds for legibility on the light bg: borders `white/*`→`black/*`,
  quote icon `white/5`→`black/10`, quote text & name `text-white`→`text-zinc-900`,
  avatar `text-zinc-300`→`text-zinc-700` w/ black tints, role `zinc-400`→`zinc-500`.
- Verified: `npx tsc --noEmit` clean.

## 2026-06-15 — CtaSection spotlight: make revealed bg more visible
- `brand-strategy/CtaSection.tsx`: reduced the two blending overlays inside the
  masked spotlight layer so the revealed grid shows more fully. Gradient
  `from-black/60 via-black/20 to-black/80` → `from-black/25 via-black/5 to-black/30`;
  radial vignette `opacity-60` → `opacity-25`.
- Verified: `npx tsc --noEmit` clean.

## 2026-06-15 — CtaSection spotlight: larger area
- `brand-strategy/CtaSection.tsx`: increased the spotlight mask radius from
  `400px` → `600px` (both `WebkitMaskImage` and `maskImage`).
- Verified: `npx tsc --noEmit` clean.

## 2026-06-15 — SubServices (brand-strategy "Our Services") overhaul
- `brand-strategy/SubServices.tsx`, five changes:
  1. Added an eyebrow tag ("What We Offer") above the "Our Services" title
     (plain pill: `border border-white/15`, no gradient).
  2. Cards recoloured `bg-[#100F0F]` → `bg-black` (data `color` field, ×4).
  3. Fixed last-card overlap: the sticky cards pin at increasing `top`
     (`5vh + i*130px`) but heights were content-driven (`min-h-[50vh]`), so a
     taller earlier card poked below the last card. Gave cards a uniform desktop
     height (`md:h-[600px] md:min-h-0`) + `overflow-hidden` + explicit `zIndex: i`
     so earlier cards always end above later ones (no poke-through).
  4. Dimming is now hover-driven instead of scroll-driven: removed
     `useScroll`/`useTransform`; added `hovered` state in `SubServices`, passed to
     `Card`. Initially all cards normal; hovering one dims the rest to 0.4
     (framer `animate`). Added a scoped biome-ignore for the wrapper's hover
     handlers (decorative; inner `<a>` carries keyboard/semantics).
  5. Removed gradient border from the card tags — now simple
     `border border-white/15 bg-white/5` pills.
- Verified: `npx tsc --noEmit` clean; biome on the file shows only the 4
  pre-existing findings (noExplicitAny, noImgElement, 2× array-index key),
  unchanged from before — no new issues introduced.

## 2026-06-15 — SubServices: drop hover-dim, cards always full opacity
- Per follow-up, removed the hover-driven opacity entirely (it read as buggy on
  the black-on-black stack). Cards are now always opacity 100.
- Removed `hovered` useState + props, `isDimmed`, the wrapper's
  onMouseEnter/Leave + its biome-ignore, and the framer-motion usage
  (`motion.div` → plain `div`, dropped the `framer-motion` and `useState`
  imports). Stacking (sticky + zIndex + uniform desktop height) and all styling
  unchanged.
- Verified: `npx tsc --noEmit` clean; biome shows only the 4 pre-existing
  findings — the prior `noStaticElementInteractions` (and its suppression) are gone.

## 2026-06-15 — Eyebrow tags on Process / Tech Stack / Projects
- Replicated the SubServices eyebrow tag (wrap title in `flex flex-col gap-5`
  with a plain `span` `text-xs uppercase tracking-[0.25em] text-white/60`) in
  three brand-strategy sections:
  - `ProcessSection.tsx` → "How We Work" above "Our Process"
  - `OurTechStack.tsx` → "Our Toolkit" above "Our Tech Stack"
  - `ProjectShowcase.tsx` → "Selected Work" above "Our Projects"
- Verified: `npx tsc --noEmit` clean; biome shows only pre-existing findings
  (img elements, array-index keys) — the added div+span introduce none.
