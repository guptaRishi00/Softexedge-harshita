# softexedge-may-2026 — Codebase Map
_Last updated: 2026-07-22_

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
`src/app/layout.tsx` is 20 lines and does almost nothing — imports
`globals.css`, sets `metadata`, applies `font-sans` to `<html>`. **No providers,
no header, no footer, no fonts, no analytics.**

Each route `page.tsx` composes section components and renders its own
`<Footer>`. The site header is rendered *inside each page's hero component*
(see Gotchas). GSAP plugins are registered per-file behind
`typeof window !== "undefined"`.

## Directory layout
- `src/app/` — App Router routes, `layout.tsx`, `globals.css`
- `src/components/<page>/` — page-specific sections (`home`, `about`, `blog`, `career`, `contact`, `work`)
- `src/components/<service>/` — **8 near-identical service-page component sets** (see Duplication)
- `src/components/ui/` — shared primitives + WebGL effects (25 files, **14 unreferenced**)
- `src/components/layout/` — Header, Footer, SmoothScroll
- `src/components/page/` — **second** Header + its own resizable-navbar copy
- `src/components/shared/` — 3 ConnectButton variants, **all unreferenced**
- `src/components/garbage/` — **dead code, 25 files, zero external imports**
- `src/data/` — `blog.ts`, `projects.ts` (all site content)
- `src/lib/` — `utils.ts` (`cn()`), `useIsDesktop.ts`
- `public/assets/` (~75 files incl. 5 `.mp4`), `public/fonts/`

## Surfaces
**All 16 routes are public and static. There is no auth anywhere** — no auth
library, no middleware, no session/cookie/token handling, no access control.

| Name | Type | File:Line | Auth | Purpose |
|---|---|---|---|---|
| Root redirect | Route | `src/app/page.tsx:3` | public | `redirect("/home")` |
| HomePage | Route | `src/app/home/page.tsx:32` | public | Hero, LogoLoop, About, Portfolio, Stats, Services, Testimonials, Contact, Blog. **Only route using `SmoothScroll`.** |
| AboutPage | Route | `src/app/about/page.tsx:14` | public | Hero, Traditional, OurValues, OurTeam, Testimonials, CTA, FAQ, Blog |
| ContactPage | Route | `src/app/contact/page.tsx:12` | public | Hero (bg video), ContactSection form, Testimonials, FAQ, CTA |
| CareerPage | Route | `src/app/career/page.tsx:11` | public | CareerHero, WhyJoinUs, OpenPositions, OurValues, Perks, OurTeam, ApplicationJourney |
| WorkPage | Route | `src/app/work/page.tsx:10` | public | WorkHero (DomeGallery), WorkProjectShowcase, Testimonials, CTA, FAQ, Blog |
| WorkProjectPage | Route | `src/app/work/[slug]/page.tsx:22` | public | SSG via `generateStaticParams:12`. Renders `<Header onDark/>` directly. Unknown slug → `notFound():29` |
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
`sitemap.ts`/`robots.ts`/`opengraph-image`.** Both dynamic routes call
`notFound()` but fall through to Next's default 404 page.

### Forms & external input
| Surface | File:Line | Wired? |
|---|---|---|
| Contact form (name/email/phone/company/service/message) | `src/components/home/ContactSection.tsx:263` | **DEAD** — no `onSubmit`, no `action`, no state. Appears on `/home` and `/contact`. |
| Newsletter subscribe | `src/components/layout/Footer.tsx:122` | **DEAD** — no handler. Appears on **all 16 routes**. |
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
- Imagery is **remote-heavy**: ~60 files reference `images.unsplash.com`; only 18 import `next/image`.
- `next.config.ts` `remotePatterns`: `images.unsplash.com` (**listed twice**, :11 and :22), `plus.unsplash.com`, `randomuser.me`. Any other remote host will throw at runtime.
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
change to these means editing 8 files. `garbage/CtaSection.tsx` is a third,
older CTA variant — **do not use it as a dedupe base**.

