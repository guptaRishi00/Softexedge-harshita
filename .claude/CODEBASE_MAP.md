# softexedge-may-2026 — Codebase Map
_Last updated: 2026-07-10_

## Identity
Marketing/agency website for **SoftexEdge**. Frontend-only, animation-heavy
brochure site — no backend, API, database, or auth. Focus is visual polish:
scroll-driven GSAP animations, WebGL/Three.js effects, smooth scrolling.

- **Framework:** Next.js 16.2.5 (App Router) + React 19.2.4, React Compiler enabled
- **Language:** TypeScript 5 (strict), `"@/*"` → `./src/*`
- **Min runtime:** Next 16 / React 19 (modern Node; project uses Bun)

## Stack & build
- **Package manager:** Bun (`bun.lock`). npm also works.
- **Bundler/build:** Next.js (Turbopack-era 16), PostCSS + Tailwind CSS v4
- **Lint/format:** Biome 2.2.0 (`biome.json`) — also Prettier + prettier-plugin-tailwindcss present
- **Animation:** GSAP + ScrollTrigger, Framer Motion, Lenis (smooth scroll)
- **3D/WebGL:** Three.js + @react-three/fiber/drei, ogl, postprocessing
- **UI libs:** Radix slot, Embla carousel, Tabler/Lucide/react-icons
- **Font:** Satoshi Variable — self-hosted via `@font-face` in `globals.css` (`public/fonts/Satoshi-Variable.woff2`), set as `--font-sans` default (no `next/font`)

## Commands
| Action | Command |
|---|---|
| Run dev | `bun dev` (or `npm run dev`) → http://localhost:3000 |
| Run all tests | _none — no test setup_ |
| Run one test | _n/a_ |
| Lint | `bun run lint` (`biome check`) |
| Format | `bun run format` (`biome format --write`) |
| Typecheck | `npx tsc --noEmit` (passes clean as of map date) |
| Build | `bun run build` (`next build`) |
| Start (prod) | `bun run start` |

## Bootstrap flow
`src/app/layout.tsx` (RootLayout, loads Satoshi font + globals.css) →
route `page.tsx` files. `/` redirects to `/home`. Each page composes section
components and includes its own `<Footer>`. GSAP plugins registered per-page
behind `typeof window !== "undefined"` guards.

