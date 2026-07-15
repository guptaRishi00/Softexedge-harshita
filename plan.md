# Plan: Unify section-intro description style site-wide

## Source of truth
brand-strategy SubServices header description (SubServices.tsx:110):
`text-2xl font-light leading-[1.25em] text-white` (on a black section).
Take its LEADING, FONT-WEIGHT, and COLOR — normalize every section-intro
description paragraph to match (color matched per background).

## Canonical target (apply to each section-intro description <p>)
- font-weight → `font-light`  (remove any font-normal/medium/semibold/bold)
- leading     → `leading-[1.25em]`  (remove leading-relaxed / leading-none / leading-[..] / leading-*)
- color:
    - DARK-background section  → `text-white`
    - LIGHT-background section → `text-zinc-600`
  (remove the old text-<color>, including opacity variants like text-white/60,
   text-zinc-500, text-zinc-400, etc.)

## Keep unchanged (do NOT touch)
font-size (text-lg / text-xl / text-2xl / responsive md:text-*), max-w-*,
margins (mt-*/mb-*), text-align, animation props, and any gradient <span>
inside. Only the three properties above change.

## What counts (scope = "section intro paragraphs" only)
The lede/description paragraph inside a section's heading block — the <p> that
sits beside/under the section's h1/h2 title, usually max-w-constrained.
ONE per section. EXCLUDE: card/item descriptions, list items, eyebrows/labels,
form helper text, testimonial quotes, footer copy, nav text, blog post
excerpts, buttons.

## Background classification (per section root / nearest wrapper)
DARK  → bg-black, bg-[#0a0a0a], bg-[#100f0f], bg-[#141414], any dark → text-white
LIGHT → bg-white, bg-[#FAFAFA], bg-[#EEEDEB], light → text-zinc-600
(If the description sits inside a dark card on a light section, treat by the
card it's on.)

## Execute
Sweep src/components (and src/app if any section is inline). For each matching
section-intro <p>, edit only the 3 properties. Report every file + line +
before/after className. Then tsc + biome + next build.

## Verify
- tsc, biome, next build all green.
- spec-verifier: confirm only section-intro descriptions changed (no card copy /
  labels / gradient spans touched), font-light + leading-[1.25em] applied, and
  color correct for each section's background (nothing invisible).
