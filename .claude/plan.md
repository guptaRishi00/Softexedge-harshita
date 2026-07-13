# Plan: SubServices last-card pin + ProcessSection overlap (brand-strategy)

## Current mechanism (grounded, from the code)
- `SubServices` = `<ReactLenis root>` → `<section relative bg-black>` containing:
  - HEADER, then **STACKING CARDS WRAPPER** `<div ref={container} class="group/cards relative">`.
  - Inside `container`: 4 `Card`s, each `position: sticky; top: calc(5vh + i*190px); zIndex: i; mb-[22vh]` → each pins 190px lower than the last so previous titles peek; later cards stack over earlier (increasing z).
  - Then a **"Runway"** spacer `h-[100vh]` (keeps the last card pinned while you scroll 100vh).
  - Then a **"CTA / NEXT SECTION"** `<div relative z-50 bg-black min-h-[70vh]>` (ConnectButton) — this scrolls up after the container.
- `ProcessSection` is a **separate sibling** in `app/brand-strategy/page.tsx` (line 22), AFTER `<SubServices />`, its own `<section bg-black>`.

## The core blocker
`position: sticky` only pins within its **containing block**. The cards' container
(`div ref={container}`) ends before the CTA div, and SubServices' `<section>` ends
before `ProcessSection`. So the last card **un-pins** the moment SubServices ends —
a sibling `ProcessSection` cannot scroll *over* a still-pinned last card. True
"next section overlaps the stuck card" requires the next section to live **inside
the same sticky scroll context** as the card.

## Proposed approach (structural — spans 2 files)
1. Move `<ProcessSection />` OUT of `page.tsx` and render it **inside** SubServices'
   `container`, right after the 4 cards (replacing/absorbing the Runway + CTA
   role), as a `relative z-50 bg-black` block. Because it's inside `container`,
   the last card stays sticky-pinned while ProcessSection scrolls up over it →
   the overlap effect.
2. Adjust the **last card**'s sticky `top` so it "touches the top" and holds
   (e.g. the final card pins at a smaller top / top:5vh) — needs tuning so the
   last card is the one on screen when ProcessSection begins to overlap.
3. Keep the existing CTA (ConnectButton) — either fold into ProcessSection's lead
   or drop it — TBD by the desired end state.
4. `page.tsx`: remove the standalone `<ProcessSection />` (now owned by SubServices).

Files: `components/brand-strategy/SubServices.tsx`, `app/brand-strategy/page.tsx`
(and possibly a small ProcessSection wrapper). Risk: **high** — this reworks a
working scroll effect; the exact `top`/`z`/`margin` values need on-screen tuning.

## Verification problem (why I'm pausing)
This is a scroll/pin/overlap effect — it can ONLY be confirmed by scrolling it in
a browser. In this session the preview harness cannot hold a dev server for this
workspace, and the one connected browser is a remote macOS instance that can't
reach this machine's :3000. So I cannot see the result or tune the values — a
blind edit to scroll choreography would very likely land wrong and risk breaking
the current stacking effect.
