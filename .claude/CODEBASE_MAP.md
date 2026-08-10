# softexedge-may-2026 — Codebase Map
_Last updated: 2026-08-07_

> ⚠️ **Mobile is now its own architecture.** Everything below `md` on `/home`
> was rebuilt across 2026-08-06/07 for touch performance — native scroll-snap
> carousels, suppressed entrance animations, framer off the scroll path. See
> **"Mobile architecture"**, which supersedes the old "mobile is a plain
> vertical stack" assumption.

## Identity
Marketing/agency website for **SoftexEdge**. Frontend-only, animation-heavy
brochure site — **no backend, API, database, or auth**. All content is
hard-coded in `src/data/`. Focus is visual polish: scroll-driven GSAP
animations, framer-motion, smooth scrolling, WebGL effects.

- **Framework:** Next.js 16.2.5 (App Router) + React 19.2.4, React Compiler enabled (`next.config.ts` `reactCompiler: true`)
- **Language:** TypeScript 5, `strict: true`, alias `@/*` → `./src/*`
- **Runtime:** modern Node; project uses Bun

## Stack & build
- **Package manager:** Bun (`bun.lock` is the only lockfile). npm works; `.claude/launch.json` uses `npm run dev`.
- **Styling:** Tailwind CSS v4 — **no `tailwind.config.*`**, configured in CSS via `@theme` in `src/app/globals.css`
- **Lint/format:** Biome 2.2.0 (`biome.json`). Prettier + prettier-plugin-tailwindcss are installed but have no config — **dead deps**, don't use them.
- **Animation:** framer-motion (111 files), GSAP + ScrollTrigger (11 files), Lenis
- **WebGL:** three + @react-three/fiber + drei + postprocessing, and ogl — two stacks, both barely used
- **Font:** Satoshi Variable, self-hosted `@font-face` in `globals.css` → `--font-sans`. **`next/font` is not used.**

## Commands
| Action | Command |
|---|---|
| Run dev | `bun run dev` (→ `next dev`), http://localhost:3000 |
| Run all tests | _none — no test runner, no test files_ |
| Run one test | _n/a_ |
| Lint | `bun run lint` (→ `biome check`) — **currently exits 1**; the repo has pre-existing violations (see below). Lint a single file to judge your own change. |
| Lint + autofix | _no script_ — `bunx @biomejs/biome check --write .` |
| Format | `bun run format` (→ `biome format --write`) |
| Typecheck | _no script_ — `bunx tsc --noEmit` |
| Build | `bun run build` (→ `next build`) |
| Start (prod) | `bun run start` |

## Bootstrap flow
`src/app/layout.tsx` imports `globals.css`, sets `metadata` (metadataBase +
title template + description, from `src/lib/site.ts` `SITE_URL`), applies
`font-sans` to `<html>`, and mounts **one global component: `VideoViewportPause`**
(`:26`). **No providers, no header, no footer, no fonts, no analytics.**

Each route `page.tsx` composes section components and renders its own
`<Footer>`. The site header is rendered *inside each page's hero component*
(see Gotchas). GSAP plugins are registered per-file behind
`typeof window !== "undefined"`.

## Directory layout
- `src/app/` — App Router routes, `layout.tsx`, `globals.css`
- `src/components/<page>/` — page-specific sections (`home`, `about`, `blog`, `career`, `contact`, `work`)
- `src/components/<service>/` — **8 near-identical service-page component sets** (see Duplication)
- `src/components/ui/` — shared primitives + effects (15 files, all referenced; incl. `SpecularBorder` WebGL rim shader — 3 consumers — and `VideoViewportPause`)
- `src/components/layout/` — Header, Footer, SmoothScroll
- `src/components/page/` — **second** Header + its own resizable-navbar copy
- `src/data/` — `blog.ts`, `projects.ts` (all site content)
- `src/lib/` — `utils.ts` (`cn()`), `site.ts` (`SITE_URL = "https://softexedge.com"`, used by layout metadata + sitemap/robots), plus three mobile-motion modules added 2026-08:
  - `useIsDesktop.ts` — exports **three** things now: `useIsDesktop()` (false on first render), `useIsMobile()` (correct on the FIRST CLIENT render — safe only for props that emit no markup, i.e. `transition`), and `NO_ENTRY = {duration:0}`
  - `tweenScrollLeft.ts` — snap-safe rAF scroll tween (disables `scroll-snap-type` for the duration, restores to land)
  - `useInfiniteCarousel.ts` — endless native snap carousel; also exports `slideStride()`
- `public/assets/` (~75 files incl. 5 `.mp4`), `public/fonts/`

