# Plan: DomeGallery (reverted base) — varied image-card sizes, consistent gaps

**Context:** User reverted `ui/DomeGallery.tsx` to a pre-session version (no video
support, no uneven sizes, no 0.5-centering, 10px inset, and — unintentionally —
no `autoRotate`, which `WorkHeroSection` still passes → tsc currently FAILS).
User chose: **images only, varied sizes, consistent gaps, restore autoRotate,
drop video entries.**

**Steps (inline execution, driver):**
1. `ui/DomeGallery.tsx` — buildItems: deterministic per-slot size variants for all
   (image) cards: `i%3===1` → portrait 1.5×2; else `i%4===3` → landscape 2×1.3;
   else square 2×2. Never >2 per axis (sphere overlap rule).
2. `ui/DomeGallery.tsx` — consistency (re-apply approved geometry): CSS
   `.sphere-item` transform centering terms → `0.5` (both axes) AND
   `computeItemBaseRotation` → `0.5` (lockstep); tile inset `10px → 4px` in the
   3 gap spots (not the box-shadows).
3. `ui/DomeGallery.tsx` — restore `autoRotate?: boolean` / `autoRotateSpeed?: number`
   props + the pause-aware RAF auto-rotation effect (exact code from the
   pre-revert version read earlier this session).
4. `work/WorkHeroSection.tsx` — remove the 4 `/assets/videoN.mp4` entries from
   `GALLERY_MEDIA` (images only).

**Verify:** tsc clean (currently failing — must go green), biome on both files,
`next build` ✓ /work, SSR HTML shows varied `--item-size-*`, `0.5` centering,
`inset: 4px`, zero video tiles. spec-verifier at done gate.
