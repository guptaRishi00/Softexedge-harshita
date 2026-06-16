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

## 2026-06-16 — AboutHeroSection carousel images: landscape + wider gap
- `about/AboutHeroSection.tsx` (`EdgeToEdgeCarousel`): images were portrait
  (`w-[78px] h-[100px]`, `md:w-[108px] md:h-[140px]`). Widened to landscape
  rectangles (~3:2, heights kept): `w-[150px]` / `md:w-[210px]`. Increased the
  inter-image gap `mr-3 md:mr-1` → `mr-4 md:mr-3`. Marquee loop (`x: 0→-50%` over
  duplicated set) unaffected — spacing is per-item and consistent.
- Verified: `npx tsc --noEmit` clean.

## 2026-06-16 — AboutHeroSection carousel: slower, smoother
- `about/AboutHeroSection.tsx` (`EdgeToEdgeCarousel`): slowed the marquee
  `duration: 40` → `65`. Kept `ease: "linear"` (correct for an infinite loop —
  easing would pulse speed at the 0→-50% boundary). Slower constant speed reads
  as smoother/calmer.
- Verified: `npx tsc --noEmit` clean.

## 2026-06-16 — AboutHero: word-by-word headline, then split
- `about/AboutHeroSection.tsx`: both headlines previously animated as whole
  lines. Split each into words (`LINE_ONE`, `LINE_TWO`) rendered as staggered
  `motion.span`s (`WORD_STAGGER = 0.18`, blur+y reveal), so words appear one by
  one across both lines (line 2 continues line 1's index). Pushed `SPLIT_DELAY`
  1.4 → 1.7 so the carousel split opens only after the last word (~1.52s) lands.
  Gradient kept per-word on line 2 (`digital`, `excellence.`).
- Verified: `npx tsc --noEmit` clean; biome shows only pre-existing findings
  (word spans use `key={word}`, no new issues).

## 2026-06-16 — About page: uniform section spacing
- Goal: equal y-axis gap between every section on `/about`. Sections render
  flush, so gap = pb(prev)+pt(next); equalised by giving every section the same
  top+bottom padding token: `py-16 md:py-24`.
- About-only sections edited directly (safe — about-only):
  - `AboutTraditional` `py-32 md:py-48` → `py-16 md:py-24`
  - `OurValuesSection` header `pt-24` → `pt-16 md:pt-24`; cards `pb-32` → `pb-16 md:pb-24`
  - `OurTeamSection` `py-20 md:pt-32` → `py-16 md:py-24`
  - `AboutHeroSection` stats `py-16` → `py-16 md:py-24` (matches hero→next gap)
- Shared sections (Testimonials, CtaSection, FaqSection, BlogSection — used on
  other pages, must not edit internals) get the same padding FORCED from the
  about page via a child-override wrapper: `[&>section]:py-16 md:[&>section]:py-24`
  (descendant selector outspecifies the section's own `py-*`). Keeps /home,
  /brand-strategy, /contact unaffected.
- Page wrappers normalised: Trusted By `py-12 md:pt-0` → `py-16 md:py-24`;
  CTA/Footer `p-3` → `px-3` (frame) + consistent vertical (`[&>section]` / `pt`).
- Verified: `npx tsc --noEmit` clean; biome only pre-existing findings. NOTE:
  not visually verified — the `[&>section]` override is page-scoped Tailwind v4.

## 2026-06-16 — About page: reduce uniform gap
- Per follow-up, reduced the spacing token `py-16 md:py-24` → `py-12 md:py-20`
  (48px/80px) across all the same spots (about-only sections, Trusted By,
  shared-section `[&>section]` overrides, footer wrapper). Still uniform.
- Verified: `npx tsc --noEmit` clean.

## 2026-06-16 — AboutHero line two: single continuous gradient
- Mapping line two per-word gave each word its own gradient (discontinuous).
  Reverted line two to one `motion.h1` with a single gradient span across
  "digital excellence." (whole-line reveal, delayed after line one's words).
  Removed the now-unused `LINE_TWO` const. Line one stays word-by-word.
- Verified: `npx tsc --noEmit` clean.

## 2026-06-16 — About page: tighten lower-cluster gaps
- Testimonials + Trusted By/LogoCarousel were already reduced to `md:py-10` (by
  user). Brought CtaSection and FaqSection wrappers down to match:
  `md:[&>section]:py-20` → `md:[&>section]:py-10`. Now Testimonials → LogoCarousel
  → CTA → FAQ all use `py-12 md:py-10`, so the gaps between them are small/even.
  (Blog/Footer still `md:py-20`/`md:pt-20`.)
- Verified: `npx tsc --noEmit` clean.
- Follow-up: reduced those four further `py-12 md:py-10` → `py-8 md:py-6`.
- Follow-up: increased only the LogoCarousel→CTA gap by raising the Trusted By
  section's bottom padding `py-8 md:py-6` → `pt-8 pb-16 md:pt-6 md:pb-16` (top
  kept, so Testimonials→LogoCarousel and CTA→FAQ gaps unchanged).

## 2026-06-16 — ExperimentalTestimonials card bg more distinct
- Card bg `bg-[#f4f4f5]` was nearly identical to the white section bg. Bumped to
  a softer off-white `bg-[#edeef2]` (hover `#ececee`→`#e4e6ec`) so cards
  differentiate from the white background while staying light/whitish. Shared
  component → applies on all pages that use it.
- Verified: `npx tsc --noEmit` clean.

## 2026-06-16 — About page: card gaps match hero image gap
- Hero image gap (reference) = `mr-4 md:mr-3` (16/12px) → target `gap-4 md:gap-3`.
- Normalised about-only card grids to match:
  - `OurValuesSection` value cards: `gap-6 lg:gap-8` → `gap-4 md:gap-3`
  - `OurTeamSection` Embla carousel: `-ml-2`/`pl-2` (8px) → `-ml-4 md:-ml-3` /
    `pl-4 md:pl-3` (16/12px)
- Left shared card components (ExperimentalTestimonials, BlogSection) unchanged —
  their card gaps live inside components used on other pages; flagged for the user.
- Verified: `npx tsc --noEmit` clean.
- Follow-up (user approved): aligned the shared card gaps too (GLOBAL — affects
  /home, /brand-strategy, /contact as well):
  - `ExperimentalTestimonials` marquee `gap-4` → `gap-4 md:gap-3`
  - `BlogSection` card track `gap-4 md:gap-8 lg:gap-5` → `gap-4 md:gap-3` AND the
    track-to-track marquee gap `gap-4 md:gap-6 lg:gap-3` → `gap-4 md:gap-3` (kept
    equal so the infinite scroll stays seamless).
- Verified: `npx tsc --noEmit` clean.

## 2026-06-16 — OurValuesSection: new icons
- Swapped the three value-card icons (lucide-react, no new dep): `Zap`→`Rocket`
  (Relentless Innovation), `Shield`→`Gem` (Uncompromising Quality),
  `Handshake`→`HeartHandshake` (Strategic Partnership). Updated import + the
  `valuesData` icon refs.
- Verified: `npx tsc --noEmit` clean; no stray old icon refs.

## 2026-06-17 — Reverse marquee/carousel direction (left→right)
- `ExperimentalTestimonials`: reversed the `scroll-x` keyframe from
  `translateX(0)→-50%` to `translateX(-50%)→0` so cards move left→right
  (still seamless via the duplicated set; hover-pause unaffected). Shared
  component → applies on all pages using it.
- `OurTeamSection`: added `direction: "backward"` to the embla
  `AutoScroll({...})` plugin (option confirmed in v8.6.0 types) so the team
  carousel scrolls left→right.
- Verified: `npx tsc --noEmit` clean.

## 2026-06-17 — About page: consistent section-description style
- Unified the two about-only section descriptions (both on black bg) to one
  style: `max-w-2xl text-lg font-light leading-[1.4em] text-white/70 md:text-xl`.
  - `AboutTraditional`: was `text-lg md:text-lg text-zinc-400 leading-[1.2em]
    max-w-4xl font-regular` (note `font-regular` is a no-op in Tailwind).
  - `OurValuesSection`: only `font-regular` → `font-light` (rest already matched).
- Left shared-component descriptions (ExperimentalTestimonials left column,
  CTA subtext) alone — different bg/narrow-column layout + used on other pages.
- Verified: `npx tsc --noEmit` clean.
- Follow-up: reduced description leading `leading-[1.4em]` → `leading-[1.2em]`
  on both (AboutTraditional, OurValuesSection).

## 2026-06-17 — Redesigned ContactHeroSection (/build)
- Rewrote `src/components/contact/ContactHeroSection.tsx` — new, more premium
  hero, design language pulled from across the project:
  - Brand gradient `#2E5BFF→#149CCB`, `premiumEase [0.16,1,0.3,1]`, eyebrow badge,
    framer-motion staggered entrance, dark card over light `#FAFAFA`, shared `Header`.
  - Split layout: LEFT = pulsing "Available for new projects" badge, big gradient
    headline ("Let's build what's next."), subline, dual CTAs (Start a project /
    Book a call), and an "Under 2 hours" response-time trust signal. RIGHT =
    interactive dark "Reach us directly" card with a **mouse-follow brand
    spotlight** (callback to CtaSection's `useMotionTemplate` technique), animated
    contact-channel rows (email/call/visit) with hover arrows, and social pills.
  - Background = CSS faint grid (radial-masked) + two soft brand-glow blobs — no
    reliance on the missing `/noise.png`; inline decorative SVG icons (aria-hidden).
  - No new deps. One scoped biome-ignore for the decorative onMouseMove card.
- Built inline (no subagents — single-component design, context already in hand).
- Verified: `npx tsc --noEmit` clean; `biome check` clean on the file;
  `next build` ✓ — /contact prerendered static, no errors.

## 2026-06-17 — ContactHeroSection: strip bg + gradient effects
- Per follow-up, removed from ContactHeroSection:
  - the boxy CSS grid background + the two brand-glow blur blobs (whole bg div);
  - the card's mouse-follow gradient spotlight (and its `useMotionValue` /
    `useMotionTemplate` / `handleMove` logic + now-unused imports + biome-ignore);
  - the card's static corner glow.
  - Kept the headline's brand text gradient (not a bg/hover effect).
- Card is now a flat dark panel on plain `#FAFAFA`; layout/content unchanged.
- Verified: `npx tsc --noEmit` clean; `biome check` clean; no leftover
  spotlight/glow/grid refs.

## 2026-06-17 — ContactHeroSection rebuilt in StrategyHeroSection mold
- Rewrote ContactHeroSection to mirror `brand-strategy/StrategyHeroSection`:
  centered full-screen white hero, `zinc-100` glow blob, absolute `Header`,
  gradient-text eyebrow ("Say hello"), giant word-staggered headline with the
  rotating image that "splits" open between words after the stagger completes
  (`onAnimationComplete` → `isExpanded`), and a bottom strip.
  - Headline: "Get In [img] Touch" / "Let's Work Together" (contact copy, short
    words to fit the 135px type, same 2+img+1 / 3-word structure as the ref).
  - Bottom strip = contact-info row (Email / Phone / Studio) instead of the
    ref's `AgencyStats` (contact-appropriate), same placement.
- Same conventions as the ref: framer stagger variants, `ease [0.16,1,0.3,1]`,
  `bg-linear-to-r` gradient, raw `<img>` rotator (matches StrategyHero/AboutHero).
- Verified: `npx tsc --noEmit` clean; `biome` only the project-wide
  `noImgElement` (same as the reference hero); `next build` ✓ /contact static.
