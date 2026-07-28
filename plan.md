# Plan: add the site's scroll-entry animation where it is genuinely missing

## Audit (measured, not assumed)
- **68 component files already use `whileInView`** — the convention is well established.
- Canonical shape (most common across the site):
  ```jsx
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.6, ease: premiumEase }}   // premiumEase = [0.16, 1, 0.3, 1]
  ```

## Deliberately EXEMPT (not gaps — verified, do not touch)
| Category | Why |
|---|---|
| All `*HeroSection` / `ProjectHero` (10 files) | above the fold; already animate on MOUNT via `initial`/`animate`. Scroll-entry is wrong here. |
| `PortfolioSection`, `ServiceSection`, `StatsSection` | GSAP/ScrollTrigger-animated (confirmed: 8–16 gsap refs each) |
| `NextProject`, `BlogArticle`, `OurTeamSection` carousel, `RelatedArticles` marquee | already scroll-driven via `useScroll`/`useTransform` |
| Cards & sub-parts (`ProjectCard`, `BlogCard`, `QuoteCard`, `ChannelCard`, `Counter`, `InfiniteRow`, `EdgeToEdgeCarousel`, `RotatingWord`, `CarouselCard`) | animated by parent or on hover |
| `Header`, `resizable-navbar`, `ui/` primitives | chrome / primitives |

## Real gaps to fix
| # | File(s) | What's missing | Route |
|---|---|---|---|
| G1 | `*/ProjectShowcase.tsx` × 8 service dirs | section header (eyebrow `<span>`, `<h2>`, `<p>`) are plain elements with no entry animation. 7 of 8 are byte-identical (md5 `9d017973b2a9`); `brand-strategy` differs. | opus (multi-file coherence) |
| G2 | `about/OurTeamSection.tsx` | `<h2>` at :130 + its eyebrow have no entry animation (carousel below is already scroll-driven) | sonnet |
| G3 | `blog/RelatedArticles.tsx` | `<h2>` at :139 + eyebrow have no entry animation | sonnet |
| G4 | `blog/ArticleBlock.tsx`, `ShareRail.tsx`, `TableOfContents.tsx` | zero framer-motion; blog article body sections appear with no entry | sonnet |

## Constraints (echo into every brief)
- Import/reuse the file's existing `premiumEase` if present; else `[0.16, 1, 0.3, 1]`.
- `viewport={{ once: true, margin: "-50px" }}` — never re-trigger.
- Convert existing elements to `motion.*` **in place**; do NOT add wrapper divs (they can change layout/height — several pages have stick lines derived from measured pixel heights).
- No layout/spacing/copy changes. No new dependencies. Codebase has NO comments — add none.
- Stagger only via `transition.delay` on siblings (≤0.15s steps), matching existing usage.

## Flagged, NOT doing without approval
- `home/Herosection.tsx` has **no entry animation at all** (no framer, no GSAP) — but it is the homepage hero, above the fold. The right fix is a MOUNT animation like the other heroes, not scroll-entry. Prominent visual change → asking first.

## Verification per step
`bunx tsc --noEmit` exit 0; per-file biome vs HEAD worktree unchanged; live check that the target elements exist and carry framer's inline `opacity/transform` at rest.
