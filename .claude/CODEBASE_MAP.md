# softexedge-may-2026 — Codebase Map
_Last updated: 2026-06-18_

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
- **Font:** Satoshi Variable, local via `next/font` (`public/fonts/Satoshi-Variable.woff2`)

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
- `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge)
- `public/assets/` — images, `hero.mp4`, logos; `public/fonts/` — Satoshi

## Surfaces
All routes are public (static marketing pages, no auth anywhere).

| Name | Type | File:Line | Auth | Purpose |
|---|---|---|---|---|
| Home (redirect) | Route | `src/app/page.tsx:3` | public | Redirects `/` → `/home` |
| HomePage | Route | `src/app/home/page.tsx:31` | public | Main landing: hero, logos, about, portfolio, stats, services, testimonials, contact, blog |
| AboutPage | Route | `src/app/about/page.tsx:27` | public | About: hero, traditional, culture (OurValuesSection), team, testimonials (+LogoCarousel), FAQ, CTA |
| BrandStrategyPage | Route | `src/app/brand-strategy/page.tsx:15` | public | Service page: hero, sub-services, process, tech stack, showcase, FAQ, blog |
| ContactPage | Route | `src/app/contact/page.tsx:11` | public | Contact: hero, contact form, testimonials, FAQ, CTA |
| CareerPage | Route | `src/app/career/page.tsx:11` | public | Careers: `CareerHeroSection` → `WhyJoinUs` → `OpenPositions` (accordion job board) → `ApplicationJourney` (sticky-deck process) → `CareerValues` (image cards) → `Footer` (components in `src/components/career/`) |
| WorkPage | Route | `src/app/work/page.tsx:9` | public | Work/portfolio: `WorkHeroSection` (Strands WebGL bead in the title, stat counters) + `WorkProjectShowcase` (components in `src/components/work/`) |

## Data
None. No storage, schema, API calls, or env vars consumed by app code.
Remote images allowed from `images.unsplash.com`, `plus.unsplash.com`,
`randomuser.me` (`next.config.ts` `remotePatterns`).

## Assets
- Source/static served from `public/assets/` (referenced by `/assets/...` paths)
- Local font: `public/fonts/Satoshi-Variable.woff2` → CSS var `--font-satoshi`
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
  - Three `shared/ConnectButton*.tsx` variants exist
- **No Header in `layout.tsx`** — each hero section imports its own Header. There is no shared/global nav.
- **SmoothScroll (Lenis) only on `/home`** — inner pages scroll natively; inconsistent feel.
- **Default boilerplate metadata** in `layout.tsx` (`title: "Create Next App"`); no per-page metadata or OG tags — SEO gap for a marketing site.
- **Loose types:** empty `type Props = {}` in pages; `ContactPage({}: any)`.
- **No tests, no CI.**
- `structure.txt` and `tsconfig.tsbuildinfo` exist; `structure.txt` is gitignored.

## Open questions
- Is `src/components/garbage/` intentionally kept (scratch/reference) or safe to remove?
- Should navigation be unified into one shared Header in `layout.tsx`?
- Is the contact form meant to submit anywhere (needs a backend/form service)?
- Intended production domain / real site metadata + SEO content?