### Component extraction (2026-07-24, committed)
Nine long section files had their in-file subcomponents moved to sibling files
(same folder), imported back. So a card/helper now lives in its own file — grep
the folder, don't assume it's inline in the parent. Each parent now defines
exactly one component. Byte-identical moves (zero UI change). New files:
- `home/RotatingWord.tsx` (from AboutSection) · `home/ChannelCard.tsx` (from ContactSection; explicit `Channel` prop type, `Icon: LucideIcon`)
- `blog/BlogCard.tsx` (from BlogListSection) · `blog/{ArticleBlock,ShareRail,TableOfContents,RelatedArticles}.tsx` (from the 707-line BlogArticle; `ArticleBlock` exports `slugify`, component still named `Block`)
- `work/ProjectCard.tsx` (from WorkProjectShowcase; formerly a `TracingBorder` call site, now uses `SpecularBorder`) · `work/ProjectSection.tsx` (from ProjectDetailsContent; component still named `Section`, exports `premiumEase`) · `work/ProjectOutcomes.tsx` (NEW 2026-07-23 — post-gallery testimonial + engagement timeline; rendered between the two `<ProjectGallery>` instances on `/work/[slug]`)
- `about/{Counter,EdgeToEdgeCarousel}.tsx` (from AboutHeroSection)
- `brand-strategy/SubServiceCard.tsx` (from SubServices; **owns & exports `STEP=190`** — parent imports it for the pinTop math + reserve height; component still named `Card`)
- `career/{QuoteCard,CarouselCard,InfiniteRow}.tsx` (from CareerHeroSection; `CarouselCard` owns & exports `type CarouselItem`; import chain parent→InfiniteRow→CarouselCard→QuoteCard)
The 7 duplicated service folders were deliberately NOT extracted (would double the duplication; see open question 1).

## Surfaces
**All 17 routes are public and static. There is no auth anywhere** — no auth
library, no middleware, no session/cookie/token handling, no access control.

| Name | Type | File:Line | Auth | Purpose |
|---|---|---|---|---|
| Root redirect | Route | `src/app/page.tsx:3` | public | `redirect("/home")` |
| HomePage | Route | `src/app/home/page.tsx:32` | public | Hero, LogoLoop, About, Portfolio, Stats, Services, Testimonials, Contact, Blog. **Only route using `SmoothScroll`.** |
| AboutPage | Route | `src/app/about/page.tsx:14` | public | Hero, Traditional, OurValues, OurTeam, Testimonials, CTA, FAQ, Blog |
| ContactPage | Route | `src/app/contact/page.tsx:12` | public | Hero (bg video), ContactSection form, Testimonials, FAQ, CTA |
| CareerPage | Route | `src/app/career/page.tsx:11` | public | CareerHero, WhyJoinUs, OpenPositions, OurValues, Perks, OurTeam, ApplicationJourney |
| WorkPage | Route | `src/app/work/page.tsx:10` | public | WorkHero (DomeGallery), WorkProjectShowcase, Testimonials, CTA, FAQ, Blog |
| WorkProjectPage | Route | `src/app/work/[slug]/page.tsx:38` | public | SSG via `generateStaticParams:14`. Has `generateMetadata:23` (title/description from project). Renders `<Header onDark/>` directly. **Render order:** Hero → DetailsContent → **ProjectGallery (`galleryA`)** → **ProjectOutcomes** → **ProjectGallery (`galleryB`)** → NextProject → CTA → Footer. The page splits `project.gallery` in half (`:51-54`) into `galleryA`/`galleryB` and renders `<ProjectGallery>` **twice** (now takes an `images` prop, not `project`), with `ProjectOutcomes` between them. Unknown slug → `notFound():45` |
| BlogPage | Route | `src/app/blog/page.tsx:7` | public | BlogHero (filter emitter), Featured, List, CTA |
| BlogArticlePage | Route | `src/app/blog/[slug]/page.tsx:36` | public | SSG `generateStaticParams:11`, `dynamicParams=false:9`, `generateMetadata:15` |
| BrandStrategyPage | Route | `src/app/brand-strategy/page.tsx:16` | public | **The divergent original** service page |
| AiMarketingAutomationPage | Route | `src/app/ai-marketing-automation/page.tsx:15` | public | Service page (copy) |
| AppDevelopmentPage | Route | `src/app/app-development/page.tsx:15` | public | Service page (copy) |
| CustomSoftwarePage | Route | `src/app/custom-software/page.tsx:15` | public | Service page (copy) |
| DigitalMarketingPage | Route | `src/app/digital-marketing/page.tsx:15` | public | Service page (copy) |
| UiUxDesignPage | Route | `src/app/ui-ux-design/page.tsx:15` | public | Service page (copy) |
| VideoProductionPage | Route | `src/app/video-production/page.tsx:15` | public | Service page (copy) |
| WebDevelopmentPage | Route | `src/app/web-development/page.tsx:15` | public | Service page (copy) |

