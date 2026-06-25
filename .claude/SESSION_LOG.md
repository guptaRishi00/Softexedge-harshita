# Session Log

## 2026-06-18 — New "Find Your Career" section (career page)
- Added `src/components/career/OpenPositions.tsx` — an accordion job board
  matching the supplied mockup: a "Find Your Career" title, a search/category/
  filters control bar, and expandable job rows (divider-separated). Each row
  shows title + blurb + meta (`Full-time · Remote`) and a dark "Read More" pill;
  expanding reveals About the Role, a two-column layout (Key Responsibilities +
  Why Work With Us | Requirements + Good to Have), and a blue "Apply Job" button.
- Accordion: one row open at a time; first row open by default (as in the image).
  Search filters by title/blurb; category select filters by `job.category`;
  Filters badge shows the result count. lucide icons (Search, ChevronDown,
  SlidersHorizontal, ArrowUpRight); framer height-auto expand.
- Section uses `px-6 py-20 md:py-28` to match WhyJoinUs; internal grid gaps are a
  uniform `gap-10` (x = y) per the "consistent x/y gap" ask.
- Wired into `src/app/career/page.tsx` below `<WhyJoinUs />`.
- Verified: `npx tsc --noEmit` clean; biome clean (formatted); `next build` ✓
  /career static.

## 2026-06-18 — ApplicationJourney: refine layout, balance & spacing
- Each sticky deck card was left-heavy: a giant watermark number clipped in the
  corner + an invisible hover-only "right graphic", so the right side read as empty.
  Rebuilt each card as a balanced two-part row — constrained left column
  (`max-w-xl`: branded icon box, title, description) ↔ a clean in-flow gradient
  step number on the right (`bg-clip-text` brand gradient, `opacity-20`). Removed
  the absolute watermark, the hover graphic, and the now-dead `group`/group-hover.
- Constrained the section content to `max-w-5xl` so cards aren't full-width — on
  wide screens the left text and right number were flung to opposite edges with a
  big empty middle; now they read as a balanced pair.
- Spacing pass: title block `mb-16 md:mb-32` → `md:mb-24` + `max-w-3xl` centered;
  card `md:p-16` → `md:p-14` with `gap-10 md:gap-16`; even internal rhythm
  (icon `mb-7`, title `mb-4`, description `text-base md:text-lg`); softer entrance
  (`y:100` → `y:40`).
- Fixed headline typo "Journeyy" → "Journey". Sticky-deck mechanics (top/zIndex)
  unchanged. Kept the subtle card hover-shadow (not a balance issue).
- Verified: `npx tsc --noEmit` clean; biome clean; `next build` ✓ /career static.

## 2026-06-18 — OurValuesSection: CTA transparent + "Connect With Us"
- CTA button: removed `bg-white` so it has no background initially (transparent on
  the dark quote card), hover now adds `border-white` only (dropped `hover:bg-zinc-200`).
- Text "Learn about our culture" → "Connect With Us"; text color `text-black` →
  `text-white` (visible on transparent/dark). Arrow box flipped `bg-black text-white`
  → `bg-white text-black` so it stays visible without the button bg. Matches the
  brand-strategy transparent Connect button look.
- Verified: `npx tsc --noEmit` clean; biome clean; `next build` ✓ /about static.

## 2026-06-18 — OurValuesSection: clip-path with rounded edges
- Follow-up: swapped the sharp chamfer `polygon()` for a rounded clip — `clip-path:
  inset(0 round 5rem 1.5rem 5rem 1.5rem)` (heavy radius TL+BR, subtle TR+BL → an
  asymmetric rounded shape, edges round not cut). `polygon()` can't do rounded
  corners; `inset(round)` can, is responsive (rem), and is well-supported.
- Verified: `npx tsc --noEmit` clean; biome clean; `next build` ✓ /about static.

## 2026-06-18 — OurValuesSection: left image div uses clip-path
- Redesigned the left image container with a `clip-path` chamfered-corner polygon
  (45° cuts on top-left + bottom-right via `calc()`/rem so the angle is consistent
  across the portrait and `lg:h-[800px]` sizes), replacing `rounded-[2.5rem]`.
- Dropped the `border-white/10` and `shadow-2xl` (both render poorly on a clipped
  element — clipped border edges / clipped box-shadow); the clip shape now defines
  the silhouette. Overlay + Image still clip to the polygon.
- Verified: `npx tsc --noEmit` clean; biome clean; `next build` ✓ /about static.

## 2026-06-18 — OurValuesSection: redesigned to "Our Culture" layout
- Redesigned to match the reference: two-column — left big rounded image
  (`aspect-[4/5] lg:h-[800px]`), right column with "● Our Culture" eyebrow, large
  headline, paragraph, and a quote card (quote + avatar/name/role + CTA).
- Kept the proximity-glow grid background pattern (Cell grid + `bg-black/55` veil)
  exactly as-is.
- Project colors instead of the reference's lime-green card: dark `bg-zinc-950`
  card with brand-blue quote mark (`#2E5BFF`) — respects the no-bg-gradient pref.
- CTA reuses the ExperimentalTestimonials "Connect With Us" button (white pill,
  black arrow box, dual MdArrowOutward + gradient on the 2nd via unique
  `culture-icon-grad` id), labelled "Learn about our culture".
- Fixes this pass: restored the section's `noStaticElementInteractions`
  biome-ignore (lost in the redesign) + formatting. Assets confirmed present.
- Verified: `npx tsc --noEmit` clean; biome clean; `next build` ✓ /about static.

## 2026-06-18 — ApplicationJourney: image style match SubServices
- Image was full-bleed in the right grid cell; changed to SubServices' inset
  rounded-box style: `relative h-[350px] w-full overflow-hidden rounded-2xl
  md:h-[450px]` with `object-cover`.
- To inset it, added card padding (`p-6 md:p-8 lg:p-10`) + column gap
  (`gap-6 md:gap-10`) + `md:items-center`; dropped the card's `overflow-hidden`
  and fixed `md:h-[440px]` (card now sizes to the image box + padding, uniform
  across cards). Sticky-stacking deck + text-left layout unchanged.