Page composition also differs in one real way:
- `brand-strategy/page.tsx:21-22` — `<SubServices />` then `<ProcessSection />` as **siblings** (no overlap)
- the other 7 — `<SubServices><ProcessSection /></SubServices>` **nested** (ProcessSection scrolls over the pinned last card)

### Two Header components — edit the right one
| File | Navbar dep | Used by |
|---|---|---|
| `layout/Header.tsx` | `ui/resizable-navbar` | **`/home` only**, via `home/Herosection.tsx:4` |
| `page/Header.tsx` | `page/resizable-navbar` | **everything else** — 15 hero components + `work/[slug]/page.tsx:3` directly |

`page/resizable-navbar.tsx` and `ui/resizable-navbar.tsx` are a near-duplicate
pair. `work/WorkHeader.tsx` is a third, orphaned variant. `page/Header.tsx`
takes `onDark` for light links over dark heroes.
**There is no header in `layout.tsx`** — the site nav is nested inside hero
components, so a nav change means editing both Headers.

### Two conflicting Lenis integrations
- `layout/SmoothScroll.tsx:21-49` — `new Lenis()` wired into ScrollTrigger + GSAP ticker. Used by `/home` only.
- `<ReactLenis root>` inside **all 8 `*/SubServices.tsx`** — a *section component* seizing global scroll, on pages with no SmoothScroll wrapper and no ScrollTrigger sync.

### Scroll-fragile code (touch with care)
1. `app/home/page.tsx:71-142` + `home/PortfolioSection.tsx:143` — a hand-tuned chain of `pinSpacing:false` pins joined by `endTrigger`, plus a magic `md:-mt-[100vh]` documented at `app/home/page.tsx:92-95`. Any height change in About/Portfolio/Stats/Service breaks the overlap. All inside `matchMedia("(min-width: 768px)")` — mobile takes a different path.
2. `*/SubServices.tsx` — sticky card stack driven by `useScroll` + `useMotionValueEvent`. Cards share one sticky line (`top: 5vh`) and get their staircase from `translateY(i * STEP)`, so `top + height` is equal for all and they release together. **A transform reserves no layout space** — hence the explicit reserve div after the stack. The tracker's `useScroll` offset must stay unsaturated while cards are still pinning (`["start start","end start"]`, not `"end end"`).
3. `home/PortfolioSection.tsx` also carries **snap-to-panel** and **auto-advance** on the same pinned trigger. Both deliberately stop at `st.start + totalWidth` (the end of the horizontal phase) and never enter the trailing hold, which belongs to the Stats overlap. Auto-advance moves the **page scroll** via `st.scroll()`, not the track — animating the track would desync the scrub, the snap and the panel reveals. Any wheel/touch/pointer/key input cancels it.
4. `home/ServiceSection.tsx:111` / `home/PortfolioSection.tsx:119` — cursor followers on pinned sections; `mouseleave` never fires during scroll, so hiding is manual (ticker-polled).
5. `blog/BlogArticle.tsx:40` — document-level `useScroll` progress bar, ignores Lenis.

### Cross-component couplings
- **`blog:filter` window event** — dispatched `blog/BlogHeroSection.tsx:80`, listened `blog/BlogListSection.tsx:34`. Untyped, stringly-keyed, no shared constant, no props relationship.
- **`createPortal`** — `home/ServiceSection.tsx:263` mounts the cursor pill outside the pinned subtree to escape the GSAP transform.
- **`TracingBorder` `gradientId`** — a *global SVG id namespace* shared by 10 call sites; collisions silently break the gradient.
- **`SpotlightGrid`** (`ui/SpotlightGrid.tsx:30-61`) — 9 consumers. Props: `speed`, `glowColor`, `glowVia`, `maskRadius`, `travel`, and sweep mode: `sweep`, `sweepColStart/ColEnd/RowStart/RowEnd` (inclusive cell rectangle). In `sweep` mode the reveal mask is dropped and the glow steps one box at a time left→right/top→bottom; `maskRadius`/`travel` are ignored. Grid is 10 cols × 8 rows. Currently `brand-strategy/CtaSection` and `blog/BlogHeroSection` use sweep; the other 7 CtaSections use the mask.