**No route handlers, no API routes, no server actions (`"use server"` appears
nowhere), no `middleware.ts`, no `not-found.tsx`/`error.tsx`/`loading.tsx`, no
`opengraph-image`.** Both dynamic routes call `notFound()` but fall through to
Next's default 404 page.

**SEO files DO exist** (added since the 07-24 map): `src/app/sitemap.ts` and
`src/app/robots.ts`. Sitemap emits the 14 static routes + dynamic `blogPosts`
slugs + `projects[].href` — but **omits `/`** (which redirects to `/home`) and
sets no `lastModified`/`priority`. **17 route files now carry `metadata` or
`generateMetadata`**, not just the two dynamic ones — but they are title +
description only: **there are still no OG/twitter tags anywhere.**

### Forms & external input
| Surface | File:Line | Wired? |
|---|---|---|
| Contact form (name/email/phone/company/service/message) | `src/components/home/ContactSection.tsx:129` | **DEAD** — no `onSubmit`, no `action`, no state. Appears on `/home` and `/contact`. |
| Newsletter subscribe | `src/components/layout/Footer.tsx` (in the newsletter column) | **DEAD** — no handler. Appears on **all 17 routes**. |
| Blog category/author filter | `src/components/blog/BlogListSection.tsx:118` | Works — client-side `useState`, via window event (below) |
| `mailto:hello@softexedge.com`, `tel:` | `src/components/home/ContactSection.tsx:20-21,28` | Real |
| `mailto:careers@softexedge.com` | `src/components/career/OpenPositions.tsx:312` | Real — the only working apply path |

**The site has zero working lead capture.** Both real forms are decorative.

## Data
No storage/API. Two static modules in `src/data/`:
- **`blog.ts`** — `blogPosts` (6 posts), `categories`, types `BlogPost`/`ContentBlock` (discriminated union on `type`: heading/paragraph/quote/list/callout/image), `Author`; helpers `getPostBySlug:570`, `getRelatedPosts:575`. Consumed by `/blog/[slug]`, `BlogHeroSection`, `BlogFeaturedSection`, `BlogListSection`, `BlogArticle`.
- **`projects.ts`** — `projects` (**9**), `Project`, `getProjectBySlug`. Consumed by `/work/[slug]`, `WorkProjectShowcase`. Slugs: aura-skincare, finova-dashboard, orbit-crm, lumina-festival, nova-workspace, zephyr-mobility, cake-commerce, apex-analytics, brand-elevate.

**No env vars anywhere** (`process.env` is read nowhere in `src/` or config).
**No `fetch`/`axios`/XHR anywhere.**

## Assets
- `public/assets/` — **54 files, ~80 MB**. Videos are `video1,2,3,5,6,7,8,9.mp4` — **there is no `hero.mp4` and no `video4.mp4`** (the old map was wrong here).
- **Two videos were re-encoded 2026-08-07 for mobile** (same duration/framerate, audio dropped — every consumer is `muted`):
  - `video7.mp4` (homepage hero) 3840x2160 HEVC 20 MB → **1280x720 H.264, 1.32 MB**. The 4K HEVC source forced *software* decode on phones with no HEVC hardware path; it was the single biggest cause of the "phone gets hot" report.
  - `video3.mp4` (portfolio panel) 1920x1080 → **1280x720, 0.93 MB**
- ⚠️ **`video7.mp4.orig` (19.96 MB) and `video3.mp4.orig` (1.9 MB) are COMMITTED.** They are my pre-encode backups, kept for sign-off and never removed — `video7.mp4.orig` is now the largest file in the repo. **Safe to delete once the re-encodes are approved.**
- Next largest: `video1.mp4` 9.8 MB (About page), `video2.mp4` 4.4 MB, `video5.mp4` 3.6 MB, and two images over 2.6 MB (`project-dashboard-…jpg`, `d3.png`).
- Imagery is **remote-heavy**: ~60 files reference `images.unsplash.com`.
- **`next/image` migration is COMPLETE (uncommitted, 2026-07-31): `grep "<img" src/` returns 0.** Every raw `<img>` became `next/image` with `fill`+`sizes` (container already `relative`) or explicit `width`/`height`. This is the bulk of the current 73-file diff and was applied uniformly across all 8 service folders. `ProjectShowcase` files now use `const MotionImage = motion.create(Image)` in place of `motion.img`.
- `next.config.ts` `remotePatterns`: `images.unsplash.com` (**listed twice**, :11 and :22), `plus.unsplash.com`, `randomuser.me`, and **`i.pravatar.cc`** (added for the 8 CtaSection avatar strips). Any other remote host will throw at runtime.
- Font: `public/fonts/Satoshi-Variable.woff2` via `@font-face` in `globals.css:6-13`.

## External services
**None wired.** No SDK keys, no analytics/GTM/pixel, no `<iframe>`, no
`next/script`, no form backend, no CMS.

