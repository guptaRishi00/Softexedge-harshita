# Plan: Extract in-file subcomponents into their own files

## Goal
Every rendered, non-duplicated section file that defines more than one
component gets its subcomponents moved to sibling files (same folder — the
codebase's flat-folder convention), imported back into the parent. **Zero
UI/animation change** — the moved JSX/logic must be byte-identical; only
imports/exports and (where forced) prop-type declarations may differ.

## Hard rules (echoed into every brief)
1. Moved component bodies byte-identical to the original (whitespace-level).
   Only allowed deltas: `export` keyword, import lines, and prop types where
   the original type referenced a parent value (see per-step notes).
2. Imports point parent → child only. NEVER child → parent (cycle). If the
   child needs a constant/type the parent also uses, MOVE it to the child
   file and have the parent import it from there.
3. New files: `"use client"` if the component uses hooks/motion/handlers.
4. No renames, no reformatting of untouched code, no comment rewrites.
5. Acceptance per step: `bunx tsc --noEmit` exit 0; biome diagnostics on the
   changed+new files (LF-normalised) introduce nothing new vs HEAD baseline;
   grep proves the parent no longer defines the extracted component.

## Out of scope (deliberate)
- `garbage/` (dead code — CLAUDE.md hard rule), the 14 unreferenced `ui/`
  effects, `ui/3d-globe.tsx` (unreferenced).
- `ui/carousel.tsx`, `ui/resizable-navbar.tsx`, `page/resizable-navbar.tsx`
  — shadcn-style multi-export library files; that pattern is idiomatic and
  splitting them risks the nav on every page.
- The 7 duplicated service folders (`ai-marketing-automation` … `web-development`):
  their `SubServices`/`ProjectShowcase`/`AgencyStats` each define 2 components,
  but refactoring 21 byte-identical copies would double the duplication
  problem (map: the real fix there is de-duplication, an open question).
  Only the divergent original `brand-strategy/` is in scope.

## Steps

| # | File | Extract → new file(s) | route | Notes |
|---|---|---|---|---|
| 1 | `home/AboutSection.tsx` | `RotatingWord` → `home/RotatingWord.tsx` | sonnet | Self-contained (props-only). |
| 2 | `blog/BlogListSection.tsx` | `BlogCard` → `blog/BlogCard.tsx` | sonnet | Move `smoothSpring` const with it if BlogCard-only; parent keeps `premiumEase`. `BlogPost` type imported from `@/data/blog` in both. |
| 3 | `work/WorkProjectShowcase.tsx` | `ProjectCard` → `work/ProjectCard.tsx` | sonnet | Move any const used only by the card. |
| 4 | `work/ProjectDetailsContent.tsx` | `Section` → `work/ProjectSection.tsx` | sonnet | File named `ProjectSection.tsx` to avoid a generic `Section.tsx`. Component name stays `Section`. |
| 5 | `about/AboutHeroSection.tsx` | `Counter` → `about/Counter.tsx`, `EdgeToEdgeCarousel` → `about/EdgeToEdgeCarousel.tsx` | sonnet | Two files, one step. |
| 6 | `home/ContactSection.tsx` | `ChannelCard` → `home/ChannelCard.tsx` | opus | Props are typed `(typeof channels)[number]` — referencing the parent's data value. Child must declare an explicit prop interface with identical fields; parent's `channels` data stays put. Move `boxyCellIds`/grid consts if card-only. Cycle-avoidance care → opus. |
| 7 | `brand-strategy/SubServices.tsx` | `Card` → `brand-strategy/SubServiceCard.tsx` | opus | `STEP`, `contentContainer`, `contentItem` used by Card; `STEP` ALSO used by parent (tracker pinTop, reserve height). Move `STEP` into the child and export it; parent imports `{ STEP }` from the child (parent→child only). Scroll-fragile file (map) → opus. |
| 8 | `career/CareerHeroSection.tsx` | `QuoteCard` → `career/QuoteCard.tsx`, `CarouselCard` → `career/CarouselCard.tsx`, `InfiniteRow` → `career/InfiniteRow.tsx` | opus | `CarouselItem` type shared by parent data + CarouselCard + InfiniteRow: move it into `CarouselCard.tsx`, export it; others import from there. QuoteCard carries its mask/grid consts + single-line biome-ignore comments verbatim. 3-file coherence → opus. |
| 9 | `blog/BlogArticle.tsx` (707 lines) | `Block` → `blog/ArticleBlock.tsx`, `ShareRail` → `blog/ShareRail.tsx`, `TableOfContents` → `blog/TableOfContents.tsx`, `RelatedArticles` → `blog/RelatedArticles.tsx` | opus | Largest file. Shared consts (`premiumEase`, variants): move to the child if single-user, otherwise keep in parent AND redeclare in child only if forced — prefer moving; never child→parent import. Types from `@/data/blog`. 4-file coherence → opus. |
| 10 | Done gate | full `next build` + `spec-verifier` over plan + diff | driver | Judgment: verifying zero-render-change claims. |

Routing split: 5 sonnet / 4 opus / 1 driver (the done gate) — driver ≤20% ✓.

## Verify (done gate)
- `bunx tsc --noEmit` exit 0; `npx next build` exit 0.
- Per changed file: biome diagnostic count (LF-normalised) vs `git show HEAD:` baseline — no new findings; new files clean.
- Grep: no parent still defines its extracted component(s); no child imports from its parent.
- spec-verifier confirms moved bodies are byte-identical, max 3 rounds.
