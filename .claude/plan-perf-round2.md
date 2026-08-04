# Perf round 2 — remaining lag sources (zero visual change)

Prior /worker pass (see SESSION_LOG "runtime jank pass") fixed Footer clock,
mobile navbar backdrop-blur, PortfolioSection onUpdate, BlogSection + LogoLoop
rAF gating. This round covers what that pass flagged as out of scope, plus two
new findings from today's survey.

## Findings (measured this session)

| # | Source | Evidence | Cost |
|---|---|---|---|
| A | **Giant videos served raw** (Next does not optimize video) | `video6.mp4` **45.5MB** = homepage hero — and it is only ever seen through `blur-xl` + a 220px canvas pill; `video1.mp4` **49.8MB** (/about + /career); `video5.mp4` **29.6MB** (/contact) | ~125MB across 3 routes: network saturation + 4K decode every visit — the single biggest "site is slow" cause |
| B | **DomeGallery ungated rAF** (/work hero) | `autoRotate` + `autoRotateSpeed={1}` at `WorkHeroSection.tsx:64`; `DomeGallery.tsx:136-143` writes `track.style.transform` every frame with no visibility gate — ~150 absolutely-positioned `next/image` cards keep compositing after you scroll past | continuous main-thread + compositor work for the whole /work scroll |
| C | **Mega-menu blur overlay is 300vw × 300vh** | `ui/resizable-navbar.tsx:174` + `page/resizable-navbar.tsx:183` — a `fixed`, centered, `backdrop-blur-md` layer 9× the viewport area, mounted on every nav-item hover | oversized compositor layer on every dropdown hover, both navbars |
| D | **Oversized source images** | referenced assets up to 7952×5304 (`ux-store` 4.2MB, `work.jpg` 5231px, `creative.jpg` 5040px, `microsoft-copilot` 8103px…) | slow dev-mode transforms + slow prod cold-cache transforms (sharp downscales multi-MP sources per request) |
| E | **Dead heavyweight assets** | `hero.mp4` 7MB, `video4.mp4` 10.3MB, `b1/b2.png` 8+8MB, `laptop-screen…jpg` 7.3MB — zero references in `src/` | no runtime cost (never downloaded); repo weight only — flag, don't touch |

Also worth saying once: part of the perceived lag is **dev mode** (uncached
image transforms, no minification). Fixes below help both, but judge final
speed on `next build` + `next start`.

## Steps

| Step | What | Files | route | Acceptance |
|---|---|---|---|---|
| 1 | Mega-menu overlay `h-[300vh] w-[300vw] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2` → `inset-0` (same visual: it's `fixed` and covers the viewport either way) | `ui/resizable-navbar.tsx`, `page/resizable-navbar.tsx` | sonnet | grep shows 0 `300vh` in src; diff touches only those 2 lines |
| 2 | Gate DomeGallery's autoRotate rAF behind an IntersectionObserver (`rootMargin: 200px`), preserving offset continuity on resume (shift `start` by the pause duration — no jump). Same pattern family as LogoLoop's fix. | `ui/DomeGallery.tsx` | opus | `bunx tsc --noEmit` exit 0; rAF not scheduled while flag false (code inspection); offset formula continuous across pause |
| 3 | Audit: for every `public/assets` file >1.5MB, find its consumers in src + the `sizes` attr used → table of {file, dims, MB, consumers, max needed px} | none (read-only script in scratchpad) | sonnet | table returned, every >1.5MB asset classified referenced/dead |
| 4 | Downscale **referenced** oversized images in place with sharp (ships with Next — no new dep): cap 3840px longest side for `sizes="100vw"` consumers, 2600px otherwise; JPEG q82 mozjpeg / PNG keep format. Originals backed up to scratchpad first. Rendered output is identical because next/image never requests beyond these caps. | `public/assets/*` (list from step 3) | sonnet | before/after byte table; all dims ≤ cap; backups exist; no src edits |
| 5 | Re-encode the 3 giant videos with ffmpeg — `video6` → 1280w CRF 30 (it renders blurred; ~2-4MB), `video1`/`video5` → 1920w CRF 26 (~5-8MB each). Originals backed up. **BLOCKED: ffmpeg is not installed** — needs your call (options below). | `public/assets/video{1,5,6}.mp4` | driver (tool install + destructive overwrite of user media = judgment + permission) | ffprobe shows new dims/bitrate; files play; sizes reported |
| 6 | Verify: `bunx tsc --noEmit`, `bunx next build`, biome error count vs 145-error baseline, spec-verifier over the worker-written diff (steps 1-4) | — | driver | all exit 0, no new biome errors |

Routing: 4 worker steps (3 sonnet, 1 opus), 2 driver (1 blocked on a
permission, 1 verification) — within the ≤20% judgment budget for edit steps.

## Left alone deliberately (same reasons as last round)
- `ReactLenis` in 8 `SubServices` — removing/replacing changes scroll feel = a UX change, excluded by "nothing visual".
- `repeat: Infinity` framer marquees (8× OurTechStack, AboutSection, EdgeToEdgeCarousel) — pausing restarts keyframes with a visible jump.
- Desktop navbar `backdrop-blur-2xl` pill — intentional visual effect.
- Dead assets (E) — no runtime cost; deletion is housekeeping, not perf.