## Conventions
- Most sections are `"use client"` (animation-heavy).
- Tailwind v4 utilities; merge with `cn()` from `@/lib/utils`.
- `@/` alias for `src/`; each route page assembles sections + its own `Footer`.
- GSAP registered behind `typeof window !== "undefined"`; animations via `useGSAP`.
- **Responsive idiom:** mobile fixes are *additive* — smaller base/`sm:` values with the desktop value re-asserted at `md:`/`lg:` so desktop stays pixel-identical. `max-md:*` is the idiom for mobile-only overrides.
- **`bun run lint` fails on a clean checkout.** Pre-existing violations exist across the repo (e.g. `home/PortfolioSection.tsx` alone has `noImgElement`, two `noUnusedVariables`, `noArrayIndexKey`, `noStaticElementInteractions`). So a non-zero exit does **not** mean you broke something — diff your file's issues against `git show HEAD:<path>` to see whether any are yours. Also note the working tree is **CRLF**, so `biome format --write` will rewrite whole files; avoid it on files you didn't author.
- **Biome rules that bite:** `noArrayIndexKey` (pre-key lists, see `Footer` brandLetters), `noUnusedImports`/`noUnusedVariables` (removing JSX must remove its state/imports), `a11y/useMediaCaption` (7 components use `<video>` — needs a `biome-ignore`), `useExhaustiveDependencies`.

## Where to add a thing
- **New page:** `src/app/<route>/page.tsx` + a folder under `src/components/`
- **New service page:** copy an existing service folder — that is the established (if unfortunate) pattern
- **New section:** `src/components/<pageName>/`, import into the route page
- **Reusable effect/UI:** `src/components/ui/`
- **Nav/footer change:** read the Header gotcha below first

## Risks & gotchas

### Duplication — the dominant structural fact
**8 service folders × 8 components = 64 files, ~8 real implementations.**
Verified byte-identical by md5 across the 7 copies (ai-marketing-automation,
app-development, custom-software, digital-marketing, ui-ux-design,
video-production, web-development):

| Component | Identical across | Diverges |
|---|---|---|
| `AgencyStats`, `StrategyHeroSection` | all **8** incl. brand-strategy | — |
| `SubServices`, `ProcessSection`, `OurTechStack`, `ProjectShowcase`, `FaqSection`, `CtaSection` | the **7** copies | `brand-strategy/*` |

Editing one service page's section changes **only** that page. A site-wide
change to these means editing 8 files.

Page composition also differs in one real way:
- `brand-strategy/page.tsx:21-22` — `<SubServices />` then `<ProcessSection />` as **siblings** (no overlap)
- the other 7 — `<SubServices><ProcessSection /></SubServices>` **nested** (ProcessSection scrolls over the pinned last card)

### Two Header components — edit the right one
| File | Navbar dep | Used by |
|---|---|---|
| `layout/Header.tsx` | `ui/resizable-navbar` | **`/home` only**, via `home/Herosection.tsx:4` |
| `page/Header.tsx` | `page/resizable-navbar` | **everything else** — 15 hero components + `work/[slug]/page.tsx:3` directly |

`page/resizable-navbar.tsx` and `ui/resizable-navbar.tsx` are a near-duplicate
pair — **so any navbar fix must be applied twice.** (The 2026-08-07 scroll-path
rewrite had to land in both; the `page/` copy still had an *unguarded*
`setIsHidden` firing every frame, so fixing only the homepage would have left
15 routes slow.) `ui/resizable-navbar` additionally carries an opt-in
`dropdown` mode used ONLY by `layout/Header`: below `lg` the bar shrinks to a
floating pill and the menu opens as an inline dropdown inside that same surface.
`page/Header` never opts in and keeps the original full-screen overlay. `page/Header.tsx` takes `onDark` for light links over dark heroes.
**There is no header in `layout.tsx`** — the site nav is nested inside hero
components, so a nav change means editing both Headers.

### Two conflicting Lenis integrations
- `layout/SmoothScroll.tsx:21-49` — `new Lenis()` wired into ScrollTrigger + GSAP ticker. Used by `/home` only.
- `<ReactLenis root>` inside **all 8 `*/SubServices.tsx`** — a *section component* seizing global scroll, on pages with no SmoothScroll wrapper and no ScrollTrigger sync.

