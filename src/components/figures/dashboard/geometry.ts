// Static art for the analytics console figure, built once with the anatomy kit
// (components/iso). Runs on the server: the client receives a finished SVG
// string plus the few numbers it needs to move the live parts (LIVE).
//
// The object: a bench plate on four feet carrying a monitor on a stand (its
// screen draws a rolling week of visits as bars plus a conversion trend), a
// fader panel with one fader per traffic channel (search, ads, social), and a
// face-up dial gauge reading conversion. Everything moves from model.ts.

import type { Flat, Plan, Point3, Projection } from "@/components/iso/iso-kit";
import * as k from "@/components/iso/iso-kit";
import {
  CHART,
  GAUGE,
  GAUGE_H,
  GAUGE_R,
  GAUGE_TOP,
  GAUGE_Z,
  needlePath,
  SWEEP_FROM,
  SWEEP_SPAN,
  TRACK_LEN,
  trendPath,
  trendPoint,
} from "./frame";
import { START_DAY, VISITS_MAX, WINDOW, weekEnding } from "./model";

export const WIDTH = 600;
export const HEIGHT = 430;
const AZIMUTH = 56;

// ---- world layout (units ~ 1 px of the real thing; z up) ----
const PLATE: Plan = { x: -112, y: -80, w: 244, d: 178, r: 10 };
const PLATE_H = 9;
const FOOT_H = 5;

const STAND: Plan = { x: -78, y: -72, w: 64, d: 30, r: 6 };
const STAND_H = 3;
const NECK: Flat = [-46, -56];
const NECK_R = 4.5;
const HOUSING: Plan = { x: -104, y: -62, w: 116, d: 12, r: 3 };
const HOUSING_Z = 30;
const HOUSING_TOP = 112;
const FRONT = HOUSING.y + HOUSING.d;

interface Window {
  x0: number;
  x1: number;
  z0: number;
  z1: number;
  r: number;
  depth: number;
}
const BEZEL: Window = { x0: -98, x1: 6, z0: 38, z1: 106, r: 4, depth: 1.2 };
const GLASS: Window = { x0: -94, x1: 2, z0: 42, z1: 102, r: 3, depth: 2 };

const SERVER: Plan = { x: 44, y: -70, w: 58, d: 32, r: 3 };
const SERVER_TOP = 30;
const SERVER_FRONT = SERVER.y + SERVER.d;

const PANEL: Plan = { x: -92, y: 18, w: 122, d: 60, r: 4 };
const PANEL_H = 7;
const TRACK_X0 = -80;
const TRACKS_Y = [30, 43, 56];
const CAP_W = 7;
const CAP_D = 8;
const CAP_H = 5;

const P: Projection = k.fitProjection(
  [
    ...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0),
    ...k.boxCorners({ x: HOUSING.x, y: HOUSING.y, w: HOUSING.w, d: HOUSING.d, r: 0 }, HOUSING_Z, HOUSING_TOP),
  ],
  WIDTH,
  HEIGHT,
  { pad: 26, azimuth: AZIMUTH },
);

const at = (point: Point3) => k.iso(point, P);
const S = k.solidSvg;
const L = k.lineSvg;
const D = k.dotsSvg;
const byDepth = (points: Flat[]) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));
const planeOf = (y: number) => k.sideMatrix([0, y], 0, P, "left");
const flat = (x0: number, z0: number, x1: number, z1: number, r: number, steps = 6) =>
  k.pathOf(
    k.roundedPlan({ x: x0, y: z0, w: x1 - x0, d: z1 - z0, r }, steps).map(([u, z]) => [u, -z] as Flat),
    true,
  );

