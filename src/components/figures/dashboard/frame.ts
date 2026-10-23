// Shared by the server art (geometry.ts) and the live layer (DashboardLive):
// the constants and per-frame paths for the parts that move. Kept apart from
// geometry.ts so the client never imports (and recomputes) the static art.

import { type Flat, lineOnTop, type Projection, pathOf } from "@/components/iso/iso-kit";
import { CONVERSION_MAX } from "./model";

/** Chart on the screen glass, in face coordinates (u = world x, v = -z). */
export const CHART = { base: 48, top: 88, x0: -88, bar: 9.5, gap: 3.6 };

export const GAUGE: Flat = [76, 52];
export const GAUGE_R = 22;
export const GAUGE_Z = 2;
export const GAUGE_H = 8;
export const GAUGE_TOP = GAUGE_Z + GAUGE_H;
/** Dial sweep: 0 % at -135° round to CONVERSION_MAX at +135° (kit angle 0 = -y). */
export const SWEEP_FROM = -Math.PI * 0.75;
export const SWEEP_SPAN = Math.PI * 1.5;

/** Fader travel along +x, world units, for a 0-100 % share. */
export const TRACK_LEN = 84;

/** The needle: a short tail through the hub to the tip, on the dial face. */
export function needlePath(conversion: number, projection: Projection) {
  const [cx, cy] = GAUGE;
  const angle = SWEEP_FROM + SWEEP_SPAN * Math.min(1, Math.max(0, conversion / CONVERSION_MAX));
  const sx = Math.sin(angle);
  const sy = -Math.cos(angle);
  const tip: Flat = [cx + sx * (GAUGE_R - 4.4), cy + sy * (GAUGE_R - 4.4)];
  const tail: Flat = [cx - sx * 4, cy - sy * 4];
  return lineOnTop(tail, tip, GAUGE_TOP + 0.3, projection);
}

const hundredth = (value: number) => Math.round(value * 100) / 100;

/** Where day `i`'s conversion sits on the screen chart (face coordinates). */
export function trendPoint(i: number, conversion: number): Flat {
  const { base, top, x0, bar, gap } = CHART;
  const u = x0 + i * (bar + gap) + bar / 2;
  const v = -(base + 8 + (Math.min(conversion, CONVERSION_MAX) / CONVERSION_MAX) * (top - base));
  return [hundredth(u), hundredth(v)];
}

export const trendPath = (conversions: number[]) => pathOf(conversions.map((c, i) => trendPoint(i, c)));