- Verified: `npx tsc --noEmit` clean; biome only tolerated `noImgElement`;
  `next build` ✓ /career static.

## 2026-06-18 — ApplicationJourney: split cards + scroll-stacking deck
- Reworked the step cards into a sticky scroll-stacking deck (same pattern as
  SubServices): each card is `sticky` with `top: calc(8vh + index*2.5rem)` and
  increasing `zIndex`, plus a `h-[30vh]` runway so the last card stays pinned.
- Each card is now a 2-column split: title + description (left, vertically
  centered) and the image (right, `md:h-full object-cover`). `md:grid-cols-2
  md:h-[440px]`, solid `bg-white` + border + `overflow-hidden` so stacked cards
  cover cleanly.
- Re-added the `image` field (interface + 4 verified Unsplash URLs). Robust img
  stacking (no negative z; image is a normal grid cell).
- Verified: `npx tsc --noEmit` clean; biome only tolerated `noImgElement`;
  `next build` ✓ /career static.

## 2026-06-18 — ApplicationJourney: REVERTED image-based cards
- Per request, reverted the "image-based cards" task: removed the `image` field
  (interface + the 4 Unsplash URLs) and restored the plain white bordered cards
  (`bg-white border-zinc-200`, title left + description right, dark text). Back to
  the state from the "simplify cards / no overlap" task.
- Verified: no image/img refs remain; `npx tsc --noEmit` clean; biome clean;
  `next build` ✓ /career static.

## 2026-06-18 — ApplicationJourney: image-based cards
- Made the step cards image-based (same robust pattern as CareerValues): added an
  `image` field to Step (interface + data, 4 verified Unsplash URLs → 200). Each
  card is now `relative min-h-[300px] md:min-h-[360px] justify-end` with an absolute
  `<img>` (no negative z), a `bg-gradient-to-t from-black/90 …` veil, and the
  white title + description lifted via `relative z-10`.
- Verified: image URLs 200; `npx tsc --noEmit` clean; biome only the tolerated
  `noImgElement` warning; `next build` ✓ /career static.

