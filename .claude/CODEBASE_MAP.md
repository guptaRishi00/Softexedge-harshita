# softexedge-sept-2026 — Codebase Map
_Last updated: 2026-09-04_ (full rebuild; the previous map was dated 2026-08-07 and 98 commits stale)

> Legend: everything here was re-read from source on 2026-09-04 unless tagged
> **[?] INFERRED** — a reasoned guess, not confirmed. The user was asked to
> check every [?] item; treat them as leads until then.
>
> ⚠️ **Two facts changed since the last map and invalidate old habits:**
> 1. **All 8 service routes render `src/components/brand-strategy/*`.** The 7
>    sibling folders (`web-development/`, `app-development/`, … — 56 files) are
>    **dead code with zero importers**. Editing them changes nothing.
> 2. **`app/home/page.tsx` is a Server Component**; the GSAP pin chain moved
>    to `home/ScrollAnimator.tsx`.

## Identity
Marketing/agency website for **SoftexEdge** (`https://softexedge.com`, `src/lib/site.ts:1`).
Frontend-only, animation-heavy brochure site — **no backend, API, database, auth,
env vars, or fetches**. All content is hard-coded in `src/data/` and inside
components. Repo: `github.com/guptaRishi00/Softexedge-2026-draft-one`, branch `main`.

- **Framework:** Next.js 16.2.5 (App Router, Turbopack) + React 19.2.4, React Compiler on (`next.config.ts` `reactCompiler: true`)
- **Language:** TypeScript 5, `strict: true`, alias `@/*` → `./src/*`
- **Runtime here:** Node 22.16, Bun 1.2.16
- **Read `node_modules/next/dist/docs/` before writing Next code** (AGENTS.md rule — this Next differs from training data)

## Stack & build
- **Package manager: Bun** (`bun.lock`). A `package-lock.json` is also committed (added ~Aug) — **[?]** stray; nobody runs npm install. `.claude/launch.json` starts dev via `npm run dev` on :3000.
- **Styling:** Tailwind v4, CSS-first — no `tailwind.config.*`; `@theme` + `@theme inline` in `src/app/globals.css`. **`experimental.inlineCss` was tried and rejected 2026-09-25**: it removes the render-blocking CSS request but pushes the document from 43 KB to 125 KB transfer, and mobile FCP/LCP each got ~200 ms *worse* under simulated 4G. Don't re-add it. `tw-animate-css` is still in `package.json` but no longer imported (zero usages). shadcn configured (`components.json`, style `radix-nova`, aceternity registry) but only `ui/button.tsx` + `ui/carousel.tsx` are shadcn-generated.
- **Lint/format:** Biome 2.2.0. `prettier` + `prettier-plugin-tailwindcss` are still installed with no config — dead deps.
- **Animation:** framer-motion 12 (114 files), GSAP 3.15 + ScrollTrigger + `@gsap/react` (6 files), Lenis 1.3 (`lenis` + `lenis/react`), embla (`ui/carousel`, footer clocks, team section).
- **WebGL:** `ogl` only, one consumer: `ui/SpecularBorder.tsx` (loaded via `next/dynamic`, ssr:false, mounted on hover). The `three` stack is gone from `package.json`.
- **Font:** Satoshi Variable via `next/font/local` in `app/layout.tsx` (preloaded, metric-matched fallback), exposed as `--font-satoshi` → `--font-sans` in `globals.css`. The old `@font-face` is gone (2026-09-25).
- **Line endings: CRLF** throughout. `biome format --write` rewrites whole files — avoid on files you didn't author.

## Commands
| Action | Command |
|---|---|
| Run dev | `bun run dev` → http://localhost:3000 (`.claude/launch.json` name `dev`) |
| Run all tests | _none — no runner, no test files_ |
| Run one test | _n/a_ |
| Lint | `bun run lint` (`biome check`) — **exits 1 on a clean checkout**: baseline 2026-09-04 = **321 errors / 47 warnings** (`biome lint src` alone: 130 / 47). Judge your change against `git show HEAD:<file>`, not the total. |
| Format | `bun run format` (`biome format --write`) — see CRLF warning above |
| Typecheck | _no script_ — `bunx tsc --noEmit` (**clean** 2026-09-04) |
| Build | `bun run build` — **passes, 35/35 pages prerendered** (2026-09-04). If it fails on `.next/dev/types/routes.d.ts` while `bun dev` is running, `rm -rf .next/dev/types`. |
| Prod server for phone testing | `bunx next start -H 0.0.0.0 -p 3100`. Kill stale ones with `netstat -ano \| grep :3100` + `Stop-Process -Id <pid> -Force` (`pkill` does not work here). |

