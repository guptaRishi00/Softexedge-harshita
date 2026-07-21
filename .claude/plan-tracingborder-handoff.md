# Plan: TracingBorder — seamless comet → corner-glow handoff (no blank gap)

## Diagnosis (driver, grounded in src/components/ui/TracingBorder.tsx)
LAP_DURATION=2.5, HANDOFF=2.35. Comet group fades `delay: LAP_DURATION-0.45,
duration: 0.45` → opacity hits 0 at exactly t=2.5, the same instant the
rotation completes; the reveal (rect 1.1s, circles 0.9s from t=2.35) is barely
visible until ~2.7s. Result: ~0.4s where the card border shows nothing.
The path starts/ends at the TR corner and the TR mask circle blooms first, so
spatial continuity is already correct — this is purely a timing fix.

## Fix (exact values, decided by driver)
1. Comet group fade: `delay: LAP_DURATION, duration: 0.35` — the comet stays
   fully visible through its entire lap and dissolves OVER the already-lit
   border, never before it.
2. `HANDOFF = LAP_DURATION - 0.3` (was −0.15) — the TR corner glow ignites
   under the comet's final approach, so at lap-end the corner is already lit
   (~65% bloomed) exactly where the comet stops.
3. Mask rect duration `1.1 → 0.8` — edges fade in sooner.
4. Update the "Timing:" comment (lines ~77-79) to describe the new overlap.
Unchanged: circle durations/stagger, LAP path animation, all gradients/masks.

## Steps & routing
| Step | Files (allowlist) | route | Acceptance check |
|---|---|---|---|
| T1 | src/components/ui/TracingBorder.tsx | sonnet | grep shows `HANDOFF = LAP_DURATION - 0.3`, comet transition `delay: LAP_DURATION` + `duration: 0.35`, rect `duration: 0.8`; no other timing values changed; `bunx tsc --noEmit` exit 0; biome: nothing new |
| T2 | — verification — | driver | re-grep constants; confirm no other diff hunks in the file |
| T3 | — done gate — | spec-verifier | plan vs file state; P0/P1 fixed, max 3 rounds |

Routing: 1 sonnet, 0 opus, driver = analysis/verification only (<20%).

## Constraints (echoed into brief)
- Minimal diff: ONLY the three timing values + the Timing comment.
- No changes to gradients, masks, path math, stroke widths, easings other
  than named; no reformatting; keep line endings.
- Animation feel is verified by the user's eyes (headless pane can't play it);
  static evidence = constants + typecheck.
