# Session Log

## 2026-07-07 — Work slug page: add the site header
- `src/app/work/[slug]/page.tsx` had no nav. Added `<Header onDark />` (shared
  `page/Header`, dark-hero variant — same as the work listing page) in an
  `absolute top-0 z-50` wrapper; root div made `relative`. ProjectHero anchors
  content at the bottom (`items-end`, `pb-24/32`) with an empty top, so the fixed
  navbar floats over it with no overlap — no padding change needed.
- Verified: tsc + biome clean; `next build` ✓; `next start` → /work/finova-dashboard
  200 with header nav (About Us/Careers/Get in Touch) + white logo.png + project
  content all present. Server cleaned up. Not committed.

## 2026-07-07 — Diagnose /work/<slug> 404 (stale dev cache) + speed up comet
- `/work/finova-dashboard` 404 on localhost:3000: NOT a code bug. The route
  (`src/app/work/[slug]/page.tsx`), data (`src/data/projects.ts` has
  finova-dashboard id 2), and `getProjectBySlug` all resolve correctly.
  `npx tsc` clean; `next build` prerenders all 8 `/work/<slug>` (SSG); `next
  start` → /work/finova-dashboard, aura-skincare, apex-analytics all 200 with
  real content, unknown slug 404. Root cause: stale/leftover Turbopack dev cache
  (route not picked up by the running dev server). Fix: cleared `.next` (no dev
  server was running); user restarts `bun dev`. No code change.
- Animation goal ("make it a bit faster"): `src/components/ui/TracingBorder.tsx`
  comet lap `duration 0.8 → 0.6`. tsc clean. Server processes cleaned up.
  Not committed.

## 2026-07-10 — (toolkit maint, not project) universal-kit update #2
- `~/.claude/universal-kit`: `git pull` fetched real updates (updated
  `model-adaptation` skill, commands incl. new `/worker`, EFFICIENCY_STACK.md,
  README). Avoided the known Windows non-idempotency bug (bootstrap `ln -sfn`
  copies → re-running over existing real skill dirs makes nested `<skill>/<skill>`
  junk): cleared the 16 kit-skill dests first (clean kit-copies; kit is source of
  truth), then ran `bootstrap.sh` → exit 0 (18 agents, 16 skills, 7 commands,
  AGENT_INDEX 185 resources).
- Verified: no nested junk; all 16 skills top-level == kit (incl. updated
  model-adaptation); `worker.md` installed == kit. Restart Claude Code to pick up
  `/worker`. No softexedge project files changed.