## Bootstrap flow
`src/app/layout.tsx` (34 lines): `metadata` with `metadataBase(SITE_URL)` + title template `"%s | Softexedge"` (`:8-16`); `<html class="h-full antialiased font-sans">` → `<body class="min-h-full flex flex-col">` → **two global mounts**: `<VideoViewportPause/>` (`:26`) and `<IosClickRescue/>` (`:29`) → `{children}`. No providers, no header, no footer, no analytics, no fonts.

Every `src/app/**/page.tsx` is a **Server Component** (zero `"use client"` under `src/app`). Each route page composes section components and renders its own `<Footer>`. Every page has exactly one `<main>` landmark: the route file's root element for `/blog`, the 8 service pages and `/work/[slug]`; a hero component (`AboutHeroSection`, `WorkHeroSection`, `BlogArticle`, `ScrollAnimator`) for the rest — don't add a second. The site header is rendered **per page** — `/home` gets `layout/Header` via `home/Herosection.tsx:7`; every other route renders `page/Header` (22 importers: 13 route pages incl. `work/[slug]`, 7 dead `*/StrategyHeroSection`, `blog/BlogArticle:56`, `blog/BlogHeroSection:85`).

`/home` specifically: `app/home/page.tsx:15` → `<SmoothScroll>` (Lenis, desktop only) → `<ScrollAnimator hero about portfolio stats services testimonials techCarousel contact blog footer/>` (10 ReactNode props). `home/layout.tsx` exists only to carry `metadata` for the route.

## Directory layout
- `src/app/` — 17 routes + `layout.tsx`, `home/layout.tsx`, `sitemap.ts`, `robots.ts`, `globals.css`, `favicon.ico`
- `src/components/home/` — `/home` sections + `ScrollAnimator.tsx` (GSAP pin owner)
- `src/components/layout/` — `Header` (home nav), `Footer` + `FooterInteractiveClocks`, `SmoothScroll`
- `src/components/page/` — `Header` (all other routes) + its own `resizable-navbar.tsx`
- `src/components/ui/` — 17 shared primitives/effects (all live; see table below)
- `src/components/brand-strategy/` — **the one live service-page component set** (9 files)
- `src/components/{ai-marketing-automation,app-development,custom-software,digital-marketing,ui-ux-design,video-production,web-development}/` — **56 dead files**, byte-identical to each other (md5 verified), an older generation of brand-strategy's components. Kept "for minimal diff"; cleanup pending (open question 1).
- `src/components/{about,blog,career,contact,work}/` — page-specific sections. `career/CareerHeroSection` rows are `InfiniteRow` marquees (6 copies of the item list); every image `src` and video `still` there is unique on purpose, and `InfiniteRow` keys cards by `src`, so never repeat a path within a row.
- `src/data/` — `blog.ts` (6 posts), `projects.ts` (9 projects)
- `src/lib/` — `utils.ts` (`cn`), `site.ts` (`SITE_URL`), `useIsDesktop.ts`, `useInfiniteCarousel.ts`, `tweenScrollLeft.ts`
- `public/assets/` (123 files, ~114 MB, 8 mp4), `public/fonts/`, `public/noise.png`
- `deliverables/` — copywriting outputs from the workspace copy system (2026-08-05); not imported by code
- `.claude/` — this map, `SESSION_LOG.md` (22k lines, append-only), 5 finished plan files, `launch.json`

## Surfaces
**All 17 routes public, static, no auth anywhere.** No route handlers, API routes, server actions, `middleware.ts`/`proxy.ts`, `not-found.tsx`, `error.tsx`, `loading.tsx`, `opengraph-image`, `manifest`. Unknown-slug 404s fall to Next's default page.

