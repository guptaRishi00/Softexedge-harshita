# About page — mobile responsiveness

Scope: `/about` below `md` only. Desktop (≥768px) must be byte-identical in
computed output. Reference conventions come from the homepage work already in
`SESSION_LOG.md`.

## Homepage conventions being ported

| Token | Homepage mobile value |
|---|---|
| section x-padding | `max-md:px-3` (12px) |
| eyebrow / tag | `max-md:text-xs` (12px) |
| section h2 | `max-md:text-[2.5rem]` (40px) |
| body copy | `max-md:text-lg` (18px) |
| carousel arrows | 40×40, `active:` not `hover:`, visible on mobile |
| overlap/pin machinery | `md:`-gated (`md:-mt-[100vh]`, GSAP in `min-width:768px`) |

## Findings from the live audit @390px

| # | Severity | Finding | Evidence |
|---|---|---|---|
| 1 | **P0** | Hero stats row is painted **under** the black section — invisible on mobile | `statsRowTop: 624` vs `nextSectionTop: 353`, `statsClippedByNextSection: true` |
| 2 | **P0** | Sticky offsets hard-code desktop heights | hero `top:-260px` for a 1253px block (149px lost); culture `top:-150px` for a 1437px block (443px lost) |
| 3 | P1 | Hero top padding 192px (`pt-48`) | `innerPaddingTop: "192px"` |
| 4 | P1 | All four h2 at 48px vs homepage's 40px | traditional/culture/team all `h2FontSize: "48px"` |
| 5 | P2 | Tags 14px vs homepage 12px | `tagFontSize: "14px"` ×3 |
| 6 | P2 | x-padding 16px/24px vs homepage 12px | `containerPaddingX: "16px"`, hero `24px` |
| 7 | P2 | Team carousel auto-scrolls with **no** arrows on mobile | `arrowsVisible: 0` |
| 8 | P2 | Culture quote card `p-8` (32px) cramped at 390px | `quoteCardPadding: "32px 32px"` |

## Steps

| # | Step | Files | route |
|---|---|---|---|
| 1 | `md:`-gate the two sticky/negative-margin overlap groups so mobile flows normally (fixes #1, #2) | `src/app/about/page.tsx` | driver |
| 2 | Hero: mobile padding + type scale (#3, #6) | `src/components/about/AboutHeroSection.tsx` | driver |
| 3 | AboutTraditional: h2/tag/padding (#4, #5, #6) | `src/components/about/AboutTraditional.tsx` | driver |
| 4 | OurValuesSection: h2/tag/padding/quote card (#4, #5, #6, #8) | `src/components/about/OurValuesSection.tsx` | driver |
| 5 | OurTeamSection: h2/tag + mobile arrows (#4, #5, #7) | `src/components/about/OurTeamSection.tsx` | driver |
| 6 | Verify @390 / @767 / @1265; build + lint | — | driver |

## Routing note — read before approving

**Every step is routed `driver`, which breaks the ≤20% budget. I think that is
correct here and want to flag it rather than pad the plan to hit the number.**

`/worker` pays when cheap tokens absorb bulk labor. This task is the inverse:
each step is 3–8 Tailwind class edits, but *which value* to pick is the entire
task, and the values must stay consistent across five files against a table of
homepage conventions. A brief specifying the exact classes to write is longer
than the diff — fan-out measures at 2.6–5.9× tokens and is never faster, so it
would cost more for a worse result.

**Recommendation: run this as plain `/task`.** If quota is the binding
constraint, say so and I will re-cut steps 2–5 as sonnet briefs with the
conventions table inlined — that is the version where delegation pays.

Awaiting approval before any edit.
