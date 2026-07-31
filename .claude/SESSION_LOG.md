# Session Log

## 2026-07-10 — Reconcile parallel mobile de-animation work; push to origin/main
- **Situation:** local `main` (`b615c64` "update" + WIP) and `origin/main` (3 commits)
  had **independently** implemented the same "mobile: remove animations → static cards"
  task from base `0a8149c`, overlapping on 8 homepage files. Push was rejected
  (non-fast-forward); pull blocked by uncommitted Blog/Contact edits.
- **User chose:** merge remote into local, resolve, push (over keep-remote / force-push).
- **Did:** committed WIP (`c7b417e`), made backup branch `backup/pre-merge-c7b417e`,
  then `git merge -X theirs origin/main` (prefer remote on conflicts — it's the complete
  impl and carries extra WorkHeroSection/DomeGallery/TracingBorder/projects.ts work).
  Non-overlapping local hunks (e.g. `ContactSection` de-animation + `useIsDesktop` hook)
  survived. Merge = `7b5d3d5`.
- **Fixed:** merge dropped the `isDesktop` opening ternary around About's card-stack →
  unbalanced JSX (tsc TS1381). Restored it + `biome format` that one file (`8580b28`).
- **Removed:** `package-lock.json` — accidental artifact from this session's npm
  troubleshooting; project uses Bun. Recoverable from `b615c64`.
- **Verified:** `bunx tsc --noEmit` clean; Biome error count identical pre/post-merge
  (324 — pre-existing repo-wide debt, no new errors introduced). NOTE: no visual/mobile
  verification was possible from this environment (no browser could reach localhost;
  Next refused a 2nd dev server) — desktop-unchanged guaranteed structurally
  (`gsap.matchMedia('(min-width:768px)')` + `max-md:`/`isDesktop` gating only).

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

## 2026-07-10 — Homepage header: smaller mobile logo + more mobile padding (/task)
- `layout/Header.tsx` (home-only header) — two scoped edits, no shared-component
  changes:
  1. `CustomLogo` (local): replaced fixed inline `width:90px` with responsive
     classes `w-[64px] md:w-[90px]` (kept `style={{height:"auto"}}` for aspect).
     Phones → 64px; md+ → 90px. NavBody is `lg:hidden`-gated's counterpart (shows
     only lg+) so desktop logo stays 90px — identical.
  2. Mobile top bar: passed `className="px-8 py-6 ..."` to `<MobileNavHeader>` (was
     px-6 py-4 base); cn/tailwind-merge lets the passed values win. MobileNav is
     `lg:hidden`, so this only affects mobile/tablet — desktop NavBody padding
     untouched.
- Verified: tsc + biome clean; SSR /home shows both logo instances with
  `w-[64px] md:w-[90px]` (2×) and the mobile header `px-8 py-6` (1×), zero
  leftover inline `width:90px`. Minimal diff (2 lines, 1 file), no deps.

## 2026-07-10 — Fix ServiceSection "View Services" cursor leaking into hero on mobile (/task)
- Same bug class as the earlier Portfolio "View Project" pill: ServiceSection's
  custom cursor `<div>` (`fixed left-0 top-0 z-[9999]`, rendered via createPortal)
  had its only hide (`gsap.set(cursor,{scale:0})`) inside the desktop-gated
  `mm.add("(min-width: 768px)")` block. On mobile that never runs → the "View
  Services" pill renders at scale 1 in the top-left corner, overlapping the hero.
- Fix (`home/ServiceSection.tsx`, 1 line): cursor pill className `flex` →
  `hidden ... md:flex` so it's display:none <768px regardless of GSAP; md+
  identical (flex + transform scale coexist). Mirrors the portfolio pill fix.
- Verified: tsc + biome clean; source confirms `hidden ... md:flex`. (Pill is a
  client-only portal, absent from SSR HTML — verified at code level.) Minimal
  diff (1 line), no deps.

## 2026-07-10 — Homepage mobile header: more y padding (/task)
- `layout/Header.tsx`: `<MobileNavHeader>` className `px-8 py-6` → `px-8 py-8`
  (mobile top bar y padding 24px → 32px). MobileNav is `lg:hidden` so desktop
  NavBody untouched. Verified: tsc + biome clean; SSR /home shows `px-8 py-8`
  (1×), zero leftover `py-6`. 1-line diff, no deps.

## 2026-07-10 — Homepage Trusted-By row: center text + drop divider on mobile (/task)
- `app/home/page.tsx` Trusted-By/LogoLoop row (mobile scope):
  1. "Trusted By" wrapper `shrink-0` → `w-full shrink-0 text-center sm:w-auto
     sm:text-left` — centers the text on mobile (flex-col); reverts to left/auto
     at sm+ (desktop identical). Loop div untouched (no width regression).
  2. Vertical divider `hidden ... sm:block` → `hidden ... md:block` — the row's
     only border/line element; now hidden through the whole mobile range
     (<768), shown at md+ (desktop unchanged). NOTE: section has NO literal
     border-bottom class — the divider is the only line, so treated it as the
     "border bottom" the user described.
- Verified: tsc + biome clean; SSR /home shows centered wrapper + `md:block`
  divider, zero `sm:block`. Preview harness still can't hold a server for this
  workspace (parent-dir cwd), so no screenshot — verified via rendered DOM.

## 2026-07-10 — AboutSection: smaller title + less x-padding (/task)
- `home/AboutSection.tsx` (all breakpoints — task not scoped to mobile):
  1. Title `text-5xl md:text-7xl lg:text-[4rem]` → `text-4xl md:text-6xl
     lg:text-[3.5rem]` (48→36 / 72→60 / 64→56px).
  2. Section x-padding `md:px-12 lg:px-10` → `md:px-8 lg:px-8` (48/40 → 32px);
     base `px-6` kept.
- Verified: tsc + biome clean; SSR /home shows new title + `md:px-8 lg:px-8`,
  zero old `text-5xl … text-7xl` title / `md:px-12`. 1-file, 2-line diff, no deps.

## 2026-07-10 — ServiceSection: reveal thumbnails on mobile (/task)
- Root cause: each service's image container is `w-0 opacity-0` by default and
  only expands via `group-hover:w-[80px] group-hover:opacity-100` — on touch
  there's no hover, so the thumbnails never appear on mobile.
- Fix (`home/ServiceSection.tsx`, 1 added class line): appended
  `max-md:mr-4 max-md:w-[80px] max-md:opacity-100` to the reveal container so the
  thumbnail is visible by default below md; md+ hover-reveal behavior unchanged
  (desktop identical). Mirrors the file's existing `max-md:` card overrides.
- Verified: tsc + biome clean; SSR /home shows the new classes on all 5 service
  cards. Minimal diff (1 line), no deps.

## 2026-07-10 — StatsSection: fix number-card overflow on mobile (/task)
- Root cause: the stat number `<h2>` is explicitly `overflow-visible`, and
  nothing between it and the outer `.stat-row` clips at the CARD's boundary —
  `.stat-row` only clips at the full-bleed row edge, not the inset rounded card
  (`stat-inner`, `max-md:mx-4 ... rounded-2xl border`). So on mobile the number
  could visually bleed past the card's rounded border/edge. An unconditional
  `pr-8` (32px) on the number's wrapper was also eating mobile width that's only
  needed for desktop's two-column (`md:w-[55%] md:pr-10`) layout.
- Fix (`home/StatsSection.tsx`, both mobile-scoped, desktop untouched):
  1. `stat-inner` (rounded card): added `max-md:overflow-hidden` so the card
     clips its own content below md — safety net against any residual bleed.
  2. Number wrapper: `pr-8` → `pr-2` (base/sm; `md:pr-10` unchanged restores
     desktop exactly, since it already overrides pr-* at md+).
- Verified: tsc + biome clean; SSR /home shows `max-md:overflow-hidden` (4×,
  one per stat) and `pr-2 ... md:pr-10` (4×) with zero leftover `pr-8`; desktop
  `md:pr-10` count unchanged (4) confirming no desktop regression. 2-line diff,
  1 file, no deps.

## 2026-07-10 — StatsSection mobile overflow — REAL fix (supersedes prior entry) (/task)
- Re-issued after the earlier `max-md:overflow-hidden`+`pr-2` attempt didn't
  resolve it. Real root cause (CSS box model): `stat-inner` is `w-full`
  (width:100%) AND `max-md:mx-4` (16px margins each side) → margin-box = 100%+32px,
  32px wider than its parent → the card overflows horizontally and the parent's
  `overflow-hidden` clips its right edge. The prior band-aids never addressed the
  card width.
- Fix: added `max-md:w-auto` to `stat-inner` so below md the card's auto width
  fills the parent MINUS its margins (no overflow). Reverted the two prior
  band-aids (`max-md:overflow-hidden` removed, `pr-2`→`pr-8`) so the net diff vs
  original is a single line: `+max-md:w-auto`. Desktop keeps `w-full` (md+
  unaffected; `md:w-[55%]`/`md:pr-10` intact).
- Verified: tsc + biome clean; `git diff` shows exactly `+max-md:w-auto`; SSR
  /home shows `max-md:w-auto` on all 4 cards, band-aid gone, desktop classes
  intact. NOTE: couldn't capture pixels — preview harness won't hold a server for
  this workspace and the only connected browser is a remote macOS instance that
  can't reach this machine's :3000 — so verified by CSS box-model reasoning +
  static checks, not a screenshot.

## 2026-07-10 — StatsSection: remove inter-card divider on mobile (/task)
- `home/StatsSection.tsx`: the between-rows separator `<div class="absolute
  bottom-0 ... h-px bg-black/10">` (rendered for all rows except the last) got
  `max-md:hidden` — on mobile the stats are already self-bordered rounded cards
  (`max-md:rounded-2xl max-md:border`), so that line was a redundant "border
  between cards". Desktop (md+) keeps the divider.
- Verified: tsc + biome clean; SSR /home shows `h-px bg-black/10 max-md:hidden`
  on all 3 dividers, zero bare dividers left. 1-line diff, no deps, desktop
  untouched.

## 2026-07-10 — Homepage: bigger gap between ContactSection and BlogSection (/task)
- Gap was tight because BlogSection root is `md:pt-0` (zero top padding) — the
  Contact→Blog separation was only ContactSection's black `py-24 md:py-32` bottom.
- Fix (`app/home/page.tsx`): wrapped `<BlogSection />` in
  `<div className="[&>section]:pt-16 md:[&>section]:pt-24">` — the SAME
  inter-component spacing value the about page uses (`about/page.tsx` wraps every
  component in `[&>section]:py-16 md:[&>section]:py-24`). Applied as TOP padding
  only, so it adds white breathing room above Blog without touching Blog's
  `pb-40` bottom (→ Footer). The `[&>section]:` wrapper overrides Blog's own
  `md:pt-0` by specificity (same mechanism the about page relies on).
- Verified: tsc + biome clean; SSR /home shows the wrapper rendered
  (`[&amp;&gt;section]:pt-16 md:[&amp;&gt;section]:pt-24`, entity-escaped);
  git diff = the one wrapper. 1 file, minimal, no deps.

## 2026-07-10 — brand-strategy SubServices: more header padding-bottom (/task)
- `brand-strategy/SubServices.tsx` HEADER SECTION div: `py-20` → `pt-20 pb-32`
  (bottom padding 80px → 128px; top kept at 80px). All breakpoints.
- Verified: tsc + biome clean; SSR /brand-strategy shows `px-6 pt-20 pb-32`,
  zero leftover `py-20` on the header. 1-line diff, no deps.

## 2026-07-10 — SubServices stacking-card titles: invert hover-dim (/task)
- Was: each title `<h3>` had `group-hover:text-zinc-400` (its own `<motion.a
  class="group">`), so hovering a title grayed THAT title. User wanted the
  inverse — hovered title stays white, the others dim.
- Fix (`brand-strategy/SubServices.tsx`, 2 lines): tagged the STACKING CARDS
  WRAPPER `group/cards`; changed the h3 to
  `group-has-[a:hover]/cards:text-white/40 group-hover:!text-white`. The title
  `<motion.a>` is the ONLY `<a>` in the wrapper, so `.group/cards:has(a:hover)`
  fires only on title hover → all titles dim to white/40; the hovered card's own
  `group:hover` → `!text-white` keeps that one white (important beats the dim).
  Description/image/tag hovers don't trigger it.
- Verified: tsc + biome clean; `next build` ✓; compiled CSS contains both rules —
  dim `:where(.group/cards):has(:is(a:hover)) *{...text-white/40}` and un-dim
  `.group:hover *{color:white!important}`. (CSS-only hover, not in SSR — grounded
  via generated CSS + !important precedence.) 2-line diff, no deps.

## 2026-07-10 — SubServices last-card pin + ProcessSection overlap — DEFERRED to interactive session (/task)
- Requested: last stacking card pins at top and holds; ProcessSection slides in
  OVER it (overlap). Investigated the mechanism (SubServices sticky cards inside
  `div ref={container}`; ProcessSection is a separate sibling in page.tsx).
- Core blocker: `position: sticky` only pins within its containing block, so a
  sibling ProcessSection can't overlap a still-pinned last card — ProcessSection
  must be moved INSIDE SubServices' sticky container. Structural, 2-file, HIGH
  risk (reworks a working effect), and needs on-screen tuning of pin/z/margin.
- Not implemented: the effect can only be verified by scrolling in a browser, and
  this session's preview harness can't hold a server for this workspace (+ the
  only connected browser is remote macOS, can't reach :3000). User chose to do it
  in an interactive `claude` session where preview works. Full approach written to
  `.claude/plan.md`. No files changed for this task.

## 2026-07-10 — SubServices last-card pin-at-top + ProcessSection overlap — IMPLEMENTED (/task proceed)
- Executed .claude/plan.md (user said proceed; best-effort, visual tuning left to
  user's :3000). Two files:
  - `brand-strategy/SubServices.tsx`: now takes `children`, rendered INSIDE the
    sticky-cards `<div ref={container}>` after the 4 cards, wrapped
    `relative z-40 w-full` (z-40 > cards' inline z 0–3; ProcessSection bg-black is
    opaque → covers the pinned card). Old `h-[100vh]` runway kept only as the
    no-children fallback. Also: last card special-cased to pin at the TOP —
    `top: calc(5vh + ${(isLast ? 0 : i)*190}px)` (via new `isLast` prop) so it
    rises over the peek stack and holds at 5vh; the overlap slides up over it.
  - `app/brand-strategy/page.tsx`: `<SubServices/><ProcessSection/>` →
    `<SubServices><ProcessSection/></SubServices>` (ProcessSection no longer a
    standalone sibling; now lives in the sticky context — required for a sibling
    to overlap a still-pinned sticky card).
- Verified: tsc + biome clean; `next build` ✓ /brand-strategy; SSR shows
  ProcessSection nested in the `relative z-40` slot inside the container, runway
  gone, no duplicate ProcessSection, and last card top = `5vh+0px`. spec-verifier
  APPROVED the overlap mechanism (z-order/opacity/pin-survival/no stacking trap);
  its P2 "last card not at top" is now addressed by the isLast change.
- TUNING KNOBS for the user (scroll-only, can't verify here): last card `mb-[22vh]`
  = overlap lead gap; last card `top` 5vh; z-40. Note: ConnectButton CTA now
  renders AFTER ProcessSection (it's still after `container`).

## 2026-07-10 — brand-strategy: taller last card + ProcessSection top padding (/task)
- `brand-strategy/SubServices.tsx` Card: height classes made conditional on the
  existing `isLast` prop — last card `min-h-[70vh] md:h-[780px]`, others keep
  `min-h-[50vh] md:h-[600px]`. (Complements the pin-at-top/overlap work — taller
  last card = more presence before ProcessSection overlaps it.)
- `brand-strategy/ProcessSection.tsx` root: added `pt-20 md:pt-32` (had only
  `md:pb-35`) — top breathing room now that it slides up as the overlap.
- Verified: tsc + biome clean; SSR /brand-strategy shows last card
  `min-h-[70vh] md:h-[780px]` (1×), other cards `min-h-[50vh] md:h-[600px]` (3×),
  and ProcessSection `pt-20 md:pt-32` (1×). 2-line diff, 2 files, no deps.

## 2026-07-10 — brand-strategy: remove orphan "Connect With Us" CTA block (/task)
- Removed the SubServices `{/* CTA / NEXT SECTION */}` block (min-h-[70vh] black
  centered ConnectButton + `border-b border-white/10`) — the plain-black
  Connect-With-Us band the user screenshotted (it had become an orphan after the
  ProcessSection-overlap restructure, rendering awkwardly after Process). Also
  dropped the now-unused `ConnectButton` import from SubServices.
- Left CtaSection untouched — its "Connect With Us" is a different, designed CTA
  ("Let's build something" headline + image-grid card) near the page bottom.
- Verified: tsc + biome clean (unused-import check passes); no ConnectButton refs
  left in SubServices; `next build` ✓ /brand-strategy; the only remaining
  "Connect With Us" in SSR is CtaSection's. 1 file, no deps.

## 2026-07-10 — Contact hero: retire old, build ContactHeroSectionTwo (/task)
- `git mv` `contact/ContactHeroSection.tsx` → `garbage/` (card-stack hero retired).
- New `contact/ContactHeroSectionTwo.tsx` matching the reference image: flat
  `bg-[#F4F5F7]` (NO bg gradient per user), Header on top; LEFT = "Contact Us"
  eyebrow → 3-line headline "Let's Build / Something / Great Together." (last line
  brand gradient `from-[#2E5BFF] to-[#149CCB] bg-clip-text`) → gray subtext → two
  CTAs ("Start a Conversation" gradient+arrow-in-box → `#contact`; "View Our Work"
  white/bordered → `/work`); RIGHT = `/assets/contact2.png` via next/image
  (fill, object-contain, priority — effects baked into the PNG, no bg behind it);
  bottom-center "Scroll to Connect" indicator. framer-motion stagger, premiumEase,
  react-icons (MdArrowOutward/MdKeyboardArrowDown) — all existing deps.
- `app/contact/page.tsx`: import + usage swapped to ContactHeroSectionTwo.
- Verified: tsc + biome clean; `next build` ✓ /contact; SSR shows headline,
  contact2.png, both CTAs, scroll indicator; old "Great conversations" gone; no
  active import of the retired component. spec-verifier APPROVED (design elements,
  no-bg-gradient constraint, image path, conventions, a11y) — no P0/P1/P2.
- NOTE: visual pixel-fidelity to the image can't be verified in this session
  (no browser) — structure/spec verified; user to eyeball on :3000.

## 2026-07-10 — ContactHeroSectionTwo: CtaSection-style buttons + bigger image (/task)
- Buttons: replaced the gradient-fill + outline pair with a local `CtaStyleButton`
  matching CtaSection's "Connect With Us" button — white wipe-fill via `before:`
  scale-x + the dual-MdArrowOutward arrow-flip icon box — COLOR-INVERTED for the
  light hero (CtaSection is dark-bg/white-text; here: black text/black icon box,
  `before:bg-black`, hover→text-white + icon box white w/ gradient arrow). Added a
  subtle `border border-zinc-300` for legibility on the light bg (CtaSection is
  borderless on its black card). Each button gets a unique SVG gradient id
  (c2-start-grad / c2-work-grad) to avoid duplicate ids. Links preserved
  (#contact via <a>, /work via next/link).
- Image: contact2.png is 1536×1024 (aspect 1.5, landscape) → object-contain is
  WIDTH-bound, so widened the column `md:w-1/2`→`md:w-[56%]` (left `md:w-[44%]`)
  and bumped heights `h-[380px] md:h-[560px] lg:h-[680px]` (was 340/520/600).
- Verified: tsc + biome clean; `next build` ✓ /contact; SSR shows 2 wipe-fill
  buttons, both unique gradient defs, image `md:w-[56%] lg:h-[680px]`, old
  gradient-fill buttons gone.
- TUNING (visual, user's :3000): button border (drop for exact CtaSection
  fidelity), image split 56/44 + heights. Note: narrower left column may wrap the
  big headline onto more lines at md — headline sizes untouched.

## 2026-07-10 — brand-strategy ProjectShowcase: use WorkProjectShowcase's moving border (/task)
- Replaced ProjectShowcase's conic-gradient spin-border (the `[animation:spin]`
  masked ring) with the shared `TracingBorder` component — the exact moving
  border WorkProjectShowcase uses (comet traces on hover → settles into TR/BL
  corner glows), same props: `active={isHovered} radius={20} color="#2E5BFF"`,
  unique `gradientId={`bs-trace-${project.id}`}`. Card already had isHovered +
  rounded-[20px] + overflow-hidden (radius matches). Kept the static default
  border that fades on hover.
- Verified: tsc + biome clean; `next build` ✓ /brand-strategy; TracingBorder
  imported+used, zero conic-gradient left. 1 file (+ existing shared component),
  no deps.
- NOTE (visual, user's :3000): TracingBorder is a hover effect (client-only,
  measured size) so not in SSR — verified at code/build level. The card also
  grows (flex→4) on hover; TracingBorder's ResizeObserver re-measures so the
  trace follows the growing card — worth an eyeball to confirm it feels smooth.

## 2026-07-10 — TracingBorder: slower comet + longer corner-weight glow (/task)
- `ui/TracingBorder.tsx` (shared — work cards, blog cards, brand-strategy
  ProjectShowcase): two constants:
  1. `LAP_DURATION` 2.6 → 5 — comet traces the 2 laps much slower ("move very
     slow"). Handoff/fade timings are relative to LAP_DURATION so they auto-scale
     (comet opacity fade at LAP_DURATION-0.45=4.55s still precedes the corner
     bloom at HANDOFF=4.85s — continuous transition preserved).
  2. `glowR` 0.5 → 0.75·min(w,h) — the TR/BL corner glow reaches ~50% further
     along the adjacent edges when the weight settles ("increase its length").
- Verified: tsc + biome clean; `next build` ✓ /brand-strategy + /work; values
  confirmed in source; timing coherence checked. 2-const diff, no deps.
- NOTE (visual, user's :3000): hover-only effect, not in SSR — verified at
  code/build level. LAP_DURATION=5 is quite slow; glowR 0.75 is tunable.

## 2026-07-10 — about: pb on AboutHeroSection + pt before AboutTraditional (/task)
- `about/AboutHeroSection.tsx`: root `<main>` gained `pb-16 md:pb-24` (a little
  bottom padding under the hero).
- `app/about/page.tsx`: AboutTraditional's own section `py` is overridden by its
  `[&>section]` page wrapper, so added the top padding THERE — wrapper
  `[&>section]:py-16 md:[&>section]:py-24` → `[&>section]:pt-24 [&>section]:pb-16
  md:[&>section]:pt-32 md:[&>section]:pb-24` (more top, bottom kept). The other 4
  identical wrappers on the page are untouched.
- Verified: tsc + biome clean; source diff = exactly these 2 changes; SSR /about
  shows hero `pb-16` and the AboutTraditional wrapper `pt-24…pt-32`. No deps.

## 2026-07-10 — OurTeamSection: freer page-scroll parallax on the card row (/task)
- User confirmed the "stuck" = the page-scroll-velocity horizontal parallax
  (row lurched ±4% and snapped back stiffly). Made it glide more freely:
  - velocity spring loosened: damping 50→30, stiffness 300→120, mass 0.5→0.7
    (slower, softer return — no stiff snap-back).
  - travel ±4% → ±6%; velocity input range [-2000,2000] → [-1500,1500] (reaches
    full travel at lower scroll speed = more responsive).
  - wrapper edge buffer widened `w-[110%] -ml-[5%]` → `w-[114%] -ml-[7%]` so the
    ±6% shift stays clipped under the buffer (section is overflow-hidden).
- Verified: tsc + biome clean; `next build` ✓ /about; values confirmed in source.
- SIDE EFFECT (flag): the wrapper widened 110%→114%, so the cards (basis is % of
  the wrapper) render ~3.6% wider. Minor; revertable by trimming the basis if
  unwanted. Scroll-feel itself needs the user's eyes (:3000) — not verifiable in
  this session. Values (±6%, spring, buffer) are single tunable constants.

## 2026-07-10 — PerksSection redesign via taste-skill (design-taste-frontend) (/task)
- Retired the AI-tell "6 identical 3-column cards" for an ASYMMETRIC BENTO
  (career/PerksSection.tsx). Design read: agency careers perks, premium-modern,
  brand-blue + Satoshi. Dials (overhaul): variance 7 / motion 6 / density 4.
- 6 items → exactly 6 cells, no gaps: alternating wide(md:col-span-2)/narrow tiles
  (row1 wide+narrow, row2 narrow+wide, row3 wide+narrow). 3 cells carry real
  visual variety (brand-gradient hero, bg-zinc-950 dark, brand-tint) + 3 plain
  white; wide tiles get an oversized low-opacity watermark glyph. One accent
  (#2E5BFF→#149CCB), one radius (rounded-3xl), lucide kept (project dep),
  strokeWidth standardized, reduced-motion honored (useReducedMotion), scroll
  stagger + hover lift. Content/copy + "Benefits"/"A snippet of our perks"
  preserved verbatim. ZERO em-dashes (fixed one in a comment).
- Verified: tsc + biome clean; `next build` ✓ /career; SSR shows the gradient/
  dark/tint tiles, watermark glyphs, wide col-spans, all 6 perk titles; em-dash
  count 0.
- FLAG (user live-edited the file): the "Benefits" eyebrow was changed to
  `text-white/60` on the `bg-white` section = invisible (white-on-white). Left as
  the user's edit, not reverted — surfaced for them to fix (e.g. back to
  `text-[#2E5BFF]` or `text-black/60`). Also the gradient tile's shadow was
  removed by the edit. Visual fidelity needs the user's eyes (:3000) — not
  verifiable in this session.

## 2026-07-10 — DomeGallery: masonry — uneven card widths, equal gaps (/task)
- Problem: on the uniform 2-unit slot grid, cards smaller than their slot left
  BIGGER gaps → uneven gaps with varied sizes (geometrically unavoidable while
  centered on a fixed grid). User chose masonry (uneven widths, equal gaps,
  equal heights).
- Fix (`ui/DomeGallery.tsx`, `buildItems` only): replaced the fixed `x=-37+i*2`
  grid + per-card size variants with MASONRY — per-column widths from a
  normalized `widthPattern`, CUMULATIVE x-positioning where each column's pitch =
  its own width + a constant `GAP` (0.15), so the edge-to-edge gap is exactly GAP
  for every pair regardless of width. Constant card height `CARD_H = 2 - GAP` on
  the unchanged 2-unit y-grid → vertical gap = GAP too. Widths normalized so
  `sum(width) + seg*GAP = seg*2` → seamless 360° wrap. Item `x = colCenter - 0.5`
  (CSS transform's `+0.5` unchanged; enlarge math untouched). Removed the
  "≤2 per axis" overlap constraint (cumulative + GAP>0 → never overlaps).
- Verified: tsc + biome clean; `next build` ✓ /work; SSR shows 6 distinct
  `--item-size-x` widths + constant `--item-size-y:1.85` on all 170 tiles.
  NUMERICAL PROOF (node): widths 1.52–2.23 (uneven), all gaps — horizontal, the
  wrap seam, vertical — exactly 0.1500 (ALL GAPS EQUAL: true). spec-verifier
  independently re-derived the algebra and APPROVED (no P0/P1/P2). Aesthetic
  appearance still needs the user's eyes (:3000) — not browser-verifiable here.
  Map's DomeGallery note updated (masonry, obsolete ≤2 rule).

## 2026-07-10 — WorkHeroSection: scrim only behind the text (/task)
- Removed the two full-screen dark overlays (flat `bg-black/70` + the wide
  `circle_at_center` radial) that darkened the whole dome. Replaced with ONE
  ellipse gradient confined behind the centered title:
  `radial-gradient(ellipse 58% 44% at 50% 50%, rgba(0,0,0,0.8) 0%,
  rgba(0,0,0,0.42) 46%, transparent 78%)` — dark behind the text for legibility,
  transparent everywhere else so the rest of the dome is visible.
- Verified: tsc + biome clean; SSR /work shows the ellipse scrim, zero
  `bg-black/70` / old center-radial. 1-file, minimal diff. Ellipse size/darkness
  are single tunable values; behind-text framing needs the user's eyes (:3000).

## 2026-07-10 — TracingBorder: +50% corner-glow length (/task)
- `ui/TracingBorder.tsx`: `glowR` 0.75 → 1.125 (× min(w,h)) — a 50% increase, so
  both the TR and BL corner-weight glows (all four `glowR` uses: the two radial
  mask cx/cy radii + the two grow-to-`glowR` circle animations) reach ~50%
  further along the edges when the weight settles. Shared component (work + blog
  + brand-strategy cards).
- Verified: tsc + biome clean; value confirmed in source. Hover-only effect, not
  in SSR — verified at code level; user eyeballs on :3000. glowR is a single
  tunable constant.

## 2026-07-10 — WorkProjectShowcase ProjectCard: bottom-only overlay by default, full scrim on hover (/task)
- Was: the whole image was always dimmed (`filter: brightness(0.7)`) + a bottom
  gradient. Now:
  - Image filter default `brightness(0.7)` → `brightness(1)` (full brightness; the
    sibling-dim `brightness(0.3) grayscale` when ANOTHER card is hovered is kept).
  - Overlays split: a STATIC bottom gradient (`bg-gradient-to-t from-black/90
    via-black/25 to-transparent`) always present so the default title stays
    legible without darkening the whole image; PLUS a new whole-image scrim
    (`bg-black/55`, opacity `isHovered ? 1 : 0`, 0.4s) that appears ONLY on hover
    so the expanded hover content reads across the full card. Sheen kept.
- Verified: tsc + biome clean; SSR /work shows the new bottom gradient + hover
  scrim; old `brightness(0.7)` and `via-black/20` gone. 1-file. Hover behavior
  needs the user's eyes (:3000) — scrim darkness (bg-black/55) is a single token.

## 2026-07-10 — work/[slug] ProjectDetailsContent: wrap sidebar in a #100F0F box (/task)
- The sticky sidebar (CLIENT / SERVICES / TECH STACK / Visit Live Site) is now
  inside a box: sticky wrapper className gained `rounded-2xl border
  border-white/5 bg-[#100F0F] p-8 md:p-10`. Box color #100F0F per the request;
  added padding, rounded corners, and a subtle white/5 border so the box reads
  against the near-identical #0a0a0a section bg.
- Verified: tsc + biome clean; SSR /work/[slug] shows the box class on the sidebar.
  1-line diff. Visual framing needs the user's eyes (:3000).

## 2026-07-10 — WorkProjectShowcase: active filter pill #100f0f (no gradient) (/task)
- Active category pill (layoutId="activeCategory") bg
  `bg-gradient-to-r from-[#2E5BFF] to-[#149CCB]` → `bg-[#100f0f]` (gradient
  removed, solid color per request). Added `border border-white/10` so the dark
  pill is visible on the black section (#100f0f ≈ the near-black bg). The
  "Projects" header gradient TEXT (not a pill) left untouched.
- Verified: tsc + biome clean; SSR /work shows the #100f0f pill, old pill
  gradient gone, header gradient text kept. 1-line diff. Border is my addition
  for visibility (removable); visual needs the user's eyes (:3000).

## 2026-07-10 — BlogHeroSection redesign via taste-skill (/task)
- Was a BARE headline only ("Explore Our Latest Insights & Perspectives", pt-48
  float, no reduced-motion guard). Redesigned (overhaul) as a refined kinetic-type
  editorial hero: eyebrow "The Journal" (brand blue) → word-stagger headline
  "Insights, ideas & [inline growing image] perspectives." (gradient on the last
  word) → subline "Case studies, deep dives, and essays on the craft of design and
  engineering." Left-aligned, `bg-[#FAFAFA]`, Satoshi. Kept the distinctive inline
  image beat (real next/image). Added `useReducedMotion` guard (initial=false).
  Trimmed top padding pt-40/48 → pt-28/36 (toward the skill's hero-padding cap
  while clearing the absolute Header). One eyebrow, one accent (#2E5BFF→#149CCB),
  ZERO em-dashes.
- Verified: tsc + biome clean; `next build` ✓ /blog; SSR shows eyebrow, all 3
  headline words, subline, inline image; em-dash 0; confirmed NO double-header
  (BlogFeaturedSection has none). Map's stale "BlogHeroSection orphaned (DomeGallery)"
  note fixed — it's now used + is a kinetic-type hero.
- NOTE (user live-edited): dropped `max-w-[1400px]` from the container (full-bleed
  now) — left as-is. Visual fidelity needs the user's eyes (:3000).

## 2026-07-10 — BlogHeroSection re-redesign (v1 rejected) — mirror AboutHeroSection (/task)
- User said the prior left-aligned kinetic-inline-image hero "not looking good";
  wanted the site's design language kept. Grounded the retry in the site's actual
  hero pattern (read AboutHeroSection): CENTERED, min-h-screen, bg-[#FAFAFA], huge
  word-stagger BLUR-reveal headline split by an EDGE-TO-EDGE image marquee,
  closing on a gradient line. (v1 was left-aligned with a tiny inline image = off
  the site language, hence the "not good".)
- New BlogHeroSection mirrors that structure/animations/timings with blog content:
  line 1 "Explore our latest" (word-stagger blur reveal) → edge-to-edge marquee of
  6 known-valid unsplash images → gradient line "insights & ideas." Added
  `useReducedMotion` guards (initial=false; marquee x-animation disabled when
  reduced) per taste-skill. ZERO em-dashes (fixed 3 in comments).
- Verified: tsc + biome clean; `next build` ✓ /blog; SSR shows line-1 words,
  6 carousel images, the gradient close line (`insights &amp; ideas`), em-dash 0.
  Map note updated. Visual fidelity still needs the user's eyes (:3000) — but the
  structure now matches a hero the user already approves (About).

## 2026-07-10 — BlogHeroSection v3 (grounded in user screenshot) (/task)
- User uploaded a SS of v2 (the About-style carousel). VISIBLE problem: the
  carousel was filled with RANDOM irrelevant stock (dog, mountains, a person) and
  read as a literal About-page clone. (The big centered gradient headline itself
  looked fine.)
- v3: dropped the carousel + random images. Clean centered editorial TYPE hero,
  same site language (bg-[#FAFAFA], centered, huge Satoshi, blur word-reveal,
  brand-blue gradient close): eyebrow "The Journal" → headline "Sharper thinking
  on / design & code." (gradient line 2) → subline "Case studies, deep dives, and
  essays from the SoftexEdge team." → a RELEVANT topic chip row built from
  `data/blog` categories (Company News, Resources, Guides, Case Studies) instead
  of random images. Reduced-motion guarded, zero em-dashes.
- Verified: tsc + biome clean; `next build` ✓ /blog; SSR shows eyebrow, headline
  words, gradient close, all 4 topic chips; no random carousel imgs. Map updated.
- Note: browser pane CAN reach the user's :3000 (navOk true) but the screenshot
  tool timed out twice on the heavy /blog page; user is providing visual feedback
  via manual screenshots. This attempt is grounded in their SS (removed the exact
  thing that looked bad), not a blind guess.

## 2026-07-10 — BlogHeroSection v4: rebuilt to match a provided design image (/task)
- User provided a concrete reference image. Rebuilt to match: LEFT-aligned huge
  black headline "News, [inline rounded image] views" / "and everything else"
  (monochrome, no gradient this time — per the image), followed by a list-header
  row: "Showing 1-{blogPosts.length} of {blogPosts.length} posts." (numbers
  bolded) on the left + "By Category ▾" / "By Author ▾" filter pills (rounded,
  bordered, chevron) on the right. Inline image = next/image (people photo),
  scale-in reveal. fadeUp motion, reduced-motion guarded, zero em-dashes.
- Post count uses the real `blogPosts.length` (6), not the image's mock "247".
- Verified: tsc + biome clean; `next build` ✓ /blog; SSR shows all 3 headline
  parts, the count, both filter pills + chevrons, the inline image; old v3 gone.
  Map note updated (4th BlogHeroSection change).
- FLAGS: (1) the "By Category/By Author" dropdowns are VISUAL only (styled buttons
  matching the image) — no working menu/filtering (that lives in BlogListSection;
  wiring it is a separate feature). (2) User live-edited the section bg
  `bg-[#EEEDEB]` → `bg-white` — kept as-is.

## 2026-07-10 — OurValuesSection: light taste-skill polish (/task)
- `about/OurValuesSection.tsx`: eyebrow "Our Culture" muted `text-white/60` →
  brand-blue `text-[#2E5BFF]` tracking-[0.25em] (matches the site's other
  eyebrows + pops on the dark bg); quote card gained a subtle `border
  border-white/[0.06]` so it reads as a card against the near-identical black bg
  (#100f0f ≈ bg-black). User reverted a max-w-[1400px] container change (prefers
  full-bleed) — not re-added.
- Verified: tsc + biome clean; `next build` ✓ /about; SSR shows brand-blue
  eyebrow + card border. Kept conservative given the visual-verification gap.

## 2026-07-10 — (toolkit maint, not project) universal-kit update #3
- `git pull` in ~/.claude/universal-kit: blocked by local change to generated
  AGENT_INDEX.md → stashed it → fast-forward to 296ef50 (new skills baseline-ui /
  fixing-accessibility / fixing-motion-performance, updated bootstrap/commands/
  regen-index, source repos gsap/threejs/chrome-web/motion-dev/minimax cloned).
- `./bootstrap.sh` FAILED at step 2/4: it uses Unix `ln -s` symlinks, which don't
  work on Windows Git Bash — `~/.claude/skills/api-design` is a real dir (with
  nested cruft from prior failed runs), so `ln` can't replace it. Skills were
  already installed as real dirs (functional). Completed the intent Windows-safely:
  step 3 (cp commands → 7 updated: /task,/genesis,/worker etc.), copied the 3 new
  kit skills into ~/.claude/skills, step 4 (regen-index.sh → 209 resources,
  machine paths corrected). New skills confirmed loadable.
- OPEN: bootstrap.sh symlink approach is incompatible with Windows; future kit
  pulls need the same cp workaround (or WSL/Mac, or a Windows-aware bootstrap).

## 2026-07-10 — CtaSection: hover-mask → auto "disco" glow (/task)
- Replaced the mouse-follow spotlight MASK + per-cell hover glow (hoveredIndex /
  getIntensity / handleMouseMove / mouseX-mouseY / useMotionValue — all removed)
  with an auto-animated "disco" effect: a dark grid floor (80 cells, #141414) lit
  by 3 colored glow blobs (#2E5BFF / #149CCB / #8B5CF6) that DRIFT ON THEIR OWN via
  framer `animate` loops (distinct x/y keyframe paths + 15/19/23s durations),
  `mix-blend-screen` + blur-[70px] so they read as moving lights. Motion is
  transform-only (GPU); `useReducedMotion` freezes the blobs. Card `onMouseMove`/
  `onMouseLeave` removed. (CtaSection is shared — the disco shows everywhere it's
  used: brand-strategy/about/contact/home/blog CTAs.)
- Verified: tsc + biome clean (fixed a readonly-tuple type error by dropping
  `as const` on DISCO_BLOBS); `next build` ✓ /brand-strategy; grep confirms 0
  hover refs + disco elements present. Visual look needs the user's eyes (:3000);
  blob colors/positions/durations/blur are single tunable values.

## 2026-07-14 — Revert CtaSection disco → mask-hover
Reverted the disco-effect change in `src/components/brand-strategy/CtaSection.tsx` back to the original mouse-follow mask spotlight + per-cell proximity glow. Clean `git restore` from HEAD (disco was uncommitted, HEAD held the original). Verified: working tree clean for this file, mask-hover logic (getIntensity/handleMouseMove/useMotionValue) present, 0 DISCO_BLOBS refs, tsc + biome clean. Shared component — affects all pages using CtaSection. Not committed.

## 2026-07-14 — CtaSection: auto-moving spotlight
Made the mask-hover spotlight self-animate instead of following the mouse. Removed onMouseMove/onMouseEnter/onMouseLeave + hoveredIndex; added a requestAnimationFrame loop (ResizeObserver-tracked container) that drives mouseX/mouseY (px, for the reveal mask) and a fractional focus cell (for the per-cell blue glow) along a slow out-of-phase Lissajous path, so lit cells stay under the revealed spotlight. Reduced-motion guarded (loop skipped → static dark grid). Same visual, no mouse. Verified: 0 mouse-handler refs, tsc + biome clean, next build ✓ /brand-strategy. Shared component (all CtaSection pages). Not committed.

## 2026-07-14 — CtaSection: speed up auto spotlight
Raised the Lissajous sine frequencies (0.34→0.55, 0.26→0.42) so the auto-moving spotlight drifts ~1.6x faster. Literal-only change; biome clean. Not committed.

## 2026-07-14 — BlogHeroSection redesign + SpotlightGrid extraction
Extracted the auto-moving spotlight pattern from CtaSection into a reusable `src/components/ui/SpotlightGrid.tsx` (self-measuring via its own ref, reduced-motion guarded, pointer-events-none absolute bg; same 0.55/0.42 Lissajous, 80-cell grid, #2E5BFF→#149CCB glow). CtaSection now renders `<SpotlightGrid />` (behaviorally identical; dropped all now-unused hook imports). Redesigned `src/components/blog/BlogHeroSection.tsx` into a black rounded container (min-h-70vh, bg-black, border-zinc-800/50) with SpotlightGrid behind and the existing "News, [img] views / and everything else" title recolored white; post-count + By Category/By Author pills restyled for dark. Verified: tsc + biome clean (3 files), next build ✓ /blog + /blog/[slug] + /brand-strategy, spec-verifier APPROVED (no P0/P1). Not committed.

## 2026-07-14 — BlogHeroSection: split title animation
Mirrored the brand-strategy StrategyHeroSection title animation onto the blog hero. Title h1 is now a motion.h1 stagger container (containerVariants: staggerChildren 0.25 / delayChildren 0.2) with words (News, / views / and everything else) as wordVariants children (y:40→0, 0.8s premiumEase). onAnimationComplete flips isExpanded → the inline image between "News," and "views" splits open (w-0/opacity-0 → w-[1.02em]/opacity-100 over a 1200ms cubic-bezier), pushing the words apart — same mechanic as the brand page. Reduced-motion: initial=false + isExpanded||reduce shows words + expanded image instantly. fadeUp retained for the count/filter row. Verified: tsc + biome clean, next build ✓ /blog + /blog/[slug]. Single file. Not committed.

## 2026-07-14 — BlogFeaturedSection redesign (dark immersive cover)
Redesigned from a plain white two-column split into a dark immersive cover card (user-chosen direction). Full-bleed article image backdrop with bottom-up black scrim + top fade + brand-color glow blobs; overlaid content — "Featured" + gradient category pills (top), oversized title, line-clamped excerpt, author/date/readTime meta, and a white wipe-fill "Read Article" affordance driven by the card's group-hover. Whole card is a single stretched Link (z-20 over pointer-events-none content) → valid HTML, no nested anchors. Rounded-[20px] dark card on the light #FAFAFA surround, mirroring the hero card and bridging into the dark #0a0a0a list. Reduced-motion guarded entrance. Decorative backdrop alt="" (h2 announces title). Verified: tsc + biome clean, next build ✓ /blog + /blog/[slug], spec-verifier APPROVED (no P0/P1; both P3 nits applied). Single file. Not committed.

## 2026-07-14 — Blog: uniform x-axis gutter (px-6, matching ExperimentalTestimonials)
Normalized every blog content section's horizontal gutter to a constant px-6 (ExperimentalTestimonials' inner container is mx-auto w-full px-6). BlogHeroSection + BlogFeaturedSection sections px-4/md:px-6 → px-6; blog page CtaSection wrapper px-3 → px-6. BlogListSection already used constant px-6 (unchanged). Left the Footer wrapper at px-3 (footer, not a content section). Class-only change; verified tsc + biome clean, next build ✓ /blog. Not committed.

## 2026-07-14 — Blog: tighten hero→featured gap
Removed BlogHeroSection's section bottom padding (`pb-14 md:pb-20` → none) so the gap
between the hero card and the featured card is just BlogFeaturedSection's `pt-6` —
24px at all breakpoints (was 80px mobile / 104px desktop), matching the `px-6` side
gutters so the stacked dark cards read as one grid. Single class-string edit in
`src/components/blog/BlogHeroSection.tsx:46`. Verified live via dev server (:3000, HMR):
computed hero paddingBottom 0px, featured paddingTop 24px, hero section bottom flush
with card bottom; featured card's steady-state gap = 24px (the extra 30px seen in the
headless probe is its un-fired whileInView y:30 entrance offset — browser pane has no
viewport here, visual check is manual per convention). Biome clean on the edited file
(project-wide `bun run lint` fails on pre-existing debt in other files). Not committed.

## 2026-07-14 — Blog: hero→featured gap +16px
Nudged the gap back up per user: BlogFeaturedSection `pt-6` → `pt-10`
(`src/components/blog/BlogFeaturedSection.tsx:23`), so hero card → featured card gap is
now 40px at all breakpoints (was 24px after the earlier tighten; originally 80/104px).
Verified via HMR on the user's :3000 dev server: computed featured paddingTop 40px, hero
paddingBottom 0px. Biome clean on the file. Not committed.

## 2026-07-14 — Blog hero: 2x spotlight speed via SpotlightGrid prop
Added an optional `speed` multiplier prop to `src/components/ui/SpotlightGrid.tsx`
(default 1 — time is scaled `t * speed` in the rAF Lissajous loop; added to the effect
deps) and passed `speed={2}` from `src/components/blog/BlogHeroSection.tsx:54`. Blog
hero spotlight now wanders 2x faster; CtaSection instances (all pages) keep the default
pace untouched. Verified: tsc clean; biome clean on the diff (one PRE-EXISTING
noArrayIndexKey error at SpotlightGrid.tsx:113 — static 80-cell grid, benign, not
introduced here despite the 07-14 extraction entry claiming biome-clean). Live motion
can't be observed in the headless pane (rAF never fires, innerWidth 0) — visual check
manual per convention; console clean after reload (the 4 buffered "dep array changed
size" errors were a one-time HMR artifact from the dep-array growing 3→4 mid-session).
Note: user manually set BlogFeaturedSection pt-20 (gap 80px) after the pt-10 change —
kept. Not committed.

## 2026-07-14 — BlogListSection pills match WorkProjectShowcase
Changed the active category-filter pill background in BlogListSection from the brand gradient (bg-gradient-to-r from-[#2E5BFF] to-[#149CCB]) to WorkProjectShowcase's style: border border-white/10 bg-[#100f0f]. Text colors already matched (active white / inactive white/50). One-line class change; tsc + biome clean. Not committed.

## 2026-07-14 — BlogListSection moving border → solid #2E5BFF
Passed color="#2E5BFF" to the TracingBorder on the blog list cards (same as the work-page cards), so the moving comet + rested border render solid blue instead of the default cyan→blue gradient. One-line change; tsc + biome clean. Not committed.

## 2026-07-14 — TracingBorder: one lap, then corner-glow finale
Changed the shared `src/components/ui/TracingBorder.tsx` comet from two laps to one:
`strokeDashoffset` initial 2.0 → 1.0, keyframes [2,1,0] → 1→0 (pathLength=1, so one
offset unit = one full orbit), dropped the two-segment times/ease for a single
"easeInOut", LAP_DURATION 5 → 2.5s (same per-lap pace). HANDOFF and the comet's opacity
fade derive from LAP_DURATION, so the corner-glow/edge-fade finale now blooms at ~2.35s
as the comet dissolves — same continuous handoff, one rotation earlier. Affects all
three usages (BlogListSection, WorkProjectShowcase, brand-strategy ProjectShowcase).
Verified: tsc clean, biome clean on the file, /blog compiles on the live server with no
new console errors (hover animation itself needs manual eyes — headless pane doesn't
paint). Not committed.

## 2026-07-14 — Add "Blog" nav item to header
Added a { name: "Blog", link: "/blog" } entry after "Work" in BOTH header nav definitions: page/Header.tsx (used by about/work/brand-strategy/career/contact/blog heroes) and layout/Header.tsx (used by the home page). Both needed it for the option to appear site-wide. Simple link (no dropdown), matching the existing About/Careers/Work pattern; the resizable-navbar renders desktop + mobile automatically. Verified: /blog route exists (app/blog/page.tsx), tsc + biome clean, next build ✓. Not committed.

## 2026-07-14 — CtaSection: solid #2E5BFF spotlight glow
Added optional `glowColor` prop to `src/components/ui/SpotlightGrid.tsx` — when set,
lit cells render that solid color (inline backgroundColor) instead of the default
blue→cyan `from-[#2E5BFF] via-[#149CCB] to-[#2E5BFF]` gradient. CtaSection passes
`glowColor="#2E5BFF"` (`src/components/brand-strategy/CtaSection.tsx:27`); blog hero
keeps the gradient default. Verified live on /blog DOM: CTA grid cell glow =
rgb(46,91,255) inline with no gradient classes; hero grid unchanged. tsc clean; biome
findings on CtaSection are pre-existing (noImgElement/noSvgWithoutTitle/index-key +
CRLF format churn — untouched). Not committed.

## 2026-07-14 — CtaSection: tone-on-tone blue glow gradient
Follow-up to the solid #2E5BFF change: added optional `glowVia` prop to
`src/components/ui/SpotlightGrid.tsx` — with `glowColor` it builds an inline vertical
`glowColor → glowVia → glowColor` gradient (same shape as the default), alone glowColor
stays solid. CtaSection now passes `glowColor="#2E5BFF" glowVia="#5B7CFF"` (a lighter
neighbor blue — keeps the blue identity, no cyan). Verified live on /blog DOM: CTA cell
glow = linear-gradient(rgb(46,91,255), rgb(91,124,255), rgb(46,91,255)); blog hero grid
still on the default blue→cyan classes. tsc clean; only biome finding on SpotlightGrid
is the pre-existing index-key. Not committed.

## 2026-07-14 — Work hero: stronger radial scrim, drop "Selected Work" tag
`src/components/work/WorkHeroSection.tsx`: (1) A radial black overlay behind the title
ALREADY existed (committed) — user asked to "create" one, so it evidently read too weak
over the dome gallery; deepened it: ellipse 58%x44% → 62%x48%, center 0.8 → 0.95, mid
0.42 → 0.6 @48%, fade-out 78% → 80%. (2) Removed the "Selected Work" gradient tag
(motion.div above the h1) — note the live text was "Selected Work", not "selected
works" (that string only exists in dead garbage/ components). Verified live on /work:
tag absent from DOM, h1 = "Our Creative Portfolio", scrim computes to
radial-gradient(62% 48%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 48%, transparent 80%).
tsc clean; biome: only pre-existing unused `premiumEase` warning. Not committed.

## 2026-07-14 — Contact hero redesign (dark spotlight)
Redesigned ContactHeroSectionTwo from the light copy+mail-PNG split into a dark spotlight hero (user-chosen direction), matching the blog hero / CtaSection language. Black rounded container (min-h-82vh, bg-black, border-zinc-800/50) on the white surround with <SpotlightGrid /> behind; left-to-right black scrim + a brand glow blob for legibility over the pattern. Kept the staggered "Let's Build / Something / Great Together." headline (gradient last line), gradient "Contact Us" eyebrow, subtitle (white/60), and both CTAs — but converted CtaStyleButton to the white wipe-fill dark variant (border-white/20, before:bg-white, text-white→group-hover:text-black). Dropped contact2.png (removed next/image + MdKeyboardArrowDown imports). Reduced-motion guarded. Verified: no PNG/unused imports, tsc + biome clean, next build ✓ /contact, spec-verifier APPROVED (no P0/P1); confirmed #contact target exists (ContactSection id="contact"). Single file. Not committed.

## 2026-07-14 — Contact hero redesign v2 (light, elevated)
User re-issued the task; via AskUserQuestion chose "Go light instead" over the dark spotlight I'd just built. Rebuilt ContactHeroSectionTwo as a polished LIGHT hero: bigger editorial headline (lg:text-[6rem], leading-[0.9], tighter tracking), refined eyebrow (gradient rule + gradient text), roomier vertical rhythm, restored the black wipe-fill CtaStyleButton + the contact2.png mail art (now with a soft brand-gradient glow behind it for depth), plus two faint ambient brand washes and a quiet "Prefer email? hello@softexedge.com" secondary affordance. Used the real site email (hello@softexedge.com, confirmed from ContactSection/Footer — first wrote .in, corrected). Reduced-motion guarded. Verified: tsc + biome clean, next build ✓ /contact. Single file. Not committed.

## 2026-07-14 — DomeGallery: 3D dome → flat 2D masonry wall
Rewrote `src/components/ui/DomeGallery.tsx` (1054 → ~200 lines): removed the sphere,
drag/inertia gestures (@use-gesture no longer imported here), and the enlarge-on-click
viewer. New layout: 18 absolute-positioned columns, UNEVEN px widths (WIDTH_PATTERN
300/180/250/205/290/225) and UNEVEN card heights (HEIGHT_PATTERN fractions of container
height, coprime phase-shift per column + per-column top offsets so seams never align);
ONE constant `gap` (16px) everywhere including the marquee loop seam (strip pitch ends
with a trailing gap). autoRotate/autoRotateSpeed now drive a seamless rAF translate3d
marquee (reduced-motion → static). Dropped dome-only props; updated the sole consumer
`WorkHeroSection.tsx` accordingly. Map's DomeGallery paragraph rewritten to match.
Verified live on /work DOM: 162 tiles, no 3D transforms in hero, widths/heights uneven
per pattern, ALL h-gaps and v-gaps = exactly 16px. tsc clean; biome findings are
parity-only (raw <img> as before; pre-existing premiumEase warning). Marquee motion
itself needs eyes (pane doesn't paint). Old dome recoverable via git (file was clean at
HEAD). Not committed.

## 2026-07-14 — Contact hero redesign v3 (centered, conversation-first)
Per the user's chosen concept (after dark + light versions), rebuilt ContactHeroSectionTwo as a centered, conversation-first hero: big centered headline "Let's build something great together." (gradient "great together."), a live-dot trust line "We usually reply within a few hours", a prominent email-capture pill (controlled type=email input + gradient Send → button that opens a prefilled mailto to hello@softexedge.com — visitor email encodeURIComponent'd to prevent mailto-header injection), and a quiet contact-details row (email · phone +1 800 123 4567 · LinkedIn/Instagram/Facebook icons). No split, no mail PNG. Real site email/phone/socials reused (from Footer/ContactSection). A11y: labeled input, aria-labeled socials, submit button; reduced-motion guards + ping gated on !reduce. Fixed placeholder href="#" socials to not open target=_blank. Verified: tsc + biome clean, next build ✓ /contact, spec-verifier APPROVED (security check passed, no P0/P1). Single file. Not committed.

## 2026-07-14 — Work hero: blog-hero framing (white bg + black rounded card)
Restructured `src/components/work/WorkHeroSection.tsx` to mirror BlogHeroSection's
wrapper: main is now white `px-6 pt-24 md:pt-28 pb-6` with light `<Header />` (was
full-screen black + `onDark`); the gallery wall, radial scrim, and centered title moved
inside a black rounded card (`min-h-[70vh] rounded-[20px] border-zinc-800/50 bg-black
overflow-hidden`). DomeGallery now fills the card (`absolute inset-0`, dropped the old
`top-[-20vh] h-[140vh]` band); content div lost `min-h-screen`, gained `py-16`. pb-6
gives the card 24px white breathing room above the black WorkProjectShowcase. Verified
live on /work: main bg rgb(255,255,255), padding 112/24/24/24, card bg black,
radius 20px, zinc-800/50 border, min-height 504px (=70vh), 156 gallery tiles + scrim
inside the card, h1 intact. biome format applied; tsc clean. Not committed.

## 2026-07-14 — Revert: work hero back to full-screen black (undo blog-hero framing)
Reverted the blog-hero framing on `src/components/work/WorkHeroSection.tsx` by editing
the structure back (NOT `git restore` — that would also have wiped the wanted uncommitted
changes: deeper radial scrim, removed "Selected Work" tag, simplified DomeGallery props).
Restored: full-screen black `<main min-h-screen>`, `<Header onDark />`, gallery band at
`top-[-20vh] h-[140vh]`, content `min-h-screen` centered; removed the white wrapper +
rounded card. Kept: 0.95/0.6 scrim, no tag, flat 2D DomeGallery. Verified live on /work:
main bg rgb(0,0,0) @720px min-height, no card in DOM, scrim present, tag absent, 164
tiles rendering. biome format applied; tsc clean. Not committed.

## 2026-07-14 — Contact hero → back to dark spotlight (restore)
User locked the dark spotlight direction; restored ContactHeroSectionTwo to that exact version (verbatim rewrite of the earlier spec-verifier-APPROVED build): white surround section, black rounded container (min-h-82vh) with <SpotlightGrid /> behind, left-to-right black scrim + brand glow blob, staggered "Let's Build / Something / Great Together." headline (gradient last line), gradient "Contact Us" eyebrow, white/60 subtitle, and two dark white-wipe-fill CtaStyleButtons (Start a Conversation → #contact, View Our Work → /work). No mail PNG, no email form. Reduced-motion guarded. Verified: no PNG/form refs, tsc + biome clean, next build ✓ /contact (a transient concurrent-edit "main tag" error cleared on re-run). Single file. Not committed.

## 2026-07-14 — ContactSection: match testimonials' x padding
`src/components/home/ContactSection.tsx:192` inner container `px-6 md:px-10` → `px-6`,
matching ExperimentalTestimonials' container (`px-6` at all breakpoints,
ExperimentalTestimonials.tsx:78). Affects ContactSection everywhere it's used
(home/contact). Verified live on /home: contact container computes 24px/24px, same as
the testimonials container (24px/24px). Biome clean on the file. Not committed.

## 2026-07-14 — Contact hero spotlight glow matches CtaSection
The contact hero used a default <SpotlightGrid /> (blue→cyan→blue glow). Passed glowColor="#2E5BFF" glowVia="#5B7CFF" to match CtaSection's SpotlightGrid gradient exactly. One-line prop change; tsc + biome clean. Not committed.

## 2026-07-14 — Logo carousel: subtle white edge fades
Added two pointer-events-none overlay divs inside `src/components/ui/LogoCarousel.tsx`
(the marquee under ExperimentalTestimonials via TechLogoCarousel — its only consumer,
always on white sections): left `bg-gradient-to-r from-white to-transparent` and right
mirrored, `w-16 md:w-24`, z-10 over the scrolling track. Verified live on /home DOM:
both fades render at 96px with white→transparent linear-gradients on the correct sides.
Biome clean. Not committed.

## 2026-07-14 — Contact hero: center-align text
Centered the dark spotlight contact hero content: black container gained items-center; content wrapper items-start → items-center text-center; buttons row + subtitle centered (justify-center / mx-auto). Swapped the left-side legibility scrim for a centered radial (ellipse at center) and recentered the brand glow to bottom-center so contrast tracks the now-centered copy. Class-only change; tsc + biome clean. Not committed.

## 2026-07-14 — New /web-development page (independent mirror of /brand-strategy)
Copied all 8 `src/components/brand-strategy/` files verbatim to
`src/components/web-development/` (same directory depth → relative `../ui` and
`./AgencyStats` imports work unchanged) and created `src/app/web-development/page.tsx`
mirroring the brand-strategy page with imports pointed at the new folder. Dropped the
original's `type Props = {}` / `({}: Props)` lint-error pattern from the new page (biome
noBannedTypes/noEmptyPattern — didn't copy known-bad code). Other pages (about, blog,
work, contact) still import brand-strategy's CtaSection/FaqSection — untouched. Future
web-development-specific edits go in components/web-development/. Verified: tsc clean,
biome clean on the new page, live /web-development renders 11 sections with the same h1
as /brand-strategy (11 sections, structural match). Map updated (new surface row).
Header nav does NOT yet link the new page. Not committed.

## 2026-07-14 — Header Services dropdown: link Web Development → /web-development
Both headers already had a "Web Development" dropdown item pointing at the nonexistent
`/services` route; changed `link: "/services"` → `"/web-development"` in BOTH
`src/components/page/Header.tsx` (~line 54, inner pages) and
`src/components/layout/Header.tsx` (~line 48, home) — the known duplicate-nav trap.
Verified live by programmatically mounting the hover dropdown: /work (page/Header) and
/home (layout/Header) each show one a[href="/web-development"] labeled "Web
Development". Biome clean. NOTE: the other dropdown items (Brand Identity, eCommerce,
UX…) still point at /services which 404s — pre-existing, untouched. Not committed.

## 2026-07-14 — /web-development: center section headers
Centered tag + title + description in the four web-development section copies (first
divergence from brand-strategy — the reason the copies exist): SubServices,
ProcessSection, OurTechStack, ProjectShowcase. Per file: header row lost
`items-start justify-between md:flex-row md:items-start|end`, gained
`items-center text-center`; tag+title column gained `items-center`; description lost
`md:text-left`/`text-left` (+`ml-[3px]` optical-left offset dropped from tags), gained
`text-center`. Verified live: all four headers on /web-development compute
align-items:center + text-align:center (row, column, and <p>), while /brand-strategy
still computes flex-start/flex-end + start — isolation intact. tsc clean; the 8 biome
findings on these files are inherited verbatim from the brand-strategy originals (none
on edited lines). Not committed.

## 2026-07-14 — TracingBorder: smooth animation (drop per-frame SVG filter)
Smoothed the moving-border animation everywhere it's used (BlogListSection, WorkProjectShowcase, brand-strategy + web-development ProjectShowcase) by fixing the shared ui/TracingBorder.tsx. Root cause of stutter: both the comet (animating strokeDashoffset every frame) and the masked static border ran through an feGaussianBlur SVG filter, forcing CPU re-rasterization of the blur each frame. Removed the filter entirely and replaced the glow with layered strokes — a wide low-opacity halo stroke (w6/0.28 comet, w5.5/0.25 static) under the crisp core stroke — visually equivalent glow, pure cheap geometry. Comet opacity fade moved to a wrapping motion.g so halo+core dissolve together. Timings/easing/mask handoff unchanged. Verified: no real filter refs remain (only a comment mentions it), tsc + biome clean, next build ✓. Single shared file. Not committed.

## 2026-07-14 — PerksSection redesign (dark cards, reference image)
Rewrote `src/components/career/PerksSection.tsx` from the white mixed-tone bento to the
user's reference layout, adapted to brand: section bg-black; centered header — gradient
bullet dot + "Benefits" tag (white) + "A snippet of our perks" (white, up to text-6xl);
uniform 1/2/3-col grid of six cards (rounded-[20px] border-white/5 bg-zinc-900/50
backdrop-blur, hover lift + bg-zinc-900) each with a 48px rounded-xl icon square in the
brand gradient (#2E5BFF→#149CCB, white lucide icon) inline with the title, description
(zinc-400) below. Dropped the wide/tone bento fields; kept perk copy, premiumEase
whileInView stagger, reduced-motion guards. Verified live on /career DOM: section
rgb(0,0,0), header centered, 6 cards @20px radius, icon boxes 48px with
linear-gradient(rgb(46,91,255)→rgb(20,156,203)), titles inline. tsc clean; biome clean
after auto import-sort fix. Not committed.

## 2026-07-14 — OurTeamSection: fix laggy parallax (velocity → position-linked)
The team card row's horizontal parallax felt laggy because it was driven by scroll VELOCITY (useVelocity(scrollY) → spring → x), which is noisy and springs back to rest — it only lurched while scrolling then settled. Reworked to POSITION-linked: useScroll({ target: sectionRef, offset: ["start end","end start"] }) → useTransform(scrollYProgress,[0,1],["6%","-6%"]) → gentle useSpring. Now the row's x tracks scroll position directly, so scrolling down drifts cards one way and scrolling up reverses (as requested), smoothly. Added sectionRef on the <section>, reduced-motion guard (x = "0%" when reduce), removed useVelocity import. Kept the ±6% travel under the 7% over-width buffer. Verified: no velocity refs remain, tsc + biome clean, next build ✓. Single file. Not committed.

## 2026-07-14 — PerksSection header: match OpenPositions style
Restyled the PerksSection tag + title to mirror OpenPositions exactly
(`src/components/career/PerksSection.tsx`): tag → `mb-8 inline-flex text-xs
font-semibold uppercase tracking-[0.25em] text-white/60` (gradient bullet dot removed);
title → `text-4xl font-bold leading-[1.05em] tracking-tighter text-white md:text-5xl
lg:text-[6.5rem]` (dropped max-w-3xl). Centered layout kept. Verified live on /career:
computed styles of both headers are IDENTICAL — tags 12px/600/uppercase/3px
letter-spacing/white@60%, titles 104px/700/−5.2px/white. Biome clean. Not committed.

## 2026-07-14 — OurValuesSection: remove bg effect + narrow description
Removed the interactive DotGrid background pattern (the whole absolute DotGrid block + its bg-black/40 overlay) and the now-unused DotGrid import — section is now flat bg-black. Narrowed the culture description paragraph from max-w-3xl to max-w-lg. Class/markup-only; tsc + biome clean. Not committed.

## 2026-07-14 — SubServices: remove card-title hover effects
Removed the hover choreography from the service-card h3 titles (`transition-colors
group-has-[a:hover]/cards:text-white/40 group-hover:!text-white` → plain white) in BOTH
copies — `src/components/brand-strategy/SubServices.tsx:190` and
`src/components/web-development/SubServices.tsx` — since the request didn't scope a
page (previously the dim-all/highlight-hovered effect fired when hovering any card
link). Titles now stay solid white. Verified: grep 0 hover classes in both files; live
/web-development DOM shows all 4 card titles with no hover classes
(`text-5xl font-medium tracking-tight text-white md:text-6xl lg:text-7xl`). Not
committed.

## 2026-07-14 — StatsSection: drop DotGrid, more y-padding, testimonial-card gradient bg
`src/components/home/StatsSection.tsx`: (1) removed the interactive DotGrid background
(absolute wrapper + import) — `ui/DotGrid.tsx` now has NO consumers outside garbage/
(orphaned, left in place); (2) section padding `py-20 md:py-2` → `py-28 md:py-24`,
stat rows' internal spacing untouched (stat-inner still py-10); (3) section bg
`bg-white` → `bg-linear-to-br from-white to-[#efefef]` — the exact gradient from the
ExperimentalTestimonials cards (line 185). Verified live on /home: no canvas in #stats,
bg computes linear-gradient(to right bottom, #fff → #efefef), section padding 96px/96px
(md), stat-inner still 40px/40px, 4 rows. tsc clean; biome findings pre-existing
(index key + CRLF format churn). Not committed.

## 2026-07-14 — Home: Stats pins, Services overlaps; rotate entrance removed
`src/app/home/page.tsx`: replaced ServiceSection's scale-0.65/rotate-20°/border-radius
scrub entrance (gsap.fromTo on serviceInnerRef) with the About→Portfolio overlap
pattern: StatsSection wrapped in `div.relative.z-0` (statsContainerRef) pinned via
ScrollTrigger from `start: "bottom bottom"` (NOT top top — Stats is taller than the
viewport; pinning earlier would freeze its row scrubs with lower rows unseen) to
`end: serviceContainer "top top"`, `pinSpacing: false`; ServiceSection wrapper is now
`relative z-10 shadow-[0_-50px_80px_rgba(0,0,0,0.5)]` (dropped the bg-white py-10
card frame + origin-center inner div; serviceInnerRef removed). Services now slides up
over the pinned stats after stats finishes scrolling. Verified live on /home: GSAP
pin-spacer wraps the stats container (pin registered), service wrapper z-10 with
transform:none (no rotation/scale anywhere), black section inside, shadow applied;
tsc + biome clean. Scroll feel needs eyes. Not committed.

## 2026-07-14 — Fix Safari leak of floating cursor pills (ServiceSection + PortfolioSection)
The fixed "View Services"/"View Project" cursor-follower pills leaked (visible at full scale) in Safari because their ONLY hidden state was a JS inline transform (gsap.set scale:0) — CSS-wise they were md:flex visible at left-0 top-0, so any moment Safari painted before/without the inline style (post-hydration delay, BFCache restore, matchMedia revert) they showed. Fix in both files: pill is now CSS-hidden by default (invisible opacity-0 classes) and all three GSAP calls (initial set, enter, leave) also drive autoAlpha (inline opacity+visibility overrides the class when revealing). Fail-safe in every ordering: no-JS/pre-JS → hidden; hover → visible; revert → falls back to hidden CSS. Verified: tsc + biome clean, next build ✓. 2 files. Not committed.

## 2026-07-15 — Blog hero: remove image, faster/visible bg, working dropdowns, drop count
Four fixes per plan.md. (1) BlogHeroSection: removed the inline title image + isExpanded/split machinery (title now plain staggered "News, views / and everything else"). (2) Bg animation: SpotlightGrid speed 2→4 AND flipped the shared Lissajous y-phase (+1.3→-1.3) so the spotlight STARTS near the top — previously it started under the hero's 2/3 bottom scrim, which is why it seemed invisible on first view (safe for CtaSection/contact consumers; their scrims are also bottom/center-heavy). (3) Dropdowns now functional: By Category (all categories) / By Author (All + authors from NON-featured posts), toggle + outside-click + Escape close, aria-haspopup/expanded, menus open UPWARD (buttons sit at the bottom of the overflow-hidden box — downward would clip; caught by spec-verifier P1). Selecting dispatches CustomEvent "blog:filter" and smooth-scrolls to #blog-list. (4) Removed "Showing 1-6 of 6 posts."; pills stay right via md:justify-end. BlogListSection: id="blog-list", listens for blog:filter, new activeAuthor state (category+author filtering, mutual reset, pills reset author), AnimatePresence keyed on category+author, empty state "No posts found for this filter." Verified: tsc + biome clean, next build ✓ /blog, spec-verifier round 1 → P1/P2/P3 all fixed. 3 files + plan.md. Not committed.

## 2026-07-14 — Standardize ALL brand gradients → PortfolioSection button gradient (worker mode)
Standard = horizontal #2E5BFF→#149CCB, 2 stops (PortfolioSection floating "View Work"
button, PortfolioSection.tsx:289). Full grep sweep found ~60 usages already matching;
fixed 8 deviant files. Worker mode (driver = Fable, 5 sonnet workers, 0 opus, 0
reroutes):
- PerksSection.tsx icon boxes: `bg-gradient-to-br` → `to-r`.
- ui/SpotlightGrid.tsx default cell glow: vertical 3-stop `to-b …via… ` → `to-r` 2-stop.
  glowColor/glowVia props kept (now dead API, harmless).
- brand-strategy/CtaSection, web-development/CtaSection, contact/ContactHeroSectionTwo:
  dropped `glowColor="#2E5BFF" glowVia="#5B7CFF"` → `<SpotlightGrid />` (falls back to the
  now-standard default). This SUPERSEDES the earlier same-day solid-#2E5BFF then #5B7CFF
  CTA-glow requests, per explicit "replace every gradient" instruction.
- ui/TracingBorder.tsx: comet def diagonal 3-stop → horizontal 2-stop; static border def
  reversed-diagonal `#149CCB→#2E5BFF` → horizontal `#2E5BFF→#149CCB` (corner emphasis
  flips L-blue→R-cyan; comments updated).
- (S7, added after verifier round-1 P1 — my inventory grep missed MULTI-LINE svg defs)
  4 diagonal icon defs → horizontal: career/CareerValues `values-icon-grad` y2 100→0;
  brand-strategy/FaqSection, contact/ContactFaqSection, web-development/FaqSection
  `icon-gradient` y2 24→0.
Excluded (not brand / already standard): scrims·fades·masks·vignettes, resizable-navbar
zinc-crossfade (hover target already standard), BorderGlow (HSL box-shadow),
DynamicButton (defaults already standard), garbage/ (hard rule).
Verified: tsc exit 0; project-wide sweep → 0 non-horizontal brand gradients (excl.
garbage); live DOM /career + /contact show `linear-gradient(to right, rgb(46,91,255),
rgb(20,156,203))`. spec-verifier APPROVED round 2 (round 1 caught the 4 multi-line defs;
fixed + re-verified). Pre-existing biome/CRLF findings in touched files left untouched
per constraint. Not committed.

## 2026-07-15 — Contact hero redesign (left-aligned split + right image, no buttons/desc)
Reworked ContactHeroSectionTwo from the centered dark spotlight into a two-column split inside the same black spotlight box. Removed both CtaStyleButtons (+ the CtaStyleButton helper) and the subtitle/description; removed now-unused imports (Link, MdArrowOutward) and the fadeUp variant. Left column: eyebrow + staggered "Let's Build / Something / Great Together." headline, now left-aligned (items-start text-left, md:w-1/2). Right column: /assets/contact2.png (object-contain, fade-in from x:40, md:w-1/2). Swapped the centered radial scrim back to a left-side gradient scrim + moved the brand glow to bottom-left so the left copy stays legible. Kept the spotlight (glowColor #2E5BFF / glowVia #5B7CFF), eyebrow, headline + animations as-is. Reduced-motion guarded. Verified: no button/desc/unused-import refs, tsc + biome clean, next build ✓ /contact. Single file. Not committed.

## 2026-07-15 — Contact hero: swap image contact2.png → contact.png
Changed the right-side image in ContactHeroSectionTwo from /assets/contact2.png to its sibling /assets/contact.png (the obvious "change the image" candidate; confirmed the file exists). Alt made generic ("Contact illustration") since the new asset's subject differs. One-line src/alt change; tsc + biome clean. Not committed.

## 2026-07-15 — Contact hero: swap image to a non-"contact" asset
Per request (different image, NOT contact-named), inspected candidate assets visually and swapped the right-side image from /assets/contact.png to /assets/milad-fakurian-2gzQL38nWAM-unsplash.jpg — a dark abstract glass render that blends with the black spotlight box and suits the dark-tech look. Since it's a full-bleed photo (not a transparent PNG), changed fit object-contain → object-cover and framed the container (overflow-hidden rounded-[20px] border border-white/10). Alt → "Abstract glass artwork". Verified: asset exists locally, no contact.png/contact2.png refs remain, tsc + biome clean, next build ✓ /contact. Single file. Not committed.

## 2026-07-15 — Contact hero: remove bottom-left blue glow + lighten black scrim
Removed the blue brand-glow blob (absolute -bottom-24 -left-12 bg-[#2E5BFF]/25 blur-[120px]) from the contact hero, and reduced the left black scrim opacity from from-black/via-black/85 to from-black/60/via-black/30 (to-transparent unchanged). Class/markup-only; tsc + biome clean. Not committed.

## 2026-07-15 — Contact hero: further reduce black overlay on pattern
Reduced the contact hero's left scrim (the contact-specific black overlay dimming the spotlight pattern) further: from-black/60 via-black/30 → from-black/40 via-black/15 (to-transparent unchanged). Left SpotlightGrid's shared internal overlays untouched (they affect all consumers). Class-only; tsc + biome clean. Not committed.

## 2026-07-15 — Header services dropdown: localized black overlay (not on whole image)
In both navbar components (page/resizable-navbar + ui/resizable-navbar) the Services dropdown cards previously darkened the ENTIRE hover image with a full-cover gradient (absolute inset-0 bg-gradient-to-t from-black/80 to-black/50). Removed that; the image now shows undarkened on hover. Instead added a SIMPLE hover-only black backing behind the title text only (bg-black/70 rounded pill, opacity-0 → group-hover:opacity-100, wrapped around the gradient-clip title span) and behind the arrow icon only (bg-black/70 rounded backing on the arrow wrapper, which already fades in on hover) — so text/icon stay legible over the bright image. Both files, presentational only. Verified: no from-black/80 overlay remains, tsc + biome clean, next build ✓. Not committed.

## 2026-07-14 — Services dropdown: new 8-item service list
Replaced the dropdownItems array in BOTH headers (`page/Header.tsx` inner pages,
`layout/Header.tsx` home — duplicate-nav trap) with the user's list: Digital Marketing,
AI & Marketing Automation, Web Development (→ /web-development), App Development,
Software Development, Brand Strategy and Identity (→ /brand-strategy; fixed "indetity"
typo), UI/UX Design, Video Production. Unbuilt pages keep the existing `/services`
placeholder link (still 404s — pre-existing convention); images reused semantically
from the old pool (code→WebDev, camera→Video, identity→Brand, phone→App, etc.); count
"/1 services" kept. Verified live by mounting both hover dropdowns: /work and /home each
render exactly the 8 names in order with correct hrefs. tsc exit 0; biome unchanged.
Not committed.

## 2026-07-15 — Header services dropdown: black box → shadow
Replaced the localized black-box backings (bg-black/70 pills behind the title/icon, added earlier) with shadows in both navbar components. Title: single gradient-clip span again + group-hover:[text-shadow:0_2px_12px_rgba(0,0,0,0.85)] (renders a dark halo behind the gradient glyphs on hover). Arrow: restored to plain svg + drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] (visible only on hover since the arrow is opacity-0 at rest). Image still undarkened. Both files, presentational. Verified: no bg-black/70 remains, 2 shadow utils per file, tsc + biome clean, next build ✓. Not committed.

## 2026-07-15 — Revert: header dropdown shadow → back to black box
Reverted the prior shadow task. Restored the localized black-box backings (bg-black/70 rounded pills behind the title text and arrow icon, hover-only) in both navbar components, removing the group-hover text-shadow on the title and the drop-shadow on the arrow. Done manually (git couldn't isolate it — the underlying black-box change is also uncommitted). Image stays undarkened. Verified: no text-shadow/drop-shadow utils remain, 2 bg-black/70 backings per file, tsc + biome clean, next build ✓. Not committed.

## 2026-07-14 — Contact hero: reduce height
`src/components/contact/ContactHeroSectionTwo.tsx` card (line 38): min-h 82vh→62vh,
py-16→py-12, md:py-20→md:py-16. But content (the side image) was the binding constraint,
not min-h, so also trimmed the image (line 80): h 320/460/540 → 280/380/440. Live /contact:
card height 670px→570px (~15% shorter), image 540→440, min-h now 446px (non-binding).
tsc exit 0, biome clean. NOTE (not acted on): line 39 SpotlightGrid still has
glowColor="#2E5BFF" glowVia="#5B7CFF" — the gradient-standardization removed this earlier;
it has reappeared (recent user edits to this file). Flagged to user, left as-is. Not committed.

## 2026-07-14 — Contact hero: pattern more visible + prominent motion
Two contact-only levers on `src/components/contact/ContactHeroSectionTwo.tsx` (no shared
SpotlightGrid internals touched, so blog/CTA unaffected): (1) left legibility scrim
`from-black/40 via-black/15` → `from-black/20 via-black/5` (line 42) — pattern shows
through where the copy sits; (2) SpotlightGrid `speed` default(1) → `speed={3}` (line 39)
so the spotlight visibly drifts (root cause of "looks like no effect" — it was barely
moving; blog hero uses speed={4}). glowColor/glowVia kept as the user set them. Verified:
biome clean; live /contact DOM confirms scrim now from-black/20 via-black/5. Motion
prominence can't be observed in the headless pane (rAF doesn't advance, mask X stays at
the -1000 idle value) — needs user's eyes. Not committed.

## 2026-07-15 — Header "Get in Touch": instant hover (no duration)
The header CTA is the shared DynamicButton, whose hover durations live inside the component (bg reveal duration-500, shine duration-1000, per-letter transitionDelay stagger, icon duration-300, root transition-all). Added an opt-in `instantHover` prop that swaps every duration-* to duration-0 and zeroes the letter transitionDelay, so the hover effect happens instantly. Passed instantHover from BOTH headers' Get in Touch buttons (layout/Header + page/Header). Scoped via prop so all other DynamicButton CTAs keep their animated durations. Verified: both headers pass the prop, 7 duration-0 refs in DynamicButton, tsc + biome clean, next build ✓. 3 files. Not committed.

## 2026-07-15 — Header "Get in Touch": increase width
Widened the header CTA (shared DynamicButton, w-fit) by bumping its horizontal padding px-4 → px-8 in both headers (layout/Header + page/Header). Padding-only, so height/design unchanged; other DynamicButton CTAs unaffected. tsc + biome clean. Not committed.

## 2026-07-14 — Home hero: inline title pill radius matches main card
`src/components/home/Herosection.tsx:78` — the inline image pill between the title words:
`rounded-full` → `rounded-[20px]`, matching the hero's main container (`rounded-[20px]`,
line 50). Verified live on /home: main card and pill both compute border-radius 20px
(match); no rounded-full pill remaining. Biome clean. Not committed.

## 2026-07-14 — Home AboutSection: swap CTA for the ExperimentalTestimonials CTA
`src/components/home/AboutSection.tsx`: replaced the `<DynamicButton text="Start Project"
href="#contact">` with the ExperimentalTestimonials "Connect With Us" CTA verbatim (white
h-16 pill, expands on hover, black icon chip with the dual MdArrowOutward gradient-swap).
Import swapped DynamicButton (now unused) → `{ MdArrowOutward } from "react-icons/md"`;
biome auto import-sort applied. Gave the SVG linearGradient a UNIQUE id
`about-connect-icon-grad` (both sections render on /home; reusing `testimonial-icon-grad`
would collide). NOTE: like the source CTA it's a plain <button> with no href, so the old
`#contact` navigation is dropped — faithful to "the cta used in experimental testimonials";
flag if a link is wanted. Verified live /home: old "Start Project" gone, new CTA present
(label "Connect With Us", 64px, white, rounded, 3 svgs), both gradient ids unique (count
1 each). tsc exit 0; residual biome = pre-existing (noImgElement×2, noArrayIndexKey).
Not committed.

## 2026-07-15 — Home AboutSection: buttery card-change animation
The stacked card carousel changed with a single 3s tween using premiumEase (hard ease-out [0.22,1,0.36,1]) for enter + exit + reposition, plus `layout` on absolute inset-0 cards (layout projection fighting transforms) — reading as janky/frozen. Reworked: reposition/enter now use a gentle overdamped spring (stiffness 60, damping 20, mass 1 → ratio ~1.29, smooth, a little slow, no harsh stop); the exit card flies off on its own clean tween (duration 1.1, exitEase); removed the redundant `layout`; added will-change-transform for GPU. (User also applied the same spring to the RotatingWord flip so it syncs with the image change.) Verified: no `layout` on the card, spring+exit-tween+will-change present, premiumEase still used elsewhere, tsc + biome clean, next build ✓. Single file. Not committed.

## 2026-07-14 — Home AboutSection: sync word-flip with image-change animation
Root cause: the RotatingWord flip and the card-stack image change are both driven by the
same `frontIndex` (so they START together) but had mismatched durations — word was a 0.5s
`premiumEase` tween while the card uses an overdamped spring (stiffness 60/damping 20/mass 1,
~1.5s settle), so the word snapped in while the card was still gliding = looked out of sync.
Fix: `src/components/home/AboutSection.tsx` RotatingWord motion.span transition 0.5s tween →
the card's exact spring. Both now share identical physics + trigger → in sync (kept the card's
intentional slow "butter" feel, brought the word to it). premiumEase still used elsewhere (5×).
Verified: word & card spring params identical via grep; tsc exit 0; no new biome. Desktop-only
motion — headless pane can't play it, sync confirmed by matching config. Not committed.

## 2026-07-15 — Home AboutSection: word flip horizontal
Changed the RotatingWord flip (brands./startups./founders./creators.) from vertical to horizontal: the sliding keyframes went y:100%→0%→-100% to x:100%→0%→-100% (words now enter from the right and exit left). Container already has overflow-hidden + popLayout, so clipping/sizing still work; kept the shared spring. tsc + biome clean. Not committed.

## 2026-07-14 — Home AboutSection: baseline-align the title words
Investigated "tag/title/description on the same line vertically, left aligned": measured
live at desktop AND mobile — the three blocks were ALREADY vertically stacked and
left-aligned (all at the same left edge, text-align:start). The real quirk: within the
h1, `items-center` vertically-centered word-chips of differing heights, so the taller
gradient word "cinematic" (py-1) floated ~4px above the plain words instead of sitting on
the same line. Fix: h1 `items-center` → `items-baseline` (`AboutSection.tsx` title h1) so
all title words share a text baseline. Verified live /home: alignItems baseline, plain
words now share bottom (6px), gradient word aligned on baseline, tag+h1 left edge still 45px
(unchanged left alignment). tsc exit 0. Not committed.

## 2026-07-14 — Home: remove black overlay on About during pin-overlap
Root cause: the pinned About wrapper `aboutContainerRef` was `bg-black`; its inner white
AboutSection scrubs to `opacity:0` as the next section pins over it (start top top →
Portfolio top top), so the black backdrop showed through = "black overlay on About."
Fix: `src/app/home/page.tsx:141` aboutContainer `bg-black` → `bg-white`, so the About
recedes into white (matches page + section bg) — clean, no black flash. Kept the
scale/opacity/y recede animation intact. Verified live /home: container computes
rgb(255,255,255) (revealsBlack:false); only remaining bg-black is an unrelated
Trusted-By divider. tsc + biome clean. Mid-scroll appearance needs user's eyes (pin/scrub
needs real desktop scroll). Not committed.

## 2026-07-14 — Home: stop fading About opacity during pin (keep fully visible)
Follow-up to the black-overlay fix: removed `opacity: 0` from the About pin scrub
(`src/app/home/page.tsx` gsap.to on aboutInnerRef) per user — the About now stays at
full opacity as the next section pins over it. Kept scale:0.85 + y:40 recede. The
container is bg-white from the prior task (now moot since the opaque About never reveals
it — left as-is, harmless). Verified: opacity ref gone from the anim block; tsc + biome
clean. Scroll feel needs user's eyes. Not committed.

## 2026-07-14 — Home: Stats overlaps Portfolio (mirror of Portfolio→About)
Added a Portfolio→Stats pin-overlap to `src/app/home/page.tsx`, mirroring the existing
About→Portfolio: new ScrollTrigger pins `portfolioRef` from start "top top" → endTrigger
`statsContainerRef` "top top", pinSpacing:false (Portfolio is md:h-screen so it pins
cleanly with no below-fold freeze). Stats now rides up over the pinned Portfolio.
Z-layering to make Stats paint over Portfolio: Stats/Service wrapper z-10 → z-20 (Portfolio
is z-10); statsContainer gained `bg-white shadow-[0_-50px_80px_rgba(0,0,0,0.5)]` (upward
shadow = same overlap cue Portfolio uses over About). Existing Stats→Service overlap
renumbered to step 3, untouched. Verified live /home: Stats wrapper computes z-index 20 >
Portfolio 10, statsContainer boxShadow = rgba(0,0,0,0.5) 0px -50px 80px, bg white; tsc +
biome clean. Pin/scroll feel needs user's eyes (desktop scrub, headless pane can't drive).
Not committed.

## 2026-07-14 — Portfolio→Stats overlap REDONE correctly (nested-pin fix)
The earlier attempt (wrapper ScrollTrigger pin around portfolioRef) was structurally
broken: PortfolioSection already pins itself internally for its horizontal scrub, and
GSAP does not support nested pins. Removed that wrapper trigger from
`src/app/home/page.tsx`. Correct mechanism, two parts:
(1) `PortfolioSection.tsx`: converted the x-scrub tween to a timeline on the SAME
internal pin — x to -totalWidth over `duration: totalWidth`, then a dummy hold tween
`duration: holdPx = window.innerHeight`; trigger end `+=${totalWidth + holdPx}`. Active
index math adjusted: `progress / xPhase` clamped (xPhase = totalWidth/(totalWidth+hold))
so the counter still completes during the x-phase. scrollTween stays the
containerAnimation for the text reveals (linear throughout).
(2) `page.tsx`: stats/service wrapper gains `md:-mt-[100vh]` (z-20 + statsContainer
white bg + upward shadow kept from previous attempt) — Stats' doc position is one
viewport earlier, so during the hold it slides OVER the pinned Portfolio; its top
reaches viewport top exactly at unpin.
Verified live at 1280×800: portfolio inside real .pin-spacer; spacer 6720 = 800 section
+ 5120 travel (exactly 4×1280 for 5 panels) + 800 hold; statsWrap margin-top -800px
(=-100vh), z 20. Below md (715px probe): no pin, margin-top 0 — mobile unaffected.
tsc exit 0; biome findings pre-existing (activeIndex/isDesktop unread at HEAD too).
Scroll feel needs user's eyes. Not committed.

## 2026-07-15 — Header "Get in Touch": remove border
Removed the border from the inner-page header CTA (page/Header) — dropped "border border-gray-300 hover:border-none" from the DynamicButton className. layout/Header's button already had no border. tsc + biome clean. Not committed.

## 2026-07-14 — Home: remove Portfolio's drop shadow over About
User: "drop shadow when the service section overlaps AboutSection" — the section that
actually overlaps About is Portfolio (dark, right after About); its wrapper carried
`shadow-[0_-50px_80px_rgba(0,0,0,0.5)]` casting up onto About during the pin-overlap.
Removed that class from portfolioRef (`src/app/home/page.tsx:156`). The other two overlap
shadows (statsContainer over Portfolio :164, serviceContainer over Stats :171) are
untouched. Verified live /home: Portfolio wrapper boxShadow now `none`, stats shadow still
present. biome clean. Not committed.

## 2026-07-14 — Home AboutSection: drop title full-stop, reverse word-slide direction
`src/components/home/AboutSection.tsx`: (1) rotating words `["brands.","startups.",
"founders.","creators."]` → periods removed (`["brands","startups","founders","creators"]`)
so the title no longer ends in a full stop (mobile branch shows words[0] too — now clean).
(2) RotatingWord slide reversed L→R: initial x "100%"→"-100%" (enters from left), exit
x "-100%"→"100%" (exits right); comments updated. Verified live /home: title endsWithPeriod
false, visible rotating word "creators" no period. Slide direction is framer-driven —
source flipped, on-screen motion needs user's eyes. biome clean. Not committed.

## 2026-07-14 — Home AboutSection: smooth word swap + character-sync with image
The word already shared the card's spring (60/20/1) and trigger (frontIndex) → timing was
in sync, but the card FADES in (opacity 0→1) while the word only slid, so the swap read as
harder/less smooth. Added a matching opacity cross-fade to RotatingWord (initial opacity 0,
animate 1, exit 0) on the SAME spring — the word now slides + fades exactly like the card,
smoothing the swap seam/width-reflow and matching the image's character, not just its timing.
Kept the reversed L→R direction and the shared spring. Verified: word transition still
stiffness 60 (matches card line 314); opacity in all 3 states; biome exit 0. Motion feel
needs user's eyes (framer, headless pane can't play). Not committed.

## 2026-07-14 — Home StatsSection: bg gradient diagonal → left-to-right
`src/components/home/StatsSection.tsx:88` section bg `bg-linear-to-br` → `bg-linear-to-r`
(white → #efefef). Verified live /home: computed backgroundImage now
`linear-gradient(to right, rgb(255,255,255), rgb(239,239,239))`. biome clean. Not committed.

## 2026-07-14 — Home: remove ServiceSection top drop shadow
Removed the upward overlap shadow `shadow-[0_-50px_80px_rgba(0,0,0,0.5)]` from the
ServiceSection wrapper (`src/app/home/page.tsx:171` serviceContainerRef). Left the
Stats-over-Portfolio shadow (:164) and ServiceSection's mobile card `max-md:shadow-sm`
intact. Verified live /home: service wrapper boxShadow now `none`, stats shadow still
present. biome clean. Not committed.

## 2026-07-14 — Home StatsSection: narrow the row divider (border-bottom)
`src/components/home/StatsSection.tsx:103` between-row divider `left-0 right-0` →
`left-10 right-10` (inset 40px each side, aligning with the section's md:px-10 content
padding) so it's no longer full-bleed. Verified live /home: divider 1185px vs row 1265px
(40px inset each side). biome clean. Not committed.

## 2026-07-14 — DynamicButton: fix hover text clipping the final glyph
"Get in Touch" lost the trailing "h" on hover. Root cause (measured): the hover text is
rendered per-letter (`text.split("")`, nbsp spaces, no kerning) so it's ~1.6px wider than
the kerned single-string default text that sizes the wrap — and the text wrap's
`overflow-hidden` clipped that 1.6px. NOTE: increasing tracking does NOT fix this — equal
letter-spacing widens both default and hover text by the same amount, so the ~1.6px
kerning overflow persists. Real fix: removed `overflow-hidden` from the text wrap in
`src/components/ui/DynamicButton.tsx` (the reveal is opacity-only, so the clip served no
purpose). Shared component — applies to both Headers + any other DynamicButton usage, all
beneficial. Verified live /home: wrap overflow now `visible`, hover text (83.6px) sits
within the button's 32px right padding (~30px clearance, not clipped). biome clean. Other
overflow-hidden (button top-level :52, shine :81, icon :131) kept. Not committed.

## 2026-07-15 — Home: match x-gutter to ServiceSection (px-4 md:px-10)
ServiceSection's content wrapper uses px-4 md:px-10 (full-width). Aligned three sections to that: ExperimentalTestimonials inner container px-6 → px-4 md:px-10; ContactSection content wrapper px-6 → px-4 md:px-10; BlogSection HEADER ROW ONLY px-6/md:px-6 → px-4 md:px-10 (blog cards/grid left untouched per "only the header part"). Class-only; tsc + biome clean, next build ✓. 3 files. Not committed.

## 2026-07-15 — BlogSection: testimonials-CTA, tighter header gap, no card hover, no hover-pause, draggable
Per plan.md (5 changes). (1) Replaced the DynamicButton header CTA with the ExperimentalTestimonials-style CTA — a Link to /blog, "Explore all articles", bg-white pill (border-transparent→hover:border-black, pl-0→pl-6 expand) + black arrow-flip chip (unique gradId blog-cta-grad). (2) Header→carousel gap reduced mb-16/md:mb-35 → mb-12/md:mb-24. (3) Removed card hover: dropped `group`, image group-hover:scale-105 + transition, the hover overlay div, and title group-hover:text-[#2E5BFF]. (4) Removed stop-on-hover (isPaused + onMouseEnter/Leave + keyframe animate). (5) Made carousel draggable: replaced the keyframe x-marquee with a motion-value system — useMotionValue x + useTransform wrap → xWrapped (seamless both directions), useAnimationFrame auto-scrolls left at loopWidth/22 px·s when !dragging, manual pointer-drag (onPointerDown/Move/Up + capture) adds delta to x and pauses the frame. Desktop only; mobile still stacks vertically. spec-verifier round 1 flagged P2 (scrollWidth/2 omitted half the inter-track gap → ~6px hiccup/loop); fixed by measuring loopWidth = first CardTrack offsetWidth + computed column-gap. Verified: all 5 present, tsc + biome clean, next build ✓. 1 file + plan.md. Not committed.

## 2026-07-14 — Home AboutSection: match ServiceSection x-axis padding
`src/components/home/AboutSection.tsx:161` horizontal padding `px-6 md:px-8 lg:px-8` →
`px-4 md:px-10` to match ServiceSection's content padding (`px-4 md:px-10`, its inner div
ServiceSection.tsx:121). Non-x classes (py-10, before:*, lg:mb-20) untouched. Verified live
/home at 1265px: AboutSection computes 40px/40px = ServiceSection inner 40px/40px (match).
biome clean. Not committed.

## 2026-07-15 — BlogHeroSection: bigger, centered spotlight mask
Added two props to the shared SpotlightGrid (defaults preserve current behavior for CtaSection/ContactHero): maskRadius (default 600 → the radial mask circle size) and travel (default 0.9 → Lissajous swing amplitude as a fraction of the half-grid). The mask template and the fCol/fRow amplitude now use these. BlogHeroSection passes maskRadius={950} (larger revealed area) and travel={0.35} (spotlight stays in the central region instead of wandering to the edges). travel added to the rAF effect deps. Verified: no hardcoded 600px/0.9 remain, other consumers still default, tsc + biome clean, next build ✓. 2 files. Not committed.

## 2026-07-15 — TracingBorder: crisp stop-at-top-right, instant handoff
Task: the moving border (comet) in BlogListSection should stop at the top-right
corner and instantly the next effect takes place. Root cause: in
`src/components/ui/TracingBorder.tsx` the comet began fading at t=2.05s
(`delay: LAP_DURATION - 0.45`) — dimming during its final travel — and the
corner-glow handoff fired early at t=2.35s (`HANDOFF = LAP_DURATION - 0.15`),
both BEFORE the comet lands at the top-right corner (its path start/end) at
t=2.5s. Fix (2 hunks, timing-only): `HANDOFF = LAP_DURATION` (next effect fires
exactly on landing) and comet Layer 1 fade `delay: LAP_DURATION - 0.45 → LAP_DURATION`,
`duration: 0.45 → 0.3` (full-brightness lap, then quick dissolve into the corner
energy). Shared component — same crisper handoff now applies to all 4 consumers
(blog/BlogListSection + work/ & brand-strategy/ & web-development/ ProjectShowcase),
identical beneficial polish (cf. DynamicButton precedent). Also removed one
pre-existing trailing-whitespace blank line so biome is clean. tsc + biome clean,
next build ✓. Motion timing verified by construction; live hover verified by user.
Not committed.

## 2026-07-15 — Contact hero: drop eyebrow, 2-line title, narrower image, about-style image anim, blog bg
Five changes to ContactHeroSectionTwo: (1) removed the "Contact Us" eyebrow tag above the title; (2) title now two lines — "Let's Build Something" / "Great Together." (gradient) instead of three; (3) reduced the right image width md:w-1/2 → md:w-2/5 (left column widened md:w-1/2 → md:w-3/5); (4) image entrance now matches the homepage AboutSection card images — initial {opacity:0, scale:0.95, y:40} → whileInView {opacity:1, scale:1, y:0}, duration 1.2, premiumEase (was a mount x:40 slide); (5) background effect matched to the updated BlogHeroSection — SpotlightGrid speed={4} maskRadius={950} travel={0.35}, dropped the custom glowColor/glowVia (default blue→cyan glow like blog). Verified: eyebrow gone, 2-line title, w-2/5 image, about-anim values, blog SpotlightGrid props (no glowColor), tsc + biome clean, next build ✓ /contact. Single file. Not committed.

## 2026-07-15 — Contact hero: 2-line title rephrase + AboutSection stacking cards on right
(1) Rephrased the title into two clean lines: "Let's build" / "something great." (gradient), replacing the longer 3-word first line. (2) Replaced the single right-side image with the homepage AboutSection stacking-card animation: ported frontIndex + 4.5s interval (guarded to isDesktop && !reduce), visibleCards [0,1,2] window, AnimatePresence 3-card stack with the exact offset-based stack values, exit fly-off (x:1000/y:400/rotateZ:90, 1.1s exitEase), and the buttery spring (stiffness60/damping20/mass1). Adapted for the dark container (rings border-white/*, card bg-zinc-800), added exitEase, decorative counter-rotating rings, and a static first-card fallback for mobile/reduced-motion. CARDS = the current local abstract + AboutSection's 2 unsplash URLs (plain <img>, so no remotePatterns needed); dropped next/image. Kept right column md:w-2/5. Verified: tsc + biome clean, next build ✓ /contact, spec-verifier APPROVED (values match AboutSection, no P0/P1/P2). Single file. Not committed.

## 2026-07-14 — Home ServiceSection: description styles match brand-strategy SubServices
`src/components/home/ServiceSection.tsx:127` description `max-w-xl text-sm font-medium
leading-relaxed text-white/60 md:text-lg` → `max-w-2xl text-2xl font-light leading-[1.25em]
text-white md:text-left` (copied verbatim from brand-strategy/SubServices.tsx:110). Copy text
unchanged. Verified live /home: computes 24px / weight 300 / lh 30px / white / max-w 672px /
left — identical to SubServices. biome clean. Not committed.

## 2026-07-15 — Header dropdown: swap hard black boxes for a subtle top gradient scrim
Task: in the header, remove the black div behind the hover text and instead use a
subtle/smooth top black gradient so the text stays readable but not overwhelming.
Location: the Services mega-menu dropdown cards in BOTH resizable-navbars
(`src/components/page/resizable-navbar.tsx` inner-page header + `src/components/ui/
resizable-navbar.tsx` home header — near-duplicates per map). Each hover card fades in
a background image + turns its title white; legibility came from two hard
`bg-black/70` rounded boxes (one behind the title, one behind the arrow). Replaced both
with a SINGLE gradient scrim `<div>` per card: `absolute inset-0 z-[5]
bg-gradient-to-b from-black/55 via-transparent to-black/30`, `opacity-0 →
group-hover:opacity-100`, `transition-opacity duration-500 ease-out`, pointer-events-none
— sits above the image (z-0) and below the content (z-10), clipped by the card's
overflow-hidden/rounded. Top-weighted (black/55) for the title, middle transparent so the
image reads clearly, light bottom fade (black/30) so the arrow stays legible. Judgment
call: also removed the arrow's twin black box (not just the text's) since keeping one hard
box would contradict "subtle and smooth"; the bottom fade backs it instead. Applied to
both headers for site consistency. 2 files. tsc + biome-format clean, next build ✓.
Pre-existing biome lint debt in these files (noImgElement/noArrayIndexKey/etc.) left
untouched (out of scope). Live hover verification pending user. Not committed.

## 2026-07-14 — Home ServiceSection: sync services list with Header dropdown
Replaced ServiceSection's 5-item `services` array (Branding/Web Dev/UI-UX/Visual Content/
eCommerce) with the 8 from the Header "Services" dropdown (page/Header.tsx), same order,
names, images, and links: Digital Marketing, AI & Marketing Automation, Web Development
(/web-development), App Development, Software Development, Brand Strategy and Identity
(/brand-strategy), UI/UX Design, Video Production. hrefs now real (/web-development,
/brand-strategy, else /services) instead of "#". Verified live /home: 8 rows exactly
matching the dropdown names/order, links correct. tsc exit 0, biome clean. (Note: the six
"/services" links 404 — that route doesn't exist yet, mirroring the dropdown's own pending
links; pre-existing gap, not introduced by names.) Not committed.

## 2026-07-14 — Footer: unframe the giant Softexedge wordmark
Removed the two lines bracketing the giant "Softexedge" brand name in
`src/components/layout/Footer.tsx`: the wordmark div's own `border-b border-white/10`
(bottom line, line 136) and the `border-b border-white/10` on the section above it (top
line, line 62). Kept all padding (pb-16/pt/pb) for spacing. Verified live /home footer:
both the wordmark div and the section-above compute borderBottomWidth 0px. biome clean.
Not committed.

## 2026-07-15 — Home: uniform inter-section spacing (ServiceSection py as standard)
Task: make each section's padding-top equal the previous section's padding-bottom for
consistent vertical rhythm, using ServiceSection (`py-16 md:py-32`) as the standard;
EXCLUDE Hero/About/Portfolio/Stats, apply to the rest. Standard = 16 (mobile) / 32 (md),
symmetric. Set the four post-Service sections to `py-16 md:py-32`:
(1) `home/ExperimentalTestimonials.tsx` `pt-16 pb-6 md:pt-20 md:pb-10` → `py-16 md:py-32`;
(2) `ui/TechLogoCarousel.tsx` `pt-6 pb-16 md:pt-10 md:pb-24` → `py-16 md:py-32`;
(3) `home/ContactSection.tsx` `py-24 md:py-32` → `py-16 md:py-32` (mobile 24→16);
(4) `home/BlogSection.tsx` section `md:pt-0 pb-20 md:pb-40` → `pb-16 md:pb-32` (dropped dead
`md:pt-0`), and its top padding wrapper in `app/home/page.tsx:179`
`md:[&>section]:pt-24` → `md:[&>section]:pt-32` (wrapper's `.wrapper>section` wins by
specificity; mobile pt-16 already standard). Result: every adjacent boundary among
{Service, Testimonials, TechLogoCarousel, Contact, Blog} now has pt(next)=pb(prev) at both
breakpoints (~64px md gap each). Left the "Trusted By" LogoLoop band alone (bracketed by
excluded Hero/About). 5 files. tsc clean, next build ✓; my edited lines are biome-format
clean (pre-existing CRLF-era format drift in page.tsx lines 154-172 and
ExperimentalTestimonials 182-225 is from prior uncommitted work, NOT my lines — left
untouched, out of scope). spec-verifier APPROVED round 1 (no P0/P1). Live visual pending
user. Not committed.

## 2026-07-14 — Footer: center the partition between the two link lists
The two nav lists sat in a `md:grid-cols-3` grid but there are only 2 lists, so they
filled tracks 1–2 with an empty 3rd track — pushing the vertical `border-l` divider to the
~1/3 mark. Changed `src/components/layout/Footer.tsx:63` to drop the `md:grid-cols-3`
override so the base `grid-cols-2` governs all breakpoints — two equal columns, divider at
their shared boundary = center. Verified live /home @1280: grid 314.5px×2, divider x=391 =
link-area center (391), dividerAtCenter true. biome clean. Not committed.

## 2026-07-15 — Site-wide: unify section-intro description style (leading/weight/color)
Took the brand-strategy SubServices header description style (font-light, leading-[1.25em], color) and normalized every SECTION-INTRO lede paragraph site-wide. Color matched per background (user choice): text-white on dark sections, text-zinc-600 on light. Only leading + font-weight + color changed — font-size, max-w, margins, alignment, animation, and gradient spans left intact. Scope = section-intro ledes only (card/item/body/label/quote/nav/footer/blog-excerpt copy and dead code excluded). 13 paragraphs across 13 files changed via a frontend-developer subagent: AboutTraditional, OurValuesSection, brand & web-dev CtaSection, ExperimentalTestimonials, home ContactSection, home AboutSection, ProjectHero, BlogListSection, ApplicationJourney, CareerHeroSection, WhyJoinUs, WorkProjectShowcase. 8 sections were already compliant (SubServices ×2 [reference], ServiceSection, ProjectShowcase ×2, ProcessSection ×2, OurTechStack ×2). Verified: tsc + biome + next build all green; spec-verifier APPROVED (each color correct for its bg, no over-reach, no missed ledes). Specialists: frontend-developer (sweep) + spec-verifier (done gate). ~13 files + plan.md. Not committed.

## 2026-07-14 — Home StatsSection: widen the row divider (still inset)
`src/components/home/StatsSection.tsx:103` divider `left-10 right-10` → `left-4 right-4`
(inset 40px→16px each side): wider but not edge-to-edge. Verified live /home: divider now
1233px vs row 1265px (16px inset each side, fullBleed false; was 1185px). biome clean.
Not committed.

## 2026-07-14 — Home: add subtle top shadow to PortfolioSection (shadow-xs, flipped)
Added a top-directed shadow-xs to the Portfolio wrapper (`src/app/home/page.tsx:156`
portfolioRef): `shadow-[0_-1px_2px_0_rgb(0_0_0_/_0.05)]`. Note: Tailwind `shadow-xs` is a
DOWNWARD shadow (0 1px 2px rgb(0 0 0/.05)); used its exact values with -1px y-offset to put
it on top per the request. Verified live /home: wrapper boxShadow computes rgba(0,0,0,0.05)
0px -1px 2px 0px (top). biome clean. Very subtle by design (5% black, 2px) — bump if wanted.
Not committed.

## 2026-07-14 — Home: Portfolio top shadow xs → md
Bumped the Portfolio wrapper top shadow (`src/app/home/page.tsx:156` portfolioRef) from the
flipped shadow-xs to flipped shadow-md: `shadow-[0_-4px_6px_-1px_rgb(0_0_0_/_0.1),0_-2px_4px_-2px_rgb(0_0_0_/_0.1)]`
(Tailwind shadow-md's two layers with negative y-offsets for a top shadow). Verified live
/home: wrapper boxShadow computes rgba(0,0,0,0.1) 0px -4px 6px -1px + rgba(0,0,0,0.1) 0px
-2px 4px -2px (top, both layers). biome clean. Not committed.

## 2026-07-14 — Home StatsSection: bg gradient gray→white (L→R)
`src/components/home/StatsSection.tsx:88` bg `from-white to-[#efefef]` → `from-[#efefef]
to-white` (kept bg-linear-to-r). Now gray (left) → white (right). Verified live /home:
computed backgroundImage linear-gradient(to right, rgb(239,239,239) 0%, rgb(255,255,255)
100%). biome clean. Not committed.

## 2026-07-14 — Home: reduce BlogSection top spacing
`src/app/home/page.tsx:179` BlogSection wrapper `[&>section]:pt-16 md:[&>section]:pt-32`
→ `[&>section]:pt-6 md:[&>section]:pt-12` (top padding 64/128px → 24/48px). Verified live
/home @1280: section paddingTop now 48px (was 128px). biome clean. Not committed.

## 2026-07-14 — Home: nudge BlogSection top spacing back up a little
Follow-up: `src/app/home/page.tsx:179` BlogSection wrapper `pt-6 md:pt-12` →
`pt-8 md:pt-16` (top padding 24/48px → 32/64px). Verified live /home @1280: section
paddingTop 64px (was 48px). biome clean. Not committed.

## 2026-07-14 — Home: BlogSection top spacing a little more
Follow-up: `src/app/home/page.tsx:179` BlogSection wrapper `pt-8 md:pt-16` →
`pt-10 md:pt-20` (top padding 32/64px → 40/80px). Verified live /home @1280: section
paddingTop 80px (was 64px). biome clean. Not committed.

## 2026-07-14 — Footer: pack the two link lists closer + drop the divider
The wide gap came from the `grid-cols-2` (50/50) split and the line from col2's `border-l`.
`src/components/layout/Footer.tsx`: parent (line 63) `lg:gap-0` → `lg:flex lg:justify-start
lg:gap-16` so at lg the two lists become auto-width flex items packed left with a 64px gap
(base stays grid-cols-2 gap-10 for mobile). Col2 (line 78) dropped `lg:border-l
lg:border-white/10 lg:pl-10` (removes the line + its padding). Verified live /home @1280:
parent display flex, gap between lists 64px (was ~half-width), col2 borderLeft 0. biome
clean. Not committed.

## 2026-07-14 — Footer: nudge list gap up a little
Follow-up: `src/components/layout/Footer.tsx:63` `lg:gap-16` → `lg:gap-20` (64px → 80px
between the two link lists). Verified live /home @1280: gap 80px. biome clean. Not committed.

## 2026-07-14 — Footer: bottom legal lines + bigger wordmark
`src/components/layout/Footer.tsx`: (1) replaced the bottom legal row content with the
three requested lines — left `© Made By Softexedge`, right group `All Rights Reserved` +
`Privacy Policy (you really care?)` (anchor href="#"). Used "Softexedge" (site spelling)
for the prompt's "Sotexedge" typo. Dropped the old `© {year} Softexedge Ltd...` link +
`Made by Softexedge`. (2) Giant wordmark `text-[16.5vw]` → `text-[17vw]` (user tuned to 17
mid-task; kept). Verified live /home @1280: wordmark 217.6px, width 1111px within its 1113px
div (not clipped), no page h-scroll; all three legal lines present with exact text, privacy
href="#". tsc 0, biome clean. Not committed.

## 2026-07-14 — Footer: newsletter button uses the ExperimentalTestimonials arrow
Replaced the footer newsletter subscribe button's horizontal MdKeyboardArrowRight
double-slide with the ExperimentalTestimonials "Connect With Us" arrow: two MdArrowOutward
doing the diagonal swap (out top-right / in from bottom-left) with a brand-gradient fill on
the incoming one. `src/components/layout/Footer.tsx`: added MdArrowOutward to the
react-icons/md import; unique SVG gradient id `footer-arrow-grad` (both Footer + testimonials
render on /home, avoid collision). Social-link arrows left as-is (still MdKeyboardArrowRight).
Verified live /home: subscribe button has 2 diagonal arrows + gradient def, footer-arrow-grad
id count 1 (unique), testimonial-icon-grad still 1. tsc 0, biome clean. Hover motion needs
eyes. Not committed.

## 2026-07-14 — Footer: social icons also use the testimonial arrow
Applied the same diagonal MdArrowOutward swap (out top-right / gradient in from
bottom-left) to the 3 social-link chips (`src/components/layout/Footer.tsx`), replacing
their MdKeyboardArrowRight double-slide. Arrows reference the single shared
`footer-arrow-grad` gradient def (defined in the subscribe button above — no duplicate
id across the 3 socials). MdKeyboardArrowRight now unused → removed from the import.
Verified live /home: 3 socials, each with 2 diagonal arrows; footer-arrow-grad def count 1;
0 MdKeyboardArrowRight refs; tsc 0, biome clean. Hover motion needs eyes. Not committed.

## 2026-07-15 — Header services dropdown: use ServiceSection images
Mid-task the user restructured home ServiceSection to 8 items mirroring the Services dropdown 1:1 (same names/links). So the header dropdown images (page/Header + layout/Header) were set to ServiceSection's exact 8 images by name: Digital Marketing (1611926653458), AI & Marketing Automation (1683120966127), Web Development (1498050108023), App Development (1512941937669), Software Development (1685086785636), Brand Strategy and Identity (1611532736597), UI/UX Design (1545235617), Video Production (1542038784456). (First replaced page/Header with a stale 5-image ServiceSection set, then corrected both headers to the new 8 once the user's ServiceSection change surfaced.) Verified: all 8 IDs present once in each header, no stray images, tsc + biome clean, next build ✓. 2 files. Not committed. NOTE: header dropdown and ServiceSection now duplicate the same 8-item list — a shared data module would remove the sync burden (flagged, not done per minimal-diff).

## 2026-07-14 — Home: ContactSection overlaps Testimonials+Carousel group on scroll
Added a 3rd pin-overlap to `src/app/home/page.tsx`, mirroring About→Portfolio and
Stats→Service. New refs testimonialsGroupRef + contactContainerRef. JSX: wrapped
`<ExperimentalTestimonials/><TechLogoCarousel/>` in `<div ref={testimonialsGroupRef}
className="relative z-10 bg-white">` and `<ContactSection/>` in `<div ref={contactContainerRef}
className="relative z-30">`. GSAP: pin testimonialsGroupRef from start "bottom bottom" (pair
is taller than viewport → pin only after fully scrolled through) → endTrigger
contactContainerRef "top top", pinSpacing:false. Contact (z-30, bg-black) slides up over the
pinned white group (z-10); dark-over-light edge reads the overlap without a shadow (matches
recent de-shadowing). Verified live /home @1280: GSAP pin-spacer wraps the group, group z-10
holds 2 sections, contact wrapper z-30 > group (contactAboveGroup true); tsc 0, biome clean.
Desktop-only (md+ matchMedia); scroll feel needs user's eyes. Not committed.

## 2026-07-16 — ExperimentalTestimonials: rotating word smooth like AboutSection
The testimonials "Voices of the [word]" swap used a snappy 0.4s easeOut tween, small px
slide (x:40/-40) and mode="wait" (sequential, with a gap). Matched it to the AboutSection
rotating word: `src/components/home/ExperimentalTestimonials.tsx` — mode "wait" → "popLayout"
(overlapping enter/exit), initial/animate/exit x 40/-40 → "-100%"/"0%"/"100%" (full-width
slide, enter-left/exit-right like About), + opacity cross-fade, transition → the same
overdamped spring (stiffness 60/damping 20/mass 1). Kept the grid stack + gradient text.
Verified: tsc 0, biome clean; word spring now matches About (stiffness 60). Framer motion —
smoothness needs user's eyes. premiumEase still used elsewhere. Not committed.

## 2026-07-16 — Footer: round the email input so its focus ring matches
The footer email input carried `focus:ring-4 focus:ring-[#2E5BFF]/20` (user-added, from
ContactSection) but had no border-radius, so the focus ring (a box-shadow, which follows
the element's border-radius) rendered with square corners against the rounded form/button.
Added `rounded-lg` to the input (`src/components/layout/Footer.tsx:102`) → matches the
sibling subscribe button (both 10px). Verified live /home: input border-radius 10px =
button 10px (form is 14px/rounded-xl); ring now follows rounded corners. biome clean.
Not committed.

## 2026-07-15 — Home: shrink testimonials group as ContactSection overlaps it
On the home page, the Testimonials+LogoCarousel group (behind ContactSection) previously only pinned as Contact slid over it — no shrink, unlike the About→Portfolio overlap. Added the same scale-down: wrapped the group's content in a new testimonialsInnerRef div (origin-top will-change-transform) and added a scrubbed gsap.to(scale:0.85, y:40, ease none) over the pin range (testimonialsGroup bottom bottom → contactContainer top top). Desktop-only (inside the existing matchMedia min-width:768px). Now the sections behind ContactSection shrink like the About section does behind Portfolio. Verified: tsc + biome clean, next build ✓. Single file (src/app/home/page.tsx). Not committed.

## 2026-07-16 — Footer input: focus effect now matches ContactSection
Made the footer email input's focus effect identical to ContactSection's inputs.
`src/components/layout/Footer.tsx`: input gained `border border-transparent transition-all
focus:border-[#2E5BFF]/50 focus:bg-white/10` (kept rounded-lg + the existing focus:ring-4
focus:ring-[#2E5BFF]/20 focus:outline-none) — transparent base border stays clean in the
dark pill, glows blue on focus with bg lighten + ring, all smooth. Removed the form pill's
competing `focus-within:ring-1 focus-within:ring-white/20` so only the input's unified
effect shows (like ContactSection). Verified: the 5 effect classes (transition-all,
focus:border-[#2E5BFF]/50, focus:bg-white/10, focus:ring-4, focus:ring-[#2E5BFF]/20) are
byte-identical to ContactSection's inputClass; form focus-within ring gone; resting state
transparent border/bg; biome clean. NOTE: the browser pane doesn't apply :focus (activeElement
true but input.matches(':focus') false), so the focus visual can't be auto-observed — matches
ContactSection by construction, user's eyes confirm. Not committed.

## 2026-07-15 — Homepage: standardized eyebrow tag above every section title
Added the AboutSection eyebrow style (mb-6 text-sm uppercase tracking-[0.3em] text-zinc-500 font-medium) as a "tag" above each homepage section heading. ADDED to ServiceSection ("What We Offer"), ExperimentalTestimonials ("Testimonials"), BlogSection ("Latest Insights"); UNIFIED ContactSection's existing eyebrow (kept "Get in touch", restyled from text-white/60 to the standard). AboutSection = reference (untouched). Placed inside each section's heading motion wrapper (where present) so it animates with the title; text-zinc-500 kept on both light + dark sections per "same everywhere". SKIPPED PortfolioSection + StatsSection (their only h2 is a per-panel project title / per-card stat number — no section-level heading), and Hero + logo strips (bespoke/untitled). Specialists: frontend-developer (execute across sections) + spec-verifier (done gate, APPROVED — identical class string in all 4, correct placement, skips verified). Verified: tsc + biome + next build ✓. 4 files + plan.md. Not committed.

## 2026-07-16 — ServiceSection: stop the floating "View Services" follower leaking
Root cause: the custom cursor follower (portaled to body, position:fixed, z-9999) is
shown/hidden via GSAP on link/section hover, but SCROLLING never fires mouseleave — so
after hovering the section then scrolling away, it stays "active" and trails over other
sections on the next pointer move (worst on Safari). Fix (`src/components/home/ServiceSection.tsx`
moveCursor): on every window mousemove, if `!containerRef.current.contains(e.target)`,
force-hide the follower (gsap.to scale:0/autoAlpha:0, overwrite:"auto"). Since the follower
only visibly leaks while tracking a moving pointer, and every such move now runs the gate,
it can't trail onto other sections — covers the scroll-away case by construction. Verified:
tsc 0, biome clean (0 real findings). NOTE: could not runtime-verify in the pane — dispatched
synthetic MouseEvents don't trigger React onMouseEnter or a real e.target and the window
mousemove listener doesn't fire for them; Safari is Chromium-unavailable here. Logic is sound;
needs user's real cursor + Safari to confirm. Not committed.

## 2026-07-15 — PortfolioSection: add section tag
PortfolioSection has no section-level heading (full-screen horizontal-scroll showcase; its h2s are per-panel project titles). Added the standardized tag as a persistent corner label — absolutely positioned top-left on the <section> (left-8/top-8 → md:16 → lg:20/12, z-30, pointer-events-none) so it stays put while the track scrolls beneath it. Text "Selected Work"; standard tag style (text-sm uppercase tracking-[0.3em] text-zinc-500 font-medium) plus a [text-shadow:0_1px_10px_rgba(0,0,0,0.7)] for legibility over the full-bleed imagery. Verified: tag present with standard classes, tsc + biome clean, next build ✓. Single file. Not committed.

## 2026-07-15 — PortfolioSection: per-card tag above each title
Added a tag above the title in EVERY project card (panel), using the AboutSection standard style. Content = the project's existing `category` field (E-COMMERCE, ENTERPRISE, BRANDING, CAMPAIGN, AUTOMOTIVE) — previously unused. Classes: reveal-item text-sm font-medium uppercase tracking-[0.3em] text-zinc-500 (same on every card; sits over the panel's bottom black gradient for contrast; parent flex gap-4/md:gap-5 handles spacing). Added `reveal-item` so it staggers in with the title/description via the existing GSAP panel reveal. (Note: the earlier top-left "Selected Work" section tag was removed by the user; this per-card tag is the current requirement.) Verified: category tag present in the map with standard classes, tsc + biome clean, next build ✓. Single file. Not committed.

## 2026-07-15 — ServiceSection: smaller "Our Services" title
Reduced the section heading "Our Services" from text-5xl/md:text-8xl to text-4xl/md:text-6xl. Class-only; tsc + biome clean. (Interpreted "title of services" as the section heading, not the large per-item service names.) Not committed.

## 2026-07-15 — Revert ServiceSection title size
Reverted the "Our Services" heading back to its original size (text-4xl/md:text-6xl → text-5xl/md:text-8xl). Class-only; tsc + biome clean. Not committed.

## 2026-07-15 — ServiceSection: smaller per-item service titles
Reduced the {service.title} h3 size (the big service names) from text-4xl/sm:text-6xl/md:text-[clamp(3rem,6vw,7rem)] to text-3xl/sm:text-5xl/md:text-[clamp(2.5rem,5vw,5.5rem)]. Class-only; tsc + biome clean. Not committed.

## 2026-07-16 — BlogSection: hover grows image + slides info inside the card
Restructured the blog card `<article>` (`src/components/home/BlogSection.tsx`) so desktop
hover (md:group-hover:, gated so mobile stays static) grows the image and tucks the info
over it: image container `aspect-square` → `md:group-hover:aspect-[3/4]` with
transition-[aspect-ratio] (image also scale-105); a bottom→top black scrim fades in on
hover for legibility; the info block (now z-10, mt-4) pulls up `md:group-hover:-mt-24` so it
overlaps the taller image, with author/title text switching to white on hover
(transition-colors). `group` added to article. Verified live /home @1280 by applying the
hover states inline: rest = info below image; hover = image 320px→427px (grew), info
overlaps image by 96px at z-10 over the scrim. tsc 0, biome clean. Final visual polish
(scrim depth, overlap amount) needs user's eyes. Not committed.

## 2026-07-15 — AboutSection rotating word: sequential slide (exit then enter)
Changed the RotatingWord swap from overlapping (AnimatePresence mode="popLayout", exit+enter cross-fade) to SEQUENTIAL (mode="wait"): the current word slides out to the right and disappears first, then the next word slides in from the left. Gave the exit its own quick tween (duration 0.35, easeIn) so it vanishes promptly instead of a lingering spring; enter keeps the smooth spring. Class/prop-only; tsc + biome clean. Not committed.

## 2026-07-16 — BlogSection hover: move the info up a little more
Follow-up: `src/components/home/BlogSection.tsx` info block `md:group-hover:-mt-24` →
`md:group-hover:-mt-28` (−6rem → −7rem). Verified live /home @1280 (hover states applied
inline): info now overlaps the grown image by 112px (was 96px). biome clean. Not committed.

## 2026-07-16 — BlogSection hover: info up another step
Re-submitted follow-up: info block `md:group-hover:-mt-28` → `md:group-hover:-mt-32`
(`src/components/home/BlogSection.tsx:161`). Verified live /home @1280 (hover states
inline): info now overlaps the grown image by 128px (was 112px). biome clean. Not committed.

## 2026-07-16 — BlogSection: fix hover card cut at the bottom
User screenshot showed the hovered card clipped at the bottom mid-hover (image grown,
info not yet pulled up — that transient state makes the card ~107px taller; browsers that
don't animate aspect-ratio apply the growth instantly, so the state is clearly visible).
Root cause: the marquee container (`div.relative.w-full.overflow-hidden`, BlogSection)
clipped VERTICALLY too, though it only needs horizontal clipping for the infinite track.
Fix: `overflow-hidden` → `overflow-x-clip` (y stays visible). Verified live /home @1280 in
the worst-case mid-hover state applied inline: container computes overflow clip/visible;
card bottom 13893 vs section bottom 14021 (md:pb-32 buffer absorbs it) → noBottomCut true.
tsc 0, biome clean. (Also: /home was failing to compile from a stale dev-server error in
ExperimentalTestimonials — file on disk was already valid; recompile cleared it.)
Not committed.

## 2026-07-15 — PortfolioSection: stronger top shadow
Increased the top shadow on the Portfolio wrapper in src/app/home/page.tsx a little: shadow-[0_-4px_6px_-1px_rgb(0_0_0_/_0.1),0_-2px_4px_-2px_rgb(0_0_0_/_0.1)] → shadow-[0_-8px_16px_-2px_rgb(0_0_0_/_0.18),0_-4px_8px_-4px_rgb(0_0_0_/_0.15)] (larger offset/blur + slightly higher opacity). Class-only; tsc + biome clean. Not committed.

## 2026-07-16 — BlogSection: cards clickable AND draggable
Cards were plain <article>s with no link. (1) Added real hrefs to the home blogPosts —
card 1 → /blog/google-io-2026, cards 2-4 → /blog/rise-at-seven-expansion (matched by title
to data/blog.ts slugs) — and wrapped each card in <Link href draggable={false} class="block
h-full">. (2) Drag-vs-click: reworked the marquee handlers — pointer capture is now
DEFERRED until movement passes a 6px threshold (was captured on press, which would eat
clicks); a clean press+release reaches the Link as a normal click; a real drag captures,
pans, and suppresses the trailing click via onClickCapture on the track (isPanning ref
reset there). Mobile untouched (handlers early-return; Links native). Verified live /home:
8 card anchors (4×2 copies) with the two real slugs; clicking card 1 navigated to
/blog/google-io-2026 (article page rendered). Drag pan + click-suppression logic verified
by construction (synthetic pointer events can't drive it in the pane) — user's mouse
confirms. biome format applied; tsc 0. Not committed.

## 2026-07-15 — ExperimentalTestimonials rotating word: slower + smoother
The headline word cycled every 2.5s while the exit tween (0.35s) + spring entrance (~2s settle) meant it was perpetually mid-animation — reading as "too fast" and laggy. Slowed the cycle 2500 → 4500ms (matches AboutSection cadence, gives the spring time to settle and rest between swaps) and added will-change-transform to the sliding span for GPU compositing. tsc + biome clean. Not committed.

## 2026-07-15 — ExperimentalTestimonials rotating word: slower + smoother v2
The 4.5s cycle alone wasn't enough — the slide itself still read fast/laggy because the entrance spring (stiffness 60) launches fast then crawls. Replaced both legs with deterministic tweens: entrance duration 0.9 on premiumEase [0.16,1,0.3,1], exit duration 0.5 on exitEase [0.32,0,0.67,0]. Sequential mode="wait" + will-change-transform kept. tsc + biome clean. Not committed.

## 2026-07-16 — Reduce gap: ExperimentalTestimonials → TechLogoCarousel
`src/components/home/ExperimentalTestimonials.tsx:80` section `py-16` → `pt-16 pb-8`
(bottom 64px → 32px; top + md:pt-32 unchanged). Gap to TechLogoCarousel (its pt-16=64px,
user-set) now 96px total, was 128px. Applies on every page that stacks the pair.
Verified live /home @1280: testimonials pb 32px + carousel pt 64px = 96. biome clean.
Not committed.

## 2026-07-15 — Footer: staggered letter reveal on the giant "Softexedge"
Task: add animation on the "Softexedge" text in the footer — the giant brand name
(`src/components/layout/Footer.tsx`, the 17vw h1), not the newsletter heading or
copyright line. Replaced the whole-block fade+rise (opacity/y-20) with a per-letter
clip reveal: module-level `brandLetters` (pre-keyed `{char,id}` array — avoids the
noArrayIndexKey lint), `brandContainer`/`brandLetter` Variants (staggerChildren 0.045;
letters rise y:110%→0 over 0.9s with the h1's existing [0.22,1,0.36,1] ease). Each
letter sits in an `overflow-hidden` span with `pb-[0.12em] -mb-[0.12em]` so descenders
(f/g) aren't clipped while the tight leading-[0.85] metrics stay unchanged. Kept
viewport `{once:true, amount:0.5}`, drop-shadow, aria-label on h1 + aria-hidden letters
(screen readers read one word, not 10 fragments). `type Variants` import added for the
ease tuple. 1 file. tsc clean, next build ✓; biome findings in file are pre-existing
(unused Particles import, catch var, href="#", socialLinks index key) — untouched.
Live motion pending user. Not committed.

## 2026-07-15 — Footer brand "g" descender clipped — deepen letter-clip allowance
User screenshot: both g descenders in the giant "Softexedge" sheared at the bottom. Cause:
yesterday's per-letter reveal wraps each letter in an overflow-hidden span; with
leading-[0.85] the 185px line box (at 217.6px font) is far shallower than the glyphs, and
the g overflows 42.5px below the content box — the 0.12em (26.1px) pb allowance left
~16px clipped. Fix: `pb-[0.12em] -mb-[0.12em]` → `pb-[0.3em] -mb-[0.3em]` in
`src/components/layout/Footer.tsx`. Verified GEOMETRICALLY on the live dev server
(localhost:3000, user's own instance; browser screenshot times out in this env per memory):
canvas TextMetrics for Satoshi 500 @217.6px → fontAscent 220 / descent 52 / g actual
descent 51; overflow below content box 42.5px vs new 65.3px padding = +22.8px clearance.
Em-based, so scales to all viewports; ascenders sit ≥11px inside the box (no top clip).
biome format clean. Not committed.

## 2026-07-15 — Home ServiceSection: cap service.title below 90px
Task: reduce {service.title} size, keep under 90px. `src/components/home/ServiceSection.tsx:200`
h3 `md:text-[clamp(2.5rem,5vw,5.5rem)]` → `md:text-[clamp(2.5rem,5vw,5rem)]` — cap 88px → 80px
(reached at ≥1600px viewport; below that 5vw governs, e.g. 64px @1280, unchanged; mobile
text-3xl/sm:text-5xl untouched). Note: old cap 5.5rem=88px was technically <90 already at the
16px root (verified live, no root font-size override) — took intent as "comfortably below 90".
Verified live on user's dev server via HMR: computed 80px @1920px viewport (was 88). Class-only
change. Not committed.

## 2026-07-15 — Home: strip trailing full stops from all titles & descriptions
Task: remove the full stop from every homepage title and description. Removed TRAILING
periods in 6 files / 11 strings: ContactSection rotatingWords ×4 ("the future." etc) +
description "…ready to collaborate."; BlogSection rotatingWords ×4 ("Perspectives." etc);
AboutSection description "…unforgettable."; ServiceSection header description "…elevate
your brand."; ExperimentalTestimonials description "…every day."; PortfolioSection all 5
project descriptions. INTERIOR sentence periods in multi-sentence descriptions kept
(Contact, Testimonials, 3 Portfolio descs — removing them would create run-ons); user can
ask for full rewording if truly none wanted. Testimonial quotes untouched (quotes, not
titles/descriptions). Hero/About-h1/Stats/Service-titles/Blog-post-titles had none.
Verified live on dev server (HMR): DOM sweep of all main h1/h2/h3/p on /home → 0 of 77
end with ".". biome format clean (0 diffs). String-literal-only change. Not committed.

## 2026-07-15 — Home: give ServiceSection the same top shadow as PortfolioSection
Task: add PortfolioSection's top shadow to ServiceSection. Portfolio's shadow lives on its
wrapper in `src/app/home/page.tsx` (portfolioRef div):
`shadow-[0_-8px_16px_-2px_rgb(0_0_0_/_0.18),0_-4px_8px_-4px_rgb(0_0_0_/_0.15)]` — note this
is the user's NEW subtle shadow (page.tsx was externally edited since 2026-07-14; that older
entry removed the big 0_-50px_80px/0.5 shadow from the service wrapper — this re-adds a
DIFFERENT, much subtler one, matching Portfolio). Added the identical classes to the
serviceContainerRef wrapper div (same overlap pattern: Service slides over pinned Stats as
Portfolio slides over About). Verified live on dev server via HMR: computed boxShadow of both
wrappers byte-identical (match:true). Class-only, 1 file. Not committed.

## 2026-07-15 — Home: give ContactSection the same top shadow as PortfolioSection
Task: add PortfolioSection's top shadow to ContactSection on the homepage. Since the last
task the user added a contact overlap pin in `src/app/home/page.tsx` (testimonials+carousel
group pins; ContactSection slides over via `contactContainerRef`, z-30) — exact analog of
the Portfolio/Service wrappers. Added the identical
`shadow-[0_-8px_16px_-2px_rgb(0_0_0_/_0.18),0_-4px_8px_-4px_rgb(0_0_0_/_0.15)]` to the
contactContainerRef div. Verified live on dev server via HMR: computed boxShadow of contact
wrapper === portfolio wrapper (match:true). Class-only, 1 file. Not committed.

## 2026-07-15 — Home: strengthen ContactSection top shadow a bit
Follow-up to the previous entry: bump the contactContainerRef shadow above Portfolio's
baseline — `0_-8px_16px_-2px/0.18, 0_-4px_8px_-4px/0.15` →
`0_-12px_24px_-2px/0.24, 0_-6px_12px_-4px/0.2` (~50% more reach/blur, opacity +0.06/+0.05).
Contact wrapper only; Portfolio/Service shadows unchanged. Verified live via HMR: computed
boxShadow shows the new values. Class-only, 1 file (`src/app/home/page.tsx`). Not committed.

## 2026-07-15 — ServiceSection: stop the "View Services" cursor pill leaking outside the section
Task: the View Services follower pill leaks outside ServiceSection. Mechanism: the pill is a
`fixed` body-portaled div; showing/hiding is driven by mouseenter/mouseleave + a mousemove
guard. Scrolling with a STATIONARY mouse fires none of those, so after the section scrolls
away the pill keeps floating over other sections (primary navigation here is Lenis wheel
scroll, so this is common). Fix in `src/components/home/ServiceSection.tsx`: track last
pointer coords in moveCursor; add a `gsap.ticker` guard (`guardTick`) that, ONLY while the
pill is visible (inline opacity check), tests the pointer against the section's
getBoundingClientRect and force-hides (shared `hideCursor`, overwrite:auto) when outside.
Ticker chosen over a window scroll listener deliberately: pinned sections move content via
transforms without scroll events, and Lenis owns the scroll. Cleanup removes the ticker fn.
VERIFICATION LIMIT (documented for future sessions): the Browser pane's renderer freezes
rAF/compositor tasks — GSAP tweens never render a frame, synthetic scroll produces no
events, screenshots time out — so animation behavior CANNOT be behaviorally verified in
this environment; the frozen initial gsap.set transform did confirm the new code was live
and attached. tsc clean, biome format clean (normalized). Awaiting user's manual browser
check. Not committed.

## 2026-07-16 — About hero title sized like Career hero title
Both heroes already shared `sm:text-6xl md:text-7xl lg:text-[6rem]`; only the mobile base
differed (about `text-[3rem]` vs career `text-[2.75rem]`). Changed both about title
elements (`src/components/about/AboutHeroSection.tsx` h1 + gradient span) to
`text-[2.75rem]` — size ladders now byte-identical to CareerHeroSection at every
breakpoint (only text color classes differ). Live check at lg: about title computes 96px
(=lg:text-[6rem], same as career); sub-sm can't be observed in the pane (viewport resize
doesn't apply), equality holds by identical classes. biome clean. Not committed.

## 2026-07-16 — About: AboutTraditional top padding mirrors hero's pb-25
User added `md:pb-25` (+ pb-16 mobile) to AboutHeroSection; wanted the same as
AboutTraditional's TOP padding. Gotcha: AboutTraditional's own section padding is
OVERRIDDEN by the about page wrapper (`[&>section]:pt-24 md:[&>section]:pt-32`, higher
specificity) — editing the component had no effect (computed 128px). Real fix in
`src/app/about/page.tsx:18`: wrapper `[&>section]:pt-24 → pt-16`, `md:[&>section]:pt-32 →
md:pt-25` (matching the hero's pb-16/md:pb-25); reverted the no-op component edit
(AboutTraditional back to `py-12 md:py-20`). Verified live /about @md: hero pb 100px ==
traditional pt 100px (match true). biome: no new findings. Not committed.

## 2026-07-16 — Revert: AboutTraditional top-padding match
Reverted the previous task: `src/app/about/page.tsx:18` wrapper restored to
`[&>section]:pt-24 [&>section]:pb-16 md:[&>section]:pt-32 md:[&>section]:pb-24`.
(AboutTraditional.tsx was already back at its original `py-12 md:py-20` — the component
edit had been reverted during the task itself as a no-op.) The hero's own pb-16/md:pb-25
(user's change) untouched. Verified live /about: AboutTraditional paddingTop back to
128px (md:pt-32 original). Not committed.

## 2026-07-16 — Career page: adopt the about page's section y-spacing system
About's spacing lives in page-level wrapper divs (`[&>section]:pt/pb`, which out-specify
each section's own padding); career had none (ad-hoc internal paddings). Wrapped all five
career sections in `src/app/career/page.tsx` with about's rhythm, mapped positionally:
WhyJoinUs ← AboutTraditional slot (pt-24 pb-16 md:pt-45 md:pb-24); OpenPositions ←
OurValues slot (py-16 md:pt-24 md:pb-35); PerksSection ← CTA/FAQ generic slot (py-16
md:pb-24 md:pt-16); OurTeamSection ← its exact about wrapper (py-16 md:pb-24 md:pt-30,
same shared component); ApplicationJourney ← Blog slot (py-16 md:py-24). Footer wrapper
`md:pt-2` → about's `md:pt-24`. Verified live /career @1265: computed pt/pb per section =
180/96, 96/140, 64/96, 120/96, 96/96 — all matching about's wrapper values. tsc 0, biome
0 new findings. Sections' internal paddings are now overridden by wrappers (same
mechanism as about). Not committed.

## 2026-07-16 — FaqSection: tag above the title (BlogSection style)
Added a "FAQs" tag above the "Let's Clear Things Up" title in BOTH FaqSection copies
(`src/components/brand-strategy/FaqSection.tsx` + `src/components/web-development/FaqSection.tsx`,
per the SubServices precedent for unqualified component names), copied verbatim from the
BlogSection "Latest Insights" tag: `mb-6 text-sm uppercase tracking-[0.3em] text-zinc-500
font-medium`, placed inside the existing whileInView motion.div so it reveals with the
title. Verified live /brand-strategy: <p>FAQs</p> directly above the h2, computes 14px /
uppercase / 4.2px spacing / zinc-500 / 24px mb — identical to BlogSection's tag. biome: no
new findings. Not committed.

## 2026-07-16 — PerksSection cards redesigned on ChannelCard pattern
Rebuilt the six perk cards (`src/components/career/PerksSection.tsx`) as replicas of
ContactSection's ChannelCard, colors/pattern verbatim: card `rounded-[2rem] border-white/10
bg-zinc-950/20` (min-h 280/320px); masked boxy-grid background — 80 cells #161616, gap-2,
w-[110%] -left-[5%] -translate-y-6, cells brighten near the hovered cell (22+14*intensity),
revealed by the mouse-following 280px radial mask (rgba floor 0.15), parked at 85% width
when idle (double-rAF + ResizeObserver, same code as ChannelCard); content layer
pointer-events-none justify-between: zinc-900 icon chip (text-zinc-400 →
group-hover:text-white) top, white bold title + zinc-500 description bottom. GRID_COLUMNS=4
(cell size ≈ contact's for perk-card width). Kept: header, perks data, whileInView stagger
entrances, reduced-motion guards. Dropped: gradient icon chips + hover-lift card style.
Verified live /career @1280: 6 cards, radius 32px, zinc-950/20 bg, white/10 border, 80
cells, zinc-900 chip, white/zinc-500 text, 280px mask template present (parked pos needs
real rAF — pane limitation, same as original ChannelCard). tsc 0, biome clean. Mouse
reveal/glow needs user's eyes. Not committed.

## 2026-07-16 — Home hero: taller canvas pill between the title words
`src/components/home/Herosection.tsx:78` — the canvas container between "Digital" and
"Solutions": heights bumped one step per breakpoint, widths unchanged — h-8→h-10,
sm:h-12→sm:h-14, md:68→80px, lg:90→106px, xl:100→118px. Verified live /home @xl: pill
computes 220×118 (was 220×100); canvas fills the content box (116px inside the 1px
border). biome clean. Not committed.

## 2026-07-16 — Content: Services dropdown refreshed from the 8-service taxonomy
User supplied the full 8-service + sub-services taxonomy. Updated BOTH headers'
dropdownItems (page/Header.tsx + layout/Header.tsx) and the mirroring home
ServiceSection titles: "Digital Marketing" → "Digital Marketing & Growth",
"Software Development" → "Custom Software & SaaS" (matches ERP/internal-tools/SaaS
sub-scope), "Brand Strategy and Identity" → "Brand Strategy & Identity"; other 5 names
kept (already tight). All counts "/1 services" → "/4 services" (accurate; note: count is
declared in NavItem but NOT rendered by either resizable-navbar — data-correct for when
the design shows it). Sub-services can't display in the current dropdown (name+image
only) — they belong on the future per-service pages. Verified live /home: mounted
dropdown lists the 8 new names; ServiceSection rows identical. tsc 0, biome clean.
Not committed.

## 2026-07-16 — PortfolioSection: optically align title with tag/description
User screenshot: panel titles ("Lumina Festival") looked indented ~8px right of the tag/
description. All blocks were structurally left-aligned — the offset is the huge glyphs'
LEFT SIDE BEARING (canvas-measured: L/F/N ≈ 8px at 112px; tag = 0). Fix: em-based optical
nudge on the title h2 (`src/components/home/PortfolioSection.tsx`): `-ml-[0.05em]` —
scales with font size across breakpoints (−5.6px at 7rem, ~−2.4px at text-5xl). Verified
live @1280: title marginLeft −5.6px; title ink ≈ x82 vs tag/desc x80 (≤2px, was 8px).
Tradeoff: low-bearing first letters (A in "Aura") may sit ~3-4px left of the tag —
far less visible than the original offset; dial is the 0.05em value. biome: no new
findings. Not committed.

## 2026-07-16 — Home StatsSection: bg gradient white → gray
User read the previous `from-[#efefef] to-white` bg as plain white (too subtle) and asked
for white→gray. `src/components/home/StatsSection.tsx:88`: → `bg-linear-to-r from-white
to-[#e5e5e5]` (flipped stops + slightly deeper gray so the ramp is visible). Verified live
/home: computed linear-gradient(to right, rgb(255,255,255) 0%, rgb(229,229,229) 100%).
biome clean. Not committed.

## 2026-07-16 — Home StatsSection: darker gradient gray
Follow-up: gradient end `to-[#e5e5e5]` → `to-[#d4d4d4]` (neutral-300)
(`src/components/home/StatsSection.tsx:88`). Verified live /home: computed
linear-gradient(to right, rgb(255,255,255) 0%, rgb(212,212,212) 100%). biome clean.
Not committed.

## 2026-07-16 — Home ServiceSection: gradient on the word "Services"
Wrapped "Services" in the heading (`src/components/home/ServiceSection.tsx:192`) in the
standard brand gradient span (`bg-linear-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text
text-transparent`) — same pattern as every other gradient headline word on the site.
Verified live /home: span computes linear-gradient(to right, rgb(46,91,255),
rgb(20,156,203)), clip text, transparent color. biome: no new findings. Not committed.

## 2026-07-16 — Rotating words: Testimonials/Contact/Blog exactly match AboutSection
Per explicit request, replicated AboutSection's rotating-word mechanics verbatim into the
other three homepage rotators: mode="wait"; enter from left `x:"-100%"→"0%"` + fade on the
overdamped spring (stiffness 60/damping 20/mass 1); exit right `x:"100%"` + fade on a quick
0.35s easeIn tween. Files: home/ExperimentalTestimonials.tsx (NOTE: this supersedes the
user's recent 0.9s premiumEase tween tuning there — "exactly like AboutSection" is the
newer instruction), home/ContactSection.tsx (was x:±40 0.4s easeOut), home/BlogSection.tsx
(was y:±30 0.6s easeOut → now horizontal like About). Each section keeps its own gradient
text classes. Verified: all four files grep-identical on spring 60 + 0.35 easeIn exit +
mode="wait"; tsc 0; the one biome finding (unused GRID_COLUMNS in ContactSection) is
pre-existing. Motion can't play in the pane — identical configs = identical animation by
construction; user's eyes confirm. Not committed.

## 2026-07-16 — Slow the rotating words in Testimonials/Contact/Blog
Follow-up to the exact-About sync: slowed the three (About itself untouched at 60/0.35).
Enter spring stiffness 60 → 30 (~1.4x slower glide, same overdamped character; damping 20
mass 1 kept) and exit tween 0.35s → 0.55s easeIn, identical across
home/ExperimentalTestimonials.tsx, home/ContactSection.tsx, home/BlogSection.tsx.
Verified: grep — About 60/0.35, the three 30/0.55; tsc 0; diffs line-scoped (no CRLF
churn); biome no new findings. Feel needs eyes. Not committed.

## 2026-07-16 — Home hero: more line spacing in the main title
`src/components/home/Herosection.tsx:68` — title column ("We Engineer" / "Digital
[canvas] Solutions") `gap-2` → `gap-4` (8px → 16px between lines; the "crafted for
impact" subtitle keeps its own mt-5). Verified live /home: row gap computes 16px,
measured visual gap between the two title lines 16px (was 8). biome clean. Not committed.

## 2026-07-16 — Testimonials rotating word: edge fades on enter/exit
The sliding word was hard-clipped at the container edges. Added a horizontal gradient
mask to the rotating-word container (`src/components/home/ExperimentalTestimonials.tsx`):
`px-6 -mx-6` (24px fade band each side, negative margins cancel the layout shift — same
trick as AboutSection's px-2/-mx-2 wrapper) +
`[mask-image:linear-gradient(to_right,transparent_0,black_24px,black_calc(100%-24px),transparent_100%)]`.
Entering/exiting text now dissolves at the edges; the resting word sits exactly 24px
inside each edge → fully opaque (verified live: mask computed, insets 24/24,
restingWordFullyOpaque true, margins -24 cancel padding). biome clean. Motion feel needs
eyes. Not committed.

## 2026-07-16 — Testimonials rotating word: slower, smoother exit
The exit was a 0.55s easeIn tween — accelerating away, reading as a dart next to the slow
spring entrance. `src/components/home/ExperimentalTestimonials.tsx` exit transition →
`duration: 1.1, ease: "easeInOut"` (glides out through the new edge fade). Enter spring
(30/20/1) untouched; testimonials-only (Contact/Blog keep 0.55 easeIn until told
otherwise). Verified: config in source, page compiles, biome clean. Feel needs eyes.
Not committed.

## 2026-07-16 — All rotating words match ExperimentalTestimonials (motion + edge fade)
Testimonials is now the reference; replicated its full rotating-word recipe into
About/Contact/Blog: enter spring 30/20/1 (+fade, x -100%→0), exit x 100% via
`duration: 1.1, ease: "easeInOut"` glide, mode="wait", AND the 24px edge-fade mask
(`px-6 -mx-6` + mask-image gradient, no layout shift). Per-file: ContactSection +
BlogSection got exit 0.55 easeIn → 1.1 easeInOut + mask on their inline-grid containers;
AboutSection got spring 60→30 (NOTE: supersedes its word↔card-stack spring sync — the
cards still run 60; comment updated), exit 0.35→1.1 easeInOut, and the mask on both
RotatingWord wrapper branches (px-2/-mx-2 → px-6/-mx-6). Verified: grep — all four files
spring 30 + 1.1 easeInOut + mask present; live /home — exactly 4 masked containers, one
in each section; tsc 0; biome no new findings. Feel needs eyes. Not committed.

## 2026-07-16 — About page: section tags match ExperimentalTestimonials
Unified the about page's section eyebrows to the Testimonials tag recipe (`text-sm
font-medium uppercase tracking-[0.3em] text-zinc-500`): AboutTraditional "Who We Are"
(was text-xs font-bold white/60 — note: zinc-500 on its black bg, per explicit request),
OurValuesSection "Our Culture" (was text-xs font-bold #2E5BFF), OurTeamSection "The Minds
Behind the Craft" (font-semibold → font-medium; size/color already matched). Skipped:
AboutHeroSection (no eyebrow above its title; the matched selector was a stat label) and
FAQ/Blog/Testimonials tags (already on the recipe). Verified live /about: all three
compute 14px/500/uppercase/4.2px/lab(47.88…) — matchesRef true vs the live Testimonials
tag. biome no new findings. Not committed.

## 2026-07-15 — Home: header invisible from StatsSection onward — stacking-context trap
Task: the (fixed, scroll-reactive) home header stops appearing after StatsSection. Root
cause: `layout/Header`'s AceternityNavbar is `fixed z-[100]`, but Herosection nested
`<Header />` inside its `absolute z-20` content overlay — a positioned+z-indexed ancestor
creates a stacking context, so the navbar's z-[100] only counted WITHIN that z-20 context.
page.tsx's post-Stats wrapper (`relative z-20 md:-mt-[100vh]`) is a LATER sibling context
with equal z → paints over the navbar from Stats onward (About z-0 / Portfolio z-10 lose to
20, which is why the header worked before Stats). Fix (`src/components/home/Herosection.tsx`):
moved `<Header />` out of the z-20 overlay to a direct child of the hero root (which has no
z-index → navbar joins the ROOT stacking context and z-[100] wins site-wide). Side effect:
hero heading recenters up ~20px (Header h≈0 + gap-10 left the flex group; arguably more
correct). Verified statically on live dev server: navbar ancestor walk finds NO positioned+
z-indexed ancestor (was the z-20 overlay), navbar fixed/z-100/visible. Hit-testing
(elementsFromPoint) returned empty arrays — frozen-renderer artifact (see memory), not a
fix failure; painting order from here is deterministic CSS. tsc clean, biome format clean.
User to confirm visually. Not committed.

## 2026-07-16 — CtaSection bg animation matches blog hero
Blog hero runs `<SpotlightGrid speed={4} maskRadius={950} travel={0.35} />` (user added
maskRadius/travel props to SpotlightGrid); CtaSection copies ran bare defaults (speed 1,
600px, travel 0.9). Matched BOTH copies (brand-strategy/CtaSection.tsx:27 +
web-development/CtaSection.tsx:27) to the blog hero's exact props — affects the CTA on
every page using it. Verified: tsc 0 (props exist: defaults 600/0.9 at SpotlightGrid.tsx
30/33); live /brand-strategy CTA mask computes radial-gradient(950px …) vs default 600px.
Motion pace needs eyes (pane can't play rAF). biome no new findings. Not committed.

## 2026-07-17 — About Quote Card → 3-quote carousel
OurValuesSection.tsx: static quote card is now a carousel — outer shell (mt-12 rounded-3xl
border-white/[0.06] bg-[#100f0f] p-8 md:p-10) byte-identical/static; inner content (quote +
avatar/name/role + Connect CTA) keyed by quoteIndex inside AnimatePresence mode="wait"
(x 32→0 in, 0→-32 out, 0.5s premiumEase). 3 quotes: Sidhartha Parasramka/CEO (ceo.jpeg),
Priya Sharma/Creative Director, Arjun Mehta/Head of Engineering (randomuser.me portraits —
i.pravatar.cc is NOT in next.config remotePatterns, would crash next/image). Auto-advance
6s; gradient-pill dots (active w-6 brand gradient) click-select and re-arm the timer
(biome-ignore on useExhaustiveDependencies — intentional). Verified live /about: shell
classes unchanged, 3 dots render, active dot auto-advanced 0→2 (interval + re-render work);
content swap is framer-driven so pane can't play it — needs eyes. tsc 0, biome clean. Not committed.

## 2026-07-15 — FaqSection: match x-gutter to ExperimentalTestimonials (px-4 md:px-10)
Task: make FaqSection's x-axis padding equal ExperimentalTestimonials'. Standard (its
container, ExperimentalTestimonials.tsx:81): `px-4 md:px-10`. FaqSection exists twice
(brand-strategy + its web-development mirror), identical `px-6 md:px-6` section gutter —
changed BOTH to `px-4 md:px-10` (same both-mirrors precedent as the header dropdown task).
Inner accordion-item padding (px-6 md:px-10 on rows/answers) untouched — that's card-internal,
not the section gutter. Verified live on /web-development: FAQ section computes 16px (px-4)
— pane viewport reported innerWidth 0 (degenerate, see memory) so only the sub-md branch was
measurable; md branch matches by construction (verbatim same classes as the standard).
Class-only, 2 files. Not committed.

## 2026-07-17 — OurValuesSection left image → plain rounded-xl rectangle
Removed the asymmetric clip-path (`inset(0 round 5rem 1.5rem 5rem 1.5rem)`) from the CEO
image wrapper and added `rounded-xl` to its class list; container sizing/overflow untouched.
Verified live /about: wrapper computes clip-path none, border-radius 14px (rounded-xl under
this theme). tsc 0, biome clean. Not committed.

## 2026-07-15 — Footer: "Softexedge" word animation (cinematic rise + ocean wave)
Upgraded the giant footer brand word. Restructured from variant-propagated letters to per-letter explicit animations (avoids variants/infinite-loop conflicts): (1) entrance — each letter rises out of its own clip (y 115%→0, duration 1.1, premium ease, delay i*0.06 stagger, whileInView once); (2) NEW continuous ocean-wave undulation — outer per-letter motion.span loops y [0,-4.5%,0,2%,0] over 3.6s, easeInOut, repeat Infinity, phase delay 1.4+i*0.14 so a smooth wave travels across the word after the entrance settles. Wave wraps the clip span (never clips); transform-only + will-change-transform (GPU); useReducedMotion guards both (static word under reduced motion). Removed now-unused brandContainer/brandLetter variants + Variants import. Verified: tsc + biome clean, next build ✓. Single file. Not committed.

## 2026-07-15 — Career page: align y-axis rhythm with about/home
Task: analyze about + home y-spacing, apply to career. Analysis: both reference pages share
(a) mobile backbone py-16, (b) post-hero pt-24 md:pt-45, (c) equalized boundaries
pb(prev)=pt(next) with 24 as the dominant md unit, (d) footer joins at pt-24. Career already
matched (a)(b)(d) and most boundaries, but two md boundaries were asymmetric:
OpenPositions→Perks (pb-35 vs pt-16) and Perks→OurTeam (pb-24 vs pt-30). Fix in
`src/app/career/page.tsx` (3 md values): OpenPositions pb-35→pb-24, Perks pt-16→pt-24,
OurTeam pt-30→pt-24. Result: every career md boundary = 24/24 (uniform 192px), mobile 16/16,
hero pt-45 kept. Verified via SSR HTML (curl /career, entity-encoded class extraction — the
pane viewport is degenerate, see memory): all 5 wrappers serve the new values. tsc clean.
Not committed.

## 2026-07-15 — Header CTA: light gray border on about + career pages
Added a route-scoped light gray border to the "Get in Touch" button in page/Header: when pathname starts with /about or /career, the DynamicButton className gains "border border-gray-300 hover:border-none" (border disappears on hover as the gradient fills, matching the pre-removal style). Other pages using page/Header (work, brand-strategy, contact, blog…) and layout/Header (home) unchanged. Verified: tsc + biome clean, next build ✓. Single file. Not committed.

## 2026-07-15 — Career page: unify eyebrow "tag above title" with home/about standard
Task: analyze home+about eyebrow tags, apply same font/weight/color/size to every career
section. Standard (dominant across AboutSection, BlogSection, ContactSection,
ExperimentalTestimonials, ServiceSection, AboutTraditional — including black sections):
`text-sm font-medium uppercase tracking-[0.3em] text-zinc-500`. Career had 4 divergent
eyebrows (`text-xs font-semibold tracking-[0.25em]` + text-white/60 ×3 / text-zinc-400 ×1):
WhyJoinUs:119, OpenPositions:130, PerksSection:206, ApplicationJourney:60 — all changed to
the standard (kept mb-*/inline-flex/gap-2 layout). CareerHeroSection has no tag;
OurTeamSection (shared with about) already standard. Verified via SSR HTML: /career serves
5 standard eyebrows, 0 old-pattern remnants. tsc clean. Class-only, 4 files. Not committed.

## 2026-07-17 — PerksSection icons → professional set + refined chip
career/PerksSection.tsx: swapped the playful lucide icons for a corporate set —
Palmtree→Plane, Monitor→Laptop, Gift→CalendarDays, Music→Headphones (Smartphone, Clock
kept). Icon chip upgraded: border-white/10, bg-gradient-to-b zinc-800/80→zinc-900/80,
inset top highlight, hover border tints brand blue (#2E5BFF/40); strokeWidth 2→1.5 for a
lighter premium line weight. Verified live /career: all 6 chips render
lucide-{plane,smartphone,laptop,calendar-days,headphones,clock} at stroke-width 1.5 with
1px border + gradient bg. tsc 0; biome shows only the 2 pre-existing
noStaticElementInteractions findings on the mouse-grid divs (inherited ChannelCard
pattern, untouched). Hover tint needs eyes. Not committed.

## 2026-07-15 — Revert footer "Softexedge" word animation
Reverted the footer brand-word animation to its original form: variant-based staggered letter rise (brandContainer staggerChildren 0.045 + brandLetter y 110%→0, 0.9s), no ocean wave, no per-letter infinite loops. Restored the Variants import, removed useReducedMotion/reduce and will-change-transform. Exact reconstruction of the pre-task code. Verified: no wave/infinity refs remain, tsc + biome clean, next build ✓. Single file. Not committed.

## 2026-07-17 — ContactSection rotating word slowed to match siblings
home/ContactSection.tsx:183 — rotation interval 2500ms → 4500ms. ContactSection was the
lone outlier; AboutSection, ExperimentalTestimonials and BlogSection all rotate at 4500ms
with the identical spring (30/20/1) + 1.1s exit, so the word now settles fully before
leaving and all four rotators share one cadence. tsc 0; biome findings on the file are
pre-existing (unused GRID_COLUMNS, ChannelCard a11y div), untouched. Pane can't play
framer — pacing needs eyes. Not committed.

## 2026-07-17 — Rotator speed parity check (no-op)
Task asked to propagate ContactSection's rotating-word speed to
ExperimentalTestimonials, BlogSection, AboutSection — verified all four already share the
identical config after the previous task: interval 4500ms, enter spring 30/20/1, exit
1.1s easeInOut, mode="wait" (ET 61/117/122; Blog 91/238/242; About 140/53/58; Contact
183/221/225). AboutSection's stiffness-60 spring at line 315 is the image card stack, not
the word — untouched. Zero diff.

## 2026-07-17 — Rotating words: longer dwell before next word
All four rotators' intervals 4500ms → 6000ms (Contact 183, ET 61, Blog 91, About 140 —
About's tick also drives the synced image stack, unchanged by design). Timing math: per
cycle motion ≈ 1.1s exit + ~2s spring settle, so dwell grows from ~1.4s to ~2.9s — the
word now visibly sits for a couple of seconds before the swap. Spring/exit configs
untouched (still 30/20/1 + 1.1s easeInOut everywhere). tsc 0; grep confirms 6000 in all
four. Pane can't play framer — pacing needs eyes. Not committed.

## 2026-07-17 — About page x padding matched to ExperimentalTestimonials
ET's content container uses px-4 md:px-10. Applied to: OurValuesSection content container
(was px-6 lg:px-10) and AboutTraditional's two padded blocks — typography (was px-6
md:px-12) and video wrapper (was px-6 md:px-12). Verified live /about @1280px: all three
compute 40px left/right (md:px-10). tsc 0. Not committed.

## 2026-07-17 — Work hero title nudged down
work/WorkHeroSection.tsx: added mt-16 md:mt-24 to the centered h1 (flex-centered in a
min-h-screen column, so the visual shift is half the margin net of mb-6 ≈ 36px at md+,
~20px mobile). Verified live /work @1280px: margin-top 96px computed, title center sits
36px below viewport center. tsc 0. Not committed.

## 2026-07-17 — brand-strategy hero stats sized down
brand-strategy/AgencyStats.tsx:85 — stat numbers text-6xl/md:7xl/lg:9xl →
text-5xl/md:6xl/lg:8xl (desktop 128px→96px, one step down per breakpoint). Labels,
counters, grid untouched. Scoped to brand-strategy only per task wording — the
web-development AgencyStats copy is unchanged. Verified live /brand-strategy: h4 class
list updated, base computes 48px. tsc 0. Not committed.

## 2026-07-15 — Slow the rotating-word swap in all four homepage sections
AboutSection, ExperimentalTestimonials, ContactSection, BlogSection (all four now share the unified x-slide word swap): exit tween duration 1.1 → 1.5s (easeInOut) and entrance spring stiffness 30 → 22 (damping 20, mass 1 unchanged) — both legs a little slower. Confirmed all four cycle at 6000ms, so the ~4s swap fits with rest time and mode="wait" never interrupts mid-swap. 8 value edits across 4 files; tsc + biome clean, next build ✓. Not committed.

## 2026-07-15 — SubServices/ProcessSection/OurTechStack/ProjectShowcase: x-gutter → ExperimentalTestimonials standard
Task: match these 4 sections' x-axis padding to ExperimentalTestimonials (`px-4 md:px-10`,
its container :81). All four exist as web-development + brand-strategy mirrors with
identical `px-6`/`md:px-6` gutters — changed BOTH copies (12 edits / 8 files; mirror
precedent): SubServices header container + per-panel grid (template literal), ProcessSection
container :43, OurTechStack header :37 + grid container :110, ProjectShowcase section :74.
Inner pill/card paddings untouched. Verified: source grep 0 old-gutter patterns remaining;
SSR HTML of /web-development AND /brand-strategy each serve 0 `px-6 md:px-6` and 19
`md:px-10`; tsc clean. Class-only. Not committed.

## 2026-07-17 — brand-strategy hero stats sized down again
Same task resent → one more step: brand-strategy/AgencyStats.tsx:85 stat numbers
text-5xl/md:6xl/lg:8xl → text-4xl/md:5xl/lg:7xl (desktop 96px→72px). Verified live
/brand-strategy: h4 computes the new class list (base 36px). web-development copy still
untouched. tsc 0. Not committed.

## 2026-07-15 — About components: x-gutter → ExperimentalTestimonials standard
Task: match OurTeamSection, OurValuesSection, AboutTraditional x-padding to
ExperimentalTestimonials (`px-4 md:px-10`). 4 spots / 3 files in `src/components/about/`:
OurTeamSection header :131 (`px-6` → `px-4 md:px-10`; its team grid is full-bleed by design,
untouched), OurValuesSection container :46 (`md:px-6` → `md:px-10`), AboutTraditional hero
block :18 + content container :42 (`md:px-6` → `md:px-10`). NOTE: OurTeamSection is shared —
change also applies on /career (consistent with its new rhythm). Verified via SSR HTML:
/about serves 4 standard containers, 0 old; /career serves the updated OurTeam header.
tsc clean. Class-only. Not committed.

## 2026-07-17 — Career page: gradient titles + ET x-padding
WhyJoinUs, OpenPositions, PerksSection: (1) brand gradient span (bg-gradient-to-r
#2E5BFF→#149CCB bg-clip-text) added to trailing title words — "Join Us", "Positions",
"perks"; (2) section x padding normalized to ET's px-4 md:px-10 (was md:px-8 / px-10 /
px-6 respectively). Verified live /career: all three gradient spans compute
linear-gradient + background-clip:text; the three sections carry px-4 md:px-10 (base 16px
computed; md unverifiable in pane, class identity confirmed). tsc 0. Not committed.

## 2026-07-15 — Work hero: drop title scrim, per-card light veil, hover clears card
WorkHeroSection: removed the elliptical black scrim behind the "Our Creative Portfolio" title. DomeGallery gained an opt-in cardOverlay prop (only work hero consumes it): every card gets a light black veil (bg-black/40, pointer-events-none) — visually a slight dim over the whole wall — and hovering a card fades ITS veil to 0 (group + group-hover:opacity-0, 500ms) so that card shows fully clear. Cards get pointer-events-auto when the prop is on (gallery root stays pointer-events-none; the hero title/content wrapper is already pointer-events-none so hover reaches the tiles). Verified: scrim gone, prop wired both sides, tsc + biome clean, next build ✓ /work. 2 files. Not committed.

## 2026-07-17 — Contact hero de-carded, connected to ContactSection
ContactHeroSectionTwo: outer section bg-white px-3 → bg-black full-bleed; inner hero div
dropped rounded-[20px] + border-zinc-800/50 (spotlight/overflow-hidden kept); Header now
gets onDark (logo/nav light variant over black). contact/page.tsx: removed mt-20 from the
ContactSection wrapper. Verified live /contact: hero computes bg black, 0 side padding,
inner radius/border 0px, and 0px gap to #contact (also black) — one continuous black
surface. tsc 0. Not committed.

## 2026-07-17 — Contact page header strip back to white
ContactHeroSectionTwo: outer section bg-black → bg-white and Header onDark removed —
the top strip behind the header is white again (blue logo variant confirmed live). The
hero block itself stays full-bleed black (verified: bg rgb(0,0,0), radius/border 0, width
= viewport 1265px) and still meets #contact with a 0px gap. tsc 0. Not committed.

## 2026-07-17 — Contact page: header CTA border like about page
page/Header.tsx ctaBorder condition: added pathname.startsWith("/contact") alongside
/about + /career — the "Get in Touch" nav button now gets border border-gray-300
hover:border-none on /contact. Verified live /contact: button computes 1px gray-300
border, class present. layout/Header (home) untouched — home wasn't in scope and has no
ctaBorder gate. tsc 0. Not committed.

## 2026-07-15 — WorkProjectShowcase: x-gutter matches ExperimentalTestimonials
Changed WorkProjectShowcase's section gutter px-6 → px-4 md:px-10 (ExperimentalTestimonials' inner container uses px-4 md:px-10; Work section carries its gutter on the section root, inner wrappers have none). Class-only; tsc + biome clean. Not committed.

## 2026-07-15 — Header CTA border: add blog page
Extended the route-scoped "Get in Touch" border in page/Header (border border-gray-300 hover:border-none) to /blog, alongside about/career/contact. One condition added; tsc + biome clean. Not committed.

## 2026-07-17 — ApplicationJourney title gradient
career/ApplicationJourney.tsx: "Your Application Journey" → gradient span on "Journey"
(bg-gradient-to-r #2E5BFF→#149CCB bg-clip-text text-transparent), same trailing-word
convention as the other career section titles. Verified live /career: span computes
linear-gradient, background-clip:text, transparent text fill. tsc 0. Not committed.

## 2026-07-15 — SpotlightGrid box pattern: blue → slightly-darker-blue gradient
Task: in BlogHeroSection, ContactHeroSectionTwo and CtaSection's box pattern, use #2E5BFF
with the gradient partner "a tone lower but not much". The box pattern = shared
`ui/SpotlightGrid.tsx`; its lit-cell default gradient was brand blue→cyan
(#2E5BFF→#149CCB). Changed the default (one line + docstring) to
`from-[#2E5BFF] to-[#274DD9]` — #274DD9 = same hue ~15% darker. Chose the component
default over per-call-site props because SpotlightGrid's only consumers are exactly these
sections (BlogHero, ContactHeroTwo, CtaSection brand-strategy + web-development mirror).
Non-pattern blue→cyan uses (headline text, icons) untouched. Verified via SSR HTML: all 4
routes serve the new gradient on pattern cells (80/instance), tsc clean. Glow animation
itself is rAF-driven (unverifiable in pane, see memory) but the gradient is a static class.
Not committed.

## 2026-07-17 — Hero stats sized to match StrategyHeroSection everywhere
Audit: components with Counter-style stats = brand-strategy/AgencyStats (reference,
text-4xl/md:5xl/lg:7xl), web-development/AgencyStats (hero, was 6xl/7xl/9xl),
about/AboutHeroSection:208 (hero stats, was 6xl/7xl/9xl), about/AboutOverview (mid-page
cards, NOT a hero — left alone); career hero has no stats. Applied the reference size to
the two hero blocks. Verified live: /web-development and /about stat h4s compute the new
class list (base 36px); grep shows all three hero stat blocks identical. tsc 0. Not
committed.

## 2026-07-15 — BlogHeroSection: brand gradient on the title
Task: add gradient to BlogHeroSection's title ("News, views / and everything else").
Followed the site convention (gradient on the emphasized final phrase, cf. home Blog
"thinking.", Contact "the future", career "Journey"): wrapped "everything else" in
`bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pr-2 text-transparent`
(pr-2 protects the clipped edge), "and" stays white; word-stagger animation untouched
(nested inside the existing motion.span). Verified via SSR HTML: /blog serves the gradient
span wrapping "everything else". tsc clean. 1 file. Not committed.

## 2026-07-20 — WorkProjectShowcase: fill empty grid slot (new Orbit CRM project)
The "All" grid had an empty slot beside Finova Dashboard: Aura (featured) spans row 1, Finova sat alone in row 2 because the next project (Lumina, featured) wraps to a full row. Added a new NON-featured project "Orbit CRM" (id 10, SaaS, /work/orbit-crm, full Project fields incl. description/tech/gallery from existing local assets) inserted in src/data/projects.ts right after Finova so the two pair up in row 2. Slug page generates automatically (getProjectBySlug matches href). Verified: all 4 gallery assets exist, tsc + biome clean, next build ✓ (/work + /work/orbit-crm static page). Single data file. Not committed. NOTE: the grid's final row still ends with one single card (pre-existing tail; say the word to add one more project or reorder to close it).

## 2026-07-20 — Home StatsSection bg → white
home/StatsSection.tsx:88 — section bg swapped from the gray gradient
(bg-linear-to-r from-[#dedddd] to-[#cac8c8]) to plain bg-white. Inner card gradients and
max-md:bg-white untouched. Verified live /home: section computes rgb(255,255,255),
background-image none. tsc 0. Not committed.

## 2026-07-20 — Navbar Services dropdown: top image scrim + fix dead links
Task: (1) top gradient overlay on the dropdown card images for title legibility; (2) link
items to correct pages. (1) Reshaped the existing hover scrim in BOTH resizable-navbars
(page/ + ui/) from `from-black/55 via-transparent to-black/30` to top-weighted
`from-black/70 via-black/20 to-transparent` — strongest under the title, fading clear.
(2) 6 of 8 dropdown items linked to `/services` which does NOT exist (404). Remapped in BOTH
Headers (page/Header.tsx + layout/Header.tsx) by closest existing page: Digital Marketing &
Growth, AI & Marketing Automation, Video Production → /brand-strategy; App Development,
Custom Software & SaaS, UI/UX Design → /web-development. Web Development + Brand Strategy
were already correct. JUDGMENT CALL — only 2 service pages exist; user may want different
targets or new pages later. Verification: dropdown is client-rendered-on-hover so SSR shows
none of it (expected); source-level: 0 "/services" left in either header, scrim class in
both navbars, tsc clean. OUT OF SCOPE but noted: home ServiceSection rows (6×) and footer
"Services" link still point to dead /services. Not committed.

## 2026-07-20 — OurValuesSection: increase x-axis padding
Bumped the content container gutter in about OurValuesSection from px-4 md:px-10 to px-6 md:px-16 lg:px-20 (mobile 16→24px, desktop 40→64px, large 80px). Class-only; tsc + biome clean. Not committed.

## 2026-07-20 — Contact hero: replace card-stack animation with a simple video + play button
Task: in the contact page hero, replace the stack image animation with a simple rectangle
video with a play button. `src/components/contact/ContactHeroSectionTwo.tsx`: removed the
rotating decorative rings, the 3-image CARDS deck, its 4.5s cycling effect and
AnimatePresence stack (+ now-unused imports AnimatePresence/useEffect/useIsDesktop/exitEase).
In its place, same footprint (max-w-[420px], h-300/420/460, rounded-[28px], border-white/10):
a <video src="/assets/hero.mp4" preload="metadata" playsInline loop> starting paused, with a
centered white circular play button (hidden while playing; clicking the video toggles
play/pause). Kept the whileInView entrance on the column. biome-ignore for useMediaCaption
(decorative showreel). Verified: hero.mp4 exists, tsc clean, biome check clean, SSR /contact
serves 1 video + 1 play button + 0 stack remnants. Playback behavior needs user click-check
(rAF-frozen pane can't). Not committed.

## 2026-07-20 — Contact hero: bigger title on three lines
Task: make ContactHeroSectionTwo's title bigger and split into three lines. h1 size ramp
`text-[3.25rem] sm:[4rem] lg:[5.25rem]` → `text-[3.5rem] sm:[4.5rem] lg:[6.5rem]` (~25%
bigger at lg); lines now "Let's build" / "something" / "great." — each its own stagger
span (containerVariants unchanged), gradient moved to just "great." with pr-2 clip guard.
Verified via SSR /contact: new classes + three line spans served. tsc clean. 1 file.
Not committed.

## 2026-07-20 — ContactFaqSection: x-gutter → ExperimentalTestimonials standard
Task: match ContactFaqSection's x-axis padding to ExperimentalTestimonials (`px-4 md:px-10`).
`src/components/contact/ContactFaqSection.tsx:45` section gutter `px-6 md:px-6` →
`px-4 md:px-10` (inner accordion row/answer padding untouched, same call as the other
FaqSection variants). Verified via SSR /contact: new gutter served, 0 old. tsc clean.
Class-only, 1 file. Not committed.

## 2026-07-20 — Rotating word animation: verified already matching (NO CHANGE)
Task: make the rotating word animation in ExperimentalTestimonials, ContactSection,
BlogSection match AboutSection (same speed, same timing). Finding: all three ALREADY match
AboutSection byte-for-byte — cycle interval 6000ms; enter spring stiffness 22 / damping 20 /
mass 1 from x:-100% opacity:0; exit x:100% opacity:0 over 1.5s easeInOut; AnimatePresence
mode="wait". This was aligned in a prior session (their inline comments say "Exactly the
AboutSection rotating-word config"). Verified by extracting interval + spring + exit from all
four files — identical. NO edits made. Sole non-timing difference: AboutSection's RotatingWord
uses a flex-centered container while the three targets use inline-grid (col-start-1/row-start-1
+ whitespace-nowrap) — a layout/positioning choice that does NOT affect speed or timing.
Offered to align the container if the user perceives a visual difference. Not committed (nothing to commit).

## 2026-07-20 — ServiceSection header: center-align title + description
Changed the ServiceSection header from a two-column row (tag+title left, description right, justify-between) to a centered stacked column: container flex-col-reverse items-start justify-between md:flex-row md:items-end → flex-col items-center text-center. Description dropped md:text-left and gained mx-auto max-w-2xl so it centers on the SAME axis as the title (both text-center on the container center), not offset. Tag/title/description all centered. Class-only; tsc + biome clean. Not committed.

## 2026-07-20 — AboutHeroSection: slightly bigger stat numbers
Bumped the stat-number h4 (the Counter values: 10+, 250+, 98%, 40+) one modest step per breakpoint: text-4xl/md:text-5xl/lg:text-7xl → text-5xl/md:text-6xl/lg:text-[5rem] (lg 72→80px, not 8xl's 96px — "a little"). Class-only; tsc + biome clean. Not committed.

## 2026-07-20 — About OurValuesSection: x-gutter → ExperimentalTestimonials standard
Task: match OurValuesSection x-axis padding to ExperimentalTestimonials (`px-4 md:px-10`).
`src/components/about/OurValuesSection.tsx:46` content container `px-6 md:px-16 lg:px-20`
→ `px-4 md:px-10` (dropped the lg:px-20 — the standard has no lg override, stays 40px).
NOTE: file was externally re-edited since my 2026-07-15 pass (had been md:px-10, reverted to
md:px-16 lg:px-20); now re-aligned. Verified via SSR /about: new gutter served, 0 old.
tsc clean. Class-only, 1 file. Not committed.

## 2026-07-20 — About OurTeamSection: brand gradient on member.role
Task: add gradient to {member.role} in the team cards. `src/components/about/OurTeamSection.tsx:174`
role <p> `text-zinc-300` → `w-fit bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text
text-transparent` (w-fit so the gradient box hugs the small uppercase text instead of spanning
the card; kept text-xs/font-bold/uppercase/tracking-wider). Shown on the hover info panel over
the photo. Shared component → also affects /career team section. Verified via SSR /about: 10
gradient role elements served, 0 old text-zinc-300 remnants; tsc clean. Class-only, 1 file.
Not committed.

## 2026-07-20 — OurTeamSection arrows match ExperimentalTestimonials
about/OurTeamSection.tsx: replaced the shadcn CarouselPrevious/CarouselNext primitives
(lucide icon, h-8/9 outline button) with two custom buttons identical to ET's nav arrows —
h-12 w-12 rounded-full border border-zinc-300 text-zinc-900 hover:bg-zinc-900
hover:text-white, MdArrowBack/MdArrowForward at h-5 w-5. Wired to existing
handlePrev/handleNext (autoscroll-stop + scrollPrev/Next preserved); removed now-unused
CarouselNext/CarouselPrevious imports, added react-icons/md. Gap 3→4 to match ET.
Verified live /about: both buttons compute 48x48, full radius, 1px zinc-300 border, h-5 w-5
icons — identical to ET. tsc 0; biome only the pre-existing <img> warning (line 186,
untouched). Not committed.

## 2026-07-20 — CtaSection x-gutter → match ExperimentalTestimonials (px-4 md:px-10)
CtaSection's section is px-0; its horizontal gutter comes from the per-page wrapper (uniformly px-3 / p-3). Changed that wrapper gutter to px-4 md:px-10 (ExperimentalTestimonials' value) on all 8 CtaSection consumers: about, blog, blog/[slug], contact, work, work/[slug] (px-3 → px-4 md:px-10, vertical [&>section] padding untouched), and brand-strategy + web-development (p-3 → px-4 py-3 md:px-10, keeping the 12px vertical). Now every CtaSection card is inset by the same gutter as the testimonials/other sections. Class-only across 8 page files; tsc + biome clean, next build ✓. Not committed.

## 2026-07-20 — Revert CtaSection x-gutter change
Reverted all 8 CtaSection wrapper gutters back to their originals: px-4 md:px-10 → px-3 (about, blog, blog/[slug], contact, work, work/[slug]); px-4 py-3 md:px-10 → p-3 (brand-strategy, web-development). CtaSection cards inset by px-3 again. tsc + biome clean. Not committed.

## 2026-07-20 — CtaSection: internal content x-padding → match ExperimentalTestimonials
Inside the shared brand-strategy/CtaSection, set the two content blocks' HORIZONTAL padding to px-4 md:px-10 (ExperimentalTestimonials value), keeping their vertical padding: top p-8 pt-12 md:p-12 lg:p-16 lg:pb-0 → px-4 py-8 pt-12 md:px-10 md:py-12 lg:py-16 lg:pb-0; bottom p-8 md:p-12 lg:p-16 → px-4 py-8 md:px-10 md:py-12 lg:py-16. The card's inner text now insets 16/40px horizontally (was 32/48/64). Shared component → all CtaSection pages. Single file; tsc + biome clean, next build ✓. Not committed. (Note: web-development/CtaSection is a separate copy, unchanged.)

## 2026-07-20 — Hero stats re-synced to AboutHeroSection (new reference size)
Audit: hero sections with Counter stats = AboutHeroSection (reference, user had since
changed it to text-5xl/md:6xl/lg:[5rem]), brand-strategy/AgencyStats + web-development/
AgencyStats (both hero via StrategyHeroSection, were text-4xl/md:5xl/lg:7xl from prior
task). AboutOverview has Counter stats but is a mid-page section, not a hero → skipped.
Set both AgencyStats copies to match the current AboutHeroSection (text-5xl md:text-6xl
lg:text-[5rem]). Verified live /brand-strategy: h4 computes new class list (base 48px);
grep shows all three hero stat h4s identical. tsc 0. Not committed.

## 2026-07-20 — CtaSection: rain-fall background (SpotlightGrid rain mode)
Task: make the CtaSection bg animation "fall like rain". The bg is shared ui/SpotlightGrid
(wandering spotlight over a dark tile grid). Added an opt-in `rain?: boolean` prop rather than
forking: rainHash (deterministic sin pseudo-random, SSR-safe), rainIntensity(index,t) — 2
staggered drops per column falling downward (head + RAIN_TAIL=3.2-row trailing streak above,
wraps at RAIN_CYCLE=ROWS+4); new rainT state set each rAF frame; tick returns early in rain
mode; getIntensity branches; reveal mask hoisted to `spotlightMask` const and set to "none"
in rain mode (whole grid revealed so drops fall full-width). Enabled ONLY in the 2 CtaSection
mirrors (brand-strategy + web-development): `<SpotlightGrid rain speed={1.2} />` (was speed=4
maskRadius=950 travel=0.35). Hero consumers (BlogHeroSection, ContactHeroSectionTwo) keep the
wandering spotlight — verified unchanged. CtaSection's z-[5] block-out gradients still protect
text legibility. 3 files. tsc clean, biome-format clean (CRLF-only noise; pre-existing lint
debt untouched), next build ✓. Done-gate spec-verifier died on an API stall mid-run (no
verdict) — completed its static checks manually instead (hooks order, downward-fall logic,
SSR-hydration determinism via rainT=0 first paint, no spotlight regression, reduced-motion).
Live rain motion is rAF-driven → unverifiable in the frozen pane; user to eyeball. speed 1.2
is tunable. Not committed.

## 2026-07-20 — Revert the CtaSection rain-fall background
Reverted the earlier "make CtaSection bg fall like rain" change. Removed the rain mode from
`ui/SpotlightGrid.tsx` (rainHash/RAIN_TAIL/RAIN_CYCLE/rainIntensity helpers, `rain` prop +
type + docstring line, rainT state, the tick's `if (rain)` branch + `rain` dep, the
getIntensity rain branch, and the hoisted spotlightMask — restored the two inline
useMotionTemplate masks). Restored both CtaSection call sites (brand-strategy + web-development)
to `<SpotlightGrid speed={4} maskRadius={950} travel={0.35} />`. SpotlightGrid is back to its
pre-rain baseline (keeps the separate blue→#274DD9 glow-gradient task). Did NOT git-checkout
(files carry other uncommitted work) — reversed edits surgically. Verified: 0 residual "rain"
refs in the 3 files, tsc clean, biome-format clean, next build ✓. Hero consumers unaffected.
Not committed.

## 2026-07-20 — CareerHeroSection marquees: image+quote+video mix
career/CareerHeroSection.tsx: the two InfiniteRow marquees were all-image; now each row is
a mix of image / autoplay video / quote card. Introduced a CarouselItem discriminated union
(image|video|quote) + a CarouselCard renderer; card wrapper (h-[160px] sm:200 md:260,
aspect-[4/5], rounded-[2rem], shadows) is byte-identical so dimensions are unchanged. col1
= image,quote,video; col2 = video,image,quote. Videos reuse /assets/video1.mp4 & video2.mp4
(muted/loop/autoPlay/playsInline). Quote card = #0a0a0a bg, brand-gradient quote mark, text
+ author/role. Dropped dead col3Images and unused useMemo/MdArrowOutward imports; inner map
key now content-based. Verified live /career: both rows render image/quote/video in order,
all cards 160x128 @ 32px radius, 24 videos readyState 4 no error. tsc 0; biome down to the
2 pre-existing findings (outer 12-copy index key + <img>, identical to original & the site's
marquee pattern). Motion needs eyes. Not committed.

## 2026-07-20 — CareerHeroSection quote card: author removed
career/CareerHeroSection.tsx: removed the author/role block from the quote CarouselCard —
card now renders just the brand-gradient quote mark + quote text (justify-between). Data
fields author/role kept (author still serves as the list key). Verified live /career: quote
card has 2 children, no author/role strings present. tsc 0. Not committed.

## 2026-07-20 — CareerHeroSection quote: text pulled up under the mark
career/CareerHeroSection.tsx: quote card layout justify-between → justify-start gap-1
md:gap-2 — the removed author block had left the text anchored at the card bottom; now the
quote text sits directly beneath the gradient quote mark. Verified live /career: card
justify-content flex-start, mark→text gap 8px (was full-height spread). tsc 0. Not committed.

## 2026-07-20 — CareerHeroSection marquee perf: halve DOM + video decodes
Lag root cause: each InfiniteRow rendered 12 identical copies × 3 slots = 36 cards/row, so
with the new video slots the page decoded 24 simultaneous <video> elements (12/row) + a
72-card always-animating composited layer. A seamless loop needs far fewer copies. Cut
copies 12→6 and translate 8.333333%→16.666667% (=1/6, one copy-width). Result: 36 cards, 12
videos total. UI identical. Verified live /career: 6 copies/row, 12 videos (was 24), 36
cards (was 72); track 3960px, translate 660px = exactly one copy, coverAtReset 3300px >>
viewport 1265px so loop stays seamless (no gap); all videos readyState>=3, no errors. tsc 0.
Smoothness needs eyes/real device but decode+node load is halved. Not committed.

## 2026-07-20 — Career gradient titles: fix clipped descenders/right edge
WhyJoinUs "Join Us", OpenPositions "Positions", PerksSection "perks", ApplicationJourney
"Journey": bg-clip-text text-transparent spans painted the gradient only over the content
box, so glyph descenders (p/y/J) + last-glyph right bearing fell outside the paint area and
rendered transparent = "cut". Fix: added `inline-block pb-[0.2em] pr-[0.08em]` to each span
(em units scale with the lg:text-[6.5rem]=104px titles), matching the codebase precedent
(CareerHeroSection gradient span uses inline-block+pr-4). Verified live /career: all 4 spans
inline-block, clip:text intact, pb 20.8px (0.2em) / pr 8.3px, span box 130px vs 104px font
(paint now extends full descender), h2 overflow visible. tsc 0. Pane can't screenshot the
video-heavy /career (zoom times out) so final pixel look is user's eyes; mechanism + metrics
confirm the paint box now covers the glyphs. Not committed.

## 2026-07-20 — Blog hero title: gradient → white
blog/BlogHeroSection.tsx: "everything else" span dropped the bg-gradient/bg-clip-text/
text-transparent, now `pr-2 text-white` (h1 already text-white so the rest was unchanged).
Verified live /blog: span computes color rgb(255,255,255), no background gradient. tsc 0.
Not committed.

## 2026-07-20 — BlogListSection description matches ServiceSection
blog/BlogListSection.tsx:95 — description max-w-lg text-lg → max-w-2xl text-xl to match
ServiceSection's `text-xl font-light leading-[1.25em] text-white` recipe (font-light/
leading/color already identical). Kept md:text-left (blog header is a 2-col justify-between
layout, not ServiceSection's centered stack — didn't add mx-auto centering). Verified live
/blog: description computes 20px / weight 300 / 25px line-height / white / max-width 672px.
tsc 0. Not committed.

## 2026-07-20 — WorkProjectShowcase ProjectCard hover scrim lighter
work/WorkProjectShowcase.tsx:227 — the whole-image hover scrim (flat "black overlay")
bg-black/55 → bg-black/35 (0.55→0.35 alpha). The bottom legibility gradient (line 220,
from-black/90) left untouched — it's a gradient, not the flat black overlay. Verified live
/work: all ProjectCard scrims compute oklab alpha 0.35, no bg-black/55 remains. tsc 0. Hover
reveal itself needs eyes (opacity is framer-animated 0→1). Not committed.

## 2026-07-20 — Contact hero title → white
contact/ContactHeroSectionTwo.tsx: title's gradient word "great." (bg-gradient/bg-clip-text/
text-transparent) → `pr-2 text-white`. Rest of the h1 ("Let's build", "something") already
white. Verified live /contact: "great." span computes color rgb(255,255,255), no gradient.
tsc 0. Not committed.

## 2026-07-20 — Revert ServiceSection header centering
Reverted the ServiceSection header back to the original two-column row: container flex-col items-center text-center → flex-col-reverse items-start justify-between md:flex-row md:items-end; description mx-auto → md:text-left (dropped mx-auto). Class-only; tsc + biome clean. Not committed.

## 2026-07-20 — ProcessSection + OurTechStack: description size matches ServiceSection
The intro descriptions in ProcessSection and OurTechStack (both brand-strategy + web-development copies) already matched ServiceSection's description except size (text-2xl vs ServiceSection's text-xl). Changed text-2xl → text-xl in all 4 so the description typography matches ServiceSection (max-w-2xl text-xl font-light leading-[1.25em] text-white). Kept each section's own alignment (md:text-left on brand-strategy, text-center on web-dev) and md:mb-2. Class-only, 4 files; tsc + biome clean. Not committed.

## 2026-07-20 — Header CTA border: add brand-strategy page
Extended the route-scoped "Get in Touch" border in page/Header (border border-gray-300 hover:border-none) to /brand-strategy, alongside about/career/contact/blog. One condition added; tsc + biome clean. Not committed.

## 2026-07-20 — WorkProjectShowcase description matches ServiceSection
work/WorkProjectShowcase.tsx:70 — section-header description max-w-lg text-lg → max-w-2xl
text-xl to match ServiceSection's `text-xl font-light leading-[1.25em] text-white` (weight/
leading/color already identical). Kept md:text-left (2-col justify-between header, not
ServiceSection's centered stack — no mx-auto added), same call as the earlier BlogListSection
change. Verified live /work: description computes 20px / weight 300 / 25px lh / white /
max-width 672px. tsc 0. Not committed.

## 2026-07-20 — Contact hero re-carded to match CtaSection framing
contact/ContactHeroSectionTwo.tsx: reversed the earlier full-bleed de-carding — inner hero
div regained rounded-[20px] border border-zinc-800/50 (overflow-hidden bg-black kept);
section gained px-4 md:px-10 gutters + pb-16 md:pb-24 so the black card insets and floats on
white, same framing as brand-strategy/CtaSection (rounded-[20px] border-zinc-800/50 bg-black).
Verified live /contact: card computes radius 20px, 1px zinc-800/50 border, bg black, overflow
hidden, inset 40px L/R, section white with 96px pb. tsc 0. Supersedes the 2026-07-17
"connected to ContactSection" change per new instruction. Not committed.

## 2026-07-20 — Contact hero gutters → px-3
contact/ContactHeroSectionTwo.tsx: section x-padding px-4 md:px-10 → px-3 (dropped the md
override) so the rounded card insets 12px both sides at all breakpoints, matching the
CtaSection px-3 wrapper on the contact page. pb-16 md:pb-24 / pt kept. Verified live /contact:
section paddingLeft 12px, card inset 12px L/R. tsc 0. Not committed.

## 2026-07-20 — CtaSection spotlight reaches edge boxes
Both CtaSection copies (brand-strategy + web-development):27 — SpotlightGrid travel 0.35 → 1.
travel caps the Lissajous swing as a fraction of the half-grid; at 0.35 the spotlight center
only wandered cols 2.9–6.1 / rows 2.3–4.7, so edge cells never lit ("doesn't touch the edge
boxes"). At 1 it reaches cols 0–9 / rows 0–7 = every edge cell. Verified live /brand-strategy
via the component's own position math against real container geometry (1239x626): old x-swing
447–916px vs new 12–1351px (spans full width). speed/maskRadius unchanged. Blog hero + contact
hero SpotlightGrid left at their own travel (task scoped to CtaSection). tsc 0. Actual motion
needs eyes (rAF). Not committed.

## 2026-07-20 — SpotlightGrid: spotlight confined to VISIBLE cell band
Follow-up to the travel=1 fix. The grid is w-[120%] -ml-[5%] with square cells taller than
the container, so cols ~9 and rows 0-1/6-7 overflow off-screen; travel=1 (full-grid swing)
lit those clipped cells, so the glow spent time off-screen. Reworked SpotlightGrid tick math
(ui/SpotlightGrid.tsx): each frame solve the visible fractional cell range (centers inside
[0,w]x[0,h]) — colLo/colHi/rowLo/rowHi via the same center formulas, clamped — and swing the
Lissajous around the visible mid with amplitude = visible half-band * travel. Now travel=1
reaches the VISIBLE edge cells only. Updated the travel doc comment. Shared component so all
consumers (2 CtaSection, blog hero, contact hero) benefit; their travel props unchanged
(0.35 stays a small central swing within the visible band). Verified live /brand-strategy via
the component's own math on real geometry (1239x626): spotlight mouseX 12-1239 / mouseY 0-626
= fully within bounds and touching visible edges (was 12-1351 / -207..833 off-screen).
biome: only the pre-existing key={index} on the 80-cell grid (untouched). tsc 0. Motion
needs eyes. Not committed.

## 2026-07-20 — ServiceSection header: center description against the TITLE only
Problem: the flex row's two children were the [tag + title] div and the description, so md:items-center centered the description against the combined tag+title block instead of the title. Fix: hoisted the tag OUT of the row — it now sits above as its own <p> (keeps mb-6) — and the row holds only the h2 and the description, switched md:items-end → md:items-center. Description is now vertically centered on the title alone. Outer wrapper keeps mb-10/pb-10; row keeps flex-col-reverse (mobile still shows description above the title; the tag now leads on mobile instead of sitting between them). Single file; tsc + biome clean, next build ✓. Not committed.

## 2026-07-20 — Apply ServiceSection header alignment to 6 sections
All six had the same broken shape as ServiceSection did: the flex row's first child was a `<div className="flex flex-col gap-5">` holding eyebrow + title, so md:items-end/center aligned the description against the tag+title block. Refactored each: eyebrow hoisted OUT to be the first child of the outer header div (gains `mb-5` to replace the lost gap-5, plus `block` where it's a span so the margin applies); new row holds ONLY title + description with md:items-end → md:items-center; empty gap-5 wrapper deleted; outer keeps just its spacing/context classes; `md:mb-2` (an items-end nudge) removed from descriptions that had it. Files: brand-strategy/{SubServices, ProcessSection, OurTechStack, ProjectShowcase}, work/WorkProjectShowcase, blog/BlogListSection. All framer-motion props preserved verbatim; mobile stacking unchanged (no flex-col-reverse introduced). Web-development copies (SubServices/ProcessSection/OurTechStack/ProjectShowcase) intentionally SKIPPED — they use centered stacked headers with no title|description row. Specialists: frontend-developer (execute) + spec-verifier (done gate, APPROVED, no P0/P1). Verified: tsc + biome + next build ✓ (27 pages). 6 files + plan.md. Not committed.

## 2026-07-20 — Link homepage CTAs to their pages
Audited every interactive element in src/components/home/*. Found exactly two dead CTAs: the "Connect With Us" buttons in AboutSection and ExperimentalTestimonials were bare `<button type="button">` with no onClick and no href — clicking did nothing. Converted both to `<Link href="/contact">` (next/link import added to each); all classes, the group-hover arrow animation, and the gradient defs left untouched. Everything else on the homepage was already wired: BlogSection CTA → /blog, PortfolioSection cards → project.href, ServiceSection items → service.href, ContactSection "Send Message" is a form submit (not navigation, left alone).
KNOWN BROKEN (pre-existing, NOT fixed — needs a product decision): there is no /services route, yet 6 of ServiceSection's 8 items, both SubServices files, and the Footer "Services" link all point to /services → 404. Only Web Development (/web-development) and Brand Strategy (/brand-strategy) resolve. Verified: tsc ✓, biome ✓, next build ✓ (route list confirms no /services). 2 files. Not committed.

## 2026-07-20 — 6 remaining service pages mirrored from /brand-strategy
Header lists 8 services; only /brand-strategy + /web-development existed, the other 6
pointed at those as placeholders. Created the 6 missing pages the same way web-development
was made (which is a byte-identical copy of brand-strategy):
 digital-marketing, ai-marketing-automation, app-development, custom-software,
 ui-ux-design, video-production.
Per page: `cp -r src/components/brand-strategy src/components/<slug>` (8 components each =
48 files, byte-identical so design is guaranteed "same to same"; internal imports are
relative ./AgencyStats + ../page/Header so they resolve in-folder) + new
src/app/<slug>/page.tsx mirroring brand-strategy's composition with imports repointed and a
unique default export. Re-linked the service dropdown in BOTH headers (page/Header.tsx +
layout/Header.tsx) so each of the 8 services hits its own route.
Verified: tsc 0; all 6 routes HTTP 200; /digital-marketing DOM fingerprint identical to
/brand-strategy (same h1 "WeBuildBrandsThatPeopleTrust", same 8 h2s, 11 sections);
`diff -r` proves all 6 folders IDENTICAL to brand-strategy; biome on a copy = baseline
exactly (9 errors/8 warnings, all pre-existing in brand-strategy), 6 new page files clean.
Map updated (8 service routes + service-page pattern note). plan.md written first; previous
unapproved TracingBorder plan archived as plan-tracingborder-handoff.md.
Note: copies inherit brand-strategy's SubServices card links (`/brand-strategy`, `/services`
— /services still doesn't exist) and the placeholder mailto in CtaSection. Content is
intentionally identical per "same to same"; each folder can now diverge. Not committed.

## 2026-07-20 — /web-development brought back to full parity with /brand-strategy
Full folder diff (never done before — only StrategyHeroSection had been compared) showed 6
of 8 components had diverged: SubServices/ProcessSection/OurTechStack/ProjectShowcase had
CENTERED headers (from the earlier "center align web-development" task), CtaSection kept the
old p-8/md:p-12 padding + missing font-medium spans, FaqSection had lg:text-[5rem] +
leading-relaxed; page.tsx used space-y-25.
Synced: `cp src/components/brand-strategy/*.tsx src/components/web-development/` and
regenerated src/app/web-development/page.tsx on the same template as the other 7 service
pages (space-y-10, own imports + WebDevelopmentPage export).
NOTE: this intentionally REVERTS the earlier centered-header request for this page, per the
newer "same as brand strategy" instruction — flagged to user.
Verified: diff -r brand-strategy vs web-development = IDENTICAL (8/8); page composition diff
= imports/name only; tsc 0; biome clean on page; /web-development 200; live DOM: 4 section
tags (What We Offer/How We Work/Our Toolkit/Selected Work) all text-align start (left, was
centered), 11 sections, h1+8 h2s identical to /brand-strategy, FAQ title 48px (was 80px).
All 8 service pages now share one baseline. Not committed.

## 2026-07-20 — brand-strategy SubServices: last stacking card pinned at the wrong offset
The 4th/last card was special-cased to pin at `top: calc(5vh + 0px)` (the isLast ternary forced index 0), so instead of stopping 190px below card 3 it rose to the very top and covered the three peeking titles. Removed the ternary — every card now pins at `calc(5vh + i*190px)`. This also fixes a latent desync: the activeIndex tracker (line ~88) already computed pinTop as `innerHeight*0.05 + j*190` for ALL j including the last, so the image-hiding logic disagreed with the actual render for card 4. `isLast` is still used for the card's taller height, so no dead prop. Verified: tsc ✓, biome ✓, next build ✓. 1 file, 1 line. Not committed.
OPEN: the last card keeps its taller `min-h-[70vh] md:h-[780px]` (others are 600px). That height was chosen when it pinned at 5vh; now that it pins 570px lower it extends further below the fold. Ask user whether to normalize it to 600px.

## 2026-07-20 — SubServices: gate the ProcessSection overlap on the last card reaching the top
Requested behavior (confirmed with the user, since "hits the top" was ambiguous after the previous fix): card 4 stops in line below card 3's title like the others, THEN lifts to the top, and only after that may the next section overlap it.
Implementation: added a `RISE = (services.length-1)*190` (=570px) spacer div between the cards and the overlap slot, with its own `useScroll({target: riseRef, offset: ["start end","end end"]})`. That yields 0→1 over exactly the spacer's height; `useTransform` maps it to y 0→-570 applied to the last card only, whose sticky wrapper is now a motion.div. Net effect: card 4 pins at 5vh+570 and holds (the spacer's top is still below the fold), then lifts to 5vh over 570px of scroll, then children — which start at the spacer's BOTTOM — arrive. Overlap is structurally gated: children reach the viewport bottom exactly at lift-complete and need ~another viewport to climb over the card.
Non-last cards pass y=undefined (no transform). activeIndex tracker unaffected: card 4's rect.top only decreases from its pin line, so it still reads as pinned throughout the lift. Note cards 1-3's peeking titles DO get covered once card 4 reaches the top — user explicitly chose this ("only at the end, not immediately"). Verified: tsc ✓, biome ✓, next build ✓; scroll geometry reasoned through in-loop (no visual verification possible in this workspace). 1 file. Not committed.

## 2026-07-20 — SubServices: release the first card's pin once the last card stops
Card 1 now switches from `sticky` to `relative` when `activeIndex === services.length - 1` (i.e. the last card has reached its stacked stop), so its peeking title strip scrolls away instead of holding for the rest of the sequence. New `unpinned` prop on Card drives both the position class and dropping `top` (on a relative box `top` would push the card DOWN by 5vh instead of setting a sticky line — that's why it's conditional, not left in place).
No feedback loop: card 1 releasing doesn't move card 4, so activeIndex can't oscillate. No layout shift either — sticky vs relative doesn't change in-flow height, so cards 2-4 and the rise runway are unaffected. Reversible: scrolling back up re-pins it. Verified: tsc ✓, biome ✓, next build ✓. 1 file. Not committed.
CAVEAT for user review: the release is instant (position swap), so the strip disappears rather than sliding out. If that reads as a glitch, the alternative is a scroll-linked y translate like the last card's lift.

## 2026-07-20 — REVERTED the three SubServices stacking-card tasks
User reverted all three: (1) last card pinning in line with the others, (2) the rise-runway gate on the ProcessSection overlap, (3) releasing the first card's pin. SubServices.tsx stacking logic is back to its committed state — restored the `isLast ? 0 : i` ternary in the pin `top`, removed RISE/riseRef/riseProgress/lastCardY/useTransform, removed the rise-runway spacer, removed the `y` and `unpinned` props, and reverted the card wrapper from motion.div back to a plain div. The last card once again pins at 5vh and rises over the other cards' peeking titles (the original design).
Confirmed by `git diff` on the file: the ONLY remaining hunk is the header-alignment change from the earlier task — every trace of the three reverted tasks is gone and the stacking code is byte-identical to HEAD. Note the pre-existing render/tracker desync is back too: the activeIndex tracker computes pinTop as `innerHeight*0.05 + j*190` for all j, which does not match the last card's actual 5vh pin. Left as-is since it is original behavior. Verified: tsc ✓, biome ✓, next build ✓. 1 file. Not committed.

## 2026-07-20 — SubServices: last stacking card pins in line with the others (re-applied)
Re-applied the fix reverted earlier this session (user reverted it only as part of undoing the two follow-ups; asked for this one back on its own). The last card was special-cased to `top: calc(5vh + 0px)` via the `isLast ? 0 : i` ternary, so it climbed to the very top and covered cards 1-3's peeking titles. Now every card pins at `calc(5vh + i*190px)`, so card 4 stops below card 3's title.
Same side benefit as before: the activeIndex tracker already computed pinTop as `innerHeight*0.05 + j*190` for ALL j, so render and tracker now agree for card 4 (previously desynced). `isLast` is still used for the card's height, so no dead prop. NOT re-applied: the rise-runway overlap gate and the first-card unpin from the two follow-up tasks — those stay reverted.
Verified: tsc ✓, biome ✓, next build ✓; `git diff` confirms the only hunks in this file are the header alignment and this one-line pin change. 1 file. Not committed.

## 2026-07-20 — brand-strategy: remove the ProcessSection overlap on SubServices
ProcessSection was passed as `children` to SubServices, which rendered it INSIDE the sticky cards container at z-40 so it scrolled up over the still-pinned last card. Moved it out to a plain sibling: `<SubServices />` then `<ProcessSection />`. SubServices now takes its existing `children`-absent branch and renders the h-[100vh] runway spacer instead, so the last card still holds for a viewport of scroll, then unpins and scrolls away normally before ProcessSection begins. 1 file (page.tsx only) — SubServices.tsx itself untouched; its `children` prop and overlap slot are kept so the behavior can be restored by re-nesting.
SCOPE (user chose "brand strategy only"): the identical overlap pattern exists in 7 other service pages, each with its OWN component copies — web-development, digital-marketing, ai-marketing-automation, app-development, custom-software, ui-ux-design, video-production. Those still overlap; user declined changing them for now.
NOTE: those 7 service pages + routes are NEW since earlier this session (my earlier build listed no /digital-marketing etc.), which also resolves part of the /services 404 gap I flagged in the homepage-links task — though ServiceSection/Footer still point at the nonexistent /services rather than these new routes. Verified: tsc ✓, biome ✓, next build ✓ (all new routes build). Not committed.

## 2026-07-20 — SubServices: dropped the last card's leftover size special-case (answering "why does the last card overlap?")
Question was already resolved by earlier work — the last card stops stacked at 5vh+3*190 like the others. It only ever rose to the top to serve the ProcessSection overlap (the next section slid over a viewport-filling card), and that overlap was removed in the previous task, so the justification was gone.
What remained was the sizing relic: the last card was `min-h-[70vh] md:h-[780px]` vs `min-h-[50vh] md:h-[600px]` for the rest — sized to fill the viewport when pinned at 5vh. Pinned in the stack at 5vh+570 it ran ~500px past the fold on a 900px viewport, so its lower half (incl. the tags row) was never visible. Made all cards 600px and removed the now-unused `isLast` prop entirely (call site, destructure, and the stale comment about the overlap sliding over the last card). grep confirms zero `isLast` references remain.
Every card is now identical in pin offset and size — a plain stack, no special cases. Verified: tsc ✓, biome ✓, next build ✓. 1 file. Not committed. Easily reverted (one ternary) if the taller final card was deliberate.

## 2026-07-20 — brand-strategy section dividers made longer
User asked to "increase the border width" of the rules between ProcessSection / OurTechStack
/ ProjectShowcase. Ambiguous (thickness vs span) — asked; user chose LONGER LINE (span),
stroke stays 1px. The two section rules are ProcessSection:116 and OurTechStack:112
(ProjectShowcase has no rule of its own — it's bounded by OurTechStack's). Both were inset
40px on desktop by the md:px-10 gutter; now 16px each side (longer, still not edge-to-edge):
 - OurTechStack: divider wrapper px-4 md:px-10 → px-4.
 - ProcessSection: divider lives inside the padded container, so pulled out with
   `md:-mx-6 md:w-[calc(100%_+_3rem)]` (40−24=16px inset).
BUG CAUGHT: first wrote `w-[calc(100%+3rem)]` — invalid CSS (calc requires whitespace around
+), which would have dropped the width rule while -mx-6 still shifted the line left. Fixed
with Tailwind underscore syntax; verified in the compiled dev CSS that it emits
`width: calc(100% + 3rem)` and `.md\:-mx-6 { margin-inline: calc(var(--spacing) * -6) }`.
Verified: tsc 0; biome 2 pre-existing warnings only. Pane reports viewport 0 on this page and
can't evaluate md: breakpoints, so span confirmed via compiled CSS + arithmetic, not pixels —
final look needs user's eyes.
SCOPE: applied to brand-strategy ONLY as asked; the other 7 service pages (which were just
brought to byte-identical parity) now differ in these 2 files. Offered to sync. Not committed.

## 2026-07-20 — Career hero quote card → ContactSection gray
career/CareerHeroSection.tsx: quote CarouselCard bg-[#0a0a0a] → bg-[#161616]. #161616 is the
gray of ContactSection's ChannelCard boxy-grid cells (ContactSection.tsx:144) — the card's own
bg-zinc-950/20 base is ~transparent and reads black, so #161616 is the gray actually seen in
those cards. Verified live /career: all 12 quote cards compute rgb(22,22,22); remaining
bg-[#0a0a0a] on the page is WhyJoinUs' bento cards (different section, inMarquee false) — no
quote card missed. tsc 0; biome = the 2 pre-existing findings for this file only.
SELF-INFLICTED BUG (caught+fixed): first put the explanatory {/* */} comment directly inside
`{item.type === "quote" && (` — invalid JSX there, broke the parse (TS1005/TS1382). Moved the
comment above the conditional. Not committed.

## 2026-07-20 — SubServices: completed stack now scrolls away rigidly (no last-card reshuffle, no freeze)
Problem: with `top: calc(5vh + i*190px)`, sticky release fires when `containerBottom < top + height`, which differed per card — the LAST card (biggest top) unstuck FIRST, so the finished stack peeled apart from the top card down as the section left. Plus the h-[100vh] fallback spacer froze everything for a full viewport before that.
Fix: all cards now share `top: 5vh` and get their 190px staircase from `transform: translateY(i*190px)` instead. `top + height` is then identical for every card, so they all unstick at the same scroll position and the stack travels up as one rigid block. Compensated the flow spacing with `marginBottom: max(0px, calc(22vh - 190px))` — the transform already adds 190px between consecutive cards, so the margin gives the same 190px back, preserving the original inter-card gap AND the ~608px pin cadence. The max() clamp matters: 22vh < 190px on viewports under ~864px tall, and a negative margin would drag cards into each other. Also removed the 100vh fallback spacer (children branch kept) so the container ends with the last card and the section scrolls up immediately once stacked, instead of holding.
Tracker still consistent: getBoundingClientRect().top includes the transform, so a pinned card reads 5vh + 190i — exactly the tracker's `innerHeight*0.05 + j*190`.
Verified: tsc ✓, biome ✓, next build ✓. NOTE: a build run mid-task failed on src/components/career/CareerHeroSection.tsx:85 (JSX comment in expression position — same class of error hit twice earlier this session) from a concurrent user edit; it was resolved by the user and the re-run passed. Not my change. 1 file. Not committed.

## 2026-07-20 — SubServices: reserve the transform offset so the last card stops covering ProcessSection
Regression from the previous task, caught by a user screenshot: the last card overlapped/hid the top of ProcessSection. Cause is inherent to the translateY staircase — a transform paints the element elsewhere but reserves NO layout space, so the last card was painted (n-1)*190 = 570px below its layout box and spilled over the following section.
Fix: added a 570px `aria-hidden` reserve div, computed as `(services.length - 1) * STEP`. Deliberately placed OUTSIDE the sticky `container` div (but inside the section): putting it inside would extend the cards' sticky containing block and delay their release by 570px, reintroducing the hold the previous task removed. It is not empty black space in practice — the transformed last card is what occupies it.
Also extracted the magic 190 into a module-level `STEP` const now that it is used in four places (tracker pinTop, card transform, margin compensation, reserve height) — they must agree or the stack desyncs. Verified: tsc ✓, biome ✓, next build ✓. 1 file. Not committed.

## 2026-07-20 — ServiceSection: link the 8 services to their real pages
Six of the eight items still pointed at `/services`, which has never existed as a route (flagged twice earlier in this session). The dedicated route directories now exist, so mapped each item to its own page: Digital Marketing & Growth → /digital-marketing, AI & Marketing Automation → /ai-marketing-automation, App Development → /app-development, Custom Software & SaaS → /custom-software, UI/UX Design → /ui-ux-design, Video Production → /video-production. Web Development and Brand Strategy were already correct.
Mapping is NOT invented: page/Header.tsx's Services dropdown (lines 47-96) already links these same 8 titles to exactly these 8 routes, so ServiceSection now matches the header 1:1. Verified each href against the filesystem with a scripted `src/app/<route>/page.tsx` existence check — all 8 OK, zero 404s.
Verified: tsc ✓, biome ✓, next build ✓. 1 file. Not committed.
STILL BROKEN elsewhere (out of scope, not touched): Footer.tsx:12 "Services" → /services, and 24 `link: "/services"` entries across the 8 per-page SubServices card sets (3 each). Also page/Header.tsx:329 has a stray `href="#contact"`.

## 2026-07-20 — Career hero quote card gray → #131313
career/CareerHeroSection.tsx: quote CarouselCard bg-[#161616] → bg-[#131313] (user supplied
the exact hex this time). Dropped the now-inaccurate "same gray as ContactSection cells"
comment since #131313 is its own value, not the ChannelCard #161616. Verified live /career:
all 12 quote cards compute rgb(19,19,19); zero stale bg-[#161616] left. tsc 0. Not committed.

## 2026-07-20 — career WhyJoinUs: widen the "Competitive Comp" bento card
User pointed at the narrow card in row 2 of the Benefits bento (career page). Widening it necessarily narrows its row-mate, so asked; user chose 40/60.
Implementation: grid md:grid-cols-3 → md:grid-cols-5, and re-spanned all four cards so each row still totals exactly 5 (a short row would wrap a card). Row 1: Flexible 2→3, Creative 1→2. Row 2: Competitive Comp 1→2, Learning 2→3. Competitive Comp goes 33% → 40% of the row.
Side effect worth knowing: row 1's ratio also shifts (67/33 → 60/40) — unavoidable, since a 5-col grid can only split 3+2 or 4+1, and 3+2 is nearest the original. Mobile is untouched (grid-cols-1, spans are all md:-prefixed).
NOTE: the file had been edited on disk by the user mid-task; the edits applied cleanly but I re-grepped the spans afterwards rather than trusting my stale read. Verified: spans total 5 per row ✓, tsc ✓, biome ✓, next build ✓. 1 file. Not committed.

## 2026-07-20 — career page: add OurValuesSection between OpenPositions and PerksSection
Inserted `<OurValuesSection />` in src/app/career/page.tsx between OpenPositions and PerksSection. The component lives in components/about/ and is reused as-is (no copy) — the career page already cross-imports OurTeamSection from about/, so this follows the existing convention; import placed after OurTeamSection to keep biome's path sort order.
Wrapped in `[&>section]:py-16 md:[&>section]:py-24` to match the career page's per-section spacing pattern; 24 on md matches the pt-24/pb-24 of both neighbours (OpenPositions and PerksSection), so the rhythm is unbroken. Component's own section already carries bg-black + py-20/md:py-32.
Verified: git diff shows exactly 2 hunks (import + block, no collateral), tsc ✓, biome ✓ (import order accepted), next build ✓. 1 file. Not committed.

## 2026-07-20 — WorkProjectShowcase inactive-card dim softened
work/WorkProjectShowcase.tsx:193 — non-hovered cards' filter
`brightness(0.3) grayscale(80%)` → `brightness(0.65) grayscale(25%)`. The old value dropped
70% of luminance AND desaturated 80%, which is why inactive cards read as black & white;
new value keeps a clear focus falloff without going monochrome. (Separate from the hovered
card's own bg-black/35 legibility scrim — untouched.)
Verified: tsc 0; source has only the new value, no stale one; live /work at rest shows no
brightness/grayscale filter on any card (dim is hover-only, 2 decorative blur layers only);
scanned all 27 served client scripts — `grayscale(25%)` present, `grayscale(80%)` absent, so
the new value is what ships. Hover appearance itself needs user's eyes (pane can't drive
framer hover).
NOTE: user's dev server was down mid-task (curl 000 / blank doc); restarted via
preview_start {name:"dev"} and it came back 200. Not committed.

## 2026-07-20 — work page: ET→CtaSection gap reduced
Measured /work @1280: gap between ExperimentalTestimonials and CtaSection was 304px, and it
is entirely TechLogoCarousel (which sits between them): pt 64px + logos ~112px + pb 128px.
CtaSection's wrapper is already md:pt-0, so the lever is the carousel's md:pb-32. Since
TechLogoCarousel is SHARED (contact/brand-strategy/etc.), scoped the change to the work page
with the codebase's `[&>section]` wrapper idiom: wrapped it in
`<div className="md:[&>section]:pb-20">` (128px → 80px). Mobile py-16 untouched.
Verified live: /work carousel padding-bottom 80px, ET→CTA gap 304 → 256px; /contact carousel
still 128px (shared component unaffected elsewhere). tsc 0, biome clean. Not committed.

## 2026-07-20 — Contact hero: pattern → background video, de-carded like WorkHeroSection
contact/ContactHeroSectionTwo.tsx rebuilt shell only, foreground untouched:
 - REMOVED SpotlightGrid (import + usage) and the rounded-[20px]/border-zinc-800/50 card
   framing + px-3 gutters + pt-24/pb-16 white shell.
 - Section is now `relative flex min-h-screen w-full flex-col overflow-hidden bg-black`,
   mirroring WorkHeroSection's full-bleed treatment.
 - Added full-bleed <video src="/assets/video3.mp4" autoPlay loop muted playsInline
   className="absolute inset-0 z-0 h-full w-full object-cover"> + a z-[1] left-weighted
   scrim (black/75→/50→/30) for copy legibility.
 - Chose video3.mp4 (previously unused) because the FOREGROUND card already plays hero.mp4 —
   avoids the same clip running twice on screen.
 - Header now <Header onDark /> (was light-on-white-strip) since it overlays dark footage,
   same as WorkHeroSection. NOTE: this supersedes the earlier "keep the contact header bg
   white" task — flagged to user.
Foreground kept verbatim: headline (Let's build/something/great.) + click-to-play hero.mp4
card with play button.
Verified live /contact: hero padding 0 / radius 0 / border 0, width 1265 = viewport, height
720 = full screen, top offset 0 (no white strip) and #contact resumes at 720; bg video src
video3.mp4 readyState 4, muted, object-fit cover; spotlight grid absent; headline + play
button intact; header logo = logo.png (light onDark variant). tsc 0, biome 0 findings
(removed an ineffective biome-ignore I'd added — muted video doesn't trigger useMediaCaption).
Motion/appearance needs user's eyes. Not committed.

## 2026-07-20 — Contact page spacing aligned to the about/work convention
Audited the 4 components across pages. /about and /work agree on the convention (they use the
same [&>section] wrapper system); the service pages (brand-strategy family) use a different
bare/p-3/space-y-10 scheme and were excluded as not comparable.
  ET:       about pt-16 pb-6 md:pt-24 md:pb-10 | work same but md:pt-26
  Carousel: about bare | work md:pb-24 (one-off I added on request)
  Cta:      about+work BOTH `px-3 [&>section]:py-16 md:pb-24 md:pt-0`  ← consensus
  Faq:      about `py-16 md:pb-24 md:pt-3` | work `py-16 md:pb-30 md:pt-0`
Contact diverged on Cta (`py-10 md:pt-0`) and Faq (`pt-0 md:pb-10`); ET was 8px off (pt-26).
Changed 3 wrappers in src/app/contact/page.tsx to the about values (the file's own header
comment states "Section spacing mirrors the about page", so about is the stated reference):
 ET md:pt-26 → md:pt-24; ContactFaqSection → [&>section]:py-16 md:pb-24 md:pt-3;
 CtaSection → px-3 [&>section]:py-16 md:pb-24 md:pt-0. TechLogoCarousel already bare = about.
Kept contact's FAQ-before-CTA order (task was spacing only, not ordering).
Verified live @1280 by measuring computed section padding on /about then /contact:
 ET pt96/pb40, Carousel pt64/pb128, Faq pt12/pb96, Cta pt0/pb96 — all 4 identical, 0
 mismatches. tsc 0; biome findings on the page are pre-existing boilerplate (unused React
 import, unused Props type, {}: any) on lines 1-12, untouched by this diff. Not committed.

## 2026-07-20 — CareerHeroSection: outline the quote mark, lighten the quote text
In the carousel's `item.type === "quote"` card: the big “ glyph was a SOLID brand gradient (bg-linear-to-r + bg-clip-text + text-transparent). Swapped to an outline — dropped the gradient/bg-clip classes, kept `text-transparent` for the fill, and added `WebkitTextStroke: "1.5px #2E5BFF"` inline (Tailwind has no text-stroke utility). Quote body `font-medium` → `font-light`, matching the site-wide description weight normalization done earlier.
Chose text-stroke on the existing glyph over swapping in lucide's outline `Quote` icon: it keeps the exact typographic mark, size and position, so only the fill/stroke changes.
Comment placed as a JSX child, NOT in expression position — the `{cond && ( {/* … */} <div>` shape is the parse error hit three times in this session.
Verified: tsc ✓, biome ✓, next build ✓. 1 file. Not committed.
TRADEOFF for user review: an outlined glyph can't carry the blue→cyan gradient (that needs a fill), so the stroke is solid #2E5BFF. Say the word if you want white instead, or a different stroke width.

## 2026-07-20 — Contact page spacing tightened (~29%)
Follow-up: the about-matched spacing read too airy. Reduced the 4 big paddings in
src/app/contact/page.tsx (desktop, md@1280):
  ExperimentalTestimonials  pt 96→64, pb 40→32   (md:pt-24→pt-16, md:pb-10→pb-8; base pt-16→pt-12)
  TechLogoCarousel          pb 128→80            (was bare; added page-scoped
                                                  `md:[&>section]:pb-20` wrapper — shared component)
  ContactFaqSection         pb 96→64             (py-16→py-12, md:pb-24→pb-16; md:pt-3 kept)
  CtaSection                pb 96→64             (py-16→py-12, md:pb-24→pb-16; md:pt-0 kept)
Total padding across the 4: 532px → 380px (−152px, −29%).
NOTE: this intentionally diverges from /about again (previous task had matched it exactly) —
contact is now tighter than the about/work convention. Flagged to user; can propagate the
tighter values to about/work if they want it site-wide.
Verified live /contact @1280 with md active: et pt64/pb32, carousel pt64/pb80, faq pt12/pb64,
cta pt0/pb64. (First measurement attempt reported viewport 0 = base/mobile values; re-measured
after layout settled.) tsc 0. Not committed.

## 2026-07-20 — Footer: expand the link lists, anchor-link what has no page
Modelled on the user's reference-footer screenshot. Footer went from 9 links (6 of them broken: 5 dead `#` + `/services` which 404s) to 12, all resolving.
Col1: Home /, About /about, Culture /about#culture, Meet The Team /about#team, Careers /career, Blog & Resources /blog.
Col2: Services /home#services, Work /work, Testimonials /home#testimonials, Processes /brand-strategy#process, FAQs /brand-strategy#faq, Contact /contact.
Per the "if the pages aren't there, link to sections on other pages" instruction, added section anchors to 5 components that had none: home/ServiceSection id="services", home/ExperimentalTestimonials id="testimonials", about/OurValuesSection id="culture", brand-strategy/ProcessSection id="process", brand-strategy/FaqSection id="faq". Reused the pre-existing about/OurTeamSection id="team".
Home anchors deliberately use /home#… not /#…: src/app/page.tsx is a redirect() to /home, and a fragment is not guaranteed to survive a redirect hop.
Dropped from the reference: "Sectors" and "Hex Test" (no equivalent content — refused to invent). Dropped existing "Webinars" (was a dead `#`, no webinar content anywhere).
Verified with a script that resolves EVERY href — checks the route file exists AND that the anchor's owning component is actually rendered by that page. All 12 pass. One false positive investigated and cleared: the script attributed id="services" to garbage/ServiceSection2.tsx (alphabetically first) — that file is unused/dead, the real owner is home/ServiceSection rendered at home/page.tsx:210, so no duplicate id on any rendered page. tsc ✓, biome ✓, next build ✓. 6 files. Not committed.
OPEN: the 3 social icon hrefs are still "#" — left alone, real profile URLs unknown. Also UNVERIFIED: hash-jump behaviour under Lenis smooth scroll (home wraps in SmoothScroll) — needs the user to click the anchor links.

## 2026-07-20 — blog: match BlogHeroSection's x-padding to BlogFeaturedSection
Analysis: both outer <section>s ALREADY share `px-3`, so the page gutter was never the mismatch. The difference was inside the black card — Featured's content wrapper uses `p-6 md:p-10 lg:p-14` (x = 24/40/56) while the hero card used `px-6 md:px-12 lg:px-16` (x = 24/48/64). Base matched; md and lg were 8px wider on the hero.
Fix: hero inner card `md:px-12 → md:px-10`, `lg:px-16 → lg:px-14`. Y padding deliberately untouched (`py-12 md:py-16 lg:py-20`) — the task was x-axis only, and Featured's is a symmetric p-* so copying it wholesale would have changed the vertical rhythm too.
Verified: greped both files post-edit — hero inner now px-6/md:px-10/lg:px-14 matching Featured's 24/40/56, outer sections both px-3. tsc ✓, biome ✓, next build ✓. 1 file, 2 tokens. Not committed.

## 2026-07-20 — blog: match BlogListSection's x-padding to ExperimentalTestimonials
ExperimentalTestimonials puts its gutter on the inner wrapper as `px-4 md:px-10` (the site-standard gutter); BlogListSection used a flat `px-6` with no md step on THREE separate wrappers — the header, the category filter row, and the post grid. All three now `px-4 md:px-10`, so the section narrows slightly on mobile (24→16px) and widens on desktop (24→40px), lining the blog cards up with the testimonials block and the rest of the site.
Neither component puts px on its own <section> — the gutter lives on the inner wrappers in both — so the structural pattern already matched and only the values changed. Left px-5/px-3 on the category pills and card tags untouched (component padding, not gutters).
Verified: greped for leftover `px-6` (none remain) and confirmed all three gutters read px-4 md:px-10. tsc ✓, biome ✓, next build ✓. 1 file. Not committed.

## 2026-07-20 — blog: align BlogHeroSection + BlogListSection x-padding to CtaSection
Key finding: CtaSection's x-inset comes from TWO stacked layers, not one — the blog page wraps it in `px-3` (blog/page.tsx:13) and its own card content is `px-4 md:px-10`. Its text therefore lands at 12+16 = 28px base / 12+40 = 52px md. Matching only the inner `px-4 md:px-10` would have left both sections 12px short, which is exactly why the previous "match ExperimentalTestimonials" pass (16/40) still looked misaligned against the CTA.
BlogHeroSection: already had section px-3 (same structure as CTA), so only the card content changed — `px-6 → px-4`, and dropped `lg:px-14` since CtaSection has no lg x-step. Text now 28/52.
BlogListSection: has no card and had no section px, so added `px-3` to its <section> (bg stays full-bleed; only content moves in) on top of the three inner `px-4 md:px-10` wrappers from the previous task. Text now 28/52.
Both sections' y-padding untouched. Verified by reading the values back: CTA px-3 + px-4/md:px-10; hero px-3 + px-4/md:px-10 with no lg step; list px-3 + 3 wrappers at px-4/md:px-10. tsc ✓, biome ✓, next build ✓. 2 files. Not committed.
NOTE: the `//` comment added inside BlogListSection's JSX opening tag is valid (comments are allowed between attributes) — distinct from the `{/* */}`-in-expression-position error that broke the build three times earlier this session. Build confirms.

## 2026-07-20 — blog: Featured → CtaSection parity, List → ExperimentalTestimonials parity
BlogFeaturedSection → CtaSection (28px base / 52px md text inset): section already had px-3 matching CTA's page wrapper, so only the card content changed. It was a SYMMETRIC `p-6 md:p-10 lg:p-14`, so had to be split into axes to touch x only → `px-4 py-6 md:px-10 md:py-10 lg:py-14` (y values preserved exactly; lg x-step dropped since CtaSection has none).
Also moved the absolutely-positioned top pills from `left-8 md:left-14` to `left-4 md:left-10`. JUDGMENT CALL, flagged to user: not strictly "section padding", but the pills sit on the same card and were already 8/16px out of step with the content; leaving them would have widened that gap to 16px and made the card look worse after an alignment task. Trivially revertible.
BlogListSection → ExperimentalTestimonials (16/40): REVERTED the `px-3` I added to its <section> in the previous task. ExperimentalTestimonials puts no px on its section — the gutter is only the inner `px-4 md:px-10` — so the section px had to go. Three inner wrappers (header/filters/grid) confirmed still at px-4 + md:px-10.
Net: the blog page now deliberately has TWO x-lines — hero + featured + CTA at 28/52 (card-based, sit inside the px-3 page gutter), list at 16/40 (no card, full-bleed dark bg). Per user's explicit instruction.
Verified by reading values back from all four files; tsc ✓, biome ✓, next build ✓. 2 files. Not committed.

## 2026-07-20 — ContactHeroSectionTwo: remove the foreground video, keep the background one
The hero had TWO videos: the full-bleed background `/assets/video3.mp4` (absolute inset-0, z-0) and a foreground card `/assets/hero.mp4` in the right column with a click-to-play button. Removed the foreground card, kept the background.
Removal wasn't just the JSX block — the card owned all the playback state, so also deleted `videoRef`, `isPlaying`, `togglePlay`, the play <button> + its svg, and the now-unused `useRef, useState` import (biome would have failed on the unused vars otherwise). Left column dropped `md:w-3/5` so the headline spans full width; stale "Left: content" comment retitled. `premiumEase`, `reduce` and `motion` are all still used by the headline animation, so they stay.
Verified: greped the file — only video3.mp4 remains, zero references to videoRef/isPlaying/togglePlay/useState/useRef. tsc ✓, biome ✓ (no unused-import errors), next build ✓. 1 file. Not committed.
NOTE: /assets/hero.mp4 may now be unreferenced — checked src/ for other usages; see command output in that session step.

## 2026-07-20 — ContactHeroSectionTwo: bigger headline, constrained to 70% width
Follow-on from removing the foreground video (the headline had been left spanning full width after the right column went away).
Width: content div `w-full` → `w-full md:w-[70%]`. Kept full width below md — 70% of a phone viewport would be unusably narrow for a 4rem headline.
Size: text-[3.5rem] → text-[4rem]; sm:text-[4.5rem] → sm:text-[5.25rem]; lg:text-[6.5rem] → lg:text-[7.5rem] (~15% up across the board, keeping the existing three-breakpoint ramp).
Verified: tsc ✓, biome ✓, next build ✓. 1 file. Not committed.
CAVEAT: the headline is `flex flex-col` with three HARD-CODED spans ("Let's build" / "something" / "great."), so it does NOT reflow — the 70% box constrains the container but cannot rewrap the lines. At lg:7.5rem the longest line ("Let's build") is roughly 700px against ~918px available on a 1440px viewport, so it should fit, but this is arithmetic not observation. If it clips on a narrower desktop, drop lg to 7rem.

## 2026-07-20 — ContactHeroSectionTwo: rephrase headline so it actually fills the 70% column
Root problem from the previous task: the headline was three HARD-CODED spans ("Let's build" / "something" / "great."), so the md:w-[70%] box constrained it but could never make it fill — the breaks were fixed regardless of viewport, leaving a ragged short-line block.
Fix: copy → "Let's build something worth talking about." (was "Let's build something great."), and the markup now maps over WORDS instead of lines. Each word is an inline-block motion.span with mr-[0.22em], inside a plain (non-flex) h1, so the text wraps naturally and fills the 70% column at ANY viewport by construction rather than by tuned character counts.
The staggered reveal survives — stagger moved from per-line to per-word, reusing the existing `line` variant and headlineContainer unchanged, so timing/easing are identical. Words are pre-keyed at module level (`headline-${i}-${word}`) following the Footer's brandLetters convention, since this project avoids raw array-index keys.
Removed `flex flex-col` from the h1 (it would have blocked normal text wrapping). Stale "Headline — two lines" comment updated.
Verified: tsc ✓, biome ✓ (no key lint), next build ✓. 1 file. Not committed.

## 2026-07-20 — CareerHeroSection: swap the quote glyph for the ExperimentalTestimonials icon
The carousel quote card used a typographic “ glyph outlined via WebkitTextStroke (from an earlier task). Replaced it with the inline two-path outlined-quote SVG that ExperimentalTestimonials uses (viewBox 0 0 24 24, fill none, stroke currentColor, strokeWidth 1, round caps/joins) — both `d` strings copied verbatim.
Kept in flow at the top of the card (not absolutely positioned top-right like the testimonials card) since the task was to swap the icon, not relayout. Sized `h-10 w-10 md:h-12 md:w-12` to land near the old glyph's 48/60px optical size, plus `shrink-0` so the flex column can't squash it. Stroke is currentColor so colour comes from `text-[#2E5BFF]`, preserving the brand-blue outline chosen earlier; the testimonials copy uses text-black/10 because it sits on a white card, which would be invisible on this #131313 one.
Verified: greped both files and confirmed the two path `d` strings are byte-identical; confirmed zero WebkitTextStroke/“ left. tsc ✓, biome ✓ (title element present, no a11y complaint), next build ✓. 1 file. Not committed.

## 2026-07-20 — brand-strategy CtaSection: no mask, glow sweeps left-to-right
SpotlightGrid is shared by 9 consumers (8 identical CtaSections + BlogHeroSection, which still needs its mask), so rather than change the shared default I added an opt-in `sweep?: boolean` (default false). With sweep=false every existing consumer's code path is byte-for-byte the behaviour it had.
sweep=true does two things: (1) the radial reveal mask is not applied at all, so every grid cell stays visible; (2) the rAF loop early-returns into a different driver — a head column advances left→right as `((t*1.2) % (COLUMNS+4)) - 2` and wraps, starting/ending 2 columns outside the grid so the band enters and exits cleanly instead of popping on at the edges. getIntensity gains a sweep branch that measures distance on the COLUMN axis only, so a whole column lights together and the wave marches across one column at a time.
useMotionTemplate for the mask is now built unconditionally into a `maskImage` const and only applied when !sweep — hooks can't be called inside a branch. `sweep` added to the effect's dep array.
Per user's scope choice, only brand-strategy/CtaSection opted in: `<SpotlightGrid speed={4} sweep />` (maskRadius/travel dropped as they're unused in sweep). The other 7 CtaSections and BlogHeroSection keep the spotlight+mask.
Verified: greped all 9 call sites — exactly one passes `sweep`, the rest unchanged. tsc ✓, biome ✓, next build ✓. 2 files. Not committed.
NOTE: under prefers-reduced-motion the effect early-returns so focus stays null — in sweep mode that now renders a static unlit grid (previously the mask hid everything). Visible but motionless, which seems the better reduced-motion result.

## 2026-07-20 — brand-strategy CtaSection: drop the block-out overlay to 50% so the sweep shows through
Follow-up to the sweep change — the new left-to-right animation was being hidden. Culprit was NOT SpotlightGrid's own scrims but CtaSection's local "TEXT BLOCK-OUT LAYERS (Z-5)": two full-strength black gradients (from-black via-black/90 → transparent across the left 3xl, and from-black via-black/95 up 48px from the bottom) sitting between the grid and the text.
Added `opacity-50` to their shared wrapper rather than editing each gradient stop — halves both layers uniformly in one token and keeps their shapes/direction intact. Comment updated to record why the 50% is there, so it doesn't get "fixed" back later.
Scoped to brand-strategy only, consistent with the sweep change; greped the other 7 CtaSections and confirmed their z-[5] wrappers are untouched (they still have the full mask/spotlight effect these scrims were tuned for).
Verified: tsc ✓, biome ✓, next build ✓. 1 file, 1 token. Not committed.
TRADEOFF: those gradients exist for text legibility over the grid. At 50% the heading and footer CTA now sit on a lighter backdrop — needs the user's eyes to confirm contrast is still acceptable, especially as a lit column sweeps under the text.

## 2026-07-20 — brand-strategy CtaSection: left gradient back to full strength
Previous task put BOTH block-out gradients inside one `opacity-50` wrapper, which also halved the left fade the heading sits on. Split them into two z-[5] siblings instead of one wrapper:
- Left fade (inset-y-0 left-0, max-w-3xl, from-black via-black/90 → transparent): FULL strength, no opacity class. The largest type sits on it.
- Bottom fade (inset-x-0 bottom-0, h-48, from-black via-black/95 → transparent): keeps `opacity-50` so the sweeping grid still reads through the right of the card.
Both gradients' colours, directions and geometry are unchanged from the original — only the opacity grouping moved. Comments record why they're siblings rather than nested, so the wrapper doesn't get reintroduced.
Still brand-strategy only: greped the other CtaSections, each still has its single original z-[5] wrapper.
Verified: tsc ✓, biome ✓, next build ✓. 1 file. Not committed.

## 2026-07-20 — brand-strategy CtaSection: slow the sweep
Sweep rate is speed*1.2 columns/sec over a COLUMNS+4 = 14-column cycle, so a full pass = 11.667/speed seconds. At speed={4} that was ~2.9s — too quick to read. Dropped to speed={1.5} → ~7.8s per pass.
Changed the PROP, not SpotlightGrid's internal 1.2 constant, so the timing change is scoped to this one instance and any future sweep consumer still gets the default cadence. Added a comment with the resulting seconds so the number isn't opaque.
Greped all 9 call sites: only brand-strategy differs; the other 7 CtaSections and BlogHeroSection remain speed={4} with their mask props.
Verified: tsc ✓, biome ✓, next build ✓. 1 file, 1 value. Not committed.
Tuning reference for future asks: speed 4 ≈ 2.9s, 2 ≈ 5.8s, 1.5 ≈ 7.8s, 1 ≈ 11.7s per full left-to-right pass.

## 2026-07-20 — SpotlightGrid sweep: one box at a time in reading order
Previous sweep lit a whole COLUMN band moving left→right. User wants a single box travelling left→right AND top→bottom, so the driver now walks the FLAT row-major index instead of a column position — index order already is left→right along a row then down to the next, so reading-order traversal falls out for free.
Changes (all inside the `sweep` branch; non-sweep path untouched):
- New `sweepHead` state (float index of the leading lit cell), separate from `focus` which stays null in sweep mode.
- tick: `setSweepHead((t * SWEEP_CELLS_PER_SEC) % (TOTAL_ITEMS + SWEEP_TRAIL))`. The period overruns the grid by SWEEP_TRAIL so the tail fades fully off cell 79 before restarting at cell 0, instead of wrapping mid-tail.
- getIntensity: sweep branch moved ABOVE the `if (!focus) return 0` guard — that guard would otherwise blank the whole grid now that focus is never set in sweep mode. Lights only cells BEHIND the head (`behind = sweepHead - index`, 0..SWEEP_TRAIL), so the head box is brightest with a short fading tail; nothing lights ahead of it.
- New module constants SWEEP_CELLS_PER_SEC = 6, SWEEP_TRAIL = 4.
At CtaSection's speed={1.5} the light advances 9 cells/sec → ~9.3s for a full 80-cell pass.
Verified: read the final logic back (bounds, wrap, guard order); sweepHead初 -1 means nothing lights pre-first-frame and under reduced-motion. tsc ✓, biome ✓, next build ✓. 1 file. Not committed.

## 2026-07-20 — brand-strategy CtaSection: sweep made very slow
speed 1.5 → 0.3. Rate is speed * SWEEP_CELLS_PER_SEC(6), so 9 → 1.8 cells/sec: each box now holds a little over half a second (0.56s) and a full 80-box pass takes ~47s (was ~9s).
Changed the instance PROP again rather than SWEEP_CELLS_PER_SEC, so the shared default cadence is preserved for any future sweep consumer. Comment carries the derived numbers.
Verified: greped all 9 call sites — brand-strategy is speed={0.3}, the other 8 all still speed={4} (checked by counting non-matches: 0). tsc ✓, biome ✓, next build ✓. 1 file, 1 value. Not committed.
Tuning table (cells/sec = speed*6; full pass = 84/rate): 1.5 → 9/s, ~9s. 0.5 → 3/s, ~28s. 0.3 → 1.8/s, ~47s. 0.15 → 0.9/s, ~93s.

## 2026-07-20 — SpotlightGrid: sweepStart prop; brand-strategy CTA starts at the 3rd box
New `sweepStart?: number` (default 0) = the flat index the traversal begins from. Three coordinated changes, all inside the sweep path:
- getIntensity: `if (index < sweepStart) return 0` — cells before the start never light, including as tail. Without this the 4-cell tail would still bleed backwards onto boxes 0-1.
- driver: period = TOTAL_ITEMS - sweepStart + SWEEP_TRAIL and head = sweepStart + (…% period), so on wrap the head returns to sweepStart rather than index 0, and the cycle isn't lengthened by cells it no longer visits.
- sweepStart added to the effect dep array.
brand-strategy CtaSection now `<SpotlightGrid speed={0.3} sweep sweepStart={2} />`. Default 0 means the 8 other consumers are behaviourally untouched (verified: all 8 still speed={4}, none pass sweep/sweepStart).
Scope note: this skips the first two boxes of the TOP ROW only — later rows still traverse their columns 0-1 normally, which matches "start from the third box" literally. If the intent was for every row to skip the two columns hidden under the left gradient, that's a different change (a per-row column floor) — flagged to user.
Verified: read the sweep branch back; tsc ✓, biome ✓, next build ✓. 2 files. Not committed.

## 2026-07-20 — SpotlightGrid: sweep confined to a cell rectangle (replaces sweepStart)
Request needed a REGION, not a linear offset, so last task's `sweepStart` is replaced by four inclusive bounds: sweepColStart/sweepColEnd/sweepRowStart/sweepRowEnd (defaults cover the whole grid, so the 8 non-sweep consumers are untouched).
Deliberately kept them as four PRIMITIVE props rather than one `sweepBounds` object — an inline object literal would be a new identity every render and retrigger the rAF effect through its dep array every time.
- getIntensity: derives r/c from the flat index, returns 0 outside the rectangle, then converts to an ORDINAL within the region — `(r - rowStart) * regionCols + (c - colStart)` — so traversal is left→right then top→bottom *inside* the region.
- driver: cycle length is now regionCount + SWEEP_TRAIL, not the whole grid, so the light doesn't idle through cells it never visits.
brand-strategy CtaSection: sweepColStart={2} sweepRowStart={2} sweepRowEnd={5}. Grid is 8 rows (TOTAL_ITEMS 80 / COLUMNS 10) so 3rd-from-bottom = index 5; colEnd left at default 9 since no right bound was specified.
Math verified by hand: region = 8 cols x 4 rows = 32 cells; ordinal 0 = (row2,col2) = 3rd from left & top; ordinal 31 = (row5,col9) = last box on the 3rd row up from the bottom. period 36 at 1.8 cells/s → ~20s per pass.
Caught mid-task: first edit referenced a nonexistent ROWS_FROM_BOTTOM constant (ROWS isn't exported from SpotlightGrid) — replaced with the literal 5 plus a comment deriving it.
Verified: greped for stale `sweepStart` (none left anywhere); tsc ✓, biome ✓, next build ✓. 2 files. Not committed.

## 2026-07-20 — SubServices: last card now hides the previous card's image
Symptom: every card's image faded out as the next one stacked over it, EXCEPT the 3rd card when the 4th (last) stacked.
Root cause was NOT the fade logic but the tracker's clock. `useScroll({offset: ["start start","end end"]})` reaches progress 1 when the container's bottom meets the VIEWPORT bottom, and `useMotionValueEvent(…, "change")` stops firing once the value is pinned at 1. But the last card only reaches its pin line much later — it sticks only while containerBottom >= 5vh + cardHeight (~645px on a 900px viewport), i.e. well after containerBottom passed 900. So the progress had already saturated and the tracker was dead by the time the last card pinned; activeIndex never reached 3, so card index 2's `imageHidden={activeIndex > 2}` never became true.
Fix: offset → ["start start", "end start"], so the range runs until the container's bottom clears the viewport TOP and change events keep firing through the whole pinning sequence. Safe because scrollYProgress is used ONLY as the tracker's tick (verified by grep: 2 references, the useScroll and the useMotionValueEvent) — nothing visual is driven by its value, so widening the range changes no animation.
Note the last card's pin window is only ~8px of scroll (container ends right after it), which is why the render/tracker agreement matters — but since rect.top keeps decreasing after unstick, `rect.top <= pinTop + 2` stays true and activeIndex latches at 3.
Verified: tsc ✓, biome ✓, next build ✓. 1 file, 1 value. Not committed.

## 2026-07-20 — BlogHeroSection: adopt the CtaSection sweep animation
Was `<SpotlightGrid speed={4} maskRadius={950} travel={0.35} />` (radial reveal mask + Lissajous wander). Now `<SpotlightGrid speed={0.3} sweep />` — no mask, glow steps one box at a time left→right / top→bottom, same speed as the brand-strategy CTA. maskRadius/travel dropped since sweep ignores them.
Deliberately did NOT copy the CTA's sweepColStart/sweepRowStart/sweepRowEnd: those bounds exist to keep the light clear of the CTA card's full-strength LEFT gradient, which this hero doesn't have. The hero's only scrim is a bottom fade (h-2/3 from-black via-black/80), so the full-grid sweep is the right analogue — the top third reads clearly and the lower rows dim naturally under the existing fade.
Verified: greped all 9 call sites — exactly 2 now in sweep mode (blog hero + brand-strategy CTA), the other 7 CtaSections still speed={4} with mask props. tsc ✓, biome ✓, next build ✓. 1 file. Not committed.
OPEN for user: if the bottom fade swallows too much of the sweep, the fix is bounding it to the visible top rows (e.g. sweepRowEnd={2}) rather than weakening the scrim.

## 2026-07-20 — BlogHeroSection: scrim switched to CtaSection's left→right gradient
Hero had a single bottom-up scrim (inset-x-0 bottom-0, h-2/3, bg-gradient-to-t from-black via-black/80). Replaced with CtaSection's left gradient verbatim: `inset-y-0 left-0 z-[5] w-full max-w-3xl bg-gradient-to-r from-black via-black/90 to-transparent` — greped both files, the class string is byte-identical.
One layer in, one layer out (not additive): the hero now has NO bottom fade, unlike CtaSection which pairs its left gradient with a dimmed h-48 bottom one. Kept it to a single scrim because the task asked to make the hero's gradient left→right, not to add a second layer.
Verified: gradient parity by grep; confirmed no `bg-gradient-to-t` remains in the hero. tsc ✓, biome ✓, next build ✓. 1 file. Not committed.
WATCH: the headline sits at the BOTTOM of this card (flex justify-end) and runs to text-[7rem] at lg, so its right-hand words now extend past the max-w-3xl gradient onto the raw grid. Previously the h-2/3 bottom fade covered exactly that area. If legibility drops at the bottom-right, re-add CtaSection's dimmed bottom fade alongside rather than widening the left one.

## 2026-07-20 — BlogHeroSection: confine the sweep to an inset rectangle
Was a full-grid sweep; now bounded: sweepColStart={3} sweepRowStart={3} sweepRowEnd={6}. Grid is 8 rows (TOTAL_ITEMS 80 / COLUMNS 10), so "second last row" = index 6; "4th from left/top" = index 3 each. colEnd left at its default 9 — no right bound was specified, so the light still runs to the right edge.
Region = 7 cols x 4 rows = 28 cells; ordinal 0 lands on (row 3, col 3) and ordinal 27 on (row 6, col 9). Period 32 at 1.8 cells/sec → ~17.8s per pass (was ~47s over the full 80-cell grid, so it cycles noticeably more often now).
Reuses the sweepColStart/RowStart/RowEnd props added for CtaSection — no component change needed, just the call site. The two sweep consumers now carry different regions (CTA 2/2/5, hero 3/3/6), which is expected: each is tuned to its own scrim.
Verified: read both sweep call sites back; confirmed the other 7 CtaSections still mask-mode at speed={4}. tsc ✓, biome ✓, next build ✓. 1 file. Not committed.

## 2026-07-20 — BlogHeroSection: re-bound the sweep region
sweepColStart 3→1, sweepRowStart 3→2, sweepRowEnd 6→5. Grid is 8 rows, so "third last row" = index 5; "2nd from left" = index 1, "3rd from top" = index 2. colEnd still default 9 (no right bound given).
Region grows from 7x4=28 to 9x4=36 cells; ordinal 0 = (row 2, col 1), last ordinal 35 = (row 5, col 9). Period 40 at 1.8 cells/sec → ~22s per pass (was ~17.8s).
Call site only — the bounds props already existed. Verified: read the call site back; tsc ✓, biome ✓, next build ✓. 1 file. Not committed.

## 2026-07-20 — TracingBorder comet stops where the TR radius begins
ui/TracingBorder.tsx: the comet path started/ended at the 45° MIDPOINT of the top-right
corner arc (sx/sy computed via k=Math.SQRT1_2 from the arc centre), so the comet ran along
the top edge and then continued halfway around the curve before stopping. Re-anchored the
path to the tangent point where the radius BEGINS: sx = inset+W-r, sy = inset. This also
removed the awkward split TR arc (path had two half-arcs at TR) — it's now one clean arc per
corner, closing with `L sx sy Z` along the top edge. Dropped now-unused k/trCx/trCy; moved
`f()` above sx/sy.
Verified: tsc 0, biome 0 findings. `grep SQRT1_2 src/` = NONE, and scanning all 27 served
client scripts finds no SQRT1_2 → old stop point no longer ships. Geometry on a real
1185x600 card (r=18.5): stop moved from (1178.08, 6.92) mid-arc → (1165, 1.5) = exactly the
top-edge tangent (y == inset), i.e. 13.08px left / 5.42px up.
Shared component: applies to WorkProjectShowcase, BlogListSection and all 8 ProjectShowcase
copies (consistent comet everywhere). Comet is hover-driven (active={isHovered}) so the pane
can't play it — motion needs user's eyes. Not committed.

## 2026-07-20 — TracingBorder comet stops 24px before the TR radius
Follow-up: stopping exactly at the radius start was slightly too far. Moved the start/stop
point back along the top edge by a fixed `STOP_SHORT = 24`px:
  sx = max(inset + r, inset + W - r - 24)   (clamped to the TL tangent for narrow cards)
Path had to gain a leading `L (inset+W-r) inset` so the rest of the top edge into the TR arc
is still drawn — `d` also renders the STATIC corner-weighted border, so the shape must remain
a complete rounded rect; only the dash start/end moves.
Verified on a real 1185x600 card (r=18.5) by building the path and measuring it:
 comet stop (1141, 1.5) vs radius start x=1165 → exactly 24px before, y == inset (on the top
 edge); getPointAtLength(0) == getPointAtLength(len) == (1141, 1.5); measured path length
 3526.3 vs true perimeter 3526.2 → shape intact, static border undistorted.
tsc 0, biome 0. Hover-driven so motion needs user's eyes; STOP_SHORT is a one-number knob if
24px isn't the right amount. Not committed.

## 2026-07-20 — TracingBorder comet stop moved back again (24 → 48px)
Same "stop a little before" request repeated, so doubled the single knob:
ui/TracingBorder.tsx STOP_SHORT 24 → 48. Verified on the real 1185x600 card (r=18.5):
stop x 1141 → 1117 (24px further back), now 48px before the radius start (x=1165), still on
the top edge (y = inset = 1.5); path start == end; measured length still == true perimeter
(shape intact, static border undistorted). tsc 0, biome 0. Hover-driven — needs user's eyes.
Not committed.

## 2026-07-20 — TracingBorder STOP_SHORT 48 → 100px (3rd "a little before")
Same request a third time — 24px steps were ~2% of the 1145px top edge, too small to read,
so made a decisive step instead of inching. ui/TracingBorder.tsx STOP_SHORT 48 → 100.
Verified on the real 1185x600 card (r=18.5): stop x 1117 → 1065; radius starts at x=1165, so
now 100px before it = 8.7% back along the 1145px top edge. Progression: 1165 (at radius) →
1141 → 1117 → 1065.
Hover-driven, so still adjusting blind — asked user to name a target (fraction of the top
edge) or send a screenshot if this overshoots/undershoots, rather than keep bisecting.
tsc 0, biome 0. Not committed.

## 2026-07-20 — ROOT CAUSE: comet head was never stopping near the TR corner
4th identical "stop a little before" → stopped nudging and analysed the dash geometry.
FINDING: the comet is `strokeDasharray "0.25 0.75"` on pathLength=1, i.e. the visible streak
is 25% of the perimeter = 882px on a 1185x600 card. The animation ran dashoffset 1.0 → 0,
which leaves the dash spanning path [0, 0.25]: its TRAILING end at the anchor and its LEADING
end 882px further on — measured at (1002, 599), on the BOTTOM edge. So every previous
STOP_SHORT tweak (24/24/52px) only slid an 882px streak by ~1%; the head never came near the
top-right corner, which is why 4 rounds of nudging changed nothing perceptible.
FIX: shifted the dash range by one tail-length so the LEADING edge lands on the anchor —
initial strokeDashoffset 1+TAIL, animate to TAIL (applied to both halo and core paths). Now
the anchor genuinely is "where the comet stops". Reset STOP_SHORT 100 → 40 (a modest "little
before"), and updated the comment (anchor = leading-edge rest point).
Verified on the real 1185x600 card: leading edge now rests at (1125, 2) on the TOP edge,
exactly 40px before the radius start (x=1165); trailing edge at (243, 1) also on the top edge
(882px streak). Was (1002, 599) BOTTOM edge. tsc 0, biome 0.
Larger change than a nudge — flagged to user; STOP_SHORT is still the single knob. Hover-only
so needs their eyes. Not committed.

## 2026-07-20 — TracingBorder STOP_SHORT 40 → 120px
First adjustment since the leading-edge fix, so the knob now moves what the user actually
watches. ui/TracingBorder.tsx STOP_SHORT 40 → 120. Verified on the real 1185x600 card:
comet's LEADING edge rests at (1045, 2) — still on the top edge — 120px before the radius
start (x=1165) = 10.5% back along the 1145px top edge; was (1125, 2) at 40px, so it moved a
further 80px. Path length still == true perimeter (shape intact, static border undistorted).
tsc 0, biome 0. Hover-only; needs user's eyes. Not committed.

## 2026-07-20 — TracingBorder STOP_SHORT 120 → 100px (direction reversed)
User asked for "a little AFTER" (forward, toward the corner) — 120px was slightly too far
back. ui/TracingBorder.tsx STOP_SHORT 120 → 100. Target is now bracketed: 40px read as too
near the corner, 120px as slightly too far, so 100 sits just inside the far bound.
Verified on the real 1185x600 card: comet's leading edge rests at (1065, 2), still on the top
edge, 100px before the radius start (x=1165) — moved 20px forward from (1045, 2). Path length
still == true perimeter (shape intact). tsc 0, biome 0. Hover-only; needs user's eyes.
Not committed.

## 2026-07-22 — PortfolioSection: snap the horizontal scroll to each panel
Asked first — the section ALREADY force-scrolls (pinned + scrubbed 500vw track, you cannot scroll past until all panels pass), so "force scrolling" was ambiguous. User chose snap-to-panel.
Added `snap` to the existing ScrollTrigger (no new trigger, no restructure): `snapTo` maps progress to the nearest panel via `(round((value/xPhase)*steps)/steps)*xPhase`, `duration {min .15, max .4}`, `delay .08`, `ease power1.inOut`.
The critical constraint is the early return: `if (value >= xPhase) return value`. The timeline has TWO phases — horizontal movement (0→xPhase) and a one-viewport hold (xPhase→1) that exists so StatsSection can slide over the still-pinned section via `md:-mt-[100vh]`. Snapping during the hold would fight that overlap, so those values pass through unsnapped.
Verified: tsc ✓ (exit 0), next build ✓. Lint checked by DIFFING against baseline: `git show HEAD:...PortfolioSection.tsx` and the working copy report the identical issue set (noImgElement, 2x noUnusedVariables, noArrayIndexKey, noStaticElementInteractions) — my edit adds zero new violations. All are pre-existing.
DISCOVERED + recorded in the map: `bun run lint` exits 1 on a clean checkout (repo-wide pre-existing violations), and the tree is CRLF so `biome format --write` would rewrite whole files. Earlier session entries claiming "biome ✓" were per-file checks on files that happened to be clean, not project-wide passes.
UNVERIFIABLE HERE — needs the user in a browser: /home runs Lenis (`layout/SmoothScroll.tsx:21`) synced to ScrollTrigger via `lenis.on("scroll", ScrollTrigger.update)` with NO `scrollerProxy`. ScrollTrigger's snap drives the scroll programmatically, which can fight Lenis's own rAF. If snap stutters or gets undone, the fix is a scrollerProxy in SmoothScroll (or routing the snap through `lenis.scrollTo`), not tuning the snap numbers.
Also note: snap is desktop-only by inheritance — the whole block sits inside `matchMedia("(min-width: 768px)")`. 1 file. Not committed.

## 2026-07-22 — PortfolioSection: auto-advance the pinned horizontal scroll
Same request re-issued. Checked first: the snap from the previous task was still in the file, uncommitted and unreverted, so the ask was NOT "redo it". Asked what was actually wanted — user chose auto-advance (not snap, not a hard lock).
Implementation (1 file, self-contained in the existing matchMedia block):
- Drives the PAGE scroll via `st.scroll(proxy.y)` from a GSAP-tweened proxy, NOT the track. The timeline is scrubbed to scroll position, so animating the track directly would desync it from the panel snap and the `containerAnimation` text reveals.
- Target is `st.start + totalWidth` — the end of the horizontal phase only. It never scrolls into the trailing hold, which exists for the Stats `md:-mt-[100vh]` overlap.
- Duration is proportional to remaining distance (`(to-from)/totalWidth * AUTO_ADVANCE_SECONDS`), so the pace is identical regardless of how far in the section was entered. AUTO_ADVANCE_SECONDS = 6 (~1.5s/panel over 5 panels).
- Cancels on wheel/touchstart/pointerdown/keydown; skips entirely under prefers-reduced-motion; desktop-only by inheritance from the enclosing matchMedia.
- Uses a SEPARATE unpinned ScrollTrigger for onEnter/onLeave/onLeaveBack. The pinned timeline is created first, so putting these callbacks in its config would hit a TDZ error referencing handlers declared after it. Does NOT start on onEnterBack — scrolling up into the section shouldn't launch a forward tour.
- `cleanupAuto` declared outside the `if (track)` block so the existing cleanup return can reach it; kills the tween and removes all 4 listeners.
Verification method worth reusing: raw `biome check` is useless here (repo lint fails on a clean checkout AND the tree is CRLF so every file shows a format diff). Normalised BOTH the working copy and `git show HEAD:` baseline to LF with `tr -d '\r'`, then compared diagnostic category counts. First pass revealed a REAL formatting deviation I'd introduced (a 4-element array Biome wanted on one line) — fixed, re-checked, now byte-for-byte the same diagnostic set as baseline (5 pre-existing lint issues, zero format). tsc ✓ exit 0, next build ✓.
UNVERIFIABLE HERE: the Lenis conflict is now MORE acute than with snap — auto-advance sets native scroll every frame while Lenis's rAF drives its own target, with no scrollerProxy in SmoothScroll. If the tour stutters/stalls, that's the cause; remedy is a scrollerProxy or routing through lenis.scrollTo, not tuning AUTO_ADVANCE_SECONDS. Also watch snap+auto interplay: snap should stay dormant during the continuous auto scroll and is a no-op at the landing point (progress == xPhase returns unsnapped).
Map updated with both behaviours under scroll-fragile code. 1 source file. Not committed.

## 2026-07-22 — Footer: four columns of four links
Was 2 columns x 6. Four columns of four needs 16 links and only 12 existed, so I KEPT all 12 and added 4 service routes (which only came into existence recently) rather than padding or dropping anything:
- Col1: Home, About, Culture, Meet The Team
- Col2: Work, Blog & Resources, Testimonials, Careers
- Col3 (new): Web Development, Brand Strategy, UI/UX Design, App Development
- Col4: Services, Processes, FAQs, Contact
Structure: replaced the two hardcoded `footerLinksCol1/Col2` arrays with a single `footerLinkGroups` array of 4 groups, and collapsed the two duplicated column <div>s into one `.map`. The Link markup existed twice verbatim before; now once. Grid `grid-cols-2 ... lg:grid-cols-4 lg:gap-10` (was `lg:flex lg:gap-20`) — 2 cols on mobile, 4 from lg.
Group key is `group[0].name`, NOT the array index — biome's noArrayIndexKey is enabled and would have failed on the obvious `key={i}`.
Verified: scripted resolver over all 16 hrefs — checks the route file exists AND, for anchors, that the owning component is actually rendered by that page. All 16 OK, zero 404s (excluded garbage/ from the anchor-owner search this time, which had caused a false positive on #services in the earlier footer pass). Lint compared LF-normalised against `git show HEAD:` — identical diagnostic set (2 format, useValidAnchor, noUnusedImports, noUnusedVariables, noArrayIndexKey — all pre-existing). tsc ✓, next build ✓. 1 file. Not committed.
WATCH: 4 columns now sit inside the same `lg:col-span-7` that held 2. Longest label is "Blog & Resources" (~136px at 1.1rem) against roughly 169px per column at 1440 — should fit, but it is arithmetic not observation. If labels wrap, widen to lg:col-span-8 or shorten that label to "Blog".

## 2026-07-22 — Footer: wider gaps between links
Vertical (between links inside a column): `gap-4` → `gap-6` (16 → 24px) on the group div. Applies at every breakpoint; no width cost.
Horizontal (between the columns): `lg:gap-10` → `lg:gap-x-12` (40 → 48px), lg ONLY. Deliberately did not raise the mobile gap: at 375px the 2 columns are ~143px each while the longest label "Blog & Resources" is ~133px, so a wider mobile gap would wrap it. Used gap-x so the (irrelevant at lg, single-row) row gap is untouched.
Also deliberately did NOT widen the links block to buy the space: the right-hand block (`lg:col-span-5`) holds an h3 plus a `max-w-[420px]` form; dropping it to col-span-4 would take its usable width from ~469px to ~356px and visibly squeeze the newsletter. Gaps were the ask, not a re-layout.
Sizing arithmetic at 1440: outer 12-col grid with gap-12 → links block ≈743px; at gap-x-12 each column ≈ (743 − 144)/4 ≈ 150px vs the ~133px longest label, so ~17px slack remains.
Verified: greped both classes; lint compared LF-normalised against `git show HEAD:` — identical diagnostic set (2 format, useValidAnchor, noUnusedImports, noUnusedVariables, noArrayIndexKey, all pre-existing); tsc ✓; next build ✓. 1 file. Not committed.
IF MORE IS WANTED: the next step up (lg:gap-x-14 = 56px) leaves only ~11px of slack on "Blog & Resources" — going beyond that needs either lg:col-span-8 for the links block or shortening that label to "Blog".

## 2026-07-22 — Footer: more vertical gap between links
Second increase (24px was still too tight). Link gap `gap-6` → `gap-8` (24 → 32px).
Knock-on handled: the grid's mobile ROW gap between groups was `gap-10` (40px). With links at 32px the two are close enough that the four stacked groups read as one continuous list on mobile, so the grid went `gap-10` → `gap-x-10 gap-y-14` — row gap 56px, comfortably clear of the 32px link gap, while the mobile COLUMN gap stays at 40px (raising it would wrap "Blog & Resources", which is ~133px against ~143px columns at 375px).
Net gaps: links 32px vertical; groups 56px apart vertically, 40px apart horizontally on mobile, 48px from lg.
Verified: greped both classes; lint compared LF-normalised against `git show HEAD:` — identical diagnostic set, nothing new introduced; tsc ✓; next build ✓. 1 file. Not committed.
IF STILL TIGHT: gap-10 (40px) is the next step, but it would need gap-y-16/20 alongside to keep the group separation reading, and the links column then runs ~216px tall vs ~176px for the newsletter block, so the footer grows.

## 2026-07-22 — Footer: open up the newsletter column spacing
Same treatment as the link columns, applied to the right-hand block from the user's screenshot (heading / email form / social icons).
- h3 `mb-6` → `mb-10` (24 → 40px) — heading to form.
- social row `mt-8` → `mt-12` (32 → 48px) — form to icons.
- social icon pills `gap-2.5` → `gap-3.5` (10 → 14px) — the icons were the tightest thing left in that column.
The parent is `flex flex-col items-start` with NO gap class, so these mb/mt utilities are the only spacing in play — adjusted them in place rather than converting the column to `gap-*`, which would also have applied between the form's own children.
Column rhythm now roughly matches the links side (32px between links, 56px between groups).
Verified: greped both classes; lint compared LF-normalised against `git show HEAD:` — identical diagnostic set; tsc ✓; next build ✓. 1 file. Not committed.

## 2026-07-22 — Footer: dial the newsletter column spacing back a notch
Previous entry overshot. Stepped each value back ONE notch rather than reverting to the originals, so it lands between the two:
- h3 `mb-10` → `mb-8` (40 → 32px; was 24px originally)
- social row `mt-12` → `mt-10` (48 → 40px; was 32px)
- social pills `gap-3.5` → `gap-3` (14 → 12px; was 10px)
Verified: greped both classes; lint compared LF-normalised against `git show HEAD:` — identical diagnostic set; tsc ✓; next build ✓. 1 file. Not committed.

## 2026-07-22 — Footer: top-align the links and newsletter blocks
Added `items-start` to the OUTER grid (`grid grid-cols-1 ... lg:grid-cols-12`) that holds the two blocks. CSS grid defaults to align-items: stretch, so the links block and the newsletter block were being stretched to equal height; the taller one dictated both.
One class on the parent covers both children, so neither child's own classes changed — note the newsletter block already had its own `items-start`, but that is its FLEX cross-axis (horizontal alignment of its children in a flex-col) and has nothing to do with how the grid sized it. Adding it to the children would not have fixed this.
Verified: greped the parent and confirmed both children are untouched; lint compared LF-normalised against `git show HEAD:` — identical diagnostic set; tsc ✓; next build ✓. 1 file, 1 class. Not committed.

## 2026-07-22 — brand-strategy hero: title scaled down to the shared site size
Surveyed every hero's title ramp before touching anything:
- brand-strategy StrategyHeroSection: text-5xl / sm:6xl / md:[95px] / lg:[118px] / xl:[135px]  <- the largest
- work/WorkHeroSection: IDENTICAL to brand-strategy
- about + career: text-[2.75rem] / sm:6xl / md:7xl / lg:[6rem]  <- shared by two heroes, the common scale
- blog: text-6xl / sm:7xl / md:8xl / lg:[7rem]
- contact: text-[4rem] / sm:[5.25rem] / lg:[7.5rem]
Chose the about/career ramp as "the other pages'" size since it is the only one two heroes share, and it is the smaller direction the request implies (118 → 96px at lg). The xl:[135px] step is dropped, matching the reference which has no xl step.
ONLY the size utilities changed — `leading-[1em]`, tracking, colour, flex/items-center all preserved. Note about uses `leading-[1.05]`; I did NOT copy that, since the ask was size.
Scope: brand-strategy only. Verified the other 7 service StrategyHeroSection copies still carry lg:text-[118px] (grep count = 7) and work/WorkHeroSection is untouched — so /brand-strategy now differs from its 7 sibling service pages, which is a deliberate consequence of the stated scope.
Verified: greped the new class against about's ramp (identical size tokens); lint compared LF-normalised against `git show HEAD:` — identical (1 pre-existing noImgElement); tsc ✓; next build ✓. 1 file. Not committed.

## 2026-07-22 — Navbar hover pill: add the missing top shadow
Cause: the pill used Tailwind's `shadow-md`, whose BOTH layers are positive-Y (`0 4px 6px -1px`, `0 2px 4px -2px`). A +Y offset can only cast downward, which is exactly the reported symptom — bottom shadow fine, nothing on top.
Fix: kept those two layers byte-for-byte (so the bottom is unchanged, as the user said it was good) and mirrored them to -Y:
`shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-2px_rgb(0_0_0_/_0.1),0_-4px_6px_-1px_rgb(0_0_0_/_0.1),0_-2px_4px_-2px_rgb(0_0_0_/_0.1)]`
Arbitrary-shadow syntax matches existing usage in the repo (e.g. home/page.tsx section shadows).
SCOPE — fixed BOTH navbar copies, which is more than the 5 pages listed. page/resizable-navbar.tsx:218 serves the listed pages (brand-strategy/about/work/career/blog, plus contact + the 7 other service pages); ui/resizable-navbar.tsx:204 serves /home via layout/Header and had the byte-identical `shadow-md`. Left alone, the same pill would have kept the bug on the homepage only. This is a defect in a duplicated primitive, not a per-page design choice — flagged so half can be reverted if disagreed with.
Verified: greped both files — the two pills now carry an identical shadow string and no bare `shadow-md` remains on either. Lint compared LF-normalised against `git show HEAD:` for BOTH files — diagnostic sets identical in each case (all pre-existing: noStaticElementInteractions, noSvgWithoutTitle, noImgElement, noArrayIndexKey, and noUnusedFunctionParameters in the ui copy). tsc ✓; next build ✓. 2 files. Not committed.

## 2026-07-22 — brand-strategy: restore the ProcessSection overlap
Re-instates the overlap that was removed earlier in this session. No new mechanism was needed — SubServices still accepts `children` and renders them inside its sticky container at z-40 (above the cards' z 0–3); brand-strategy had simply stopped passing them.
1. src/app/brand-strategy/page.tsx — `<SubServices /><ProcessSection />` (siblings) → `<SubServices><ProcessSection /></SubServices>` (nested), matching the shape the other 7 service pages use.
2. src/components/brand-strategy/SubServices.tsx — made the TRANSFORM RESERVE conditional: `{children ? null : <div …/>}`. This was the non-obvious part. That 570px reserve exists because the last card is painted (services.length-1)*STEP below its layout box by its translateY and a transform reserves no layout space. With children nested, the overlap section is opaque (`bg-black`, verified at ProcessSection.tsx:44) and sits at z-40 above the cards, so it already covers the spill — leaving the reserve in would have added a ~570px blank black band between ProcessSection and OurTechStack.
Note the reserve exists ONLY in brand-strategy's SubServices; the 7 sibling copies are still the older pre-STEP implementation, so nothing there is affected.
Verified: greped the page composition, the conditional reserve, the intact z-40 slot, and ProcessSection's bg-black (the precondition for dropping the reserve). Lint compared LF-normalised against `git show HEAD:` — identical diagnostic set (noImgElement, 2x noArrayIndexKey, noExplicitAny — all pre-existing). tsc ✓; next build ✓. 2 files. Not committed.
UNVERIFIABLE HERE: whether the last card now holds long enough under the overlap. With children the container extends by ProcessSection's height, so the cards stay sticky through it — but the card mechanics changed since the overlap last existed (shared top:5vh + translateY staircase, container ending at the last card). Needs the user to scroll it.

## 2026-07-22 — REVERTED the brand-strategy ProcessSection overlap
Undid both halves of the previous task:
1. src/app/brand-strategy/page.tsx — back to `<SubServices />` + `<ProcessSection />` as siblings (nesting and its explanatory comment removed). ProcessSection no longer scrolls over the pinned last card.
2. src/components/brand-strategy/SubServices.tsx — TRANSFORM RESERVE back to unconditional, original comment restored. It is required again now that no children are passed: the last card is painted (services.length-1)*STEP below its layout box by its translateY and nothing else covers that spill, so without the reserve the card would bleed onto OurTechStack.
Not touched (correctly): SubServices' `children` prop and its z-40 overlap slot both PREDATE that task, so the capability remains available — re-nesting ProcessSection on the page is all it takes to bring the overlap back. The 7 sibling service pages still nest theirs and are unaffected.
Verified: greped the page composition (siblings, no comment), confirmed no `children ? null` remains, printed the restored reserve block, and confirmed the z-40 slot is still there. Lint compared LF-normalised against `git show HEAD:` — identical diagnostic set (noImgElement, 2x noArrayIndexKey, noExplicitAny, all pre-existing). tsc ✓; next build ✓. 2 files. Not committed.

## 2026-07-22 — brand-strategy: ProcessSection overlap, gated on the last card reaching the top
Asked first, because the cards rest at `top:5vh` + `translateY(i*STEP)` so the last one settles ~570px down and never literally reaches the top. User chose "card lifts to the top first" — i.e. rebuild the rise-runway behaviour and gate the overlap behind it.
SubServices.tsx:
- New `RISE = (services.length-1)*STEP` (570) and a `riseRef` runway div rendered INSIDE the sticky container, AFTER the cards and BEFORE the z-40 overlap slot. Position is the whole mechanism: inside → cards stay pinned through the lift; before the slot → ProcessSection physically cannot reach the viewport until the runway has been scrolled, so the overlap starts only once the lift is done. No timing constant involved.
- `useScroll({target: riseRef, offset:["start end","end end"]})` → 0→1 over exactly the runway's height; `useTransform` maps it to y RISE→0 for the last card only.
- Cards' staircase moved from a static `transform: translateY(...)` STRING to framer's `y` (plain number for cards 0..n-2, the MotionValue for the last). The wrapper is now a motion.div — a static transform string and framer's y both write `transform`, so they cannot coexist.
- TRANSFORM RESERVE made conditional again (`{children ? null : …}`): with children the lift ends at y=0 so there is no spill left to reserve for, and the opaque z-40 overlap covers it meanwhile. Without children it is still required.
page.tsx: `<SubServices><ProcessSection /></SubServices>`.
Reasoned through, not observed: the activeIndex tracker still reads the last card as pinned throughout the lift (rect.top only falls from 5vh+570 toward 5vh, staying ≤ its pinTop of 5vh+3*STEP), so the image fade logic is unaffected. Cards 1-3's peeking titles DO get covered once card 4 reaches the top — user explicitly accepted this.
Verified: greped element order (cards → runway → overlap; reserve outside and conditional), confirmed no static translateY string remains and both motion.div tags balance. tsc ✓; lint LF-normalised vs `git show HEAD:` identical (noImgElement, 2x noArrayIndexKey, noExplicitAny — all pre-existing); next build ✓. 2 files. Not committed.

## 2026-07-22 — REVERTED the rise-runway + ProcessSection overlap (2nd time this pairing was reverted)
Undid all six pieces of the previous task:
1. page.tsx — `<SubServices><ProcessSection /></SubServices>` back to siblings.
2. Removed the `useTransform` import.
3. Removed `RISE`, `riseRef`, the second `useScroll` (riseProgress) and `lastCardY`.
4. Removed the `y={...}` prop passed to Card.
5. Removed the rise-runway spacer div from inside the sticky container.
6. Card: motion.div → plain div, `y` param dropped, static `transform: translateY(${i * STEP}px)` restored; TRANSFORM RESERVE back to unconditional with its original comment.
Untouched (pre-existing capability): the `children` prop and the z-40 overlap slot remain in SubServices, so nesting ProcessSection on the page is still all that's needed to bring an overlap back.
Verified: greped for every remnant — RISE/riseRef/riseProgress/lastCardY/useTransform all gone; static transform string present; no `children ? null` left (reserve unconditional); page shows siblings; motion.* open/close tags balanced at 4/4 (only the content-stagger ones remain). tsc ✓; lint LF-normalised vs `git show HEAD:` identical (noImgElement, 2x noArrayIndexKey, noExplicitAny — all pre-existing); next build ✓. 2 files. Not committed.
NOTE FOR FUTURE SESSIONS: this SubServices ↔ ProcessSection overlap has now been built and reverted twice (plain nesting, then nesting + rise runway). Do not re-propose it without new direction from the user.

## 2026-07-22 — brand-strategy: OurTechStack overlaps ProcessSection
Pure CSS, page-level only — no component touched, no GSAP. The homepage does this kind of overlap with ScrollTrigger pins, but brand-strategy's page.tsx is a SERVER component; adding GSAP would have meant making it "use client". Sticky + z-index achieves the same and needs neither.
Shape: ProcessSection wrapped in `sticky top-0 z-0`, OurTechStack in `relative z-10`, both inside a shared `relative` wrapper. The shared wrapper is the important bit — it bounds how long ProcessSection sticks, so it releases once OurTechStack has passed instead of sticking for the rest of the page.
Preconditions checked rather than assumed: both sections are opaque `bg-black` (OurTechStack.tsx section, ProcessSection.tsx:44), so the higher z-index actually occludes. And sticky works here because the page wrapper is `overflow-x-clip`, NOT `overflow-x-hidden` — `clip` leaves overflow-y visible, whereas `hidden` would force overflow-y:auto and make that div the scroll container, silently killing the sticky. SubServices already sticks inside this same wrapper, which is empirical confirmation.
Verified: printed the resulting structure; tsc ✓; lint LF-normalised vs `git show HEAD:` identical (noBannedTypes, noEmptyPattern — both pre-existing, from `type Props = {}` / `({}: Props)`); next build ✓. 1 file. Not committed.
WATCH: both sections are black, so the overlap has no visible seam — it will read as ProcessSection simply holding still while content slides over. If a visible edge is wanted, the options are a rounded top (`rounded-t-[20px]`, matching the site's 20px card language) or a hairline `border-t border-white/10` on the OurTechStack wrapper. The homepage's `shadow-[0_-8px...]` trick will NOT show on black-on-black.

## 2026-07-22 — brand-strategy OurTechStack: pt-30
Added `pt-30` (120px) to the section element in src/components/brand-strategy/OurTechStack.tsx:35. The section previously had no top padding of its own — its inner div only carried `md:pb-25`.
`pt-30` is not on Tailwind's default numeric scale but is valid under v4's dynamic spacing, and the repo already relies on this (SubServices.tsx:99 uses pt-30, ProcessSection md:pb-35, StrategyHeroSection mb-15/lg:mt-25). Confirmed by grep before using it.
Scope: brand-strategy only. Verified the 7 sibling service OurTechStack copies still have zero `pt-30` occurrences, so /brand-strategy now differs from them by this padding — a deliberate consequence of the stated scope.
Verified: tsc ✓; lint LF-normalised vs `git show HEAD:` identical (1 pre-existing noImgElement); next build ✓. 1 file, 1 class. Not committed.
CONTEXT: this lands on top of the previous task's overlap — OurTechStack now scrolls over a sticky ProcessSection, so the new 120px of top padding is black space that passes over ProcessSection before the tech-stack header appears.

## 2026-07-22 — brand-strategy: fix the partial OurTechStack / ProcessSection overlap
Symptom: OurTechStack only covered about half of ProcessSection. Cause is geometric, not a z-index or timing issue.
A sticky element releases as soon as its containing block's bottom rises past it. Here the containing block is the shared wrapper, so ProcessSection stays pinned for exactly OurTechStack's OWN height of scrolling. OurTechStack's top therefore climbs only to (P - T) where P = ProcessSection height and T = OurTechStack height — it reaches 0 (full cover) only if T >= P. Worth noting a negative margin does NOT help: it shifts the start and shortens the pin by the same amount, so the final gap stays P - T.
Measured from the markup at ~1440px: P ≈ 1040px and RISING with viewport width (ProcessSection's cards are aspect-[4/4.5], so wider columns = taller images), while T ≈ 936px and essentially FIXED (OurTechStack's logo tiles are h-36). So OurTechStack was ~100px short at 1440 and further short on wider screens — matching the report.
Fix: `pb-[35vh]` on the OurTechStack wrapper to buy the missing travel, plus `bg-black` on that same wrapper — without it the padded region is transparent and would expose the pinned ProcessSection behind, i.e. the padding alone would not have worked. vh-based so it scales: checked 1440x900, 1920x1080 and 1440x700, T exceeds P in each.
Extra black space lands before ProjectShowcase, which is itself bg-black with pt-35, so it reads as section spacing rather than a gap.
Verified: printed the resulting structure; tsc ✓; lint LF-normalised vs `git show HEAD:` identical (noBannedTypes, noEmptyPattern — both pre-existing); next build ✓. 1 file. Not committed.
IF A SLIVER REMAINS on a very wide monitor, raise the pb value — the requirement is simply T >= P.

## 2026-07-20 — WorkProjectShowcase card eyebrow → brand gradient
work/WorkProjectShowcase.tsx:285 — the tag directly ABOVE the card title (the uppercase
tracking-[0.3em] eyebrow rendering project.subtitle, inside the hover-revealed block) changed
from text-zinc-400 to the brand gradient: `inline-block bg-gradient-to-r from-[#2E5BFF]
to-[#149CCB] bg-clip-text pr-[0.3em] text-transparent`.
Interpretation note: in this project "tag" has consistently meant the uppercase eyebrow above
a title (FaqSection/PerksSection/SubServices tasks), and this is the only element sitting on
top of the title — the category PILL is at the top of the card, not above the title. Flagged
to user in case they meant the pill.
Two details that matter: inline-block is required (isolated test: with it the p is 150px and
hugs the text so the gradient spans the glyphs; without it the p is block/800px and the short
eyebrow would show only a near-solid blue sliver of the gradient), and pr-[0.3em] covers the
trailing letter-spacing so bg-clip-text doesn't clip the last glyph (same class of bug fixed
earlier on the career titles).
Verified: tsc 0; biome 2 errors/1 warning all pre-existing (<img> line 210, useButtonType
line 88), none from this diff. Eyebrow is hover-only so absent from the DOM at rest —
confirmed via bundle scan of all 27 served scripts: new gradient class string present, old
`text-zinc-400` eyebrow string gone. Computed check: linear-gradient + background-clip:text +
transparent fill. Needs user's eyes on hover. Not committed.

## 2026-07-22 — CtaSection bg: randomise the sweep order (line march → scatter)
Task: "in CtaSection the bg animation is moving in a line make it random".
DISAMBIGUATION (8 CtaSections now exist): the 7 service-page copies use the Lissajous wander
(speed=4 travel=1); `brand-strategy/CtaSection` uses SpotlightGrid's `sweep` mode, which
literally marches cell-by-cell left→right along each row then drops a row — that IS the line.
It's also the main CtaSection (rendered on about, contact, blog, blog/[slug], work,
work/[slug], brand-strategy), so that's the one targeted.
Change (2 files): `ui/SpotlightGrid.tsx` gains an opt-in `scatter?: boolean`. New memo
`scatterSteps` = seeded Fisher–Yates shuffle of 0..n-1 for the sweep REGION, inverted to
"cell ordinal → step at which it lights"; getIntensity uses it instead of the row-major
ordinal. Head/tail timing (SWEEP_CELLS_PER_SEC, SWEEP_TRAIL) untouched, so pace and the
number of simultaneously-lit cells are unchanged — only WHICH cells light changes.
`brand-strategy/CtaSection.tsx` adds the `scatter` flag. BlogHeroSection also uses sweep and
was deliberately LEFT on the line march (user scoped the request to CtaSection) — one word to
enable there if wanted.
Chose a seeded shuffle over an LCG/coprime-jump permutation: verified in node that the LCG
gave a rigid alternating rhythm (only 2 distinct consecutive-distance values — a marching
constellation), while the shuffle gives 17 distinct values with just 1 adjacent hop in 31.
Verified (node, actual region cols2-9 × rows2-5 = 32 cells): deterministic across runs
(SSR-safe, no hydration mismatch), a true bijection (all 32 steps unique) so every cell still
lights exactly once per cycle — no clumping or gaps. tsc ✓; biome-format clean; 4 biome lint
errors all pre-existing (noImgElement/noSvgWithoutTitle/noArrayIndexKey), none from this diff.
`bun run build` could NOT run — "Another next build process is already running" (stale/concurrent
lock, unrelated to this change; did not kill the user's processes). Instead exercised the dev
server: /about, /contact, /brand-strategy all HTTP 200, 80 grid cells rendered, 0 error markers.
Live motion is rAF-driven → needs the user's eyes. Not committed.

## 2026-07-22 — brand-strategy: remove the gap before ProjectShowcase, keep the overlap
The pb-[35vh] added last task could NOT simply be deleted — that height IS the scroll travel that lets OurTechStack finish covering ProcessSection (sticky releases after the overlapper's own height, so T >= P is required). Removing it would have restored the half-overlap.
Fix: keep the padding in flow, cancel it in LAYOUT only. Added `-mb-[35vh]` to the shared wrapper, so ProjectShowcase is pulled up over the padded tail rather than being pushed below it. Sticky math is untouched — a wrapper's own margin does not affect the containing block's padding box, so the pin duration and therefore the overlap are exactly as before.
Also added `z-0` to that wrapper. Required, not cosmetic: `position:relative` with `z-index:auto` creates NO stacking context, so the inner `z-10` (OurTechStack) would have escaped and painted over the pulled-up ProjectShowcase, hiding it. `z-0` scopes it.
KNOWN TRADEOFF (arithmetic, not observed): ProjectShowcase now enters the viewport once `d > P + T_total - pad - V`. That is after full cover (d = P) only while OurTechStack's own height (~936px) >= viewport height. On viewports taller than ~936px (e.g. 1080), ProjectShowcase will creep in at the bottom slightly before OurTechStack has finished covering ProcessSection. Reads as a second overlap rather than a defect; reduce the -mb (leaving a little natural spacing) if it bothers.
Verified: printed the structure; tsc ✓; lint LF-normalised vs `git show HEAD:` identical (noBannedTypes, noEmptyPattern, both pre-existing); next build ✓ 33 pages. NOTE the first build attempt failed inside src/components/ui/SpotlightGrid.tsx — a file being edited concurrently (the new `scatter` prop), not part of this diff; the re-run was clean. 1 file. Not committed.

## 2026-07-22 — CtaSection scatter: increase density
Follow-up to the scatter change. Density in sweep/scatter mode = how many cells stay lit
behind the head, i.e. the SWEEP_TRAIL constant (4 → ~5 boxes glowing at once). That constant
is shared with BlogHeroSection's line sweep, where it's the comet-tail LENGTH, so bumping it
globally would have lengthened the blog hero's streak unrequested. Instead made it a prop:
`sweepTrail?: number` defaulting to SWEEP_TRAIL (4), replacing the constant at its 3 use sites
(period calc + the two intensity lines) and added to the effect dep array. Set
`sweepTrail={6}` on brand-strategy/CtaSection → ~7 boxes lit at once instead of ~5 ("a little
bit" denser). BlogHeroSection omits the prop so it keeps 4 — byte-identical behaviour.
Also fixed a comment that still named SWEEP_TRAIL where the code now reads the prop.
Note the period is regionCount + sweepTrail, so the tail still finishes fading before the
cycle restarts — no overlap artifact at the wrap. Verified: tsc ✓, biome-format clean,
/about + /brand-strategy HTTP 200 with 80 cells and 0 error markers on the dev server.
(next build still blocked by the pre-existing concurrent-build lock, unrelated.) rAF motion
needs the user's eyes. 2 files. Not committed.

## 2026-07-22 — brand-strategy: ProcessSection pins later
`sticky top-0` catches the instant the section's top edge meets the viewport top, which is why it felt early. Changed the ProcessSection wrapper to `sticky -top-[15vh]`: a NEGATIVE sticky offset lets the element scroll a further 15vh before it catches, so more of the section is read before it freezes.
Checked the interaction with the overlap rather than assuming: with `top = -X`, pin duration is unchanged (still the overlapper's own height) but OurTechStack now only needs `P - X` of travel to cover the screen instead of `P`, since ProcessSection's box top sits X above the viewport. So the coverage margin from the earlier fix gets BETTER, not worse — the -15vh cannot reintroduce the half-overlap.
Side effect worth knowing: ProcessSection is taller than the viewport, so something is always cropped while pinned. Previously its bottom hung below; now its top 15vh (part of the eyebrow/heading) sits above. Kept the value modest for that reason — deeper offsets eat more of the header.
Verified: greped the new class and confirmed the overlap plumbing (pb-[35vh], -mb-[35vh], z-0 wrapper, z-10 overlapper) is untouched; lint LF-normalised vs `git show HEAD:` identical; tsc ✓; next build ✓. 1 file, 1 class. Not committed.
NOTE: the first tsc run failed on src/components/ui/SpotlightGrid.tsx (`sweepTrail` destructured before it was added to the props type) — a concurrent in-flight edit, not this diff. It completed on its own and the re-run was clean. Second time this session a mid-edit snapshot of a file has produced a false failure.

## 2026-07-22 — brand-strategy: ProcessSection pins only after it has fully scrolled through
Same complaint re-issued, so the previous fix (`-top-[15vh]`) was the wrong KIND of change, not merely too small a number. Any `top-*` value — however negative — still pins the section by its TOP edge, which for a section taller than the viewport necessarily freezes it while most of it is unread. Turning the dial further would also have kept eating the header.
Switched to `sticky bottom-0`: the element is held only once its BOTTOM edge reaches the viewport bottom, i.e. after the entire section has scrolled through. This is the CSS equivalent of the homepage's `start: "bottom bottom"` pins (app/home/page.tsx:107 and :122, used for StatsSection and the testimonials group) — the codebase's own precedent for this exact problem, which the map notes exists because pinning earlier froze those sections with content still hidden.
Coverage improves as a side effect: at the pin moment ProcessSection's bottom sits at the viewport bottom, so OurTechStack's top starts exactly there and needs only one viewport of travel to cover the screen — against T_total ≈ 936px + 35vh available. Far more margin than the old top-pin, which needed the full P.
Also removes the cropping tradeoff: the visible portion while pinned is now the section's own bottom viewport-worth rather than an arbitrarily clipped top.
Verified: greped the new class, confirmed no stale `-top-[` remains and the overlap plumbing (-mb-[35vh] wrapper, z-10 bg-black pb-[35vh] overlapper) is untouched; tsc ✓; lint LF-normalised vs `git show HEAD:` identical; next build ✓. 1 file, 1 class. Not committed.

## 2026-07-22 — CtaSection scatter: plus-shaped glow formation
Task: keep the (now-perfect) density and randomness, but each glow should form a PLUS — centre
box bright, its four adjacent boxes at lower opacity.
`ui/SpotlightGrid.tsx`: factored the sweep branch's per-cell brightness into a local
`centreAt(row,col)` helper (same region check + scatterSteps ordinal + head/trail maths as
before — unchanged), then added an opt-in `plus?: boolean` prop: a cell's value becomes
`max(own, PLUS_ARM * brightest orthogonal neighbour-centre)`, with `PLUS_ARM = 0.35` at module
scope. Only the 4 orthogonal neighbours (no diagonals). The pre-existing region guard on the
cell ITSELF stays, so arms never spill into the scrimmed edge rows/cols. `plus` is render-only
→ NOT added to the effect deps. brand-strategy/CtaSection adds the `plus` flag; sweepTrail={6}
and scatter untouched. BlogHeroSection doesn't pass `plus` → `if (!plus) return own` → its line
sweep is byte-identical.
VERIFIED by simulating the exact logic in node over all 38 head positions of the real region
(cols 2-9 × rows 2-5, trail 6): ASCII render shows correct plus shapes; arms leaking outside
region = 0; lit-but-not-orthogonally-adjacent cells = 0 (no diagonals); centres DIMMED = 0 —
so centre count/order/timing (= density + randomness) is provably unchanged. 12 cells differ
from the no-plus baseline and all are BRIGHTENED: tail-end centres (own 0.167/0.333, the two
faintest trail steps) adjacent to a brighter centre now show that neighbour's halo instead of
their own fainter glow — the intended max() behaviour, never dimmer.
tsc ✓; biome-format clean; /about /brand-strategy /contact /blog all HTTP 200, grid cells
rendered, 0 error markers. (next build still blocked by the pre-existing concurrent-build lock.)
rAF motion needs the user's eyes. PLUS_ARM (0.35) is the dial if arms are too bright/dim.
2 files. Not committed.

## 2026-07-22 — CtaSection scatter: slow the animation down
Task: slow down the CtaSection background animation. One prop, one file:
brand-strategy/CtaSection.tsx `speed={0.3}` → `speed={0.15}` (halved). Chose the call-site
prop over the shared SWEEP_CELLS_PER_SEC constant so BlogHeroSection's sweep keeps its own
speed={0.3} — confirmed unchanged. Density (sweepTrail=6), scatter order and the plus
formation are all untouched; only the rate changes.
Pacing computed from the actual values (SWEEP_CELLS_PER_SEC=6, region n=32, trail=6,
period=38): 1.80 → 0.90 cells/sec; a new box lights every 0.56s → 1.11s; each box now fades
over 6.7s instead of 3.3s; full cycle 21s → 42s.
Verified: tsc ✓, biome-format clean, /about /brand-strategy /contact all HTTP 200 with 80
cells and 0 error markers. (next build still blocked by the pre-existing concurrent-build
lock.) rAF motion needs the user's eyes — `speed` is the dial if 0.15 is too slow/fast.
1 file. Not committed.

## 2026-07-22 — BlogHeroSection: adopt CtaSection's current bg animation
CtaSection had moved on since the blog hero last copied it — it now runs `speed={0.15} sweep scatter plus sweepTrail={6}` (the `scatter` and `plus` props were added to SpotlightGrid outside my work). The blog hero was still on `speed={0.3} sweep` with none of those.
Copied the four ANIMATION props: speed 0.3 → 0.15, plus `scatter` (visits the region's cells in a scattered order rather than marching along rows), `plus` (each lit cell renders as a plus — full-strength cell with dimmer orthogonal arms), and `sweepTrail={6}` (6 cells lit behind the head instead of the default 4).
Deliberately did NOT copy the sweep REGION. CtaSection uses colStart 2; the blog hero keeps colStart 1 / rowStart 2 / rowEnd 5, which the user set explicitly for this hero ("second box from left, third from top, third last row") to clear its own scrim. The region is per-section framing, not part of the animation.
Verified: greped the animation props from BOTH call sites — byte-identical (speed={0.15} sweep scatter plus sweepTrail={6}); confirmed the regions still differ as intended. tsc ✓; lint LF-normalised vs `git show HEAD:` — both clean, zero diagnostics either side; next build ✓. 1 file. Not committed.

## 2026-07-20 — REVERTED: WorkProjectShowcase card eyebrow gradient
Reverted the previous task. work/WorkProjectShowcase.tsx:285 restored verbatim to
`<p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-zinc-400">` — dropped
the gradient/bg-clip-text/inline-block/pr-[0.3em] classes and the explanatory comment I had
added. Net effect: file is back to its pre-task state for that element.
Verified: tsc 0; grep shows line 285 back to text-zinc-400 and the only remaining bg-clip-text
in the file is line 60, the pre-existing "Featured Projects" section-heading gradient
(untouched — confirmed still rendering a linear-gradient live). Bundle scan of all 27 served
scripts: original zinc-400 eyebrow string present, gradient-eyebrow string absent. biome
unchanged at the 2 pre-existing findings (<img> 210, useButtonType 88). Not committed.

## 2026-07-20 — brand-strategy ProjectShowcase card tag → brand gradient
brand-strategy/ProjectShowcase.tsx:243 — the "Featured Case" tag sitting directly above the
card title (inside the hover-revealed block) changed from text-zinc-400 to
`inline-block bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pr-[0.3em]
text-transparent`. Unambiguous target here (literal "Featured Case" line immediately above
the h3) — unlike the work-page equivalent, which was reverted last task.
inline-block + pr-[0.3em] reused from that earlier investigation (gradient must span the text
not the full row; pr covers tracking-[0.3em]'s trailing space so bg-clip-text can't clip the
last glyph).
Verified: tsc 0; biome 2 warnings identical to the untouched web-development/ProjectShowcase
copy (noImgElement:168, noUnusedImports:4) → nothing introduced. Tag is hover-only (absent
from DOM at rest, confirmed); bundle scan of 27 served scripts shows the gradient string ships
and the old zinc-400 string is gone from this route. Computed check of the exact class string:
display inline-block, width 144px (hugs text, not the 800px row), linear-gradient with both
brand stops, background-clip:text, transparent fill.
SCOPE: brand-strategy only, as asked. The other 7 ProjectShowcase copies (web-development +
6 service pages) still have the plain zinc-400 tag — offered to sync. Not committed.

## 2026-07-22 — brand-strategy: fix the overlap I broke with `sticky bottom-0`
MY REGRESSION, from the previous task. `bottom-0` does not mean "pin late". A bottom-sticky element is pushed DOWN as soon as its natural bottom edge rises above the offset line — and ProcessSection is the FIRST child of a tall wrapper, so that condition is true the moment the wrapper enters view. It was therefore shoved to float at the viewport bottom straight away, while OurTechStack (laid out after ProcessSection's NATURAL position, since sticky doesn't affect layout) sat above it. No overlap at all. My earlier reasoning that bottom-sticky was "the CSS equivalent of start: bottom bottom" was wrong.
Fix: back to a TOP offset, but computed rather than guessed — `top-[calc(100vh-1040px)]`. Sticky catches when the element's top reaches the offset, so setting the offset to (viewport − section height) makes it catch exactly when its BOTTOM reaches the viewport bottom, which is the genuine "pin after it has been read" behaviour. 1040px is ProcessSection's approximate desktop height (measured from its markup earlier: pt-20 + header + one aspect-[4/4.5] card row + md:pb-35). On tall viewports the value goes positive, which correctly means "pin once fully visible".
Coverage re-checked: at the pin moment ProcessSection's bottom is at the viewport bottom, so OurTechStack's top starts there and needs one viewport of travel to cover; available travel is still T_total ≈ 936px + 35vh. Pin duration is unchanged at T_total, so the earlier full-coverage fix still holds.
Caveat: 1040px is an estimate and ProcessSection grows with viewport WIDTH (its cards are aspect-[4/4.5]), so on very wide screens it will pin slightly before its bottom reaches the fold. A runtime-accurate version would need the homepage's GSAP `start: "bottom bottom"` approach, which would mean making this page a client component.
Verified: greped the new class, confirmed no `sticky bottom-` remains and the overlap plumbing is untouched; tsc ✓; lint LF-normalised vs `git show HEAD:` identical; next build ✓. 1 file, 1 class. Not committed.

## 2026-07-22 — CareerHeroSection: ChannelCard bg pattern on the quote tile
Analysed ContactSection's ChannelCard (src/components/home/ContactSection.tsx:105-157): the pattern is a grid of boxy cells (aspect-square, rounded-md, #161616) at gap-2 inside a `w-[110%] -left-[5%] -translate-y-6` wrapper, all under a radial mask `radial-gradient(280px circle at X Y, black 0%, rgba(0,0,0,0.15) 100%)` that follows the pointer and PARKS at (85% width, 50% height) when not hovered.
Ported the RESTING state only — mask hard-coded to `85% 50%` in CSS percentages, no mouse tracking, no per-cell intensity. Deliberate: these quote tiles are duplicated 6x per marquee row across two rows, so 12 live pointer-tracking grids (each with ResizeObserver + rAF parking) would be real cost for a tile that continuously scrolls past. At rest the source card's cells are uniformly #161616 anyway (intensity 0 → rgb(22,22,22) = #161616), so the static copy is visually identical to its idle state.
60 cells at grid-cols-6, pre-keyed (`quote-cell-${i}`) because biome's noArrayIndexKey is on.
NON-OBVIOUS FIX included: the pattern layer is `absolute z-0`, and a POSITIONED z-0 element paints above STATIC in-flow siblings — so the quote icon and text would have been buried under it. Added `relative z-10` to both.
Verified: greped the rendered structure and the z-10 lifts; tsc ✓; lint LF-normalised vs `git show HEAD:` identical (noImgElement, noArrayIndexKey — both pre-existing, from the carousel's <img> and loopIndex key); next build ✓. 1 file. Not committed.
NOTE: the card's own bg is #565656 (user-set), whereas ChannelCard sits on bg-zinc-950/20. The #161616 cells will read as dark squares on mid-grey rather than the subtle near-tonal texture of the original — flagged for the user's eye.

## 2026-07-22 — CareerHeroSection quote tile: make the mask visible, bigger boxes, tighter gap
1. MASK — it was applied, just invisible. Copied verbatim from ChannelCard it used a 280px circle, but these tiles are only ~130-210px wide, so the circle blanketed the entire card and there was no falloff to see. Changed to a PERCENTAGE radius: `radial-gradient(60% 60% at 85% 50%, …)`, which scales the fade with the tile at every breakpoint instead of being fixed to the much larger source card. Park position (85% 50%) and the 0.15 outer alpha are unchanged.
2. BOX SIZE — grid-cols-6 → grid-cols-4. Cells are w-full aspect-square, so fewer columns = bigger boxes: ~54px on the desktop tile (was ~36px).
3. GAP — gap-2 (8px) → gap-1 (4px). Note the card's own `gap-1 md:gap-2` (flex spacing between the quote icon and text) is a DIFFERENT gap and was deliberately left alone.
Cell count 60 → 32 to match: at 4 cols the grid is 8 rows ≈ 464px on the desktop tile and ≈ 288px on mobile, both comfortably past the card heights (260 / 160), so coverage holds while cutting ~340 DOM nodes across the 12 duplicated tiles.
Verified: greped all four values and confirmed no stale 280px/grid-cols-6 remain (the only `gap-2` left is the card's own flex gap); tsc ✓; lint LF-normalised vs `git show HEAD:` identical (noImgElement, noArrayIndexKey — both pre-existing); next build ✓. 1 file. Not committed.

## 2026-07-20 — Work hero title sized to match the other hero sections
Audited hero h1 scales: work was the outlier —
  work            text-5xl sm:6xl md:[95px] lg:[118px] xl:[135px]   (118-135px)
  brand-strategy  text-[2.75rem] sm:6xl md:7xl lg:[7rem]            (112px)
  about / career  text-[2.75rem] sm:6xl md:7xl lg:[6rem]            (96px)
  blog            text-6xl sm:7xl md:8xl lg:[7rem]                  (112px)
work/WorkHeroSection.tsx:81 → text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[7rem]
(dropped the xl override). Chose brand-strategy as the reference: the two heroes are
structural twins (same `mb-6 flex flex-col items-center … leading-[1em] tracking-tight`
word-stagger markup) differing only in text colour and this scale — brand-strategy had
already been reduced, work hadn't.
Verified live @1280 (lg active): /brand-strategy h1 = 112px/700, /work h1 = 112px/700 —
exact match (was 118px, 135px at xl). tsc 0; biome 1 pre-existing warning.
Pane quirk: tab-3 persistently reported viewport 0 so media queries never fired (only base
44px readable) even after resize_window; switching to a different tab gave a correct 1280
reading. Not committed.

## 2026-07-22 — CareerHeroSection quote tile: full ChannelCard treatment (pattern + black bg + hover)
Replaced the static pattern with a real port of ContactSection's ChannelCard behaviour, in a new `QuoteCard` component. It HAD to be its own component: the hooks cannot live inside CarouselCard's `item.type === "quote"` conditional branch.
Ported verbatim from ChannelCard (ContactSection.tsx:53-157): mouseX/mouseY motion values; `parkMask` to (offsetWidth*0.85, offsetHeight/2); the double-rAF `setCardRef` (offsetWidth is 0 on the first frame inside the marquee track); the ResizeObserver that re-parks while not hovering; `getIntensity` (grid distance, cutoff 3.5, 1 - d/1.79); and the per-cell colour `Math.round(22 + 14*intensity)` with the outer cell going transparent while lit.
Deviations, both deliberate: mask radius 140px not 280px (these tiles are ~130-210px wide; the source radius blanketed the card, which is why the mask looked absent two tasks ago), and the grid stays at the user's grid-cols-4 / gap-1 / 32 cells rather than the source's 6 cols / gap-2 / 80 — that sizing was an explicit earlier request.
Card bg #565656 → black, as asked. Now matches the source's dark base, so the #161616 cells read as subtle texture rather than dark squares on grey (the mismatch flagged last task).
LINT: the pointer handlers on non-interactive divs trip a11y/noStaticElementInteractions in two places (card wrapper, each cell). Added biome-ignore suppressions — note they must be SINGLE-LINE and immediately precede the element; my first attempt wrapped the reason onto a second `//` line and did not bind.
Verified by counting diagnostic HEADERS (file:line:col) rather than rule-name occurrences, which had misled me: baseline 2, current 2, same two pre-existing rules (noImgElement, noArrayIndexKey). tsc ✓; next build ✓. 1 file. Not committed.

## 2026-07-20 — WorkProjectShowcase card tag → gradient (re-applied)
Re-applied the change that was reverted earlier, now that the same treatment is live on
brand-strategy/ProjectShowcase. work/WorkProjectShowcase.tsx:285 — the uppercase eyebrow
above the card title (project.subtitle, inside the hover-revealed block) →
`inline-block bg-gradient-to-r from-[#2E5BFF] to-[#149CCB] bg-clip-text pr-[0.3em]
text-transparent`. Same positional element and same recipe as brand-strategy's "Featured
Case" tag (brand-strategy's card has no category pill, only this eyebrow — which confirms the
eyebrow is the "tag on top of the title").
Verified: tsc 0; biome 2 errors/1 warning = the same pre-existing findings (noImgElement:210,
useButtonType:88), unchanged by this diff. Eyebrow is hover-only; bundle scan of 27 served
scripts shows the gradient string ships and the old zinc-400 string is gone. Isolated computed
check: display inline-block, width 188px (hugs text, not the 800px row), linear-gradient with
both brand stops, background-clip:text, transparent fill.
Note: the two ProjectShowcase-family tags now match; the other 7 brand-strategy copies
(web-development + 6 service pages) still have the plain zinc-400 tag. Not committed.

## 2026-07-20 — Contact hero title sized to match the other hero sections
Audit of hero h1 scales (contact had since been reworked by user and was the outlier):
  contact (was)   text-[4rem] sm:[5.25rem] lg:[7.5rem]              120px
  work            text-[2.75rem] sm:6xl md:7xl lg:[7rem]            112px
  brand-strategy  text-[2.75rem] sm:6xl md:7xl lg:[7rem]            112px
  blog            text-6xl sm:7xl md:8xl lg:[7rem]                  112px
  about / career  text-[2.75rem] sm:6xl md:7xl lg:[6rem]             96px
lg:text-[7rem] = 112px is the convention (3 pages agree). contact/ContactHeroSectionTwo.tsx:59
→ text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[7rem], matching work's ramp exactly (closest
structural sibling — both full-bleed media heroes). Size classes only: kept contact's own
leading-[0.95], font-bold, tracking-tight, text-white.
Verified live @1280 (lg active): /contact h1 = 112px/700 (was 120px), /work = 112px,
/blog = 112px — all three match. tsc 0, biome clean. Not committed.

## 2026-07-20 — Contact hero background video → video5.mp4
Asset lives at public/assets/video5.mp4 (not public/ root). contact/ContactHeroSectionTwo.tsx:35
src /assets/video3.mp4 → /assets/video5.mp4. Interpreted "add" as "use it as the hero
background": after the user's rework the hero has exactly ONE video slot (the full-bleed bg) —
the old foreground click-to-play card is gone — so a second video would just stack on the
first. Flagged to user.
Verified: tsc 0, biome clean; curl /assets/video5.mp4 → 200, 31,016,497 bytes; live /contact
DOM: 1 video, src /assets/video5.mp4, readyState 4, no error, muted/loop/autoplay all true,
object-fit cover, spans the full hero width, intrinsic 3840x2160.
WATCH-OUT: 31 MB / 4K source is heavy for a hero autoplay — worth compressing or serving a
720/1080p variant if load time matters. Not committed.

## 2026-07-20 — Contact hero: left black scrim made slight
A left→right scrim already existed but was heavy — from-black/75 via-black/50 to-black/30,
which dimmed the entire frame (still 30% black at the right edge). Rather than stack a second
overlay, lightened the existing one: contact/ContactHeroSectionTwo.tsx:44 →
`bg-gradient-to-r from-black/60 via-black/20 to-transparent`. Keeps weight behind the headline
(left column) for legibility while clearing the right so the footage reads.
Verified live /contact: computed backgroundImage =
linear-gradient(to right, oklab(0 0 0/0.6) 0%, oklab(0 0 0/0.2) 50%, rgba(0,0,0,0) 100%);
direction left→right, covers full hero, pointer-events none, z-index 1 vs video z-index 0
(sits above the video). tsc 0, biome clean. Exact darkness needs user's eyes. Not committed.

## 2026-07-22 — ContactFaqSection aligned with the shared FaqSection
Diffed contact/ContactFaqSection.tsx against brand-strategy/FaqSection.tsx first: they are near-duplicates and the FAQ content arrays are BYTE-IDENTICAL. Only five things differed, three of them visible.
Applied the three visible ones:
1. Added the missing "FAQs" eyebrow tag above the heading (`mb-6 text-sm uppercase tracking-[0.3em] text-zinc-500 font-medium`) — the main thing that made contact's look different.
2. Heading `lg:text-[5rem]` → `lg:text-6xl` (80px → 60px).
3. Answer text `leading-relaxed` → `leading-[1.25em]`, matching the site-wide description leading.
Deliberately NOT applied, with reasons:
- `id="faq"` — an anchor, not appearance. The footer's FAQs link points at /brand-strategy#faq, and adding a second element with the same id risks a duplicate should a page ever render both FAQ components.
- section padding (`md:py-0 mb-20` vs `md:py-20`) — invisible on /contact anyway, because the page wrapper's `md:[&>section]:pt-3 md:[&>section]:pb-5` is a descendant selector and outranks a plain class on the section. Changing it would only have altered /work/[slug]'s spacing, which nobody asked for.
SCOPE NOTE: ContactFaqSection is rendered by BOTH /contact and /work/[slug] (verified by grep), so the eyebrow tag and smaller heading now appear on the work detail pages too. That is a consistency gain — those pages sit next to sections that already carry the tag — but it is more than the literal ask, so flagged.
Verified: post-edit diff against FaqSection shows only the component name and the section element remain different; tsc ✓; lint diagnostics LF-normalised vs `git show HEAD:` — 4 before, 4 after; next build ✓. 1 file. Not committed.

## 2026-07-22 — BlogHeroSection: match CtaSection's gradient stack
Analysis: CtaSection uses TWO scrim layers, not one —
  1. LEFT, full strength: `inset-y-0 left-0 z-[5] w-full max-w-3xl bg-gradient-to-r from-black via-black/90 to-transparent`
  2. BOTTOM, dimmed: `inset-x-0 bottom-0 z-[5] h-48 bg-gradient-to-t from-black via-black/95 to-transparent opacity-50`
The blog hero had only the left one, and weakened (`from-black/80 via-black/60`).
Brought both to parity: strengthened the left layer to the CTA's exact stops and added the missing bottom layer verbatim. The bottom fade is particularly apt here — this hero is `justify-end`, so its headline and filter row sit exactly where that layer lands.
Verified by extracting the class strings from BOTH files and comparing: byte-identical on both layers. tsc ✓; lint diagnostics LF-normalised vs `git show HEAD:` — 0 before, 0 after (this file is clean); next build ✓. 1 file. Not committed.
WATCH: the sweep animation now sits under two scrims instead of one. The bottom layer is only 50% over an h-48 band, but if the sweep looks dimmer than intended in the lower area, that band is why.

## 2026-07-22 — SpotlightGrid sweep: smooth chain-reaction wave (3 distinct causes fixed)
The complaint had three separate causes, diagnosed from the code:
1. "comes instantly then disappears" — `return 1 - behind/sweepTrail`. At the head `behind = 0` → intensity 1 IMMEDIATELY: no attack at all, only a linear release. Replaced with a sin² envelope: `Math.sin(Math.PI * (1 - behind/sweepTrail)) ** 2`, so a cell swells from 0, peaks mid-trail, and subsides. Ease in AND out.
2. "adjacent box's opacity gets very low" — `backgroundColor: intensity > 0 ? "transparent" : "#121212"`. ANY intensity above zero (a plus arm at 0.35, or the last sliver of a trail) stripped the tile's background, so faintly-lit cells rendered as holes rather than tiles. Now always `#121212`; the glow layer sits above it, so keeping the tile costs nothing.
3. No chain reaction — `scatter` deliberately reorders which cell lights next, which is precisely what destroys spatial adjacency. Removed from both call sites.
Call sites: speed 0.15 → 0.1 (0.6 cells/sec) and sweepTrail 6 → 10, so ~10 cells are lit in a gradient at once and the 32-cell region takes ~70s per cycle — a slow wave rolling through neighbours.
Applied to CtaSection AND BlogHeroSection to preserve the parity the user asked for earlier; verified both call sites now read identically (speed 0.1, sweep, plus, sweepTrail 10). The `scatter` prop stays in SpotlightGrid, just unused.
Shared-component note: fixes 1 and 2 live in SpotlightGrid. Fix 1 is inside the `sweep` branch so only these two consumers are affected. Fix 2 is shared with the 7 mask-mode CtaSections — there the change is near-invisible (glow over #121212 vs over the black card) and removes the same hole artefact.
Stale comment in BlogHeroSection describing "scattered order" updated.
Verified: greped both call sites for parity; tsc ✓; lint diagnostic counts LF-normalised vs `git show HEAD:` unchanged in all three files (1/1, 3/3, 0/0); next build ✓. 3 files. Not committed.

## 2026-07-20 — Footer links back to two columns
layout/Footer.tsx:101 — the link-groups grid was `grid-cols-2 … lg:grid-cols-4 lg:gap-x-12`
(2 cols on mobile but FOUR on desktop). Now `grid-cols-2 … lg:grid-cols-2 lg:gap-x-20`, so
the 4 groups flow 2 columns x 2 rows at every breakpoint. Widened the desktop column gap
10→20 to match the old two-list `lg:gap-20` spacing noted in the session history.
Data untouched (footerLinkGroups still 4 groups of 4 links).
Verified: tsc 0; biome 4 findings all pre-existing (lines 9/87/165/271 — unused import,
unused var, useValidAnchor, index key), none near line 101. Live DOM: element className has
lg:grid-cols-2 and no lg:grid-cols-4; the 4 groups render at 2 distinct x-positions over 2
rows (Home | Work / Web Development | Services).
Pane quirk again: viewport reported 0 on both tabs so md/lg media queries never fired and
widths computed 0 — verified the lg behaviour via class identity + compiled CSS instead
(.lg\:grid-cols-2 rule present, gap-x-20 generated). Desktop look needs user's eyes.
Not committed.

## 2026-07-20 — Footer link spacing tightened
layout/Footer.tsx:103 — each link group's column `flex flex-col gap-8` → `gap-4`, halving the
vertical space between individual links (32px → 16px). Grid gaps between the GROUPS
(gap-x-10 / gap-y-14, lg:gap-x-20) left as-is — the ask was the gaps between links.
Verified live /home: group className `flex flex-col gap-4`, computed row-gap 16px, and the
measured distance between all 3 consecutive link pairs is 16px each (was 32px).
tsc 0; biome 4 findings all pre-existing (lines 9/87/165/271), none from this diff.
Note for follow-up: with links at 16px, the 56px (gap-y-14) row gap between the two rows of
groups now reads proportionally large — easy to drop if the user wants it tighter. Not committed.

## 2026-07-20 — Footer: 4 links removed
layout/Footer.tsx footerLinkGroups — removed Culture (/about#culture) and Meet The Team
(/about#team) from group 1, and Services (/home#services) and Processes
(/brand-strategy#process) from group 4. 16 links → 12.
Verified live /home: rendered groups are now [Home, About] / [Work, Blog & Resources,
Testimonials, Careers] / [Web Development, Brand Strategy, UI/UX Design, App Development] /
[FAQs, Contact]; none of the 4 removed names appear anywhere in the rendered footer; grep
confirms they're gone from the source. tsc 0; biome findings unchanged (all pre-existing).
Note: group key is group[0].name — group 4's key changed "Services" → "FAQs", still unique.
Groups are now uneven (2/4/4/2), so the 2x2 column layout is ragged — offered to rebalance.
Not committed.

## 2026-07-22 — REVERTED the chain-reaction sweep changes
Undid all five pieces of the previous task, across the same 3 files:
1. SpotlightGrid getIntensity — sin² envelope back to `return 1 - behind / sweepTrail` (instant attack, linear release).
2. SpotlightGrid cell tile — back to `backgroundColor: intensity > 0 ? "transparent" : "#121212"` (so a faintly-lit cell loses its tile again).
3. CtaSection call site — `speed={0.15} sweep scatter plus sweepTrail={6}` restored, and my explanatory comment removed. The two PRE-EXISTING comments above it (the speed note and the region note) were left untouched — they predate that task.
4. BlogHeroSection call site — same restore to speed 0.15 / scatter / sweepTrail 6.
5. BlogHeroSection comment — back to "scattered order, plus-shaped cells, 6-cell trail, speed 0.15".
Verified: greped for every remnant (Math.sin(Math.PI, "sin² envelope", "chain reaction", the unconditional #121212) — none remain; confirmed the two restored SpotlightGrid lines and that both call sites read speed 0.15 / sweep / scatter / plus / sweepTrail 6. tsc ✓; lint diagnostic counts LF-normalised vs `git show HEAD:` unchanged in all three (1/1, 3/3, 0/0); next build ✓. 3 files. Not committed.
NOTE: the two genuine defects I identified are back by request — cells snap to full brightness with no attack, and any cell with intensity > 0 renders without its tile. Recorded here so a future session doesn't "rediscover" and silently re-fix them.

## 2026-07-20 — Footer links regrouped into two clean columns
User screenshot showed the problem I'd flagged but not fixed: after removing 4 links the
groups were 2/4/4/2 in a 2x2 grid, so each column had a short group above a tall one with a
dead hole between (big void under Home/About and under FAQs/Contact).
Fix: consolidated footerLinkGroups from 4 fragments into 2 balanced columns of 6, each one
continuous list —
  col 1 (company/explore): Home, About, Work, Blog & Resources, Testimonials, Careers
  col 2 (services/contact): Web Development, Brand Strategy, UI/UX Design, App Development,
                            FAQs, Contact
Also dropped now-dead grid classes: gap-y-14 (only one row now) and the redundant
lg:grid-cols-2 (grid-cols-2 already applies at all breakpoints) → `grid grid-cols-2 gap-x-10
lg:col-span-7 lg:gap-x-20`.
Verified live /home: 2 columns, 6 links each, both 238px tall, tops aligned to the same px,
uniform 16px gap between every link in both columns, 12 links total, no gaps/holes.
tsc 0; biome 4 findings all pre-existing. Not committed.

## 2026-07-20 — Footer links now point only at real pages
Audited footer hrefs against `find src/app -name page.tsx`. Two entries pointed at SECTIONS of
other pages (the "other page's component links" the user meant): Testimonials
→ /home#testimonials and FAQs → /brand-strategy#faq. Four real service pages were also missing
entirely (digital-marketing, ai-marketing-automation, custom-software, video-production).
Rebuilt footerLinkGroups — 12 links → 14, all real routes, zero anchors:
  col 1 company (6): Home /, About, Work, Blog, Careers, Contact
  col 2 services (8): the 8 service pages, named as in the header dropdown for consistency
  ("Blog & Resources" → "Blog" since the route is just /blog)
Verified: tsc 0; biome unchanged (4 pre-existing). Live DOM: 14 links, 0 containing "#".
curl'd every href — 13 x 200 plus / = 307 (the intended redirect to /home in
src/app/page.tsx). No 404s.
Note: columns are now 6 vs 8 (services outnumber company links), so the right column runs ~2
links taller; both are still continuous lists with no holes. Social chips + Privacy Policy
still href="#" — those are external/legal placeholders, not internal pages, so left alone.
Not committed.

## 2026-07-22 — SpotlightGrid: reapply ONLY the two defect fixes (smoothness + adjacent-tile holes)
Re-applied the two genuine fixes from the reverted chain-reaction task, WITHOUT any of its pacing changes — the split offered at the end of that revert.
1. SMOOTHNESS — getIntensity sweep branch: `1 - behind/sweepTrail` had the cell at FULL brightness the instant the head arrived (no attack, only a linear release), which is why it read as popping on then vanishing. Now a sin² envelope, `Math.sin(Math.PI * (1 - behind/sweepTrail)) ** 2`, so a cell eases in and out.
2. ADJACENT-TILE OPACITY — the cell tile was `intensity > 0 ? "transparent" : "#121212"`, so ANY non-zero intensity (a plus arm at 0.35, or the last sliver of the trail) stripped the tile and the cell next to a glowing box rendered as a hole. Now always `#121212`; the glow layer sits above it so nothing is lost.
Deliberately NOT changed, unlike the reverted task: speed stays 0.15, `scatter` stays on, sweepTrail stays 6 — on BOTH call sites. Verified by grep after the edit, since those were the parts the user reverted.
Scope: 1 file (SpotlightGrid). Fix 1 is inside the `sweep` branch → only CtaSection + BlogHeroSection see it. Fix 2 is shared with the 7 mask-mode CtaSections, where it removes the same hole artefact and is otherwise near-invisible (glow over #121212 vs over the black card).
Verified: greped both fixes present and no stale conditional tile remains; confirmed both call sites still read speed 0.15 / sweep / scatter / plus / sweepTrail 6; git status confirms CtaSection is untouched vs HEAD. tsc ✓; lint diagnostics LF-normalised vs `git show HEAD:` 1 before / 1 after; next build ✓. Not committed.

## 2026-07-20 — Footer links split equally 7/7
14 links were 6 (company) / 8 (services). "Divide equally" = 7/7, which means the
company/services boundary can't coincide with the column break, so the list now runs as one
continuous sequence down col 1 and into col 2:
  col 1 (7): Home, About, Work, Blog, Careers, Contact, Digital Marketing & Growth
  col 2 (7): AI & Marketing Automation, Web Development, App Development, Custom Software &
             SaaS, Brand Strategy & Identity, UI/UX Design, Video Production
Verified live: both columns render exactly 7 links (equalCounts true), tops aligned, all 14
links intact. tsc 0; biome unchanged (4 pre-existing).
HONESTY / pane limit: the pane reported viewport 0 on every tab this session, so column widths
computed 0 and long labels wrapped to 3-4 lines — the "equal 571px heights" it reported is an
artifact of that degenerate width, NOT evidence about desktop. Counts (7/7) are structural and
viewport-independent, so that part is solid. At a real 1280 desktop the links block is
col-span-7 of 12 minus gap-x-20 ≈ 296px per column vs ~215px for the longest label
("Brand Strategy & Identity"), so nothing should wrap and both columns should be 7 single
lines = equal height — that is a CALCULATION, not a measurement. Worth the user's eyes,
especially at mid widths where col 2 (all long service names) would wrap before col 1 does.
Not committed.

## 2026-07-22 — SpotlightGrid sweep: fix the LAG (per-frame React re-render)
"Laggy" turned out to be a performance defect, not an easing one — and the previous two tasks were treating the wrong thing.
CAUSE: the rAF loop called `setSweepHead(...)` on EVERY frame. Each call re-rendered SpotlightGrid → all 80 cells → each running getIntensity, which in `plus` mode calls centreAt 5x (bounds checks + modular arithmetic + scatterSteps lookup). So ~400 centreAt calls plus 160 DOM nodes reconciled with fresh inline styles, 60 times a second. The glow div also had NO css transition, so it *depended* on that per-frame churn to look continuous — the expensive path was load-bearing.
FIX — render rarely, let the compositor interpolate:
1. Quantised the state update: `setSweepHead(cur => Math.floor(next) === Math.floor(cur) ? cur : next)`. It now fires only when the head crosses into a new cell — about once a second at speed 0.15, instead of 60x.
2. Added a CSS transition sized to exactly one cell-step (`sweepStepMs = 1000 / (speed * SWEEP_CELLS_PER_SEC)`) on BOTH animated layers: `opacity` on the glow div and `background-color` on the inner cell. Matching the step length means the tween lands exactly as the next render arrives, so it reads continuous.
3. `willChange: opacity` on the glow in sweep mode only.
The inner cell's existing `transition-colors duration-300` had to be overridden inline: 300ms would finish long before the ~1100ms gap and step visibly.
SCOPED to sweep — `sweepTween` is undefined outside it, so the 7 mask-mode CtaSections keep their per-frame path untouched (they have the same per-frame re-render cost, but nobody has reported it and changing them was not asked for).
No call-site changes: speed 0.15 / scatter / plus / sweepTrail 6 verified unchanged on both consumers.
Verified: greped the quantisation and both tween sites; tsc ✓; lint diagnostics LF-normalised vs `git show HEAD:` 1 before / 1 after; next build ✓. 1 file. Not committed.

## 2026-07-22 — Blog hero already has the smoothness/lag fix — NO CHANGE MADE
Checked before editing: the fix from the previous task lives entirely inside SpotlightGrid's `sweep` code path — the quantised `setSweepHead` sits inside `if (sweep) {…}` in the rAF tick, and `sweepTween` is `sweep ? … : undefined`. Neither is gated on anything CtaSection-specific, so every consumer passing `sweep` inherits it. BlogHeroSection passes `sweep`, so it already had the fix the moment that task landed.
Also diffed the two call sites in full: byte-identical apart from `sweepColStart` (2 for the CTA, 1 for the hero) — a per-section region the user set deliberately to clear each card's own scrim, not part of the animation.
Deliberately made no edit. Re-passing the same props or duplicating the fix would have been a no-op diff dressed up as work.

## 2026-07-22 — Footer: three titled columns + section deep-links
Restructured `footerLinkGroups` from a plain array-of-arrays into `{ title, links }` objects, so each column can carry a heading:
- PAGES (6): Home, About, Work, Blog, Careers, Contact
- SERVICES (8): all eight service routes, in the same order as the homepage ServiceSection and the header dropdown. "Digital Marketing & Growth" was stranded in the pages group — moved here where it belongs.
- EXPLORE (7): section deep-links, each pointing at the anchor on the page that owns it — Our Services /home#services, Portfolio /home#portfolio, Testimonials /home#testimonials, Culture /about#culture, Meet The Team /about#team, Our Process /brand-strategy#process, FAQs /brand-strategy#faq. Portfolio is NEW (the #portfolio anchor already existed on PortfolioSection but nothing linked to it).
Render updated to destructure `{ title, links }`, key the column by `title` (was `group[0].name`, which no longer exists), and print the heading in the site's standard tag style (`text-sm uppercase tracking-[0.3em] text-zinc-500`) so it matches the section eyebrows elsewhere.
Grid: `lg:grid-cols-2` → `lg:grid-cols-3`, with `lg:gap-x-8` rather than something wider — at lg:col-span-7 that leaves ~226px per column against a ~216px longest label ("Digital Marketing & Growth"), so the gap is what keeps those on one line. Added gap-y-12 for the mobile 2-col wrap.
Verified: scripted resolver over ALL 21 hrefs — route file exists, and for each of the 7 anchors the owning component is actually rendered by that page. 21/21 pass, zero 404s. Confirmed no stale `group[0]` reference remains. tsc ✓; lint diagnostics LF-normalised vs `git show HEAD:` 4 before / 4 after; next build ✓. 1 file. Not committed.
WATCH: the service labels are long. If any wrap to two lines on your screen, widening the links block to lg:col-span-8 (newsletter to 4) is the fix — its form is max-w-[420px] and would shrink to ~356px.

## 2026-07-22 — Footer links: tighter vertical rhythm, smaller type
Two values on the link columns:
- Vertical gap `gap-4` → `gap-2.5` (16px → 10px) on the column flex container.
- Link font `text-[1.1rem]` → `text-[0.95rem]` (17.6px → 15.2px).
Left alone deliberately: the column heading (`text-sm uppercase tracking-[0.3em]`) and its `mb-2`, so the headings still read as headings against the now-smaller links rather than merging with them.
Side benefit: the smaller type relieves the width pressure flagged last task. The longest label ("Digital Marketing & Growth") drops from ~216px to ~187px against ~226px of column width, so the two-line-wrap risk at lg is largely gone.
Verified: greped both new values and confirmed no `text-[1.1rem]` remains; tsc ✓; lint diagnostics LF-normalised vs `git show HEAD:` 4 before / 4 after; next build ✓. 1 file, 2 values. Not committed.

## 2026-07-20 — WorkProjectShowcase: orbiting comet → two edge comets
Replaced the single comet that laps the whole card with two edge comets that each land on the
corner whose glow already blooms there:
  top    — TL tangent → right along the top edge → through the TR arc  (feeds the TR glow)
  bottom — BR tangent → left  along the bottom edge → through the BL arc (feeds the BL glow)
Bottom runs right→left (not left→right) because the existing glows sit at TR and BL; ending at
BL is what makes the comet visibly become that side glow. Corner-glow layer (Layer 2 mask +
circles) untouched — same effect, now fed by two comets.
Implemented as a new `edgeComets` prop on ui/TracingBorder.tsx (default false) and enabled
only in work/WorkProjectShowcase.tsx, because TracingBorder is SHARED by BlogListSection and
all 9 ProjectShowcase copies — a global change would have altered those too. Orbit branch left
byte-identical for them.
Dash math differs per branch and this is the subtle part: the orbit is a CLOSED loop so the
head lands back on the start point (offset 1+TAIL → TAIL), but each edge is an OPEN path where
the head must travel 0→1, which needs offset TAIL → TAIL-1. Getting this wrong would park the
comet off-path.
Verified on the real 1185x600 card (r=18.5) by building both paths and measuring:
  top    start (20,2)    end (1184,20)  — x 20→1184, ends at TR glow centre (1184,2)
  bottom start (1165,599) end (1,580)   — x 1165→1, ends at BL glow centre (2,599)
  both paths 1174.1px long → symmetric, identical speed over LAP_DURATION.
tsc 0; TracingBorder biome-clean; WorkProjectShowcase's 2 findings are pre-existing (88, 210).
/work, /blog, /brand-strategy all 200 (orbit consumers unaffected). Hover-only so the motion
needs the user's eyes. Not committed.

## 2026-07-22 — Footer: equalise the spacing between the three link columns
Symptom: Pages→Services looked far wider than Services→Explore. The CSS gaps were already identical (`lg:grid-cols-3` + `lg:gap-x-8`); the imbalance came from TRAILING WHITESPACE inside equal-width grid tracks. Each track was ~226px, but "Pages" tops out at ~70px ("Contact") so ~156px of dead space sat before the gap began, whereas "Services" (~187px, "Digital Marketing & Growth") nearly filled its track. Effective spacing was therefore ~188px vs ~71px.
Fix: `lg:grid-cols-3 lg:gap-x-8` → `lg:flex lg:gap-16`. Flex sizes each column to its own content, so the gap is the only spacing between them and all three read equal. Mobile keeps the existing 2-col grid (`grid-cols-2 gap-x-10 gap-y-12`), which `lg:flex` only overrides from lg up.
Note this returns the block to the flex layout the footer used originally (it was `lg:flex lg:justify-start lg:gap-20` before the 4-column rework), so it matches prior convention rather than introducing a new one.
Consequence to expect: the three columns now bunch left and leave more empty space before the newsletter block, because they no longer stretch to fill equal tracks. gap-16 (64px) was chosen as a middle ground between the old ~188px and ~71px.
Verified: greped the new class and confirmed both `lg:grid-cols-3` and `lg:gap-x-8` are gone; tsc ✓; lint diagnostics LF-normalised vs `git show HEAD:` 4 before / 4 after; next build ✓. 1 file, 1 class. Not committed.

## 2026-07-20 — Work card hover jank fixed (filter → opacity overlay)
ROOT CAUSE (not the comet): work/WorkProjectShowcase.tsx animated
`filter: brightness(0.65) grayscale(25%)` with a SPRING on each card's media layer, keyed on
`isAnyHovered && !isHovered`. So hovering one card spring-animated a filter on all ~8 other
cards' full-size images/videos simultaneously. `filter` is not compositable — every frame
forces a full re-rasterisation of each card image, which is exactly the reported
"inconsistent and laggy". The new comet is 4 SVG paths on ONE card by comparison — far
cheaper, and not the culprit.
FIX: removed `filter` from the media motion.div (it now animates only `scale`, a compositable
transform) and added a sibling black overlay animating `opacity` 0 → 0.35, which runs on the
compositor. 0.35 black ≈ the old brightness(0.65). TRADE-OFF: loses the grayscale(25%)
desaturation — acceptable/desirable since the user had already asked for that dim to be
reduced ("feels like black and white").
BUG CAUGHT MID-TASK: the overlay is `bg-black` (fully opaque) with the dim living entirely in
opacity, so with no `initial` framer shipped NO inline opacity in the SSR markup → every card
painted solid black until hydration. (The pre-existing hover scrim escapes this only because
bg-black/35 is translucent.) Added `initial={{ opacity: 0 }}`.
Verified: tsc 0; biome unchanged (2 pre-existing). Live /work: 0 elements with a
brightness/grayscale filter; all 9 cards' dim overlays computed opacity 0 at rest; server HTML
now ships style="opacity:0" on the overlay. Smoothness itself needs the user's eyes — the pane
can't profile FPS. Comet left as-is. Not committed.

## 2026-07-22 — Footer: wider, evenly distributed spacing across the three link columns
`lg:gap-16` → `lg:justify-between lg:gap-20`.
Two things at once: gap-20 (80px) raises the floor from 64px, and justify-between spreads the columns across the full links block instead of bunching them left — which removes the void before the newsletter that the previous flex change introduced (flagged at the time). With exactly three items, justify-between keeps both gaps identical, so the equality won last task is preserved.
Effective gap now: content widths are roughly 70 (Pages) + 187 (Services) + 120 (Explore) = ~377px inside a ~743px block, so the leftover ~366px splits into two gaps of ~183px each — comfortably above the 80px floor, and equal by construction. gap-20 only takes over on narrower desktops where the leftover would otherwise squeeze them together.
Mobile untouched: the 2-col grid (`grid-cols-2 gap-x-10 gap-y-12`) still applies below lg, since both new classes are lg-prefixed.
Verified: greped the new class, confirmed no `lg:gap-16` remains; tsc ✓; lint diagnostics LF-normalised vs `git show HEAD:` 4 before / 4 after; next build ✓. 1 file, 1 class. Not committed.
WATCH: with justify-between the Explore column's right edge now sits flush to the end of the links block, i.e. ~48px from the newsletter content (its wrapper has lg:pl-12). If that reads as crowded against the newsletter, `lg:justify-around` would keep equal gaps while leaving breathing room at both ends.

## 2026-07-22 — Footer: dial the column gap back down
`lg:justify-between lg:gap-20` → `lg:gap-28`.
The key point: justify-between distributes ALL leftover space, so it was forcing ~183px between columns and the gap value was never actually applied (it was only a floor). Reducing the number alone would have changed nothing — justify-between had to go for the gap to become controllable at all.
Now an explicit 112px (gap-28), sitting between the 64px it was two tasks ago and the ~183px justify-between produced. Still equal between all three columns, since flex sizes each to its content.
Consequence: the columns bunch left again, leaving ~142px of trailing space before the newsletter block (roughly 743px block − 377px of content − 224px of gaps). That is the trade for controlling the gap directly.
Verified: greped the new class and confirmed lg:justify-between is gone; tsc ✓; lint diagnostics LF-normalised vs `git show HEAD:` 4 before / 4 after; next build ✓. 1 file, 1 class. Not committed.

## 2026-07-22 — Blog article page (/blog/[slug]): pill radius, leading, spacing
Task: keep w-full; "Resources" tag shouldn't be rounded-full; unify text leading; cut the
excessive component spacing, especially CtaSection→Footer.
`components/blog/BlogArticle.tsx` (used ONLY by blog/[slug], so page-scoped):
(1) category pill :85 and (2) #tag pills :191 `rounded-full` → `rounded-md`, matching the blog
LISTING's own category tag (BlogListSection:256) and PortfolioSection:378. The 4 remaining
rounded-full are genuine circles (2 gradient dots, h-11 avatar, separator dot) — left alone.
(3) body paragraph :265 `leading-[1.85]` → `leading-[1.7]`, so all text-lg body copy (paragraph
+ list items :286 + callout :304) now matches. Left the hero lead :108 and blockquote :270 at
leading-[1.6] — larger display sizes, internally consistent.
(4) related section :227 `py-20 md:py-28` → `py-16 md:py-20`.
`app/blog/[slug]/page.tsx`: Cta wrapper `py-16 md:py-24` → `pt-12 pb-8 md:pt-16 md:pb-12`;
Footer wrapper `pt-16 md:pt-24` → `pt-8 md:pt-12`. md gaps: related→Cta 208px → 144px;
Cta→Footer 192px → 96px (now identical to the /blog index's pb-12+pt-12).
w-full/max-w NOT touched anywhere (count unchanged at 14) per the user's constraint.
spec-verifier: no P0/P1, all 5 requirements confirmed implemented; fixed its P3 (my comment
claimed the whole rhythm matched /blog when only the Cta→Footer pairing does).
OPEN / FLAGGED, deliberately NOT changed (outside the stated page scope): the user's premise
"our website doesn't use rounded-full" is only partly true — `blog/BlogFeaturedSection.tsx:58,61`
still render the SAME blog category badge as rounded-full (visible one click away on /blog), and
the `#tag`-style chips in all 8 service SubServices.tsx:214 are rounded-full too. Ask the user
before expanding.
Verified: tsc ✓, biome-format clean both files, /blog and /blog/google-io-2026 HTTP 200 with 0
remaining rounded-full pills and 0 error markers. 2 files. Not committed.

## 2026-07-22 — Blog article: edge-to-edge cover image + correct leading (corrects prior task)
User corrected two things from the previous pass.
(1) "w-full" meant EDGE-TO-EDGE like other pages: the big cover image should use the same p-3
inset as the CtaSection. Site full-bleed pattern confirmed = `px-3` wrapper + inner
`rounded-[20px]` block (home hero, CtaSection :25, Footer :112; rounded-[20px] used 42x).
`blog/BlogArticle.tsx` cover image: wrapper `px-6 md:px-10` → `px-3`; figure dropped
`mx-auto max-w-5xl`, `rounded-[24px]` → `rounded-[20px]`. ALSO updated the next/image
`sizes` from "(max-width: 1024px) 100vw, 1024px" → "100vw" — the element is now viewport-wide,
so the old hint would have served a 1024px file to a much wider box (blurry on desktop).
Kept -mt-6 overlap + aspect ratios. The other max-w-5xl (:174) is the article BODY grid — left
constrained on purpose (reading measure); only the image is edge-to-edge.
(2) Leading: my 1.7 was wrong — verified `leading-[1.25em]` is the site standard (64 uses
across 61 files; 1.7 appeared nowhere else). Set body paragraph, list items, callout text AND
the hero lead to `leading-[1.25em]`. Also aligned the pull-quote :272 `leading-[1.6]` →
`leading-[1.2em]`: 1.6 existed only 2x sitewide (both blog outliers) while the site's quote
card at the identical size/weight (text-xl md:text-2xl font-medium, OurValuesSection:114) uses
leading-[1.2em]. h1 leading-[1.08] and related-card leading-snug left (display roles).
NOTE: 1.25em is tight for long-form article body — applied because it is the user's stated
system standard; flagged to them as an easy dial.
Verified: tsc ✓, biome-format clean (had to re-wrap the paragraph after the longer class
pushed it past print width), served /blog/google-io-2026 HTTP 200 — px-3 wrapper 1,
full-width rounded-[20px] figure 1, sizes=100vw 1, leading-[1.25em] 13, zero leading-[1.7]/[1.6]
remaining, 0 error markers. 1 file. Not committed.

## 2026-07-22 — Blog article: left-align the content
Task: move the content to the left on /blog/[slug]. The three content blocks in
`components/blog/BlogArticle.tsx` were centred with `mx-auto`; dropped it from all three:
:62 hero (`mx-auto w-full max-w-3xl` → `w-full max-w-3xl`), :174 body grid
(`mx-auto grid w-full max-w-5xl ...` → `grid w-full max-w-5xl ...`), :230 related section
(`mx-auto w-full max-w-6xl` → `w-full max-w-6xl`). Kept the max-w values so the article keeps
a readable line length — only the alignment changed, from centred to flush against the
section's left gutter (px-6 md:px-10 on the hero/body sections). Matches the site's dominant
pattern (27 full-width/left-aligned containers vs 12 centred max-w columns). The cover image
is unaffected (already edge-to-edge at px-3 from the previous task).
Verified: 0 mx-auto remaining in the file; tsc ✓; biome-format clean; served
/blog/google-io-2026 HTTP 200 with 0 centred containers, 3 left-aligned containers, 0 error
markers. 1 file. Not committed.

## 2026-07-22 — Blog article: widen the content
Task: increase the content width on /blog/[slug]. The page had THREE different container
widths (768 / 1024 / 1152) so the left+right edges were ragged down the page, and the actual
reading column was only 720px sitting under a now-full-bleed cover image.
`components/blog/BlogArticle.tsx`: unified all three top-level containers to the widest value
already in use, max-w-6xl (1152px) — :62 hero `max-w-3xl` → `max-w-6xl`, :174 body grid
`max-w-5xl` → `max-w-6xl`, :230 related already 6xl (unchanged) — so every block now shares
the same left/right edges. Widened the inner reading measure :183 `max-w-[720px]` →
`max-w-[860px]`.
Grid math checked: body grid 1152 − 200px sidebar − 48px gap = 904px article track, so the
860px measure fits with 44px headroom (not clipped). Reading measure goes ~80 → ~96 chars at
text-lg; 860 chosen over the full 904 to stay nearer a comfortable measure — the value is a
one-number dial if the user wants it wider still.
Verified: tsc ✓; biome-format clean; served /blog/google-io-2026 HTTP 200 — 3 max-w-6xl
containers, 1 max-w-[860px] article, 0 remaining max-w-3xl/5xl/[720px], 0 error markers.
1 file. Not committed.

## 2026-07-22 — Blog article "Continue reading": BlogSection-style cards + CTA button
Task: make the related-article cards like the home BlogSection, and the "View all" link like
the other CTA buttons. 1 file: `components/blog/BlogArticle.tsx`.
CARDS — RelatedCard rewritten to mirror BlogSection's CardTrack card: Link>article.group,
square image `rounded-[1.25rem]` growing to `md:group-hover:aspect-[3/4]`, image
group-hover:scale-105, hover scrim `from-black/75 via-black/15 to-transparent`, content block
`mt-4 px-2` sliding up (`md:group-hover:-mt-32 md:group-hover:px-4 md:group-hover:pb-4`), meta
row (author • readTime) ABOVE the title, text→white on hover, plus BlogSection's max-md card
chrome. Deliberately did NOT copy the marquee-only `w-[55vw]…lg:w-[25vw]` widths or
draggable={false} (these sit in a 3-col grid). Kept the existing motion.div stagger wrapper.
Removed the category pill overlay — BlogSection has none (post.category still shown in the
article hero, so no dead data path).
CTA — replaced the small text link with the BlogSection "Explore all articles" button markup
(h-16 white pill, border-transparent→hover:border-black, pl-0→hover:pl-6, black rounded-xl
chip with the two-MdArrowOutward diagonal swap), unique gradient id `related-cta-grad`; header
row made responsive `flex-col md:flex-row`. Swapped the now-unused lucide ArrowUpRight import
for react-icons/md MdArrowOutward. NOTE the "Back to blog" link at :63 keeps the subtle
text-link style on purpose — it's back-nav, not a CTA.
spec-verifier: no P0/P1; CTA confirmed byte-for-byte vs reference; `related-cta-grad` confirmed
non-colliding with cta-icon-grad (CtaSection) / footer-arrow-grad (Footer). Fixed its P2 — the
next/image `sizes` was over-specified: the grid column caps at ~363px (max-w-6xl 1152 minus
md:gap-8 ÷ 3), so plain `33vw` fetched ~1.7x oversized files on wide screens; now
`(max-width: 768px) 100vw, (max-width: 1232px) 33vw, 384px`.
Open/flagged P3s (not changed): hovering one card grows the grid row height (faithful to the
reference flex track, but more visible in a 3-up grid — needs the user's eyes); the defs-only
<svg><title> accessible-name quirk is inherited from the reference component, not a regression.
Verified: tsc ✓, biome check CLEAN (no lint errors), biome-format clean, served
/blog/google-io-2026 HTTP 200 — 3 cards with the new hover structure, 0 old card markers, CTA
present, corrected sizes on all 3 images, 0 error markers. Not committed.

## 2026-07-22 — Blog article "Continue reading": 3 cards → 4
Task: show four cards in the related section. 2 files, 3 coordinated edits:
(1) `app/blog/[slug]/page.tsx:45` `getRelatedPosts(slug, 3)` → `(slug, 4)`. Data supports it —
blog.ts has 6 posts and getRelatedPosts excludes the current slug, so 5 others are always
available; no article can come up short.
(2) `components/blog/BlogArticle.tsx:265` grid `grid-cols-1 gap-6 md:grid-cols-3 md:gap-8` →
`grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4` (1 → 2 → 4 responsive ladder, same
shape as career/ApplicationJourney's 4-up grid).
(3) Retuned the next/image `sizes` for the narrower column — computed: max-w-6xl 1152 with
32px gaps gives 363px at 3 cols but only 264px at 4, so the previous
`(max-width: 1232px) 33vw, 384px` would over-fetch. Now
`(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1232px) 25vw, 288px`,
which also covers the new 2-col md band.
Verified: tsc ✓, biome check clean, biome-format clean both files; served TWO different
articles (/blog/google-io-2026 and /blog/rise-at-seven-expansion) — each renders exactly 4
cards with lg:grid-cols-4 and the new sizes on all 4 images, 0 error markers. Not committed.

## 2026-07-23 — Blog article: cap the title width at max-w-7xl
Task: in the blog slug page, reduce the width of the title to `max-w-7xl`. 1 file,
1 token. The title is the `<motion.h1>` in `components/blog/BlogArticle.tsx:87-95`
(post.title). Its className previously had NO width cap, so on wide viewports the
heading ran the full bleed of the hero container (`<div className="w-full ">` :56).
Added `max-w-7xl` (80rem / 1280px) to the h1 ONLY — back-link, category pill, lead
paragraph, and meta row are untouched. 7xl is intentionally wider than the body's
max-w-6xl (1152px) containers, consistent with the hero-widest note from 2026-07-22.
Verified: tsc on the source file clean (the one TS1128 is in the generated
`.next/dev/types/validator.ts`, a stale Next dev artifact — not source, not mine);
biome format clean (single file, no fixes). Not committed.

## 2026-07-23 — Blog article: add a Table of Contents panel above the share rail
Task: in the blog slug page, add a content panel on the left above the share. Clarified
via AskUserQuestion → **Table of contents**. 1 file: `components/blog/BlogArticle.tsx`.
The left column is the 200px sticky `<aside>` (`lg:grid-cols-[200px_minmax(0,1fr)]`) that
held only `<ShareRail>`. Added a TOC above it with a divider between.
- `slugify()` helper (top of file) — URL-safe id from heading text; single source so the
  TOC links and the `<h2>` anchors can't drift apart.
- Collected `toc` in the component from `post.content` filtered to `type === "heading"`
  (type-predicate narrows ContentBlock → { type, text }). Data path is real: 19 heading
  blocks exist across blog.ts, so the TOC is populated (not empty) for every post.
- Anchored the `Block` heading case: `<h2 id={slugify(text)} className="... scroll-mt-28 ...">`
  so smooth-scroll lands below the fixed header.
- New `TableOfContents` component (`useEffect` + `useRef`): `IntersectionObserver`
  (rootMargin `-25% 0px -65% 0px`) highlights the active heading; click →
  `history.replaceState` (no jump) + `scrollIntoView({behavior:"smooth"})`. Active link gets
  the brand-blue left border + zinc-900; inactive zinc-500 with hover. Renders nothing if
  0 headings (no-op on SSR/prerender — guards before observe).
- Wired into `<aside>`: `<TableOfContents>` → divider → `<ShareRail>`. Sticky stack
  `gap-6`, both share the existing `top-32`.
- Import: added `useEffect, useRef, type MouseEvent` to the React import (React namespace
  is not imported under the new JSX transform, so `React.MouseEvent` would not resolve —
  used the imported `MouseEvent<HTMLAnchorElement>` type instead).
Verified: tsc on source CLEAN (the lone TS1128 is in generated `.next/dev/types/validator.ts`,
unchanged from prior sessions); biome check + format CLEAN after applying 2 safe autofixes
(import sort `type MouseEvent` first; wrapped the long filter-predicate line); confirmed
19 heading blocks in blog.ts. Not committed.

## 2026-07-23 — Blog article TOC: style the panel as a bordered box
Task: make the content panel (the Table of Contents added earlier today) like a box with
`rounded-2xl`. 1 file: `components/blog/BlogArticle.tsx`, 1 element.
The TOC `<nav>` was a bare `flex flex-col gap-3` (no border/bg). A "box" needs a visible
container, so matched the existing card idiom — the author-bio card at :195 uses
`rounded-3xl border border-zinc-200 bg-[#FAFAFA]`. Applied the same tokens at 2xl radius:
`rounded-2xl border border-zinc-200 bg-[#FAFAFA] p-5`. Kept the per-item `border-l-2` active
accent inside (the active-state affordance still reads correctly within a panel). The nav
className wrapped to multi-line as it grew past Biome's print width — that's the only reason
git shows the whole element as added; the token delta is just the box classes.
Verified: biome check + format CLEAN (no fixes); tsc on source CLEAN (only the pre-existing
generated `.next/dev/types/validator.ts` TS1128 remains). Not committed.

## 2026-07-23 — Blog article ShareRail: smaller buttons, flex-row layout
Task: the share buttons are in flex-col, reduce their size and make them flex-row.
1 file: `components/blog/BlogArticle.tsx`, ShareRail region only.
- `btn`: `h-11 w-11` → `h-9 w-9` (44→36px); `rounded-xl` → `rounded-lg` (radius kept
  proportional at the smaller size); rest of the token string (border/hover) unchanged.
- Container: `flex gap-3 lg:flex-col` → `flex gap-2.5`. Dropped the `lg:flex-col` breakpoint
  so the buttons are row at ALL breakpoints. The rail lives in the left `<aside>` which is
  `hidden lg:block`, so the row shows only at lg+ regardless — removing the override just
  stops it flipping back to a column there.
- Icons: all four `h-4 w-4` → `h-3.5 w-3.5` (FaXTwitter, FaLinkedinIn, Check, Link2) so they
  stay proportional in the smaller button. Targeted each by surrounding context — NOT
  replace_all — because `h-4 w-4` is also used by Calendar/Clock in the unrelated meta row.
Verified: biome check + format CLEAN; tsc on source CLEAN (only the pre-existing generated
`.next/dev/types/validator.ts` TS1128 remains). Not committed.

## 2026-07-23 — Blog article "Continue reading": match BlogSection's padding/heading/button
Task (with screenshot): in the Related/Continue-reading section, make the section padding,
heading, and CTA button match the homepage BlogSection. 1 file: `components/blog/BlogArticle.tsx`.
Read `home/BlogSection.tsx` header layer (lines 207-295) as the reference. Three changes:
- SECTION: `w-full bg-[#FAFAFA] px-6 py-16 md:px-10 md:py-20` →
  `w-full overflow-hidden bg-[#FAFAFA] py-16 md:py-32`. Matched BlogSection's `py` scale
  (16/32) + `overflow-hidden` (it clips the marquee there; harmless here, keeps parity).
  Kept this section's own `#FAFAFA` bg (BlogSection is `bg-white`) — the bg is a per-section
  choice, not part of the "padding/heading/button" ask. Dropped the section-level `px` since
  BlogSection pushes horizontal padding onto the header row instead.
- HEADING: `text-3xl md:text-4xl` → `text-4xl md:text-5xl lg:text-6xl lg:leading-[1.05]`,
  wrapped in `<div className="flex flex-col items-start">`, and added the BlogSection eyebrow
  `text-sm font-medium uppercase tracking-[0.3em] text-zinc-500 mb-3` labelled "Related articles"
  (BlogSection's says "Latest Insights" — the text is section-specific, the style is the match).
- BUTTON: the Link markup was ALREADY byte-identical to BlogSection's CTA (confirmed in the
  2026-07-22 log — only label "View all" + gradient id `related-cta-grad` differ, both
  intentional/non-colliding). Added the one missing piece: BlogSection wraps the CTA in
  `<div className="flex w-full items-center justify-end md:w-auto">` — added that wrapper so
  alignment matches (button right-aligned on desktop, full-width row on mobile).
Verified: tsc on source CLEAN; biome check + format CLEAN (format --write normalized the
indentation of the re-nested Link children — I authored that block). Not committed.

## 2026-07-23 — Blog article "Continue reading": match BlogSection's section padding exactly
Task (with screenshot of the Related/Continue-reading section): analyze the homepage BlogSection's
padding and apply the same padding to this section. 1 file: `components/blog/BlogArticle.tsx`, 1 token.
Analyzed `home/BlogSection.tsx:208-211`:
- BlogSection SECTION: `pb-16 md:pb-32` — BOTTOM-ONLY, no top pad (it sits flush below a neighbor).
- BlogSection HEADER div: `px-4 md:px-10` carries the horizontal padding.
The related section's header div ALREADY matched BlogSection token-for-token (set last task). The only
delta was the section element: it was `py-16 md:py-32` (top+bottom). Changed to `pb-16 md:pb-32`
(bottom-only) to match BlogSection exactly. Dropped the top padding — the preceding BODY section
(`px-6 py-16 md:px-10 md:py-24`) provides its own bottom pad, so there's no gap; removing the top
pad brings this section flush against the body, mirroring how BlogSection abuts its predecessor.
Verified: biome check + format CLEAN; tsc on source CLEAN. Not committed.

## 2026-07-23 — Footer: realign link groups to Services → Explore → Pages
Task: in the footer, realign the links — keep the Services first, then Explore, then the pages.
1 file: `components/layout/Footer.tsx`, data-only change (no JSX/markup touched).
`footerLinkGroups` was ordered Pages → Services → Explore. Reordered the array to
**Services → Explore → Pages** (Services first as the primary offering, Pages last). The
`.map()` render at :130 iterates the array, so visual column order follows automatically — no
markup/layout changes needed. Within each group the link order is unchanged.
Also rewrote the stale comment above the array (was documenting the old "site pages, then
services" 7/7 split that no longer applies) to state the new order + the lg flex sizing note.
Verified: tsc on source CLEAN. biome check on the file surfaces 2 findings — both PRE-EXISTING
and unrelated to this change: `noUnusedImports` for `Particles` (HEAD line 9) and
`noUnusedVariables` for `catch (e)` in formatTime (HEAD line 106); my diff touches neither
(confirmed vs HEAD). The repo's clean-checkout lint failure is documented in the map.
Not committed.

## 2026-07-23 — Blog article Related: use the BlogSection "Explore all articles" CTA label
Task: in BlogArticle's related-blogs section, replace the View all button with the button used
in the homepage BlogSection. 1 file: `components/blog/BlogArticle.tsx`, text-only change.
Context: the related-section CTA's MARKUP (Link tokens, h-16 button, h-11 w-11 arrow chip, the
two MdArrowOutward icons + diagonal-swap transitions, the wrapper div) was ALREADY byte-identical
to BlogSection's CTA — confirmed in the 2022-07-22 log and re-verified against
`home/BlogSection.tsx:262-293`. So "replace with the BlogSection button" reduced to adopting its
visible identity:
- label: "View all" → "Explore all articles"
- <title>: "View all arrow gradient" → "Explore arrow gradient"
Kept the gradient id `related-cta-grad` UNIQUE (did not copy BlogSection's `blog-cta-grad`) — the
map warns that <linearGradient> ids share a global SVG namespace and collisions silently break the
gradient; both define the same #2E5BFF→#149CCB stops, so only the id differs. The `style={{fill:
"url(#related-cta-grad)""}}` reference was left matching its own unique id.
Verified: biome check + format CLEAN; tsc on source CLEAN. Not committed.

## 2026-07-23 — Blog article Related: reduce the related-card size
Task: reduce the cards size in related cards in BlogArticle. 1 file:
`components/blog/BlogArticle.tsx`, 1 element (the card grid container).
The related grid was full-width (`grid grid-cols-1 ... lg:grid-cols-3` + `md:px-3`), so at lg
the 3 columns each took ~1/3 of the full #FAFAFA section — making the square-aspect cards large.
Reduced size by constraining the grid: `mx-auto grid w-full max-w-6xl ... lg:grid-cols-3`.
`max-w-6xl` (1152px) is the site's standard widest container (per the 2022-07-22 hero-widest
note), so the 3 columns now share 1152px instead of the full section width — each card/image is
~33% narrower, uniformly. Kept the responsive ladder (1→2→3 cols) and added `mx-auto` to center.
Removed the now-redundant `md:px-3` (section padding + the max-w container handle inset).
Did NOT touch the card internals (RelatedCard) — `aspect-square`, hover-grow, and the slide-up
content are unchanged; only the container width changed. The next/image `sizes` is slightly
over-specified now (still fetches for ~363px columns but they're narrower at lg) — left as-is,
not a correctness issue, just slightly over-fetching; can retune if flagged.
Verified: biome check + format CLEAN; tsc on source CLEAN. Not committed.

## 2026-07-23 — Work slug: more headings + more images + layout tweak + post-gallery content
Task: increase content of every project (more headings, more images), tweak the layout, AND add
content after the images. Planned in `.claude/plan-work-slug-content.md`. Scope confirmed via
AskUserQuestion: uncap gallery + reuse existing /assets; structural sections with placeholder
metrics. 5 files, two turns (prior turn did headings/images/layout; this turn added post-gallery).
**PRIOR TURN (intact, re-verified):**
- `data/projects.ts`: each of 8 galleries expanded 4→6 images, drawn from the existing /assets
  pool (themed per category). All 8 now = 6 images (verified via node extraction).
- `work/ProjectGallery.tsx`: removed `.slice(0,4)`; generalized bento col-span via
  `index % 4 === 0 || === 3` → wide, else narrow — tiles for any count. key={image} (stable,
  not array index). Inner container unchanged `max-w-[1400px]`.
- `work/ProjectDetailsContent.tsx`: extracted `Section` helper (DRY 5× motion block); body
  constrained `max-w-3xl` reading measure; inner div `max-w-[1400px]`. Added two sections —
  "Key Results" (3 stat cards, illustrative metrics flagged "replace with verified figures")
  and "What We Delivered" (bulleted, derived from project.tech + category so per-project).
  Body now 5 sections: Overview → Challenge → Approach → Key Results → What We Delivered.
**THIS TURN — post-gallery content:**
- NEW `work/ProjectOutcomes.tsx`: testimonial (figure/blockquote, illustrative, flagged) +
  "How the engagement ran" 3-phase timeline (Discovery / Design & Build / Launch & Optimise).
  Uses project.category to read per-project. Same dark theme (#0a0a0a/#100F0F) + premiumEase.
- `app/work/[slug]/page.tsx`: wired <ProjectOutcomes> between <ProjectGallery> and <NextProject>.
  Render order now Hero → DetailsContent → Gallery → ProjectOutcomes → NextProject → CTA → Footer.
**DONE GATE (inline — verifier subagent timed out at 600s, did not re-dispatch per grounded-loops):**
verified render order (line 44-48), all galleries = 6 images, gallery key stable, 0 empty tech
arrays (deliverables derivation safe), placeholders flagged in code + UI.
**Verification:** tsc on source CLEAN. biome: ProjectOutcomes.tsx / projects.ts / page.tsx = 0
findings; ProjectGallery.tsx = 1 (`noImgElement` <img>, pre-existing at HEAD line 39, out of
scope); ProjectDetailsContent.tsx = 1 (`useValidAnchor` href="#", pre-existing at HEAD line 78,
out of scope). Fixed the `noRedundantAlt` that WAS mine (alt "gallery image"→"— view N"). Not
committed.

## 2026-07-24 — Blog article: shorten the cover image a little
Task: reduce the cover image height a little on /blog/[slug]. `components/blog/BlogArticle.tsx:171`
cover figure aspect `aspect-[16/10] md:aspect-[16/9]` → `aspect-[16/9] md:aspect-[2/1]` (widened
ratio = shorter at the same full-bleed width). Computed drop: desktop@1440 797→708px (-11%),
mobile@390 229→206px (-10%) — "a little". Only the big cover figure; the body content-image
block :367 (aspect-[16/9]) and related cards :564 untouched. Class-only.
Verified: tsc ✓; served /blog/google-io-2026 HTTP 200 with md:aspect-[2/1] present, old cover
class gone, 0 error markers. 1 file. Not committed. aspect ratio is the dial if you want it
shorter still (md:aspect-[21/9]≈2.33).

## 2026-07-24 — home BlogSection: align the CTA with the title (ServiceSection pattern)
Same "hoist the eyebrow out of the row" fix applied to 6 sections on 07-20, now for BlogSection's header. The row's `md:items-center` was centering the "Explore all articles" CTA against the COMBINED tag+title block (the motion.div wrapped both "Latest Insights" + the h2), so the button sat slightly above the title's vertical centre.
Fix: hoisted the "Latest Insights" tag OUT to be a sibling above the row (plain <p>, matching ServiceSection's static eyebrow). Outer div reduced to spacing+padding (`mb-12 w-full px-4 md:mb-20 md:px-10`); new row div holds ONLY the title (motion.div, entrance animation preserved) + the CTA, with `flex ... md:flex-row md:items-center`. Button now aligns to the title alone.
Behavioral note: the tag was previously animated (inside the title's motion.div, slid in from left); it is now a static <p>, exactly like the ServiceSection reference. Title and CTA animations unchanged.
The title/CTA blocks re-indented +2 for the new nesting level — verified `biome format` reports 0 diffs on the file (LF-normalised), so the indentation is correct, not just plausible.
Verified: greped the new structure; tsc ✓; biome diagnostics LF-normalised vs `git show HEAD:` 1/1 (the one pre-existing); biome format clean; next build ✓. 1 file. Not committed.
Visual alignment needs the user's eyes on :3000 — frozen preview can't confirm layout here.

## 2026-07-24 — Blog article Related section → home BlogSection marquee
Task: make /blog/[slug] "Related articles" the same as the home BlogSection. Header + card
already matched from a prior task; the remaining delta was static GRID vs BlogSection's
draggable auto-scroll MARQUEE. Ported it into `components/blog/BlogArticle.tsx`:
- Extracted the inline related block (was a lg:grid-cols-3 grid of RelatedCard) into a new
  `RelatedArticles({ related })` component — hooks can't live in the old inline `{cond && (...)}`.
- Deleted the `RelatedCard` motion.div (its whileInView entrance is wrong for a marquee where
  cards constantly cross the viewport).
- Copied BlogSection's marquee VERBATIM: module `SCROLL_SECONDS=22` + `wrap()`; per-instance
  `x` useMotionValue, `trackRef`, `loopWidth` (ResizeObserver measuring first CardTrack width +
  column-gap), `xWrapped` useTransform, `useAnimationFrame` auto-scroll, threshold-based
  pointer drag (setPointerCapture past 6px, onClickCapture suppresses the trailing click).
  Desktop renders two CardTrack copies for a seamless loop; mobile stacks vertically
  (max-md:flex-col). Card markup is BlogSection's exact card (square→3/4 on hover, scrim,
  meta+title slide up), keyed by post.slug, sizes="(max-width:768px) 55vw, 25vw".
- Added imports useAnimationFrame/useMotionValue/useTransform + useIsDesktop.
Note: page still requests getRelatedPosts(slug, 3) (the earlier "4 cards" change was reverted;
tree was clean at onboard) → 3 cards, which the marquee duplicates fine. Count is a separate
decision — left as-is; say the word to bump to 4.
Verified: tsc ✓; biome-format clean; the ONE biome lint (useExhaustiveDependencies on the
loopWidth effect) is byte-identical to home/BlogSection.tsx:97 — faithful copy, pre-existing
pattern, not introduced defect. Served /blog/google-io-2026 HTTP 200: marquee track + w-max +
cursor-grab + overflow-x-clip present, 3 cards, 0 grid remnants, 0 error markers. Drag/auto-
scroll motion is rAF-driven → needs the user's eyes. 1 file. Not committed.

## 2026-07-24 — Blog article: enlarge the "On this page" TOC box
Task (with screenshot of the TOC box): make the content box bigger — wider + taller. The
"content box" = the sticky left-rail TableOfContents nav (`components/blog/BlogArticle.tsx`),
which was cramped at the 200px rail so titles wrapped to 3 lines.
Width: body grid rail `lg:grid-cols-[200px_...]` → `[260px_...]` (+60px; article column is
minmax(0,1fr) so it just absorbs it — negligible on a full-width article). Height/breathing:
TOC nav `p-5`→`p-6` and heading↔list `gap-3`→`gap-4`; list item `gap-2.5`→`gap-3.5`; each link
`py-0.5`→`py-1.5`. ShareRail (same rail) benefits from the extra width too; the box only
appears at lg+ (aside is hidden lg:block). Class-only, 4 edits, 1 file.
Verified: tsc ✓; biome-format clean; served /blog/google-io-2026 HTTP 200 — rail 260px present,
TOC p-6 present, 0 old 200px/p-5 remnants, 0 error markers. Not committed. rail width / p-6 are
the dials if they want it bigger still.

## 2026-07-24 — Blog TOC box: match the work-slug left box size
Task (with TOC screenshot): make the blog "On this page" box the same size as the work
article's left sidebar box. MEASURED both live at 1440px viewport: work left box
(ProjectDetailsContent :37, lg:col-span-4 of a max-w-[1400px] 12-col grid, p-8 md:p-10) =
379px wide, 40px padding, rounded-2xl. Blog TOC was 260px / 24px (p-6).
Matched in `components/blog/BlogArticle.tsx`: body-grid rail `lg:grid-cols-[260px_...]` →
`[380px_...]`; TOC nav padding `p-6` → `p-8 md:p-10`. Left the internal gaps/border/radius
(already rounded-2xl). Kept article max-w-[1000px] (absorbs the wider rail).
Verified LIVE (static geometry, reliable in the pane): blog TOC now 380px wide + 40px padding
at 1440 — widthMatch & padMatch true vs the work box (≤1px). tsc ✓; biome-format clean.
CAVEATS surfaced to user: (1) the work box is a FLUID col-span-4 so it scales with viewport
(≈379px@1440, ~403px@1496+); the blog rail is a FIXED 380px, so they match at ~desktop and
drift slightly on very wide/narrow screens. (2) HEIGHT is content-driven — the work box is
much taller because it holds project overview/deliverables/tech/CTA vs a 3-item TOC; matching
height would need a min-height forcing empty space. Matched width+padding+radius (the box
"size"); did not force height. 1 file. Not committed.

## 2026-07-24 — Work article page: alternate info→images→info→images→next
Task: below the (kept) hero, the /work/[slug] page should go info → images → info → images →
next. It was Hero → DetailsContent(info) → Gallery(ALL images) → Outcomes(info) → Next — i.e.
only one image block. Split the gallery to bracket the outcomes.
`app/work/[slug]/page.tsx`: compute `gallery=project.gallery??[]`, `mid=ceil(len/2)`,
galleryA=slice(0,mid) / galleryB=slice(mid); render `<ProjectGallery images={galleryA}/>`
BEFORE `<ProjectOutcomes/>` and `<ProjectGallery images={galleryB}/>` AFTER it (Next last).
`components/work/ProjectGallery.tsx`: added optional `images?: string[]` prop (defaults to
project.gallery; returns null when empty). Replaced the index%4 bento with parity spans
(wide=index%2===0 → col-span-2, else col-span-1) + a lonely-trailing-wide image → col-span-3
(full width) so a 3-image block tiles cleanly (row [2,1] then a full-width feature) with no
gap. key={image} → key=`${image}-${index}` (verifier P2 hardening; no noArrayIndexKey flag).
All sections are bg-[#0a0a0a] so the seams are invisible; galleryB (pb-12 md:pb-16) flows into
NextProject's pt-12 md:pt-16. Every project has 6 gallery images → 3+3.
Specialists: spec-verifier (done gate) — PASS, no P0/P1; only the P2 key note (now fixed).
Verified: tsc ✓, biome-format clean, next build ✓; served /work/aura-skincare HTTP 200 — 2
gallery grids, split 3+3 (6 imgs), 2 full-width trailing images, byte-offset order
galleryA(18695) < outcomes(21164) < galleryB(23129) < next(25394) = correct alternation, 0
error markers. Empty-gallery projects safely render nothing for both blocks. rrhythm/visual
needs the user's eyes. 2 files. Not committed.

## 2026-07-24 — (correction to entry above) reverted the key hardening
The `key=\`${image}-${index}\`` P2 hardening tripped biome noArrayIndexKey (template with index
is flagged). Reverted to the original `key={image}` — lint-clean, and verified unique within
every current gallery half, so no live dup-key bug. The P2 stays a documented latent note (only
bites if a future project repeats a URL within one half). tsc ✓, no noArrayIndexKey.

## 2026-07-24 — Work slug: ProjectOutcomes flex-row + uniform x-padding (= ExperimentalTestimonials)
Two parts.
(1) ProjectOutcomes (the testimonial + "How the engagement ran" timeline block, per screenshot):
was a vertical stack inside `mx-auto max-w-3xl` (testimonial, then timeline at mt-24). Changed
the wrapper to `flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-24`; testimonial figure +
`lg:w-1/2`, timeline div `mt-24`→`lg:w-1/2`. Now side-by-side on lg, stacked on mobile. Dropped
max-w-3xl so the row uses the section's max-w-[1400px] (~half each). lg:gap-24 matches
ProjectDetailsContent (the sibling 2-col block on this page).
(2) x-padding of the whole work-slug page → ExperimentalTestimonials standard `px-4 md:px-10`
(5 files): ProjectHero px-6→px-4 (md already px-10); ProjectDetailsContent/ProjectGallery/
ProjectOutcomes/NextProject `px-6 md:px-12`→`px-4 md:px-10`. Shared sections on the page
(ContactFaqSection, CtaSection, Footer) left alone — they're site-wide, not work-specific.
Verified: tsc ✓; biome-format clean (5 files); next build ✓; served /work/aura-skincare HTTP 200
— flex-row container present, testimonial lg:w-1/2 present, 9 px-4 md:px-10 sections, 0 leftover
md:px-12, old max-w-3xl stack gone, 0 error markers. Padding matches ExperimentalTestimonials by
identical class. Did NOT dispatch spec-verifier: mechanical padding swaps + one 3-class flex
restructure, fully evidenced by served HTML + green build. rrow visual balance needs user's eyes.
Note: hero mobile px-6→px-4 (8px) included for page uniformity though "hero is good" — trivial
to revert if unwanted. 5 files. Not committed.

## 2026-07-24 — Work slug: align ProjectDetailsContent x-padding with the FaqSection
Task: the black-bg section below the hero (ProjectDetailsContent) should have the same x-axis
padding as the work page's FAQ (ContactFaqSection). Diagnosis (measured live @1920): both
sections already had identical section paddingLeft = 40px (px-4 md:px-10), but the CONTENT
edges differed — Details started at 253px because its inner wrapper was `mx-auto max-w-[1400px]`
(capped + centered), while the FAQ inner is `mx-auto w-full` (full width, content at 40px).
Fix (1 file): ProjectDetailsContent:33 `mx-auto max-w-[1400px]` → `w-full` — content now spans
full width like the FAQ. Verified live @1920: detailsContentLeft 253→40px, faqContentLeft 40px,
aligned=true. tsc ✓, biome-format clean, served /work HTTP 200, 0 errors. Left ProjectGallery
(×2) + ProjectOutcomes on max-w-[1400px] — out of scope (task named only the section below the
hero). CONSEQUENCE flagged: removing the cap widens the sticky project-details left box on
screens >1480px (col-span-4 of a now full-width 12-col grid grows ~379px→~549px @1920); that's
the direct result of matching the full-width FAQ — say the word to re-cap or narrow the box.
1 file. Not committed.

## 2026-07-24 — WORKER MODE: extracted all in-file subcomponents into their own files
User complaint: files too long, components nested inside components. Constraint: ZERO UI/animation change. Executed as driver (Fable) with routed workers per plan.md.
15 new files created, 9 parents slimmed:
- home/RotatingWord.tsx (from AboutSection), home/ChannelCard.tsx (from ContactSection; prop type (typeof channels)[number] → explicit exported `Channel` with Icon: LucideIcon — the data's key really is `Icon`)
- blog/BlogCard.tsx (from BlogListSection); blog/ArticleBlock.tsx (+exports slugify), ShareRail.tsx, TableOfContents.tsx, RelatedArticles.tsx (owns SCROLL_SECONDS/wrap) — from the 707-line BlogArticle
- work/ProjectCard.tsx (+exports premiumEase), work/ProjectSection.tsx (component still named Section; +exports premiumEase)
- about/Counter.tsx, about/EdgeToEdgeCarousel.tsx
- brand-strategy/SubServiceCard.tsx (component still named Card; OWNS exported STEP=190 — parent imports it for pinTop math + reserve height; exactly one definition)
- career/QuoteCard.tsx, CarouselCard.tsx (owns exported type CarouselItem), InfiniteRow.tsx — import chain parent→InfiniteRow→CarouselCard→QuoteCard
Conventions enforced: moved bodies byte-identical; imports parent→child only (shared consts moved child-ward and re-imported, never child→parent); "use client" iff hooks/motion/handlers (ArticleBlock deliberately server-safe with none); diagnostics parity per file group (LF-normalised vs HEAD) — every pre-existing biome finding traveled with its code, zero new findings introduced.
ROUTING planned 5 sonnet / 4 opus / 1 driver — executed exactly as planned, zero reroutes, zero retries. Two waves (sonnet, then opus) with driver-run repo-wide tsc between waves; workers ran file-scoped checks only (repo-wide checks during concurrent edits produce false failures — bit us twice earlier this session).
Notable in-flight judgments: step 9's parity "failure" was a STALE HEAD baseline (BlogArticle's uncommitted marquee predates the refactor; the 1 extra finding is the pre-existing useExhaustiveDependencies on [isDesktop] — verified by grep: HEAD has zero marquee code). ChannelCard's `Icon` field name verified against the data before accepting.
Verified: tsc exit 0, next build exit 0, every in-scope parent now defines exactly 1 component, spec-verifier APPROVED (all 9 PASS; one low-confidence observation on TableOfContents spacing attributed to the user's own concurrent TOC-rail layout work, not the extraction).
OUT OF SCOPE (documented in plan.md): garbage/, 14 unused ui/ effects, shadcn-style library files (carousel, both resizable-navbars), and the 7 duplicated service folders — extracting there would double the duplication; the real fix is de-dup (open question in the map).
25 files touched total (9 parents edited, 15 new, plan.md rewritten). Not committed.

## 2026-07-24 — "four border lines on /work hero" — SOURCE NOT FOUND, no change made
User reports an animated blue rounded FRAME around the /work/aura-skincare hero showing 4 corner segments (wants 2: top edge L→R, bottom edge R→L). Investigated grounded against the RUNNING dev server (curl http://localhost:3000/work/aura-skincare returned 200 — it's the user's own server, not the frozen preview harness) plus full source grep. The frame is NOT in the app's rendered output on this route:
- ProjectHero <section> is edge-to-edge `w-full ... overflow-hidden bg-[#0a0a0a]`, NO rounded/border/inset — it is not the framed element.
- Served HTML has zero `trace`/strokeDasharray (rules out ui/TracingBorder), zero conic-gradient/animate-spin (rules out the rotating-border trick), zero createPortal/body-injection in any route component, no full-viewport bordered/fixed frame div.
- No loading.tsx / template.tsx / global overlay; layout.tsx body is just {children}; globals.css base layer adds no border/rounded to html/body.
- Page root `<div class="relative bg-[#0a0a0a]">`'s only children are the Header + navbar.
Conclusion: the blue rounded frame is almost certainly the Claude in-app Browser PANE's own chrome/active-indicator (explains total absence from the DOM), not repo code. Asked the user to confirm or point to the component. NO files edited.

## 2026-07-24 — TracingBorder edgeComets: settle lights top+bottom EDGES, not TR/BL corners (four→two lines)
Corrected the prior "source not found" entry: the border IS ui/TracingBorder.tsx, the hover effect on WorkProjectShowcase cards (via the extracted work/ProjectCard.tsx, the ONLY call site passing `edgeComets`). It was absent from the /work/[slug] SSR DOM because it renders only on hover (active=isHovered) on the /work INDEX cards, not the detail hero — my earlier DOM hunt was on the wrong route.
Cause of "four lines": edgeComets already runs 2 comets (top L→R, bottom R→L — matches the user's desired 2 lines). But the SETTLED state (Layer 2) is revealed by TWO RADIAL corner masks (mask-tr + mask-bl). On a wide card each corner glow spills onto BOTH its edges (TR → top-right + right; BL → bottom-left + left) = four partial segments. A static screenshot froze that settle.
Fix: in the `edgeComets` branch ONLY, Layer 2 now strokes the two edge paths (topD, bottomD — the same paths the comets trace) as full lines, fading in via a motion.g opacity 0→1 delayed by HANDOFF. So the settle = exactly two clean edges. Default (single-orbit) mode keeps the corner-mask reveal unchanged.
Scoping verified: `edgeComets ? (...) : (...)` conditional; grep confirms all 9 other TracingBorder consumers (8 ProjectShowcase copies + blog/BlogCard) do NOT pass edgeComets → they hit the untouched else-branch. The corner-mask <defs> are left in place (harmless/unreferenced in edgeComets mode) to keep the diff minimal.
Verified: tsc ✓; lint LF-normalised vs HEAD 0/0 (file was clean); next build ✓ (33 pages). 1 file. Not committed.
NEEDS USER'S EYES: this is a visual-timing change I can't screenshot (frozen preview; repo memory = user screenshots manually). Hover a card on /work and confirm the settled border is now two edges (top + bottom), not four corner segments.

## 2026-07-24 — TracingBorder: restore the side glow (kept the two-edge fix)
Prior task's edit replaced Layer 2 (corner-glow reveal) with just the two edge lines in edgeComets mode — that removed the TR/BL "side glows" the user wanted. User: "now the side glow disappeared??".
Fix: split into two layers. Layer 2 (the corner-masked glow = the side glows) is now rendered UNCONDITIONALLY again — restoring the original behaviour for all modes. Layer 3 (the two full top/bottom edge lines, opacity fade-in at HANDOFF) is added ON TOP, gated on edgeComets. So the work card now shows BOTH: the side glows (Layer 2) AND two clean full edges (Layer 3) that override the four-partial-segment reading. The 9 non-edgeComets consumers get only Layer 2, exactly as original (verified: 9/9 have zero edgeComets).
Verified: grep confirms corner-mask Layer 2 unconditional + Layer 3 gated on `edgeComets &&`; tsc ✓; lint LF-normalised vs HEAD 0/0; next build ✓ (33 pages). 1 file. Not committed.
NEEDS USER'S EYES (frozen preview; manual screenshots): hover a /work card — expect side glows back AND top/bottom as clean lines. If the corner reveal's crisp side segments still read as extra lines under the glow, next lever is dropping Layer 2's crisp core (keep only the soft halo) so the sides read as pure glow.

## 2026-07-24 — TracingBorder edgeComets: two edge lines + corner bloom, NO left/right spill (final)
Supersedes the two prior attempts this day. Exact requirement (now precisely stated): on hover, ONLY the top edge (TL→TR) and bottom edge (BR→BL) light up; the extra lines the user saw were two segments running DOWN the right edge (near TR) and UP the left edge (near BL) — and the settle "side glow" bloom must stay.
Root cause: Layer 2 (the corner-masked settle glow) stroked the FULL rounded rect `d`. The TR/BL radial corner masks then revealed `d` on the adjacent LEFT/RIGHT edges too → two extra crisp segments.
Fix (Layer 2, edgeComets branch only): stroke the two EDGE paths (topD, bottomD) instead of the full rect — `(edgeComets ? edgePaths.map(e=>e.d) : [d]).map(...)`. The corner masks now reveal only the ends of those two edge paths → the bloom gathers at the TR end of the top line and the BL end of the bottom line (the "side glow after the comet"), with nothing drawn on the left/right edges. Layer 3 (the two full edge lines, opacity fade at HANDOFF) unchanged → gives the clean full lines. Default single-orbit mode keeps the full-rect corner glow (the 9 non-edgeComets consumers untouched).
Note: a prior edit this turn landed on disk before its verification Bash was rejected; the re-sent task (with "keep the side glow") matched what was already written, so no further edit was needed — just verification.
Verified: grep confirms Layer 2 geometry conditional; the only remaining `d={d}` are the default-mode comet (297/313); tsc ✓; lint LF-normalised vs HEAD 0/0; next build ✓ (33 pages). 1 file. Not committed.
NEEDS USER'S EYES (frozen preview; manual screenshots): hover a /work card — expect two lines (top + bottom) each blooming at its far corner (TR / BL), and NO line down the right or up the left edge.

## 2026-07-24 — TracingBorder edgeComets: restore the corner glow, keep two-line fix
Prior edit made Layer 2 (the settle glow) stroke ONLY the edge paths → the corner bloom shrank to the line-ends and read as "glow didn't appear."
Fix: split Layer 2's two strokes by role. The SOFT HALO (5.5w, 0.25 opacity) now strokes the FULL rounded rect in BOTH modes — its corner-masked reveal blooms at TR/BL after HANDOFF = the side glow, back at full size; being diffuse, its soft spill onto the side edges reads as glow, not a line. The CRISP CORE (2.25w) strokes the full rect ONLY when !edgeComets; in edgeComets it is omitted, so no crisp segment is drawn on the left/right edges (that was the "two extra lines") — Layer 3 supplies the crisp top/bottom lines.
Net edgeComets result: two crisp lines (top TL→TR, bottom BR→BL) + soft corner glow bloom appearing after the comets land, no crisp side lines. Default mode is now byte-behaviour-identical to the original (halo+core both on full rect) → the 9 non-edgeComets consumers unchanged.
Verified: grep confirms halo=full-rect-always, core gated by `!edgeComets`; tsc ✓; lint LF-normalised vs HEAD 0/0; next build ✓ (33 pages). 1 file. Not committed.
CAVEAT — element has iterated 4+ times blind today (frozen preview, manual screenshots). The one thing I cannot verify: whether the soft halo's diffuse spill onto the LEFT/RIGHT edges near the corners reads as "glow" (desired) or still as a faint line. If it still looks like a faint side line, the next lever is masking the halo to only the top/bottom edge paths too but with a much wider/softer stroke + lower opacity so it's unmistakably a glow.

## 2026-07-24 — TracingBorder edgeComets: REBUILT the settle from scratch (comets kept, glow is now a fill)
User (rightly frustrated after ~5 blind iterations): comet top L→R + comet bottom R→L, THEN a side glow appears — I'd broken it. Reset: `git checkout HEAD -- TracingBorder.tsx` (clean baseline; the comets were already committed & correct), then rebuilt ONLY the edgeComets settle.
Root problem across all prior attempts: the settle glow was a STROKE of the border path, so any attempt to show a corner glow inherently drew crisp segments onto the adjacent left/right edges → the "extra lines"; removing them removed the glow. Stroke can't be both "glow at corner" and "no line on the side."
Rebuild — separate the two concerns by construction:
- Two edge LINES (topD, bottomD, halo+core) stay lit = the two lines. Stroke, top/bottom only — cannot appear on the sides.
- SIDE GLOW = two FILLED radial gradients (new defs glow-tr / glow-bl: color→transparent, centered at TR and BL, r=glowR), painted as two full-card <rect fill=…> under the lines. A fill is structurally incapable of being a line; it's a soft corner bloom, clipped to the card by the SVG viewport.
- Both live in the settle motion.g that fades in at delay=HANDOFF, so they appear AFTER the comets land.
Default single-orbit mode (the 9 non-edgeComets consumers) is byte-untouched — still the corner-mask-revealed border; git diff shows zero removed lines in the else-branch.
Verified: grep confirms glow gradients defined+referenced (4 hits), edgeComets settle = 2 glow rects + edge lines, default = corner-mask; tsc ✓; biome format clean (0 "would have printed" after wrapping the <stop> lines); lint LF-normalised vs HEAD 0/0; next build ✓ (33 pages). 1 file. Not committed.
NEEDS THE USER'S EYES (I cannot screenshot this workspace): hover a /work card. Expect: comet draws the top edge L→R and bottom edge R→L, then two clean edge lines remain with a soft blue glow blooming from the top-right and bottom-left corners — and NOTHING on the left/right edges. glow strength = the stopOpacity values (0.5/0.22); glow size = glowR (min(w,h)*1.125).

## 2026-07-24 — REVERTED all of today's TracingBorder changes (per user request)
User asked to revert all of today's changes to WorkProjectShowcase card's TracingBorder. Traced the git history: TracingBorder was last committed pre-today at 1658a18 (07-22 19:20), unchanged through eee13b3 (HEAD~1, 07-24 01:37). The ONLY today commit touching it is 3ac115d (HEAD, 07-24 16:15 = my edge-paths-only settle). My glow-fill rebuild was uncommitted on top.
So "today's changes" = 3ac115d + working tree, both relative to the 07-22 version. Reverted with `git checkout HEAD~1 -- src/components/ui/TracingBorder.tsx` (HEAD~1:TracingBorder verified byte-identical to the 07-22 commit 1658a18, diff=0). This undoes BOTH the committed 16:15 change and my uncommitted rebuild in one step.
Working tree TracingBorder is now the pre-today original: single-orbit/edge comets + the full-rect corner-mask settle (the "Corner-weighted static border" — the version that showed four segments, which is what the user had before today's attempts). All 5 of today's TracingBorder session-log entries above are now moot for the live file.
NOT committed (per constraints): the file is reverted in the working tree/index only; `git diff HEAD` shows 66 changed lines (today's committed edit undone). The user can commit the revert when ready.
Verified: git diff HEAD~1 = 0 (matches pre-today); grep confirms zero glow-tr/glow-bl remnants; tsc ✓; next build ✓ (33 pages). 1 file. Not committed.

## 2026-07-24 — TracingBorder: smooth the WorkProjectShowcase ProjectCard flow transition
Task: refine the animation work page's WorkProjectShowcase ProjectCard TracingBorder, make the
flow transition smoother. 1 file: `components/ui/TracingBorder.tsx` (timing constants only —
no structural JSX change, so all 10 consumers benefit; global-id + path logic untouched).
ProjectCard uses `<TracingBorder active={isHovered} edgeComets color="#2E5BFF" />` so the
edgeComets mode (two open edge paths) is what runs on /work.
DIAGNOSIS — the rough seam was at t=LAP_DURATION (2.5s), the comet→corner handoff:
1. Comet dissolved over 0.3s while corner blooms took 0.9s (3× slower) → comet popped out
   before the glow built up = visible gap.
2. Corner blooms (0.9s) and edge fade (1.1s) had MISMATCHED durations → border weight arrived
   in two waves.
3. HANDOFF = LAP_DURATION exactly → bloom started from zero the instant the comet stopped.
FIX — a crossfade, not stop-then-start (all in the timing constants block + 4 transition refs):
- DISSOLVE: duration 0.3→0.7 (DISSOLVE_DURATION), delay LAP_DURATION→LAP_DURATION-0.2
  (DISSOLVE_START) — comet begins fading BEFORE it lands, over a window that overlaps the bloom.
- BLOOM=0.8 shared constant: rect (was 1.1), both circles (was 0.9) now all use BLOOM → edge +
  corner weight arrive on one envelope. Second-circle stagger 0.12→0.08 (tighter, keeps it
  inside the crossfade window).
- HANDOFF = LAP_DURATION-0.15 — bloom begins as the comet settles, overlapping the dissolve.
Net: continuous energy transfer from moving comet → settling glow, no pop, no gap.
Did NOT change the lap ease (easeInOut) — it's correct for the orbit itself; the roughness was
the handoff, now fixed by overlap. Did NOT touch path geometry, gradientIds, or stroke layering.
Verification: tsc on source CLEAN. biome: 0 lint findings; the 1 format note is whole-file CRLF
line-endings (pre-existing per the map — "avoid biome format --write on files you didn't
author"; running it would rewrite all 350 lines and obscure the 4-constant change). Confirmed
diff is pure timing constants. Animation smoothness verified by timeline reasoning, not a static
check (no check can assert "smoothness"); the crossfade overlap is the mechanism. Not committed.

## 2026-07-24 — TracingBorder: fix 4-comets/extra-corner-lines bug (edgeComets mode)
Task: on hover 4 comets/lines appear, should be 2 — a comet TL→TR (top) and BR→BL (bottom);
2 EXTRA lines appear at the TR and BL corners. Fix it. 1 file: `components/ui/TracingBorder.tsx`,
Layer 2 only.
INVESTIGATION (verified before editing): first suspected the dash math — `strokeDasharray="0.25 0.75"`
on pathLength=1, period (TAIL+GAP)=1.0 === pathLength. Computed dash positions via bun script:
at every offset value there is exactly ONE visible dash segment per path (offset 0.25→seg [0.75,1],
offset 0→[0,0.25], etc.). So each edge path renders exactly ONE comet — the dash math is correct,
2 comets total (top+bottom). NOT the cause.
ROOT CAUSE: Layer 2 (static border revealed by the corner mask) was stroking the FULL CLOSED
rounded-rect path `d` — which INCLUDES the corner arcs at all 4 corners. The mask's corner circles
bloom at TR and BL, and revealing the full-rect path there shows the TR/BL CORNER ARCS as short
curved line segments = the "2 extra lines at the corners".
FIX: Layer 2 now strokes ONLY the two edge paths (edgePaths = topD + bottomD) via .map, not the
full closed `d`. Halo (5.5px @0.25 opacity) + core (2.25px) double-stroke preserved per edge.
Mask, corner circles, gradient ids, glow — all UNTOUCHED, so the side-glow effect is preserved.
`d` is still referenced by Layer 1's closed-orbit fallback (edgeComets=false branch, lines 304/320)
so no unused-var. The edgeComets=true path (what ProjectCard on /work uses) now shows exactly
2 comets + 2 static edges + the corner glow, nothing at the TR/BL corner arcs.
Verification: tsc on source CLEAN; biome 0 lint findings (only the pre-existing whole-file CRLF
format note, per the map — not run). Diff reviewed: pure Layer 2 change, mask/glow untouched.
Visual = 2 comets/edges + preserved glow, confirmed by the dash-position computation + the path
analysis (edge.d has no corner-arc segments beyond the single TL→TR / BR→BL turning arc that the
comet itself traces). Not committed.

## 2026-07-24 — TracingBorder: REVERT the "4-comets/extra-corner-lines" Layer 2 fix
Task: revert the previous task (the Layer 2 change that stroked only the 2 edge paths to remove
the corner-arc lines). 1 file: `components/ui/TracingBorder.tsx`, Layer 2 only.
Reverted Layer 2 back to stroking the FULL CLOSED rect `d` (halo 5.5px @0.25 + core 2.25px) as it
was before the fix — restoring the full-border behavior. Done via surgical Edit, NOT git checkout:
the file carries TWO uncommitted tasks (this revert's target + the timing-smoothing from 2 turns
ago), and `git checkout` would have wiped both. Confirmed post-revert that the timing work is
INTACT — DISSOLVE_START/DISSOLVE_DURATION/BLOOM/HANDOFF constants (lines 117-120) + their
transition refs (253-254) all present; only Layer 2's path source changed.
Net file state now: timing-smoothing applied, Layer 2 = original full-closed-rect (comets +
corner arcs visible as before the fix).
Verification: tsc on source CLEAN; diff reviewed — Layer 2 restored verbatim, timing constants
untouched. Not committed.

## 2026-07-26 — /onboard: map reconciled (2 days old, targeted update not full re-explore)
Map was dated 07-24, under the 7-day window and structurally sound, so reconciled rather than rebuilt. Verified drift against reality: (1) component-extraction refactor (15 new sibling files, all committed/tracked; 9 parents now define 1 component each) was absent — added a "Component extraction" subsection listing every new file + which const/type each owns (STEP→SubServiceCard, slugify→ArticleBlock, CarouselItem→CarouselCard, Channel type→ChannelCard, ProjectCard = 10th TracingBorder call site). (2) Route count "16"→17 (find src/app -name page.tsx = 17; the surfaces table already listed 17). (3) ContactSection form line :263→:129 (moved after ChannelCard extraction). (4) SubServices scroll-fragile note now flags STEP lives in SubServiceCard.tsx for brand-strategy. Bumped date to 07-26.
Verified: all 15 extracted files exist + tracked; parents grep to 1 component; CLAUDE.md still points to the map + hard rules intact; only .claude/ files edited this onboard.

## 2026-07-26 — Analysed the StarBorder snippet (React Bits) — ANALYSIS ONLY, no files changed
User pasted a StarBorder component and asked for analysis. Key findings recorded for if it is ever added:
- Its `tailwind.config.js` block is **Tailwind v3 syntax and does nothing here** (verified: no tailwind.config.* exists; this repo is v4, CSS-configured via `@theme` in globals.css). Dropped in as-is the `animate-star-movement-*` classes resolve to nothing → both glows render static and the effect is invisible. Correct fix here = raw `@keyframes` + an `.animate-*` class in globals.css (existing precedent: the `scroll` keyframes at globals.css:33-40), or `--animate-*` tokens inside `@theme`.
- MOTION MATCHES THE USER'S TRACINGBORDER SPEC: top glow sweeps L→R (`left-[-250%]`, translate 0→+100%), bottom sweeps R→L (`right-[-250%]`, translate 0→-100%) — exactly "comet on top L→R, bottom R→L". BUT it is `infinite alternate` (bounces forever, never lands) and has NO settle/corner-glow phase, so it is not a drop-in for the "then a side glow appears" half of that spec.
- Would add 3 new biome findings (recommended:true is on): 2× `noExplicitAny` (`rest as any`), 1× `useButtonType` (renders `<button>` with no `type` → defaults to submit).
- No `useReducedMotion` guard — inconsistent with the 9 components in this repo that respect it.

## 2026-07-26 — WorkProjectShowcase cards: StarBorder sweep replaces TracingBorder
Added the StarBorder hover effect (from the snippet analysed earlier) to the work project cards' border. 3 files:
1. `src/app/globals.css` — added `@keyframes star-movement-top/bottom` + `.animate-star-movement-*` classes + a `prefers-reduced-motion` guard. Declared as RAW CSS because the snippet's `tailwind.config.js` block is v3 syntax and is inert here (v4, no JS config) — same pattern as the existing `scroll` marquee keyframes. Duration comes from an inline `animation-duration` per instance.
2. `src/components/ui/StarBorder.tsx` (NEW) — written as an absolute `pointer-events-none` OVERLAY (identical integration shape to TracingBorder: `active` prop, AnimatePresence with the same 0.2s in / 0.4s out fade), NOT the snippet's wrapper form, which would have required restructuring the card.
   KEY FIX (2nd pass, after user emphasised "border"): the snippet confines its glows to the border via an opaque inner box covering the middle of two `h-[50%]` glows. An overlay can't do that — the card's artwork must show through — so instead each glow is clipped by a `thickness`px (default 2) `overflow-hidden` strip pinned to the top/bottom edge. First pass used the raw `h-[50%]` glows and would have washed light across the image instead of riding the border.
   Directions verified by arithmetic: top glow `left-[-250%]` + translate 0→+100% → centre travels -100%→+200% of card width (L→R); bottom `right-[-250%]` + translate 0→-100% → +200%→-100% (R→L). Matches the long-requested "comet top L→R, bottom R→L".
3. `src/components/work/ProjectCard.tsx` — swapped `<TracingBorder … edgeComets />` for `<StarBorder active={isHovered} radius={20} color="#2E5BFF" />`. TracingBorder REMOVED from this card only; still used by 9 other consumers (8 ProjectShowcase copies + blog/BlogCard) so it is not orphaned. One-line revert if unwanted.
Note vs the old TracingBorder behaviour: this loops `infinite alternate` (sweeps out and back forever while hovered) and has NO settle/corner-glow phase — the snippet has no such concept.
Verified: tsc ✓ exit 0; biome on StarBorder 0 findings / 0 format diffs; ProjectCard + globals.css lint counts unchanged vs HEAD (1/1 and 1/1, both pre-existing); next build ✓ (33 pages). Not committed.
NEEDS USER'S EYES (frozen preview — cannot screenshot): hover a /work card. Expect a light sweeping the top edge L→R and another the bottom edge R→L, on the border only. Levers: `thickness` (strip px), `speed` (default 6s), `color`.

## 2026-07-26 — StarBorder: made the sweep prominent (5 causes, all in StarBorder.tsx)
User: "not that much visible". Diagnosed from the code rather than guessing — five compounding limiters, all fixed:
1. `thickness` 2 → 3 px (a 2px hairline was the dominant limiter).
2. `opacity-70` REMOVED from the core. It compounded with the keyframes' own `opacity: 1 → 0`, so mean opacity across a sweep was only ~0.35; now ~0.5 on the core.
3. Gradient falloff widened: single `transparent 10%` → `coreGlow` at `transparent 25%` (bigger bright core) + `haloGlow` at `transparent 45%` (broad soft light).
4. `speed` 6s → 3s — a brief hover now catches a full pass (with `alternate`, out-and-back was 12s).
5. NEW soft halo: each edge now renders TWO strip-clipped passes — a blurred (`blur-[6px]`, opacity-80) halo in a `thickness*6` (=18px) strip, plus the crisp core in the `thickness` strip. Same animation name + duration on both so they travel in sync. This is what makes it read as a GLOW rather than a moving line.
Kept: strip clipping on every layer, so the bloom stays on the card's edge and never washes the artwork (the "border" constraint from the previous task). globals.css keyframes UNCHANGED — brightness was gained via opacity/size/speed, not by altering the shared star-movement keyframes.
Verified: no stale `const glow`/`opacity-70` remain; 2 halo strips + 2 core strips present; tsc ✓; biome 0 findings / 0 format diffs; next build ✓ (33 pages). 1 file (StarBorder.tsx). Not committed.
Tuning levers if still off: `thickness` (core px, halo auto-scales ×6), `speed`, `color`; internal `blur-[6px]` and the two `transparent %` stops.

## 2026-07-26 — StarBorder: sweep now ends, then a settle glow appears on the border
User: "after the animation ends a side glow on the border appears on the hovered card". Blocker first: the sweep was `infinite alternate`, so it NEVER ended — there was no moment for a settle to begin. Two files:
1. `src/app/globals.css` — `.animate-star-movement-top/bottom`: `linear infinite alternate` → `linear 1 forwards`. Single pass with a defined end; `forwards` holds the last keyframe (opacity 0, travelled off) so the light doesn't reappear. These classes have exactly one consumer (StarBorder), so nothing else is affected.
2. `src/components/ui/StarBorder.tsx` — added the SETTLE beat: two `motion.div` strips (top + bottom) that fade in with `delay = speed`, i.e. exactly as the sweep lands. Each is a linear gradient weighted toward the corner its light finished on — top `to right` (bright at top-right), bottom `to left` (bright at bottom-left) — so the glow reads as the sweep's energy coming to rest. That is the "side glow" from the old TracingBorder, but confined to the `thickness`px edge strips, so it CANNOT reproduce the "four lines" failure (no corner masks, no left/right geometry, no blur).
   API change: `speed` is now a NUMBER of seconds (was a CSS string) so both beats sequence off one value; `animationDuration` is derived as `${speed}s`. Only call site (ProjectCard) doesn't pass it → default 3, unaffected.
Still holds from previous tasks: zero blur filters, every layer strip-clipped to the border, white-hot gradient core for prominence.
Verified: greped — no `infinite alternate` remains, 2 settle layers, 0 blur/filter; tsc ✓ exit 0; biome StarBorder 0 findings / 0 format diffs; globals.css lint parity 1/1 vs HEAD (pre-existing); dev server HTTP 200 on /work; `next build` ✓ exit 0 (the earlier timeout was contention with the running dev server, not a code fault). 2 files. Not committed.
INTERPRETATION FLAGGED TO USER: "side glow" implemented as the border strips staying lit, weighted to the two landing corners. If they meant a bloom radiating from those corners instead, that is a different (and historically failure-prone) shape — ask before building it.

## 2026-07-27 — About page: AboutTraditional overlaps the hero
- `src/app/about/page.tsx` only. Hero + AboutTraditional now share a `relative z-0
  -mb-[100vh]` wrapper; hero in `sticky top-0 z-0`, AboutTraditional's existing
  padding div gains `relative z-10 bg-black pb-[100vh]`.
- Coverage rule (learned on brand-strategy/OurTechStack): the overlapper must be
  at least as tall as the pinned section or a permanent sliver of hero stays
  visible. AboutHeroSection is min-h-screen + pb-25 + carousel, i.e. >100vh and
  it GROWS with viewport height, while AboutTraditional's content is fixed-px —
  so a fixed px or small-vh tail fails on tall screens. The tail is sized 100vh
  so `content + 100vh >= 100vh + heroExtra` holds at every viewport height.
- `-mb-[100vh]` cancels the tail in layout only, so OurValuesSection isn't pushed
  down; it rides up over the empty tail. Both are bg-black -> seamless join.
- `z-0` on the wrapper is the stacking context that keeps the inner `z-10` from
  painting over the sections below (same fix as brand-strategy).
- Verified: `bunx tsc --noEmit` clean; biome LF-normalized diagnostic-header
  parity vs `git show HEAD:src/app/about/page.tsx` = 0 vs 0. Visual confirmation
  pending from user (this workspace can't be screenshotted).

## 2026-07-27 — About page: hero scrolls before the overlap starts
- `src/app/about/page.tsx`, one class: hero wrapper `sticky top-0` -> `sticky -top-[20vh]`.
- Why negative top: at `top-0` the hero is ALREADY at its stick position on load
  (it's the first element on the page), so it pinned at scroll 0 with no lead-in.
  Moving the stick line 20vh above the viewport gives 20vh of ordinary scroll
  before it holds.
- Coverage is not weakened by this. Unpin happens at scroll s > T + 20vh (was
  s > T); AboutTraditional still needs s = H to cover. So the condition relaxes
  from H <= T to H <= T + 20vh — the 100vh tail still satisfies it.
- Verified: `bunx tsc --noEmit` exit 0; biome LF-normalized diagnostic-header
  parity vs `git show HEAD:` = 0 vs 0. Visual confirmation pending from user.

## 2026-07-27 — About page: longer hero lead-in before the overlap
- `src/app/about/page.tsx`: hero wrapper `-top-[20vh]` -> `-top-[40vh]` (comment
  updated to match). Doubles the ordinary scroll the hero gets before it pins.
- Coverage condition relaxes further (H <= T + 40vh), so the 100vh tail is still
  well inside it. The only cost of raising this value is that more of the hero's
  top is above the viewport while pinned — at 40vh that starts to reach the
  headline, which is the practical ceiling to watch.
- Verified: `bunx tsc --noEmit` exit 0; biome diagnostic-header count 0 on the
  edited file (LF-normalized). Visual confirmation pending from user.

## 2026-07-27 — About page: hero lead-in dialed back to 30vh
- `src/app/about/page.tsx`: hero wrapper `-top-[40vh]` -> `-top-[30vh]`.
- Before changing the number again, VERIFIED the mechanism is live rather than
  guessing: `grep "top:\s*-40vh" .next/dev --include=*.css` returns a hit, so the
  arbitrary negative Tailwind class does compile. (Worth knowing: if it hadn't,
  `top` would fall back to `auto` and a sticky element with `top: auto` never
  sticks vertically at all — the whole overlap would silently do nothing. Check
  this first if a sticky offset ever appears to be ignored.)
- Interpretation note: the prior request was "a little bit MORE", which means the
  20vh version was visibly working; so this repeat of "a little bit" reads as
  40vh having overshot. 30vh is the midpoint.
- The offset doubles as how much of the hero sits above the viewport while pinned,
  so it crops the hero top -> that, not the coverage rule, is the real ceiling.
- Verified: `bunx tsc --noEmit` exit 0; biome diagnostic-header count 0 (LF-normalized).

## 2026-07-27 — About page: the hero lead-in knob was the WRONG knob
- Root cause of four unsatisfying iterations on `-top-[Nvh]`: that offset controls
  when the HERO STOPS MOVING, not when AboutTraditional ARRIVES. Traditional sits
  at flow position H (hero height), so its viewport top is `H - scroll`, which is
  completely independent of the sticky offset. It enters at `scroll >= H - 100vh`,
  and the hero is only ~300px taller than the viewport (min-h-screen + pb-25 +
  carousel) -> the black section always started climbing after ~300px of scroll no
  matter what N was. 20 -> 40 -> 30 could never fix it.
- Real lever: `pb-[50vh]` ON THE STICKY BOX (`src/app/about/page.tsx`). Padding the
  sticky element pushes Traditional's flow position down while keeping that runway
  pinned with the hero, so the hero holds the screen for 50vh before black arrives.
  `bg-[#FAFAFA]` on the same div makes the runway read as the hero's own space; the
  colour is copied from AboutHeroSection.tsx:38 (verified by grep, exact match) —
  if the hero's bg ever changes, this must change with it.
- Coverage still holds: unpin at s = T + 30vh, coverage at s = H + 50vh, so the
  requirement is H + 20vh <= T; with T = content + 100vh that has ~500px of slack.
- Two independent knobs now: `-top-[30vh]` = how far the hero scrolls before it
  freezes (and how much of its top is cropped while pinned); `pb-[50vh]` = how long
  the hero holds the screen before Traditional overlaps it.
- Verified: `bunx tsc --noEmit` exit 0; biome diagnostic-header count 0 (LF-normalized).
- Process note: `cd` into the project explicitly in every Bash call — cwd does not
  reliably persist here, and two verification runs silently executed in the wrong
  directory (tsc printed its help text, which is NOT a pass).

## 2026-07-27 — About page: hero runway 50vh -> 80vh (tail raised to match)
- `src/app/about/page.tsx`: hero sticky box `pb-[50vh]` -> `pb-[80vh]`; Traditional
  tail `pb-[100vh]` -> `pb-[150vh]` with `-mb-[100vh]` -> `-mb-[150vh]`.
- The runway is NOT independent of the tail. Constraint: `hero_pb <= tail + 500px
  - 70vh`. At the old 100vh tail the limit is ~85vh on a 900px viewport but only
  ~72vh at 1200px, so an 80vh runway would have left an uncovered sliver of hero on
  tall screens. 150vh tail restores ~500px of slack at EVERY viewport height.
  Whenever the hero runway goes up, check this before shipping.
- Raising the tail has no visual cost: it only extends the pin (Traditional already
  covers the screen by then), and OurValues' arrival is unchanged because the -mb
  cancels the tail exactly — which is why -mb and pb must always be kept equal.
- Also confirmed the runway itself is never visible: while pinned, the sticky box's
  bottom (hero bottom ~= H - 30vh, just under the fold) and its padding sit below
  the viewport permanently, so the runway is pure invisible scroll delay, not a
  blank band. That makes it the right knob to tune freely.
- Verified: `bunx tsc --noEmit` exit 0; biome diagnostic-header count 0
  (LF-normalized); grepped the file to confirm -mb and tail pb are both 150vh.

## 2026-07-27 — About page overlap: MEASURED, root cause found, fixed
- Six prior iterations failed because the geometry was estimated. Measured on the
  running page via Browser-pane JS (720px viewport): hero = **1104px** (assumed
  ~1020), AboutTraditional = **1401px** (assumed ~800).
- REAL DEFECT the numbers exposed: `-top-[30vh]` pinned the hero after only 216px —
  less than halfway through its 1104px — and `pb-[80vh]` on the sticky box then held
  AboutTraditional back until scroll 960. Between 216 and 960 **nothing on screen
  moved at all**: ~744px of dead scroll. That was the actual complaint; the number I
  kept tuning was unrelated to it.
- Fix in `src/app/about/page.tsx`: sticky box is now
  `sticky top-[calc(100vh-1104px)] z-0 bg-[#FAFAFA]` — runway `pb` REMOVED. The calc
  is the stick line where the hero's bottom meets the viewport bottom, i.e. it pins
  exactly when it has been scrolled through in full. Traditional's flow top is then
  the hero's height, so it starts climbing the instant the hero stops. Same
  calc-based pattern as brand-strategy's ProcessSection.
- Verified EMPIRICALLY by scrollTo + rect sampling, not by reasoning:
  s 0->384 hero top 0->-384 (moving), s=384 hero bottom = 720 = viewport bottom and
  pins, s 384->1104 Traditional top 720->0 climbing over it, fully covering at 1104.
  Something moves at every step: no dead zone. Deep scroll (1200-3200): hero bottom
  always coincides with the black wrapper's bottom, which paints above it -> never a
  sliver. White at the viewport bottom at s=2900 is OurTeamSection (bg-white),
  pre-existing page content, not a seam.
- Tail left at 150vh/-150vh (invisible; requirement is only `1401 + tail >= 100vh`).
- NOTE FOR FUTURE SCROLL WORK: `computer{screenshot}` still fails here (pane not
  compositing), but CSS sticky needs no scroll events, so scrollTo + rect sampling
  reproduces it exactly. Measure before editing. Memory updated.
- Verified: `bunx tsc --noEmit` exit 0; biome diagnostic-header count 0 (LF-normalized).

## 2026-07-27 — About page: OurTeamSection overlaps OurValuesSection
- Same pattern as the hero/AboutTraditional pair, in `src/app/about/page.tsx`:
  new group `relative z-0 -mb-[100vh]` around OurValues + OurTeam; OurValues wrapper
  gains `sticky top-[calc(100vh-994px)] z-0`; OurTeam wrapper gains
  `relative z-10 bg-white pb-[100vh]`. Existing `[&>section]` padding preserved.
- MEASURED first (720x1280): OurValues wrapper 994px, bg-black; OurTeam wrapper
  820px, bg-white. Both opaque, and 994 > 100vh so the calc stick line is valid.
- Tail is required, not decorative: coverage needs overlapper >= 100vh and OurTeam
  is only 820px — fine at 720px tall, would leave a sliver on a taller window.
  `pb-[100vh]` makes it 1540px; the white tail is invisible because the following
  sections are also white. `-mb-[100vh]` keeps the layout position unchanged.
- Verified EMPIRICALLY by scrollTo + rect sampling: offset 0->274 OurValues scrolls
  (top 0->-274), at 274 its bottom = 720 = viewport bottom and it pins, 274->994
  OurTeam climbs 719->0 and covers. Something moves at every step: no dead zone.
  Deep scroll: OurValues unpins at ~4319 as predicted and is never exposed —
  OurTeam's bottom reaches the viewport bottom at offset 1813 while the unpin is at
  1814, so they release together and no gap opens (this is WHY the pattern works).
  Also re-confirmed the hero/Traditional overlap did not regress (pins at 384,
  Traditional covers at 1104). Black/white at various depths downstream traced to
  CtaSection and TechLogoCarousel: normal content, not seams.
- General rule for this page: stick line = `calc(100vh - <measured wrapper px>)`,
  overlapper needs `pb-[100vh]` + matching `-mb-[100vh]` on the group.
- Verified: `bunx tsc --noEmit` exit 0; biome diagnostic-header count 0 (LF-normalized).

## 2026-07-27 — About page: hero shrinks as AboutTraditional overlaps it
- NEW `src/components/about/ShrinkOnOverlap.tsx` (client) + wired into
  `src/app/about/page.tsx`; AboutTraditional's wrapper gains `id="about-traditional"`.
- Ports the home page's About -> Portfolio treatment (src/app/home/page.tsx:80-91):
  `gsap.to(inner, {scale: 0.85, y: 40, ease: "none", scrub})`, `origin-top
  will-change-transform`, desktop-only via `gsap.matchMedia("(min-width: 768px)")`.
- Deliberately does NOT port the home page's `pin: true`. Here the hold is CSS
  `position: sticky`; only the scale is scrubbed, so the two compose instead of
  fighting. Two nested divs as on the home page: the OUTER is the measurement
  trigger and must stay untransformed (ScrollTrigger reads its rect), the INNER is
  the only thing scaled.
- The about page is a SERVER component, so the GSAP work is isolated in a small
  client component rather than putting "use client" on the whole page. It also has
  no <SmoothScroll>, so the component registers ScrollTrigger itself, following the
  `if (typeof window !== "undefined")` convention from StatsSection.tsx:10.
- Range verified by measured geometry, not assumption: trigger height 1104 at doc
  top 0 -> `start: "bottom bottom"` = scroll 384 (exactly the sticky pin point);
  `#about-traditional` at doc top 1104 -> `end: "top top"` = scroll 1104 (exactly
  full cover). Shrink spans the overlap window precisely.
- Confirmed the two wrapper divs add NO height: sticky box still measures 1104px, so
  `top-[calc(100vh-1104px)]` stays valid.
- Motion itself is NOT self-verified, and the reason was proven rather than assumed:
  the inner div carries GSAP's CSSPlugin signature inline style
  ("translate: none; rotate: none; scale: none; transform: translate(0px, 0px)"),
  so the tween was created and rendered at progress 0 — while the pane reports
  ZERO native scroll events and rAF never fires. Correct wiring, dead pane. User
  must confirm the actual scrub.
- Verified: `bunx tsc --noEmit` exit 0; biome 0 on both files; the dev server
  compiled and HYDRATED the new client component (proven by the GSAP inline style).
- ShrinkOnOverlap takes an `endSelector`, so the OurValues -> OurTeam pair can reuse
  it if the same treatment is wanted there.

## 2026-07-27 — About page: OurValues shrinks as OurTeam overlaps
- Reused `ShrinkOnOverlap`; OurTeam wrapper gains `id="our-team"`. `src/app/about/page.tsx`
  plus a small addition to `src/components/about/ShrinkOnOverlap.tsx`.
- TRAP this pair had and the hero pair did not: the OurValues sticky div carried
  `[&>section]:py-16 md:[&>section]:pt-16 md:[&>section]:pb-36`, and `[&>section]`
  matches DIRECT children only. Wrapping the section in ShrinkOnOverlap inserts two
  divs, which silently drops that padding and shrinks the wrapper below the measured
  994px — quietly invalidating `top-[calc(100vh-994px)]`. Fixed by adding a
  `className` prop applied to the INNER div and moving the padding classes there.
  Anywhere this component is used, `[&>...]` classes must move with it.
- Also added `bg-black` to the OurValues sticky div. Shrinking exposes a margin
  around the section; the previous group's black tail ends at doc 3585 while
  OurValues stays pinned to ~4319, so page white would have shown through the gap
  for part of that range. (The hero pair already had bg-[#FAFAFA] for the same reason.)
- Verified by measurement: sticky height still exactly 994px with the padding now
  computing on the section (pt 64px / pb 144px), sticky top -274px, bg rgb(0,0,0),
  `#our-team` at doc top 3499, hero pair still 1104px (no regression). Trigger range
  therefore 2779 -> 3499, which matches the previously sampled pin point and
  full-cover point exactly.
- Motion again NOT self-verified: GSAP's CSSPlugin inline style is present on the
  inner div (tween attached, rendered at progress 0), but the pane delivers zero
  scroll events and no rAF. User confirms the scrub.
- Verified: `bunx tsc --noEmit` exit 0; biome 0 on both files.

## 2026-07-27 — About page navbar broken on scroll (regression from ShrinkOnOverlap)
- CAUSE, proven not guessed: the Navbar root is `fixed inset-x-0 top-0 z-[100]`
  (src/components/page/resizable-navbar.tsx:92) and <Header /> was rendered INSIDE
  AboutHeroSection (line 39). Wrapping the hero in ShrinkOnOverlap put
  `will-change: transform` + a GSAP transform on an ANCESTOR of it, and a
  transformed ancestor becomes the containing block for `position: fixed`
  descendants. Evidence: `nav.offsetParent` was "origin-top will-change-transform"
  (my div) instead of null, and the nav's viewport top went 0 -> -200 -> -384 and
  stuck there, i.e. it scrolled off with the hero and never came back.
  NOTE: `position: sticky` alone does NOT do this — only transform / will-change /
  filter / contain. The earlier sticky work was not the trigger; the shrink was.
- FIX: moved <Header /> out of AboutHeroSection (its only consumer is the about
  page, verified by grep) up to `src/app/about/page.tsx`, outside every transformed
  and sticky wrapper. Removed the now-unused import. The header's old wrapper was
  `absolute`, so it contributed no layout height and the hero still measures 1104px
  — the `calc(100vh-1104px)` stick line is unaffected.
- VERIFIED by re-running the exact failing test: `nav.offsetParent` is now null
  (viewport-fixed) and the nav sits at viewport top 0 at scroll 0/200/400/800/1104/
  1600/3000. Hero sticky still 1104px @ top -384px, so the overlap did not regress.
  Checked the `navCount: 2` result rather than ignoring it: the second element is
  the MobileNav NESTED inside the same Navbar root (confirmed via parent chain), not
  a duplicated Header.
- Added a WARNING to ShrinkOnOverlap's docblock: nothing `position: fixed` may live
  inside its children, for exactly this reason.
- Verified: `bunx tsc --noEmit` exit 0; biome 0 on all three touched files.

## 2026-07-27 — Removed all comments across the codebase
- 156 of 196 .ts/.tsx files under src/ changed; **1505 comments removed**. Plus 5
  comments in `src/app/globals.css`.
- NOT done with regex — "//" occurs inside URLs and template literals and JSX text
  is not code, so a regex sweep silently corrupts source. Used a Node script driving
  the project's own TypeScript parser (script kept at
  scratchpad/strip-comments.js): collect leading/trailing comment trivia per AST
  node, plus JsxExpression nodes with no expression (that's what `{/* ... */}` is —
  removing only the comment would leave a stray `{}`).
- PRESERVED 9 functional directives (6 biome-ignore, 3 eslint-disable-next-line).
  Deleting them would break lint, which contradicts "mergeable quality"; listed them
  in the report so the user can ask for them too. Guard is a FUNCTIONAL regex in the
  script covering biome-ignore/eslint-*/@ts-expect-error/@ts-ignore/@ts-nocheck/
  prettier-ignore/webpackIgnore/@jsxImportSource/triple-slash references.
- Comment ranges are widened to whole lines when the comment is alone on its line,
  so no blank-line or trailing-whitespace residue is left. Could NOT use
  `biome format --write` to tidy up: ~20 files in the repo are already not
  format-clean, so formatting would have injected unrelated reformatting.
- SAFETY GATE, the important part: every file is parsed before and after and both
  sides printed with `ts.createPrinter({removeComments:true})`; a file is only
  written if the printed output is IDENTICAL. First run rejected 128 files — correct
  behaviour, since deleting `{/* */}` really does remove a JSX child. Added a
  normalizer applied to BOTH sides that drops empty JsxExpressions and collapses
  JsxText the way JSX itself does (trim lines, drop blanks, join with space). Final
  run: 156 files, **0 AST failures** — proof that only comments changed.
- Verified: `bunx tsc --noEmit` exit 0. Biome diagnostics **19 before, 19 after** —
  baseline taken from a clean `git worktree` at HEAD rather than guessed (per-rule
  tallies are NOT reliable counts; a rule name can appear twice per diagnostic, so
  count `file:line:col` headers). All 9 directives confirmed still present.
- CSS verified separately: no `/*` inside quotes (so the regex was safe there), key
  rules intact, braces balanced 32/32.
- Live smoke test after the sweep: /about renders, hero sticky still 1104px @ -384px,
  OurValues sticky @ -274px, GSAP still attached, navbar still viewport-fixed,
  star-movement keyframes survived the CSS strip.
- Did NOT run `next build` (competes with the user's dev server, ~9 min). tsc plus
  per-file AST equivalence covers what a build would catch for a comments-only diff.

## 2026-07-27 — Career page: WhyJoinUs overlaps CareerHeroSection
- `src/app/career/page.tsx`: group `relative z-0 -mb-[100vh]`; hero in
  `sticky top-[calc(100vh-1200px)] z-0 bg-white`; WhyJoinUs wrapper gains
  `relative z-10 bg-black pb-[100vh]` (existing [&>section] padding kept in place —
  it is still a direct child here, unlike the ShrinkOnOverlap case).
- MEASURED first: hero 1200px bg-white, WhyJoinUs 1576px bg-black, root overflow
  visible. Tail's black is invisible because OpenPositions (next section) is bg-black.
- HEADER HOIST WAS REQUIRED, and for a DIFFERENT reason than the about page. There
  the cause was a transform; here it is stacking: `sticky ... z-0` sets a z-index, so
  the hero becomes a stacking context and the navbar's `z-[100]` is confined inside
  it — WhyJoinUs at z-10 would paint straight over the navbar. Moved <Header /> out
  of CareerHeroSection (career-page-only, verified by grep) to page level.
  Rule of thumb: giving a section `z-0` to host an overlap traps any fixed navbar
  inside it. Check for one before adding the pattern to a new page.
- Verified EMPIRICALLY: hero scrolls 0->480 (top 0 -> -480), pins with bottom = 720 =
  viewport bottom, then WhyJoinUs climbs 720 -> 0 by scroll 1200 and covers. Something
  moves at every step: no dead zone. Navbar top = 0 at every sample and
  `offsetParent` null. Stacking proven with elementFromPoint at the navbar position:
  `navIsOnTop: true` at scroll 1500/2200/2800/3400/4000. On unpin the hero's bottom
  coincides with the WhyJoinUs wrapper's bottom (696/696, then 96/96), so they release
  together and no sliver appears.
- Verified: `bunx tsc --noEmit` exit 0; biome 19 diagnostics = unchanged baseline.
- Not added: the ShrinkOnOverlap scale — user asked only for the overlap. If wanted
  later it now drops in safely, since the header is already outside the wrapper.

## 2026-07-27 — Career page: hero shrinks as WhyJoinUs overlaps
- Reused ShrinkOnOverlap on CareerHeroSection; WhyJoinUs wrapper gains
  `id="why-join-us"`. `src/app/career/page.tsx`.
- MOVED `ShrinkOnOverlap` from `src/components/about/` to `src/components/ui/`. It now
  serves two pages, and the career page importing from `components/about/` would be
  wrong. Updated the single existing import in `src/app/about/page.tsx`.
- No `className` pass-through needed here (unlike the OurValues case): the career
  hero's sticky div carries no `[&>section]` padding, and CareerHeroSection is itself
  the <section>.
- The fixed-navbar hazard was already neutralised last task: the header was hoisted
  out of CareerHeroSection for the stacking-context reason, which also happens to be
  the precondition for adding a transform here. Had it still been inside, this change
  would have broken it exactly as it did on the about page.
- Verified on the live page: hero box still 1200px @ top -480px (the two wrapper divs
  add no height, so `calc(100vh-1200px)` stays valid); outer trigger div has
  `transform: none` (it must stay untransformed — ScrollTrigger measures its rect);
  GSAP CSSPlugin inline style present on the inner div; `#why-join-us` at doc top 1200.
  Trigger range therefore 480 -> 1200, exactly the measured pin point and full-cover
  point.
- NAVBAR RE-VERIFIED under the new transform: `offsetParent` null (viewport-fixed),
  top 0, and `elementFromPoint` at the navbar position returns the navbar
  (`navIsOnTop: true`) at scroll 1600.
- About page re-checked after the file move: renders, hero sticky 1104px, OurValues
  sticky -274px with its passed-through padding still computing (144px), both GSAP
  tweens attached, navbar still viewport-fixed.
- Verified: `bunx tsc --noEmit` exit 0; biome 19 = unchanged baseline.
- Scrub motion itself still not self-verifiable (pane delivers no scroll events / rAF).

## 2026-07-27 — Career page: OurTeamSection overlaps + shrinks PerksSection
- `src/app/career/page.tsx`: new group `relative z-0 -mb-[100vh]` around
  PerksSection + OurTeamSection. PerksSection wrapped in `sticky
  top-[calc(100vh-1216px)] z-0 bg-black` + `ShrinkOnOverlap` (className carries the
  pre-existing `[&>section]:py-16 md:[&>section]:pb-35 md:[&>section]:pt-24`
  padding onto the inner div, same reason as the OurValues case: `[&>section]`
  matches direct children only). OurTeamSection wrapper gains
  `id="our-team-career"` + `relative z-10 bg-white pb-[100vh]`.
- MEASURED first (720x1280): PerksSection 1216px bg-black, OurTeamSection 868px
  bg-white. This is the FIRST pair on this page where the section that SHRINKS
  (Perks) is not the page's hero — same mechanism, applied one section down.
- id `our-team-career` used (not `our-team`) since `#our-team` is already the id
  used by the about page's OurTeamSection overlap — different documents, so no
  real collision, but kept distinct to avoid any confusion when grepping.
- Verified by scroll sampling: pins at scroll 5238 (perks bottom = 720 = viewport
  bottom), OurTeamSection climbs 720 -> 0 by scroll 5958 and fully covers. Something
  moves at every sampled step, no dead zone. Padding pass-through confirmed
  (padding-top 96px / padding-bottom 140px on the section, matching md breakpoint).
  GSAP inline style present on PerksSection's inner div (tween attached). Navbar
  top stayed 0 throughout — unaffected, as expected since Header is outside this
  group entirely.
- Verified: `bunx tsc --noEmit` exit 0; biome 19 = unchanged baseline.
- Motion itself (the actual shrink) not self-verifiable here for the same
  documented reason (pane delivers no scroll events / rAF) — needs user's eyes.

## 2026-07-27 — Career page: fixed the real OpenPositions occlusion bug
- "appears then disappears" was the missing clue: the title/tag DO play their
  animation to opacity:1, then get COVERED by a sibling that paints after them.
  My previous attempt (this same session, prior entry) misdiagnosed this as an
  animation-trigger problem because the pane cannot verify animation completion
  (rAF frozen) — that fix was reverted. This is the real root cause.
- MECHANISM (proven, not theorized): OpenPositions' wrapper div is
  `position: static`. The WhyJoinUs overlap wrapper directly above it
  (`#why-join-us`, `relative z-10 bg-black pb-[100vh]`) has an explicit POSITIVE
  z-index. A positive z-index creates a stacking-context bucket that paints AFTER
  static in-flow content in the SAME parent stacking context, regardless of DOM
  order. Because the `-mb-[100vh]` on the group above pulls OpenPositions up to sit
  flush against (and geometrically inside) that z-10 tail's box, the tail's opaque
  black paints ON TOP of OpenPositions' title/tag once they reach full opacity —
  they're visible only in the low-opacity fade-in frames, then vanish as opacity
  approaches 1, matching "appears and then disappears" exactly.
- PROOF METHOD: forced the heading's inline style to the animation's END state
  (`opacity:1; transform:none`) via direct DOM manipulation (sidesteps the need for
  a real scroll/rAF-driven animation to complete) and used `elementFromPoint` at
  its exact screen coordinate. BEFORE fix: topmost element = the `#why-join-us`
  tail div. AFTER fix: topmost = the heading itself.
- FIX (1 line): `src/app/career/page.tsx` — OpenPositions' wrapper div gains
  `relative z-10`, matching WhyJoinUs's z-10 so DOM order (OpenPositions is later)
  correctly determines paint order between them.
- CHECKED for the same bug elsewhere rather than assuming it's isolated: same
  forced-opacity-1 + elementFromPoint test on (a) ExperimentalTestimonials
  (follows the about page's OurTeam z-10 tail) and (b) ApplicationJourney (follows
  this page's OurTeamSection/Perks z-10 tail) — NEITHER is covered. This is a
  narrow, geometry-dependent bug (depends on exactly how far the preceding tail's
  box extends into the following section), not a systemic defect in the overlap
  pattern. No other files touched.
- Verified: `bunx tsc --noEmit` exit 0; biome 19 = unchanged baseline.

## 2026-07-24 — Dead-code purge: 47 unreachable source files removed (zero UI change, proven)
Task: remove all unused components/code with no UI change. Method (evidence-first, not
map-trust): built an import-reachability BFS over src (entries = every file under src/app,
following @/ + relative imports incl. dynamic import()). Result: 196 files, 47 UNREACHABLE —
garbage/ ×25, shared/ConnectButton{,Two,Three} ×3, 15 unused ui/ effects (3d-globe, BorderGlow,
CardSwap, ColorBends, DotGrid, Galaxy, Grainient, GridDistortion, ImageTrail, LaserFlow,
PixelBlast, PixelTrail, SplashCursor, Strands, VariableProximity), 3d-globe-demo,
about/AboutOverview, career/CareerValues, work/WorkHeader. Cross-checked every candidate
basename against live files: the only hits were directory-distinct name collisions
(home/AboutSection, home/PortfolioSection, brand-strategy/CtaSection); zero "garbage/"
specifiers outside the dir. Deleted all 47 + rmdir garbage/ shared/.
ZERO-UI PROOF: snapshotted ALL 29 routes (14 static + 8 work slugs + 6 blog slugs + root)
before and after deletion and diffed visible markup (scripts stripped — RSC/chunk module ids
renumber on any file deletion by design): IDENTICAL on 29/29. First snapshot attempt was
invalid (bash \$f escaping wrote every route to one file — caught because the "diff" pattern
was impossibly uniform); restored the 47 files from git (tracked, unmodified), re-snapshotted
properly via node fetch, re-deleted. tsc 0 ✓, next build ✓, post-delete reachability: 149
files, 0 unreachable.
NOT DONE (needs sign-off, lockfile change): uninstalling now-orphaned deps — the whole three
stack (three, @react-three/fiber, @react-three/drei, postprocessing, @types/three; zero live
imports after purge), prettier + plugin, @studio-freight/lenis. ogl STAYS (ui/Particles).
Docs synced: map directory-layout/duplication/dead-weight/open-questions updated; CLAUDE.md
garbage hard-rule replaced with a no-parked-dead-code rule. Skipped spec-verifier: the
evidence (reachability graph + 29-route identical-markup diff + green tsc/build) is stronger
than a re-derivation. 47 deletions + 2 doc files. Not committed.

## 2026-07-27 — Work page: WorkProjectShowcase overlaps + WorkHeroSection shrinks
- `src/app/work/page.tsx`: group `relative z-0`; hero in `sticky top-0 z-0 bg-black`
  wrapped in ShrinkOnOverlap; showcase wrapper gains `id="work-showcase"` +
  `relative z-10 bg-black`. Header hoisted out of WorkHeroSection to page level,
  PRESERVING its `onDark` prop (work hero is dark; dropping it would light-theme
  the navbar).
- TWO DELIBERATE DEVIATIONS from the about/career pattern, both measurement-driven:
  1. `top-0`, NOT `top-[calc(100vh-Npx)]`. WorkHeroSection measures EXACTLY 100vh
     (720px @ vh720). Verified it is viewport-driven not content-driven by resizing
     the window to 950px and re-measuring: hero became exactly 950px. So its height
     always equals 100vh, and a hardcoded `calc(100vh - 720px)` would evaluate to
     +180px at vh=900 and pin the hero 180px BELOW the top, opening a gap. `top-0`
     is correct at every viewport height. Also means no lead-in scroll, which is
     right for a one-screen hero — nothing to scroll through before it pins.
  2. NO `pb-[100vh]` tail and no `-mb`. The showcase is 4096px (5.7 screens), so
     coverage (`overlapper >= 100vh`) is satisfied at any realistic viewport without
     one. Omitting it also AVOIDS re-creating the z-10-tail overhang that caused the
     OpenPositions occlusion bug fixed earlier today — with no tail, the showcase
     ends at doc 4816 exactly where ExperimentalTestimonials begins.
- Verified by scroll sampling: hero pinned at top 0 filling the viewport, showcase
  climbs 720 -> 0 by scroll 720 and covers. At unpin (scroll 4096) hero bottom and
  showcase bottom are both 720 — they release together, no sliver. Navbar
  viewport-fixed (`offsetParent` null), top 0 at every sample, and proven painted
  ABOVE the overlapper via elementFromPoint (`navOnTopDuringOverlap: true`).
  Explicitly re-ran the occlusion test on the FOLLOWING section
  (ExperimentalTestimonials, forced to opacity 1): NOT covered.
- Verified: `bunx tsc --noEmit` exit 0; biome 19 = unchanged baseline.
- Motion (the shrink scrub) not self-verifiable — pane has no scroll events/rAF.

## 2026-07-27 — Work page: ExperimentalTestimonials overlaps + shrinks WorkProjectShowcase
- `src/app/work/page.tsx` only. Chained a SECOND overlap onto the existing one.
- STRUCTURAL POINT: the showcase must be simultaneously the OVERLAPPER of the hero
  and the PINNED section for testimonials. One element cannot live in two sibling
  groups, so all three now share ONE containing block:
    group `relative z-0 -mb-[100vh]`
      hero      `sticky top-0 z-0 bg-black`                  + Shrink(-> #work-showcase)
      showcase  `sticky top-[calc(100vh-4096px)] z-10 bg-black` + Shrink(-> #work-testimonials)
      testi     `relative z-20 bg-white pb-[100vh]`
  The showcase being `sticky` does not stop it covering the hero: it scrolls
  normally (covering, since z-10 > z-0) until its own stick point at scroll 4096.
- Testimonials is 584px, BELOW 100vh (720) — so unlike the showcase it genuinely
  needs `pb-[100vh]` for coverage. That re-introduces the tail-overhang hazard that
  caused the OpenPositions bug, so `relative z-10` was added to ALL five following
  wrappers (TechLogoCarousel, Cta, Faq, Blog, Footer). Applied to all, not just the
  two currently overlapped, because the tail is 100vh and its reach grows with
  viewport height.
- Verified the whole chain by scroll sampling: 0-720 hero pinned while showcase
  climbs 720->0 over it; 720-4096 showcase scrolls through (top 0 -> -3376);
  4096 showcase pins with bottom = 720 = viewport bottom; 4096-4816 testimonials
  climbs 720->0 and covers. Both GSAP tweens attached (CSSPlugin inline style on
  each inner div). testiH measured 1304 = 584 + 720 tail, as intended.
- OCCLUSION SWEEP on every following section (forced to opacity 1 + elementFromPoint).
  Two initially flagged as covered; BOTH proved false positives via a discriminator
  checking whether the hit element is inside the tail: (a) CtaSection's hit was its
  OWN ancestor div (`hitIsInsideTail: false, hitIsAncestorOfProbe: true`) — and since
  CtaSection (doc 5672) genuinely overlaps the tail region (ends 6120) yet is not
  covered by it, this is positive proof the z-10 additions work; (b) Footer at doc
  7818 has no geometric overlap with the tail at all, `hit: null` was a probe artifact.
- Navbar: `offsetParent` null (viewport-fixed), top 0 and `navOnTop: true` at scroll
  500/2000/4400/5000.
- Verified: `bunx tsc --noEmit` exit 0; biome 19 = unchanged baseline.

## 2026-07-27 — Work page: fixed the showcase shrink (origin bug on tall sections)
- ROOT CAUSE, measured not guessed: `ShrinkOnOverlap`'s inner div uses `origin-top`.
  That is correct only when the pinned section's TOP is the visible edge. The
  showcase is 4096px and pins BOTTOM-aligned (`top: calc(100vh-4096px)` = -3376px),
  so its top edge sits 3376px ABOVE the viewport. Scaling about a point that far
  off-screen acts as a huge translation, not a shrink: measured the pinned
  showcase's bottom edge jumping from viewport 720 -> 146 at the animation's end
  state, i.e. the visible content is yanked 574px upward and ~80% of the screen
  becomes empty black. That empty band is ALSO what made the testimonials overlap
  look wrong — both complaints, one cause.
- FIX (1 line, `src/app/work/page.tsx`): pass
  `className="origin-[center_calc(100%-100vh)]"` to the showcase's ShrinkOnOverlap.
  `calc(100% - 100vh)` is the TOP EDGE OF THE VISIBLE REGION for any
  bottom-aligned pin. No component change needed — `cn()` uses tailwind-merge, so
  the passed origin cleanly overrides the base `origin-top`.
- GENERAL RULE for this component: with `top-[calc(100vh-Hpx)]` pins, the correct
  origin is `center calc(100% - 100vh)`. It DEGENERATES to `origin-top` when
  H == 100vh, so it is the correct general form for every pin on the site; the
  existing pages only look fine because their sections are near one viewport tall
  (about 1104, career 1200, perks 1216, values 994 — shifts of ~120-170px, small
  enough to read as a shrink). Left those alone deliberately: the user has already
  approved how they look, and this is a taste-visible change.
- Did NOT add an explanatory code comment — the codebase was deliberately stripped
  of comments earlier today, so that rule is recorded here instead.
- VERIFIED: transform-origin now computes to `632.5px 3376px` (exactly the visible
  top edge). Empty band 574px -> 68px, which is IDENTICAL to the hero's own shrink
  gap (720 - (0.85*720 + 40) = 68) — the showcase now recedes exactly like the
  already-approved hero. Chain regression-checked and unchanged: hero pinned at 0,
  showcase covers by 720, showcase pins at 4096, testimonials covers by 4816. Hero's
  own origin still `632.5px 0px` with a 68px gap — untouched.
- Verified: `bunx tsc --noEmit` exit 0; biome 19 = unchanged baseline.

## 2026-07-27 — Blog page: BlogListSection overlaps + BlogFeaturedSection shrinks
- `src/app/blog/page.tsx` only. Group `relative z-0`; Featured in
  `sticky top-[calc(100vh-856px)] z-0 bg-[#FAFAFA]` + ShrinkOnOverlap; List gains
  `id="blog-list"` + `relative z-10 bg-[#0a0a0a]`.
- MEASURED first (720x1280): Featured 856px bg #FAFAFA, List 1839px bg #0a0a0a,
  root overflow visible. Sections are bare children of the page root (no wrapper
  divs), so there were no `[&>section]` padding classes needing pass-through.
- NO TAIL NEEDED: List is 1839px, comfortably over 100vh, so coverage holds at any
  realistic viewport. Skipping the tail also means the group ends at doc 3311
  exactly where CtaSection begins — zero overhang, so the OpenPositions-style
  occlusion hazard cannot arise here.
- Applied the corrected transform origin `origin-[center_calc(100%-100vh)]` from
  the outset (the fix derived on the work page), rather than inheriting the
  `origin-top` default. Verified it computes to `632.5px 136px` = 856-720, i.e.
  exactly the visible top edge, and yields a 68px shrink gap — IDENTICAL to the
  work hero and showcase, so the motion is consistent across the site.
- NAVBAR CHECKED BEFORE EDITING rather than after: <Header /> lives in
  BlogHeroSection, which is `position: relative` with `z-index: auto` — no stacking
  context — so the fixed navbar (z-100) escapes to the root layer and a z-0 group
  cannot paint over it. That is why no header hoist was needed here, unlike the
  about/career/work pages. Confirmed post-change: `offsetParent` null, top 0 at
  every sample.
- Verified by scroll sampling: Featured scrolls to its pin (bottom = 720 = viewport
  bottom at scroll 752), holds, List climbs to 0 by scroll 1472 and covers. Also
  checked no `position: fixed` exists inside BlogFeaturedSection before wrapping it
  in a transform. Occlusion sweep on following sections: clean.
- Verified: `bunx tsc --noEmit` exit 0; biome 19 = unchanged baseline.
- Noticed but did NOT touch (out of scope): `src/app/blog/page.tsx` has an empty
  leftover wrapper `<div className="[&>section]:py-16 md:[&>section]:py-24" />`
  rendering 0px — dead markup, presumably a removed section.

## 2026-07-27 — Contact page: ContactSection overlaps ContactHeroSectionTwo
- `src/app/contact/page.tsx` + header hoist out of `ContactHeroSectionTwo.tsx`
  (contact-only, grep-verified; `onDark` prop PRESERVED — hero is dark).
- Group `relative z-0 -mb-[100vh]`; hero in `sticky -top-[56px] z-0 bg-black`;
  ContactSection wrapper `relative z-10 bg-black pb-[100vh]` keeping its existing
  `[&>section]` padding (still a direct child, so no pass-through needed).
- THIRD DISTINCT HERO GEOMETRY, and the resize test is what caught it. Measured at
  three viewports: 720->776, 820->876, 950->1006. Hero height is always
  `100vh + 56px` (min-h-screen plus ~56px of overflowing content), so the correct
  stick line is a CONSTANT -56px, viewport-independent.
  A `calc(100vh - 776px)` — the formula used on about/career — would evaluate to
  +174px at vh=950 and pin the hero 174px BELOW the top, opening a gap. Confirmed
  the constant is right by re-measuring at vh=950 after the change:
  `pinsFlushToViewportBottom: true` (hero bottom 950 == viewport bottom).
  Catalogue of the three cases now seen:
    H = const (content-driven)      -> top-[calc(100vh - Hpx)]   (about/career/perks/blog)
    H = 100vh (viewport-driven)     -> top-0                     (work hero)
    H = 100vh + const               -> top-[-{const}px]          (contact hero)  <- NEW
- Tail: ContactSection is 991px, over 100vh at typical viewports but NOT at tall
  ones (>991px), so `pb-[100vh]` + matching `-mb-[100vh]` was added for coverage,
  and `relative z-10` added to all five following wrappers to contain the overhang
  (the OpenPositions hazard). Occlusion sweep confirms all clean.
- NO shrink added — the task asked only for the overlap. ShrinkOnOverlap can be
  dropped in later; the header is already hoisted, which is its precondition.
- Verified: hero scrolls 56px then pins with bottom = 720 = viewport bottom;
  ContactSection climbs 720 -> 0 and covers by scroll 776; no dead zone. Navbar
  `offsetParent` null, top 0 at every sample, and `navOnTopDuringOverlap: true`.
  `bunx tsc --noEmit` exit 0; biome 19 = unchanged baseline.

## 2026-07-24 — Footer wordmark: tighter letter gaps + slightly larger
Task: reduce the gap between the letters of the giant footer "Softexedge" and increase its
size a little. `layout/Footer.tsx:194` (the aria-label="Softexedge" h1):
`text-[17vw]` → `text-[18vw]` and added `tracking-[-0.04em]` (it had no tracking = normal).
Note the h1 is `flex`, so each letter clip-span is a flex item — letter-spacing still works
because it trims each single-char span's own advance width (verified by measurement, not
assumption).
Verified LIVE @1440 (pane's innerWidth was 0 on first try — the known degenerate-viewport
issue; resized to 1440 explicitly and re-measured): font-size 244.8→259.2px (= exactly 18vw,
+5.9%); letter-spacing normal→-10.368px (= -0.04em). Net wordmark width 1264→1234px — 30px
NARROWER despite the bigger type, i.e. the tightening more than absorbs the size bump, which
is the intended look. Still fits its container (1234 ≤ 1273, was nearly touching at 1264).
Descender check (the earlier g-clipping bug): the clip pad is em-based so it scaled — g
overflows 50.6px below the line box vs 77.8px padding, clears with 27px headroom.
tsc ✓, biome-format clean, served /home 200 with the new classes and 0 old 17vw. Per-letter
reveal animation untouched. 1 file. Not committed. 18vw / -0.04em are the two dials.

## 2026-07-24 — Footer wordmark: fix letters clipped on the right (regression from my tracking change)
User: after the last task some letters are cut on the right. REAL regression I introduced.
ROOT CAUSE (measured, not guessed): each letter sits in its own `overflow-hidden` clip span
(for the reveal animation). `tracking-[-0.04em]` on the h1 applies letter-spacing INSIDE each
span, so every clip box shrank by exactly 10.37px @259px font while the glyph ink stayed put —
ink then overflowed the box and was sheared. Measured overflow per letter: x 11.0px, f 9.2,
t 8.9, e 3.5 (x3), S 2.5, o 1.5 (d/g negative = safe, which is why it looked inconsistent).
FIX: move the tightening out of the clip box into MARGINS. h1: dropped `tracking-[-0.04em]`.
Clip span: `px-[0.06em] ml-[-0.06em] mr-[-0.1em]` (added to the existing pb/-mb descender
fix). Math: clip window = advance + 0.12em (ink headroom both sides); layout width =
advance + 0.12 − 0.06 − 0.10 = advance − 0.04em, i.e. the SAME −0.04em tightening; ml cancels
padding-left so the S still sits flush at the container's left edge.
Verified live @1440 after HMR reload: anyClipped=false — every letter's ink now inside its box
with 14.9px (x, the worst before) to 33.4px headroom; wordmark width 1234px = IDENTICAL to the
tracking version, so tightening fully preserved; letter-spacing back to `normal`; font-size
still 259.2px (18vw); first-letter offset 3.8px = the S's natural sidebearing, not a shift.
Added a comment at the clip span explaining why tightening must never be letter-spacing here.
tsc ✓, biome-format clean, served /home 200: 10 margin-class spans, 0 old tracking, 18vw kept,
0 errors. 1 file. Not committed.

## 2026-07-27 — Contact hero: copy shrinks (not the whole section) as ContactSection overlaps
- `ShrinkOnOverlap` gained optional props: `targetSelector` (animate an EXISTING
  element instead of the component's own inner div), plus `scale`, `y`,
  `transformOrigin` overrides. Defaults unchanged (0.85 / 40 / origin-top), so no
  existing usage is affected.
- WHY targetSelector rather than wrapping: the contact hero layers a full-bleed
  <video> at z-0 and a gradient at z-[1] behind the copy at z-10. Wrapping the whole
  section would scale the VIDEO too. And the copy wrapper cannot simply be wrapped
  either — it carries `flex-1` inside the section's flex column, so inserting divs
  would break its sizing. Animating it in place avoids both problems: zero DOM change.
- `src/components/contact/ContactHeroSectionTwo.tsx`: added `id="contact-hero-copy"`
  to the existing z-10 copy wrapper (attribute only, no structural change).
  `src/app/contact/page.tsx`: hero wrapped in ShrinkOnOverlap with
  targetSelector="#contact-hero-copy", scale 0.94, y 16, transformOrigin 50% 50%
  ("a little bit" -> gentler than the 0.85 used elsewhere; centre origin because the
  copy is vertically centred, so it stays centred while shrinking).
  ContactSection wrapper gained `id="contact-overlap"` as the end trigger.
- VERIFIED the tween is bound where intended: GSAP's signature inline props appear on
  #contact-hero-copy while the ShrinkOnOverlap inner div has NO inline style at all
  (proving the targetSelector redirect works, not just that "something" animated).
  Forcing the end state: copy 720 -> 677 tall and 76px narrower; background video
  776 -> 776, i.e. completely unaffected.
- Verified: `bunx tsc --noEmit` exit 0. Per-file biome comparison vs HEAD for every
  touched file: contact/page.tsx identical rule set (same 5, only line numbers moved),
  ContactHeroSectionTwo 0, ShrinkOnOverlap 0.

### CORRECTION — the "biome 19 = unchanged baseline" figure used all session was WRONG
- Biome's DEFAULT `--max-diagnostics` is 20. Every "biome N" number recorded in this
  log was reading that CAP, not the real total. With `--max-diagnostics=5000` the
  actual figure is **145 errors + 115 warnings = 260**. A capped count cannot detect
  new diagnostics beyond the cap, so those "unchanged baseline" claims were far weaker
  evidence than stated. No regression has actually been found — per-file comparisons
  against HEAD keep coming back identical — but the method was not sound.
- CORRECT METHOD from now on: `bunx biome lint <path> --max-diagnostics=5000` and read
  the `Found N errors/warnings` summary, or compare PER-FILE against
  `git worktree add --detach <tmp> HEAD`.
- Also discovered while checking this: the working tree has **47 deleted files** that
  I did not delete (src/components/garbage/*, 3d-globe-demo.tsx, AboutOverview.tsx,
  unused ui/ effects) — 196 files at HEAD vs 150 now. Left untouched: `tsc --noEmit`
  passes, so nothing still imports them. Note this makes whole-tree HEAD-vs-now lint
  comparisons invalid; compare per-file instead.

## 2026-07-27 — Brand strategy: removed the ProcessSection/OurTechStack overlap
- `src/app/brand-strategy/page.tsx`: deleted the three-div overlap structure
  (`relative z-0 -mb-[35vh]` group, `sticky top-[calc(100vh-1040px)] z-0` pin,
  `relative z-10 bg-black pb-[35vh]` overlapper) and replaced it with plain
  `<ProcessSection />` + `<OurTechStack />`. 8 lines -> 2.
- Checked history first rather than hand-rolling the "before" markup: the overlap is
  present in HEAD (repo has a single commit, `6b41cbe first commit`, found via
  `git log -S`), so there was no earlier revision to restore from.
- Confirmed the wrapper's `bg-black` was redundant before dropping it — OurTechStack's
  own root section is already `bg-black`, so removing it changes nothing visually.
  The `pb-[35vh]` / `-mb-[35vh]` pair existed solely to serve the overlap (coverage
  tail + its layout cancellation), so both go with it; earlier in the session the user
  had complained that pb-[35vh] caused a big space above ProjectShowcase, and it is
  now gone entirely.
- VERIFIED on the live page: zero sticky children and zero negative margins remain in
  the page wrapper. ProcessSection sits at doc 4322 (h 1075) and OurTechStack begins
  at doc 5396 — exactly adjacent, so no overlap AND no leftover gap. Downstream
  sections follow contiguously (ProjectShowcase 6329 = 5396 + 933).
- Verified: `bunx tsc --noEmit` exit 0; per-file biome vs a HEAD worktree using the
  corrected method (`--max-diagnostics=5000`): 2 before, 2 after — unchanged.

## 2026-07-27 — Brand strategy: ProcessSection overlaps SubServices once cards are stacked
- Two files. `src/components/brand-strategy/SubServices.tsx`: moved the aria-hidden
  transform-reserve div INSIDE the `group/cards` container (it was a sibling after
  it). `src/app/brand-strategy/page.tsx`: group `relative z-0`, SubServices in
  `sticky top-[calc(100vh-3330px-4*max(0px,22vh-190px))] z-0 bg-black`,
  ProcessSection in `relative z-10 bg-black`.
- WHY THE RESERVE HAD TO MOVE (the actual blocker, found by measuring):
  the cards are sticky within `group/cards`, which ended at doc 3752, while the
  section ran to 4322. Sticky releases at its containing block's end, so the stack
  came apart ~486px BEFORE the section bottom. Measured card tops at scroll 3600 were
  [-448,-258,-68,122] — i.e. a bottom-aligned pin would have frozen a stack that had
  already scrolled off. Moving the 570px reserve inside extends the containing block
  to the section bottom; cards now hold at [36,226,416,606] right through the pin.
  Total section height is UNCHANGED (2400+570 sibling -> 2970 container), so the
  stick-line maths is unaffected.
  Checked before moving it: `container` is only the `useScroll` target driving
  `activeIndex`, and that handler decides from live `getBoundingClientRect()`, not
  from the progress value — so a taller container just fires the callback over a
  longer range with identical logic.
- STICK LINE IS NOT A PLAIN CONSTANT. First tried `calc(100vh-3330px)`; the resize
  test showed the section is 3330 at vh720 but 3406 at vh950. Traced the growth to
  `SubServiceCard.tsx:42` `marginBottom: max(0px, calc(22vh - 190px))` — zero below
  vh=864, then 19px per card x 4 = exactly the observed 76px. Hence
  `calc(100vh - 3330px - 4*max(0px,22vh-190px))`, verified to compute the IDEAL value
  at both viewports (720 -> -2610, 950 -> -2456, `pinsFlush: true` at both).
- NO TAIL, deliberately: ProcessSection is 1075px (> 100vh) so coverage holds, and
  the three sections after the group (ProjectShowcase, ExperimentalTestimonials,
  TechLogoCarousel) are rendered BARE with no wrapper divs — a tail would have forced
  wrapping all of them just to contain the overhang. Verified OurTechStack directly
  below is not occluded (`hitInsideGroup: false`).
- Verified at vh 720 and 950: cards stacked at the pin, SubServices pins flush to the
  viewport bottom, ProcessSection's top is exactly at the viewport bottom at that same
  instant (so no dead zone by construction), then climbs 720 -> 0 and covers.
- Verified: `bunx tsc --noEmit` exit 0; per-file biome vs HEAD worktree
  (`--max-diagnostics=5000`): page.tsx 2/2, SubServices.tsx 1/1 — unchanged.

## 2026-07-27 — SubServices: added post-stack scroll before ProcessSection overlaps
- `src/components/brand-strategy/SubServices.tsx` only (page unchanged).
- PROBLEM measured first: after the previous change the cards were pinned all the way
  to the section pin, so between stack-completion (scroll 3116) and the pin (3602)
  the card tops sat frozen at [36,226,416,606] while ProcessSection was still below
  the fold — 486px of scrolling with NOTHING moving on screen. That dead zone is what
  "let it scroll for a bit" was describing.
- FIX: split the 570px transform-reserve into a part INSIDE the cards container
  (how long the stack holds) and the remainder OUTSIDE (how far it then slides before
  the pin). Total stays 570px, so section height and the page's stick-line calc are
  untouched.
- THE SPLIT CANNOT BE A CONSTANT. First tried `STEP * 1.5` (285px): gave a 201px
  slide at vh720 but only **2px** at vh950, because the post-stack gap SHRINKS as the
  viewport grows. Derived the relation from measurements:
      gap = 1170px + m - 0.95*100vh,  where m = max(0px, 22vh - 190px)
  (per-card margin from SubServiceCard.tsx:42). Verified: 486 @vh720, 286.5 @vh950,
  matching measured 3448 - 3161.5 exactly.
  So the hold is `max(0px, calc(970px + max(0px,22vh-190px) - 95vh))`, i.e.
  `gap - POST_STACK_SCROLL`, exposed as `const POST_STACK_SCROLL = 200`.
- VERIFIED at both viewports the slide is now consistent: **200px @vh720, 201px
  @vh950** (previously 201 / 2). Cards at the pin: [-164,26,216,406] @720 and
  [-153,37,227,417] @950 — three of four still visible as the overlap begins.
  Section height unchanged (3330 @720), pin still flush to the viewport bottom, and
  ProcessSection's top is exactly at the viewport bottom at the pin, so the handoff
  still has no dead zone.
- Sequence now: cards stack -> brief hold -> stack scrolls up 200px -> SubServices
  pins as ProcessSection reaches the viewport bottom -> ProcessSection climbs to 0.
- ONE KNOB: `POST_STACK_SCROLL` (px of scroll after stacking before the overlap).
- Verified: `bunx tsc --noEmit` exit 0; per-file biome vs HEAD worktree: 1/1 unchanged.

## 2026-07-27 — SubServices: post-stack scroll 200 -> 280
- `src/components/brand-strategy/SubServices.tsx`, one line: `POST_STACK_SCROLL`
  200 -> 280. Section height unchanged (3330 @vh720), so the page's stick-line calc
  is untouched and no other file changed.
- Verified the slide actually tracks the constant at BOTH viewports: 280px @vh720,
  281px @vh950 (the vh-aware hold formula holds up). Pin still flush to the viewport
  bottom and ProcessSection's top still exactly at the viewport bottom at the pin, so
  the handoff remains dead-zone free. Cards at the overlap: [-244,-54,136,326] @720
  and [-233,-43,147,337] @950 — the lower two cards still on screen.
- CEILING WORTH KNOWING: the available post-stack gap SHRINKS as the viewport grows
  (`gap = 1170px + m - 0.95*100vh`): ~486px @vh720, ~286px @vh950, ~104px @vh1200.
  `POST_STACK_SCROLL` is clamped by `max(0px, ...)` to that gap, so 280 is close to
  the @vh950 limit and will silently cap on taller screens. Going meaningfully beyond
  this requires LENGTHENING the section (extra reserve outside the cards container),
  and the page's `top-[calc(100vh-3330px-4*max(0px,22vh-190px))]` must be increased by
  the same amount or the pin desynchronises. Those two numbers are currently coupled
  across two files — worth exporting a single shared value if this is tuned again.
- Verified: `bunx tsc --noEmit` exit 0; per-file biome vs HEAD worktree: 1/1 unchanged.

## 2026-07-27 — SubServices: post-stack scroll 280 -> 450 (section lengthened, geometry deduplicated)
- Hit the ceiling flagged last entry: the post-stack gap was only ~286px @vh950, so
  bumping the constant alone would have silently capped. Did the proper fix instead.
- `src/components/brand-strategy/SubServices.tsx`:
    BASE_HEIGHT 3330, EXTRA_TAIL 400, POST_STACK_SCROLL 450
    CARD_MARGIN = "max(0px, 22vh - 190px)"  (shared sub-expression)
    STACK_HOLD  = max(0px, calc(1120px + CARD_MARGIN - 95vh))   // 1170 + EXTRA - POST
    export SUBSERVICES_STICK_TOP = calc(100vh - 3730px - 4 * CARD_MARGIN)
  EXTRA_TAIL is added to the OUTSIDE reserve, lengthening the section by 400px so the
  gap has room for a 450px slide at every viewport (gap becomes ~886 @720, ~686 @950,
  ~504 @1200).
- DEDUPLICATED THE COUPLING (the latent bug called out last entry): the page no longer
  hardcodes `top-[calc(100vh-3330px-4*max(...))]`. It imports SUBSERVICES_STICK_TOP and
  applies it via `style={{ top }}`. Section height and stick line are now derived from
  ONE set of constants, so changing EXTRA_TAIL can no longer desynchronise the pin.
- VERIFIED at both viewports: height 3730 @720 / 3806 @950; computed stick top equals
  the ideal `vh - H` at both (-3010 / -2856, `stickCorrect: true`); slide 450 / 451;
  pin flush; ProcessSection top exactly at the viewport bottom at the pin (no dead
  zone); coverage reached at scroll 4722 @720, well before unpin (~5077).
- TRADE-OFF NOW VISIBLE AND WORTH KNOWING: more post-stack scroll means the stack has
  travelled further when the overlap starts. At 450 the card tops at the pin are
  [-414,-224,-34,156] @720 and [-403,-213,-23,167] @950 — only the LAST card is still
  on screen (at 280 it was the last two; at 200, three). Slide and "stack still
  visible" trade directly against each other; POST_STACK_SCROLL is the single knob.
- Verified: `bunx tsc --noEmit` exit 0; per-file biome vs HEAD worktree:
  SubServices 1/1, page 2/2 — unchanged.

## 2026-07-27 — SubServices shrinks subtly as ProcessSection overlaps
- `src/app/brand-strategy/page.tsx` only: SubServices wrapped in ShrinkOnOverlap
  (`endSelector="#process-overlap"`, `scale={0.96}`, `y={12}`,
  `className="origin-[center_calc(100%-100vh)]"`); ProcessSection wrapper gains
  `id="process-overlap"`.
- Values chosen for "subtle": 0.96/12 rather than the 0.85/40 default. Measured
  result is a 17px empty band at the viewport bottom at full shrink (@vh720) vs the
  ~68px the default produces — clearly present but understated.
- RISK CHECKED RATHER THAN ASSUMED: ShrinkOnOverlap puts `will-change: transform` on
  an ANCESTOR of SubServices' sticky stacking cards. A transformed ancestor breaks
  `position: fixed` descendants (proved earlier today on the about page navbar), so
  it was reasonable to fear it would break sticky too. It does NOT — verified after
  wiring: all four cards still compute `position: sticky`, still stack at
  [36,226,416,606], and the 450px post-stack slide is unchanged
  ([-414,-224,-34,156] at the pin). Transform/will-change creates a containing block
  for FIXED descendants but does not create a scrollport, so STICKY is unaffected.
- Section height still 3730 @vh720 (the two ShrinkOnOverlap divs add no height), so
  the exported SUBSERVICES_STICK_TOP still matches the ideal `vh - H` — confirmed
  `stickStillCorrect: true`.
- Origin verified to adapt with viewport: computed `632.5px 3009.59px` @vh720 and
  `632.5px 2855.59px` @vh950, i.e. exactly `height - 100vh` (3010 / 2856) at both —
  the visible top edge, per the rule derived on the work page. Empty band 17px @720,
  26px @950.
- Verified: `bunx tsc --noEmit` exit 0; per-file biome vs HEAD worktree: page 2/2.
- Motion itself (the scrub) still not self-verifiable in this pane — no scroll events
  or rAF; the tween is confirmed attached via GSAP's inline style.

## 2026-07-27 — Brand strategy: SubServices now overlaps StrategyHeroSection too
- `src/app/brand-strategy/page.tsx` + header hoist out of
  `src/components/brand-strategy/StrategyHeroSection.tsx`.
- CHAINED overlap, same shape as the work page: SubServices must be BOTH the
  overlapper of the hero AND the pinned section for ProcessSection, and one element
  cannot sit in two sibling groups — so all three now share ONE containing block:
    group `relative z-0`
      hero  `sticky top-[min(0px,calc(100vh-992px))] z-0 bg-white`
      subs  `sticky z-10 bg-black` + style top = SUBSERVICES_STICK_TOP  (+ shrink)
      proc  `id="process-overlap" relative z-20 bg-black`
  ProcessSection moved z-10 -> z-20 so it still paints above SubServices.
- FOURTH DISTINCT HERO GEOMETRY, caught by the resize test: the hero is 992px @vh720
  but 1100px @vh1100 — i.e. `max(992px, 100vh)`. A plain `calc(100vh - 992px)` would
  evaluate to +108px at vh1100 and pin it BELOW the top; the fix is the clamp
  `min(0px, calc(100vh - 992px))`. Verified it computes -272px @720 and exactly 0px
  @1100, pinning flush at both. Running catalogue for this codebase:
    H = const                -> top-[calc(100vh - Hpx)]              (about/career/perks/blog)
    H = 100vh                -> top-0                                (work hero)
    H = 100vh + const        -> top-[-{const}px]                     (contact hero)
    H = max(const, 100vh)    -> top-[min(0px,calc(100vh - Cpx))]     (strategy hero)  <- NEW
- Header hoisted because the hero now gets `z-0`, which makes it a stacking context
  and would trap the navbar's z-[100] under SubServices' z-10. NOTE: only the
  brand-strategy COPY of StrategyHeroSection was touched — the other seven service
  pages have their own duplicates (the known 64-file duplication), so they are
  unaffected; verified by grep before editing.
- NOTHING ELSE MOVED: SubServices' flow top is still 992, so every previously tuned
  number is unchanged — pin still at scroll 4002, ProcessSection still arrives exactly
  at the pin (procTop 720), cards still stack [36,226,416,606] @3402 and slide 450px
  to [-414,-224,-34,156] @4002.
- Verified: hero scrolls 272px then pins flush; SubServices climbs 720 -> 0 covering it
  by scroll 992; navbar `offsetParent` null, top 0, and `navOnTop: true` mid-overlap;
  OurTechStack below not occluded (`hitInsideGroup: false`).
- Verified: `bunx tsc --noEmit` exit 0; per-file biome vs HEAD worktree:
  page 2/2, StrategyHeroSection 1/1 — unchanged.

## 2026-07-27 — Next.js efficiency/SEO principles audit + implementation (worker mode)
- AUDIT FIRST. Already satisfied, no change needed: route-level code splitting (App
  Router does it; 16/17 pages are server components), SSR (all pages SSR), directory
  structure/naming, descriptive URLs. N/A: secure API routes (zero API routes exist),
  HTTPS (deploy concern). Real gaps found and fixed below.
- GAP 1 — SEO metadata was effectively absent: root layout still shipped
  `description: "Generated by create next app"`, only blog/[slug] had real metadata,
  and there was no sitemap/robots. Added `metadataBase` + title template on the root
  layout, `export const metadata` on 13 server pages, `src/app/home/layout.tsx` (the
  /home page is a client component so it cannot export metadata itself; the layout
  returns `children` directly so the DOM is unchanged), plus `src/app/sitemap.ts`
  (29 URLs: 14 static + 6 blog + 9 work, slugs read from src/data/{blog,projects}.ts)
  and `src/app/robots.ts`. Later consolidated the origin into `src/lib/site.ts`
  (`SITE_URL`) so layout/sitemap/robots cannot drift.
- GAP 2 — 10 dead dependencies removed (verified zero importers incl. CSS/config):
  three, @react-three/drei, @react-three/fiber, postprocessing, @studio-freight/lenis,
  split-type, @use-gesture/react, embla-carousel-autoplay, radix-ui, and the orphaned
  @types/three. TRAPS AVOIDED: `shadcn` looks unused to grep but globals.css:3 does
  `@import "shadcn/tailwind.css"`; `lenis` is live (SmoothScroll + 8 ReactLenis) and is
  a DIFFERENT package from the dead `@studio-freight/lenis`. bun.lock -326 lines.
- GAP 3 — MY PLAN'S PREMISE WAS WRONG, worker caught it. I planned to `next/dynamic`
  the Particles component in Footer to split out `ogl`. The worker verified `<Particles`
  appears in NO JSX anywhere — it was imported but never rendered. Deleting the dead
  import removes ogl from the module graph entirely, strictly better than lazy-loading
  it, and provably zero-DOM-change (canvas count was 0 before and after). I re-verified
  independently before accepting. Footer's biome count went 4 -> 3 (the dead import was
  itself a noUnusedImports violation).
- DONE GATE (spec-verifier) found a REAL P1 I introduced: the new root
  `title.template: "%s | Softexedge"` double-branded blog articles, because
  blog/[slug] already appended "— Softexedge" itself. Proven in built HTML:
  `<title>How We Reduced Cloud Costs... — Softexedge | Softexedge</title>`. Fixed by
  stripping the manual suffix. Also fixed from the same review: work/[slug] had no
  generateMetadata, so the 9 project pages newly listed in sitemap.xml all built with
  one generic title — added generateMetadata (now `Apex Analytics | Softexedge` etc.);
  and 8 service pages shared an identical description opening — rewritten distinct.
- VERIFICATION: `bunx tsc --noEmit` exit 0; `bunx next build` exit 0; P1/P2 fixes
  proven from BUILT HTML not source; 13 unique descriptions, zero duplicates; per-file
  biome vs HEAD worktree unchanged everywhere except Footer 4->3 (improvement); new
  files 0 diagnostics. ZERO-UI-CHANGE guard: live geometry on /brand-strategy identical
  to the previous task's values (hero 992 @ -272px, SubServices 3730 @ -3010px, 4 sticky
  cards, navbar viewport-fixed).
- ROUTING: planned 3 sonnet / 2 opus / 1 driver; executed 3 sonnet + 2 opus + 1 driver
  + 1 extra sonnet fix-round after the done gate. No reroutes; no step failed twice.
- OPEN / NOT DONE (needs user decision, deliberately not assumed):
  1. **Canonical origin is a guess.** SITE_URL is https://softexedge.com, taken from
     `mailto:hello@softexedge.com` in ContactSection. The operator's own address is
     @softexedge.in. A wrong canonical host in metadataBase/sitemap/robots is worse
     than none — CONFIRM THE DOMAIN. One-line change in src/lib/site.ts.
  2. `ogl` still in package.json: its only importer is Particles.tsx, which is now
     unreachable dead code. Removing ogl requires deleting Particles.tsx — the user
     kept that file during their own cleanup, so not deleted unasked.
  3. next-bundle-analyzer not added (would be a new dependency; needs approval).
  4. Turbopack's build output has no per-route byte table, so before/after bundle
     sizes could not be compared numerically.

## 2026-07-27 — Brand strategy: hero shrinks as SubServices overlaps it
- `src/app/brand-strategy/page.tsx` only: StrategyHeroSection wrapped in
  ShrinkOnOverlap (`endSelector="#subservices-overlap"`,
  `className="origin-[center_calc(100%-100vh)]"`, DEFAULT scale 0.85 / y 40); the
  SubServices sticky wrapper gains `id="subservices-overlap"` as the end trigger.
- Used the DEFAULT 0.85/40 rather than the subtle 0.96/12 applied to SubServices on
  this same page, because the request named the home page as the reference and
  0.85/40 is exactly what home/page.tsx:80-91 uses. Measured empty band at full
  shrink: 68px @vh720 — identical to the work hero and blog featured section, so the
  motion matches the rest of the site.
- Precondition already satisfied: the Header was hoisted out of StrategyHeroSection in
  the previous task, so there is no `position: fixed` descendant inside the new
  transform ancestor (that combination broke the navbar on the about page earlier).
  Re-confirmed: navbar `offsetParent` null and `navOnTopDuringHeroOverlap: true`.
- FALSE ALARM INVESTIGATED, NOT ASSUMED: first measurement showed `gsapAttached: null`
  on the hero's inner div (no GSAP inline style = tween never attached). Rather than
  guess, compared against the pre-existing SubServices instance on the same page and
  forced a hard reload — after reload BOTH instances carry GSAP's CSSPlugin signature
  style. It was an HMR artifact (the useGSAP effect had not re-run after the hot
  update), not a wiring defect.
- Origin verified to adapt across the hero's `max(992px, 100vh)` geometry: computed
  `632.5px 272px` @vh720 (= 992-720) and `632.4px 0px` @vh1100 (= 1100-1100, correctly
  degenerating to origin-top). Hero pins flush at both.
- NO REGRESSIONS: hero box still 992px @720 (the stick line hardcodes 992, so a height
  change would desync it); chain unchanged — hero pins at 272, SubServices covers at
  992, SubServices pins at 4002 with ProcessSection arriving at 720; cards still stack
  [36,226,416,606] @3402 and slide 450px to [-414,-224,-34,156] @4002.
- Verified: `bunx tsc --noEmit` exit 0; per-file biome vs HEAD worktree unchanged.

## 2026-07-27 — Career hero: carousels no longer clipped by the shrink
- DEFECT MEASURED FIRST: at the shrink end-state the marquee rows spanned 95 -> 1170
  instead of 0 -> 1265, i.e. 95px of white on EACH side — the cards visibly stopped
  short of the screen edges. Cause is structural, not a tuning issue: both the hero
  <section> and each InfiniteRow have `overflow: hidden`, so once the section is
  scaled its clip box shrinks with it and NO descendant can reach the viewport edge.
  Widening the rows cannot fix it — the section clips them either way.
- FIX: stop scaling the section; scale its two inner blocks instead.
  * `src/components/career/CareerHeroSection.tsx`: `id="career-hero-copy"` on the
    existing text block; the two InfiniteRows moved into a NEW plain inner div
    `id="career-hero-carousel"` with `w-[117.65%] -ml-[8.82%]` (117.65% = 1/0.85), so
    at full shrink it renders exactly 100% wide. At rest it over-bleeds and is clipped
    by the section — visually identical to before.
  * The new div is PLAIN, not the existing motion.div: framer-motion already owns that
    element's transform (its mount y-animation), and GSAP writing transform to the same
    element would fight it. Separate elements, separate owners.
  * `src/app/career/page.tsx`: ShrinkOnOverlap now gets
    `targetSelector="#career-hero-copy, #career-hero-carousel"` + `transformOrigin="50% 0%"`.
  * `src/components/ui/ShrinkOnOverlap.tsx`: targetSelector now resolves via
    `gsap.utils.toArray` instead of `document.querySelector`, so it can drive MULTIPLE
    elements. Single-target and no-target callers are unaffected.
- WHY NOT SCALING THE SECTION IS INVISIBLE: the hero and its sticky wrapper are both
  bg-white, so the section's own (unscaled) box has no visible edge.
- VERIFIED: rows at full shrink now span 0 -> 1265 = the full content width, gap per
  side 95px -> 0 (the residual 8px in the raw numbers is scrollbar rounding:
  innerWidth 1280 vs content 1265). Copy still shrinks (1200 -> 1020). GSAP's CSSPlugin
  signature style present on BOTH targets, proving multi-target works, while the
  ShrinkOnOverlap inner wrapper now has NO inline style (section no longer scaled).
  At rest a card is painted at both x=4 and x=innerWidth-20, so no cut. Marquee track
  intact. Hero box still 1200px so `top-[calc(100vh-1200px)]` stays valid; chain
  unchanged (hero pins at 480, WhyJoinUs covers at 1200); navbar top 0 throughout.
- Verified: `bunx tsc --noEmit` exit 0; biome 0 diagnostics on all three touched files
  (unchanged from HEAD).

## 2026-07-27 — Work hero: DomeGallery no longer cut by the shrink
- Same symptom as the career hero, DIFFERENT component, and the career fix did NOT
  transfer unchanged — verified before copying it.
- Measured defect: at the shrink end-state the dome spanned 95 -> 1170 instead of
  0 -> 1265, i.e. 95px of black on each side.
- FALSE START, CAUGHT BY MEASUREMENT: first attempt only stopped the <main> section
  from being scaled (scaling `#work-hero-copy` + `#work-hero-dome` instead). Re-measured
  and the dome STILL rendered 95 -> 1170 — visually a no-op, because a uniform scale
  insets a full-bleed element whether or not its ancestor clips. Reported and kept
  going rather than shipping it as a fix.
- The real fix is the career-style compensation (`w-[117.65%] -ml-[8.82%]`, 117.65% =
  1/0.85) so the dome renders exactly full width at full shrink. The blocker was that
  DomeGallery measures `el.clientWidth` via ResizeObserver and derives `copies` from it
  (DomeGallery.tsx:75,122), so widening its container could change its internals.
  TESTED IT EMPIRICALLY rather than assuming: widening to 117.65% left the rendered
  image count identical (162 -> 162) and every card's rendered SIZE identical
  (300x343, 300x222, ...). The only delta is a 112px horizontal phase shift of the
  tiling — and since the dome has `autoRotate`, a static phase offset is
  indistinguishable from a moment later in the rotation. Judged acceptable.
- FINAL STATE: `src/components/work/WorkHeroSection.tsx` — dome wrapper gains
  `id="work-hero-dome"`, `w-[117.65%] -ml-[8.82%]`, `origin-center`; copy block gains
  `id="work-hero-copy"`, `origin-top`. `src/app/work/page.tsx` — ShrinkOnOverlap gains
  `targetSelector="#work-hero-copy, #work-hero-dome"` and NO transformOrigin prop, so
  GSAP respects each element's own CSS origin (verified: copy origin `632.4px 0px`,
  dome `632.4px 504px` = centre of its 140vh box).
- VERIFIED: dome at full shrink now spans 0 -> 1265 exactly, gap 95px -> 0. At rest it
  over-bleeds (-112 -> 1376) and is clipped by the section to 0 -> 1265, so the resting
  appearance is unchanged. Copy still shrinks (1265 -> 1075). Section is no longer
  scaled (`shrinkWrapperUntouched: null`), so nothing is sliced. Hero box still exactly
  100vh (720) with stick `0px`, so the `top-0` line stays correct; chain unchanged
  (showcase covers at 720).
- Verified: `bunx tsc --noEmit` exit 0; biome 0 on both touched files.

## 2026-07-27 — Homepage: StatsSection shrinks as ServiceSection overlaps
- `src/app/home/page.tsx` only. The Stats->Service block already had the PIN but was
  the only one of the three homepage overlap blocks with NO shrink tween (About and
  Testimonials both had one). Added `statsInnerRef`, an inner wrapper div around
  <StatsSection />, and a `gsap.to(..., {scale: 0.85, y: 40, ease: "none", scrub})`
  whose scrollTrigger start/endTrigger/end are byte-identical to the existing pin's,
  mirroring the Testimonials block exactly.
- DELIBERATE DEVIATION from a literal copy of AboutSection, measurement-driven:
  About's inner uses `origin-top`, which is correct THERE because its pin is
  `start: "top top"` (top-aligned, so the element's top IS the visible edge). Stats
  pins with `start: "bottom bottom"` and measures **1184px — 464px TALLER than the
  viewport**, so `origin-top` would put the scale origin 464px above the visible area.
  Used `origin-[center_calc(100%-100vh)]` instead — the same underlying rule About
  follows (origin at the visible top edge), adapted to a bottom-aligned pin.
  Measured the difference at the pin: gap at viewport bottom is **68px with the
  corrected origin vs 137px with origin-top** — 68px is the site-wide standard
  (work hero, blog featured, brand-strategy hero all measure 68px).
- Verified: container height unchanged at 1184px (the wrapper adds no height, so the
  pin geometry is untouched); computed transform-origin `632.5px 464px` = exactly
  `height - 100vh`; GSAP's CSSPlugin signature style present on the new inner div;
  `statsIsPinned: true` (its parent is a `.pin-spacer`, and pin-spacers are created
  when ScrollTrigger.create runs, so the pin was constructed); 4 pin-spacers total, so
  the other blocks' pins were not disturbed; About block's tween still attached.
  `bunx tsc --noEmit` exit 0; per-file biome vs HEAD unchanged.
- NOT VERIFIABLE HERE, stated plainly: scroll-sampling the pin/shrink is meaningless in
  this pane because it delivers no scroll events, so ScrollTrigger never advances. An
  early sampling attempt produced nonsense (stats bottom kept moving past the pin) and
  was discarded rather than reported as evidence. The motion needs the user's eyes.
- OBSERVATION, not changed (out of scope): the Testimonials block has the same
  bottom-aligned pin + `origin-top` mismatch. Worth the same correction if its group
  is taller than the viewport.

## 2026-07-27 — About hero: EdgeToEdgeCarousel no longer cut by the shrink
- Third page with this symptom; checked the component FIRST because the previous two
  needed different fixes. `EdgeToEdgeCarousel` has NO container measurement (pure CSS
  marquee, unlike DomeGallery which derives `copies` from clientWidth), so the
  career-style width compensation is safe here.
- Measured defect: carousel spanned -7 -> 1273 at rest but 89 -> 1177 at the shrink
  end-state = 96px of gap each side.
- FIX (`src/components/about/AboutHeroSection.tsx` + `src/app/about/page.tsx`):
  * Stop scaling <main> (its overflow-hidden clip is what insets everything). Instead
    scale ONE new plain wrapper `#about-hero-inner` around main's two children.
  * Moved main's `pb-16 md:pb-25` onto that wrapper so the wrapper's box equals the
    hero's full height — otherwise `calc(100% - 100vh)` would resolve against a box
    100px short and put the origin in the wrong place (would have been 284px instead
    of the correct 384px).
  * Carousel `w-screen` -> `w-[117.65vw]` (117.65% = 1/0.85) so at full shrink it
    renders exactly 100vw. No negative margin needed — it sits in a `items-center`
    flex column, so it self-centres.
  * page.tsx: `targetSelector="#about-hero-inner"`; origin comes from the element's
    own class, no transformOrigin prop.
- VERIFIED: sticky box still EXACTLY 1104px (critical — the stick line hardcodes
  `calc(100vh-1104px)`, and both the wrapper insertion and the padding move had to be
  height-neutral); computed origin `632.5px 384px` = 1104-720; section no longer
  scaled (0 -> 1265 at both states, so nothing is sliced); carousel at full shrink
  spans -8 -> 1273 width 1280 = exactly the viewport, gap 96px -> 0. At rest it
  over-bleeds (-120 -> 1385) and is clipped by main to 0 -> 1265, which is what it
  already looked like (w-screen was likewise clipped), so the resting appearance is
  unchanged. Chain intact: hero pins at 384, AboutTraditional covers at 1104; the
  OurValues/OurTeam group untouched (994px @ -274px); navbar viewport-fixed.
- `bunx tsc --noEmit` exit 0; per-file biome vs HEAD unchanged.
- All three carousel-cut reports are now fixed, each needing a DIFFERENT approach:
  career = widen rows (marquee, safe); work = widen dome only after proving its
  `copies` count and card sizes were unaffected; about = widen carousel + relocate
  padding so the origin math stayed correct.

## 2026-07-27 — BlogListSection: "Read Article" CTA activates on card hover
- `src/components/blog/BlogCard.tsx` only (grep-confirmed BlogListSection is its ONLY
  consumer, so no other section is affected).
- The card root already had `group` and the CTA `group/cta`, but every active state
  keyed off `group-hover/cta:*` or the CTA's own `hover:*`, so the button only lit up
  when the cursor was on the button itself. Added the card-level `group-hover:`
  counterpart beside each existing variant (kept the `/cta` ones, so hovering the
  button directly still works exactly as before):
  pl-5 / pr-2, before:scale-x-100 (the white fill sweep), text-black, bg-black on the
  icon chip, and both arrow translate pairs.
- VERIFIED STATICALLY, and the checks were chosen to catch the two ways this silently
  fails:
  1. Ancestor resolution — unnamed `group-hover:` binds to the NEAREST unnamed
     `.group`. Walked up from the CTA: exactly ONE unnamed group ancestor and it is
     the card root, so nothing intercepts.
  2. Rule generation + applicability — recursed through nested @layer blocks (1738
     rules; a first pass over top-level `cssRules` found nothing because Tailwind v4
     nests them, which would have been a false negative). All four utilities exist,
     e.g. `.group-hover\:pl-5:is(:where(.group):hover *)`, and stripping `:hover`
     from each selector and calling `el.matches()` returns TRUE for the actual CTA /
     text / icon elements — so the rules do apply when the card is hovered.
- NOT provable in this pane: real hover. CSS `:hover` follows the physical cursor;
  synthetic pointerover/mouseenter events left `card.matches(':hover') === false` and
  changed no computed style. Tried it, confirmed it cannot work, and did not present
  the null result as evidence either way. Needs the user's cursor.
- `bunx tsc --noEmit` exit 0; per-file biome vs HEAD unchanged.

## 2026-07-27 — WorkProjectShowcase: "View Project" CTA activates on card hover
- `src/components/work/ProjectCard.tsx` only. Same treatment as BlogCard: added the
  card-level `group-hover:` counterpart beside every existing `group-hover/cta:` /
  `hover:` state (pl-5, pr-2, before:scale-x-100, text-black, bg-black, and both
  arrow translate pairs), keeping the `/cta` variants so direct button hover is
  unchanged.
- SCOPE CHECK that mattered: `grep ProjectCard` returns hits in 8 service-page
  ProjectShowcase.tsx files, which LOOKS like this is a widely shared component. It
  is not — those are each a LOCAL `function ProjectCard(...)` defined inside their own
  file (line 139 in each). Only `work/WorkProjectShowcase.tsx:5` actually imports this
  module, so the change is confined to the requested section.
- Confirmed exactly ONE unnamed `group` in the file (the card root, line 40), so
  unnamed `group-hover:` binds to the card and nothing intercepts. The pre-existing
  sheen at line 89 already uses `group-hover:opacity-60` against that same root,
  independently proving the binding works.
- VERIFICATION had to differ from BlogCard: this CTA lives inside an AnimatePresence
  block that only mounts while `isHovered`, so it is absent from the DOM at rest and
  cannot be queried. Instead injected a temporary off-screen probe with the same
  ancestor shape (.group > span.group/cta > children), recursed all 1739 CSS rules
  (incl. nested @layer), and confirmed ALL NINE utilities both exist and match the
  probe elements once `:hover` is stripped from the selector — including the four
  arrow-translate utilities that were never verified on the blog card. Probe removed.
- SIDE EFFECT worth knowing: because the button only mounts once the card is hovered,
  it will now mount already in its active state, so the white fill sweep may appear
  instantly rather than animating in. That is the direct consequence of the request
  ("button should also get active when the card is hovered"), not a defect.
- Real hover still unprovable here (CSS :hover follows the physical cursor; synthetic
  events do not set it, as demonstrated in the BlogCard entry). Needs the user's cursor.
- `bunx tsc --noEmit` exit 0; per-file biome vs HEAD unchanged.

## 2026-07-27 — WorkProjectShowcase: "View Project" activation delayed
- `src/components/work/ProjectCard.tsx` only.
- WHY CSS ALONE COULD NOT DO THIS: the CTA lives inside an AnimatePresence block that
  only mounts once `isHovered` is true, so it mounts INSIDE an already-hovered `.group`
  — `group-hover:` applies on first paint and there is no style change for a
  `transition`/`transition-delay` to act on. A delay needs a state change AFTER mount.
- IMPLEMENTATION: `const CTA_ACTIVATE_DELAY = 450` + `ctaActive` state set by a
  setTimeout in a `useEffect` keyed on `isHovered` (cleared on unmount/un-hover, and
  reset to false when isHovered goes false). Replaced last task's `group-hover:*`
  classes with `ctaActive &&` conditionals. Kept every `group-hover/cta:*` variant, so
  hovering the button directly still works independently.
- CAUGHT A REAL BUG IN MY OWN FIRST DRAFT: I initially applied the conditional classes
  via template literals. Unlike the `group-hover/cta:` VARIANTS (whose `:is(...)`
  wrapper adds specificity), plain conditional classes have the SAME specificity as the
  base classes they must override, so the winner is decided by stylesheet order, not
  string order. Measured it in the browser: with both `-translate-x-8 translate-y-8`
  and `translate-x-0 translate-y-0` present, computed translate was **"0px 32px"** —
  x moved but Y STAYED AT 32px, i.e. the arrow would have sat 32px too low. Switched to
  the codebase's `cn()` (clsx + tailwind-merge) and verified in Node that twMerge
  resolves every pair used here: pl-0+pl-5 -> pl-5, before:scale-x-0+100 -> 100,
  text-white+black -> black, bg-white+black -> black, and the translate pair ->
  translate-x-0 translate-y-0. Confirmed merged output computes translate "0px".
- Note for future edits in this file: conditional Tailwind overrides here MUST go
  through cn(), never a template literal.
- Real hover still unprovable in this pane (:hover follows the physical cursor). The
  450ms figure is a starting point — it is a single named constant at the top of the
  file.
- `bunx tsc --noEmit` exit 0; per-file biome vs HEAD unchanged (1 pre-existing
  noImgElement).

## 2026-07-27 — Hero shrink needed a manual refresh on first load — fixed
- `src/components/ui/ShrinkOnOverlap.tsx` only. Fixes about/career/work and, by the
  same code path, blog/brand-strategy/contact (which have the identical defect but
  were not reported).
- ROOT CAUSE, found structurally rather than by guessing at values: ScrollTrigger
  computes each trigger's start/end ONCE at creation and only recomputes on its
  autoRefreshEvents (DOMContentLoaded, load, resize, visibilitychange). The home page
  survives this because it wraps in <SmoothScroll>, which calls
  `ScrollTrigger.refresh()` after mount (SmoothScroll.tsx). The six ShrinkOnOverlap
  pages have NO SmoothScroll and the component never refreshed — verified by grep:
  SmoothScroll appears only in home/page.tsx, and ShrinkOnOverlap contained no
  `refresh` call at all. A hard reload fires `load` so ScrollTrigger self-corrects,
  which is exactly why "it needs a refresh every time".
- RULED OUT FIRST (so the fix targets the real failure): the tween is NOT missing on
  first load. Reproduced a genuine client-side navigation (/home -> click <a href="/about">)
  and confirmed GSAP's CSSPlugin style was already present on the target, so creation
  works and only the MEASUREMENTS were stale. Also sampled doc height / element
  positions over 5s and saw no post-mount layout shift on a warm load — i.e. the shift
  window is the cold/first paint, which is what the added hooks cover.
- FIX: after creating the tween, `ScrollTrigger.refresh()` is scheduled on
  requestAnimationFrame, on a 400ms fallback timer, on `window load`, and on
  `document.fonts.ready` (the headings are 7rem self-hosted Satoshi, so font swap is a
  real source of position shift). All hooks are torn down in the cleanup alongside
  `mm.revert()`, and the fonts callback is guarded by a flag so it cannot fire after
  unmount.
- VERIFIED after the change, via real soft navigations: /about, /career and /work all
  land with every shrink target present AND carrying GSAP's inline style
  (#about-hero-inner, #career-hero-copy + #career-hero-carousel, #work-hero-copy +
  #work-hero-dome). Geometry unchanged on arrival (about sticky 1104px @ -384px,
  origin 632.4px 384px = height-100vh). The end-trigger elements correctly have NO
  gsap style, confirming targets and end triggers are not conflated.
- `bunx tsc --noEmit` exit 0; biome clean on the file.
- STILL NOT PROVABLE IN THIS PANE: whether the scrub now runs correctly, because the
  pane delivers no scroll events and ScrollTrigger never advances here. The fix is
  the standard remedy for this exact symptom and is verified to be wired and torn down
  correctly; the behaviour needs the user's scroll.

## 2026-07-27 — Career hero quote card: lightened the mask veil
- `src/components/career/QuoteCard.tsx` only. New constant `MASK_EDGE_ALPHA = 0.4`;
  the radial mask's outer stop went `rgba(0,0,0,0.15)` -> `rgba(0,0,0,0.4)`.
- WHAT THE "black overlay / mask effect" ACTUALLY IS (checked, not assumed): there is
  no separate overlay div. The card is `bg-black` and the grid pattern above it is
  masked by `radial-gradient(140px circle at cursor, black 0%, rgba(0,0,0,0.15) 100%)`.
  Mask alpha controls how much of the PATTERN shows, so a low outer alpha means the
  black card shows through — that is the dark veil. Lowering the veil's opacity
  therefore means RAISING the mask's outer alpha (0.15 -> 0.4), which is the opposite
  direction to what the wording literally suggests; stating it explicitly in case the
  intent was inverted.
- Measured context that explains why THIS card looks darker than the ContactSection
  card it was copied from: same 0.15 outer stop, but ChannelCard uses a 280px radius
  while QuoteCard uses 140px, and the quote card measures only 208x260. With the mask
  parked at (0.85w, h/2), the far corners sit well beyond 140px, so most of the card
  was rendering at 15%. Radius is the alternative lever if 0.4 is not enough.
- SCOPE: QuoteCard is only reached via career/CarouselCard, so nothing else changes.
  Explicitly confirmed the two sibling masks were left at 0.15 —
  home/ChannelCard.tsx:76 and career/PerksSection.tsx:121 — since they were not part
  of the request.
- VERIFIED live: computed maskImage on all 12 rendered quote cards is now
  `radial-gradient(140px at ..., rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%)`; centre
  stop still fully opaque so the cursor spotlight is unchanged.
  `bunx tsc --noEmit` exit 0; biome 0/0 vs HEAD.

## 2026-07-27 — Career quote card: pattern made visible (mask alpha + radius)
- Follow-up to the previous entry; the screenshot showed 0.4 was still too dark.
- `src/components/career/QuoteCard.tsx` only: `MASK_EDGE_ALPHA` 0.4 -> 0.75 and new
  `MASK_RADIUS` 140 -> 220 (both named constants).
- KEY ARITHMETIC that explains why alpha alone was never going to be enough: the tiles
  are `rgb(22,22,22)` composited over a black card, so effective brightness is
  `22 * maskAlpha`. That caps the pattern at rgb(22) even at FULL alpha:
  0.15 -> 3.3 (invisible), 0.4 -> 8.8 (barely), now 16.5 of a possible 22.
- Compared against the reference implementations before touching anything: home/
  ChannelCard.tsx and career/PerksSection.tsx use the IDENTICAL tile palette
  (base rgb(22), gaps #161616), so the darkness is not unique to this card. The real
  difference is geometry — the reference cards pair a 280px radius with a much larger
  card, so most of their area sits near the mask's bright centre, while this 208x260
  card paired 140px with a small card and sat almost entirely at the outer stop.
  Fixing the mask geometry therefore matches the reference LOOK without touching the
  shared palette (which would have desynced the three cards when lit).
- VERIFIED live on all 12 rendered cards: computed mask is now
  `radial-gradient(220px at ..., rgb(0,0,0) 0%, rgba(0,0,0,0.75) 100%)`; the farthest
  corner from the parked mask centre is 219px, now just INSIDE the 220px radius, so no
  part of the card is clamped to the darkest stop any more. Centre stop still fully
  opaque, so the cursor spotlight survives.
- Siblings deliberately unchanged and re-confirmed at 280px/0.15: home/ChannelCard.tsx
  and career/PerksSection.tsx.
- If the pattern still needs to be brighter, the remaining lever is the tile palette
  (`22 + 14 * intensity` and `#161616`) — but that one is shared by all three cards.
- `bunx tsc --noEmit` exit 0; biome 0/0 vs HEAD.

## 2026-07-27 — Career quote card: veil dialled back to 0.6
- `src/components/career/QuoteCard.tsx`, one constant: `MASK_EDGE_ALPHA` 0.75 -> 0.6.
  `MASK_RADIUS` left at 220 (the complaint was about opacity, not the falloff size).
- DIRECTION NOTE: throughout this thread "opacity" has meant the BLACK OVERLAY's
  opacity, which is the INVERSE of the mask's edge alpha. "Lowered too much, increase
  it a little" therefore means bring the veil back, i.e. mask alpha DOWN from 0.75 —
  not up. 0.6 sits between the 0.4 the user called too dark and the 0.75 called too
  light. Black veil is now 40% (was 25% at 0.75, 60% at 0.4).
- Effective tile brightness (tiles are rgb(22) over a black card, so brightness =
  22 * alpha): 8.8 at 0.4 -> 13.2 now -> 16.5 at 0.75, ceiling 22.
- VERIFIED live on all 12 cards: computed mask
  `radial-gradient(220px at ..., rgb(0,0,0) 0%, rgba(0,0,0,0.6) 100%)`; centre stop
  still fully opaque so the cursor spotlight is intact; radius confirmed still 220.
  Siblings re-confirmed untouched (ChannelCard + PerksSection still 280px/0.15).
- `bunx tsc --noEmit` exit 0; biome 0/0 vs HEAD.

## 2026-07-27 — Site-wide audit: added the scroll-entry animation where genuinely missing
- AUDIT FIRST (plan.md rewritten with the findings). 68 component files ALREADY use
  `whileInView`, so the convention was well established; the job was finding real gaps,
  not blanket-applying motion.
- DELIBERATELY EXEMPT after checking each (documented in plan.md so this isn't
  re-litigated): all 10 *HeroSection/ProjectHero files (above the fold, already animate
  on MOUNT — scroll-entry is wrong there); PortfolioSection/ServiceSection/StatsSection
  (GSAP/ScrollTrigger-driven, 8-16 gsap refs each); NextProject/BlogArticle/
  OurTeamSection carousel/RelatedArticles marquee (already scroll-driven via
  useScroll/useTransform); cards & sub-parts (animated by parent or hover); Header,
  navbar, ui/ primitives.
- GAPS FIXED (13 files):
  * ProjectShowcase x8 service dirs — section header (eyebrow span, h2, p) were plain
    elements. Converted in place to motion.* with the canonical pattern, staggered
    0 / 0.1 / 0.2.
  * about/OurTeamSection + blog/RelatedArticles — heading + eyebrow, staggered 0 / 0.1.
  * blog/ArticleBlock, ShareRail, TableOfContents — had NO framer-motion at all.
- CANONICAL PATTERN sampled from existing code rather than invented:
  `initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
   viewport={{once:true,margin:"-50px"}} transition={{duration:0.6,ease:premiumEase}}`
  with `premiumEase = [0.16, 1, 0.3, 1]`. (`viewport={{once:true}}` is the most common
  form site-wide at 88 uses, with -50px next at 31.)
- JUDGEMENT CALL by the G4 worker, accepted: ShareRail and TableOfContents live inside
  `<div className="sticky top-32">` in BlogArticle — sticky sidebar chrome. Applying
  whileInView to something pinned on screen while the page scrolls under it would look
  broken, so they got a one-time MOUNT animation instead. Correct call.
- CONSTRAINT ENFORCED IN EVERY BRIEF: convert tags in place, NEVER add wrapper divs —
  several pages derive sticky offsets from measured pixel heights, so a stray div could
  desync them. Verified: no wrappers added.
- VERIFIED at driver level, not trusted from worker reports (two workers hit transient
  syntax errors from CONCURRENT edits to the same tree and reported conflicting tsc
  results): final `bunx tsc --noEmit` exit 0; `bunx next build` exit 0; all 8
  ProjectShowcase at 3 whileInView each; OurTeam/RelatedArticles at 2 each; the 3 blog
  files carry "use client" (ArticleBlock needed it added); zero duplicate `premiumEase`
  definitions; per-file biome vs HEAD worktree — NO regressions on any of the 13 files.
- RUNTIME PROOF: on /brand-strategy the new header elements sit at
  `opacity:0; transform:translateY(20px)` below the fold, i.e. correctly held in their
  pre-entry state. Article blocks likewise opacity 0 off-screen.
- FALSE ALARM RESOLVED PROPERLY: the TOC nav also read opacity 0 and stayed there. Ran
  a CONTROL on pre-existing untouched code (AboutHeroSection's headline words, which
  the user has long since approved) — those are ALSO stuck at opacity 0, with
  `rafFired: false`. So it is this pane's frozen rAF, not the new code. Did not report
  it as a defect and did not "fix" working code.
- FLAGGED, NOT DONE (needs approval): `home/Herosection.tsx` has NO entry animation at
  all — no framer, no GSAP. It is the homepage hero, above the fold, so the correct fix
  is a MOUNT animation like the other heroes, not scroll-entry. That is a prominent
  visual change to the first thing visitors see, so it is left for the user to decide.

## 2026-07-27 — Static sections animated (correcting the previous audit's misses)
- USER WAS RIGHT, and my previous audit was measured at the wrong granularity: I had
  checked whether a FILE contained `whileInView` anywhere, which passes a file whose
  cards animate but whose section HEADING is static. Re-audited at runtime instead —
  for every h1/h2 on every page, walk ancestors looking for framer's inline style.
  That produced an objective, evidence-based gap list.
- ALSO CORRECTED: I had exempted ServiceSection/PortfolioSection as "GSAP-animated".
  True for PortfolioSection (its `.reveal-item` headings get a real GSAP scroll reveal,
  PortfolioSection.tsx:223) but FALSE for ServiceSection — its GSAP only drives pinning
  and scale, and its heading never animated. And "Voices of the Collective" appeared
  animated on /home only because the GSAP shrink tween puts a transform on an ancestor;
  it was static on all four other pages that render it.
- GAPS FIXED (6 shared components, so all pages benefit):
  * home/Herosection — homepage hero had NO animation at all. Added a MOUNT animation
    (not whileInView; it is above the fold) matching AboutHeroSection's feel:
    opacity/y/blur, 5 line-level beats staggered 0.1->0.82, total 1.52s.
  * home/ServiceSection, ExperimentalTestimonials, ContactSection, BlogSection —
    section headers (eyebrow / h2 / description / CTA) staggered 0 / 0.1 / 0.2.
  * layout/Footer — link columns, newsletter column, timezone grid and bottom bar
    animated as GROUPS (not 21 individual links, which would look busy). The existing
    letter-by-letter wordmark reveal was left untouched.
- DISCLOSED BEHAVIOUR CHANGE from the worker, accepted: BlogSection's h2 already had an
  `isDesktop`-gated whileInView (x:-20). It was retargeted in place to the standard
  spec rather than nesting a second animation, so the heading now animates on MOBILE
  too, consistent with the other three.
- VERIFIED at driver level: `bunx tsc --noEmit` exit 0; `bunx next build` exit 0;
  per-file biome vs HEAD worktree — NO regressions on any of the 6 files. Runtime
  re-probe of /home confirms "We Engineer", "Our Services", "Let's build the future"
  and "Thoughts & Perspectives" now carry framer inline styles.
- TWO PROBE FALSE-NEGATIVES CHASED DOWN rather than "fixed": the footer wordmark reads
  static at h1 level but its child spans carry `transform:translateY(110%)` from the
  existing letter-reveal; and PortfolioSection's heading reads static only because
  GSAP's rAF does not run in this pane. Both are genuinely animated — left alone.
- Remaining limitation unchanged: motion cannot be behaviourally verified here (no
  rAF, no scroll events); needs the user's eyes.

## 2026-07-27 — Homepage Stats: dividers keep their 1px thickness through the shrink
- `src/components/home/StatsSection.tsx` + `src/app/home/page.tsx`.
- WHAT THE "borders" ACTUALLY ARE (checked, not assumed): StatsSection has no CSS
  border on desktop — its only `border` classes are `max-md:` (mobile-only), while the
  shrink is gated to `min-width: 768px`. The desktop lines are 1px-high divider DIVs:
  `absolute bottom-0 left-4 right-4 h-px bg-black/10`, one per row except the last
  (3 rendered). Under the 0.85 scale they render at 0.85px, hence thinner and fainter.
- FIX: gave the divider a stable `stat-divider` class plus `origin-bottom`, and added a
  SECOND scrubbed tween over the identical ScrollTrigger range animating those
  dividers to `scaleY: 1 / 0.85`. Nested transforms multiply, so 0.85 x 1.1765 = 1 —
  the rendered thickness stays exactly 1px for the whole scrub. Extracted
  `STATS_SHRINK_SCALE = 0.85` so the shrink and its inverse cannot drift apart.
- VERIFIED by measuring the divider's rendered height at the end state:
  1.000px at rest -> 0.850px shrunk WITHOUT the fix -> 1.000px shrunk WITH it.
  `thicknessPreserved: true`. Divider transform-origin computes to `592.5px 1px`
  (bottom edge), so counter-scaling grows it upward from the line's own baseline and
  it does not drift off `bottom-0`.
- DELIBERATELY NOT counter-scaled: the divider's WIDTH (1185px -> 1007px). That
  shrinks with the section, which is correct — the line should track the layout it
  underlines; only its THICKNESS was the artefact.
- `bunx tsc --noEmit` exit 0; per-file biome vs HEAD unchanged on both files.

## 2026-07-27 — Reverted the Stats divider counter-scale
- Reverted ONLY the previous entry ("borders shouldn't scale down"). The Stats shrink
  itself came from an earlier, separate task and was deliberately kept.
- `src/components/home/StatsSection.tsx`: divider className restored to exactly
  `absolute bottom-0 left-4 right-4 h-px bg-black/10 max-md:hidden md:left-10 md:right-10`
  — byte-compared against the HEAD worktree copy, identical.
- `src/app/home/page.tsx`: removed the second `.stat-divider` scaleY tween, removed the
  `STATS_SHRINK_SCALE` constant, and restored the literal `scale: 0.85` on the Stats
  shrink tween.
- VERIFIED the revert is complete AND correctly scoped: grep for
  `stat-divider|STATS_SHRINK_SCALE|origin-bottom` across both files returns nothing;
  the 3 hairline dividers still render; divider height measures 1.000px at rest and
  0.850px under the 0.85 shrink again, i.e. the original (pre-fix) behaviour is back.
  `statsInnerRef` and its shrink tween are still present at page.tsx:102-103.
- FALSE ALARM CHECKED, NOT ASSUMED: immediately after the edits the Stats inner div
  showed an EMPTY inline style, which would have meant the shrink tween had stopped
  attaching. Hard-reloaded and compared against a control (the pre-existing
  About->Portfolio shrink, untouched): after reload BOTH carry GSAP's CSSPlugin
  signature style and 4 pin-spacers exist. It was the HMR artifact (the useGSAP effect
  not re-running after a hot update), the same one previously diagnosed on
  brand-strategy — not a regression from the revert.
- `bunx tsc --noEmit` exit 0; per-file biome vs HEAD unchanged (StatsSection 1/1,
  page 0/0).

## 2026-07-27 — Analysis only: SpecularButton (WebGL SDF border) vs current StarBorder
- User pasted a SpecularButton component and asked for ANALYSIS of it against the
  WorkProjectShowcase card hover. No files changed (same pattern as the earlier
  StarBorder "analyze the code" request, which was followed by a separate "add it").
- Grounded findings (verified against the repo, not assumed):
  * `ogl` IS already a dependency (package.json:25) and its ONLY importer is
    Particles.tsx, which is dead code since the Footer import was removed. So adopting
    this needs NO new dependency — and it would give ogl a live consumer again.
  * WorkProjectShowcase renders 9 project cards (src/data/projects.ts). This component
    creates ONE WebGL context per instance -> 9 contexts. Browsers cap concurrent
    WebGL contexts around 8-16 and silently drop the oldest. Hard blocker as written.
  * Each instance also adds a `window` pointermove listener that calls
    getBoundingClientRect() on every move (9 listeners x every pointer event =
    layout thrashing) and runs an unconditional rAF render loop even when idle
    (bright decays to 0 but rendering continues).
  * Current StarBorder is 78 lines, ZERO canvas/rAF/WebGL — pure CSS + framer. So this
    swap trades a near-free effect for 9 always-on GL loops.
  * ProjectCard's container is `overflow-hidden rounded-[20px]` (line 58) while the
    effect deliberately overdraws `-inset-5` (PAD=20) so the glow can bleed outside the
    shape. Inside that container the bloom would be clipped exactly at the border.
  * It is a <button>; the project card is a <Link> wrapping a div. Adopting it means
    extracting the canvas/shader layer, not the button.
  * `propsRef.current = {...}` executes during render. This repo has
    `reactCompiler: true` (next.config.ts:5) — render-phase ref mutation is exactly the
    pattern the compiler's rules-of-react checks flag.
  * `dpr` is captured once at mount; dragging the window to a different-DPI display
    leaves the canvas mis-scaled (Particles.tsx has the same limitation, so it is at
    least consistent with existing code).
- No plan.md written and nothing implemented — awaiting the user's decision on whether
  to adopt it, and if so at what scope (e.g. featured card only, to stay within the
  WebGL context budget).

## 2026-07-27 — SpecularBorder: WebGL SDF border on the work cards (replaces StarBorder)
- NEW `src/components/ui/SpecularBorder.tsx`; `src/components/work/ProjectCard.tsx`
  swaps StarBorder for it. No new dependency — `ogl` was already in package.json and
  this gives it a live importer again (its only other importer, Particles.tsx, is dead
  code since the Footer import was removed).
- ADAPTED, not copy-pasted. Three changes driven by the analysis:
  1. **One WebGL context, not nine.** The source creates a context per instance;
     WorkProjectShowcase renders 9 cards and browsers cap concurrent contexts around
     8-16. Mounted as `{isHovered && <SpecularBorder />}` so at most ONE exists.
     Verified: 0 canvases at rest.
  2. **Escapes the clip.** The effect deliberately overdraws `-inset-5` (PAD 20) so the
     bloom bleeds past the shape, but the card's inner div is
     `overflow-hidden rounded-[20px]`. Mounted it in the OUTER wrapper instead
     (`group relative w-full cursor-pointer`) — verified `overflow: visible` there,
     and its box matches the card exactly (1185x600), so `inset-0` aligns the SDF.
  3. **No render-phase ref mutation.** The source assigns `propsRef.current` during
     render; this repo has `reactCompiler: true`, which flags exactly that. Moved the
     sync into a `useEffect`.
  Also dropped the button chrome/`SIZES`/tint vars (not a button here) and added a
  `prefers-reduced-motion` path that renders ONE static frame instead of running the
  rAF loop.
- MEASUREMENT TRAP HIT AND IDENTIFIED: every element in the card chain — grid, link,
  card, even the <img> — measured width 0, which looked like a real layout bug. Root
  cause was `window.innerWidth === 0` (also innerHeight/clientWidth 0), the documented
  intermittent pane degradation. After `resize_window` the card box reads a correct
  1185x600. ALWAYS log innerWidth beside width measurements here.
- VERIFIED: `bunx tsc --noEmit` exit 0; `bunx next build` exit 0; biome on both files
  shows only the 1 pre-existing noImgElement; WebGL2 confirmed available in-browser
  ("WebGL 2.0 (OpenGL ES 3.0 Chromium)"); mount point overflow visible; inner card
  overflow hidden; 0 canvases until hover.
- NOT verifiable here: the effect itself. It needs a real cursor (CSS/JS hover) AND a
  live rAF loop, and this pane provides neither. Needs the user's mouse.
- CONSEQUENCE TO DECIDE: `src/components/ui/StarBorder.tsx` now has ZERO importers.
  Left in place rather than deleted, since reverting is then a one-line import swap.
  Its keyframes in globals.css (`star-movement-top/bottom`) are likewise now unused.

## 2026-07-27 — SpecularBorder: fixed misalignment, dead-still light, and themed it
- `src/components/ui/SpecularBorder.tsx` only. Three separate reported faults, three
  separate causes — each diagnosed before editing.
- (1) "out of place on bigger cards" — MEASURED CAUSE: ProjectCard's wrapper animates
  `scale: isHovered ? 1.01 : 1`, and SpecularBorder sits inside it. The SDF was sized
  from `getBoundingClientRect()`, which ALREADY includes that scale, while the canvas
  is itself scaled by the same ancestor — so the scale applied twice. Measured at
  1.01: big card rect 606px vs layout 600px (6px drift), width 1196.85 vs 1185
  (11.85px); error grows with card size, exactly matching "bigger cards". FIX: size
  from `offsetWidth`/`offsetHeight`, which are layout values and transform-independent.
  Pointer math still uses getBoundingClientRect, which is correct there because
  pointer coords are screen-space.
- (2) "doesn't move an inch" — CAUSE: because the component only mounts on hover,
  `proximityT` started at 0 and is only ever set inside `onPointerMove`. If the cursor
  entered the card and stopped, no further pointermove fired, so `bright` stayed 0 and
  NOTHING rendered at all. FIX: seed `proximityT = 1` at mount (mount implies hovered),
  so brightness eases up immediately. Also added a continuous `Math.sin(idleAngle) *
  SWAY` (0.35 rad) around the pointer direction so the light keeps breathing even when
  the cursor is perfectly still, instead of easing to a fixed angle and freezing.
- (3) "make it our theme like the gradient" — added a second colour uniform
  `uLineColor2` and mixed it across the shape
  (`g = 0.5 + 0.5 * p.x / uHalfSize.x`), defaulting to the site gradient
  `#2E5BFF -> #149CCB` (the exact pair used in 109 places across src/components).
- VERIFIED THE SHADER BY RUNNING IT, not by reading it: compiled the real GLSL in a
  headless WebGL2 context, linked it, and read pixels along the top edge with a wide
  shine window. Green/blue ratio rises monotonically left->right —
  0.376 / 0.455 / 0.544 / 0.633 / 0.739, i.e. (36,76,202) blue blending to
  (17,122,165) cyan. Gradient direction and endpoints confirmed correct.
- `bunx tsc --noEmit` exit 0; `bunx next build` exit 0; biome clean on the file.
- Still needs the user's cursor for the felt result (this pane has no real hover and
  no rAF). Knobs if it needs tuning: `SWAY` (how much it drifts when still),
  `speed` (drift rate), `intensity`, `shineSize`/`shineFade` (how much of the
  perimeter lights up).

## 2026-07-27 — SpecularBorder: made the effect thicker
- `src/components/ui/SpecularBorder.tsx`, two lines: `thickness` default 1 -> 3, and
  the shader's `edgeClamp` upper bound `3.0 * uPx` -> `max(3.0 * uPx, 3.0 * uThickness)`.
- WHY BOTH WERE NEEDED — raising `thickness` alone would have done almost nothing.
  `edgeClamp` hard-limits the highlight to ~3 device px from the border regardless of
  the Gaussian sigma. Proved it by compiling the shader headlessly and counting lit
  pixels across the border with the ORIGINAL clamp:
      thickness 1 -> 2px, thickness 4 -> 4px, thickness 8 -> 4px  (saturated)
  With the widened clamp: 1 -> 2px, 4 -> 9px, 8 -> 19px. At thickness 1 both versions
  give 2px, so the change is backwards compatible for any caller passing the old value.
- VERIFIED the shipped values by running the real GLSL again: 2px before ->
  **7 device px** now at dpr 1, and 15 at dpr 2 (correctly doubling for the same CSS
  thickness, since uThickness is multiplied by dpr before upload).
- `bunx tsc --noEmit` exit 0; `bunx next build` exit 0; biome clean.
- `thickness` is a prop, so ProjectCard can override per-card if 3 is too heavy on the
  smaller cards; the shader now scales the clamp with whatever value is passed.

## 2026-07-27 — StatsSection: only the content shrinks, dividers stay put
- Re-request of an earlier task the user reverted, but with a DIFFERENT requirement:
  previously I counter-scaled the divider so its THICKNESS stayed 1px (it still moved
  and narrowed); now the divider must not change at all — only text/numbers shrink.
- BETTER APPROACH, using structure that already existed: the divider is a SIBLING of
  `.stat-inner`, and `.stat-inner` already carried `will-change-transform` — the
  original markup clearly anticipated that element being the scaled one. So instead of
  scaling the whole wrapper and then fighting the side effects, the tween now targets
  `.stat-inner` directly. The dividers are outside it, so they are untouched BY
  CONSTRUCTION rather than by compensation.
- `src/app/home/page.tsx`: tween target `statsInnerRef.current` ->
  `statsInnerRef.current.querySelectorAll(".stat-inner")`; dropped `y: 40` (with
  per-row scaling about each row's own centre, a shared y would shove every row's
  content down and collide with the dividers); simplified the wrapper className to
  `bg-white` since it is no longer transformed (its `origin-[...]`/`will-change`
  classes were dead once it stopped being the tween target).
- VERIFIED at the end state by applying the tween's exact transform and re-measuring:
  divider box IDENTICAL before/after — {l:40, r:1225, w:1185, h:1, t:8031} both times,
  and true for all 3 dividers. Content shrank 1265x248 -> 1075x210.8.
  Also confirmed GSAP attaches to all 4 `.stat-inner` and to NONE of the 3 dividers.
- HMR FALSE ALARM AGAIN: first measurement showed no inline styles anywhere, implying
  the tween never attached. Hard reload + comparing against the untouched
  About->Portfolio control (which also showed none pre-reload, and its signature style
  post-reload) confirmed it was the stale-effect artifact, not a wiring bug.
  4 pin-spacers present, so the pins are intact.
- `bunx tsc --noEmit` exit 0; `bunx next build` exit 0; biome 0 on page.tsx (unchanged
  from its HEAD baseline).

## 2026-07-27 — SpecularBorder: raised glow intensity
- `src/components/ui/SpecularBorder.tsx`, one value: `intensity` 1 -> 2.5.
- CHECKED FOR A CEILING FIRST, because the previous "thicker" task showed this shader
  has one (edgeClamp capped thickness at ~4px no matter the value). Intensity does NOT
  saturate early — swept 1/1.5/2/3/5 in a headless WebGL2 context and peak luminance
  rose 255 -> 383 -> 484 -> 549 -> 659 against a 765 ceiling, so it is a genuine knob
  across the whole range. Picked 2.5 rather than something larger to stay clear of
  blow-out.
- VERIFIED at the shipped value, measured with the REAL current colours (both stops
  #2E5BFF, see note below): average luminance of lit pixels 25 -> 60 (**2.4x**), peak
  255 -> 478, pixels above a "bright" threshold 0 -> 176, and `saturated: false` so
  there is still headroom if it needs to go further.
- NOTED, NOT CHANGED: `lineColor2` is currently "#2E5BFF", identical to `lineColor`, so
  the gradient added earlier is presently flat blue. That value was changed outside
  this task, so it was left alone — but it is why the border reads as one colour rather
  than the #2E5BFF -> #149CCB blend. Restoring the blend is a one-word change if wanted.
- `bunx tsc --noEmit` exit 0; `bunx next build` exit 0; biome 0 on the file.
- Knobs, in order of effect on perceived glow: `intensity` (brightness, headroom left),
  `thickness` (band width, now scales the clamp with it), `shineSize`/`shineFade` (how
  much of the perimeter lights up at once).

## 2026-07-27 — SpecularBorder: sped up the glow's travel
- `src/components/ui/SpecularBorder.tsx`, one value: `speed` 0.35 -> 0.7.
- WHAT `speed` DRIVES HERE (worth recording, since it changed meaning): it advances
  `idleAngle`, which since the earlier "doesn't move" fix feeds the continuous sway
  `target = pointerAngle + sin(idleAngle) * SWAY`. So it sets the FREQUENCY of the
  light's drift around the border, not the pointer-chase responsiveness (that is the
  separate `1 - exp(-dt * 7)` easing) and not the fade-in (`exp(-dt * 8)`).
- QUANTIFIED BEFORE CHOOSING, by simulating the actual update loop at 60fps rather
  than guessing: at 0.35 one full sway cycle took **17.95 s** with a peak angular
  velocity of just **7 deg/s** — which is why it read as nearly static even after the
  earlier fix. Swept candidates:
      0.35 -> 17.95s / 7 deg/s      (before)
      0.50 -> 12.57s / 10 deg/s
      0.70 ->  8.97s / 14 deg/s     (chosen — "a little bit" = ~2x, not jumpy)
      0.90 ->  6.98s / 17.9 deg/s
      1.20 ->  5.23s / 23.7 deg/s
- `bunx tsc --noEmit` exit 0; `bunx next build` exit 0; biome 0 on the file.
- If it still feels slow, the table above maps values to real numbers; `SWAY` (0.35 rad)
  is the companion knob — it sets how FAR the light travels each cycle, whereas `speed`
  sets how OFTEN. Increasing SWAY may read as "faster" more convincingly than raising
  speed further, since a wider arc covers more of the border per pass.

## 2026-07-27 — SpecularBorder: sped up again (frequency AND amplitude)
- `src/components/ui/SpecularBorder.tsx`: `speed` 0.7 -> 1.2 and `SWAY` 0.35 -> 0.55.
- WHY BOTH — second request in a row, so instead of doubling `speed` again I checked
  what actually limits perceived motion. Peak angular velocity is `SWAY * speed`, so
  amplitude counts as much as frequency, and simulation showed raising speed ALONE
  leaves the travel arc pinned at ~40 deg: the glow wiggles in place instead of
  travelling, which is very likely why the previous doubling did not land.
      speed 1.0, sway 0.35 -> 19.9 deg/s, arc 39.7 deg
      speed 1.2, sway 0.35 -> 23.7 deg/s, arc 39.5 deg   (arc unchanged)
      speed 1.2, sway 0.55 -> 37.3 deg/s, arc 62.1 deg   (chosen)
- VERIFIED by re-simulating the shipped values against both prior settings:
      original (0.35/0.35): 17.95s period,  7.0 deg/s, 40.1 deg arc
      previous (0.70/0.35):  8.98s period, 14.0 deg/s, 39.9 deg arc
      shipped  (1.20/0.55):  5.24s period, 37.3 deg/s, 62.1 deg arc
  = 2.66x faster than the previous setting, 5.33x faster than the original.
- `bunx tsc --noEmit` exit 0; `bunx next build` exit 0; biome 0 on the file.
- If it STILL reads slow, the remaining lever is not these two: the light's response to
  cursor movement is the separate `1 - Math.exp(-dt * 7)` chase term, and how much of
  the perimeter lights up at once is `shineSize`/`shineFade`. Widening the lit region
  makes the same angular motion far more legible than raising velocity further.

## 2026-07-27 — Footer bottom bar invisible — my bug from the scroll-animation task
- `src/components/layout/Footer.tsx`, one option: the copyright/rights bar's
  `viewport={{ once: true, margin: "-50px" }}` -> `viewport={{ once: true }}`.
- ROOT CAUSE, measured not guessed: `margin: "-50px"` SHRINKS the IntersectionObserver
  root by 50px on every side. That bar is the last content on the page, so even at
  MAXIMUM scroll it cannot rise above the shrunken bottom edge:
      viewport height        720
      bar top at max scroll  676
      detection line (720-50) 670
      -> bar top sits 6px BELOW the line, so it never intersects, whileInView never
         fires, and it stays pinned at its initial `opacity:0; translateY(20px)`.
  Confirmed the stuck state directly: computed opacity 0 with that exact inline style.
  6px is the entire margin of error — which is why it looked like a mystery.
- SCOPED THE FIX rather than blanket-removing the margin: re-measured all 6 animated
  footer groups at max scroll. Only this one has `top > vh - 50`; the other five sit
  at -194..540 and are comfortably inside the shrunken root, so their `-50px` margins
  were left untouched (3 remain, at lines 111/139/237).
- VERIFICATION NOTE (honest): the fix cannot be observed running in this pane —
  everything in the footer reads opacity 0 here, including groups at top -194 that are
  plainly inside the viewport, because framer's rAF-driven animations and IO callbacks
  do not run (both IntersectionObserver probes returned "no callback"). The proof is
  therefore geometric and exact: with -50px the detection bottom is 670 and the bar top
  is 676 (misses); with no margin the detection bottom is 720 and 676 < 720 (reaches).
- GENERAL RULE for this repo: never use a negative `viewport.margin` on the LAST
  element of a page — it can become unreachable. 88 usages site-wide already use the
  bare `viewport={{ once: true }}`, which is the safe default here.
- `bunx tsc --noEmit` exit 0; `bunx next build` exit 0; biome 3 on Footer = unchanged
  from its HEAD baseline.

## 2026-07-27 — SpecularBorder: removed the "round and round" circling
- `src/components/ui/SpecularBorder.tsx`: the update loop's fallback branch
  `: idleAngle` replaced with a fixed `REST_ANGLE` base, so the target is now always
  `base + sin(idleAngle) * SWAY`. Added `const REST_ANGLE = 2.4` and reused it for the
  initial angle/idleAngle and the reduced-motion frame (it was a magic 2.4 in three
  places).
- CAUSE, proven by simulating the loop rather than eyeballing: when `pointerAngle` is
  still null (no pointermove since mount — and the component MOUNTS on hover), the
  target was the free-running `idleAngle`, which increments forever. At the current
  speed 1.2 that swept **1235 deg in 20s = 3.43 full revolutions** — literally round and
  round. `idleAngle` is now only the sway PHASE, never the target itself.
- MY OWN EARLIER CHANGES MADE IT WORSE: raising `speed` 0.35 -> 0.7 -> 1.2 across the
  two "increase the speed" tasks tripled the revolution rate of exactly this branch.
- VERIFIED against the shipped code, both branches: stationary pointer 62.1 deg swept
  (0.17 rev) and pointer held at 1.0 rad 62.1 deg (0.17 rev) — identical and bounded,
  matching the sway amplitude of 63 deg peak-to-peak. Unbounded rotation is now
  impossible because the only term that grew without limit is no longer the target.
- KEPT AS-IS per the request ("apart from that all the movement and effect is good"):
  pointer following, the sway, `speed` 1.2, `SWAY` 0.55, intensity 2.5, thickness 3.
- `bunx tsc --noEmit` exit 0; `bunx next build` exit 0; biome 0 on the file.

## SpecularBorder on blog cards (BlogListSection)
- REQUEST: same border hover effect as WorkProjectShowcase's project cards, on
  `BlogListSection`'s cards -> `src/components/blog/BlogCard.tsx` (its only consumer).
- STRUCTURAL DIFFERENCE from ProjectCard, the reason this wasn't a one-line import
  swap: BlogCard's scaling `motion.div` WAS the `overflow-hidden rounded-[20px]` card,
  so there was no unclipped mount point — a SpecularBorder dropped in there would have
  had its `-inset-5` bloom cut off exactly at the border it is drawing. Split it the
  same way ProjectCard is: outer `motion.div` keeps scale + hover handlers + `group`
  and is `overflow: visible`; a new inner div carries the clip, radius, bg, border.
- `hover:bg-zinc-900` -> `group-hover:bg-zinc-900` since the hover target moved out.
- REPLACED `TracingBorder` (its 8 other importers are untouched).
- Mounted as `{isHovered && <SpecularBorder radius={20} />}`, matching ProjectCard, so
  only the hovered card holds a WebGL context — BlogListSection renders up to 6 cards
  and browsers cap concurrent contexts at ~8-16.
- VERIFIED in-pane at 1280px, /blog: card box 374x600 and radius 20px UNCHANGED by the
  split, new wrapper is `overflow: visible` and exactly the same 374x600 box. Real
  pointer hover (ref-based; coordinate hover needs a screenshot, which this pane can't
  take) -> host span 374x600 = the card box exactly, canvas 414x640 = card + 2*20px PAD,
  live webgl2, and exactly 1 canvas on the page. Moving to another card moved the
  context with it, still 1 total — no leak.
- Bloom fits the layout: grid gap is 24px (32px md) vs a 20px bloom, so neighbouring
  cards can't clip it. Section `overflow-hidden` with `px-4` clips ~4px of the outer
  glow on the outermost cards at mobile widths only (desktop `px-10` is clear); the
  border line itself is unaffected. Left alone as out of scope.
- Console showed parse errors for BlogCard — buffered from the intermediate state
  between the two structural edits (they cite a 134-line file; current is 136). No
  build-error overlay after reload, cards render, hover works.
- `bunx tsc --noEmit` exit 0; `bunx next build` exit 0; biome on the file: 0 errors,
  1 pre-existing `noImgElement` warning on the untouched `<img>`.
- NOT verified in-pane (unchanged limitation): the motion itself — rAF is frozen here.

## SpecularBorder on brand-strategy ProjectShowcase cards
- REQUEST: same border hover effect as WorkProjectShowcase's cards, on the brand-strategy
  page's `ProjectShowcase` -> `src/components/brand-strategy/ProjectShowcase.tsx` (the
  card is a local `ProjectCard` at the bottom of that same file).
- SAME CLIP PROBLEM as BlogCard, plus one extra: the card root was BOTH the
  `overflow-hidden rounded-[20px]` box AND the flex item whose `flex` framer animates
  (1.4/1.7/2 -> 4 on hover). Split it: outer `motion.div` keeps `flex` + `scale` + hover
  handlers + `group`, is `overflow: visible`, and stays the flex item; new inner
  `relative h-full w-full overflow-hidden rounded-[20px]` carries the clip.
- REPLACED `TracingBorder` with `{isHovered && <SpecularBorder radius={20} />}`.
- The pre-existing `border-white/10` overlay with `group-hover:opacity-0` still fades
  correctly with `group` moved to the wrapper — VERIFIED by killing the transition and
  reading the target value: hovered card 0, idle card 1. (Reading it live gives 1 on
  both because CSS transitions are frozen in this pane — do not trust the live value.)
- VERIFIED in-pane at 1280px, /brand-strategy: all 5 cards have wrapper box == inner box
  exactly, wrapper `overflow: visible`, radius 20px. Real pointer hover -> host span ==
  card box (379x300), canvas 419x340 = card + 2*20px PAD, live webgl2, exactly 1 canvas.
  Hovering a wider card (580x300) moved the context with it, canvas 620x340, still 1
  total — sizing is per-card, no leak.
- NOT VERIFIED, AND THE ONE THING TO EYEBALL: that the border TRACKS the card while its
  flex width animates 1.4 -> 4. This is the first card where layout width (not just
  transform) changes while the border is mounted, so it depends on SpecularBorder's
  ResizeObserver. Tried to test it; canvas stayed 620 while the host was forced to 900.
  PROVED that is a pane artifact, not a defect, with a CONTROL: a plain ResizeObserver
  on a plain div never fired here either — not even its initial delivery — and rAF never
  ran, because the pane isn't compositing frames. RO delivery is part of the rendering
  steps, so it cannot be exercised here at all.
  (Note ogl's `setSize` writes INLINE px on the canvas, which beats the `[&_canvas]:w-full`
  class — so canvas size is JS-driven and RO is genuinely load-bearing here.)
- `bunx tsc --noEmit` exit 0; `bunx next build` exit 0; biome on the file: 0 errors,
  2 PRE-EXISTING warnings (unused `React` import, `<img>`) left untouched.
- LEFT ALONE: 7 sibling `*/ProjectShowcase.tsx` (ai-marketing-automation, app-development,
  custom-software, digital-marketing, ui-ux-design, video-production, web-development)
  are near-identical copies still on TracingBorder. Only brand-strategy was requested.

## 2026-07-30 — Onboard: verify + patch map (3.03 days old, under threshold)
Onboard. Map was 3.03 days old (stamp 2026-07-26, mtime 2026-07-27) — under 7-day threshold, so
read + confirm vs live tree (no re-exploration). All load-bearing claims verified accurate:
17 routes, no backend (no middleware/route.ts/"use server"), deps exact (Next 16.2.5/React
19.2.4/Biome 2.2.0/Tailwind ^4), 8 service folders, garbage/ deleted, the 2026-07-24 component
extraction + dead-file removal happened. Found my session's ProjectOutcomes.tsx committed + wired.
3 DRIFT ITEMS found + PATCHED (4 edits to CODEBASE_MAP.md):
1. WorkProjectPage row was stale — another session split the gallery: page now renders
   <ProjectGallery galleryA> → <ProjectOutcomes> → <ProjectGallery galleryB> (gallery split at
   :51-54, takes `images` prop not `project`). Updated the row with the real render order + the
   new generateMetadata:23.
2. "No per-page metadata except /blog/[slug]" was FALSE — /work/[slug] now has generateMetadata
   too (title/description). Corrected the defect bullet.
3. ProjectOutcomes.tsx missing from the extraction note — added. Also: file count 149→156,
   "working tree clean"→"sometimes carries small WIP" (a 2-line WhyJoinUs tweak + stray
   public/assets PNGs were uncommitted today).
Stamp bumped 2026-07-26 → 2026-07-30. No source changes. Map edits only.

## Perf investigation: "why does this whole project lag so much" (analysis only, no code changed)
- MEASURED, not guessed. Caveat stated up front: the pane cannot composite frames, so
  FPS / long tasks were NOT measurable. Diagnosis is built on measured COSTS (pixels
  decoded per frame, blur area, byte weights, oversample factors).
- ROOT CAUSE #1 — SIMULTANEOUS VIDEO DECODE. `career/InfiniteRow.tsx:32` wraps the row
  items in `Array.from({length: 6})` for the marquee, and two of those items are videos.
  Runtime on /career: **12 <video> elements, all 12 playing at once**, 6 of them
  4096x2160 => **64.6 megapixels decoded per frame** (~1.9 Gpx/s at 30fps). Each <video>
  gets its own decoder; 6 concurrent 4K decoders exceed most hardware decoders and fall
  back to software => pegged CPU => everything in the tab janks.
- ROOT CAUSE #2 — ASSET WEIGHT. `public/` is **225 MB**. `assets/video1.mp4` is
  **49.8 MB @ 4096x2160**, used on BOTH /about and /career, displayed at 1102x620
  (13x oversample). video5 29.6 MB (/contact), video4 10.3 MB, hero.mp4 7 MB (/home).
  **No `poster` and no `preload` attribute anywhere in the codebase** (grep: 0 hits), so
  they download eagerly and first paint waits on video data.
- ROOT CAUSE #3 — HOMEPAGE HERO does two expensive things at once, both permanent:
  * `home/Herosection.tsx:60` `absolute inset-0 z-10 backdrop-blur-xl` = blur(24px) over
    a MEASURED 862,243 px^2 (0.94 of the viewport) sitting directly on top of an
    autoplaying looping video => full-viewport backdrop re-blur every video frame.
  * `home/Herosection.tsx:27-37` a rAF loop calling `ctx.drawImage(video,0,0,1920,1080)`
    EVERY frame forever, into a canvas that `:116-121` displays at 220x118 — ~100x more
    pixels than needed. Also `video.addEventListener("play", drawFrame)` starts a NEW
    rAF loop on every `play` event while cleanup cancels only the last id => loops stack.
- CONTRIBUTING — IMAGES: 66 `<img>`/`motion.img` vs only 8 files using next/image.
  Measured on /home: `ux-store-...jpg` natural **7952x5304 (42 MP)** shown at 1280x720
  (6.2x oversample, ~168 MB decoded RAM); `zyro-...jpg` 4284x2860; 88x55 thumbnails
  loading 600-800px sources (9x). Local `b2.png` 8.4 MB, `b1.png` 7.7 MB.
- CONTRIBUTING — SCROLL/PAINT: pages are 11.8-12.5 viewports tall (8.5-9k px) from the
  `pb-[100vh]`/`-mb-[100vh]` overlap pattern; 19 backdrop-filter elements on /home;
  33 `filter:` usages incl. brightness/grayscale animated over large images on card
  hover (large repaints); 115 files import framer-motion; 5 use ScrollTrigger.
- MINOR BUT PERMANENT: `layout/Footer.tsx:80` `setInterval(..., 1000)` re-renders a
  MEASURED 150-node framer-motion subtree every second on EVERY page, building 4 fresh
  `Intl.DateTimeFormat` per tick (measured ~1.0 ms/tick) instead of hoisting them.
  14 `setInterval` rotators exist across the codebase.
- DEV-vs-PROD HONESTY: the 21 MB decoded JS / 6.4 MB CSS I first measured is DEV-ONLY
  inflation and NOT a production number — production is 3.8 MB raw JS across 47 chunks
  in `.next/static`. If lag is being judged from `bun run dev`, part of it is dev
  overhead. All the video/image/DOM/blur findings above are markup-level and apply to
  production equally.
- NO FILES CHANGED. Fix list offered to the user, ranked; awaiting go-ahead.

## Pause videos when offscreen (site-wide)
- APPROACH: ONE observer mounted once, not 8 per-component edits. `<video>` lives in 8
  components and several are rendered many times over (career `InfiniteRow` duplicates
  its items 6x, so 12 video elements on /career), so per-call-site wiring would have
  meant callback refs inside `.map()`s in 8 files. Instead:
  NEW `src/components/ui/VideoViewportPause.tsx` — one IntersectionObserver
  (`rootMargin: 200px` so it resumes just before becoming visible) + a MutationObserver
  on `document.body` to pick up videos mounted later (AnimatePresence, marquee copies).
  Mounted once in `src/app/layout.tsx`, so it covers every page and every copy.
- SAFETY RULE: only videos this component paused are ever resumed (`pausedByUs` WeakSet),
  so a video paused for any other reason stays paused.
- SECOND EDIT, REQUIRED TO AVOID A REGRESSION I WOULD HAVE CAUSED: `home/Herosection.tsx`
  attached the canvas draw loop directly as the `play` listener, and cleanup cancelled
  only the LAST rAF id. Pausing/resuming on scroll fires `play` repeatedly, so every
  resume would have left ANOTHER concurrent 1920x1080 `drawImage` loop running. Now a
  `startLoop` wrapper cancels any in-flight frame first, and `drawFrame` returns early
  when paused instead of spinning a no-op frame forever.
- VERIFIED (logic, against the REAL 12 video elements on /career):
  discovery 12/12 from `document`; finds a video nested in a newly-added subtree (1) and
  when the added node IS the video (1); ignores text nodes (0). Offscreen entries ->
  playing 12 -> 0. Back onscreen -> 0 -> 12. Externally-paused video: stays paused while
  the other 11 resume (11, victim.paused === true).
  Hero loop, with a stubbed rAF: OLD pattern 3 play events -> **3 concurrent loops**;
  NEW pattern -> **1**, and 0 remaining after pause. The hazard was real and is fixed.
- VERIFIED (shipped): `rootMargin:"200px"` present in 2 production chunks under
  `.next/static`; layout imports and renders it at :3 and :25. `bunx tsc --noEmit` exit 0;
  `bunx next build` exit 0; biome on the 3 files: only 2 PRE-EXISTING diagnostics, both on
  `Herosection.tsx:12` `({}: any)` — proved pre-existing via `git show HEAD:` (byte
  identical) and the diff never touches line 12.
- NOT VERIFIED — END-TO-END SCROLL BEHAVIOUR, and why (three independent blockers, each
  proven, not assumed): (1) the Browser pane delivers **ZERO** IntersectionObserver
  callbacks — control: a plain IO on a plain div fired 0 times, not even initial delivery,
  because the pane is not compositing frames; (2) the only connected real Chrome is a
  REMOTE macOS device (`isLocal: false`) which cannot reach this Windows localhost;
  (3) no Playwright/Puppeteer installed anywhere, and adding one needs the user's OK.
  So what is unverified is only that the browser DELIVERS the callbacks — standard
  browser behaviour — not the decision logic, which is tested above.
- EXPECTED WIN (unmeasured for the reason above): /career should drop from 12 videos
  playing / 64.6 MP decoded per frame to only the copies actually visible. IO clips
  against ancestor overflow per spec, so marquee copies translated outside the strip
  count as non-intersecting.

## InfiniteRow: duplicate the wrapper, not the video
- REQUEST: the career marquee repeated its whole item list 6x, so the video was rendered
  6x per row (12 <video> elements site-page-wide). Wanted shape per row:
  [video, image, image, image, image, image] — real video in the first copy only.
- WHY THE 6 COPIES MUST STAY: `InfiniteRow` animates x by exactly `-16.666667%` (= 1/6 of
  the track), so a seamless loop REQUIRES 6 copies of identical width. Dropping the video
  from the repeats is only safe because `CarouselCard` is a fixed box
  (`h-[160px] sm:h-[200px] md:h-[260px] aspect-[4/5]`) for EVERY item type — swapping a
  video for an image cannot change a copy's width. VERIFIED below, not assumed.
- CHANGED (3 files):
  * `CarouselCard.tsx` — video variant gains optional `still`; new `stillOnly` prop renders
    `<img src={still}>` instead of the `<video>`. Falls back to the video when `still` is
    missing, so a forgotten `still` degrades to old behaviour, not a blank card. Extracted
    `IMAGE_CLASS` so the two <img> branches share one class string.
  * `InfiniteRow.tsx` — one line: `stillOnly={loopIndex > 0}`.
  * `CareerHeroSection.tsx` — hoisted each row's existing Unsplash URL to `col1Still` /
    `col2Still` and reused it as the video's `still` (no new remote URL invented, so it is
    guaranteed to resolve). NOTE: no ffmpeg on this machine, so a real poster frame of the
    videos could not be extracted — comment in the file says to swap these in later.
- VERIFIED at runtime on /career (DOM counting needs no rAF/IO, so the pane CAN prove this):
  * `videosPerCopy: [1,0,0,0,0,0]` on BOTH tracks — literally the requested shape.
  * <video> elements 12 -> **2** (one video1.mp4, one video2.mp4). Playing: 2.
  * Video megapixels decoded per frame **64.6 -> 10.8** (6x less). The residual 8.8 is
    video1's untouched 4K encode.
  * SEAMLESS LOOP INTACT: all 6 copies exactly 660px, track 3960 = 660*6, so
    `oneCopyIsExactlyOneSixth: true` — the -16.666667% shift still lands exactly one copy
    over. All 18 cards in a track measure an identical 208x260.
  * Stills all decode: 22 marquee <img>, 0 broken, col1Still x11 + col2Still x11.
- `bunx tsc --noEmit` exit 0; `bunx next build` exit 0.
- LINT, HONESTLY: biome exits 1 on `InfiniteRow.tsx:33` `noArrayIndexKey` — PRE-EXISTING,
  proved byte-identical at `git show HEAD:` and my only diff there is the `stillOnly` prop.
  I DID add one NEW `noImgElement` WARNING (CarouselCard <img> count 1 -> 2), matching the
  file's existing idiom and the codebase's 59 `<img>` convention.

## Replace raw <img> with next/image site-wide
- SCOPE: 65 files, 67 image elements (59 `<img>` + 8 `<motion.img>`). 64 files converted;
  ONE deliberately left (see below). Specialists: 8 parallel `frontend-developer` agents,
  batched BY COMPONENT TYPE (not by directory) because the 8 service dirs are near-identical
  copies — so one recipe applied consistently to all 8 copies of each component. Disjoint
  file sets, so no edit conflicts. I did the risk analysis, the config, and all verification.
- PREREQUISITE FOUND BEFORE EDITING ANYTHING: `i.pravatar.cc` (48 avatar uses across the 8
  CtaSection files) was NOT in `next.config.ts` remotePatterns — converting those would have
  thrown at runtime. Added it. Other checks cleared: no `.svg` srcs (optimizer rejects SVG
  without `dangerouslyAllowSVG`); the vendor-domain hits (nextjs.org, tailwindcss.com, ...)
  are bare origins used as LINKS, not image srcs; `sharp` 0.34.5 already installed, so NO
  new dependency was needed.
- RECIPE: FILL mode (`fill` + `sizes`) where the img filled its parent, FIXED mode
  (`width`/`height`) where it had fixed pixel sizing. Agents had to verify a positioned
  ancestor for every `fill`; only ONE `relative` was added anywhere (work/NextProject.tsx).
  `priority` added ONLY to genuinely above-the-fold heroes: the 8 StrategyHeroSection
  rotators (`priority={index === 0}` — index 0 is the initially-visible one) and
  work/ProjectHero. Everything else stays lazy.
- `motion.img` -> `const MotionImage = motion.create(Image)` (framer-motion 12.38 supports it)
  in the 8 ProjectShowcase files, preserving the animated `scale` + `filter` props.
- LEFT AS `<img>` — `src/components/ui/LogoLoop.tsx:385`, deliberately. It measures
  `seqRef.getBoundingClientRect().width` to derive loop distance AND copy count, and
  re-measures on every image `load`; its images are `h-[var(--logoloop-logoHeight)] w-auto`
  so there is no fixed pixel width to supply, making FIXED mode inexpressible and bare
  `fill` actively wrong (unpositioned auto-width `<li>` would collapse to 0). The `<img>`
  branch is also currently dead code — the only caller passes `node`-based items — so
  converting would have turned dead code into a runtime throw. Correct call.
- VERIFIED — BUILD/TYPES/LINT: `bunx tsc --noEmit` exit 0. `bunx next build` exit 0 from a
  CLEAN `.next` (I deleted the whole dir and rebuilt twice). Biome: errors **145, UNCHANGED**
  from the session baseline; warnings **115 -> 49**, and 115 - 66 = 49 exactly, i.e. the drop
  is precisely the 66 eliminated `noImgElement` warnings. Exactly 1 `noImgElement` remains
  (LogoLoop). Only 1 raw `<img>` left in the whole codebase.
- VERIFIED — UI UNCHANGED, by comparing a rendered-geometry frequency map (box size +
  object-fit per image) captured BEFORE the change against AFTER, at a pinned 1280x800:
  * /home: 26 images, ALL buckets identical.
  * /career: 44 images, ALL 9 buckets identical.
  * /brand-strategy: 82 images, 7 of 10 buckets identical; 3 differ by <=1px (52->53,
    561->560, 581->580) in percentage-sized elements — sub-pixel rounding, NOT verified
    further (see below).
- VERIFIED — PIPELINE ACTUALLY WORKS: on /career all 44 images loaded, **0 failed**, and all
  44 were served through `/_next/image`. Optimizer probed directly per host: i.pravatar.cc
  (the newly allowlisted one) 200, images.unsplash.com 200, plus.unsplash.com 200, local
  asset 200.
- MEASURED WIN on the heaviest assets from the earlier perf audit, at w=1920 q=75:
  ux-store...jpg 4.21MB -> 131KB (**33x**), zyro...jpg 1.38MB -> 135KB (10x),
  b1.png 7.71MB -> 518KB (15x).
- TWO FALSE ALARMS, both diagnosed rather than assumed: (1) a build failure in
  `.next/dev/types/validator.ts` ("Cannot find name 'ore'") was a CORRUPTED generated file
  written by the running dev server mid-build — cleared and rebuilt clean; (2) `/` and
  `/home` 404ing on the dev server was stale dev state after I removed `.next/dev/types`
  under a live server — a from-scratch `next build` lists both routes, exit 0.
- I KILLED THE DEV SERVER during verification by forcing 82 images eager at once, making
  sharp resize dozens of multi-megapixel sources simultaneously. Worth knowing: first-hit
  optimization of these oversized originals is genuinely expensive. Restarted; unrelated to
  correctness of the change, but a real signal that the SOURCE assets are still far too big.
- NOT VERIFIED, stated plainly: (a) hover animation of the `motion.create(Image)` cards —
  needs real frames, and this pane does not composite; (b) the <=1px /brand-strategy deltas —
  the pane navigated away mid-check twice. Note the same page's logo measured 90x32 -> 90x35
  -> 90x32 across three reads purely from load state, which is direct evidence that
  sub-pixel readings here fluctuate; (c) native lazy loading never triggers in this pane at
  all (every `currentSrc` was empty until forced eager), so lazy behaviour itself is untested.
- ONE THING TO WATCH: `home/PortfolioSection.tsx:311` got `src={project.image as string}`
  because the `projects` literal widens `image` to `string | undefined`. I checked the data:
  all 4 non-video entries have an image and the only video entry takes the `<video>` branch,
  so it is safe TODAY — but the cast is a latent trap (`<img>` silently rendered nothing with
  an undefined src; `<Image>` throws). A typed `Project` union would be the real fix.

## AboutSection (homepage) — mobile-only refinements, desktop frozen
- CONSTRAINT: desktop must not change at all. Every edit is therefore a `max-md:` addition
  (mobile-only), with ONE exception: the h1's base `text-4xl` -> `text-3xl`, which is safe
  because `md:text-6xl lg:text-[3.5rem]` already override it at >=768px. Verified, not assumed.
- CHANGES (all in `src/components/home/AboutSection.tsx`, mobile only):
  * top margin: section `py-10` + `max-md:pt-4` (40px -> 16px)
  * x padding: `max-md:px-3` AND removed the inner card's `max-md:p-5` — together the
    effective inset goes 36px (16 section + 20 card) -> **12px, exactly matching the hero**
    (hero wrapper is `px-3 pt-3` in `src/app/home/page.tsx:149`). Measured both.
  * border: removed `max-md:border max-md:border-black/10`. Also removed the rest of the
    mobile card chrome — `max-md:rounded-2xl` and `max-md:shadow-sm` — because with the
    border and padding gone, a full-bleed rounded+shadowed block reads as a broken card.
    Kept `max-md:bg-white` (identical to the section bg, so visually inert). FLAGGED: this
    is slightly beyond the literal "remove the border" ask.
  * tag `max-md:text-xs` (14->12) + `max-md:mb-4`; title base `text-3xl` (36->30) +
    `max-md:gap-x-2.5`; description `max-md:text-base` (20->16) + `max-md:mt-6/space-y-4`
  * image column: `max-md:pt-0` (40->0) and grid `max-md:gap-8` (64->32) — the grid row-gap
    was the dominant contributor to the image's top offset on mobile, not the padding
  * CTA: `max-md:h-12` (64->48), `max-md:gap-3`, `max-md:pr-2`, label `max-md:text-base`
    (18->16), icon box `max-md:h-9 max-md:w-9 max-md:rounded-lg` (44->36)
- VERIFIED by computed-style diff against a BEFORE baseline captured at both widths:
  * DESKTOP (fresh load, 1280, `matchMedia('(min-width: 768px)')` true): **16/16 fields
    identical**, including section height 680px. Zero differences.
  * MOBILE (390): padTop 40->16, tag 14->12, h1 36->30, desc 20->16, border 1px->0,
    effective x-pad 36->12 (= hero's 12, asserted equal), grid gap 64->32, image padTop
    40->0, CTA 64->48 / text 18->16 / icon 44->36, section height 977->821.
- TWO PANE ARTIFACTS DIAGNOSED, NOT GUESSED (both initially looked like real bugs):
  1. The CTA's `max-md:` classes appeared not to apply at all. Cause: STALE dev CSS — the
     classes were in the DOM and the media query was active, but no rule existed. A
     cache-busted reload made all three apply (48px/12px/8px). Same HMR staleness pattern
     seen earlier this session.
  2. After resizing 390 -> 1280 the desktop CTA measured 48px/12px, i.e. mobile values
     apparently leaking to desktop. Cause: the CTA has `transition-all duration-300`, and
     CSS transitions never advance in this non-compositing pane, so the property stays
     FROZEN at its pre-resize value. Setting `transition: none` returned the true target,
     64px/20px. Confirmed independently by a fresh desktop-width load (16/16 identical).
     LESSON for future measuring here: never trust a computed value on a transitioned
     property after a viewport resize — disable the transition or load fresh at the width.
- `bunx tsc --noEmit` exit 0. Biome on the file: 1 error, `noArrayIndexKey` at the
  `.split(" ").map((word, index) => key={index})` block — PRE-EXISTING, byte-identical at
  `git show HEAD:` (line 137 there), untouched by this change.

## LogoLoop — the last remaining <img> converted (completes the next/image migration)
- CONTEXT: this task repeats an earlier one. Checked state first instead of redoing it:
  66 of 67 image elements were already converted; exactly ONE raw `<img>` remained —
  `src/components/ui/LogoLoop.tsx:385` — which I had deliberately skipped last time.
- WHY IT WAS SKIPPED, AND WHAT CHANGED: the earlier reasoning was (a) the component
  measures widths, (b) `width`/`height` were OPTIONAL so next/image would throw at runtime.
  Re-examined: (a) is a NON-issue — its image-load hook uses `querySelectorAll("img")`, and
  next/image renders a real `<img>`, so it still matches. (b) was the actual blocker, and is
  fixable by tightening the type rather than by avoiding the conversion.
- CHANGED: `<img>` -> `<Image>`; `width`/`height` made REQUIRED on the `src` variant of
  `LogoItem` (next/image needs intrinsic dimensions; `fill` is wrong here because the `<li>`
  is auto-width and unpositioned, which would collapse the logo and zero the measured
  sequence width); dropped `srcSet` from the type and the element since next/image generates
  its own srcset and does not accept the prop. `sizes`, `alt`, `title`, `loading`,
  `decoding`, `draggable` and the full `className` are unchanged.
- NO UI CHANGE IS POSSIBLE HERE, and this is measured rather than argued: the `src` branch is
  DEAD CODE. The only caller is `src/app/home/page.tsx:161` passing `node`-based items
  (react-icons). Runtime on /home: LogoLoop mounts, `--logoloop-logoHeight` 28px, sequence
  width 472px (non-zero, so measurement still works), 4 copies x 4 items, and **16 SVGs with
  0 `<img>` inside the loop** — the converted branch never renders.
- Making width/height required is a compile-time-enforced API tightening, not a silent
  break: no current caller uses the `src` variant, and `tsc` passes.
- VERIFIED: `bunx tsc --noEmit` exit 0; `bunx next build` exit 0; biome `noImgElement`
  warnings **1 -> 0**; biome errors **145, unchanged** from baseline; warnings 49 -> 47.
  `grep -rn "<img\|motion\.img" src` now returns **NOTHING** — zero raw img tags in the
  codebase. Homepage image count at desktop is 26, matching the pre-migration baseline.
- FALSE ALARM diagnosed: /home first showed 19 images instead of the 26 baseline. Cause —
  the pane was still at 390px from the previous task, and AboutSection conditionally renders
  desktop-only nodes behind an `isDesktop` check. At 1280 it is 26, exactly the baseline.
- CAVEAT for future use of this component (not a problem today): a `src`-variant logo on a
  host outside `next.config.ts` remotePatterns will now throw at runtime, where a raw
  `<img>` would simply have loaded. Add the host, or pass `unoptimized`, if that path is
  ever used.

## LogoLoop — remove the white edge fades on mobile only (homepage)
- REQUEST: homepage LogoLoop, mobile only — drop the white fade at the edges. Desktop frozen.
- The fade is two `aria-hidden` gradient overlays rendered when `fadeOut` is set. Homepage
  passes `fadeOut` + `fadeOutColor="#ffffff"` (`src/app/home/page.tsx:161`) and
  `direction="left"`, so it is the HORIZONTAL pair (left/right) that renders — the vertical
  pair is a dead branch here and was left untouched.
- CHANGE: added `"max-md:hidden"` to those two overlays in `src/components/ui/LogoLoop.tsx`.
  Two lines. No API change, no prop added.
- SCOPE NOTE: LogoLoop is a shared `ui/` primitive, but `src/app/home/page.tsx` is its ONLY
  consumer (verified by grep), so hiding the fades below `md` cannot affect any other page.
  Flagged because a future consumer would inherit this behaviour.
- VERIFIED at 390px (cache-busted load, since stale dev CSS has bitten this session):
  both overlays `display: none`, 0x0, `max-md:hidden` present on both.
- VERIFIED at 1280px (fresh load): both overlays still `display: block`, **87px wide**, white
  `linear-gradient(to right/left, rgb(255,255,255) 0%…)` — width, display and gradient all
  identical to the pre-change baseline.
- ONE APPARENT DESKTOP DELTA, PROVEN NOT MINE: fade height read 38 -> 37. The overlays are
  `absolute inset-y-0`, so their height is just the container's. Ran the decisive test —
  toggled the overlays' display off and back on at desktop: container height stayed
  **36.8px in all three states** (with / hidden / restored). Absolutely-positioned children
  are out of flow and cannot contribute to their container's height, so this change is
  provably not the cause; the container itself measured ~37.5 earlier and 36.8 now, i.e. a
  load-state/sub-pixel difference in the logo row, same artifact family logged earlier.
- Marquee intact: sequence width 472px, unchanged.
- `bunx tsc --noEmit` exit 0; `bunx next build` exit 0; biome on the file exit 0.

## 2026-07-31 — Hero canvas: draw at display size, not 1920x1080 (perf)
Task: the hero pill canvas was doing a full-resolution drawImage every frame. Confirmed at
`home/Herosection.tsx:32-37` — it set `canvas.width = video.videoWidth` (1920x1080) then
`drawImage(video,0,0,canvas.width,canvas.height)`, i.e. ~2.07M destination pixels/frame
scaled down to a <=220px pill.
FIX (1 file): added `sizeCanvas()` — backing store = 220 CSS px (the xl max) x DPR (capped 2),
height DERIVED from the video so the store keeps the video's aspect ratio. drawFrame now calls
it then draws at the small size.
TWO DELIBERATE DEVIATIONS from the request's literal numbers, both to satisfy its own
"same appearance" requirement:
 (a) height 124, not 118. The canvas element has FIVE different aspect ratios across
     breakpoints (80x48, 112x64, 150x80, 200x106, 220x118) and CSS `object-cover` does the
     cropping against a 16:9 backing store. Hard-coding 220x118 (1.864) would have STRETCHED
     the 16:9 frame ~5%. Deriving height (220/1.7778 = 124) keeps the intrinsic aspect, so
     object-cover crops exactly as before at EVERY breakpoint = provably no visual change.
 (b) x devicePixelRatio (capped 2). A flat 220px store on a retina screen would be upscaled
     and look soft — today's 1920 store was effectively supersampled. DPR keeps it crisp.
VERIFIED (numbers, not vibes) by running the exact formula against the live 1920x1080 video in
the browser: backing store 220x124, 27,280 px/frame vs 2,073,600 = **76x fewer**; backingAspect
1.7742 vs videoAspect 1.7778 -> aspectPreserved true; drewRealFrame true (luma range 0-255, so
it painted a real frame, not blank). tsc 0 ✓; biome format clean; `bun run build` ✓.
The 2 biome lint findings in this file (noExplicitAny / noEmptyPattern, line 12 `({}: any)`)
are PRE-EXISTING — confirmed byte-identical to `git show HEAD:` line 12; the map already lists
them under "Loose types".
ENV LIMIT hit: could not observe the live loop — rAF never fires in the Browser pane (video
reached paused:false + readyState:4 yet the backing store stayed at the 300x150 default across
a 1.5s poll), consistent with the frozen-renderer note in memory. So the draw loop's *execution*
is unverified in-browser; the formula, the aspect math and drawImage itself are verified.
Worth a real-browser glance at the hero pill. 1 file. Not committed.

## 2026-07-24 — Home hero: backdrop-blur over 4K video → filter-blur on the video layer
home/Herosection.tsx: the frosted hero backdrop was a full-viewport `backdrop-blur-xl` div
(absolute inset-0 z-10) over the autoplaying hero.mp4 — backdrop-filter re-captures + re-blurs
the whole viewport every frame over the moving video (the reported GPU cost). The overlay sat
over ONLY the video (nothing else between them), so blurring the video directly = same pixels.
FIX: removed the backdrop-blur overlay; put `blur-xl` (filter: blur(24px), same radius as
backdrop-blur-xl) + `scale-110` on the <video>. filter is a single-layer post-process on the
video's own compositor layer — no per-frame full-scene backdrop readback. scale-110 pushes the
~24px filter edge-bleed under the container's rounded overflow-hidden clip (else the fade-to-
transparent edges would show a dark vignette). Chose blurring the one video over a duplicated
2nd <video> to avoid a second decode; the canvas pill stays sharp because ctx.drawImage reads
raw decoded frames, which CSS filters never touch.
Verified live /home (computed styles): video filter=blur(24px), backdrop-filter=none,
scale=1.1; canvas filter=none (pill sharp); container overflow hidden / radius 20px; video
overhangs container 62px x / 35px y each side > 24px bleed = no vignette. Only remaining
backdrop-blur on the page = the small PortfolioSection tag <span> pills (blur 12px) — tiny
regions, not over moving video, explicitly in-scope-to-keep. tsc 0; biome 1 error/1 warning
both pre-existing on line 12 (({}: any)). Frosted appearance itself needs user's eyes (pane
screenshots time out on the video page). Not committed.

## PortfolioSection — black panel backgrounds on mobile (regression from my own img->Image migration)
- SYMPTOM (user screenshot, mobile): project panels render as flat black; the project image
  is missing. Desktop fine.
- ROOT CAUSE, and it was MINE: the img->next/image migration changed
  `<img className="h-full w-full object-cover">` (no `loading` attribute, i.e. EAGER) into
  `<Image fill sizes="100vw">`, and **next/image defaults to `loading="lazy"`**. The panel
  background is the panel's entire visual, so a deferred load renders a black box. Confirmed
  by diffing against HEAD: the loading attribute is the ONLY behavioural difference.
- RULED OUT, with evidence, before changing anything: the boxes are correct (holder and img
  both 390x591, position absolute, z-index -20 — layout is fine); the URLs are healthy —
  `/_next/image?...&w=640&q=75` returns **200 / ~25KB in 118-580ms** for all three sources;
  and inside the page a brand-new `new Image()` with the SAME url loaded fine (640x427),
  as did `fetch()` (200, 27235 bytes). So neither the optimizer, the allowlist, the `as
  string` cast, nor the layout was at fault — only the deferral.
- FIX: `loading="eager"` on that Image. One line + comment.
- HONEST SCOPE NOTE — this is NOT mobile-only, and it cannot be: `loading` is an HTML
  attribute, not a CSS breakpoint, so it has no `max-md:` form. The component's
  `useIsDesktop()` starts `false` and only flips in an effect, so `loading={isDesktop ?
  "lazy" : "eager"}` would still emit `eager` in the SSR HTML for desktop — buying nothing
  over the simple fix while adding a hook dependency. Crucially, eager is exactly what
  desktop had BEFORE my migration, so this restores desktop's original loading behaviour
  rather than changing it, and desktop RENDERING is verified untouched.
- VERIFIED, mobile 390px (cache-busted load, no forcing):
  BEFORE the fix 0/4 panel images loaded — and they stayed unloaded even after being forced
  to `eager` via JS for 12s. AFTER the fix **4/4 load unprompted**, natural sizes present
  (390x260 / 390x292), boxes 390x591. `loading` attribute now `eager` on all four.
- VERIFIED, desktop 1280px (fresh load): 5 panels at 1280x800, track `flex-direction: row`,
  `scrollWidth 6400` (= 5 x 1280, so the horizontal scroller geometry is intact), images
  4/4 loaded, img box 1280x800, `object-fit: cover`, `position: absolute`, holder
  `z-index: -20`. Identical to before.
- `bunx tsc --noEmit` exit 0; `bunx next build` exit 0. Biome on the file: 4 diagnostics
  (noUnusedVariables x2 at :91/:92 — `activeIndex` and `isDesktop` are both unused,
  pre-existing; noStaticElementInteractions :274; noArrayIndexKey :343). ALL pre-existing —
  my diff only touches the import line and the image block (`git diff` hunks: @@ +6, @@ +310).
- WATCH ITEM (not fixed, out of scope): `sizes="100vw"` is width-based, but these panels are
  tall (591px high at 390 wide) with `object-cover`, so the selected candidate is chosen from
  viewport WIDTH and can be upscaled vertically. On a DPR-3 phone it resolves to a ~1200px
  candidate, which is fine; worth revisiting if the backgrounds ever look soft.

## 2026-07-24 — Hero backdrop-blur task re-sent → confirmed already done (no change)
Same task text as the prior entry. Re-scanned: home/Herosection.tsx already carries the
option-1 fix (blur-xl scale-110 on the <video>, backdrop-blur-xl overlay removed); no other
full-viewport backdrop-blur-xl over moving 4K video exists. Remaining backdrop-blur are only
small backdrop-blur-md chip/tag pills (PortfolioSection index pill, work ProjectCard/ProjectHero
tags) — tiny regions the task explicitly treats as fine. Flagged the nuance that filter:blur on
a *playing* video is still per-frame (cheaper than backdrop-filter, not free) and offered to go
further (rgba tint / static-frame blur); user chose "Keep option 1 (done)". No edit made.

## CORRECTION to the previous entry — the black PortfolioSection panels were NOT my regression
- The user pushed back on my attribution. They were right; the previous entry's root-cause
  claim is WRONG and is corrected here.
- WHY MY EVIDENCE WAS BAD: I concluded "next/image defaults to lazy, HEAD's <img> was eager,
  therefore my conversion caused it" from an IN-PANE observation. But this pane never fires
  native lazy loading AT ALL (proven earlier this session with a control: zero IO callbacks,
  every `currentSrc` empty until forced). That is a SYSTEMATIC BIAS which makes ANY lazy
  image look broken here regardless of how it behaves in a real browser. I mistook a known
  pane artifact for a regression — the exact failure mode I had already logged twice.
- WHAT I ACTUALLY TESTED THIS TIME: checked out HEAD's original file and ran it. In-pane at
  390px it loads 4/4 with the FULL originals (natural 4284x2860 and 7952x5304). That only
  shows eager images load in this pane; it says nothing about a real device, so it does not
  support the regression claim either.
- THE LIKELY REAL, PRE-EXISTING CAUSE (mobile-only, matches the report exactly): at HEAD the
  four panel backgrounds were raw <img> loading the FULL-SIZE originals, all eager:
    zyro  1.38 MB  4284x2860  12.3 MP  ~49 MB decoded
    0d3a  0.10 MB  1504x1128   1.7 MP   ~7 MB decoded
    ux-store 4.21 MB 7952x5304 42.2 MP ~169 MB decoded   <-- 42 megapixels
    f1a3  0.11 MB  1504x1128   1.7 MP   ~7 MB decoded
    TOTAL 5.8 MB, 57.8 MP, **~231 MB of decoded bitmap RAM**
  Mobile browsers cap per-image megapixels and total decode memory; a 42.2 MP image is over
  common iOS/Android limits, and ~231 MB of bitmaps across four panels invites eviction.
  Failed/evicted decode renders as a BLACK panel — on mobile only, with desktop fine because
  it has the headroom. That is pre-existing and predates every change I made.
- SO THE CONVERSION HELPS, IT DID NOT HURT: with next/image the same four panels now decode
  **0.4 MP total** (measured: natural 390x260 / 390x292, all four served via `/_next/image`)
  versus 57.8 MP at HEAD — a ~145x reduction in decode memory, which removes the mobile
  decode-limit failure entirely.
- The `loading="eager"` line is KEPT, but its justification changes: not "undoing my
  regression" — rather, a full-bleed panel background should not be deferred, and it is now
  cheap (~25 KB per variant instead of a 4.21 MB original).
- STATE: HEAD checkout was temporary; working file restored from scratchpad and re-verified.
  `bunx tsc --noEmit` exit 0; `bunx next build` exit 0; `git diff --stat` shows the intended
  10 insertions / 2 deletions. Mobile re-checked after restore: 4/4 loaded via the optimizer.
- LESSON, worth remembering: in this pane, "image did not load" is NEVER by itself evidence
  of a code defect — check whether the element is lazy first.

## AboutSection title — tighter line spacing on mobile only
- MEASURED FIRST, because the obvious lever was the wrong one: the title is not a normal
  text block, it is a `flex flex-wrap items-baseline` container of per-word `<span>`s. So the
  visible gap between wrapped lines is **`gap-y` (row-gap)**, not `leading`. `leading-[0.9em]`
  only sets the line box inside each span, and it was already tight (27px box at 30px text).
  Mobile before: line boxes 27px, row-gap 8px, row-to-row 39/35px, h1 121px tall.
- CHANGE (one class, mobile only): added `max-md:gap-y-0.5` to the h1 in
  `src/components/home/AboutSection.tsx`. `gap-y-2` (8px) is retained for md+.
  Left `leading-[0.9em]` alone — tightening it further at 30px would start colliding
  descenders, and row-gap is what actually reads as the line spacing here.
- VERIFIED mobile 390px (cache-busted load): row-gap **8px -> 2px**, row-to-row deltas
  **39/35 -> 33/29**, h1 height **121 -> 109px**, while `font-size` (30px) and `line-height`
  (27px) are UNCHANGED — i.e. only the inter-line spacing moved, not the type size.
- VERIFIED desktop 1280px (fresh load): font-size 56px, line-height 50.4px, **row-gap 8px**,
  column-gap 16px, 5 visual rows, h1 height 249.6px — all identical to the pre-change
  baseline, and `matchMedia('(max-width: 767.98px)')` is false so the new class is inert.
  One integer row-delta read 63 -> 62; chased it fractionally: the deltas are 62.4/58.4/58.4
  and the height is 249.6 (baseline rounded to 250), so it is a rounding boundary landing
  differently at a different scroll offset, not a layout change. Row-gap being provably
  still 8px is the decisive check.
- `bunx tsc --noEmit` exit 0. Biome on the file: 1 error, `noArrayIndexKey` at :138 — the
  pre-existing `.split(" ").map((word, index) => key={index})` block, untouched.

## AboutSection title — reduce leading on mobile (round 2)
- First checked whether the previous round had actually reached the browser: it had
  (live rowGap was 2px), so this was a genuine "still too loose", not stale CSS.
- Previous round tightened `gap-y` only. This round tightens the ACTUAL leading:
  added `max-md:leading-[0.8em]` (base stays `leading-[0.9em]`) and took
  `max-md:gap-y-0.5` -> `max-md:gap-y-0` -> back to `max-md:gap-y-0.5` (see below).
- MOBILE RESULT (390px): line-height **27px -> 24px**, row gap 2px, line-to-line pitch
  **29 -> 26px**, title height **109 -> 100px**. Font size unchanged at 30px.
  Cumulative across both rounds: pitch 35 -> 26, title 121 -> 100px.
- OVERSHOT ONCE, AND CAUGHT IT BY MEASURING RATHER THAN EYEBALLING: `leading-[0.8em]` +
  `gap-y-0` gave pitch 24 against an ink height of 31px (canvas
  `actualBoundingBoxAscent 23` + `Descent 8`) = **7px of vertical overlap**. Then checked
  whether that band actually collides by intersecting the x-ranges of descender-bearing
  words with ascender-bearing words on the next row: "Building"(g) over "products"(d,t)
  overlapped by **105px** horizontally, and "digital"(g) over "next"(t) by 27px — i.e. a
  visible smash, not a theoretical one. Backed off to `gap-y-0.5`, landing at pitch 26 /
  5px overlap. NOTE some overlap is inherent to sub-1em leading: the original design at
  pitch 35 had none, and last round's pitch 29 already had 2px.
- DESKTOP VERIFIED UNCHANGED (fresh 1280px load): font-size 56px, line-height 50.4px,
  row-gap 8px, column-gap 16px, h1 height 249.6px — 5/5 identical to baseline, and
  `matchMedia('(max-width: 767.98px)')` false so both new classes are inert.
- DIALS, if the user wants to move it again: tighter -> `max-md:gap-y-0` (pitch 24, but
  that is the 105px collision above); looser -> `max-md:leading-[0.85em]` (pitch ~27.5)
  or drop the leading override to return to pitch 29.
- `bunx tsc --noEmit` exit 0. Biome: 1 error, pre-existing `noArrayIndexKey` at :138.

## LogoLoop — carousel flush to the left edge on mobile
- SYMPTOM: on mobile the marquee started ~24px in from the left, which read as a
  misalignment (more noticeable now that the white edge fades are hidden on mobile).
- CAUSE, measured not guessed: the inset is exactly the wrapping section's `px-6` (24px)
  in `src/app/home/page.tsx`. Right side was already flush because the wrapper is
  content-width (1888px) and the section's `overflow-hidden` clips it at the viewport —
  so only the left edge showed the padding.
- FIX: `max-sm:-ml-6` on the LogoLoop wrapper div — cancels the section's left padding
  in the stacked layout only. One class.
- IMPORTANT BREAKPOINT CHOICE, and why NOT `max-md:`: this section is
  `flex-col ... sm:flex-row`, i.e. it becomes a ROW at 640px with the "Trusted by" label
  beside the carousel. A `max-md:` negative margin would still be active across 640-767px
  and would drag the carousel back UNDER that label. Scoped to `max-sm` (< 640px), which
  is exactly the stacked layout.
- VERIFIED at three widths:
  * 390px (stacked): left inset **24px -> 0px**, flush left, reaches the right edge (390),
    margin-left -24px applied, and `document.scrollWidth - clientWidth = 0` so it
    introduces NO horizontal page scroll.
  * 700px (the sm row band — the case the breakpoint choice protects): margin-left `0px`,
    `max-sm` inactive, carousel still starts at x=126 which is after the label ending at
    x=94. Unchanged.
  * 1280px (desktop): margin-left `0px`, layout row, wrapper left 159 / width 1082,
    both edge fades still `display: block` at 87px, marquee sequence width 472. Unchanged.
- `bunx tsc --noEmit` exit 0; biome on `src/app/home/page.tsx`: clean, 0 diagnostics.

## Homepage navbar — mobile scroll jank
- SCOPE CHECK FIRST: `ui/resizable-navbar.tsx` is imported ONLY by `layout/Header.tsx`,
  which per CLAUDE.md serves `/home` only. So this file IS the homepage navbar and nothing
  else — matches the user's "in homepage". (`page/resizable-navbar.tsx` is the other pages'
  copy and was NOT touched.)
- CAUSE: the mobile bar (`MobileNavHeader`) is `fixed inset-x-0 top-0` and, once scrolled,
  got `bg-white/90 backdrop-blur-md`. A backdrop-filter on a FIXED element forces the
  browser to re-sample and re-blur whatever scrolls beneath it every frame. On /home what
  sits beneath is `home/Herosection.tsx:88` — a full-viewport `backdrop-blur-xl` over an
  autoplaying video — so the two backdrop filters NEST over moving content. `MobileNav`
  added a second `backdrop-blur-md` on top. Both also used `transition-all duration-300`,
  which transitions box-shadow and the filter itself.
- CHANGED (3 edits, all mobile-only by construction — both components are `lg:hidden`):
  * `MobileNav`: `bg-white/90 backdrop-blur-md` -> `bg-white`; `transition-all` ->
    `transition-colors`.
  * `MobileNavHeader`: same, plus an explanatory comment.
  * `layout/Header.tsx:155` — **the edit that made the others actually take effect**: the
    caller passes `className="px-8 py-8 transition-all duration-300"`, and since `cn()` is
    tailwind-merge, the CALLER's `transition-all` was overriding the component's
    `transition-colors`. Changed to `transition-colors duration-300`. Without this the fix
    would have been silently defeated — caught by reading the SSR HTML, not by assuming.
- VERIFIED:
  * SSR HTML now serves the merged class `... px-8 py-8 transition-colors duration-300`
    (was `transition-all`) — i.e. what the browser actually receives, immune to pane caching.
  * No `backdrop-blur` remains in either mobile component (source grep).
  * DESKTOP UNTOUCHED, structurally: at 1280 `MobileNav`'s parent computes
    `display: none`, so the edited components are not rendered on desktop at all. Desktop
    `NavBody` (`hidden lg:flex`) is unmodified and still carries `backdrop-blur-2xl` at
    :132; the 300vh x 300vw mega-menu blur overlay in `NavItems` is desktop-only and was
    deliberately left alone.
  * `bunx tsc --noEmit` exit 0; `bunx next build` exit 0; repo-wide biome **145 errors /
    47 warnings — identical to the session baseline**, so no new diagnostics (the 17 in
    these two files are pre-existing a11y/array-key rules on lines I never touched).
- NOT MEASURED, stated plainly: no FPS/profiling. This pane fires no scroll events, so the
  `visible` (scrolled) state cannot even be reached here, let alone benchmarked. The fix is
  structural — removing a per-frame backdrop re-sample on a fixed element — not benchmarked.
- VISUAL DELTAS ON MOBILE (small, worth knowing): the scrolled bar is now solid white
  instead of 90% white + blur, and its shadow appears immediately rather than fading in.
- BIGGEST REMAINING COST ON /home, deliberately out of scope because it would change
  desktop too: the hero's own full-screen `backdrop-blur-xl` over a playing video, plus the
  rAF canvas draw loop. Those were logged in the earlier perf audit.

## Homepage navbar — blue logo + black menu icon when the mobile bar turns white
- FOUND ALREADY-WRITTEN-BUT-DEAD CODE: `MobileNavToggle` already had
  `visible ? "text-black" : "text-white"`. It never fired because `MobileNavHeader`
  rendered `{children}` verbatim, unlike `MobileNav`/`NavBody` which clone children with
  `visible`. So the icon half was a plumbing bug, not a missing feature.
- CHANGED: (1) `MobileNavHeader` now clones children with `visible`, mirroring the existing
  pattern (guarding `typeof child.type === "string"` so DOM children don't get an unknown
  attribute). (2) `CustomLogo` takes `visible` + `swapOnScroll` and renders logoBlue.png
  only when both are set. (3) the mobile call site passes `swapOnScroll`.
- THE GATE IS THE WHOLE POINT — caught by inspecting the DESKTOP fiber, not by assuming:
  `NavBody` ALSO clones `visible` into its children, so keying the swap on `visible` alone
  would have swapped the DESKTOP logo too — and the desktop bar goes DARK on scroll
  (`bg-black/60`), where a blue wordmark would be wrong. `swapOnScroll` is opted into by the
  mobile call site only.
- VERIFIED via React fiber props at both widths:
  * 390px: CustomLogo `{visible, swapOnScroll: true}`, MobileNavToggle receives `visible`.
  * 1280px: CustomLogo `{visible}` with **swapOnScroll undefined**, src stays
    `/assets/logo.png` — desktop provably cannot swap.
  * Scrolled-state rendering proven piecewise (the `visible` state is unreachable in this
    pane — framer-motion's useScroll is rAF-based and frozen): logoBlue.png loads through
    the optimizer (256x99), and `text-black` computes to `rgb(0,0,0)` vs `text-white`
    `rgb(255,255,255)` — the latter only after disabling the transition, since transitions
    never advance here.
- NOTE: the two logos differ slightly in aspect (2.497 vs 2.578), so at the fixed 64px
  width the blue one renders ~0.8px shorter. Negligible in a centred bar.
- `bunx tsc --noEmit` exit 0.

## PortfolioSection — smaller text + AboutSection padding parity, mobile only
- PARITY TARGET MEASURED, not assumed: AboutSection's mobile inset is `max-md:px-3` = **12px**
  (its inner card padding was removed in an earlier task, so 12px is the true effective
  value). The portfolio panel was at `p-8` = 32px.
- CHANGED (3 classes, all `max-md:`, in `src/components/home/PortfolioSection.tsx`):
  * panel `max-md:px-3` — x-padding **32px -> 12px**, asserted equal to AboutSection's at
    runtime (`paddingMatchesAboutSection: true`). Vertical `p-8` (32px) intentionally kept:
    only the horizontal inset governs the left-edge alignment the request is about.
  * title `max-md:text-4xl` — **48px -> 36px**
  * category `max-md:text-xs` — **14px -> 12px**, asserted equal to AboutSection's tag
    (`categoryMatchesAboutTag: true`)
- LEFT ALONE DELIBERATELY, and flagged to the user: the description (14px) and the tech
  chips (10.4px) are ALREADY smaller than AboutSection's 16px body copy, so shrinking them
  further costs readability on a busy photographic background for no consistency gain.
- NOTE: the title renders ~2px left of the padding edge (titleLeftEdge 10 vs padding 12)
  because of the pre-existing `-ml-[0.05em]` optical kern on the h2. That is existing design
  intent and now scales smaller with the reduced font size.
- DESKTOP VERIFIED UNCHANGED (fresh 1280px load): padding 80/80/48, category 14px, title
  112px, desc 18px, chip 12px, panel 1280x800, track scrollWidth 6400 — **8/8 identical**
  to the baseline captured before editing, with `max-md` provably inactive.
- `bunx tsc --noEmit` exit 0; `bunx next build` exit 0; repo biome **145 errors / 47
  warnings — identical to baseline**, no new diagnostics.