## 2026-06-18 — ApplicationJourney: simplify cards, match title/tag, no overlap
- Title/tag style matched to OurValuesSection (adapted to this section's LIGHT bg):
  tag → `text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400`; title →
  `text-4xl font-bold leading-[1.05em] tracking-tighter text-zinc-900 md:text-5xl
  lg:text-[6.5rem]` (white→zinc since bg is light).
- Cards full width: dropped `max-w-5xl` from the content wrapper.
- Removed the step number (right gradient span) AND the icon graphic (interpreting
  "image" as the lucide icon) — also removed the now-unused lucide imports + the
  `Icon` field from the Step interface/data. Cards are now title (left) +
  description (right).
- Removed card shadows (`shadow-[…]` + hover shadow) and the frosted
  `bg-white/95 backdrop-blur` → plain `bg-white` + border.
- No more overlap: removed the sticky-stacking entirely (`sticky` + `top` +
  `zIndex` + `pb-32` runway) → a normal full-width vertical list (`flex-col
  gap-4 md:gap-6`), so the last card no longer covers the others.
- Verified: `npx tsc --noEmit` clean; biome fully clean; `next build` ✓ /career.

## 2026-06-18 — CareerHeroSection: remove tag + word-stagger title animation
- Removed the "Careers" gradient eyebrow tag above the title.
- Replaced the block fade-in title with the brand-strategy hero's word-by-word
  stagger: added `containerVariants` (staggerChildren 0.15) + `wordVariants`
  (opacity 0→1, y 40→0, premiumEase); each word of "Think. Create. Do." and
  "Grow With Us" is now an `inline-block motion.span`. h2 gradient moved per-word
  (`bg-clip-text`) so it animates cleanly with the transforms.
- Pre-existing lint left as-is (dead `useMemo` import, `<img>`, `key={i}` in
  InfiniteColumn) — not introduced here.
- Verified: `npx tsc --noEmit` clean; `next build` ✓ /career static.

## 2026-06-18 — WhyJoinUs: match OurValuesSection title + tag style
- Tag/eyebrow "Benefits": gradient-clipped `text-[0.65rem] font-bold tracking-[0.2em]`
  → `text-xs font-semibold uppercase tracking-[0.25em] text-white/60` (matches
  OurValuesSection / OpenPositions).
- Title "Why Join Us": `max-w-4xl text-5xl ... leading-[0.9] tracking-[-0.05em]
  sm:text-6xl md:text-7xl lg:text-[7rem]` → `text-4xl font-bold leading-[1.05em]
  tracking-tighter text-white md:text-5xl lg:text-[6.5rem]`.
- Class-only edits. Verified: `npx tsc --noEmit` clean; `next build` ✓ /career
  static; biome unchanged (same pre-existing img/key warnings, none added).

## 2026-06-18 — OpenPositions: Apply-in-dropdown, chevron, bigger pills, title match
- Moved the "Apply Now" button off the row and into the accordion dropdown
  (bottom of the expanded details, `mt-10`).
- Replaced the row's Apply button with a `ChevronDown` dropdown indicator in a
  bordered circle that rotates 180° when open (`rotate-180` toggled by `open`).
- Enlarged the center pills: `text-xs px-3 py-1.5 rounded-md` → `text-sm px-4 py-2
  rounded-lg`; MapPin icon `h-3.5` → `h-4`.
- Matched the header to OurValuesSection: tag/eyebrow → `text-xs font-semibold
  uppercase tracking-[0.25em] text-white/60`; title → `text-4xl font-bold
  leading-[1.05em] tracking-tighter text-white md:text-5xl lg:text-[6.5rem]`.
- Cleanup tied to the change: removed dead `MdArrowOutward` import and the now-
  obsolete `closest("a")` guard in `toggle` (Apply link no longer in the row);
  added a `noStaticElementInteractions` biome-ignore to the clickable row.
  Imported `ChevronDown` from lucide.
- Verified: `npx tsc --noEmit` clean; biome fully clean (was 2 pre-existing
  errors); `next build` ✓ /career static.

## 2026-06-18 — OpenPositions: remove hover effects
- Stripped all hover from the reworked dark accordion job list:
  - Row wrapper: removed `group`.
  - Clickable header row: removed `transition-colors duration-300 hover:bg-white/[0.02]`.
  - Job title `h3`: removed `transition-colors duration-300 group-hover:text-[#149CCB]`.
  - "Apply Now" button: removed `transition-transform hover:scale-105 active:scale-95`.
- No residual hover/group/active in the file.
- Pre-existing (not introduced here, left per minimal-diff): dead `MdArrowOutward`
  import (`noUnusedImports`) + `noStaticElementInteractions` on the onClick row.
- Verified: `npx tsc --noEmit` clean; `next build` ✓ /career static.

## 2026-06-18 — WhyJoinUs: show bg images + remove all hover effects
- Images were invisible: the bento card bg `<img>` wrapper used `-z-20` (same
  negative-z stacking bug as CareerValues) so it rendered behind the card's
  `bg-[#0a0a0a]`. Fixed by removing `-z-20` (wrapper is now plain `absolute
  inset-0`; content stays above via its existing `relative z-10`). All 4 assets
  confirmed present in public/assets.
- Removed all hover effects: card `group` + `transition-transform duration-500
  hover:-translate-y-1 hover:shadow-xl`; image `transition-transform duration-1000
  group-hover:scale-105`; icon box `transition-colors duration-500
  group-hover:border-white/40` (+ icon's leftover `transition-colors`). Entrance
  stagger animation kept (not a hover effect).
- Pre-existing lint left as-is (`<img>` warning, `key={index}` in cards.map) —
  user's reworked code, not introduced here.
- Verified: `npx tsc --noEmit` clean; no residual hover/group/-z; `next build` ✓
  /career static.

## 2026-06-18 — SubServices: more scroll between sticky cards
- Problem: sticky stacking cards pinned too close together (card height 600px,
  pins 190px apart) so the next card slid over the current one before its info was
  readable — the UI/UX card (index 2) got covered by E-Commerce too fast.
- Fix: added `mb-[22vh]` to the sticky card wrapper, increasing the flow distance
  (and thus scroll duration) between pin transitions. Pin offsets
  (`top: calc(5vh + i*190px)`) and the `imageHidden`/activeIndex trigger are
  unchanged — stacking + image-hide behave the same, just paced slower so each
  card lingers fully visible longer.
- Verified: `npx tsc --noEmit` clean; `next build` ✓ /brand-strategy static.

## 2026-06-18 — SubServices (brand-strategy): refine animation
- Card content had no entrance motion and the image hide was a flat opacity fade.
- Added a soft staggered reveal to each card's content (title `motion.a`,
  description `motion.p`, tags `motion.div`) via a `contentContainer`/`contentItem`
  variants pair on a `whileInView` (once, margin -120px) wrapper — content fades +
  slides up (y 24→0) as each card scrolls in. premiumEase [0.22,1,0.36,1].
- Refined the image hide: `transition-opacity duration-500` → `transition-all
  duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]` with a subtle zoom
  (`scale-105 opacity-0` hidden / `scale-100 opacity-100` visible) for a cinematic
  feel. Existing sticky-stacking + activeIndex image-hide logic untouched.
- Pre-existing lint debt left as-is (Card `: any`, `<img>`, `key={i}`/`key={index}`)
  — not introduced by this change.
- Verified: `npx tsc --noEmit` clean; `next build` ✓ /brand-strategy static.

## 2026-06-18 — ContactSection (home): adopt OurValuesSection bg pattern
- Replaced the decorative blur-blob bg in `home/ContactSection.tsx` with the same
  proximity-glow grid used in OurValuesSection: ported the memoised `Cell`, the
  250-cell / 10-col grid, `getIntensity` (cursor-follow + `initialLitIndices`
  [13,27,32,48,54] default glow), `handleCellEnter` (useCallback), stable
  `cellIds` keys, the `bg-black/45` dimming overlay, and section `onMouseLeave`
  reset. Content container lifted to `relative z-10`.
- Avoided shadowing the existing rotating-word `index` state by naming the grid
  loop var `gridIndex`.
- Incidental: added a `<title>` to the pre-existing select-chevron `<svg>` (it was
  triggering a `noSvgWithoutTitle` error) so the touched file is lint-clean —
  matches the project's titled-svg convention (CtaSection).
- Verified: `npx tsc --noEmit` clean; biome clean; `next build` ✓ /home static.

## 2026-06-18 — ContactHeroSection: infinite-drift bg cards + scroll motion
- The rotated bg image grid only moved on scroll (`y1`/`y2` parallax). Added a
  continuous vertical auto-drift per column on top of the existing scroll parallax.
- Refactored the 3 inline columns into a `MarqueeColumn` helper: outer `motion.div`
  carries the scroll `y` (parallax), inner `motion.div` runs an infinite linear
  `animate={{ y: [...] }}` loop. Seamlessness via two identical stacked sets each
  `gap + pb` (so each set is self-contained) looping at `-50%`. Cols 1 & 3 drift
  up, col 2 drifts down; durations 34/28/40s for an organic feel.
- Kept scroll parallax (y1/y2) + text fade/scale untouched, so both motions compose.
- Verified: `npx tsc --noEmit` clean; biome clean; `next build` ✓ /contact static.

## 2026-06-18 — CareerValues: fix disappearing images + re-add scroll anim
- Root cause of vanishing images: the bg `<img>`/veil used **negative** z-index
  (`-z-20`/`-z-10`). With the card as a `motion.div`, its `opacity` formed a
  stacking context that contained them; after the prior task made it a plain `div`
  (no stacking context), the negative-z children escaped to the root and painted
  **behind the section's `bg-white`** → invisible. (Unsplash URLs verified 200 —
  not a broken-image issue.)
- Fix: removed negative z-index; img + veil now paint in natural DOM order
  (absolute, first), and the icon/text are lifted with `relative z-10` — the
  standard pattern used elsewhere (OurTeamSection). Robust regardless of motion.