let clips = 0;
/** A rounded window set into the +y face at `y`, `depth` deep, with its inner walls. */
function recess(win: Window, y: number, back: string, backClass: string, inside = "") {
  const id = `dash-clip-${clips++}`;
  const { x0, x1, z0, z1, r, depth } = win;
  const ring = k.roundedPlan({ x: x0, y: z0, w: x1 - x0, d: z1 - z0, r }, 6);
  const cx = (x0 + x1) / 2;
  const cz = (z0 + z1) / 2;
  const { sinA } = k.cameraOf(P);
  const tops: string[] = [];
  const sides: string[][] = [[], [], [], []];
  ring.forEach(([ax, az], index) => {
    const [bx, bz] = ring[(index + 1) % ring.length];
    const length = Math.hypot(bx - ax, bz - az) || 1;
    let nx = (bz - az) / length;
    let nz = -(bx - ax) / length;
    if (nx * (cx - (ax + bx) / 2) + nz * (cz - (az + bz) / 2) < 0) {
      nx = -nx;
      nz = -nz;
    }
    if (nx <= 0 && nz <= 0) return;
    const quad = k.pathOf([at([ax, y, az]), at([bx, y, bz]), at([bx, y - depth, bz]), at([ax, y - depth, az])], true);
    if (nz >= nx) tops.push(quad);
    else sides[Math.min(3, Math.max(0, Math.floor(((nx * -sinA + 1) / 2) * 4)))].push(quad);
  });
  const shape = flat(x0, z0, x1, z1, r);
  return [
    `<clipPath id="${id}"><path transform="${planeOf(y)}" d="${shape}"/></clipPath>`,
    `<g clip-path="url(#${id})">`,
    `<path class="iso-top" d="${tops.join("")}"/>`,
    ...sides.map((d, shade) => (d.length ? `<path class="iso-shade" data-shade="${shade}" d="${d.join("")}"/>` : "")),
    `<g transform="${planeOf(y - depth)}"><path class="${backClass}" d="${shape}"/>${back}<path class="iso-line" data-tone="faint" d="${shape}"/></g>`,
    inside,
    "</g>",
    `<g transform="${planeOf(y)}"><path class="iso-line" data-tone="lo" d="${shape}"/></g>`,
  ].join("");
}

function plate() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(PLATE, 22))) {
    out.push(S(k.cylinder(x, y, 7, -PLATE_H - FOOT_H, 1.6, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 5.4, -PLATE_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28), { tone: "mid" }));
  }
  out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.6), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(PLATE, 5), 0, P), { tone: "lo" }));
  const screws = k.corners(PLATE, 10);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));
  // Label plate: printed lines stand for text, so they may stop on the face.
  const label: Plan = { x: 62, y: 84, w: 44, d: 8, r: 1.2 };
  out.push(S(k.slabOf(label, 0, 0.8, P, 3), { tone: "lo", crease: "none" }));
  out.push(L(k.planOutline(k.insetPlan(label, 1.4), 0.8, P, 3), { tone: "faint" }));
  out.push(
    L(
      [30, 20].map((w, i) => k.lineOnTop([label.x + 4, label.y + 2.8 + i * 2.6], [label.x + 4 + w, label.y + 2.8 + i * 2.6], 0.8, P)).join(""),
      { tone: "lo", free: true },
    ),
  );
  out.push(D([at([label.x + label.w - 3, label.y + label.d / 2, 0.8])], { size: 0.45 }));
  return out.join("");
}