| Route | File:Line | Auth | Metadata | Composition |
|---|---|---|---|---|
| `/` | `src/app/page.tsx:3` | public | inherits | `redirect("/home")` |
| `/home` | `src/app/home/page.tsx:15` | public | `home/layout.tsx:3` title+desc | SmoothScroll → ScrollAnimator(Herosection, AboutSection, PortfolioSection, StatsSection, ServiceSection, ExperimentalTestimonials, TechLogoCarousel, ContactSection, BlogSection, Footer). Header = `layout/Header`. |
| `/about` | `src/app/about/page.tsx:22` | public | `:15` | Header, AboutHeroSection, AboutTraditional, OurValuesSection, OurTeamSection, ExperimentalTestimonials, TechLogoCarousel, CtaSection, FaqSection, BlogSection, Footer. 2× ShrinkOnOverlap. |
| `/career` | `src/app/career/page.tsx:19` | public | `:13` | Header, CareerHeroSection, WhyJoinUs, OpenPositions, OurValuesSection, PerksSection, OurTeamSection, ApplicationJourney, Footer. 2× ShrinkOnOverlap. |
| `/contact` | `src/app/contact/page.tsx:28` | public | `:13` + `viewport.themeColor` `:22` | Header **onDark**, ContactHeroSectionTwo (video5), ContactSection (form), ExperimentalTestimonials, TechLogoCarousel, ContactFaqSection, CtaSection, Footer. Inline `<style>` for iOS notch `:41`. |
| `/blog` | `src/app/blog/page.tsx:14` | public | `:9` | BlogHeroSection (renders Header + filter emitter), BlogFeaturedSection, BlogListSection, CtaSection, Footer |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx:35` | public | `generateMetadata:14` — **the only route with `openGraph`** (`:26`) | SSG `generateStaticParams:10`, `dynamicParams=false:8`; BlogArticle (renders Header), CtaSection, Footer |
| `/work` | `src/app/work/page.tsx:26` | public | `:13` + `viewport.themeColor` | Header onDark, WorkHeroSection (DomeGallery), WorkProjectShowcase, ExperimentalTestimonials, TechLogoCarousel, CtaSection, FaqSection, BlogSection, Footer. 2× ShrinkOnOverlap. |
| `/work/[slug]` | `src/app/work/[slug]/page.tsx:38` | public | `generateMetadata:23` title+desc | SSG `generateStaticParams:14` (slug from `href.split("/").pop()`), **no `dynamicParams`** so unknown slugs hit `notFound():45` at request time. Header onDark → ProjectHero → ProjectDetailsContent → ProjectGallery(A) → ProjectOutcomes → ProjectGallery(B) → NextProject → ContactFaqSection → CtaSection → Footer |
| `/brand-strategy` | `src/app/brand-strategy/page.tsx:27` | public | `:19` | Header dropdown, StrategyHeroSection, **SubServices** (sticky, `top: SUBSERVICES_STICK_TOP`), **ProcessSection** (sibling, `#process-overlap`), OurTechStack, ProjectShowcase, ExperimentalTestimonials, TechLogoCarousel, CtaSection, FaqSection, BlogSection, Footer. 2× ShrinkOnOverlap. |
| `/web-development`, `/app-development`, `/ui-ux-design`, `/digital-marketing`, `/video-production`, `/custom-software`, `/ai-marketing-automation` | `src/app/<slug>/page.tsx:30` | public | `:24` title+desc per service | **JSX byte-identical to brand-strategy** (only title/description/function name differ). Each carries the comment "Keep this body in step with src/app/brand-strategy/page.tsx." |

**SEO files:** `sitemap.ts` emits 14 static routes + blog slugs + `projects[].href`; **omits `/`**, no `lastModified`/`priority`. `robots.ts` allows all, points at `/sitemap.xml`. No OG/twitter tags except `/blog/[slug]`.

### Forms & external input
| Surface | File:Line | Wired? |
|---|---|---|
| Contact form (name/email/phone/company/service/message) | `home/ContactSection.tsx:173` | **DEAD** — no `onSubmit`/`action`/state. On `/home` and `/contact`. |
| Newsletter subscribe | `layout/Footer.tsx:147` | **DEAD** — `required` input, submit does nothing. On all 17 routes. |
| Blog category/author filter | `blog/BlogHeroSection.tsx:73` → `blog/BlogListSection.tsx:19` | Works — `CustomEvent("blog:filter", {detail:{type:"category"\|"author", value}})` |
| `mailto:hello@softexedge.com` / `tel:+18001234567` | `home/ContactSection.tsx:17,25`; CtaSection `:164,167` | Real (**[?]** the phone number looks like a placeholder) |
| `mailto:careers@softexedge.com?subject=…` | `career/OpenPositions.tsx:301` | Real — the only working apply path |
| Share to X / LinkedIn / copy link | `blog/ShareRail.tsx:56,70` | Real |
| "Visit Live Site" | `work/ProjectDetailsContent.tsx:92` | **DEAD** `href="#"` — `Project` has no URL field |
| Footer socials, Privacy Policy | `layout/Footer.tsx` | **DEAD** `href="#"` |

**The site has zero working lead capture.**

## Data
No storage. Two static modules:
- **`src/data/blog.ts`** — `categories:2`, `Author:13`, `ContentBlock:19` (heading/paragraph/quote/list/callout/image), `BlogPost:27`, `blogPosts:48` (6 posts; `google-io-2026` is the only `featured`), `getPostBySlug:565`, `getRelatedPosts:569`. Avatars via `portrait()` helper → `randomuser.me`. `PostCategory:11` is an unused export.
- **`src/data/projects.ts`** — `categories:1`, `Project:12` (`id,title,subtitle,description,tech[],year,image,video?,category,type,href,featured?,gallery?`), `projects:28` (**9** objects, ids 1,2,10,3,4,5,6,7,8 — non-sequential), `getProjectBySlug:232` matches `href.endsWith("/"+slug)` — **no `slug` field**. `WorkProjectShowcase` now reads this file (the old duplicate list is gone).
- **`home/PortfolioSection.tsx:28`** keeps its **own** 5-entry `projects` list for the homepage panels — a separate source from `data/projects.ts` by design (comment `:41`).
- **`/work/[slug]` fabricates content**: `ProjectOutcomes.tsx:9-25` (phases + testimonial) and `ProjectDetailsContent.tsx:13-17` (results "140% / 2.4× / 98") are hard-coded and identical for all 9 projects.

