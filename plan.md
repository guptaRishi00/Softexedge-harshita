# Plan: Apply the ServiceSection header alignment to 6 sections

## Reference (already done) — src/components/home/ServiceSection.tsx
The eyebrow/tag sits ABOVE the flex row; the row contains ONLY the title and the
description, and uses `md:items-center` so the description is vertically centered
against the TITLE alone (not the tag + title block):

```
<div className="mb-10 w-full pb-10">          {/* outer: spacing only */}
  <p className="mb-6 …tag classes…">What We Offer</p>   {/* hoisted above row */}

  <div className="flex w-full … justify-between gap-8 md:flex-row md:items-center">
    <h2 …title… />
    <p …description… />
  </div>
</div>
```

## Problem in the 6 targets (all share the identical broken shape)
```
<div className="…spacing… flex flex-col items-start justify-between gap-N md:flex-row md:items-end">
  <div className="flex flex-col gap-5">        {/* ← eyebrow + title TOGETHER */}
    <span/motion.span …eyebrow… />
    <motion.h2 …title… />
  </div>
  <motion.p …description… />
</div>
```
Because the row's first child is the eyebrow+title block, any items-center/end
aligns the description against BOTH, not the title.

## Transformation (per file)
1. Outer div: KEEP only its spacing/layout-context classes (mb-*, md:mb-*, mx-auto,
   w-full, px-*, etc.). REMOVE the flex row classes (flex, flex-col, items-start,
   justify-between, gap-*, md:flex-row, md:items-end).
2. Hoist the eyebrow OUT of the inner `flex flex-col gap-5` div to be the first
   child of the outer div. Preserve its element type, all classes, and any motion
   props. Since it loses the parent's `gap-5`, give it an equivalent bottom margin
   (`mb-5`) — and if it is a `<span>` (inline), add `block` so the margin applies.
3. Create a NEW row div holding ONLY the title and the description:
   `flex w-full flex-col items-start justify-between gap-<original gap> md:flex-row md:items-center`
   (keep the section's ORIGINAL mobile stacking — do NOT introduce flex-col-reverse;
   only `md:items-end` → `md:items-center`).
4. Delete the now-empty `<div className="flex flex-col gap-5">` wrapper.
5. On the description, REMOVE any `md:mb-2` (it was a nudge for bottom/items-end
   alignment and would push it off-center now). Keep every other description class.
6. Preserve ALL framer-motion props (initial/whileInView/transition/viewport/variants)
   on the eyebrow, title and description exactly.

## Files (6) — the two-column `md:items-end` headers
- src/components/brand-strategy/SubServices.tsx      (~line 98)
- src/components/brand-strategy/ProcessSection.tsx   (~line 45)
- src/components/brand-strategy/OurTechStack.tsx     (~line 37)
- src/components/brand-strategy/ProjectShowcase.tsx  (~line 78)
- src/components/work/WorkProjectShowcase.tsx        (~line 40)
- src/components/blog/BlogListSection.tsx            (~line 65)

## Explicitly OUT of scope
The web-development copies (SubServices, ProcessSection, OurTechStack,
ProjectShowcase) use a CENTERED stacked header (`items-center text-center`, no
two-column md:flex-row), so there is no title|description row to re-align.
Leave them untouched and report.

## Verify
tsc, biome, next build. Each changed header: eyebrow is a sibling ABOVE the row;
row has exactly 2 children (title, description) and `md:items-center`; no leftover
`md:items-end` or empty wrapper div; motion props intact; no `md:mb-2` on the
descriptions. spec-verifier gate.
