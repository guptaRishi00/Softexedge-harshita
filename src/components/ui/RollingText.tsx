import type { CSSProperties } from "react";

/**
 * Nav label with a staggered text roll (after the Skiper "TextRoll"): when
 * the nearest `.group` (the link) is hovered or keyboard-focused, each letter
 * slides up out of a one-line clip while an identical letter slides in from
 * below, left to right, 35 ms apart. CSS-driven (`.roll-*` in globals.css) so
 * the whole link is the hover target, not just the glyphs. The split letters
 * are aria-hidden; the sr-only copy keeps the accessible name a single word.
 */
export default function RollingText({ text }: { text: string }) {
  // Stable keys without the map index (the label never reorders).
  const letters = Array.from(text, (ch, i) => ({
    id: `${i}:${ch}`,
    ch: ch === " " ? " " : ch,
  }));

  const row = (extra?: string) => (
    <span
      aria-hidden="true"
      className={extra ? `roll-letters ${extra}` : "roll-letters"}
    >
      {letters.map(({ id, ch }, i) => (
        <span
          key={id}
          className="roll-char"
          style={{ "--i": i } as CSSProperties}
        >
          {ch}
        </span>
      ))}
    </span>
  );

  return (
    <span className="roll-text">
      <span className="sr-only">{text}</span>
      {row()}
      {row("roll-letters--next")}
    </span>
  );
}