## Assets
- `public/assets/` — 123 files, ~114 MB. Videos: `video1` 10.3 MB (about), `video2` 4.6, `video5` 3.8 (contact hero), `video6` 1.9, `video7` 1.4 (home hero, re-encoded 720p), `video3` 0.97, `video8`, `video9`. **`video7.mp4.orig` (20.9 MB) and `video3.mp4.orig` (1.9 MB) are still committed** — pre-encode backups awaiting deletion sign-off (open question A).
- **7 untracked images** in the working tree right now: `apply.jpg, assign.jpg, interview.jpg, interview2.jpg, meet.jfif, meet2.jpg, offer.jfif` — the in-progress career Unsplash→local migration (see Repo state). All 7 are now referenced (career hero + ApplicationJourney).
- **Remote image hosts still in use:** `images.unsplash.com` (~40 live files), `plus.unsplash.com`, `i.pravatar.cc` (CtaSection avatars), `randomuser.me` (blog/about avatars). `next.config.ts` `remotePatterns` covers all four (`images.unsplash.com` listed twice, `:11` and `:23`). Any new host throws at runtime.
- `next/image` everywhere — `grep "<img" src/` hits only a comment. New `LogoLoop` items **must** pass intrinsic `width`/`height`. `next.config.ts` `images.formats` = AVIF then WebP (2026-09-25).
- `public/noise.png` — 128×128 grayscale, generated Aug (was a 404 before); used by Footer + AboutTraditional as `bg-[url('/noise.png')] … max-md:hidden`.
- Home hero mobile substitute: `/assets/astro.webp` (`Herosection.tsx:200-221`, `unoptimized`, `fetchPriority="high"`; re-encoded 28 KB → 5.7 KB at q60 — it is blurred 6px + tinted, max pixel delta after blur 4/255), not a poster; desktop video has `preload="none"` and is played by an effect gated on `matchMedia`, **not `autoPlay`** — mobile cold load fetches zero mp4.

## External services
**None wired.** No SDK keys, analytics, pixels, `next/script`, iframes, form backend, CMS. `process.env` is read nowhere.

## Conventions
- Sections are `"use client"` (133 files); route pages are server components that only compose.
- `cn()` from `@/lib/utils`; `@/` alias.
- **Responsive idiom:** desktop values are the base; mobile overrides are `max-md:*` (or smaller base re-asserted at `md:`). Every task is stated "(desktop only)" / "(mobile only)" and must be enforced *by construction* (breakpoint prefixes or an `isDesktop` branch) and proven by measuring the other breakpoint.
- **Hydration-safe viewport hooks** (`src/lib/useIsDesktop.ts`): `useIsDesktop()` is `false` on server AND first client render — safe for markup branches. `useIsMobile()` reads matchMedia during the first client render — **only for non-markup props** (e.g. `transition={isMobile ? NO_ENTRY : …}`).
- **Entrance animations are off below md via CSS**, not JS: `globals.css:301-308` `[data-no-mobile-entry]{opacity:1!important;transform:none!important;…}`. 104 usages. Tag any new framer entrance element with `data-no-mobile-entry` + `transition={isMobile ? NO_ENTRY : …}`.
- **Carousels are native scroll-snap** (`snap-x snap-mandatory overflow-x-auto .no-scrollbar`) + `lib/useInfiniteCarousel` (3 runs, wraps at the extremes only) + `ui/CarouselDots` (`loop` prop when the track repeats). Never JS pointer-drag on mobile. Two accepted exceptions: BlogSection desktop drag, footer clocks (embla).
- **Never gate on an async flag** (IntersectionObserver, `transitionend`, pending-rAF). Poll `getBoundingClientRect()` synchronously at tick time; use timers, cancel-and-rearm rAF; IO paths fail **open**.
- **`will-change` must be breakpoint-scoped** (`md:will-change-transform`) when the transform is desktop-only.
- Stable keys: prebuild `{char,id}` arrays at module scope instead of index keys (Footer brand letters, ChannelCard cells, CarouselDots).
- **Biome rules that bite:** `noArrayIndexKey`, `noUnusedImports/Variables`, `a11y/useMediaCaption` (needs `biome-ignore` on `<video>`), `useExhaustiveDependencies`.
- Comments explain *why* (measured numbers, rejected alternatives); do not add narrating comments.
- `SESSION_LOG.md`: append at EOF, `## Title (desktop only|mobile only)`, then **Task / Cause / Change / Verification** with build exit + page count and biome delta vs HEAD.