### Scroll-fragile code (touch with care)
1. `app/home/page.tsx:71-142` + `home/PortfolioSection.tsx:143` — a hand-tuned chain of `pinSpacing:false` pins joined by `endTrigger`, plus a magic `md:-mt-[100vh]` documented at `app/home/page.tsx:92-95`. Any height change in About/Portfolio/Stats/Service breaks the overlap. All inside `matchMedia("(min-width: 768px)")` — mobile takes a different path.
2. `*/SubServices.tsx` — sticky card stack driven by `useScroll` + `useMotionValueEvent`. Cards share one sticky line (`top: 5vh`) and get their staircase from `translateY(i * STEP)`, so `top + height` is equal for all and they release together. **A transform reserves no layout space** — hence the explicit reserve div after the stack. The tracker's `useScroll` offset must stay unsaturated while cards are still pinning (`["start start","end start"]`, not `"end end"`). **`STEP=190` is shared by the parent (pinTop math + reserve height) and the card** — in brand-strategy it lives in `SubServiceCard.tsx` (extracted, exported; parent imports it); the 7 service copies still inline both. Change `STEP` in one place only.
3. `home/PortfolioSection.tsx` also carries **snap-to-panel** and **auto-advance** on the same pinned trigger. Both deliberately stop at `st.start + totalWidth` (the end of the horizontal phase) and never enter the trailing hold, which belongs to the Stats overlap. Auto-advance moves the **page scroll** via `st.scroll()`, not the track — animating the track would desync the scrub, the snap and the panel reveals. Any wheel/touch/pointer/key input cancels it.
4. `home/ServiceSection.tsx:111` / `home/PortfolioSection.tsx:119` — cursor followers on pinned sections; `mouseleave` never fires during scroll, so hiding is manual (ticker-polled).
5. `blog/BlogArticle.tsx:40` — document-level `useScroll` progress bar, ignores Lenis.

### Cross-component couplings
- **`blog:filter` window event** — dispatched `blog/BlogHeroSection.tsx:80`, listened `blog/BlogListSection.tsx:34`. Untyped, stringly-keyed, no shared constant, no props relationship.
- **`createPortal`** — `home/ServiceSection.tsx:263` mounts the cursor pill outside the pinned subtree to escape the GSAP transform.
- **`TracingBorder` `gradientId`** — a *global SVG id namespace* shared by 7 call sites (the 7 service `ProjectShowcase` copies; blog/work/brand-strategy migrated to `SpecularBorder`); collisions silently break the gradient.
- **`SpotlightGrid`** (`ui/SpotlightGrid.tsx`) — 9 consumers. Props: `speed`, `glowColor`, `glowVia`, `maskRadius`, `travel`, and **sweep mode**: `sweep`, `sweepColStart/ColEnd/RowStart/RowEnd` (inclusive cell rectangle), plus three sweep-only modifiers added 2026-07-22 — `scatter` (visit region cells in a seeded-shuffle order instead of row-major, so the glow reads as random not a line; still a bijection = every cell lights once per cycle), `sweepTrail` (how many cells stay lit behind the head = density; default `SWEEP_TRAIL`=4), and `plus` (light each cell as a plus — centre at full strength, its 4 orthogonal neighbours at `PLUS_ARM`=0.35). In `sweep` mode the reveal mask is dropped and the glow steps one box at a time; `maskRadius`/`travel` are ignored. **Grid shape is now props** (added 2026-08-07): `columns` (default 10), `rows` (default 8) and `cellClassName` (default `"rounded-2xl"`) — defaults reproduce the old fixed 10×8 exactly, so every pre-existing call site is byte-identical. `sweepColEnd`/`sweepRowEnd` became optional and resolve internally (a destructuring default cannot reference a later parameter). **`sweepCol*`/`sweepRow*` are CELL COORDINATES — rescale them if you change `columns`/`rows`,** or the sweep plays in the wrong region. `home/PortfolioSection` uses `columns={5} rows={8}`, everyone else the default. `brand-strategy/CtaSection` and `blog/BlogHeroSection` BOTH use `sweep scatter plus sweepTrail={6} speed={0.15}` (differing only in `sweepColStart` — 2 vs 1, a per-scrim region choice); the other 7 CtaSections use the mask. rAF-driven — motion is not observable in the frozen preview pane (verify sweep/scatter/plus logic by simulating it in node, as the 07-22 log entries did). **PERF (2026-07-24):** the sweep branch quantises its React state update — `setSweepHead` only fires when the head crosses into a new cell (~1×/sec), not every frame; a CSS `transition` sized to one cell-step (`1000/(speed*SWEEP_CELLS_PER_SEC)`) on the glow `opacity` + inner-cell `background-color` bridges the gap. Do NOT restore a per-frame `setSweepHead` — that re-rendered all 80 cells 60×/sec (~400 `centreAt` calls in plus mode) and was the "laggy" complaint. The `intensity>0 ? transparent` tile switch was also removed (any lit cell lost its tile → holes); tile is now always `#121212`.

