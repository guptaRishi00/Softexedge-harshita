"use client";

import { useEffect, useState } from "react";

/**
 * On-screen tap/click tracer, for diagnosing the iOS "needs two taps" problem
 * on a real device without a Mac and Web Inspector.
 *
 * Renders NOTHING unless the URL carries `?debug=tap`, so it is inert for real
 * visitors even though it is mounted in the root layout. The flag is read from
 * `window.location.search` in an effect rather than via `useSearchParams`,
 * which would opt every page into dynamic rendering.
 *
 * The panel is `pointer-events: none` throughout: an instrument that swallowed
 * taps would change the very thing it is measuring.
 */

type Entry = {
  n: number;
  type: string;
  target: string;
  prevented: boolean;
};

// Every event in a tap's lifecycle, in the order iOS emits them. Seeing WHICH
// of these arrive is the whole point: a touchend with no click means Safari
// decided the tap was a hover; no touchend at all means it became a scroll.
const TRACKED = [
  "touchstart",
  "touchend",
  "touchcancel",
  "pointerdown",
  "pointerup",
  // `mouseover` is the synthetic hover pass iOS runs before deciding whether to
  // dispatch a click. Seeing it arrive and then NOT be followed by mousedown is
  // the signature of Safari cancelling the tap because the page changed under
  // the finger — the one remaining explanation that the first trace could not
  // distinguish. `mousemove` is deliberately not tracked: it floods.
  "mouseover",
  "mousedown",
  "mouseup",
  "click",
] as const;

const MAX_ROWS = 14;

const describe = (t: EventTarget | null) => {
  if (!(t instanceof Element)) return String(t);
  const cls = typeof t.className === "string" ? t.className : "";
  const id = t.id ? `#${t.id}` : "";
  return `${t.tagName.toLowerCase()}${id}${cls ? `.${cls.trim().split(/\s+/)[0]}` : ""}`;
};

export default function TapDebug() {
  const [on, setOn] = useState(false);
  const [rows, setRows] = useState<Entry[]>([]);
  const [counts, setCounts] = useState({ touches: 0, clicks: 0 });

  useEffect(() => {
    setOn(new URLSearchParams(window.location.search).get("debug") === "tap");
  }, []);

  useEffect(() => {
    if (!on) return;
    let n = 0;

    const handlers = TRACKED.map((type) => {
      const fn = (e: Event) => {
        n += 1;
        const entry: Entry = {
          n,
          type,
          target: describe(e.target),
          prevented: e.defaultPrevented,
        };
        setRows((prev) => [entry, ...prev].slice(0, MAX_ROWS));
        if (type === "touchend")
          setCounts((c) => ({ ...c, touches: c.touches + 1 }));
        if (type === "click") setCounts((c) => ({ ...c, clicks: c.clicks + 1 }));
      };
      // Capture phase, so this sees the event even if something downstream
      // stops propagation — which is one of the things being tested for.
      document.addEventListener(type, fn, true);
      return { type, fn };
    });

    return () => {
      for (const { type, fn } of handlers)
        document.removeEventListener(type, fn, true);
    };
  }, [on]);

  if (!on) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[9999] max-h-[45svh] overflow-hidden bg-black/90 p-2 font-mono text-[10px] leading-tight text-lime-300"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 8px)" }}
    >
      <div className="mb-1 text-white">
        touchend: {counts.touches} &nbsp; click: {counts.clicks} &nbsp;
        {counts.touches > counts.clicks ? "<= TAPS LOST" : "ok"}
      </div>
      {rows.map((r) => (
        <div key={r.n}>
          {r.n}. <span className="text-cyan-300">{r.type}</span> {r.target}
          {r.prevented ? " [prevented]" : ""}
        </div>
      ))}
    </div>
  );
}