## Directory layout
- `src/app/` — App Router routes (`page.tsx` per route), `layout.tsx`, `globals.css`
- `src/components/home|about|brand-strategy|contact|career|work/` — page-specific section components
- `src/components/ui/` — reusable visual/WebGL effects + base UI (button, carousel, navbar)
- `src/components/layout/` — Header, Footer, SmoothScroll (Lenis wrapper)
- `src/components/page/` — **second** Header + resizable-navbar (used by inner pages)
- `src/components/shared/` — ConnectButton variants (3 of them)
- `src/components/garbage/` — **DEAD CODE**, 24 files, nothing imports it
- `src/data/` — static content modules (`blog.ts`, `projects.ts`)
- `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge)
- `public/assets/` — images, `hero.mp4`, logos; `public/fonts/` — Satoshi

Notable shared `ui/` components (added recently): `TracingBorder` (the
comet border that traces once on hover — used by blog + work cards),
`TechLogoCarousel` (tech-stack logo marquee shown under `ExperimentalTestimonials`
on every page), `DomeGallery` (has an opt-in `autoRotate`/`autoRotateSpeed`).

## Surfaces
All routes are public (static marketing pages, no auth anywhere).

| Name | Type | File:Line | Auth | Purpose |
|---|---|---|---|---|
| Home (redirect) | Route | `src/app/page.tsx:3` | public | Redirects `/` → `/home` |
| HomePage | Route | `src/app/home/page.tsx:32` | public | Main landing: hero, Trusted-By logo loop, about, portfolio, stats, services, testimonials (+`TechLogoCarousel`), contact, blog |
| AboutPage | Route | `src/app/about/page.tsx:14` | public | About: hero, traditional, culture (OurValuesSection), team, testimonials + `TechLogoCarousel`, FAQ, CTA |
| BrandStrategyPage | Route | `src/app/brand-strategy/page.tsx:16` | public | Service page: hero, sub-services, process, tech stack, showcase, testimonials + `TechLogoCarousel`, CTA, FAQ, blog |
| ContactPage | Route | `src/app/contact/page.tsx:12` | public | Contact: hero, `ContactSection` form, testimonials + `TechLogoCarousel`, FAQ, CTA |
| CareerPage | Route | `src/app/career/page.tsx:11` | public | Careers: `CareerHeroSection` → `WhyJoinUs` → `OpenPositions` (accordion job board) → `PerksSection` (benefit cards) → `OurTeamSection` → `ApplicationJourney` (sticky-deck) → Footer. (`CareerValues` present but commented out.) |
| WorkPage | Route | `src/app/work/page.tsx:10` | public | Work index: `WorkHeroSection` (rotating colour `DomeGallery` bg + black overlay + `<Header onDark/>`, stat counters) + `WorkProjectShowcase` (cards → `/work/<slug>`, `TracingBorder` hover) |
| WorkProjectPage | Route | `src/app/work/[slug]/page.tsx:22` | public | Per-project case study. SSG via `generateStaticParams` over the 8 `projects` (`data/projects.ts`); unknown slug → `getProjectBySlug` → 404. `<Header onDark/>` + `ProjectHero` → `ProjectDetailsContent` → `NextProject` + Footer |
| BlogPage | Route | `src/app/blog/page.tsx:7` | public | Blog index: `BlogFeaturedSection` (featured post + Header) → `BlogListSection` (filterable grid, excludes the featured post) → CTA → Footer. `BlogHeroSection` (DomeGallery) is orphaned. |
| BlogArticlePage | Route | `src/app/blog/[slug]/page.tsx:36` | public | Per-article read page. SSG via `generateStaticParams` over the 6 slugs (`dynamicParams=false` → unknown slug 404s); per-post `generateMetadata`. `BlogArticle` (hero, cover, sticky share rail + prose blocks, tags, author bio, related) + `CtaSection` + Footer |

## Data
No backend/storage/API. Two static content modules in **`src/data/`**:
- **`blog.ts`** — 6 typed `BlogPost`s (`ContentBlock` union, `categories`) +
  `getPostBySlug` / `getRelatedPosts`. Consumed by `BlogListSection` and
  `/blog/[slug]`.
- **`projects.ts`** — 8 typed `Project`s + `getProjectBySlug`. Consumed by
  `/work/[slug]`. **Gotcha:** `WorkProjectShowcase.tsx` has its OWN inline
  `projects` array (the listing cards) that must stay in sync with `data/projects.ts`
  (the detail pages) — same 8 slugs, duplicated.

No env vars. Remote images allowed from `images.unsplash.com`,
`plus.unsplash.com`, `randomuser.me` (`next.config.ts` `remotePatterns`).

## Assets
- Source/static served from `public/assets/` (referenced by `/assets/...` paths)
- Local font: `public/fonts/Satoshi-Variable.woff2` → `@font-face` in `globals.css`, exposed as `--font-sans`
- `next/image` used for remote (unsplash) and local images

## External services
None wired. No SDK keys, no analytics, no form backend (contact form is UI-only).

## Conventions
- **Client components:** most sections are `"use client"` (animation/interaction heavy)
- **Styling:** Tailwind v4 utility classes; merge via `cn()` from `@/lib/utils`
- **Imports:** `@/` alias for `src/`; sections imported into route `page.tsx`
- **Composition:** each route page assembles section components + its own Footer
- **GSAP:** register plugins guarded by `typeof window !== "undefined"`; animations via `useGSAP`

## Where to add a thing
- **New page:** add `src/app/<route>/page.tsx`; compose from `src/components/<route>/`
- **New section:** add to `src/components/<pageName>/`, import into the route page
- **Reusable effect/UI:** add to `src/components/ui/`
- **Nav/footer change:** see duplication gotcha below before editing

## Risks & gotchas
- **`src/components/garbage/` is fully unused dead code** (24 files). Safe to delete; nothing outside it imports it.
- **Duplicate navigation components — edit the right one:**
  - `layout/Header.tsx` + `layout/SmoothScroll.tsx` → used by `/home` only (via `home/Herosection.tsx`)
  - `page/Header.tsx` + `page/resizable-navbar.tsx` → used by `/about`, `/brand-strategy`, `/contact` hero sections
  - `ui/resizable-navbar.tsx` (464 lines) ≈ near-duplicate of `page/resizable-navbar.tsx` (465 lines)
  - `page/Header.tsx` accepts an `onDark` prop → threads to `NavItems`/`CustomLogo`/`MobileNavToggle` in `page/resizable-navbar.tsx` for light links + white logo at the top over a dark hero. `WorkHeroSection` uses `<Header onDark />` (identical hover/scroll/dropdown as other pages).
  - `work/WorkHeader.tsx` — now ORPHANED (work page uses the shared `page/Header` with `onDark`); safe to delete.
  - Three `shared/ConnectButton*.tsx` variants exist
- **No Header in `layout.tsx`** — each hero section imports its own Header. There is no shared/global nav.
- **SmoothScroll (Lenis) only on `/home`** — inner pages scroll natively; inconsistent feel.
- **Default boilerplate metadata** in `layout.tsx` (`title: "Create Next App"`); no per-page metadata or OG tags — SEO gap for a marketing site.
- **Loose types:** empty `type Props = {}` in pages; `ContactPage({}: any)`.
- **No tests, no CI.**
- `structure.txt` and `tsconfig.tsbuildinfo` exist; `structure.txt` is gitignored.
- **Orphaned file:** `src/components/3d-globe-demo.tsx` sits loose at the top of
  `src/components/` and is imported nowhere — safe to delete.

## Open questions
- Is `src/components/garbage/` intentionally kept (scratch/reference) or safe to remove?
- Should navigation be unified into one shared Header in `layout.tsx`?
- Is the contact form meant to submit anywhere (needs a backend/form service)?
- Intended production domain / real site metadata + SEO content?