### Global side-effects & shared contracts (added 2026-07-31)
- **`ui/VideoViewportPause` is mounted in `layout.tsx` and affects EVERY `<video>` on every route.** One `IntersectionObserver` (`rootMargin: "200px"`) + a `MutationObserver` on `document.body` (so it catches later-mounted / `AnimatePresence` videos). It pauses offscreen videos and resumes **only the ones it paused** (WeakSet guard). Consequence: **any code assuming an `autoPlay` video keeps running offscreen is now wrong.** `home/Herosection.tsx` was patched for exactly this — `"play"` now fires on every resume, so its canvas `startLoop` must `cancelAnimationFrame` first or RAF loops accumulate. Any future canvas-from-video code must do the same.
- **`ui/LogoLoop` `LogoItem.width`/`height` are now REQUIRED** (`srcSet` removed). Every call site must pass intrinsic dimensions; `fill` is unusable there because the marquee measures the sequence width.
- **`career/CarouselCard` `CarouselItem` gained optional `still`** — a `type:"video"` item without a `still` silently regresses to 6 concurrent decoders (only the first marquee copy renders a real `<video>`).
- **`ui/SpecularBorder`** — OGL/WebGL rounded-rect specular rim, pointer-driven, honors `prefers-reduced-motion`; absolutely-positioned `aria-hidden` overlay at `z-30`. 3 consumers: `blog/BlogCard`, `brand-strategy/ProjectShowcase`, `work/ProjectCard`.

### Content / correctness defects
- ~~`layout.tsx` description "Generated by create next app"~~ — **FIXED**: real title template + description + `metadataBase`. Remaining SEO gap is OG/twitter tags and the sitemap's missing `/`.
- **Placeholder email `hello@youragency.com` — 16 occurrences across all 8 `*/CtaSection.tsx`.** Reachable on every service page plus `/about`, `/blog`, `/blog/[slug]`, `/contact`, `/work`, `/work/[slug]`. The real address is `hello@softexedge.com`.
- **SEO, current state:** 17 route files carry metadata, sitemap + robots exist. Still missing: **OG/twitter tags anywhere**, `/` in the sitemap, `lastModified`/`priority`.
- `projects.ts` has **no `slug` field**; `getProjectBySlug:218` matches via `p.href.endsWith("/" + slug)` — fragile.
- `WorkProjectShowcase.tsx:23` keeps its own project list alongside `data/projects.ts` — two sources for the same 8 projects.
- Loose types: `type Props = {}`, `ContactPage({}: any)`.

### Dead weight
- **Dead source files removed 2026-07-24** (47 files: `garbage/` ×25, `shared/ConnectButton*` ×3, 15 unused `ui/` effects, `3d-globe-demo`, `about/AboutOverview`, `career/CareerValues`, `work/WorkHeader`). Verified by import-reachability BFS from all `src/app` entries + before/after HTML snapshots of all 29 routes (identical visible markup). `src` is now ~156 tracked files, all reachable.
- **Unused deps still installed** (not removed — lockfile change needs sign-off): `prettier` + `prettier-plugin-tailwindcss` (no config), legacy `@studio-freight/lenis` (live code uses `lenis`), and — after the dead-file removal — the entire `three` stack (`three`, `@react-three/fiber`, `@react-three/drei`, `postprocessing`, `@types/three`): **zero imports in live src** (verified 2026-07-24). `ogl` IS still used, by **`ui/Particles.tsx` and `ui/SpecularBorder.tsx`** (two consumers, not one).

## Mobile architecture (rebuilt 2026-08-06/07) — read before touching `/home`

Mobile is no longer "desktop minus animation". It has its own implementations,
and the two breakpoints are kept apart deliberately: **every change below was
verified to leave desktop byte-identical.**

### Carousels: native scroll, never JS drag
`/home` has four carousels. Three are **native scroll-snap** containers
(`overflow-x-auto` + `snap-x snap-mandatory` + `overscroll-x-contain` +
`.no-scrollbar`): PortfolioSection, ExperimentalTestimonials, BlogSection.
**This is the rule the mobile work converged on** — JS `pointermove` dragging
pays main-thread latency by construction; native scrolling runs on the
compositor and cannot be blocked by script. Testimonials and Blog were
originally JS-dragged via `useMarqueeHalf` and were the standing "laggy drag"
complaint until they were converted.

- `useMarqueeHalf` (`ui/LogoCarousel.tsx`) now has **exactly one consumer**:
  `LogoCarousel` itself (the LogoLoop marquee). Its `step()`/`autoplay` params
  survive but are unused. Do not reintroduce it for a draggable carousel.
- **Infinite loop** = `lib/useInfiniteCarousel.ts`: the track renders 3 runs of
  the list, scrolling starts in run 2, and when the position comes within one
  slide of either true end `scrollLeft` jumps exactly one run. Runs are
  pixel-identical so the jump is invisible. **It wraps at the EXTREMES, never
  mid-track** — assigning `scrollLeft` during an iOS momentum fling kills the
  fling. Slides need `data-slide` (that is what `slideStride()` measures).
- **Desktop still needs exactly 2 runs** for its framer marquee wrap; mobile
  needs 3. Extra runs are therefore CSS-hidden per breakpoint
  (`max-md:hidden` / `md:hidden`), never conditionally rendered — SSR markup
  stays identical at both widths.