function screen() {
  const { base, top, x0, bar, gap } = CHART;
  const grid = [0.25, 0.5, 0.75, 1]
    .map((f) => `M${GLASS.x0} ${-(base + (top - base) * f)}H${GLASS.x1}`)
    .join("");
  const week = weekEnding(START_DAY);
  const bars = week
    .map((day, i) => {
      const h = Math.max(0.6, (day.visits / VISITS_MAX) * (top - base));
      const x = x0 + i * (bar + gap);
      return `<rect class="dash-bar" data-bar="${i}"${i === WINDOW - 1 ? " data-now" : ""} x="${x}" y="${-(base + h)}" width="${bar}" height="${h}" rx="0.8"/>`;
    })
    .join("");
  const trend = `<path class="dash-trend" data-part="trend" d="${trendPath(week.map((day) => day.conversion))}"/>`;
  const trendDots = week
    .map((day, i) => {
      const [u, v] = trendPoint(i, day.conversion);
      return `<circle class="dash-trend-dot" data-dot="${i}" cx="${u}" cy="${v}" r="${i === WINDOW - 1 ? 1.5 : 0.9}"/>`;
    })
    .join("");
  const header = [
    `<circle class="dash-header-dot" cx="${GLASS.x0 + 5}" cy="${-(GLASS.z1 - 5)}" r="1.4"/>`,
    `<path class="iso-line" data-tone="mid" data-free d="M${GLASS.x0 + 9} ${-(GLASS.z1 - 5)}h18"/>`,
    `<path class="iso-line" data-tone="lo" data-free d="M${GLASS.x1 - 26} ${-(GLASS.z1 - 5)}h20"/>`,
    `<path class="iso-line" data-tone="faint" d="M${GLASS.x0} ${-(base - 0.6)}H${GLASS.x1}"/>`,
  ].join("");
  const back = `<path class="iso-line" data-tone="faint" d="${grid}"/>${bars}${trend}${trendDots}${header}`;
  return recess(BEZEL, FRONT, "", "dash-bezel", recess(GLASS, FRONT - BEZEL.depth, back, "dash-glass"));
}

function monitor() {
  const out = [`<path class="iso-halo" d="${k.haloOf(STAND, 0, 6, P)}"/>`];
  out.push(S(k.slabOf(STAND, 0, STAND_H, P, 6, 0.8), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(STAND, 3), STAND_H, P, 6), { tone: "faint" }));
  out.push(L(k.ring(NECK[0], NECK[1], NECK_R + 2.2, STAND_H, P, 28), { tone: "lo" }));
  out.push(S(k.cylinder(NECK[0], NECK[1], NECK_R + 2, STAND_H, 2, P, 28), { tone: "mid" }));
  out.push(
    S(k.cylinder(NECK[0], NECK[1], NECK_R, STAND_H + 2, HOUSING_Z - STAND_H - 2, P, 28), {
      tone: "mid",
      inner: L(k.sideArc(NECK[0], NECK[1], NECK_R, 14, P, 16), { tone: "faint" }),
    }),
  );
  out.push(
    S(k.slabOf(HOUSING, HOUSING_Z, HOUSING_TOP - HOUSING_Z, P, 4, 0.8), {
      tone: "mid",
      inner: L(k.sideSeam(HOUSING, HOUSING_Z + 4, P, 4), { tone: "faint" }),
    }),
  );
  // Vent slots on the top: closed outlines, so nothing ends in mid-face.
  out.push(
    L(
      Array.from({ length: 9 }, (_, i) => k.planOutline({ x: -86 + i * 7, y: HOUSING.y + 3.4, w: 4, d: 5.2, r: 1 }, HOUSING_TOP, P, 3)).join(""),
      { tone: "faint" },
    ),
  );
  out.push(screen());
  // Status LED and two buttons on the chin.
  out.push(`<g data-part="led">${D([at([-2, FRONT, 34])], { size: 1.1, tone: "hi" })}</g>`);
  out.push(`<g transform="${planeOf(FRONT)}">${L(flat(-24, 32.6, -16, 35.4, 1.4, 3) + flat(-36, 32.6, -28, 35.4, 1.4, 3), { tone: "lo" })}</g>`);
  return out.join("");
}

function cable() {
  // From the fader panel's back face, along the plate, to the stand.
  return k.wireSvg(at([-40, PANEL.y, 3.5]), at([-50, STAND.y + STAND.d, 1.6]), {
    via: [at([-40, 4, 0.6]), at([-50, -30, 0.6])],
    tone: "lo",
    size: 1,
  });
}

/**
 * The server the traffic comes from: a plinth and case with two drive bays,
 * a row of activity LEDs (pulsing) and vent slots on top; cabled to the stand.
 */
