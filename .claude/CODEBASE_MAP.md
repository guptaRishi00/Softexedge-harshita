# softexedge-may-2026 — Codebase Map
_Last updated: 2026-07-31_

> ⚠️ **Read "Repo state" first.** The working tree carries 73 modified files
> and **two untracked files that tracked code already imports** — committing
> as-is breaks the build.

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
- `src/lib/` — `utils.ts` (`cn()`), `useIsDesktop.ts`, `site.ts` (`SITE_URL = "https://softexedge.com"`, used by layout metadata + sitemap/robots)
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
- **`projects.ts`** — `projects` (8), `Project`, `getProjectBySlug:217`. Consumed by `/work/[slug]`, `WorkProjectShowcase`.

**No env vars anywhere** (`process.env` is read nowhere in `src/` or config).
**No `fetch`/`axios`/XHR anywhere.**

## Assets
- `public/assets/` — ~75 files. Videos: `hero.mp4`, `video1..4.mp4` (used by AboutTraditional, CareerHeroSection, ContactHeroSectionTwo, Herosection, PortfolioSection).
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
pair. `page/Header.tsx` takes `onDark` for light links over dark heroes.
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
- **`SpotlightGrid`** (`ui/SpotlightGrid.tsx`) — 9 consumers. Props: `speed`, `glowColor`, `glowVia`, `maskRadius`, `travel`, and **sweep mode**: `sweep`, `sweepColStart/ColEnd/RowStart/RowEnd` (inclusive cell rectangle), plus three sweep-only modifiers added 2026-07-22 — `scatter` (visit region cells in a seeded-shuffle order instead of row-major, so the glow reads as random not a line; still a bijection = every cell lights once per cycle), `sweepTrail` (how many cells stay lit behind the head = density; default `SWEEP_TRAIL`=4), and `plus` (light each cell as a plus — centre at full strength, its 4 orthogonal neighbours at `PLUS_ARM`=0.35). In `sweep` mode the reveal mask is dropped and the glow steps one box at a time; `maskRadius`/`travel` are ignored. Grid is 10 cols × 8 rows. `brand-strategy/CtaSection` and `blog/BlogHeroSection` BOTH use `sweep scatter plus sweepTrail={6} speed={0.15}` (differing only in `sweepColStart` — 2 vs 1, a per-scrim region choice); the other 7 CtaSections use the mask. rAF-driven — motion is not observable in the frozen preview pane (verify sweep/scatter/plus logic by simulating it in node, as the 07-22 log entries did). **PERF (2026-07-24):** the sweep branch quantises its React state update — `setSweepHead` only fires when the head crosses into a new cell (~1×/sec), not every frame; a CSS `transition` sized to one cell-step (`1000/(speed*SWEEP_CELLS_PER_SEC)`) on the glow `opacity` + inner-cell `background-color` bridges the gap. Do NOT restore a per-frame `setSweepHead` — that re-rendered all 80 cells 60×/sec (~400 `centreAt` calls in plus mode) and was the "laggy" complaint. The `intensity>0 ? transparent` tile switch was also removed (any lit cell lost its tile → holes); tile is now always `#121212`.

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
- **Unused deps still installed** (not removed — lockfile change needs sign-off): `prettier` + `prettier-plugin-tailwindcss` (no config), legacy `@studio-freight/lenis` (live code uses `lenis`), and — after the dead-file removal — the entire `three` stack (`three`, `@react-three/fiber`, `@react-three/drei`, `postprocessing`, `@types/three`): **zero imports in live src** (verified 2026-07-24). `ogl` IS still used, by `ui/Particles.tsx` only.

### Mobile gotchas (carried forward, still applicable)
- **Homepage animation is desktop-only by design** — everything is inside `matchMedia("(min-width: 768px)")`. On mobile PortfolioSection is a plain vertical stack.
- **`Herosection` needs a min-height at every breakpoint** (`min-h-[100svh] lg:min-h-[96.5vh]`) — all children are absolutely positioned, so dropping the base value makes the hero 0px below `lg`.
- **`w-full` + horizontal margins overflows** — margin-box exceeds the parent by 2×margin. Fix with `max-md:w-auto` (see `StatsSection` `.stat-inner`).
- **Cursor pills leak on touch** — the hide is `gsap.set(cursor,{scale:0})` inside the desktop matchMedia gate, so on touch it never runs. Both pills carry `hidden md:flex` / `invisible opacity-0`; keep that guard on any new hover cursor.
- **Hover-only reveals are invisible on touch** — add `max-md:*` overrides (see `ServiceSection` thumbnails).

### Repo state
Git repo on `main`. **Every commit is titled "first commit"** (6+ of them) —
there is no usable history for `git log`/`git blame`. No CI, no tests, no PR
workflow.

**As of 2026-07-31 the tree is far from clean: 73 modified + 3 untracked
files** (+674/−133). The work is coherent (see themes below) but **unverified —
no build has been run against it.** Two untracked files are already imported by
tracked code, so `git commit -a` without `git add` breaks things:

| Untracked file | Referenced by | Breaks |
|---|---|---|
| `src/components/ui/VideoViewportPause.tsx` | `src/app/layout.tsx:3,26` | **the build, on every route** |
| `public/assets/flexible.png`, `flexible2.png` | `career/WhyJoinUs.tsx:83,91` | `/career` images in prod |

Uncommitted themes: (1) the complete `<img>` → `next/image` migration (~60 files,
uniform across all 8 service folders); (2) video perf — global `VideoViewportPause`,
single-`<video>` marquee in `career/InfiniteRow`+`CarouselCard`, rewritten
`Herosection` canvas loop; (3) mobile responsive polish (desktop deliberately
frozen) in `home/Herosection`, `home/AboutSection`, `home/page.tsx`,
`career/*`; (4) `i.pravatar.cc` added to `next.config.ts`; (5) doc updates.

## Open questions
1. **Is the duplication intentional?** 64 near-identical service files is the single biggest maintenance cost. Should the 7 copies collapse into one parameterised set (content in `src/data/services.ts`), keeping brand-strategy separate?
2. **Should the dead forms be wired?** Contact + newsletter are decorative; the site currently has no lead capture. Needs a form service or an API route.
3. **`hello@youragency.com`** — replace with `hello@softexedge.com` across the 8 CtaSections? (Looks like an oversight, not a decision.)
4. ~~Is `garbage/` + the unused `ui/` effects intentionally kept~~ — resolved 2026-07-24: user asked for removal; all 47 dead files deleted. Remaining: may we also uninstall the dead deps (three stack, prettier, @studio-freight/lenis)?
5. **Should nav be unified** into one Header in `layout.tsx` instead of two nested in hero components?
6. **SEO** — largely resolved (metadata on 17 routes, sitemap, robots, `SITE_URL`). Remaining: add OG/twitter tags, add `/` to the sitemap, confirm `https://softexedge.com` is the real production domain.
7. **The 73-file uncommitted batch** — should it be committed (after `git add`ing the two untracked deps) and verified with a build? Nothing in it has been build-checked.
8. `.claude/` holds three finished plan files (`plan.md`, `plan-subservices-overlap.md`, `plan-tracingborder-handoff.md`) and a now-larger `SESSION_LOG.md` — prune/rotate?