- Re-added a simple scroll animation: container `staggerChildren` + per-card
  fade/slide-up (`opacity 0→1`, `y 24→0`) on `whileInView` (once).
- Verified: `npx tsc --noEmit` clean; no negative z-index remains; biome clean
  (only tolerated `noImgElement`); `next build` ✓ /career static.

## 2026-06-18 — CareerValues: remove animation
- Stripped all motion from CareerValues: dropped the framer-motion import, the
  `containerVariants`/`cardVariants` + `premiumEase`, converted both `motion.div`s
  to plain `div`s (removed `whileInView`/stagger entrance), and removed the bg
  image hover-zoom (`group` + `transition-transform group-hover:scale-105`). Cards
  are now fully static. Verified: `npx tsc --noEmit` clean; no residual motion refs;
  biome clean (only the tolerated `noImgElement` warning).

## 2026-06-18 — New "Career Values" image-card grid (career page)
- Added `src/components/career/CareerValues.tsx` — a 2×2 grid of photo cards
  (Integrity / Innovation / Collaboration / Results-Driven) matching the mockup.
  Each card: full-bleed background `<img>` (Unsplash, per SubServices convention)
  with a bottom-left dark veil (`bg-gradient-to-tr from-black/90 …`), a white
  rounded icon box (lucide Layers/Lightbulb/Network/BarChart3 stroked with the
  brand gradient via shared `values-icon-grad` def), and white title + description.
- Gradient = DynamicButton gradient `#2E5BFF → #149CCB`.
- Animation: staggered fade/slide-up entrance (`whileInView`, variants) + bg image
  zoom on hover (`group-hover:scale-105`).
- x-padding matches WhyJoinUs: `px-6 py-20 md:py-28`, inner `mx-auto w-full`.
- Wired into `src/app/career/page.tsx` below `<ApplicationJourney />` (now last).
- Note: `noImgElement` biome warning is pre-existing project debt — every other
  component uses `<img>` with no ignore comment, so left consistent.
- Verified: `npx tsc --noEmit` clean; biome (only the tolerated img warning);
  `next build` ✓ /career static.

## 2026-06-18 — New "Your Application Journey" timeline (career page)
- Added `src/components/career/ApplicationJourney.tsx` — a zigzag vertical
  timeline (4 steps: Apply / Interview / Assignment / Offer) matching the mockup.
  Each step: big number, title, description, and a rounded icon box. Step 01 is a
  gradient-filled box (white icon); steps 02–04 are zinc-100 boxes whose lucide
  icons are stroked with the brand gradient via a shared `journey-icon-grad` def.
- Gradient is the DynamicButton gradient `#2E5BFF → #149CCB`.
- Scroll animation: a center line (md+) whose gradient fill grows with scroll
  (`useScroll` + `useSpring` driving `scaleY`, origin-top); each step fades/slides
  in on view. Line hidden on mobile (steps stack icon+text); reveals still run.
- x-padding matches WhyJoinUs: `px-6 py-20 md:py-28`, inner `mx-auto w-full`
  (full-width, no max-w). lucide icons: BadgeCheck, MessageCircleQuestion,
  ClipboardCheck, Mail.
- Wired into `src/app/career/page.tsx` between `<WhyJoinUs />` and `<OpenPositions />`.
- Verified: `npx tsc --noEmit` clean; biome clean; `next build` ✓ /career static.

## 2026-06-18 — OpenPositions: boxes, default-closed, hero-style Apply
- x-padding: dropped `max-w-7xl` from the inner container (`mx-auto w-full`) so it
  matches WhyJoinUs (full-width, `px-6`).
- Job rows → individual **boxes**: each role is now a `rounded-2xl border` card
  (stacked `flex-col gap-4`) instead of divider-separated rows. Closed state shows
  title + blurb + meta + "Read More" CTA; clicking expands the details inside.
- State: `openId` (single, first-open) → `openIds: string[]` with a `toggle()` —
  every box starts closed and each opens/closes independently.
- Apply button restyled to match the hero "Search Open Jobs" CTA (white pill,
  black arrow box, dual `MdArrowOutward` w/ gradient on the second, hover border +
  padding shift); now a `mailto:` link per role. Added one shared `apply-icon-grad`
  <svg> def at the section root to avoid duplicate-id clashes.
- Verified: `npx tsc --noEmit` clean; biome clean (formatted); `next build` ✓
  /career static.

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

## 2026-06-17 — LogoCarousel: boxed logos, infinite marquee
- Replaced the "spotlight" LogoCarousel (auto-advancing highlight) with an
  infinite marquee matching the project convention (OurTechStack): each logo in
  its own rounded white card (`border-zinc-200/80`, shadow, hover lift; icon +
  optional title), in a duplicated track that framer-animates `x: 0 → -50%`
  (`ease linear`, seamless loop), with left/right white edge fades.
- API: kept `logos`/`className`/`ariaLabel`; replaced `interval` (ms, stepwise)
  with `speed` (seconds per loop, default 28). Only consumer is about/page.tsx,
  which didn't use `interval` — updated its usage to drop the now-irrelevant
  `justify-between px-4 sm:px-8` so the marquee runs full-bleed.
- Verified: `npx tsc --noEmit` clean; `biome check` clean on LogoCarousel
  (about/page.tsx shows only its 2 pre-existing findings); `next build` ✓ /about static.
- Follow-up: made the logo black — icon `text-zinc-400`→`text-zinc-900`, name
  `text-zinc-500`→`text-zinc-900` (dropped the now-redundant `group`/group-hover
  shifts); container border made defined `border-zinc-200/80`→`border-zinc-300`
  (hover `zinc-300`→`zinc-400`).
- Verified: `npx tsc --noEmit` clean; `biome check` clean.
- Follow-up: reversed marquee direction to left→right (`x: ["0%","-50%"]` →
  `["-50%","0%"]`). Verified: `npx tsc --noEmit` clean.