function server() {
  const out = [`<path class="iso-halo" d="${k.haloOf(SERVER, 0, 10, P)}"/>`];
  out.push(S(k.slabOf(k.insetPlan(SERVER, 2), 0, 2, P, 4), { tone: "lo" }));
  out.push(
    S(k.slabOf(SERVER, 2, SERVER_TOP - 2, P, 4, 0.8), {
      tone: "mid",
      inner: L(k.sideSeam(SERVER, 6, P, 4), { tone: "faint" }),
    }),
  );
  out.push(
    L(
      Array.from({ length: 7 }, (_, i) => k.planOutline({ x: SERVER.x + 8 + i * 6.4, y: SERVER.y + 4, w: 3.6, d: 9, r: 1 }, SERVER_TOP, P, 3)).join(""),
      { tone: "faint" },
    ),
  );
  const x0 = SERVER.x + 6;
  const x1 = SERVER.x + SERVER.w - 6;
  const bays = flat(x0, 9, x1, 15, 1.4, 3) + flat(x0, 17.5, x1, 23.5, 1.4, 3);
  out.push(`<g transform="${planeOf(SERVER_FRONT)}">${L(bays, { tone: "lo" })}</g>`);
  out.push(D([at([x1 - 3, SERVER_FRONT, 12]), at([x1 - 3, SERVER_FRONT, 20.5])], { size: 0.5, tone: "mid" }));
  out.push(D(Array.from({ length: 4 }, (_, i) => at([x0 + 1.5 + i * 4, SERVER_FRONT, 26.5])), { size: 0.75, tone: "hi", pulse: true }));
  return out.join("");
}

function serverCable() {
  // From the server's front, along the plate, to the stand's right face.
  return k.wireSvg(at([SERVER.x + 14, SERVER_FRONT, 4]), at([STAND.x + STAND.w, -57, 1.6]), {
    via: [at([SERVER.x + 14, -30, 0.6]), at([-6, -30, 0.6]), at([-6, -57, 0.6])],
    tone: "lo",
    size: 1,
  });
}

