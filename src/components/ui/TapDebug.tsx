"use client";

import { useEffect, useRef, useState } from "react";

/**
 * On-screen tap tracer for diagnosing the iOS "needs two taps" problem on a
 * real device, without a Mac and Web Inspector.
 *
 * Renders NOTHING unless the URL carries `?debug=tap`, so it is inert for real
 * visitors even though it is mounted in the root layout. The flag is read from
 * `window.location.search` in an effect rather than via `useSearchParams`,
 * which would opt every page into dynamic rendering.
 *
 * NON-PERTURBING BY CONSTRUCTION. The first version called setState from every
 * listener, which re-rendered this panel during the very `mouseover` pass it
 * was measuring — and a DOM change during that pass is exactly what makes
 * WebKit withhold the click. So the instrument could cause the failure it
 * recorded. Handlers now only push into a ref; the panel is written from a
 * timer, well after event dispatch has finished. Nothing here touches the DOM
 * while a tap is being processed.
 */

type Entry = { n: number; type: string; target: string; prevented: boolean };

const TRACKED = [
  "touchstart",
  "touchend",
  "touchcancel",
  "pointerdown",
  "pointerup",
  // The synthetic hover pass. `mousemove` is left out — it floods.
  "mouseover",
  "mousedown",
  "mouseup",
  "click",
] as const;

const MAX_ROWS = 10;
const MAX_MUTATIONS = 6;
// A mutation this soon after the hover pass is what WebKit reacts to.
const MUTATION_WINDOW_MS = 400;
const FLUSH_MS = 250;

const describe = (t: EventTarget | null): string => {
  if (!(t instanceof Element)) return String(t);
  const cls = typeof t.className === "string" ? t.className : "";
  const id = t.id ? `#${t.id}` : "";
  const first = cls.trim().split(/\s+/)[0];
  return `${t.tagName.toLowerCase()}${id}${first ? `.${first}` : ""}`;
};

export default function TapDebug() {
  const [on, setOn] = useState(false);
  const panelRef = useRef<HTMLPreElement>(null);
  const log = useRef<Entry[]>([]);
  const mutations = useRef<string[]>([]);
  const lastHover = useRef(0);
  const counts = useRef({ touchend: 0, click: 0 });

  useEffect(() => {
    setOn(new URLSearchParams(window.location.search).get("debug") === "tap");
  }, []);

  useEffect(() => {
    if (!on) return;
    let n = 0;

    const handlers = TRACKED.map((type) => {
      const fn = (e: Event) => {
        n += 1;
        // Ref only — no setState, no DOM write, nothing that could perturb the
        // tap currently being arbitrated.
        log.current.unshift({
          n,
          type,
          target: describe(e.target),
          prevented: e.defaultPrevented,
        });
        log.current.length = Math.min(log.current.length, MAX_ROWS);
        if (type === "touchend") counts.current.touchend += 1;
        if (type === "click") counts.current.click += 1;
        if (type === "mouseover") lastHover.current = performance.now();
      };
      document.addEventListener(type, fn, true);
      return { type, fn };
    });

    // Names whatever mutates during the hover pass — the thing that makes
    // WebKit drop the click. Anything inside this panel is ignored so the
    // instrument can never accuse itself.
    const panel = panelRef.current;
    const mo = new MutationObserver((records) => {
      const since = performance.now() - lastHover.current;
      if (since > MUTATION_WINDOW_MS) return;
      for (const r of records) {
        const target = r.target as Node;
        if (panel && target instanceof Node && panel.contains(target)) continue;
        const what =
          r.type === "attributes"
            ? `${describe(target as Element)} @${r.attributeName}`
            : `${describe(target as Element)} ${r.type}`;
        if (!mutations.current.includes(what)) mutations.current.unshift(what);
      }
      mutations.current.length = Math.min(
        mutations.current.length,
        MAX_MUTATIONS,
      );
    });
    mo.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
    });

    // The only writer, and it runs on a timer rather than inside a listener.
    const id = window.setInterval(() => {
      const el = panelRef.current;
      if (!el) return;
      const c = counts.current;
      const head =
        `touchend: ${c.touchend}  click: ${c.click}  ` +
        (c.touchend > c.click ? "<= TAPS LOST" : "ok");
      const rows = log.current
        .map(
          (r) =>
            `${r.n}. ${r.type} ${r.target}${r.prevented ? " [prevented]" : ""}`,
        )
        .join("\n");
      const muts = mutations.current.length
        ? `\nCHANGED DURING HOVER PASS:\n  ${mutations.current.join("\n  ")}`
        : "\nCHANGED DURING HOVER PASS: (nothing)";
      el.textContent = `${head}\n${rows}${muts}`;
    }, FLUSH_MS);

    return () => {
      for (const { type, fn } of handlers)
        document.removeEventListener(type, fn, true);
      mo.disconnect();
      window.clearInterval(id);
    };
  }, [on]);

  if (!on) return null;

  return (
    <pre
      ref={panelRef}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[9999] m-0 max-h-[48svh] overflow-hidden whitespace-pre-wrap bg-black/90 p-2 font-mono text-[10px] leading-tight text-lime-300"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 8px)" }}
    />
  );
}