## Where to add a thing
- **New page:** `src/app/<route>/page.tsx` (server component, export `metadata`) + `src/components/<route>/`; render `<Header dropdown/>` from `page/Header` at page level and `<Footer/>` last; add the route to `sitemap.ts:8-23` and, if a service, to both navbars' `dropdownItems` (`layout/Header.tsx:51-102`, `page/Header.tsx:42-121`).
- **New service page:** copy `src/app/web-development/page.tsx`, change `metadata` + function name. **Do not copy a component folder** — all services render `brand-strategy/*`. Content is currently hard-coded inside those components, so a new service shows brand-strategy's copy until the components are parameterised (open question 1).
- **New `/home` section:** add a prop to `ScrollAnimator` (`home/ScrollAnimator.tsx:43-54`) and a wrapper div in its tree; pass it from `app/home/page.tsx`. Check the pin chain first.
- **Reusable effect/UI:** `src/components/ui/`.
- **Nav change:** edit **both** `layout/Header.tsx` + `ui/resizable-navbar.tsx` (home) **and** `page/Header.tsx` + `page/resizable-navbar.tsx` (everything else).
- **Blog post / project:** append to `src/data/blog.ts` / `src/data/projects.ts` (`href` must be `/work/<slug>`).
- **Shrink-on-overlap wrapper:** `<ShrinkOnOverlap endSelector="#next-section-id">` — the id must exist at mount or it silently no-ops.

## Shared `ui/` reference (all 16 files live)
| File | Consumers | Contract / gotcha |
|---|---|---|
| `IosClickRescue` | `app/layout.tsx:29` | Capture-phase pointer listeners re-dispatch taps iOS Safari drops (~1 in 3 when the page mutates during the synthetic hover pass). Fields get synchronous `focus()` in `pointerup`; links/buttons get `el.click()` after 120 ms unless a native click arrived. Anything that `stopPropagation()`s at capture before `document` breaks its detection. |
| `DesktopAutoplayVideo` | `career/CarouselCard`, `about/AboutTraditional`, `contact/ContactHeroSectionTwo` | `<video preload="none" loop muted playsInline>` that calls `play()` only at `min-width:768px`. **Phones never download the mp4**; they show the `poster` (`/assets/video1-poster.jpg`, `video5-poster.jpg`, or the career `still`). Use this, never bare `autoPlay`, for any new decorative video — `/about` was pulling 8.9 MB and `/career` 14.5 MB of mp4 on mobile before it. `home/Herosection` keeps its own copy (canvas coupling). |
| `VideoViewportPause` | `app/layout.tsx:26` | IO (`rootMargin 200px`) + MutationObserver on body; pauses offscreen `<video>`, resumes only ones it paused (WeakSet). **`play` fires on every re-entry** — canvas-from-video code must `cancel()` before scheduling (`Herosection.tsx:130-133`). |
| `ShrinkOnOverlap` | 13 route pages | GSAP scrub: wrapped block scales to `scale=0.85,y=40` between its own bottom and `endSelector`'s top; desktop only. `endSelector` resolved once by `document.querySelector` → renamed id = silent no-op. Route ids it depends on: `#about-traditional #our-team #why-join-us #our-team-career #contact-overlap #blog-list #work-showcase #work-testimonials #subservices-overlap #process-overlap`. |
| `TechLogoCarousel` | 12 route pages | Server component; 11 `react-icons/si` logos → `LogoCarousel`. |
| `LogoCarousel` | `TechLogoCarousel` only | Desktop framer `x:["-50%","0%"]`; mobile `useMarqueeHalf` (WAAPI, holds `will-change` for the hook lifetime). `useMarqueeHalf` has no other consumer (ExperimentalTestimonials mentions it in a stale comment only). |
| `LogoLoop` | `home/ScrollAnimator.tsx:182` | Desktop rAF loop gated by IO; below md hands off to CSS keyframe `logoloop-marquee` via `--logoloop-seq`. Items **require `width`/`height`**. **Measures its container to pick a copy count (+2 headroom) via ResizeObserver — never mount it in a shrink-to-fit box** (column flex `items-start`, `w-max`, inline): the copies widen the box, the box re-measures, +2 copies per frame forever (found 2026-09-25: 2,129 → 7,919 DOM nodes in 4 s on phones). The hero wrapper is `max-sm:self-stretch` for exactly this reason. |
| `SpotlightGrid` | 8 `*/CtaSection` (7 dead) + `blog/BlogHeroSection` | Props `columns=10 rows=8 speed maskRadius travel sweep scatter plus sweepTrail cellClassName …`. Paints cells imperatively via refs; `setSweepHead` only on whole-cell steps; IO-gated rAF; 30 fps cap below md. Child order glow→core is load-bearing. `sweepCol*/Row*` are cell coordinates. |
| `TracingBorder` | 7 **dead** `*/ProjectShowcase` | SVG comet→corner-glow; `gradientId` interpolates into 6 document-global SVG ids. Effectively unused by live routes. |
| `SpecularBorder` | `blog/BlogCard:157`, `brand-strategy/ProjectShowcase:535`, `work/ProjectCard:267` | `ogl` WebGL rim; loaded `next/dynamic` ssr:false, mounted only while hovered. Resize repaints synchronously (blink fix). Reduced-motion → one static frame, no loop. |
| `DomeGallery` | `work/WorkHeroSection` | `paused` prop shares bookkeeping with its own IO pause; `desktopDirection` md+ only. Page pauses it via IO on `#work-showcase` with `rootMargin "0px 0px -1px 0px"` — the −1px is load-bearing. |
| `CarouselDots` | Blog, Testimonials, RelatedArticles, brand-strategy Process/Showcase | Pass `loop` when the track repeats. The 6 px dot is a `<span>` inside a 44 px-tall button with padding cancelled by negative margins (touch target without changing the row); `about/OurTeamSection` and `OurValuesSection` use the same pattern on their own dots. Inner dots still fail Lighthouse target-size (14 px apart → hit areas overlap); passing needs a wider visual gap. |
| `DynamicButton` | both Headers | Glow layers are `rounded-[inherit]` — never hard-code a radius (hairline bug). |
| `resizable-navbar` (ui) | `layout/Header` | Dropdown-pill mobile mode, `renderCardTitle` two-line titles, white services panel (panel mirrored into `page/resizable-navbar` 2026-09-04 — keep the two in step). |
| `button`, `carousel` | carousel ← OurTeamSection, FooterInteractiveClocks | Stock shadcn. `button` only reachable via `carousel`. |