function panel() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PANEL, 0, 5, P)}"/>`];
  out.push(S(k.slabOf(PANEL, 0, PANEL_H, P, 5, 0.8), { tone: "mid", inner: L(k.sideSeam(PANEL, 2.4, P, 5), { tone: "faint" }) }));
  for (const ty of TRACKS_Y) {
    out.push(L(k.planOutline({ x: TRACK_X0 - 1.2, y: ty - 1.2, w: TRACK_LEN + 2.4, d: 2.4, r: 1.2 }, PANEL_H, P, 3), { tone: "lo" }));
  }
  // Scale strip along the front edge: 0-100 % in 5 % steps, major every 25 %.
  const strip: Plan = { x: TRACK_X0 - 2, y: 64, w: TRACK_LEN + 4, d: 6, r: 1 };
  out.push(S(k.slabOf(strip, PANEL_H, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(TRACK_X0, TRACK_X0 + TRACK_LEN, TRACK_LEN / 20, 5, strip.y + 0.4, PANEL_H + 0.6, [1.8, 3.4], P);
  out.push(L(ticks.minor, { tone: "lo" }) + L(ticks.major, { tone: "mid" }));
  // Knob and power button at the right end.
  const kx = 20;
  out.push(S(k.cylinder(kx, 33, 6.2, PANEL_H, 1, P, 32), { tone: "lo" }));
  out.push(S(k.cylinder(kx, 33, 5, PANEL_H + 1, 4, P, 32), { tone: "mid", inner: L(k.knurl(kx, 33, 5, PANEL_H + 1.2, PANEL_H + 4.8, 30, P), { tone: "lo" }) }));
  out.push(L(k.lineOnTop([kx, 33], [kx + 3.6, 30.6], PANEL_H + 5, P), { tone: "hi" }));
  out.push(S(k.cylinder(kx, 52, 3.6, PANEL_H, 2, P, 24), { tone: "mid" }));
  out.push(D([at([kx, 52, PANEL_H + 2])], { size: 0.7, tone: "hi" }));
  // Screws.
  const screws = k.corners(PANEL, 4);
  out.push(D(screws.map(([x, y]) => at([x, y, PANEL_H])), { size: 0.45 }));
  return out.join("");
}

function caps() {
  // Built at 0 % and slid along +x by each channel's share: here to the
  // resting day's mix, then by the live layer.
  const mix = weekEnding(START_DAY)[WINDOW - 1].mix;
  return TRACKS_Y.map((ty, i) => {
    const cap: Plan = { x: TRACK_X0 - CAP_W / 2, y: ty - CAP_D / 2, w: CAP_W, d: CAP_D, r: 1.4 };
    const grip = k.lineOnTop([TRACK_X0, ty - CAP_D / 2 + 1.2], [TRACK_X0, ty + CAP_D / 2 - 1.2], PANEL_H + CAP_H, P);
    return `<g data-cap="${i}" transform="${k.translateAlong(P, [mix[i] * TRACK_LEN, 0, 0])}">${S(k.slabOf(cap, PANEL_H, CAP_H, P, 3, 0.5), { tone: "hi" })}${L(grip, { tone: "mid" })}</g>`;
  }).join("");
}

function gauge() {
  const [cx, cy] = GAUGE;
  const out = [`<path class="iso-halo" d="${k.haloOf({ x: cx - GAUGE_R, y: cy - GAUGE_R, w: GAUGE_R * 2, d: GAUGE_R * 2, r: GAUGE_R }, 0, 6, P)}"/>`];
  out.push(S(k.cylinder(cx, cy, GAUGE_R + 2, 0, GAUGE_Z, P, 64), { tone: "lo" }));
  // Crown on the back (behind the puck, so drawn before it), standing on the
  // riser and set against the bezel.
  out.push(S(k.slabOf({ x: cx - 2.5, y: cy - GAUGE_R - 1.8, w: 5, d: 2.2, r: 0.8 }, GAUGE_Z, 4, P, 3), { tone: "mid" }));
  out.push(
    S(k.cylinder(cx, cy, GAUGE_R, GAUGE_Z, GAUGE_H, P, 72, 0.8), {
      tone: "hi",
      crease: "lo",
      inner: L(k.knurl(cx, cy, GAUGE_R, GAUGE_TOP - 3.4, GAUGE_TOP, 84, P, 0.3), { tone: "lo" }) + L(k.sideArc(cx, cy, GAUGE_R, GAUGE_TOP - 3.4, P, 40), { tone: "faint" }),
    }),
  );
  out.push(L(k.ring(cx, cy, GAUGE_R - 2.2, GAUGE_TOP, P, 72), { tone: "lo" }));
  const ticks = k.radialTicks(cx, cy, GAUGE_R - 3, 25, 5, GAUGE_TOP, [1.3, 2.8], P, SWEEP_FROM, SWEEP_SPAN);
  out.push(L(ticks.minor, { tone: "lo" }) + L(ticks.major, { tone: "mid" }));
  return out.join("");
}

function needleLayer() {
  const [cx, cy] = GAUGE;
  const conv = weekEnding(START_DAY)[WINDOW - 1].conversion;
  return [
    `<path class="iso-line dash-needle" data-tone="lit" data-part="needle" data-free d="${needlePath(conv, P)}"/>`,
    L(k.ring(cx, cy, 1.8, GAUGE_TOP + 0.3, P, 20), { tone: "hi" }),
    D([at([cx, cy, GAUGE_TOP + 0.3])], { size: 0.6, tone: "hi" }),
  ].join("");
}

/** The whole static figure, back to front. Live parts carry data-* hooks. */
export const ART = [plate(), monitor(), server(), serverCable(), cable(), panel(), caps(), gauge(), needleLayer()].join("");

/** What the client needs to move the live parts. */
export const LIVE = {
  projection: P,
  /** Screen vector of one world unit along +x (the fader travel). */
  ex: k.axisVector(P, [1, 0, 0]),
};
