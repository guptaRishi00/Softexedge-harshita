// Pure model for the About section's analytics console figure. Everything the
// figure shows (screen bars, trend line, gauge needle, channel faders and the
// card readout) is read from `dayAt`, so the parts always agree with each
// other. The series is illustrative, not client data: a weekly traffic shape
// with a slow swell, a channel mix that drifts, and a conversion rate.

export const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** Days on screen at once: a rolling week. */
export const WINDOW = 7;
/** Visits that fill a bar to the top of the chart. */
export const VISITS_MAX = 2400;
/** Conversion (%) at the gauge's full-scale mark. */
export const CONVERSION_MAX = 5;
/** Day shown at rest (server render, reduced motion). */
export const START_DAY = 10;

const WEEKDAY = [1, 1.06, 1.1, 1.08, 1, 0.74, 0.66];

export interface Day {
  index: number;
  label: string;
  visits: number;
  /** Conversion rate in percent. */
  conversion: number;
  /** Channel shares [search, ads, social], summing to 1. */
  mix: [number, number, number];
}

const mod = (value: number, by: number) => ((value % by) + by) % by;

export function dayAt(index: number): Day {
  const weekday = WEEKDAY[mod(index, 7)];
  const visits = Math.round(1800 * weekday * (1 + 0.08 * Math.sin(index * 0.9)));
  const search = 0.44 + 0.08 * Math.sin(index * 0.7);
  const ads = 0.31 + 0.07 * Math.sin(index * 1.1 + 1.3);
  const conversion = 2.4 + 0.8 * Math.sin(index * 0.6 + 0.4) + 0.5 * (weekday - 0.9);
  return {
    index,
    label: DAY_NAMES[mod(index, 7)],
    visits,
    conversion: Math.round(conversion * 10) / 10,
    mix: [search, ads, 1 - search - ads],
  };
}

/** The rolling week ending on `index`, oldest first. */
export const weekEnding = (index: number) => Array.from({ length: WINDOW }, (_, k) => dayAt(index - (WINDOW - 1) + k));

const grouped = (value: number) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const readoutOf = (day: Day) => `${day.label} · ${grouped(day.visits)} visits · ${day.conversion.toFixed(1)}%`;