## Risks & gotchas

### Dead code you will trip over
- **56 dead service component files** (7 folders). They still compile, still lint, still get grepped. `AgencyStats` is unused even in brand-strategy. `SubServices`' `children` prop + `z-40` wrapper are dead (ProcessSection is a sibling on every route).
- Dead bits inside live files: `ContactSection.tsx:48` `GRID_COLUMNS`; `StatsSection.tsx:30` `isMobile` (always false inside a min-768 matchMedia); `blog.ts:11` `PostCategory`; empty spacer `blog/page.tsx:35`; `{/* hello */}` leftovers `ScrollAnimator.tsx:73,255`.
- Loose types: `contact/page.tsx:28` `({}: any)`; `type Props = {}` in about/brand-strategy pages.
- **Contrast rule of thumb** (all measured by Lighthouse): on black use `zinc-400` (8.3:1), never `zinc-500` (4.26:1); on white use `zinc-600` (7:1), never `zinc-400` (2.5:1) or `zinc-500` (4.35:1); muted white on black is `white/50` (5.3:1), not `white/40` (3.65:1). Eyebrow labels on black sections now follow this.

### Two Header components — edit the right one
| File | Navbar | Used by |
|---|---|---|
| `layout/Header.tsx` | `ui/resizable-navbar` | **`/home` only** via `home/Herosection.tsx:7` |
| `page/Header.tsx` (`onDark`, `dropdown` props) | `page/resizable-navbar` | **all other routes**, rendered at page level; `onDark` on `/contact`, `/work`, `/work/[slug]` |