### Content / correctness defects
- **Placeholder email `hello@youragency.com` — 16 occurrences across all 8 `*/CtaSection.tsx`.** Reachable on every service page plus `/about`, `/blog`, `/blog/[slug]`, `/contact`, `/work`, `/work/[slug]`. The real address is `hello@softexedge.com`.
- **`layout.tsx:5` metadata** — title is `"Softexedge"` but description is still `"Generated by create next app"`. No per-page metadata except `/blog/[slug]`, no OG tags, no sitemap/robots — significant SEO gap for a marketing site.
- `projects.ts` has **no `slug` field**; `getProjectBySlug:218` matches via `p.href.endsWith("/" + slug)` — fragile.
- `WorkProjectShowcase.tsx:23` keeps its own project list alongside `data/projects.ts` — two sources for the same 8 projects.
- Loose types: `type Props = {}`, `ContactPage({}: any)`.

### Dead weight
- `src/components/garbage/` — 25 files, **zero imports from outside** (verified). Safe to delete.
- `src/components/ui/` — **14 unreferenced effect components**, several 300–500 lines of WebGL: `BorderGlow`, `CardSwap`, `ColorBends`, `DotGrid`, `Galaxy`, `Grainient`, `GridDistortion`, `ImageTrail`, `LaserFlow`, `PixelBlast`, `PixelTrail`, `SplashCursor`, `Strands`, `VariableProximity`.
- `src/components/3d-globe-demo.tsx`, `shared/ConnectButton{,Two,Three}.tsx`, `work/WorkHeader.tsx`, `career/CareerValues.tsx` — all orphaned.
- Both `lenis` and legacy `@studio-freight/lenis` installed. `prettier` + plugin installed with no config.

### Mobile gotchas (carried forward, still applicable)
- **Homepage animation is desktop-only by design** — everything is inside `matchMedia("(min-width: 768px)")`. On mobile PortfolioSection is a plain vertical stack.
- **`Herosection` needs a min-height at every breakpoint** (`min-h-[100svh] lg:min-h-[96.5vh]`) — all children are absolutely positioned, so dropping the base value makes the hero 0px below `lg`.
- **`w-full` + horizontal margins overflows** — margin-box exceeds the parent by 2×margin. Fix with `max-md:w-auto` (see `StatsSection` `.stat-inner`).
- **Cursor pills leak on touch** — the hide is `gsap.set(cursor,{scale:0})` inside the desktop matchMedia gate, so on touch it never runs. Both pills carry `hidden md:flex` / `invisible opacity-0`; keep that guard on any new hover cursor.
- **Hover-only reveals are invisible on touch** — add `max-md:*` overrides (see `ServiceSection` thumbnails).

### Repo state
Git repo on `main`, working tree clean. **Every commit is titled "first commit"**
(6+ of them) — there is no usable history for `git log`/`git blame`. No CI, no
tests, no PR workflow.

## Open questions
1. **Is the duplication intentional?** 64 near-identical service files is the single biggest maintenance cost. Should the 7 copies collapse into one parameterised set (content in `src/data/services.ts`), keeping brand-strategy separate?
2. **Should the dead forms be wired?** Contact + newsletter are decorative; the site currently has no lead capture. Needs a form service or an API route.
3. **`hello@youragency.com`** — replace with `hello@softexedge.com` across the 8 CtaSections? (Looks like an oversight, not a decision.)
4. **Is `garbage/` + the 14 unused `ui/` effects intentionally kept** as a reference library, or safe to delete?
5. **Should nav be unified** into one Header in `layout.tsx` instead of two nested in hero components?
6. **SEO:** real metadata/OG/sitemap and a production domain?
7. `.claude/` holds three finished plan files (`plan.md`, `plan-subservices-overlap.md`, `plan-tracingborder-handoff.md`) and a 378 KB `SESSION_LOG.md` — prune/rotate?
