// One arrow press on a snap carousel. Same pattern PortfolioSection proved out:
// programmatic `behavior: "smooth"` is ignored outright in some mobile browsers
// and fights `scroll-snap-type: mandatory` in others, so drive scrollLeft with
// an rAF tween, with snap switched off for the duration and restored to land.
export function tweenScrollLeft(el: HTMLElement, to: number, ms = 500) {
  const from = el.scrollLeft;
  const distance = to - from;
  if (Math.abs(distance) < 1) return;

  const snapBefore = el.style.scrollSnapType;
  el.style.scrollSnapType = "none";
  const started = performance.now();

  const step = (now: number) => {
    const p = Math.min(1, (now - started) / ms);
    const eased = p < 0.5 ? 4 * p * p * p : 1 - (-2 * p + 2) ** 3 / 2;
    el.scrollLeft = from + distance * eased;
    if (p < 1) requestAnimationFrame(step);
    else el.style.scrollSnapType = snapBefore;
  };
  requestAnimationFrame(step);
}
