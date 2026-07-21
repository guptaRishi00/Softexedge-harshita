# Plan — remaining service pages mirrored from /brand-strategy

(Previous plan.md — the never-approved TracingBorder handoff fix — is archived as
`plan-tracingborder-handoff.md`.)

## Goal
Every service in the header dropdown gets its own page that is design-identical
to /brand-strategy, backed by its own component copies so each page can diverge
later. Mirrors exactly how /web-development was created.

## Reality (verified)
- Header dropdown lists 8 services. Only 2 have real routes:
  `/brand-strategy`, `/web-development`. The other 6 point at those as placeholders.
- `src/components/web-development/*` is a **byte-identical** copy of
  `src/components/brand-strategy/*` (`diff` empty) — so "same to same" = literal copy.
- Each folder holds 8 components: AgencyStats, CtaSection, FaqSection, OurTechStack,
  ProcessSection, ProjectShowcase, StrategyHeroSection, SubServices.
  (AgencyStats is used *inside* StrategyHeroSection, the other 7 by the page.)
- SVG gradient ids (`cta-icon-grad`, `icon-gradient`) repeat across folders, but each
  page imports only its own folder, so there is no same-page id collision. Same as the
  existing web-development copy — no renaming needed.

## New routes (6)
| Dropdown service | slug |
|---|---|
| Digital Marketing & Growth | `digital-marketing` |
| AI & Marketing Automation  | `ai-marketing-automation` |
| App Development            | `app-development` |
| Custom Software & SaaS     | `custom-software` |
| UI/UX Design               | `ui-ux-design` |
| Video Production           | `video-production` |

## Steps
1. For each slug: copy `src/components/brand-strategy/` → `src/components/<slug>/`
   (byte-identical, via `cp` so the design is guaranteed "same to same").
2. For each slug: create `src/app/<slug>/page.tsx` mirroring
   `src/app/brand-strategy/page.tsx` composition exactly (StrategyHeroSection,
   SubServices>ProcessSection, OurTechStack, ProjectShowcase,
   ExperimentalTestimonials, TechLogoCarousel, p-3 CtaSection,
   space-y-10 [FaqSection, BlogSection], p-3 Footer) with imports pointed at
   `@/components/<slug>/` and a uniquely named default export.
3. Re-link the dropdown in **both** headers (`page/Header.tsx` + `layout/Header.tsx`
   — the duplicate-nav pair) so each service points at its own new route.
4. Verify: `bunx tsc --noEmit`, biome on new files, and load all 6 routes live
   asserting the hero + section set render (200, not 404).
5. Update `.claude/CODEBASE_MAP.md` (6 new routes + component folders) and append
   `.claude/SESSION_LOG.md`.

## Constraints
- Design identical to brand-strategy (no content divergence) — that is the ask
  ("same to same"); per-page copy can be edited later independently.
- Don't touch brand-strategy / web-development.
- Don't commit.
