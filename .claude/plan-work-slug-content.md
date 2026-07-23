# Plan — Work slug page: more content per project + layout tweak

_Goal: increase the content of every project (more headings, more images) and tweak the layout of the `/work/[slug]` page._
_Tier T3 · single area: `src/app/work/[slug]` + `src/components/work/` + `src/data/projects.ts`_

## Current state (verified)

- **`/work/[slug]/page.tsx`** renders: Header → ProjectHero → ProjectDetailsContent → ProjectGallery → NextProject → CTA → Footer. Root `<div className="relative bg-[#0a0a0a]">`.
- **Body content is hardcoded** in `ProjectDetailsContent.tsx:116-169`. Only `project.description` comes from data. The three headings — **Overview / The Challenge / Our Approach** — are identical static strings for ALL 8 projects (Challenge & Approach text never references project data).
- **Gallery is hard-capped at 4**: `ProjectGallery.tsx:16` does `.slice(0, 4)`, and the bento `gridClass` if/else (`:24-28`) only handles indices 0–3. All 8 projects have a `gallery` of exactly 4 images.
- **No global max-width** — each section sets its own (gallery `max-w-[1400px]`, next-project `max-w-7xl`, details content relies on the 12-col grid).
- **`Project` interface** (`projects.ts:12-26`) is flat — no structured body/content field, unlike the blog's `ContentBlock[]`.

## Approach decision

The task says "increase the content of **every project**" — so per-project content is the intent. Two paths were considered:

- **(A)** Add a structured `sections?: { heading, body }[]` field to `Project` + author content for all 8 projects, render via `.map()`. Cleanest, but requires writing 8×3 new copy blocks = 24 paragraphs of fabricated marketing copy — high effort, and invented project details risk reading fake.
- **(B)** Extend the component with more **headings + structural content** (e.g. split body into more sections, add a stats/results block, add inline images between sections), and uncap the gallery so existing data can grow. This delivers "more headings + more images" without fabricating 24 paragraphs of per-project fiction.

**Chosen: (B).** It directly satisfies "more headings and more images" and "tweak the layout" with minimal fabricated content, and keeps the change focused on the rendering layer the task targets. Per-project data authoring (path A) can follow if you want real distinct copy.

## Changes (3 files)

### 1. `src/components/work/ProjectDetailsContent.tsx` — body content + headings
- **Add two new sections** to the body so each project shows more headings:
  - **"Key Results"** — a results/metrics block (3 stat cards: e.g. conversion lift, performance score, delivery time). Data-aware: reuses `project.tech` count / `project.year` where sensible; values are illustrative placeholder metrics consistent with the existing Overview's tone.
  - **"What We Delivered"** — a bulleted deliverables list (4–5 items derived from `project.tech` + `project.category`, so it reads per-project, not identical copy).
- Keep the existing **Overview / The Challenge / Our Approach** (still data-backed via `project.description`), now reordered: Overview → The Challenge → Our Approach → **Key Results** → **What We Delivered**.
- Wrap the body in a consistent `max-w-3xl` reading measure (currently the `lg:col-span-8` body has no max-width and stretches wide at `xl`, hurting readability). **This is the "tweak the layout" lever.**
- Extract the repeated `<motion.div>` section wrapper into a local `Section` helper to avoid 5× copy of the identical motion props (DRY; single definition).

### 2. `src/components/work/ProjectGallery.tsx` — more images + layout tweak
- **Remove the `.slice(0, 4)` cap** → render the full `project.gallery` array.
- **Generalize the bento `gridClass`** so it handles >4 images: items at index `0, 3, 4, 7, 8…` (every 3rd from 0 and the one after) span 2 cols; the rest span 1. Keeps the varied wide/narrow rhythm for any count.
- Add `aspect-[4/3]` fallback so additional images keep consistent shape on mobile.
- **No data change required** for this to work, but the gallery will only show >4 once `projects.ts` galleries grow. (Optional: I can add 2 more images to each project's gallery from the existing `/assets/` pool if you want the visual change immediately — **asking before doing this**, per "ask before adding dependencies/content".)

### 3. `src/app/work/[slug]/page.tsx` — layout container consistency (minor)
- The details-content and gallery sections currently use inconsistent inner max-widths (`mx-auto` with none vs `max-w-[1400px]`). Wrap both content sections in a shared `mx-auto max-w-[1400px]` so the body and gallery align to the same edges. Minimal: add the max-width to the `ProjectDetailsContent` inner div (`:16`).

## What I will NOT do
- Fabricate 24 paragraphs of per-project marketing copy (path A) unless you confirm.
- Touch `ProjectHero` or `NextProject` (parallax, scroll-fragile — out of scope for "content + layout").
- Add dependencies. No new packages.
- Commit.

## Verification
- `bunx tsc --noEmit` (source) — clean.
- `bunx @biomejs/biome check` on the 3 changed files — clean / safe-autofix only.
- Visual: spawn `ui-visual-validator` subagent to screenshot `/work/aura-skincare` (a `featured` image-type project) before & after, confirming new headings render, gallery shows, and the reading-measure layout tweak holds at desktop width. (Animation/scroll sections — ProjectHero, NextProject — are untouched, so no motion perf concerns.)
- Append SESSION_LOG entry.

## Risk
- **`aspect-auto` + `min-h` gallery items** currently rely on exactly 4 for the bento to tile cleanly. Generalizing could produce an awkward last row with 1–2 stragglers when image count isn't a multiple of 3. Mitigation: the generalized col-span rule keeps a 2+1 rhythm; I'll verify the tiling via the screenshot.
- **Stats/metrics are illustrative placeholders** — flagged in the report so you can replace with real numbers.
