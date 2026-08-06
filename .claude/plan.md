# Mobile performance / thermal — homepage hero

Constraint: **no UI change**. Every step below must be pixel-neutral.

## The smoking gun

`public/assets/video7.mp4` — the hero background, autoplaying on every visit:

| property | value |
|---|---|
| resolution | **3840×2160 (4K)** |
| codec | **HEVC / h265** |
| bitrate | **16,670 kbps** |
| size | **20 MB** for 10s |

It is rendered two ways, and *neither* can use that resolution:

1. Full-screen at `object-cover scale-110 **blur-xl**` → `filter: blur(24px)`
   destroys all detail. At a 390px viewport nothing above ~480p is visible.
2. A 220×118 CSS canvas chip (`CSS_WIDTH = 220`, DPR capped at 2 → a **440px**
   backing store).

So the useful ceiling is ~660 device px wide. It is shipping 3840.

Why this cooks the phone specifically:
- 20 MB download before the hero settles.
- **Continuous 4K HEVC decode at 24fps.** Where HEVC has no hardware path the
  browser falls back to *software* decode of 4K — that alone pegs the CPU.
- `filter: blur(24px)` re-blurs a full-screen surface every decoded frame.
- The canvas `drawImage` copies it again every **display** frame (up to 120Hz),
  not every video frame (24Hz) — ~5× more draws than the source has frames.
- The navbar's `backdrop-filter` then samples the result.

Every other video is already sane H.264 ≤5 Mbps. video7 is the outlier by 8×.

## Ruled out (measured, so it is not re-investigated)

- `ogl`/WebGL (`SpecularBorder`) — only on blog/work/brand-strategy cards, and
  gated behind `isHovered`, which never fires on touch. Not on the homepage.
- `VideoViewportPause` already pauses every offscreen `<video>` globally.
- The `blur(40px)`/`blur(24px)` elements in the nav subtree sit under
  `display: none` at mobile width.
- PortfolioSection's mobile `backdrop-blur` was removed earlier this session.

## Steps

| # | Step | Files | route |
|---|---|---|---|
| 1 | Re-encode video7 → 1280×720 H.264 ~1.2 Mbps (keeps the canvas chip sharp at its 440px backing store; blurred layer cannot tell). Keep the original as `.orig` until approved. | `public/assets/video7.mp4` | driver |
| 2 | Canvas draw loop → `requestVideoFrameCallback` with rAF fallback: draw once per *video* frame instead of once per *display* frame | `src/components/home/Herosection.tsx` | driver |
| 3 | Verify: bytes, codec, resolution, decoded-frame count; confirm markup/classes unchanged | — | driver |

Expected: 20 MB → ~1.5 MB (-93%), 4K HEVC → 720p H.264 (hardware-decoded
everywhere), canvas draws cut ~5×. No markup or class changes at all.

## Not in this plan — offered as a follow-up

**Deliberately keeping `filter: blur(24px)` as-is.** Baking the blur into the
asset would remove the per-frame GPU blur entirely — likely the single largest
remaining win — but the radius would have to be matched by eye across viewports,
and I cannot verify appearance in this pane (it does not composite). That is a
UI risk and the task says no UI change. Worth doing as a follow-up **after** you
re-test the phone, if it still runs hot.

Also out of scope: `public/assets` is **77 MB** total, with 8 PNG/JPGs over
1.5 MB (largest 2.9 MB). Those are page-level images, not the thermal cause, but
they are the next weight lever.

## Routing note

All three steps are `driver`, over the ~20% budget. Step 1 is a single ffmpeg
invocation whose only real content is choosing the target ladder; step 2 is a
~15-line change in one file that must preserve an existing cleanup contract
(the loop is cancelled and restarted on every `play`). Briefing either one costs
more than doing it. **Recommend plain `/task`.**

A genuine fan-out exists if you want it *after* this lands: a site-wide sweep
auditing all ~40 page components for the same class of issue would parallelise
well. Say the word and I will cut that as a separate, properly-routed plan.

Awaiting approval before any edit.