## 2026-06-17 — AboutTraditional: carousel → clip-path video
- Removed the full-bleed image carousel (and its `premiumImages`/`duplicatedImages`).
- Added a cinematic `<video src="/assets/video2.mp4">` (autoplay/loop/muted/
  playsInline, object-cover, hover zoom) in a container shaped with `clipPath:
  polygon(7% 0,100% 0,100% 86%,93% 100%,0 100%,0 14%)` — chamfered top-left &
  bottom-right corners; bottom-left kept sharp for a caption overlay + gradient veil.
  Used video2 (video4 is already the OurValuesSection bg).
- Cleaned out the file's pre-existing dead code while here (unused `Counter`,
  `stats`, `cn`/`React`/hook imports) — net lint improvement (3 errors/5 warnings
  → 0). PART 1 typography unchanged.
- Verified: `npx tsc --noEmit` clean; `biome check` clean; `next build` ✓ /about static.

## 2026-06-17 — CtaSection: use ExperimentalTestimonials' Connect button
- Replaced `<ConnectButtonThree />` in CtaSection with the inline "Connect With
  Us" button copied from ExperimentalTestimonials (white pill, animated
  MdArrowOutward with gradient-fill arrow). Imported `MdArrowOutward`, removed the
  `ConnectButtonThree` import.
- Renamed the gradient `id` `icon-grad` → `cta-icon-grad` (both components render
  on the same pages — avoids a duplicate-id clash). Added `type="button"` and a
  `<title>` on the gradient-def svg so the copied markup is lint-clean.
- Verified: `npx tsc --noEmit` clean; biome on the file shows only its
  pre-existing findings (button added none); no `ConnectButtonThree` refs remain.
- Follow-up: restyled that button for the black CTA bg — removed `bg-white`
  (transparent), text `text-black`→`text-white`, arrow box `bg-black text-white`
  →`bg-white text-black` (black arrow on white box), hover border
  `hover:border-black`→`hover:border-white`. Verified: `npx tsc --noEmit` clean.

## 2026-06-17 — SubServices: fade card image as next card overlaps
- Brand-strategy stacking cards: as the next sticky card slides up to cover the
  current one, the covered card's image now dims. Restored a container
  `useScroll({offset:["start start","end end"]})`; each Card maps that progress
  to its image opacity via `useTransform`, fading `0.8 → 0.2` over
  `[(i+1)/total - 0.15, (i+1)/total]` (the window where the next card covers it).
  Last card never fades (no next card). `<img>` → `motion.img` w/ `style.opacity`.
- Verified: `npx tsc --noEmit` clean; biome only pre-existing findings
  (`any`, `noImgElement` on the motion.img, 2× array-index key); `next build` ✓
  /brand-strategy static.
- Follow-up: fade image fully to 0 (was 0.2) once the next card closes over it —
  `useTransform` output `[0.8, 0.2]` → `[0.8, 0]`. Verified: `npx tsc --noEmit` clean.
- Follow-up: moved the opacity from `motion.img` to the image CONTAINER
  (`motion.div`) so at opacity 0 the whole box (incl. its `bg-zinc-900/50`
  placeholder) is invisible — previously the gray container box still showed.
  Verified: `npx tsc --noEmit` clean.
- Follow-up: reverted the above — opacity back on `motion.img`, container back to
  plain `<div>` (the `[0.8, 0]` fade target is kept). Verified: `npx tsc --noEmit` clean.
- Follow-up: removed the scroll-driven image opacity entirely (image no longer
  changes opacity) — dropped container `useScroll`, per-card `useTransform`/
  `progress`/`total`, `motion.img`→`<img>`, and the `motion`/`useScroll`/
  `useTransform`/`useRef` imports. Image is now static `object-cover`.
  Verified: `npx tsc --noEmit` clean; no leftover scroll-opacity refs.

## 2026-06-17 — SubServices: trigger-based image hide (not scrub)
- Re-added "hide previous card's image when the next covers it", but as a TRIGGER
  (boolean toggle + CSS fade) instead of a continuous opacity scrub (which the
  user disliked). Container `useScroll`; each Card watches progress via
  `useMotionValueEvent` and sets `imageHidden = progress >= (i+1)/total`; image
  uses `transition-opacity duration-500` + `opacity-0/100`. Last card never hides.
  Reverses on scroll-up. Typed the event value `: number` (progress prop is `any`).
- Verified: `npx tsc --noEmit` clean; biome only pre-existing findings; `next build`
  ✓ /brand-strategy static.
- Follow-up: image was hiding too late (around a later card) because the
  `(i+1)/total` progress fraction doesn't match where cards actually pin
  (viewport-dependent). Made it self-calibrating: on scroll, measure each card's
  real `getBoundingClientRect().top` vs its sticky pin line
  (`innerHeight*0.05 + i*130`) to find the top-most pinned card (`activeIndex`);
  a card's image hides exactly when the NEXT card has pinned (`activeIndex > i`).
  Card now takes `imageHidden` + `registerRef` (callback ref); dropped per-card
  `useMotionValueEvent`/`progress`/`total`. CSS `transition-opacity duration-500`.
- Verified: `npx tsc --noEmit` clean; biome only pre-existing; `next build` ✓
  /brand-strategy static.
- Follow-up: removed the image container's `bg-zinc-900/50` placeholder so no grey
  box shows when the image fades to opacity-0 (image covers it at rest anyway).
  Verified: `npx tsc --noEmit` clean.

## 2026-06-17 — SubServices: balance the title gap in the reveal sliver
- Analysis: gap above title (card border→title) was `pt-12`=48px; the next card's
  border is exactly the 130px stack-offset below, so the gap below the title
  (title→next border) was only ~10px (lg) — asymmetric.
- Fix: removed the grid's `pt-12` and put the title in an `h-[130px] flex items-center`
  band starting at the card border. 130px = the stack offset, so the band bottom
  lands exactly on the next card's border; centering the title makes the
  above/below gaps equal at every breakpoint. Description/tags moved into a
  sub-`div` (gap-8) below the band. (Image now flush-top, but it's hidden in the
  covered state, so only the active card shows it.)
- Verified: `npx tsc --noEmit` clean; biome only pre-existing; `next build` ✓
  /brand-strategy static.