- **Pagination is `ui/CarouselDots.tsx`**, not arrows (arrows were removed
  2026-08-07). Pass `loop` when the track repeats, or the dots sweep several
  times per lap.
- **PortfolioSection autoplay** advances by transitioning a `transform` on an
  inner wrapper (`md:contents`, so desktop is unaffected) and *then* commits the
  distance to `scrollLeft` in the same style flush — a compositor slide, not
  per-frame `scrollLeft` writes. Timing: **slide 0 holds 10s, all others 5s**
  (`MOBILE_FIRST_SLIDE_MS` / `MOBILE_AUTOPLAY_MS`), index read from `scrollLeft`
  at tick time.
- Panel 0 is a **text-only "Our Projects" title slide** (`projects` has 9
  entries but the track has 10 panels on desktop). Anything counting panels must
  use `querySelectorAll(".project-panel")`, not `projects.length`.

### Entrance animations are OFF below md — and it is done in CSS
`globals.css` carries `@media not (min-width: 48rem) { [data-no-mobile-entry] {
opacity:1 !important; transform:none !important; translate:none !important;
filter:none !important } }`, and 23 framer elements across Herosection,
ServiceSection, ExperimentalTestimonials, ContactSection, BlogSection and Footer
carry `data-no-mobile-entry`.

**Why CSS and not a JS gate:** gating `initial` on a viewport hook desyncs SSR
from the first client render (the server cannot know the viewport). The CSS rule
also applies *before hydration*, so content is visible in the first paint rather
than sitting at `opacity:0` until React boots. framer writes `initial` as an
INLINE style, hence `!important`. The inline `opacity:0` is deliberately left in
place and simply overridden. **A `transition`-only gate is NOT enough** — that
makes the animation instant but the element still starts hidden and pops in on
scroll.

### Recurring failure mode: async flags latch
Three separate mobile features died in this codebase because a flag set by an
async callback (IntersectionObserver, `transitionend`, a "one pending rAF"
guard) never arrived and latched shut. **The house pattern is a synchronous
check at tick time** — `getBoundingClientRect()` inside the interval that
already runs (`AboutImageStack`, PortfolioSection autoplay, the SpotlightGrid
in-view gate), or cancel-and-rearm rather than a pending-flag
(`CarouselDots`, `useInfiniteCarousel`). Timers, never `transitionend`.

### Compositor hygiene (each of these was a measured regression)
- **`will-change` must be breakpoint-scoped.** `md:will-change-transform` on the
  two GSAP wrappers in `app/home/page.tsx` and on `.stat-inner`: those elements
  are only ever transformed by ScrollTrigger inside `min-width:768px`, so on a
  phone they were holding ~1.06M CSS px of GPU texture for nothing. Promoted
  layer area went 1,526,970 → 469,004 px (−69%).
- **A PAUSED WAAPI animation drops off the compositor.** When the marquees were
  paused for arrow-only control, their ~2600px tracks had no layer at rest and
  every touch re-rasterised them under the finger. `useMarqueeHalf` now holds
  `will-change: transform` for the hook's lifetime on draggable tracks.
- **`backdrop-filter` over a playing video re-blurs on every video frame**, not
  just when the blurred element moves. The mobile navbar is `backdrop-blur-md`
  (12px), not `2xl` (40px), for exactly this reason — and `PortfolioSection`'s
  tech-tag chips drop `backdrop-blur` entirely below md (19 of them sat inside a
  horizontal scroller).
- **framer is off the navbar scroll path** (both copies, 2026-08-07): a passive
  listener + a direct `el.style.translate` write + a CSS transition replaced
  `useScroll`/`useMotionValueEvent` and a spring. The old `setIsHidden` state
  re-rendered Navbar on every scroll *direction change*, and each render re-runs
  its `cloneElement` pass over the whole ~50-element nav subtree. Cost per scroll
  step: `/home` 2.03 → 0.58 ms, `/about` 1.29 → 0.40 ms.
- `BlogSection`'s desktop marquee driver lives in a `DesktopAutoScroll` child
  that only mounts on desktop — `useAnimationFrame` cannot be called
  conditionally, and unconditionally it kept framer's frame loop alive on mobile
  for a callback that early-returned.
- `SpotlightGrid` on the portfolio title slide is mounted only while the slide is
  near the viewport (polled rect read), because it drives a permanent rAF loop
  and is not otherwise on `/home`.