The two navbar files still differ in props and behaviour: `page/` has `onDark` + `floating` and shows the scrim only when the hovered item has a dropdown; `ui/` has `visible` and always-scrim. **The desktop Services dropdown panel is identical in both since 2026-09-04** (`renderCardTitle`, white→#efefef cards, `bg-black/35` scrim, arrow bottom-left), and both Headers carry the same 8 `dropdownItems` in the same order with local `/assets/*` images. Shared mechanism in both: passive scroll listener + `style.translate` + 8 px direction threshold, **no `backdrop-blur` on the fixed mobile bar** (re-blurred every frame over video), `will-change` deliberately off. **Any navbar fix lands twice.**

### Scroll-fragile code
1. **`home/ScrollAnimator.tsx`** — three `pin:true, pinSpacing:false` + `endTrigger` pins (about→portfolio `:91`, stats→services `:115`, testimonials→contact `:140`) with scrub scale tweens, all inside one `mm.add("(min-width: 768px)")`; the `md:-mt-[100vh]` at `:222` pulls the z-20 block over the pinned portfolio. **No `invalidateOnRefresh`** on these (Portfolio's own trigger has it). Any height change in About/Portfolio/Stats/Services shifts the overlap. Depends on `.stat-inner` (StatsSection) and the z-ladder 0/10/20/30.
2. **`home/PortfolioSection.tsx`** — desktop pinned horizontal scrub (`end: totalWidth + innerHeight` hold, custom snap quantised to the x-phase only, 6 s auto-advance via `st.scroll()` cancelled by any input). Panel count = `querySelectorAll(".project-panel")` (title slide has no `projects[]` entry). Mobile: native snap + compositor-transform autoplay (`MOBILE_FIRST_SLIDE_MS 10000`, `MOBILE_AUTOPLAY_MS 5000`, `MOBILE_SLIDE_MS 600`), timers not `transitionend`.
3. **`brand-strategy/SubServices.tsx` + `SubServiceCard.tsx`** — sticky card stack. `STEP=160` exported from `SubServiceCard.tsx:17` and imported by the parent (**one place**). Card pin `top: 215px` = header sticky `-top-16` (−64) + 279 px header box, so header and card 1 freeze together. Card 1 has `+40px marginBottom`, card 2 `marginTop:-100px`; **all other margins must stay uniform** — sticky containment clamps by the margin box and any per-card difference desyncs the 160 px strips (learned by reverting twice). Constants `BASE_HEIGHT 2659`, `EXTRA_TAIL 300`, `POST_STACK_SCROLL 450`; `SUBSERVICES_STICK_TOP` is exported and applied by every service page as inline `top`. `useScroll` offset `["start start","end start"]` — not `"end end"`. Wraps content in `<ReactLenis root>` **on desktop only** — the section owns page-global smooth scroll on all 8 service routes.
4. **Route-level magic sticky tops** with no comments: `/about` `md:top-[calc(100vh-1104px)]`/`994px`, `/career` `1200px`/`1216px`, `/blog` `856px`, `/work` `4096px`, `/contact` `-56px`, services `min(0px,calc(100vh-1056px))`. Plus `-mb-[Nvh]`/`pb-[Nvh]` pin-spacer pairs and three `-mt-px` seam fixes in `career/page.tsx:42-60`. Change a section's height → re-measure these.
5. Route-level `[&>section]` gap rules on about/contact/work outrank component padding (same comment in all three) — keep in step.
6. **Closing line under the last SubServices card** lives in `brand-strategy/ProcessSection.tsx:58-71` (`max-md:before:`), not on the card — `#process-overlap` (`bg-black max-md:-mt-px z-20`) occludes the card's last pixel row.

### Cross-component couplings
- `blog:filter` window event (BlogHeroSection → BlogListSection), stringly typed, no shared constant.
- `ShrinkOnOverlap` `endSelector` ids listed above.
- `createPortal` cursor pill in `home/ServiceSection.tsx` (`dependencies:[mounted]` on `useGSAP`).
- SVG id namespaces: `showcase-cta-grad-${id}`, `subservice-arrow-${i}`, `#icon-gradient` (ContactFaqSection, rendered on `/contact` and `/work/[slug]`) — collide if a component mounts twice on a page.
- `--logoloop-seq` CSS var written by LogoLoop JS, read by `globals.css:92`.
- `--spotlight-cols` etc. CSS vars override SpotlightGrid shape per breakpoint (`brand-strategy/CtaSection.tsx:22`).

### Lenis, twice
- `layout/SmoothScroll.tsx` — `/home` only, desktop only, wired into GSAP ticker + ScrollTrigger.
- `<ReactLenis root>` in `brand-strategy/SubServices.tsx:163` — every service route, desktop only, no ScrollTrigger sync (ShrinkOnOverlap on those pages runs off native scroll events **[?]** — not verified against Lenis).

### iOS / mobile
- `globals.css:46-79`: `touch-action: manipulation` on controls, `cursor:pointer` on body for coarse pointers, hover-pause only under `(hover:hover)` — all iOS tap-loss mitigations that **were not sufficient**; `IosClickRescue` is the real fix.
- `backdrop-filter` over a playing video re-blurs every frame. Static blur on an image is fine.
- `ProjectShowcase`/`BlogCard`/`ProjectCard` hover flags are gated by `isDesktop`/`matchMedia` so the first tap isn't swallowed as hover.
- `.jfif` assets (`meet.jfif`, `offer.jfif`) — **[?]** `next/image` should serve them as JPEG, but a CDN sending `application/octet-stream` would make the optimizer bail; renaming to `.jpg` removes the doubt.

### Verifying motion in the preview pane
The in-app preview does not composite: rAF is frozen, timers ~4× slow, IO never fires, framer/GSAP never advance. Verify **structurally** (computed styles, `playState`, `scrollLeft` after a timeout, arithmetic from source) and say plainly when frame rate was not measured. The user verifies visuals from screenshots and a phone against a **prod build** (dev ships ~22× more JS).

### Traps that bit more than once (from the log)
- **Dev-CSS Tailwind scan flake**: a new arbitrary class (`mb-30`, `text-[21px]`) can be absent from dev CSS while present in the build — diff dev vs built CSS before blaming code. Escape `%` when grepping CSS.
- Stale `next start` servers survive `pkill` and serve old chunks.
- Heredocs from python/perl write Windows-codepage bytes; em dashes become 0x97 and Turbopack dies ("failed to convert rope into string"). Use explicit UTF-8.
- `grep -r` times out on node_modules — use `git grep`.
- A rejected/interrupted Edit may still have landed — check the file.
- Resizing the pane without reloading leaves breakpoint-at-mount components in desktop state.
- The user's "it's not fixed" has three times been a stale build/Vercel lag; confirm which URL they're viewing.

### Perf baselines (prod `/home`)
**Lighthouse mobile, local, simulated throttling, 2026-09-25 — see SESSION_LOG for before/after.** Baseline before that day's fixes: perf 59, LCP 5.0 s, TBT 500 ms, main-thread 11.8 s, DOM growing without bound (LogoLoop loop). The listed polyfills (`Array.prototype.at`, `Object.hasOwn`, …, ~13 KB) live in Next's own vendor chunk and are not removable by `browserslist`.

(2026-08-27)
307 KB JS / 11 requests. Prerendered-HTML sizes used as no-UI-change fingerprints: home 323,818 · about 448,535 · career 470,606 chars. Desktop `bodyScrollHeight` 17,137; mobile /home `bodyH` 9,885; /brand-strategy mobile 9,006. `next/dynamic` wrappers around sections **cost** 4 renders per component — reverted; don't reintroduce.

## Repo state (2026-09-04)
- Branch `main`, remote `guptaRishi00/Softexedge-2026-draft-one`. **Every one of 100+ commits is titled "first commit"** — no usable history; `SESSION_LOG.md` is the only changelog. Last push 2026-08-28 (`127d54f`); Vercel lags localhost.
- **Working tree is dirty**: `M src/components/career/ApplicationJourney.tsx`, `M src/components/career/CareerHeroSection.tsx` (6 Unsplash URLs → local `/assets/*`), `M bun.lock` (**line endings only**, no content change), 7 untracked images. This is the start of a Unsplash→local asset migration; career is done, nothing else is, and it is **not logged**.
- Baselines: `bunx tsc --noEmit` clean · `bun run build` 35/35 · `bun run lint` 321 errors / 47 warnings.
- Nothing is committed or pushed unless the user asks.

## Open questions

### Needing your call (2026-09-04)
1. **Delete the 56 dead service component files?** (`src/components/{7 folders}/`, byte-identical, zero importers, confirmed by grep + build.) They were kept "for minimal diff" when the routes were repointed. Also `brand-strategy/AgencyStats.tsx` (unrendered) and `SubServices`' dead `children` path.
2. **The Unsplash→local migration** — commit the career half? Continue with the rest (brand-strategy SubServices/Process/Showcase/Hero ~15, blog/projects data ~20, OurTeam/OurValues avatars, DomeGallery defaults)? Rename `.jfif` → `.jpg`?
3. **Resume the interrupted asset cleanup** (`public/assets` has ~40 files referenced by nothing — **[?]** count not re-verified today)? Needs an approved list; 7 files are untracked so deletion is unrecoverable.
4. `package-lock.json` alongside `bun.lock` — remove it? (**[?]** assumed stray.)
5. `tel:+18001234567` in ContactSection — real number or placeholder?

### Carried forward, still unresolved
- A. Delete `video7.mp4.orig` (20.9 MB) + `video3.mp4.orig`.
- B. Dedupe the two navbar files (every fix lands twice).
- C. Re-encode `video1.mp4` (10.3 MB, `/about`) like video7 — blocked: no ffmpeg on this machine.
- Wire the dead forms (contact, newsletter) — site has no lead capture.
- Uninstall `prettier` + `prettier-plugin-tailwindcss`.
- Unify nav into one Header in `layout.tsx`.
- SEO: OG/twitter tags site-wide, `/` in sitemap, `lastModified`; confirm `softexedge.com` is the production domain.
- Commit hygiene: real commit messages; push.
- Prune `.claude/plan*.md` (all 5 are finished or superseded) and rotate the 1.6 MB `SESSION_LOG.md`.
- Never answered: is the Safari being tested macOS or iPadOS (log line ~20,248)?
- Parameterise the service content (`src/data/services.ts`) so the 7 non-brand-strategy routes stop showing brand-strategy's copy — **[?]** the routes currently render identical service *content* under different titles; confirm that is known/intended for now.