## 2026-06-17 — SubServices: more gap between title and next card
- (Note: the title-band from the prior entry had been reverted to `pt-12` + plain
  title before this task.) Raised the stack offset `130` → `170` in both the card
  `top: calc(5vh + i*170px)` and the matching `activeIndex` pinTop
  (`innerHeight*0.05 + j*170`). Next card now stops 170px below the card border
  (was 130), opening ~40px more space below the title.
- Verified: `npx tsc --noEmit` clean; no stray `130` left.
- Follow-up: reduced the offset a little `170` → `155` (both card `top` and
  `pinTop`). Verified: `npx tsc --noEmit` clean.

## 2026-06-17 — Brand-strategy: nudge title eyebrow tags 1px right
- Added `ml-px` (1px left margin) to the eyebrow tag above the title in all 5
  brand-strategy components that have one: SubServices, ProcessSection,
  OurTechStack, ProjectShowcase (the `text-white/60` eyebrows) + StrategyHeroSection
  (the gradient "How we do it" eyebrow). Skipped ProjectShowcase's "Featured Case"
  label (it's inside a project card, not a title eyebrow).
- Verified: `npx tsc --noEmit` clean; `ml-px` present on all 5.
- Follow-up: bumped the nudge from 1px → 3px (`ml-px` → `ml-[3px]`) on all 5.
  Verified: `npx tsc --noEmit` clean.

## 2026-06-17 — OurTechStack: slightly larger logos
- Logo `<img>` `h-7` → `h-9` (28px → 36px); still fits the `h-36` cards.
  Verified: `npx tsc --noEmit` clean.

## 2026-06-17 — ProjectShowcase: fix laggy hover border + redesign
- Root cause of lag: the traveling-border `motion.div` had `repeat: Infinity`
  but wasn't hover-gated (only the container opacity was) — so all 5 cards ran a
  framer JS rotation + mask compositing continuously.
- Fix: dropped the framer rotation; the conic-gradient ring now spins via CSS
  `group-hover:[animation:spin_2.2s_linear_infinite]` (GPU transform). Idle cards
  do zero animation; only the hovered card composites.
- Redesign (more amusing): brighter **dual-comet** conic gradient (two light arcs
  chasing the border) + a soft brand glow that fades in on hover
  (`group-hover:shadow-[0_0_45px_-8px_rgba(46,91,255,0.5)]`).
- Verified: `npx tsc --noEmit` clean; biome only pre-existing; `next build` ✓;
  confirmed in built CSS the spin runs only under `.group:hover` (`@keyframes spin`
  present), so idle cards are static.
- Follow-up: removed the hover glow shadow from the card (kept the dual-comet
  spinning border). Verified: `npx tsc --noEmit` clean; no hover shadow refs left.

## 2026-06-17 — AboutHero: tighten gap between text and carousel
- Reduced the carousel wrapper padding `py-6 md:py-10` → `py-4 md:py-7`
  (24/40px → 16/28px), shrinking the gap between the headline lines and the
  split image carousel a little. Verified: `npx tsc --noEmit` clean.

## 2026-06-17 — AboutHero: even stats spacing
- Stats are `grid-cols-2 md:grid-cols-4` (already equal columns). Removed the
  bottom-row `pt-8` (and redundant `md:pt-0`) that added extra space beyond the
  `gap-8` row gap on the mobile/tablet 2×2 layout — so spacing between stats is
  now uniform (the grid gap alone). Desktop unchanged (already equal columns).
  Verified: `npx tsc --noEmit` clean.

## 2026-06-17 — AboutTraditional video: rectangle, 9xl, rounded, eye-open
- Removed the chamfered `clip-path: polygon(...)` → clean rectangle (kept
  `aspect-video`). Widened `max-w-7xl` → `max-w-[96rem]` (≈9xl; Tailwind has no
  default 9xl). Added `rounded-2xl`.
- Added an "open like an eye" entry animation: inner container is now a
  `motion.div` animating `clipPath` `inset(50% 0 50% 0 round 16px)` →
  `inset(0 0 0 0 round 16px)` on scroll-in (whileInView, once) — unfolds
  vertically from a centre slit, corners staying rounded. Outer wrapper is a
  simple fade.
- Verified: `npx tsc --noEmit` clean; biome clean; `next build` ✓ /about static.
- Fix (video vanished): the eye-open `clipPath` was stuck at its collapsed initial
  (`inset(50% 0 50% 0)` = zero-height slit). Cause: the `round 16px` keyword in
  `inset()` isn't reliably interpolated by framer, so it never animated open.
  Dropped `round 16px` → plain `inset(50% 0 50% 0)` → `inset(0 0 0 0)`; corners
  still rounded via `rounded-2xl` + `overflow-hidden`. Verified: `npx tsc --noEmit` clean.
- Fix #2 (still not visible): clipPath animation wasn't running here at all
  (whileInView works in this file — PART 1 uses it — so the failure was specific
  to framer animating clipPath). Switched the eye-open to a transform `scaleY`
  `0 → 1` with `origin-center` (whileInView) — reliably animated, ends fully
  visible; opens vertically from the centre like an eye. Verified: `npx tsc
  --noEmit` clean; `next build` ✓ /about static.

## 2026-06-17 — About page: unify title eyebrow color to white/60
- Set the eyebrow tag above the title to `text-white/60` in the dark-bg sections:
  AboutTraditional ("Who We Are", was `text-zinc-300`) and OurValuesSection
  ("What We Stand For", was `text-white/80`). Left OurTeamSection's eyebrow
  (`text-zinc-500`) alone — it's on a white bg, so `text-white/60` would be
  invisible. Verified: `npx tsc --noEmit` clean.

## 2026-06-17 — OurValuesSection → "Our Culture" redesign (same component name)
- Kept the export/component name `OurValuesSection` and the dark grayscale-video
  backdrop. Rewrote content from 3 "core values" to 4 culture pillars (Bias for
  action, Craft you can feel, Radical ownership, Curiosity always). Header now
  eyebrow "How We Work" + "Built on a culture of curiosity & craft".
- Redesigned the cards: centered-icon tiles → numbered editorial 2×2 grid
  (big gradient `01–04` index, left-aligned title + copy, a gradient accent bar
  that grows on hover). Dropped the lucide icons + unused `React` import.
- Verified: `npx tsc --noEmit` clean; biome clean; `next build` ✓ /about static.
- Follow-up: removed the index numbers (`01–04` + `no` field) and the grayscale
  background `<video>`. Replaced the video with ambient brand-glow blobs; cards now
  lead with a gradient "dash" marker (grows on hover) + a soft corner glow on hover
  and slightly more lift; glass bg `bg-white/[0.03]`. Verified: `npx tsc --noEmit`
  clean; biome clean; `next build` ✓ /about static.
- Follow-up: added the interactive `DotGrid` (ui/DotGrid, canvas) as the section
  background (replacing the ambient glow blobs) — `dotSize 3 / gap 28 /
  baseColor #27272a / activeColor #2E5BFF / proximity 130 / !p-0`, in an
  `absolute inset-0 z-0` layer (its canvas is pointer-events-none, so card hover
  still works). Removed the hover gradients: deleted the corner-glow div and the
  marker's `group-hover:w-16` (marker is now a static gradient dash). DotGrid uses
  gsap InertiaPlugin — present (already used by StatsSection). Verified:
  `npx tsc --noEmit` clean; biome clean; `next build` ✓ /about static.

## 2026-06-17 — ExperimentalTestimonials cards: white + gray border + hover gradient
- Card `bg-[#edeef2]` → `bg-white`; border `border-black/5` → `border-zinc-200`
  (gray). Hover: replaced `hover:bg-[#e4e6ec]` with a white→gray gradient
  (`hover:bg-gradient-to-br hover:from-white hover:to-zinc-200`), border
  `hover:border-zinc-300`, kept `hover:shadow-xl`. Shared component → applies on
  all pages using it. Verified: `npx tsc --noEmit` clean.

## 2026-06-17 — ExperimentalTestimonials → manual arrow carousel
- Reworked from auto-scroll marquee into a manual single-card carousel. Removed:
  the `<style>` marquee keyframes + `animate-scroll-x`, the duplicated array, and
  the card `hover:shadow-xl`. Dropped unused imports (DynamicButton, ConnectButtonTwo).
- Right column shows one featured testimonial; slides via AnimatePresence
  (`custom={dir}` variants). Prev/next round arrow buttons (`MdArrowBack`/
  `MdArrowForward`) + an `NN / NN` counter sit at the extreme bottom of the left
  column (flex `justify-between`, parent `lg:items-stretch`); title + description +
  Connect button on top. Rebalanced: left `lg:w-1/3`, right `lg:flex-1` featured
  card `h-[440px] md:h-[480px]`, quote `md:text-2xl`. Headline word-rotation kept.
  Gradient id `icon-grad`→`testimonial-icon-grad`; added `type="button"` + svg titles.
- Shared component → applies on home/about/brand-strategy/contact.
- Verified: `npx tsc --noEmit` clean; biome clean; `next build` ✓ all routes static.
- Follow-up: restored the RIGHT column to the original multi-card row (per user —
  only the left div was meant to change). Kept the left div (arrows/title/desc/CTA)
  as-is. Right column is the original card row (white/gray border/hover gradient,
  no hover shadow), now arrow-driven instead of auto-scroll: framer
  `animate={{ x: -active * step }}` where `step` = card+gap per breakpoint
  (376 mobile / 452 desktop, via a resize effect). Dropped the single-card
  `slideVariants`/`dir`. Verified: `npx tsc --noEmit` clean; biome clean;
  `next build` ✓ all routes static.
- Follow-up: left column was stretching to the right COLUMN height (600) not the
  card height. Shrank the right column `h-[460px] md:h-[600px]` → `h-[360px]
  md:h-[440px]` (= card min-h) and removed the track's `py-6` (would overflow);
  with `lg:items-stretch` the left column now matches the card height.
  Verified: `npx tsc --noEmit` clean.

## 2026-06-17 — LogoCarousel: remove hover effect + edge blur
- `ui/LogoCarousel` (about page "Trusted By"): removed the two edge-fade gradient
  divs (`from-white to-transparent`) and stripped the card hover effect
  (`transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-400
  hover:shadow-md`). Cards are now static (kept resting `shadow-sm`); marquee
  unchanged. Verified: `npx tsc --noEmit` clean; no hover/fade refs left.

## 2026-06-17 — ExperimentalTestimonials: increase vertical margin
- Section's own padding `py-12 md:py-0` → `py-16 md:py-20` (md:py-0 gave zero
  desktop y-margin). Note: the about page wraps this component with
  `[&>section]:py-8 md:[&>section]:py-6` which overrides the section py there, so
  about-page spacing (recently tuned) is unchanged; this adds margin on
  home/brand-strategy/contact. Verified: `npx tsc --noEmit` clean.

