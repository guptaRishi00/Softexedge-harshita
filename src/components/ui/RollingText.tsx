/**
 * Nav label that rolls as one unit when the nearest `.group` link is hovered
 * or keyboard-focused. CSS-driven (`.roll-*` in globals.css); the visual rows
 * are aria-hidden and the sr-only copy keeps one accessible label.
 */
export default function RollingText({ text }: { text: string }) {
  const row = (extra?: string) => (
    <span
      aria-hidden="true"
      className={extra ? `roll-letters ${extra}` : "roll-letters"}
    >
      {text}
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
