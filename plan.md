# Plan: Blog hero fixes (image, bg speed/visibility, working dropdowns, count removal)

## Spec (from task)
1. Remove the inline image from the blog hero title.
2. Background animation is very slow / not visible on first view → make it fast and visible immediately.
3. The "By Category" / "By Author" dropdowns don't work → make them functional.
4. Remove "Showing 1-6 of 6 posts." but keep the dropdowns where they are (right side).

## Diagnosis
- Image: the split-image span between "News," and "views" (+ isExpanded/onAnimationComplete machinery).
- Slow/invisible bg: SpotlightGrid at speed={2}; its Lissajous y-phase (+1.3) starts the
  spotlight near the BOTTOM of the box, which in the blog hero is covered by the 2/3-height
  black bottom fade → on first view the spotlight is behind the scrim. Fix: flip phase to
  -1.3 (starts near top, visible in all three consumers — blog/CTA/contact all have bottom
  scrims) + raise speed to 4.
- Dropdowns: pure visual buttons; filtering state lives in BlogListSection (category only).
- Count: remove the <p>; container justify-between → md:justify-end so pills stay right.

## Changes
1. **BlogHeroSection.tsx**
   - Delete image span + Image import + isExpanded state + onAnimationComplete.
   - speed={2} → speed={4} on SpotlightGrid.
   - Remove the "Showing…" p; keep pills right (md:justify-end).
   - Implement real dropdowns: open/close menus (By Category → categories; By Author →
     unique authors from blogPosts), outside-click + Escape close, aria-expanded/haspopup.
     On select: dispatch CustomEvent("blog:filter", {type, value}) + smooth-scroll to #blog-list.
2. **BlogListSection.tsx**
   - id="blog-list" on the section.
   - Listen for "blog:filter": category → setActiveCategory (reset author), author →
     setActiveAuthor (reset category to All).
   - Add activeAuthor state; filteredPosts honors category AND author. Pills reset author.
3. **SpotlightGrid.tsx**
   - fRow phase +1.3 → -1.3 (spotlight starts top → visible on first view everywhere).

## Verification
- tsc, biome (3 files), next build (/blog + pages using SpotlightGrid).
- grep: no Image/isExpanded refs in hero; no "Showing" string; event listener present.
- spec-verifier pass (multi-file, interactive behavior).
