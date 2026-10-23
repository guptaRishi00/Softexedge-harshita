// Shared by the server art (geometry.ts) and the live layer (WaysLive): the
// numbers for the parts that move. Kept apart from geometry.ts so the client
// never imports (and recomputes) the static art.

/** The meter's scale, drawn on its front face: u = world x, v = -z. */
export const METER = {
  /** Pivot offset from the meter's own corner (x) and base (z). */
  pivot: { x: 19, z: 9 },
  radius: 13,
  needle: 11,
  /** Sweep either side of straight up, radians. */
  half: (55 * Math.PI) / 180,
};

/** Meter readings at rest (and under reduced motion). */
export const REST = { usual: 0.34, ours: 0.78 };

const tenth = (value: number) => Math.round(value * 100) / 100;

/** Needle from the pivot (face coordinates) for a reading 0..1. */
export function needleOf([cu, cv]: [number, number], reading: number) {
  const angle =
    -METER.half + 2 * METER.half * Math.min(1, Math.max(0, reading));
  const tip: [number, number] = [
    cu + Math.sin(angle) * METER.needle,
    cv - Math.cos(angle) * METER.needle,
  ];
  const tail: [number, number] = [
    cu - Math.sin(angle) * 2.6,
    cv + Math.cos(angle) * 2.6,
  ];
  return `M${tenth(tail[0])} ${tenth(tail[1])}L${tenth(tip[0])} ${tenth(tip[1])}`;
}
