# Plan: Add a standardized "tag" (eyebrow) above every homepage section title

## Standard (from AboutSection eyebrow — the reference)
Classes: `text-sm uppercase tracking-[0.3em] text-zinc-500 font-medium` with `mb-6`
below it (i.e. spacing between tag and the title). Text example: "About The Studio".
Apply this EXACT visual style everywhere (the color text-zinc-500 is a mid-gray
that reads on both light and dark section backgrounds — keep it the same per the
user's "same style everywhere" instruction).

## Scope
Homepage content sections (src/app/home/page.tsx composition). Add the tag ABOVE
the section's main heading (the section-level h1/h2), matching the section's
title alignment and using the section's existing reveal/motion pattern where the
heading is inside a motion wrapper (add the tag inside that wrapper so it animates
with the title); otherwise a plain element.

Per section:
- AboutSection — REFERENCE, already has it. Leave.
- ServiceSection ("Our Services", black) — ADD. Label: "What We Offer".
- ExperimentalTestimonials (rotating h2, white) — ADD. Label: "Testimonials".
- BlogSection ("Thoughts & …", white) — ADD. Label: "Latest Insights".
- ContactSection (h2, black; ALREADY has an eyebrow ~line 201 text-white/60) —
  UNIFY: keep its text, restyle to the standard classes.
- PortfolioSection (dark) — INVESTIGATE: its h2 may be a per-panel PROJECT title
  inside the horizontal scroll, NOT a section header. Add a tag ONLY if there is a
  genuine section-level heading; otherwise SKIP and report why. If adding, label:
  "Selected Work".
- StatsSection — INVESTIGATE: confirm its h2 is a section header (not a stat card
  title). Add only if genuine section header; else SKIP + report. Label:
  "By The Numbers".
- Hero / "Trusted By" logo strip / TechLogoCarousel — SKIP (bespoke masthead /
  not titled content sections). Report as intentionally skipped.

## Rules
- Only the tag is added/restyled — do NOT change the titles, layout, or anything else.
- Be conservative: only add to genuine SECTION headers, never to per-item/card/panel
  titles. When unsure, SKIP and report.
- Keep the color text-zinc-500 (standard) on every section, light or dark.

## Verify
tsc, biome, next build. Report each section: added / unified / skipped (+ why),
with the exact tag element added. spec-verifier gate.