### ⚠️ Verifying motion in the preview pane
**The preview pane does not composite: rAF is frozen (measured 0 frames in
4530 ms) and timers are throttled ~4×** (6 ticks where 22 were expected). So:
CSS transitions never advance, framer animations never run, IntersectionObserver
callbacks are never delivered, and autoplay looks "stalled" when it is healthy.
`setInterval`/`setTimeout` DO fire (slowly). Verify motion **structurally**
(computed styles, class/attribute state, `playState`, scrollLeft after a
`setTimeout`) and say plainly that frame rate was not measured. Shimming
`requestAnimationFrame` onto `setTimeout` works for code you control but **not**
for framer, which captures the real rAF at module load.

### Mobile gotchas (carried forward, still applicable)
- **`Herosection` needs a min-height at every breakpoint** (`min-h-[100svh] lg:min-h-[96.5vh]`) — all children are absolutely positioned, so dropping the base value makes the hero 0px below `lg`.
- **`w-full` + horizontal margins overflows** — margin-box exceeds the parent by 2×margin. Fix with `max-md:w-auto` (see `StatsSection` `.stat-inner`).
- **Cursor pills leak on touch** — the hide is `gsap.set(cursor,{scale:0})` inside the desktop matchMedia gate, so on touch it never runs. Both pills carry `hidden md:flex` / `invisible opacity-0`; keep that guard on any new hover cursor.
- **Hover-only reveals are invisible on touch** — add `max-md:*` overrides (see `ServiceSection` thumbnails).

### Repo state
Git repo on `main`. **Every commit is titled "first commit"** (6+ of them) —
there is no usable history for `git log`/`git blame`. No CI, no tests, no PR
workflow.

**As of 2026-08-07 the tree is CLEAN** — `git status --porcelain` returns 0
files. The 73-file batch the previous map warned about was committed, along with
five more commits on 2026-08-07. `bun run build` succeeds and prerenders 35/35
pages. The two untracked-but-imported files that used to break the build
(`ui/VideoViewportPause.tsx`, `public/assets/flexible*.png`) are tracked.

**Baselines to diff your own work against:** `bunx tsc --noEmit` is clean;
`bunx biome lint src` reports **188 pre-existing diagnostics** — a non-zero exit
does not mean you broke something.

### Testing against a phone
`bun run dev` and `next start` behave very differently on a device: dev ships
**~22× more JavaScript** (measured 21,735 KB across 29 scripts vs 987 KB across
11). Mobile performance findings are meaningless against `bun run dev` — test a
production build. `.claude/launch.json` starts the dev server on :3000; a
LAN-reachable prod server is `bunx next start -H 0.0.0.0 -p 3100`.

## Open questions

### New / needing your call (2026-08-07)
A. **Delete `public/assets/video7.mp4.orig` (19.96 MB) and `video3.mp4.orig`
   (1.9 MB)?** They are pre-re-encode backups I kept for sign-off and they got
   committed. `video7.mp4.orig` is now the largest file in the repo. Deleting
   them is safe once you're happy with the re-encoded videos.
B. **Deduplicate the two navbar files?** They are near-identical and the last
   fix had to be written twice. Flagged repeatedly; still not done because it is
   a cross-route refactor.
C. **`video1.mp4` is 9.8 MB / 1920×1080** on `/about`, and two images exceed
   2.6 MB. Same treatment as video3/7?
D. **Is the mobile carousel behaviour final?** Blog + Testimonials are now
   infinite native scrollers with dot pagination and no arrows; Portfolio holds
   slide 0 for 10s and the rest for 5s. Several of these reversed across the
   session, so worth confirming the end state is what you want.

### Carried forward
1. **Is the duplication intentional?** 64 near-identical service files is the single biggest maintenance cost. Should the 7 copies collapse into one parameterised set (content in `src/data/services.ts`), keeping brand-strategy separate?
2. **Should the dead forms be wired?** Contact + newsletter are decorative; the site currently has no lead capture. Needs a form service or an API route.
3. **`hello@youragency.com`** — replace with `hello@softexedge.com` across the 8 CtaSections? (Looks like an oversight, not a decision.)
4. ~~Is `garbage/` + the unused `ui/` effects intentionally kept~~ — resolved 2026-07-24: user asked for removal; all 47 dead files deleted. Remaining: may we also uninstall the dead deps (three stack, prettier, @studio-freight/lenis)?
5. **Should nav be unified** into one Header in `layout.tsx` instead of two nested in hero components?
6. **SEO** — largely resolved (metadata on 17 routes, sitemap, robots, `SITE_URL`). Remaining: add OG/twitter tags, add `/` to the sitemap, confirm `https://softexedge.com` is the real production domain.
7. **The 73-file uncommitted batch** — should it be committed (after `git add`ing the two untracked deps) and verified with a build? Nothing in it has been build-checked.
8. `.claude/` holds **five** finished plan files (`plan.md`, `plan-perf-round2.md`, `plan-subservices-overlap.md`, `plan-tracingborder-handoff.md`, `plan-work-slug-content.md`) and a `SESSION_LOG.md` that has grown a lot across the 08-06/07 mobile work — prune/rotate?