## 2026-07-07 — (toolkit maint, not project) universal-kit git pull + bootstrap
- `~/.claude/universal-kit`: `git pull` = already up to date. `./bootstrap.sh`
  first failed (`ln: .../skills/api-design/api-design: cannot overwrite
  directory`). Root cause: Windows Git Bash `ln -s` COPIES (no symlinks), and
  pre-existing real skill dirs made `ln -sfn` copy INTO them → nested
  `<skill>/<skill>` junk; 12 skills were polluted and their top-level SKILL.md
  was STALE (kit's current version was buried in the nested subdir).
- Fix (user chose "back up & use kit version"): moved all 16 kit-skill dirs to
  `~/.claude/skills-pre-bootstrap.bak` (reversible; incl. the old 13.6KB
  api-design), then re-ran `bootstrap.sh` clean → exit 0 (18 agents, 16 skills,
  6 commands, AGENT_INDEX regenerated, 185 resources).
- Verified: all 16 skills' top-level SKILL.md == kit, no nested junk; backup
  intact. No softexedge project files changed. Caveat surfaced: bootstrap.sh
  isn't idempotent on Windows (copies, not symlinks) — future re-runs must clear
  kit-skill dests first.

## 2026-07-07 — ContactSection ChannelCard: default reveal mask parked on right
- `src/components/home/ContactSection.tsx` (`ChannelCard`): the cursor-follow
  reveal mask started off-screen (`mouseX/Y = -1000`) so nothing showed by
  default. Added `cardRef` + `parkMaskRight()` (sets `mouseX = offsetWidth*0.85`,
  `mouseY = offsetHeight/2`) called on mount, on `mouseLeave`, and via a
  ResizeObserver while idle — so the grid is revealed on the RIGHT when idle.
  `onMouseMove` still follows the cursor (a `hoveringRef` gates the observer so a
  resize mid-hover doesn't yank the mask); cell-glow (`getIntensity`/hoveredIndex)
  unchanged — "rest working same".
- Verified: `npx tsc --noEmit` clean; `next build` ✓; `next start` → /home &
  /contact 200. Biome: only a pre-existing unused-`GRID_COLUMNS` warning (not
  mine). Single-file; no subagents. Server cleaned up. Not committed.

## 2026-07-07 — Blog page: nudge CtaSection↔Footer gap back up a little
- `src/app/blog/page.tsx`: bumped CtaSection bottom `pb-6 md:pb-8` → `pb-8
  md:pb-12` and Footer top `pt-6 md:pt-8` → `pt-8 md:pt-12` (gap now ≈ 24 desktop
  / 16 mobile, up from 16/12). `npx tsc --noEmit` clean. Not committed.

## 2026-07-07 — Blog page: reduce gap between CtaSection and Footer
- `src/app/blog/page.tsx`: the gap was CtaSection wrapper bottom padding
  (`md:py-24`) + Footer wrapper top padding (`md:pt-24`) ≈ 48 (12rem) desktop.
  Trimmed CtaSection bottom to `pb-6 md:pb-8` (kept its top `pt-16 md:pt-24`) and
  Footer top to `pt-6 md:pt-8` → gap now ≈ 16 desktop / 12 mobile. Empty
  commented-`FaqSection` div contributes nothing (its `[&>section]` matches no
  child). Verified: `npx tsc --noEmit` clean; biome (only the pre-existing unused
  `FaqSection` import warning remains). Not committed.

## 2026-07-07 — Work page: use the shared header (fix hover + behavior parity)
- The work page used a bespoke `WorkHeader` (static, underline hover) — different
  from every other page's `page/Header` (resizable-navbar: white sliding-pill
  hover, scroll-to-pill, Services dropdown). Switched `/work` to the shared
  `Header` so behavior + hover are identical.
- Added a backward-compatible `onDark` prop so the work page (dark dome hero)
  shows light links + white `logo.png` at the top while every hover/scroll/
  dropdown behaviour stays identical: `page/Header.tsx` threads `onDark` to
  `NavItems` (at-top light links via `visible || onDark`), `CustomLogo` (white
  logo via `visible || onDark`), and `MobileNavToggle` (white icon) in
  `page/resizable-navbar.tsx`. Other pages call `<Header />` → `onDark=false` →
  unchanged. `WorkHeroSection` now renders `<Header onDark />`; `WorkHeader.tsx`
  orphaned (left in place).
- Also removed a dead `visible` param from `MobileNavToggle` (was already unused
  in `page/resizable-navbar` pre-change; flagged by spec-verifier).
- Specialists: `spec-verifier` (T2 done-gate) — confirmed hover pill unchanged,
  prop-threading via cloneElement merges `visible`+`onDark`, other pages'
  desktop rendering unchanged, hero clears the fixed navbar. Its P2 (mobile-icon
  regression) was a false positive — it used `ui/resizable-navbar` as baseline,
  but `page/Header` imports `page/resizable-navbar` whose original toggle was
  `text-black` unconditionally, so `onDark=false` is identical. P3 (dead param)
  fixed.
- Verified: `npx tsc --noEmit` clean; `next build` ✓; `next start` → /work & /about
  200; /work SSR shows shared nav (Services/About Us/Careers) + white `logo.png`;
  biome findings on the navbar files are pre-existing `any`/index-key debt.
  Server cleaned up. Not committed.

## 2026-07-07 — Replace the "random blue" gradient with the brand gradient
- Project-wide analysis (grep sweep of all hover effects + hex colours, excluding
  dead `garbage/`): the only non-brand blue was the triad `#3445E7 / #2F85EA /
  #07D6F3`. Other blues (`#4da6ff`, `#88ccff`) are WebGL globe colours (not
  hover); the rest are purples or the brand `#2E5BFF`/`#149CCB`.
- Replaced all 4 uses of that triad with the brand `from-[#2E5BFF] to-[#149CCB]`
  (dropped the 3rd `via` stop):
  - HOVER effects (the ask): navbar dropdown sub-link hover in
    `page/resizable-navbar.tsx:338` and `ui/resizable-navbar.tsx:331`.
  - Static heading gradients (same random blue, folded in per "not any random
    blue"): `home/AboutSection.tsx` ×2.
- Brand single-colour hovers (`group-hover:text-[#149CCB]`, `group-hover:bg-
  [#2E5BFF]`, focus rings) left as-is — already on-brand, not "random blue".
- Verified: triad grep → 0 in src; `npx tsc --noEmit` clean (biome findings on the
  navbars are pre-existing `any`/index-key debt); `next build` ✓; `next start` →
  home & about 200 with `#3445E7` absent from rendered HTML; new brand-hover class
  confirmed in navbar source (dropdown links render on interaction). Server
  cleaned up. Not committed.

## 2026-07-07 — PerksSection: x-axis padding matches ExperimentalTestimonials
- `src/components/career/PerksSection.tsx`: removed `md:px-10` from the section so
  horizontal padding is a uniform `px-6` at all breakpoints — matching the
  `ExperimentalTestimonials` container (`px-6`). Verified: `npx tsc --noEmit`
  clean; biome clean. Not committed.

## 2026-07-07 — Career PerksSection: redesigned into cards
- `src/components/career/PerksSection.tsx`: turned the flat grid (icon+title row,
  description, gradient divider line) into proper cards — each perk is now a
  white `rounded-3xl border border-zinc-200 bg-white p-8` card with a stacked
  icon chip (brand-gradient, the only gradient) → title → description, and a
  subtle hover (lift + shadow + border + icon scale). Tightened grid gaps to
  `gap-6 md:gap-8`; equal-height via `h-full`. Removed the unused `cn` import.
- Header (Benefits eyebrow + "A snippet of our perks") and the perks data
  unchanged. Verified: biome clean; `npx tsc --noEmit` clean; `next build` ✓;
  `next start` → /career 200 with perks rendering. Server cleaned. Not committed.

## 2026-07-07 — Work cards: same tracing-border comet as blog cards
- Extracted the blog cards' `TracingBorder` (comet traces the rounded border once
  on hover, blurred brand gradient, rests at the top-right corner) into a shared
  `src/components/ui/TracingBorder.tsx`. `BlogListSection` now imports it (removed
  the local copy + its now-unused `useEffect`/`useRef` imports).
- `WorkProjectShowcase.tsx`: replaced the per-card `BorderGlow` wrapper with the
  shared `<TracingBorder active={isHovered} radius={20} gradientId=... />` inside
  the card (gradient id `work-trace-${id}`), so work cards get the identical
  moving border. `BorderGlow` is now orphaned (only self-referenced) — left in
  place; safe to delete.
- Verified: `npx tsc --noEmit` clean; `TracingBorder` biome-clean (remaining
  `noImgElement`/`useButtonType` findings are pre-existing on both card files);
  `next build` ✓; `next start` smoke test → /work & /blog both 200. Server
  cleaned up. Not committed.

## 2026-07-07 — Tech logo carousel below ExperimentalTestimonials everywhere
- New shared `src/components/ui/TechLogoCarousel.tsx`: bundles the 11-icon
  `techLogos` array + the about page's exact `<section>` wrapper + `LogoCarousel`
  ("Technology partners"). Single source of truth.
- Added `<TechLogoCarousel />` directly below `ExperimentalTestimonials` on the 4
  pages that lacked it: `home`, `work`, `brand-strategy`, `contact`.
- Refactored `about/page.tsx` to use the shared component (removed its inline
  `techLogos` + the 11 `react-icons/si` imports + `LogoCarousel` import + inline
  section) — identical render, no duplication.
- Done inline (small, cohesive); no subagents, no new deps.
- Verified: `npx tsc --noEmit` clean; new component biome-clean (the 3 biome
  errors across the pages are pre-existing `type Props = {}` / empty-pattern /
  `any` / contact's unused `React`); `next build` ✓; `next start` smoke test →
  all 5 routes 200 with the "Technology partners" carousel present (home shows 2:
  its existing top "Trusted By" LogoLoop + the new one). Server cleaned up. Not
  committed.

## 2026-07-07 — Featured blog: Read Article button matches the list cards
- `src/components/blog/BlogFeaturedSection.tsx`: replaced the plain `bg-zinc-900`
  pill with the same "Read Article" CTA used in the `BlogListSection` cards —
  transparent-until-hover pill, dual `MdArrowOutward` slide, `before:` fill-wipe,
  `pl-0→hover:pl-5` padding shift. Adapted the palette for this light section
  (dark text/icon at rest → dark fill on hover, text flips white) since the card
  version is built for dark cards. Swapped the lucide `ArrowUpRight` import for
  `react-icons/md` `MdArrowOutward`; unique gradient id `cta-featured-icon-grad`.
- Verified: `npx tsc --noEmit` clean; biome clean; `next build` ✓ (/blog
  prerenders). Not committed.

## 2026-07-07 — Blog page: drop hero, open with a featured article
- Removed `BlogHeroSection` (DomeGallery hero) from `src/app/blog/page.tsx`; the
  page now opens with a new `BlogFeaturedSection` then `BlogListSection`.
- New `src/components/blog/BlogFeaturedSection.tsx`: light editorial hero for the
  featured post (falls back to first post) — carries the `page/Header` (which the
  removed hero used to provide), category pill, big linked title, excerpt,
  author/date/read-time meta, "Read Article" CTA, and a large linked cover with a
  "Featured" badge. Two-column, image-first on mobile.
- `BlogListSection.tsx`: excludes `featured` posts from the grid so the featured
  article isn't shown twice (verified: featured title appears once on the page).
- `BlogHeroSection.tsx` is now orphaned (no imports) — left in place; safe to
  delete if wanted.
- Verified: `next build` ✓ (/blog prerenders); `next start` smoke test → /blog
  200 with "Featured Article"/"Read Article"/"Explore our" present, old hero
  label "Blog & Resources" absent, featured title count = 1. tsc clean; new file
  biome-clean. Pre-existing `noUnusedImports` on the user-commented `FaqSection`
  import left as-is. Server cleaned up. Updated CODEBASE_MAP. Not committed.

## 2026-07-07 — Work hero: dedicated white header + stronger black overlay
- New `src/components/work/WorkHeader.tsx`: standalone header for the dark Work
  hero — `/assets/logo.png` logo, white nav links (Services/About Us/Careers/
  Work) with the footer-style underline hover, a `DynamicButton` "Get in Touch",
  and a responsive mobile menu. Replaced the shared `page/Header` in
  `WorkHeroSection` (its links rendered dark/illegible on the dark hero).
- Overlay: the previous radial was too subtle. Now a flat `bg-black/45` tint plus
  a soft centre radial (`rgba(0,0,0,0.35)→transparent`) at `z-[1]` — sits above
  the dome, below the content, so both the header and hero title read clearly
  while the colour dome still shows through.
- Verified: biome-clean (WorkHeader) — only pre-existing `key={index}` remains on
  WorkHeroSection; `npx tsc --noEmit` clean; `next build` ✓ (/work prerenders);
  `next start` smoke test → `/work` 200 with the new header ("Careers"/"Get in
  Touch") + "Selected Work" present. Server cleaned up. Updated CODEBASE_MAP
  (WorkHeader note). Not committed.

## 2026-07-07 — WorkHeroSection: blog-style DomeGallery bg, rotating + colour
- Rebuilt `src/components/work/WorkHeroSection.tsx` to mirror `BlogHeroSection`:
  a full `DomeGallery` background behind the centred label/title/subtitle + the
  bottom 4-stat grid. Kept Work's copy ("Selected Work" / "Our Creative
  Portfolio" / work subtitle / work stats). Dropped the old glow-blob backgrounds
  and the Strands bead (to match the blog hero's clean title).
- Per the ask: dome is now colour (`grayscale={false}`) with a slight black
  overlay (`radial-gradient` ~0.38→0.62 black) so text reads; theme flipped dark
  (`bg-black`, white title/stats, `zinc-300` subtitle, `border-white/15`).
- `src/components/ui/DomeGallery.tsx`: added opt-in `autoRotate` +
  `autoRotateSpeed` (deg/sec, default 4) — a rAF loop that slowly advances the
  horizontal (x-axis) `y` rotation and pauses during drag/inertia/enlarge, then
  resumes. Default off, so `BlogHeroSection` is unaffected. Work hero uses
  `autoRotate autoRotateSpeed={4}`.
- Verified: biome-formatted (remaining findings pre-existing: DomeGallery
  any/template/non-null debt, WorkHero `key={index}`); `npx tsc --noEmit` clean;
  `next build` ✓ (/work prerenders); `next start` smoke test → `/work` 200 with
  "Selected Work"/"Portfolio"/"Client satisfaction" present. Server processes
  cleaned up. Not committed.

## 2026-07-07 — CtaSection: footer-style underline on email/phone (drop white fill)
- `src/components/brand-strategy/CtaSection.tsx`: the "Drop us a line" and "Give
  us a call" blocks previously wiped a full white background in on hover (a
  `before:` pseudo-element) with text flipping to black. Removed that (and the
  `overflow-hidden rounded-xl p-3 -m-3` container hacks + `group-hover:text-*`
  color flips).
- Added the Footer's follow-through underline to the email `<a>` and phone
  `<span>`: `w-fit` value with `text-white/90 → hover:text-white`, plus an
  `absolute -bottom-1 h-[0.5px] w-full origin-right scale-x-0` underline that
  `group-hover:origin-left group-hover:scale-x-100` (wipes in from the left,
  out to the right on leave) — matching `layout/Footer.tsx`.
- Applies everywhere CtaSection is used (home/about/blog/brand-strategy/contact/
  career). Verified: `npx tsc --noEmit` clean; biome format clean; remaining
  biome findings on the file are pre-existing and on untouched lines.

## 2026-07-07 — Fix: dev-server 500s from a leftover `next start` (cache clash)
- Diagnosed the `.next` corruption (`Persisting failed`, `Another write batch or
  compaction is already active`, missing `build-manifest.json` /
  `routes-manifest.json` / `[turbopack]_runtime.js` → 500s on /blog).
- Root cause: a leftover `next start -p 3123` server (started during the earlier
  /build verification; its `pkill/taskkill` cleanup silently failed on Windows)
  was running against the same `.next` as the user's `bun dev` (`next dev`). Two
  Next processes writing one `.next` cache → corruption. Not a code bug.
- Fix: killed all project Next processes (leftover 3123 server + the broken dev
  server) and deleted the corrupted `.next`. No source changes.
- Verified: `npx tsc --noEmit` clean; no project `next` processes remain.
- Note (unrelated/benign, left as-is): `GET /noise.png 404` — `public/noise.png`
  doesn't exist but is referenced by `bg-[url('/noise.png')]` in AboutSection/
  Footer (cosmetic, no texture). The `bis_*` / `fdprocessedid` hydration-mismatch
  warning is injected by browser extensions (Bitdefender / autofill), not code.

## 2026-07-07 — Build: detailed "Read Article" pages for every blog card
- The blog cards linked to `/blog/{slug}` routes that didn't exist (404). Built
  the full article experience matching the site design system (Satoshi, brand
  gradient `#2E5BFF→#149CCB`, premiumEase, `page/Header`, `layout/Footer`,
  reused `CtaSection`).
- New `src/data/blog.ts`: single source of truth — typed `BlogPost` +
  `ContentBlock` union (heading/paragraph/quote/list/callout/image), `categories`,
  and helpers `getPostBySlug`/`getRelatedPosts`. Added `slug`, `date`,
  `authorMeta`, `lead`, `tags`, and detailed per-post `content` (distinct,
  topic-specific article body for all 6 posts).
- Refactored `BlogListSection.tsx` to import the data from `@/data/blog`
  (removed the inline array/types — no logic change).
- New `src/components/blog/BlogArticle.tsx` (client): reading-progress bar
  (useScroll+useSpring), hero (back link, gradient category pill, title, lead,
  author/date/read-time meta), rounded cover image, two-column body with a
  sticky share rail (X/LinkedIn/copy-link) + typographic prose block renderer,
  tags, author bio card, and a "Continue reading" related-posts grid.
- New `src/app/blog/[slug]/page.tsx` (server): `generateStaticParams` over the 6
  slugs, `dynamicParams=false` (unknown slug → 404), per-post `generateMetadata`
  (title/description/OG — closes a prior SEO gap); composes BlogArticle + CTA +
  Footer.
- Done inline (cohesive design work); no subagents, no new deps.
- Verified: `npx tsc --noEmit` clean; `next build` ✓ with all 6 routes
  prerendered as SSG (`● /blog/[slug]` → 6 paths); `next start` smoke test:
  `/blog/google-io-2026` → 200 with hero/callout/author/related all rendering,
  unknown slug → 404. New files biome-clean (BlogListSection's pre-existing
  `noImgElement`/`useButtonType` untouched). Updated CODEBASE_MAP (blog routes,
  data module, corrected font note). Not committed.

## 2026-07-07 — Blog cards: add blur to the moving border
- `src/components/blog/BlogListSection.tsx` (`TracingBorder`): added
  `style={{ filter: "blur(0.8px)" }}` to the comet path to soften it. Just blur —
  no glow/drop-shadow — so the gradient stroke stays the only color.
- Verified: `npx tsc --noEmit` clean; biome format clean.

## 2026-07-07 — Blog cards: tracing border = just the gradient, no glow/blur
- `src/components/blog/BlogListSection.tsx` (`TracingBorder`): removed the path's
  `filter` (the `blur(0.8px)` + `drop-shadow` glow) so the moving border is now
  only the `#2E5BFF → #149CCB` gradient stroke (unchanged linearGradient) —
  nothing more. Lap timing/easing left as-is.
- Verified: `npx tsc --noEmit` clean; biome format clean.

## 2026-07-07 — Blog cards: tune the tracing border (visible lap + soft blur)
- `src/components/blog/BlogListSection.tsx` (`TracingBorder`): the comet was
  already travelling exactly one lap, but `premiumEase` (easeOutExpo) reached
  ~90% progress in the first ~30% of the time, so the lap flashed by and it just
  looked parked at the corner. Swapped it for easeInOutCubic (`[0.65, 0, 0.35, 1]`)
  over `1.5s` so the full round is clearly visible at a steady pace, then
  decelerates and settles onto the top-right corner.
- Softened the "very sharp" stroke: added `blur(0.8px)` to the path filter
  (alongside the glow drop-shadow) and bumped `strokeWidth` 2 → 2.5 to keep it
  readable under the blur.
- Verified: `npx tsc --noEmit` clean; `next build` ✓; biome-formatted.

## 2026-07-07 — Blog cards: border traces once on hover, rests at top-right
- `src/components/blog/BlogListSection.tsx`: replaced the infinite spinning
  conic-gradient hover border with a new `TracingBorder` component. On hover a
  single brand-gradient comet (16% of the perimeter) traces the card's rounded
  border exactly once and decelerates (premiumEase) to a stop resting on the
  top-right corner.
- Precise across aspect ratios (featured card is wide, others tall): it's a
  measured SVG rounded-rect `<path>` whose start point IS the top-right corner
  (45° arc midpoint), with `pathLength={1}` so one `strokeDashoffset` lap
  (START→REST, a decrease of exactly 1) begins and ends there regardless of size.
  Size read via `offsetWidth/Height` (immune to the card's hover-scale) + a
  ResizeObserver; path inset 1.5px stays inside the card's `overflow-hidden`
  rounded clip. AnimatePresence fades it out on unhover (no reverse trace) so it
  replays cleanly on the next hover. Driven by the existing `isHovered` state.
- Verified: `npx tsc --noEmit` clean; `next build` ✓; biome-formatted. Remaining
  biome findings on the file (`noImgElement`, `useButtonType`) are pre-existing
  and on untouched lines.

## 2026-07-07 — About page: more gap between testimonials and logo carousel
- `src/app/about/page.tsx`: increased the LogoCarousel section's top padding from
  `pt-6 md:pt-6` to `pt-20 md:pt-28` (bottom padding `pb-16 md:pb-24` unchanged).
  Widens only the space between `ExperimentalTestimonials` and the `LogoCarousel`.
- Verified: `npx tsc --noEmit` clean.

## 2026-07-07 — Reverted: about-page gap between carousel and testimonials
- Reverted the earlier padding bump; `ExperimentalTestimonials` wrapper in
  `src/app/about/page.tsx` is back to `pt-16 [&>section]:pb-6 md:pt-24 md:pb-10`.
- Verified: `npx tsc --noEmit` clean.

## 2026-07-07 — Fix: Satoshi font not applying (browser default showing)
- Root cause: `globals.css` `@theme inline` block declared `--font-sans:
  var(--font-sans);` — a self-reference. Because it processed after the real
  `@theme { --font-sans: "Satoshi", ... }`, it overrode the good value; the
  compiled CSS emitted `--font-sans:var(--font-sans)`, which is invalid at
  computed-value time, so `font-family: var(--font-sans)` fell back to the
  browser default everywhere.
- Fix: removed the circular `--font-sans: var(--font-sans);` line from the
  `@theme inline` block (kept `--font-heading: var(--font-sans);`, now
  non-circular). Single source of truth is the first `@theme` block.
- Verified: clean `next build` ✓; compiled CSS now emits
  `--font-sans:"Satoshi", ui-sans-serif, system-ui, sans-serif` and the
  `@font-face{font-family:Satoshi;src:url(/fonts/Satoshi-Variable.woff2)...}`;
  woff2 confirmed present at `public/fonts/Satoshi-Variable.woff2`.
- Note: `.next/dev` had stale artifacts (old Geist/next-font CSS) — restart the
  dev server + hard-refresh to see the change locally.

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

## 2026-06-18 — Fonts: declare Satoshi via @font-face in globals.css (default)
- globals.css: added `@font-face { font-family:"Satoshi"; src:
  url("/fonts/Satoshi-Variable.woff2") format("woff2"); font-weight:100 900;
  font-display:swap }` and set `--font-sans: "Satoshi", ui-sans-serif, system-ui,
  sans-serif` (body/html already `font-family: var(--font-sans)` → Satoshi default).
- Removed the redundant `next/font/local` loader from layout.tsx (import, `satoshi`
  const, `satoshi.variable`) so the woff2 isn't loaded twice; nothing else
  referenced `--font-satoshi`.
- Verified: no `next/font`/`--font-satoshi` refs remain; `npx tsc --noEmit` clean;
  biome clean; `next build` ✓.

## 2026-06-18 — Fonts (pass 2): remove Roboto Flex ref + delete unused font files
- Deeper audit found `ui/VariableProximity.tsx` hardcoded `fontFamily: '"Roboto
  Flex", sans-serif'` (unused component, but an other-font ref) → changed to
  `var(--font-sans)` (Satoshi; both variable fonts so the proximity effect still
  works).
- Deleted the unused font files from public/fonts (confirmed unreferenced — no
  code/@font-face refs): `Mersad.ttf`, 8× `PPMori-*.otf`, `Satoshi-VariableItalic.woff2`.
  Folder now holds ONLY `Satoshi-Variable.woff2`.
- No live `font-serif`/`font-mono`/arbitrary `font-[...]`/inline fontFamily remain
  (garbage/ dead code still has `font-mono`, not shipped).
- Verified: no other-font refs in live src; `npx tsc --noEmit` clean; `next build` ✓.

## 2026-06-18 — Fonts: single Satoshi, removed Geist
- `layout.tsx` loaded a second font — `Geist` (next/font/google) — and assigned it
  to `--font-sans`, which was OVERRIDING Satoshi (so the app was actually rendering
  Geist). Removed the `Geist` import, the `geist` const, and `geist.variable` from
  the html class. Now only `satoshi = localFont(Satoshi-Variable.woff2)` →
  `--font-satoshi`, and `--font-sans: var(--font-satoshi)` (globals) resolves
  font-sans to Satoshi everywhere.
- Fixed the stale globals.css comment ("Zalando Sans" → Satoshi).
- Audit: only `Satoshi-Variable.woff2` is referenced in code; no `@font-face`
  anywhere. Other files in public/fonts (PPMori*, Mersad, Satoshi-VariableItalic)
  are NOT referenced/loaded — unused clutter, left in place (safe to delete).
  `font-mono` usages are only in dead `garbage/` components.
- Verified: no `Geist`/`next/font/google` refs remain; `npx tsc --noEmit` clean;
  biome clean; `next build` ✓.

## 2026-06-18 — ContactHeroSection: UI polish pass (user's CardSwap+stats rework)
- Fixed a layout collision: the CardSwap wrapper was `absolute inset-0` over the
  whole section, anchoring the card stack bottom-right ON the stats block.
  Constrained it to the first screen (`absolute right-0 top-0 h-screen w-full
  overflow-hidden`, inner `relative`) so the stack pins to the hero corner and
  never touches the stats.
- Card polish: `customClass="overflow-hidden"`, `object-cover` img + subtle
  bottom `from-black/50` veil for depth; stable `key={img.src}` (was index).
- "Together." got the brand-gradient accent (bg-clip-text + pb-4/pr-1 to avoid
  descender clipping) — matches every other hero's accent word.
- Stats digits stepped down `text-6xl/md:7xl/lg:9xl` → `text-5xl/md:6xl/lg:8xl` so
  long suffixes ("hrs", "/7") don't overflow their grid columns at lg; stable
  `key={stat.label}`. Formatting normalized (biome).
- Verified: `npx tsc --noEmit` clean; biome clean (only tolerated `noImgElement`);
  `next build` ✓ /contact static.

## 2026-06-18 — ContactHeroSection: add description + larger title
- Re-added a description `<motion.p>` below the title in the left column
  (`mt-8 max-w-md text-lg font-medium leading-[1.5em] text-zinc-500`, fade-in).
- Bumped title size a notch: `text-5xl sm:text-6xl … lg:text-[4rem] xl:text-[5rem]`
  → `text-6xl sm:text-7xl … lg:text-[4.5rem] xl:text-[5.5rem]`.
- Verified: `npx tsc --noEmit` clean; `next build` ✓ /contact static (biome: only
  tolerated `noImgElement`).

## 2026-06-18 — ContactHeroSection: match ContactSection width, bigger globe, title image back
- Width/x-padding now match ContactSection: two-column container `mx-auto w-full
  px-6 md:px-10` (dropped `max-w-7xl` → full-width).
- Bigger globe: gave `Globe3DDemo` an optional `className` prop (forwarded to
  `Globe3D`); hero passes `h-[520px] md:h-[640px] lg:h-[700px]` (was the default
  `h-[500px]`).
- Re-added the title split-image animation (cycling STACK_IMAGES between "Let's"
  and "Build", `isExpanded` split reveal via `onAnimationComplete`) + the
  `currentImageIndex` interval and `useEffect`/`useState`.
- Pre-existing biome left as-is: demo `useImportType` (`GlobeMarker`), hero
  `noImgElement`. Verified: `npx tsc --noEmit` clean; `next build` ✓ /contact static.

## 2026-06-18 — ContactHeroSection: 2-col (text left, globe right), no title image
- Redesigned to two columns: copy left (eyebrow + "Let's Build / Together." title,
  left-aligned on lg), `Globe3DDemo` right (`lg:w-1/2`). Removed the title's cycling
  split-image and the now-dead `STACK_IMAGES` + `currentImageIndex`/`isExpanded`
  state + interval `useEffect` + `useEffect`/`useState` imports.
- Title size steps down at lg (`lg:text-[4rem]`) to fit the half column; globe is
  the unchanged `Globe3DDemo` (self-sizes `h-[500px] w-full`).
- Verified: `npx tsc --noEmit` clean; biome fully clean (no more `<img>`);
  `next build` ✓ /contact static.

## 2026-06-18 — ContactHeroSection: add 3D globe below title, drop description
- Added the user's `Globe3DDemo` (`src/components/3d-globe-demo.tsx`, wrapping
  `Globe3D` from `ui/3d-globe`) below the title in the centered hero, wrapped in a
  `motion.div` fade-in (`mt-6 w-full max-w-3xl`). Removed the description `<motion.p>`.
  Hero layout otherwise unchanged.
- No new deps: the globe uses `@react-three/fiber`/`drei`/`three` (all already
  installed); it does NOT import `three-globe` (so that missing pkg is irrelevant).
  Globe3D self-sizes (`h-[500px] w-full`). Client-side Canvas → page still
  prerenders static.
- Verified: `npx tsc --noEmit` clean; biome (only tolerated `noImgElement`);
  `next build` ✓ /contact static.

## 2026-06-18 — ContactHeroSection: REVERTED to pre-CardSwap (centered hero)
- Removed CardSwap entirely and restored the original centered hero: the
  word-stagger title with the cycling split-image between "Let's" and "Build"
  (STACK_IMAGES + currentImageIndex interval + isExpanded split reveal), centered
  layout, original description. Reverts the two-column redesign + CardSwap.
- Verified: no CardSwap refs remain; `npx tsc --noEmit` clean; `next build` ✓
  /contact static (biome: only tolerated `noImgElement`).

## 2026-06-18 — ContactHeroSection: bigger CardSwap
- Enlarged the CardSwap: `width` 440→580, `height` 320→420; bumped stack offsets
  `cardDistance` 60→70, `verticalDistance` 70→80 (proportional spread); wrapper
  heights `h-[420px]/sm:500/lg:620` → `h-[480px]/sm:580/lg:720`.
- Verified: `npx tsc --noEmit` clean; `next build` ✓ /contact static (biome: only
  tolerated `noImgElement`).

## 2026-06-18 — ContactHeroSection: two-column redesign (text left, CardSwap right)
- Redesigned from a centered title into a 2-col layout: copy left (eyebrow, title,
  description — left-aligned on lg), CardSwap right. Right column is `lg:w-1/2`
  flush to the section's right edge (no right padding) so the CardSwap (anchored
  `absolute bottom-right`) touches the section end.
- Removed the cycling split-image from the title (now just "Let's Build /
  Together.") and the now-dead `currentImageIndex`/`isExpanded` state + the
  interval `useEffect` + the `useEffect`/`useState` imports.
- CardSwap uses the 3 STACK_IMAGES as image cards; title size steps down at lg to
  fit the half-column. `overflow-hidden` section clips the cards at the right edge.
- Verified: `npx tsc --noEmit` clean; `next build` ✓ /contact static (biome: only
  tolerated `noImgElement`).

## 2026-06-18 — ContactHeroSection: use the new CardSwap component
- Integrated the user-added `CardSwap` (GSAP 3D card-swap; default export + `Card`
  named export) into the contact hero as a decorative bottom-right 3D stack
  (`absolute bottom-0 right-0 z-10 hidden lg:block`, `pointer-events-none`), using
  the example props (cardDistance 60, verticalDistance 70, delay 5000,
  pauseOnHover false) + `width={400} height={290}`.
- Card content: the 3 existing `STACK_IMAGES` as image cards (object-cover +
  bottom gradient) instead of the example's placeholder text. Desktop-only so it
  doesn't clash with the centered title on smaller screens. `gsap` already a dep.
- Verified: `npx tsc --noEmit` clean; `next build` ✓ /contact static (biome: only
  tolerated `noImgElement` warnings).

## 2026-06-18 — WorkProjectShowcase: stronger, more-visible BorderGlow
- Glow was too subtle. Boosted the BorderGlow props: `glowIntensity` 1 → 2.6
  (brighter), `glowRadius` 26 → 50 (bigger spread), added `edgeSensitivity={10}`
  (triggers across much more of the card, not just the very edge) and
  `fillOpacity={0.9}` (stronger edge fill); `glowColor` lightness 62 → 65.
- Verified: `npx tsc --noEmit` clean; `next build` ✓ /work static (biome unchanged
  — same pre-existing img/useButtonType findings, none added).

## 2026-06-18 — WorkProjectShowcase: BorderGlow on the project cards
- Integrated the (previously unused) `BorderGlow` ui component as each project
  card's frame: the scale `motion.div` now wraps `<BorderGlow>` (borderRadius 20,
  black bg, brand colors `#2E5BFF/#149CCB/#7C3AED`, blue `glowColor`), and an inner
  `relative overflow-hidden rounded-[20px]` div holds the image/overlays/content
  (heights moved there). So BorderGlow's cursor-following mesh-gradient glow + drop
  shadow now surround the cards.
- Structure chosen so BorderGlow's outer glow isn't clipped (scale on the outer
  wrapper, not inside BorderGlow's overflow-auto). Removed the card's two old
  border effects (static `border-white/10` + spinning conic hover border) since
  BorderGlow replaces them.
- Pre-existing biome left as-is (not from this change): `<img>` warning +
  `useButtonType` on the category tab.
- Verified: `npx tsc --noEmit` clean; `next build` ✓ /work static.

## 2026-06-18 — WorkHeroSection: split-reveal the Strands bead
- Words appear first, then split + Strands appears: wired the (previously unused)
  `isExpanded` state — `onAnimationComplete` on the h1 sets it after the word
  stagger; the bead container then transitions `mx-1.5 w-0 opacity-0` →
  `mx-3 md:mx-6 w-[1.2em] opacity-100` (1200ms, premium ease), opening the gap and
  fading the orb in. (Also fixes the prior unused-`isExpanded` lint.)
- Strands.tsx: added a `ResizeObserver` on its container so the WebGL canvas
  resizes as the bead's width animates open (window-resize-only wasn't enough);
  disconnected on cleanup. Pre-existing Strands lint (vendored WebGL: import-type,
  optional-chain, exhaustive-deps) left untouched — not from this change.
- Verified: `npx tsc --noEmit` clean; `next build` ✓ /work static.

## 2026-06-18 — WorkHeroSection: place Strands bead properly + map /work
- The `Strands` glass-orb (renders a circle of radius 0.46×height) sat in a
  `2.5em × 1em` (wide/short) box, so the orb was a small circle lost in a wide box
  with big empty side-gaps + asymmetric spacing (`Creative` had an extra
  `ml-3 md:ml-6` on top of the box's `0.25em` margin).
- Fix: made the container **square** (`h-[1.2em] w-[1.2em]`) so the orb fills it as
  a bead, symmetric `mx-3 md:mx-6` spacing (removed Creative's `ml-`), `shrink-0`,
  Tailwind instead of inline style. Strands props unchanged.
- Map: added the **/work** route (`WorkPage` `src/app/work/page.tsx:9`,
  components dir `work/`) — it was missing — and corrected CareerPage line to `:11`.
- Pre-existing biome (not from this change, left): unused `isExpanded` state
  (vestigial from the StrategyHeroSection copy) + `key={index}` in the stats map.
- Verified: `npx tsc --noEmit` clean; `next build` ✓ /work static.

## 2026-06-18 — OurTeamSection: switched to scroll-VELOCITY shift (visible)
- The position-based ±4% drift (over the whole scroll pass) was masked by the
  steady auto-scroll → "didn't reflect". Switched to a scroll-velocity shift:
  `useVelocity(scrollY)` → `useSpring` → `x = useTransform(v, [-2000,2000],
  ["4%","-4%"], {clamp:true})` on the card-row `motion.div`. The row now lurches
  horizontally in the scroll direction proportional to scroll speed and springs
  back to rest — a clearly visible reaction distinct from the auto-scroll.
- Kept the over-width wrapper (`w-[110%] -ml-[5%]`); ±4% clamp (×1.1 = 4.4% < 5%
  buffer) stays gap-free. Dropped the section ref/target useScroll (page scroll
  velocity is enough). Header unaffected.
- Verified: `npx tsc --noEmit` clean; biome (only tolerated `noImgElement`);
  `next build` ✓ /about static.

## 2026-06-18 — OurTeamSection: horizontal scroll-shift on the card row
- Added a horizontal scroll-parallax: `useScroll` (section) →
  `x = useTransform(scrollYProgress, [0,1], ["-4%","4%"])` applied to a `motion.div`
  wrapping `CarouselContent`, so the card row nudges left/right as you scroll
  (echoing scroll direction), composing with embla's auto-scroll (different
  elements, no transform conflict).
- Gap-free: the wrapper is over-width (`w-[110%] -ml-[5%]`) so the ±4% shift never
  exposes the section's white edge (buffer 5% > 4%×1.1). Header unaffected (only
  the cards wrapper shifts). %-based so it's safe across screen sizes.
- Verified: `npx tsc --noEmit` clean; biome (only tolerated `noImgElement`);
  `next build` ✓ /about static.

## 2026-06-18 — OurTeamSection: REVERTED parallax (no scroll animation)
- Reverted the vertical parallax and removed the animation entirely: dropped
  `useScroll`/`useTransform`/`useSpring`/`y`, the `containerRef` + `ref`, and the
  `motion.div` wrapper (→ plain `div`); removed the framer-motion import. The
  section is now a plain carousel (autoscroll + arrows) with no scroll-linked motion.
- Verified: no motion/parallax residue; `npx tsc --noEmit` clean; biome (only
  tolerated `noImgElement`); `next build` ✓ /about static.

## 2026-06-18 — OurTeamSection: added vertical scroll-parallax
- Added a spring-smoothed vertical parallax: `useScroll` (section ref, offset
  start-end→end-start) → `y = useSpring(useTransform(scrollYProgress,[0,1],[60,-60]))`
  applied to a `motion.div` wrapping the carousel. The block drifts ±60px as the
  section scrolls through. Gap-free (vertical within the section) and no conflict
  with embla's horizontal auto-scroll.
- Verified: `npx tsc --noEmit` clean; biome (only tolerated `noImgElement`);
  `next build` ✓ /about static.

## 2026-06-18 — OurTeamSection: removed the scroll-tilt entirely
- Removed the scroll-driven rotation: dropped `useScroll`/`useTransform`/`rotate`,
  the `containerRef` + `ref`, and the wrapping `motion.div` (→ plain `div`); removed
  the now-unused framer-motion import. Carousel + autoscroll (no stop-on-hover) and
  arrows unchanged.
- Verified: no motion/rotate/useScroll residue; `npx tsc --noEmit` clean; biome
  (only tolerated `noImgElement`); `next build` ✓ /about static.

## 2026-06-18 — OurTeamSection: REVERTED the wider scroll-tilt
- Per request, reverted the prior change: `[-5,5]` + `useSpring` → back to
  `const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2])`; removed the
  `useSpring` import. (The earlier verify+cleanup pass — dead React import removal
  / import sort — stays.)
- Verified: no `useSpring`/`[-5,5]` residue; `npx tsc --noEmit` clean; biome
  (only tolerated `noImgElement`); `next build` ✓ /about static.

## 2026-06-18 — OurTeamSection: make the scroll-tilt actually visible
- Follow-up ("didn't reflect"): the existing tilt was `[-2,2]` centered on 0, so
  at the viewing position (~center) the angle was ~0° → imperceptible. Widened to
  `[-5,5]` (10° swing) and spring-smoothed (`useSpring`, stiffness 50 / damping 20)
  so the orientation visibly swings as the section scrolls through the viewport.
- Verified: `npx tsc --noEmit` clean; biome (only tolerated `noImgElement`);
  `next build` ✓ /about static.

## 2026-06-18 — OurTeamSection: scroll-tilt + no stop-on-hover (verify + cleanup)
- Both requested behaviors were already implemented (prior un-logged turn):
  scroll-driven orientation via `useScroll` + `rotate = useTransform(scrollYProgress,
  [0,1], [-2,2])` on a wrapping `motion.div`; AutoScroll `stopOnMouseEnter: false`.
- Cleanup: removed the dead `React` default import (named hooks still used) and
  let biome organize the imports, so the file is lint-clean (only the tolerated
  `noImgElement` warning remains).
- Verified: `npx tsc --noEmit` clean; biome clean; `next build` ✓ /about static.

## 2026-06-18 — ContactSection: channel cards get CtaSection's interactive grid
- Upgraded the static `BoxyGrid` to an interactive `ChannelCard` that replicates
  CtaSection's effect per card: own `hoveredIndex` + `mouseX/mouseY`, a
  cursor-following `useMotionTemplate` radial mask (280px) that reveals the dark
  cell grid (8 cols × 80 cells), and per-cell proximity glow (brand gradient,
  `getIntensity` distance falloff). Content lifted `relative z-10`; kept the
  reduced `from-black/40` overlay.
- Added `useMotionTemplate`/`useMotionValue` imports; `noStaticElementInteractions`
  biome-ignores on the card + cell (decorative cursor tracking), matching the
  OurValuesSection/CtaSection pattern. Stable `boxyCellIds` keys (no index keys).
- Verified: `npx tsc --noEmit` clean; biome clean; `next build` ✓ /home static.

## 2026-06-18 — ContactSection: boxy grid on channel cards, drop dot grid
- Removed the section's radial dot-grid background (+ its edge-fade overlays);
  section keeps the solid `bg-[#0a0a0a]`.
- Added a static "boxy grid" to each channel card — the dark rounded-cell pattern
  from CtaSection rendered as a card bg via a `BoxyGrid` helper (auto-fill
  `minmax(2.75rem,1fr)` grid of `aspect-square rounded-xl bg-[#161616]` cells, 72
  cells, stable `boxyCellIds` keys, no per-card mouse interactivity so it's cheap).
  Content lifted with `relative z-10`.
- Reduced black overlay: a light `bg-gradient-to-t from-black/40 to-transparent`
  (vs CtaSection's heavier `from-black/25 via-black/5 to-black/30`) so the grid
  shows through while keeping the bottom label/value readable.
- Verified: `npx tsc --noEmit` clean; biome clean; `next build` ✓ /home static.

## 2026-06-18 — Contact page: more gap between hero and ContactSection
- Added `mt-12 md:mt-24` to the `ContactSection` wrapper div in
  `src/app/contact/page.tsx` to widen the gap below ContactHeroSection.
- Verified: `npx tsc --noEmit` clean; `next build` ✓ /contact static. (biome on
  this page shows only pre-existing loose-type debt — `type Props = {}`, `{}: any`,
  unused React import — not from this change.)

## 2026-06-18 — ContactSection: tag matches WhyJoinUs eyebrow
- "Get in touch" tag restyled to the WhyJoinUs tag: gradient-bold eyebrow
  (`text-sm font-bold tracking-widest bg-clip-text`) → `inline-flex items-center
  gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/60` (kept
  ContactSection's `mb-8`).
- Verified: `npx tsc --noEmit` clean; biome clean; `next build` ✓ /home static.

## 2026-06-18 — ContactSection: rotating word anim matches ExperimentalTestimonials
- ContactSection's headline rotating word used a 3D rotateX flip; changed it to
  exactly match ExperimentalTestimonials' horizontal slide:
  `initial {x:40,opacity:0}` / `animate {x:0,opacity:1}` / `exit {x:-40,opacity:0}`,
  `transition {duration:0.4, ease:"easeOut"}`. Dropped `rotateX`,
  `transformPerspective`, `origin-center`; added `whitespace-nowrap`. Wrapper
  (`inline-grid overflow-hidden py-2` + `AnimatePresence mode="wait"`) already matched.
- `premiumEase` still used by the column reveal animations.
- Verified: `npx tsc --noEmit` clean; biome clean; `next build` ✓ /home static.

## 2026-06-18 — Contact descriptions: match OurValuesSection standard
- Standardized the description `<p>` styling on OurValuesSection's
  (`text-lg font-medium text-zinc-400 leading-[1.6em]`):
  - ContactHeroSection (contact): `text-lg font-normal leading-relaxed
    text-zinc-500 md:text-xl` → `text-lg font-medium leading-[1.6em] text-zinc-400`
    (kept `max-w-xl mt-8`).
  - ContactSection (home): `… leading-relaxed … md:text-xl` → `leading-[1.6em]`,
    dropped `md:text-xl` (color/weight already matched). Kept `mt-6`.
- Both descriptions now share size/leading/weight/color; only layout classes differ.
- Verified: `npx tsc --noEmit` clean; biome only tolerated `noImgElement`;
  `next build` ✓ static.

## 2026-06-18 — ContactSection (home): added Phone + Company fields
- Added a 2-col row (Phone Number `type="tel"`, Company `type="text"`, both
  optional) after the Name/Email row in the form, matching the existing field
  markup (label `text-xs font-bold uppercase` + `inputClass`).
- Incidental: re-added the `<title>` to the select-chevron `<svg>` (a prior fix
  the form rework had dropped → `noSvgWithoutTitle`) so the file is lint-clean.
- Verified: `npx tsc --noEmit` clean; biome clean; `next build` ✓ /home static.

## 2026-06-18 — StrategyHeroSection: more gap between title and stats
- Added `mt-16 md:mt-24` to the bottom Stats (`AgencyStats`) wrapper so there's
  more breathing room between the centered title block and the stats row.
- Verified: `npx tsc --noEmit` clean; biome only tolerated `noImgElement`;
  `next build` ✓ /brand-strategy static.

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

## 2026-07-10 — WorkHeroSection DomeGallery: uneven tiles + mixed image/video (/worker)
- `ui/DomeGallery.tsx`: item model now supports video (`type?: "image"|"video"`,
  inferred from .mp4/.webm/.mov). `buildItems` assigns deterministic per-slot
  sizes — videos landscape 2×1.3, every 3rd image slot portrait 1.5×2, rest
  square 2×2 (never >2 per axis: sphere-grid overlap). Video tiles capped at 12
  (stride = totalSlots/12) to avoid ~50+ autoplaying videos. Tile JSX renders
  `<video muted loop autoPlay playsInline preload="metadata">` for video items;
  enlarge overlay + close animation handle `img, video` (playing video enlarges).
  Backward compatible: all-image pools fill every slot as before.
- `work/WorkHeroSection.tsx`: passes explicit `GALLERY_MEDIA` (6 unsplash images
  + local `/assets/video1–4.mp4`) to the dome.
- Routing (worker mode): step1 DomeGallery model → opus ✓, step2 video
  render/enlarge → opus ✓, step3 hero media pool → sonnet ✓; 0 driver steps,
  no reroutes.
- Verified: tsc clean; biome clean on both files (repo has 9 pre-existing errors
  elsewhere); `next build` ✓ /work static; SSR HTML of /work shows 12 video
  tiles (all 4 mp4s), 12× size-y:1.3, 53× size-x:1.5, 105× 2×2;
  spec-verifier APPROVED (no P0–P2).

## 2026-07-10 — DomeGallery: reduce + even out the card gap (/worker)
- The uneven-card sizing (portrait 1.5×2, landscape 2×1.3) had made gaps big and
  asymmetric because the `.sphere-item` rotation centered each cell with a
  SIZE-DEPENDENT term `((--item-size-x)-1)/2`, pinning a rectangular card's edge
  to its slot instead of centering it. Fix (user chose "uniform gap, keep aspect
  variety"): replaced that term with the fixed slot constant `0.5` in BOTH the CSS
  transform AND JS `computeItemBaseRotation` (lockstep, so the enlarge animation
  stays aligned) → every card now sits centered in its 2-unit slot with symmetric
  gaps. Cards keep varied size (`.sphere-item` width/height still use
  `--item-size-x/y`). Also shrank the tile inset `10px → 4px` in the 3 gap spots
  (`.item__image`, `.item__image--reference`, inline tile style) — gap ~20px→8px
  for square cards; left both `box-shadow:0 10px 30px` values intact.
- Routing: step1 centering (CSS+JS coherence) → opus ✓; step2 inset 10→4 → sonnet
  ✓. 0 driver steps, no reroutes.
- Verified: tsc clean; biome clean on the file; `next build` ✓ /work static; live
  SSR /work HTML shows `offset-x)+0.5` centering + `inset: 4px` and no old
  size-based centering; spec-verifier APPROVED (only P3 = 2 now-inert params in
  computeItemBaseRotation, Biome-clean, left as-is for minimal diff).

## 2026-07-10 — DomeGallery: more video tiles (/task)
- Bumped the video-tile cap in `buildItems` (`ui/DomeGallery.tsx`) from `12` → `24`
  (one-line constant), doubling how many dome tiles render as autoplaying video.
  Stride auto-recomputes (`floor(totalSlots/cap)`), so the 24 video tiles stay
  evenly spaced and keep cycling the 4 clips (`/assets/video1–4.mp4`). Aspect
  (video = landscape 2×1.3) and all other geometry unchanged.
- Verified: `npx tsc --noEmit` clean; full SSR `/work` HTML shows 24
  `data-src="/assets/videoN.mp4"` wrapper tiles (was 12). Minimal diff; no deps.

## 2026-07-10 — Reduce ExperimentalTestimonials → TechLogoCarousel gap (all pages) (/task)
- The gap between the testimonials section and the tech-logo carousel (paired on
  home/about/brand-strategy/contact/work) was the sum of the testimonials' bottom
  padding + the carousel's top padding. Carousel top padding (`pt-20 md:pt-28`) was
  never overridden on any page → the common big contributor. Fixed in 2 shared
  components (0 page files):
  - `ui/TechLogoCarousel.tsx`: `pt-20 … md:pt-28` → `pt-6 … md:pt-10` (bottom
    `pb-16 md:pb-24` kept — that's the gap to the next section). Reduces the gap on
    ALL 5 pages.
  - `home/ExperimentalTestimonials.tsx`: `py-16 md:py-20` → `pt-16 pb-6 md:pt-20
    md:pb-10` (top kept; bottom trimmed). Only bites on home + brand-strategy
    (the unwrapped pages); about/contact/work already override the section's
    bottom via `[&>section]:pb-*` wrappers, so no change there — makes all pages
    consistent.
- Verified: `npx tsc --noEmit` clean; biome clean on both files; `next build` ✓;
  SSR HTML of all 5 pages shows the reduced carousel `pt-6 md:pt-10` and the
  trimmed testimonials padding. Minimal diff (2 lines), no deps, no page edits.

## 2026-07-10 — TracingBorder: smooth comet + stronger TR/BL corner handoff (/worker)
- Work-page project cards' moving border (`ui/TracingBorder.tsx`, shared with blog
  cards). Two fixes:
  1. **Smoothness:** the single cubic-bezier spanned both comet laps (crawl at
     start/end) and the dash tween ended at LAP_DURATION while opacity faded a
     FROZEN comet (visible hitch). Now keyframed `strokeDashoffset: [2,1,0]`,
     `times [0,0.45,1]`, ease `[easeIn, easeOut]` (accelerate lap 1, decelerate
     landing), LAP_DURATION 2.2→2.6, and the fade overlaps motion
     (`delay: LAP_DURATION-0.45`, 0.45s) — comet dissolves while still moving.
  2. **Corner weight:** glow reach 0.35→0.5·min(w,h); both corner mask gradients
     softened (white→25%, #555 @65%); edge fade level #222→#2e2e2e over 1.1s; BL
     stagger +0.15→+0.12; static border strokeWidth 2→2.25. Comet path untouched.
- Routing: step1 comet timing → opus ✓; step2 corner values → sonnet ✓; 0 driver
  steps, no reroutes. Driver fixed a P3 stale comment (#222→#2e2e2e) post-verify.
- Verified: tsc + biome clean; `next build` ✓ /work + /blog; spec-verifier
  APPROVED (values, framer v12 keyframe semantics, timing coherence — no dead
  window between comet fade [2.15–2.6] and corner bloom start [2.45] — and mask
  polarity all confirmed; only the P3 comment nit, fixed).

## 2026-07-10 — DomeGallery rebuilt on user's revert: varied image sizes, consistent gaps (/task)
- User reverted `ui/DomeGallery.tsx` to a pre-session version, dropping video
  support, uneven sizing, 0.5-centering, 4px inset AND `autoRotate` → tsc was
  FAILING (WorkHeroSection passes autoRotate) and video pool entries would have
  rendered as broken img tiles. User chose: images only, varied sizes,
  consistent gaps, restore autoRotate, drop videos.
- `ui/DomeGallery.tsx` (on the reverted base): buildItems now assigns
  deterministic per-slot variants — `i%3===1` portrait 1.5×2, else `i%4===3`
  landscape 2×1.3, else square 2×2 (never >2/axis); re-applied 0.5 centering
  (CSS transform + computeItemBaseRotation lockstep) and inset 10px→4px (3 spots);
  restored `autoRotate`/`autoRotateSpeed` props + pause-aware RAF effect. NO
  video code (respecting revert).
- `work/WorkHeroSection.tsx`: removed the 4 `/assets/videoN.mp4` entries from
  GALLERY_MEDIA (6 unsplash images remain).
- Verified: tsc failing→clean; biome clean both files; `next build` ✓ /work;
  SSR /work shows 57 portrait / 28 landscape / 85 square tiles, 0.5 centering,
  inset 4px, zero dome video tiles; spec-verifier APPROVED (no P0–P2; one P3
  `let`-vs-`const` nit inside user-reverted code, left untouched).

## 2026-07-10 — TracingBorder: solid #2E5BFF on work project cards only (/task)
- Added optional `color?: string` prop to `ui/TracingBorder.tsx`; when set, the
  comet + static-border strokes use that solid color via `stroke={color ??
  url(#gradient)}` (gradient <defs> stay, unused when color is set). Passed
  `color="#2E5BFF"` from `work/WorkProjectShowcase.tsx` only → work project cards'
  moving border is now solid brand blue. Blog cards pass no `color` → keep the
  blue→cyan gradient (unchanged). Corner-glow luminance masks untouched.
- Verified: tsc + biome clean on both files; `next build` ✓ /work. (Border only
  renders on hover with measured size, so not in SSR — verified at code level +
  build; user eyeballs hover on :3000.) Minimal diff (~5 lines, 2 files), no deps.

## 2026-07-10 — Homepage mobile responsiveness, desktop pixel-identical (/worker)
- Explore-agent audit first: homepage largely responsive already (hero text,
  header hamburger, footer vw-brand, contact/blog grids all stack; about pin +
  service rotate GSAP size-agnostic; Stats/Testimonials already have <768 JS
  branches). Real issues were fixed additively — smaller base/sm: values with
  every old value re-asserted at its original breakpoint (md+ byte-identical):
  1. AboutSection: rings 520/420px → 320/260px base (md: restores); card stack
     h-560 → h-420 base (md:h-[560px]).
  2. StatsSection: number text-[7rem] → text-[4.5rem] base + sm:text-[7rem]
     (md:text-[10rem] untouched).
  3. ExperimentalTestimonials: cards w-[300px] sm:w-[360px] md:w-[440px] + step
     JS 3-tier (<640→316, <768→376, ≥768→452; ≥640 identical to old 360+16/440+12).
  4. home/page.tsx Trusted-By row stacks at base (flex-col gap-4, divider hidden),
     sm: restores row layout. GSAP untouched.
  5. Blog pb-40→pb-20 md:pb-40, mb-30→mb-16 (md:mb-35 kept); Service py-32→
     py-16 md:py-32.
- Deliberately untouched (documented): Portfolio horizontal-scroll pin (recalcs
  from innerWidth, scroll-scrub works on touch) and hover-only custom cursors
  (inert on touch) — per "don't change desktop animations".
- Routing: 4 sonnet + 1 opus (testimonials CSS/JS lockstep), 0 driver, all 5
  dispatched in parallel, no reroutes/failures.
- Verified: tsc + biome clean (6 files); `next build` ✓ /home; SSR /home HTML
  shows every new class incl. 8× three-tier card widths; spec-verifier APPROVED
  (md+ invariant confirmed hunk-by-hunk, 640-767 band identical, step/gap math
  cross-checked; no P0-P2).

## 2026-07-10 — Fix invisible mobile hero + mobile animation removal (/worker)
- **Hero bug root cause:** Herosection root was `relative lg:min-h-[96.5vh]` with
  ALL children absolute → 0px height below lg (invisible on mobile AND tablet).
  Fixed: base `min-h-[100svh]` added, `lg:min-h-[96.5vh]` kept (desktop identical).
- **Mobile (<768px) now animation-free / native:** all via matchMedia so desktop
  code paths are byte-identical:
  - `app/home/page.tsx`: about pin+scale/fade + service scale/rotate scrubs moved
    (indent-only) into `gsap.matchMedia().add("(min-width: 768px)")` + revert.
  - `layout/SmoothScroll.tsx`: `(max-width: 767px)` early-return — no Lenis/ticker
    on mobile (native scroll), keeps plugin registration + delayed ST.refresh.
  - `home/PortfolioSection.tsx`: entire useGSAP body (cursor, 500vw horizontal
    pin, text reveals) gated to ≥768; mobile layout = simple vertical stack
    (section h-auto md:h-screen; track flex-col md:w-max md:flex-row, inline
    500vw width REMOVED — md:w-max × md:w-screen panels ≡ 500vw; panels
    h-[70svh] w-full md:h-screen md:w-screen).
  - Light entrance fades/marquees deliberately kept (approved interpretation).
- Routing: 3 sonnet + 1 opus (portfolio), 0 driver, parallel dispatch, no
  reroutes. spec-verifier round 1 caught a real P1: the "View Project" cursor
  pill's only hide (gsap.set scale:0) was now desktop-gated → visible top-left
  on mobile. Driver fixed via `hidden ... md:flex` on the pill; round 2 APPROVED.
- Verified: tsc + biome clean (4 files); `next build` ✓ /home; SSR /home shows
  min-h-[100svh] hero, 5 stacked h-[70svh] panels, flex-col track with md:
  restores, zero inline 500vw. 768-1023 band: hero now visible (was 0px) —
  strict improvement, desktop lg unchanged.