## 2026-06-17 — ExperimentalTestimonials: bigger Connect button
- Scaled up the "Connect With Us" button: `h-14`→`h-16`, `gap-4`→`gap-5`,
  `pr-2`→`pr-2.5` (hover `pl-5/pr-3`→`pl-6/pr-3.5`), label `text-base`→`text-lg`,
  arrow box `h-9 w-9`→`h-11 w-11`, arrow icons `h-4 w-4`→`h-5 w-5`.
  Verified: `npx tsc --noEmit` clean.

## 2026-06-17 — ContactHeroSection redesign (white, gradient-free)
- Replaced the split-image headline hero with a clean centered hero. No gradients
  anywhere (per request): removed the bg glow blob, the gradient eyebrow text, and
  all hover gradients. Now: white bg, a live-dot "Available for new projects"
  badge, a bold two-line word-stagger headline ("Let's work" black / "together."
  solid `#2E5BFF`), a subline, two solid CTAs (Start a project / Book a call,
  solid-color hovers), and the bottom Email/Phone/Studio contact strip
  (hover:bg-zinc-50, group-hover:text-[#2E5BFF] — solid). Dropped the rotating
  `<img>` set + its state/effect (also clears noImgElement).
- Verified: `npx tsc --noEmit` clean; biome clean; grep confirms no gradients;
  `next build` ✓ /contact static.

## 2026-06-17 — ContactHeroSection: aligned to project hero design language
- Reworked to match the project's inner-page hero pattern (StrategyHeroSection/
  AboutHeroSection): centered white hero, Header at top, a brand gradient-text
  eyebrow ("Say hello", uppercase tracking-[0.3em]), a giant word-stagger headline
  ("Let's build" black / "together." brand gradient text, sizes up to
  lg:text-[118px] xl:text-[135px]), a subline, and the bottom Email/Phone/Studio
  strip. Brand gradient is on TEXT only (bg-clip-text) — no bg-fill gradient, no
  hover gradient, no glow (constraint kept). White bg.
- Verified: `npx tsc --noEmit` clean; biome clean; gradient audit shows only
  `bg-clip-text` text gradients; `next build` ✓ /contact static.

## 2026-06-17 — ContactSection redesign (/build, light + clean)
- Rewrote `home/ContactSection` (used on home + contact). Was dark (Grainient
  WebGL bg + bg image + gradient-hover submit). Now a clean LIGHT two-column
  section to flow with the white contact hero: left = gradient-text eyebrow +
  rotating-word headline ("Let's build [rotating gradient word]") + description +
  3 contact channels (Email/Call/Visit, lucide icons, solid hover); right = a
  light form card (border-zinc-200, zinc-50 inputs, focus ring) with a solid
  black submit (double-chevron anim, `hover:bg-zinc-800` — no gradient).
- Brand gradient on TEXT only (`bg-clip-text`); no bg gradient, no hover gradient.
  Dropped the `Grainient` import + the bg `<img>` (Grainient now unused anywhere).
- Built inline (single component). Verified: `npx tsc --noEmit` clean; biome clean
  (formatted/imports sorted); `next build` ✓ /home + /contact static.

## 2026-06-17 — Contact page: match about page's section spacing
- Restructured `app/contact/page.tsx` to use the about page's `[&>section]:py-…`
  override-wrapper pattern so inter-section gaps match: ContactSection +
  ExperimentalTestimonials → `[&>section]:py-8 md:[&>section]:py-20`;
  ContactFaqSection → `[&>section]:py-8 md:[&>section]:py-6 mt-14`; CtaSection →
  `px-3 [&>section]:py-8 md:[&>section]:py-6`; Footer → `px-3 pt-12 pb-3 md:pt-20`
  (replacing the old grouped `p-3 space-y-16` CTA+Footer). Root `<div>` → `bg-white`.
  Hero left bare (like about hero). All targeted sections render a `<section>` root.
- Verified: `npx tsc --noEmit` clean; `next build` ✓ /contact static.

## 2026-06-18 — OurValuesSection: fix laggy proximity-grid hover
- The bg proximity-glow grid (250 cells, each with `onMouseEnter`→setState) was
  re-rendering ALL 250 cells on every pointer move → very laggy. Extracted each
  cell into a memoised `Cell` component + a stable `useCallback` `onEnter`, so
  only cells whose `intensity` actually changes re-render. Behavior unchanged:
  cells near the title still glow initially (`initialLitIndices`) and follow the
  cursor on hover. Lifted the key into a `cellIds` array (static grid → positional
  id is a stable key, avoids noArrayIndexKey).
- Verified: `npx tsc --noEmit` clean; biome shows only the pre-existing carousel
  `noImgElement` (no new findings); `next build` ✓ /about static.

## 2026-06-18 — ContactHeroSection: smooth parallax + white theme
- (User had reworked it into a dark parallax-image-grid hero.) Smoothed the scroll
  parallax: wrapped the `y1/y2` `useTransform`s in `useSpring`
  ({stiffness 80, damping 30, mass 0.4}) so the motion is buttery, not jumpy.
- Flipped dark → white theme: section `bg-zinc-950 text-white` → `bg-white
  text-zinc-900`; image-grid opacity `30/40` → `60`; overlays dark→white veil
  (`from-white/40 via-white/60 to-white` + `bg-white/55 backdrop-blur-[2px]`);
  eyebrow badge → light (`border-zinc-200 bg-white/70 text-zinc-700`); headline
  `text-white`→`text-zinc-900` (gradient "together." kept); subline
  `text-zinc-300`→`text-zinc-500`.
- Verified: `npx tsc --noEmit` clean; biome clean (formatted); no dark-theme refs
  left; `next build` ✓ /contact static.
- Follow-up: made bg images more visible — grid `opacity-60` → `opacity-90`;
  veils eased (`from-white/40 via-white/60` → `from-white/25 via-white/50`;
  frost `bg-white/55` → `bg-white/40`). Verified: `npx tsc --noEmit` clean.

## 2026-06-18 — OurTeamSection: edge-to-edge carousel
- The carousel wrapper had `px-6`, insetting the cards from the viewport edges.
  Moved the `px-6` off the wrapper (`mx-auto w-full px-6` → `mx-auto w-full`) and
  onto the header row only (title + arrows stay padded), so the carousel cards now
  run edge-to-edge. Verified: `npx tsc --noEmit` clean.

## 2026-06-18 — WhyJoinUs (career): match OurTeamSection x-padding
- OurTeamSection content uses `px-6` (no responsive override). WhyJoinUs section
  was `px-6 md:px-12`; dropped `md:px-12` so its x-axis padding matches (`px-6`).
  Verified: `npx tsc --noEmit` clean.

## 2026-06-18 — WhyJoinUs cards: show the hover effect by default
- The `GridBackgroundCard` proximity-glow + spotlight-mask only showed on hover
  (mouseX/Y at -1000, hoveredIndex null). Now it shows by default and hover takes
  over: seeded `hoveredIndex = DEFAULT_INDEX (16)`; added `hasInteracted` state;
  mask is a fixed `idleMask` ("...at 75% 45%...") until the first mouse move, then
  the cursor-following `cursorMask`. `onMouseLeave` resets to the default
  (idle mask + DEFAULT_INDEX) so the effect persists when not hovering.
- Verified: `npx tsc --noEmit` clean; biome clean (formatted); `next build` ✓
  /career static.
