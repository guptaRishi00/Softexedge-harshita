// Static art for the About section's two comparison cards, built once with the
// anatomy kit (components/iso). Runs on the server: the client receives two
// finished SVG strings plus the few numbers it needs to move the live parts.
//
// The object: the same three bench instruments drawn twice. A loudspeaker
// cabinet (marketing), a panel meter (business) and a tower unit with drive
// bays and activity LEDs (tech).
// - "The usual way": each sits on its own small plate, cabled out to plugs
//   that lie on the floor, connected to nothing.
// - "The Softexedge way": all three are bolted to one base plate and wired in
//   a chain to a single lamp, the one lit part.
// Both share one camera, so the machines are the same size in both cards.

import type { Flat, Plan, Point3, Projection } from "@/components/iso/iso-kit";
import * as k from "@/components/iso/iso-kit";
import { METER, needleOf, REST } from "./frame";

export const WIDTH = 480;
export const HEIGHT = 230;
const AZIMUTH = 50;

interface Box {
  x: number;
  y: number;
  w: number;
  d: number;
  /** Body height. */
  h: number;
  /** The surface it stands on. */
  z: number;
}

// ---- "The usual way": three plates scattered on the floor (z = 0) ----
const PLATE_U_H = 4;
const SPK_U: Box = { x: -65, y: -1, w: 30, d: 22, h: 44, z: PLATE_U_H };
const MTR_U: Box = { x: -64, y: -56, w: 38, d: 22, h: 30, z: PLATE_U_H };
const SRV_U: Box = { x: 17.5, y: -34.5, w: 30, d: 24, h: 38, z: PLATE_U_H };

// ---- "The Softexedge way": one plate, top at z = 0 ----
const PLATE_O: Plan = { x: -80, y: -40, w: 172, d: 80, r: 9 };
const PLATE_O_H = 7;
const FOOT_H = 5;
const SPK_O: Box = { x: -70, y: -32, w: 30, d: 22, h: 44, z: 0 };
const MTR_O: Box = { x: -28, y: -32, w: 38, d: 22, h: 30, z: 0 };
const SRV_O: Box = { x: 22, y: -32, w: 30, d: 24, h: 38, z: 0 };
const LAMP: Flat = [74, 6];

const planOfBox = ({ x, y, w, d }: Box, r = 2): Plan => ({ x, y, w, d, r });
const grow = ({ x, y, w, d, r }: Plan, by: number): Plan => ({
  x: x - by,
  y: y - by,
  w: w + by * 2,
  d: d + by * 2,
  r: r + by,
});
const topOf = (b: Box): Point3[] => k.boxCorners(planOfBox(b), b.z, b.z + b.h);

// What each figure occupies, for framing. One camera fits both, so the
// machines are the same size in both cards; each figure is then centred in
// its own frame (see centred()).
const USUAL_BOUNDS: Point3[] = [
  ...topOf(SPK_U),
  ...topOf(MTR_U),
  ...topOf(SRV_U),
  ...[SPK_U, MTR_U, SRV_U].flatMap((b) =>
    k.boxCorners(grow(planOfBox(b), 5), 0, 0),
  ),
  [56, 14, 0],
  [-2, 12, 0],
];
const OURS_BOUNDS: Point3[] = [
  ...k.boxCorners(PLATE_O, -PLATE_O_H - FOOT_H, 0),
  ...topOf(SPK_O),
];

const P: Projection = k.fitProjection(
  [...USUAL_BOUNDS, ...OURS_BOUNDS],
  WIDTH,
  HEIGHT,
  { pad: 14, azimuth: AZIMUTH },
);

const at = (point: Point3) => k.iso(point, P);
const S = k.solidSvg;
const L = k.lineSvg;
const D = k.dotsSvg;
/** The +y face at `y`: face u = world x, v = -z. */
const front = (y: number) => k.sideMatrix([0, y], 0, P, "left");
/** The +x face at `x`: face u = -world y, v = -z. */
const side = (x: number) => k.sideMatrix([x, 0], 0, P, "right");
const flat = (
  x0: number,
  z0: number,
  x1: number,
  z1: number,
  r: number,
  steps = 4,
) =>
  k.pathOf(
    k
      .roundedPlan({ x: x0, y: z0, w: x1 - x0, d: z1 - z0, r }, steps)
      .map(([u, z]) => [u, -z] as Flat),
    true,
  );
const tenth = (value: number) => Math.round(value * 100) / 100;
/**
 * Tags parts with the card row (0-2) they illustrate, so the card's legend
 * tour can light them while the rest dims (ways.css). Wrapping in place keeps
 * the painter's order.
 */
const row = (index: number, ...parts: string[]) =>
  `<g data-row="${index}">${parts.join("")}</g>`;
const circle = (cu: number, cv: number, r: number, attrs: string) =>
  `<circle ${attrs} cx="${tenth(cu)}" cy="${tenth(cv)}" r="${r}"/>`;
const ringOnFace = (cu: number, cv: number, r: number, tone: string) =>
  circle(cu, cv, r, `class="iso-line" data-tone="${tone}"`);

/** A socket set into a face (face coordinates). */
const socket = (cu: number, cv: number) =>
  ringOnFace(cu, cv, 1.5, "lo") + circle(cu, cv, 0.6, `class="ways-hole"`);

/** Plinth, body with a lid seam, and an inset groove round the top. */
function cabinet(b: Box, tone: k.Tone = "mid") {
  const plan = planOfBox(b);
  return [
    `<path class="iso-halo" d="${k.haloOf(plan, b.z, 8, P)}"/>`,
    S(k.slabOf(k.insetPlan(plan, 1.5), b.z, 2, P, 4), { tone: "lo" }),
    S(k.slabOf(plan, b.z + 2, b.h - 2, P, 4, 0.8), {
      tone,
      inner: L(k.sideSeam(plan, b.z + b.h - 5, P, 4), { tone: "faint" }),
    }),
    L(k.planOutline(k.insetPlan(plan, 3), b.z + b.h, P, 4), { tone: "faint" }),
  ].join("");
}

/** Loudspeaker cabinet: woofer with surround and dust cap, tweeter, bass port. */
function speaker(b: Box, jack: "front" | "side") {
  const cu = b.x + b.w / 2;
  const wv = -(b.z + 18);
  const tv = -(b.z + b.h - 9);
  const screws = [45, 135, 225, 315].map((deg) => {
    const a = (deg * Math.PI) / 180;
    return circle(
      cu + Math.cos(a) * 12,
      wv + Math.sin(a) * 12,
      0.5,
      `class="ways-screw"`,
    );
  });
  const face = [
    ringOnFace(cu, wv, 10.2, "lo"),
    ringOnFace(cu, wv, 8.4, "faint"),
    ringOnFace(cu, wv, 5.8, "faint"),
    `<g data-part="cap">${circle(cu, wv, 3, `class="ways-cap"`)}${ringOnFace(cu, wv, 3, "mid")}</g>`,
    ringOnFace(cu, tv, 3.6, "lo"),
    circle(cu, tv, 1.9, `class="ways-dome"`),
    ringOnFace(cu, tv, 1.9, "mid"),
    `<path class="iso-line" data-tone="lo" d="${flat(cu - 6, b.z + 4.5, cu + 6, b.z + 7.5, 1.5)}"/>`,
    ...screws,
    jack === "front" ? socket(b.x + b.w - 4, -(b.z + 3)) : "",
  ].join("");
  return [
    cabinet(b),
    `<g transform="${front(b.y + b.d)}">${face}</g>`,
    jack === "side"
      ? `<g transform="${side(b.x + b.w)}">${socket(-(b.y + b.d / 2), -(b.z + 6))}</g>`
      : "",
  ].join("");
}

/** Panel meter: a glazed window with a scale arc and needle, a knob on top. */
function meter(b: Box, jacks: "front" | "side", reading: number) {
  const cu = b.x + METER.pivot.x;
  const cv = -(b.z + METER.pivot.z);
  const arc: Flat[] = [];
  const minor: string[] = [];
  const major: string[] = [];
  for (let i = 0; i <= 20; i++) {
    const a = -METER.half + (2 * METER.half * i) / 20;
    const sx = Math.sin(a);
    const sy = -Math.cos(a);
    arc.push([cu + sx * METER.radius, cv + sy * METER.radius]);
    if (i % 2) continue;
    const len = i % 10 === 0 ? 3 : 1.8;
    const tick = `M${tenth(cu + sx * METER.radius)} ${tenth(cv + sy * METER.radius)}L${tenth(cu + sx * (METER.radius - len))} ${tenth(cv + sy * (METER.radius - len))}`;
    (len === 3 ? major : minor).push(tick);
  }
  const face = [
    `<path class="ways-glass" d="${flat(b.x + 4, b.z + 5, b.x + b.w - 4, b.z + b.h - 5, 3)}"/>`,
    `<path class="iso-line" data-tone="lo" d="${flat(b.x + 4, b.z + 5, b.x + b.w - 4, b.z + b.h - 5, 3)}"/>`,
    `<path class="iso-line" data-tone="faint" d="${flat(b.x + 5.4, b.z + 6.4, b.x + b.w - 5.4, b.z + b.h - 6.4, 2.2)}"/>`,
    `<path class="iso-line" data-tone="lo" d="${k.pathOf(arc)}"/>`,
    `<path class="iso-line" data-tone="lo" d="${minor.join("")}"/>`,
    `<path class="iso-line" data-tone="mid" d="${major.join("")}"/>`,
    `<path class="iso-line ways-needle" data-tone="hi" data-part="needle" d="${needleOf([cu, cv], reading)}"/>`,
    circle(cu, cv, 1.3, `class="ways-pivot"`),
    jacks === "front"
      ? socket(b.x + 4, -(b.z + 2.6)) + socket(b.x + b.w - 4, -(b.z + 2.6))
      : "",
  ].join("");
  const kx = b.x + b.w - 7;
  const ky = b.y + 7;
  const top = b.z + b.h;
  return [
    cabinet(b),
    `<g transform="${front(b.y + b.d)}">${face}</g>`,
    jacks === "side"
      ? `<g transform="${side(b.x + b.w)}">${socket(-(b.y + b.d / 2), -(b.z + 6))}</g>`
      : "",
    S(k.cylinder(kx, ky, 4.4, top, 0.8, P, 28), { tone: "lo" }),
    S(k.cylinder(kx, ky, 3.6, top + 0.8, 3.2, P, 28), {
      tone: "mid",
      inner: L(k.knurl(kx, ky, 3.6, top + 1, top + 3.8, 24, P), { tone: "lo" }),
    }),
    L(k.lineOnTop([kx, ky], [kx + 2.4, ky - 1.6], top + 4, P), { tone: "hi" }),
    D([at([b.x + 7, b.y + 7, top])], { size: 0.55, tone: "mid" }),
  ].join("");
}

/** Tower unit: three drive bays, a column of activity LEDs, vents on top. */
function server(b: Box, jacks: "front" | "side") {
  const top = b.z + b.h;
  const bays = [12, 19, 26]
    .map((z) => flat(b.x + 9, b.z + z, b.x + b.w - 4, b.z + z + 5, 1.2))
    .join("");
  const latches = [12, 19, 26]
    .map((z) =>
      circle(b.x + b.w - 7, -(b.z + z + 2.5), 0.5, `class="ways-screw"`),
    )
    .join("");
  const leds = [13, 18, 23, 28, 33]
    .map((z, i) =>
      circle(b.x + 4.5, -(b.z + z), 0.9, `class="ways-led" data-led="${i}"`),
    )
    .join("");
  const face = [
    `<path class="iso-line" data-tone="lo" d="${bays}"/>`,
    latches,
    leds,
    jacks === "front"
      ? socket(b.x + 4, -(b.z + 4)) + socket(b.x + b.w - 4, -(b.z + 4))
      : "",
  ].join("");
  return [
    cabinet(b),
    L(
      Array.from({ length: 5 }, (_, i) =>
        k.planOutline(
          { x: b.x + 6 + i * 4.4, y: b.y + 4, w: 2.4, d: 10, r: 1 },
          top,
          P,
          3,
        ),
      ).join(""),
      { tone: "faint" },
    ),
    `<g transform="${front(b.y + b.d)}">${face}</g>`,
    jacks === "side"
      ? `<g transform="${side(b.x + b.w)}">${socket(-(b.y + b.d / 2), -(b.z + 6))}</g>`
      : "",
  ].join("");
}

/** A module's own small plate (the usual way): groove and four screws. */
function smallPlate(b: Box) {
  const plan = grow(planOfBox(b), 5);
  const screws = k.corners(plan, 2.6);
  return [
    `<path class="iso-halo" d="${k.haloOf(plan, 0, PLATE_U_H, P)}"/>`,
    S(k.slabOf(plan, 0, PLATE_U_H, P, 4, 0.6), { tone: "lo" }),
    D(
      screws.map(([x, y]) => at([x, y, PLATE_U_H])),
      { size: 0.45 },
    ),
  ].join("");
}

/** A plug lying on the floor, pins pointing along `dir`. Returns the art and its back-face centre. */
function plug(x: number, y: number, dir: "+x" | "+y" | "-x") {
  const along = dir === "+y";
  const plan: Plan = along
    ? { x, y, w: 5, d: 7, r: 1.2 }
    : { x, y, w: 7, d: 5, r: 1.2 };
  const pins: [Point3, Point3][] = along
    ? [1.4, 3.6].map((u) => [
        [x + u, y + 7, 1.6],
        [x + u, y + 9.6, 1.6],
      ])
    : [1.4, 3.6].map((v) => {
        const from = dir === "+x" ? x + 7 : x;
        const to = dir === "+x" ? x + 9.6 : x - 2.6;
        return [
          [from, y + v, 1.6],
          [to, y + v, 1.6],
        ];
      });
  const back: Point3 = along
    ? [x + 2.5, y, 1.6]
    : dir === "+x"
      ? [x, y + 2.5, 1.6]
      : [x + 7, y + 2.5, 1.6];
  const art = [
    `<path class="iso-halo" d="${k.haloOf(plan, 0, 3, P)}"/>`,
    S(k.slabOf(plan, 0, 3.2, P, 3, 0.4), {
      tone: "mid",
      inner: L(k.sideSeam(plan, 1.6, P, 3), { tone: "faint" }),
    }),
    L(pins.map(([a, b]) => k.segment(a, b, P)).join(""), { tone: "mid" }),
    D(
      pins.map(([, b]) => at(b)),
      { size: 0.45, tone: "mid" },
    ),
  ].join("");
  return { art, back };
}

/** A cable from a socket, over the plate edge, along the floor to a loose plug. */
function looseCable(
  from: Point3,
  via: Point3[],
  to: { art: string; back: Point3 },
) {
  return (
    to.art +
    k.wireSvg(at(from), at(to.back), {
      via: via.map(at),
      tone: "mid",
      size: 0.9,
    })
  );
}

// ---------------------------------------------------------------- usual way
function usual() {
  // Speaker and server plugs point at each other across a gap; the meter's
  // cable stops short behind them.
  const cableA = looseCable(
    [-35, 10, 10],
    [
      [-32.5, 10, PLATE_U_H + 0.3],
      [-29, 10, 0.3],
    ],
    plug(-12, 7.5, "+x"),
  );
  const cableB = looseCable(
    [-26, -45, 10],
    [
      [-23.5, -45, PLATE_U_H + 0.3],
      [-20, -45, 0.3],
    ],
    plug(-22.5, -36, "+y"),
  );
  const cableC = looseCable(
    [47.5, -22.5, 10],
    [
      [50.5, -22.5, PLATE_U_H + 0.3],
      [54, -22.5, 0.3],
      [54, 12, 0.3],
    ],
    plug(30, 9.5, "-x"),
  );
  // Back to front: the meter row first, then the server and the speaker.
  // Rows: 0 speaker (marketing), 1 server (tech), 2 the meter and the loose
  // cables (you, connecting the dots).
  return [
    row(2, smallPlate(MTR_U), meter(MTR_U, "side", REST.usual), cableB),
    row(1, smallPlate(SRV_U), server(SRV_U, "side")),
    row(0, smallPlate(SPK_U), speaker(SPK_U, "side")),
    row(2, cableA, cableC),
  ].join("");
}

// ------------------------------------------------------------ softexedge way
function basePlate() {
  const out = [
    `<path class="iso-halo" d="${k.haloOf(PLATE_O, -PLATE_O_H - FOOT_H, PLATE_O_H, P)}"/>`,
  ];
  const feet = k
    .corners(PLATE_O, 16)
    .sort(
      (a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P),
    );
  for (const [x, y] of feet) {
    out.push(
      S(k.cylinder(x, y, 6, -PLATE_O_H - FOOT_H, 1.4, P, 24), { tone: "lo" }),
    );
    out.push(
      S(k.cylinder(x, y, 4.6, -PLATE_O_H - FOOT_H + 1.4, FOOT_H - 1.4, P, 24), {
        tone: "mid",
      }),
    );
  }
  out.push(
    S(k.slabOf(PLATE_O, -PLATE_O_H, PLATE_O_H, P, 8, 1.4), { tone: "mid" }),
  );
  out.push(L(k.planOutline(k.insetPlan(PLATE_O, 5), 0, P), { tone: "lo" }));
  const screws = k.corners(PLATE_O, 9);
  out.push(
    L(screws.map(([x, y]) => k.ring(x, y, 2, 0, P, 16)).join(""), {
      tone: "lo",
    }),
  );
  out.push(
    D(
      screws.map(([x, y]) => at([x, y, 0])),
      { size: 0.5 },
    ),
  );
  // Label plate: printed lines stand for text, so they may stop on the face.
  const label: Plan = { x: -70, y: 22, w: 46, d: 9, r: 1.2 };
  out.push(S(k.slabOf(label, 0, 0.8, P, 3), { tone: "lo", crease: "none" }));
  out.push(
    L(k.planOutline(k.insetPlan(label, 1.4), 0.8, P, 3), { tone: "faint" }),
  );
  out.push(
    L(
      [30, 18]
        .map((w, i) =>
          k.lineOnTop(
            [label.x + 4, label.y + 3 + i * 2.8],
            [label.x + 4 + w, label.y + 3 + i * 2.8],
            0.8,
            P,
          ),
        )
        .join(""),
      { tone: "lo", free: true },
    ),
  );
  out.push(
    D([at([label.x + label.w - 3.4, label.y + label.d / 2, 0.8])], {
      size: 0.45,
    }),
  );
  // Ruler strip along the front edge: a tick every 4 units, major every 5th.
  const strip: Plan = { x: -14, y: 25, w: 76, d: 6, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(
    strip.x + 2,
    strip.x + strip.w - 2,
    4,
    5,
    strip.y + 0.4,
    0.6,
    [1.6, 3.2],
    P,
  );
  out.push(L(ticks.minor, { tone: "lo" }) + L(ticks.major, { tone: "mid" }));
  return out.join("");
}

/** Two bolted tabs either side of a module: it is fixed to the shared plate. */
function tabs(b: Box) {
  const y = b.y + b.d / 2 - 3.5;
  const pair: Plan[] = [
    { x: b.x - 5, y, w: 5, d: 7, r: 1 },
    { x: b.x + b.w, y, w: 5, d: 7, r: 1 },
  ];
  return pair
    .map(
      (tab) =>
        S(k.slabOf(tab, 0, 1.2, P, 3), { tone: "lo" }) +
        D([at([tab.x + 2.5, tab.y + 3.5, 1.2])], { size: 0.5, tone: "mid" }),
    )
    .join("");
}

function lamp() {
  const [x, y] = LAMP;
  return [
    `<path class="iso-halo" d="${k.haloOf({ x: x - 6, y: y - 6, w: 12, d: 12, r: 6 }, 0, 6, P)}"/>`,
    S(k.cylinder(x, y, 6, 0, 2, P, 32), { tone: "lo" }),
    S(k.cylinder(x, y, 4.6, 2, 7, P, 32, 0.6), {
      tone: "mid",
      inner: L(k.sideArc(x, y, 4.6, 5.5, P, 20), { tone: "faint" }),
    }),
    `<g data-part="lamp">${S(k.cylinder(x, y, 3.8, 9, 2.4, P, 32, 0.6), { tone: "hi", lit: true })}</g>`,
  ].join("");
}

function bus() {
  const wire = (from: Point3, via: Point3[], to: Point3) =>
    k
      .wireSvg(at(from), at(to), { via: via.map(at), tone: "mid", size: 0.9 })
      .replace('class="iso-wire"', 'class="iso-wire ways-bus"');
  return [
    wire(
      [-44, -10, 3],
      [
        [-44, -3, 0.6],
        [-24, -3, 0.6],
      ],
      [-24, -10, 2.6],
    ),
    wire(
      [6, -10, 2.6],
      [
        [6, -3, 0.6],
        [26, -3, 0.6],
      ],
      [26, -8, 4],
    ),
    wire(
      [48, -8, 4],
      [
        [48, 6, 0.6],
        [62, 6, 0.6],
      ],
      [LAMP[0] - 6, LAMP[1], 1],
    ),
  ];
}

function ours() {
  // Rows: 0 the shared plate (one vision), 1 meter + speaker and the cable
  // between them (business meets marketing), 2 server, its cables and the
  // lamp (tech brings it to life).
  const [speakerToMeter, meterToServer, serverToLamp] = bus();
  return [
    row(0, basePlate()),
    row(
      1,
      tabs(SPK_O),
      speaker(SPK_O, "front"),
      tabs(MTR_O),
      meter(MTR_O, "front", REST.ours),
    ),
    row(2, tabs(SRV_O), server(SRV_O, "front"), lamp()),
    row(1, speakerToMeter),
    row(2, meterToServer, serverToLamp),
  ].join("");
}

/** The two static figures, back to front. Live parts carry data-* hooks. */
/** Shifts a figure so its own bounds sit in the middle of the frame. */
function centred(art: string, bounds: Point3[]) {
  const flats = bounds.map(at);
  const xs = flats.map(([x]) => x);
  const ys = flats.map(([, y]) => y);
  const dx = tenth(WIDTH / 2 - (Math.min(...xs) + Math.max(...xs)) / 2);
  const dy = tenth(HEIGHT / 2 - (Math.min(...ys) + Math.max(...ys)) / 2);
  return `<g transform="translate(${dx} ${dy})">${art}</g>`;
}

export const ART = {
  usual: centred(usual(), USUAL_BOUNDS),
  ours: centred(ours(), OURS_BOUNDS),
};

const pivotOf = (b: Box): [number, number] => [
  b.x + METER.pivot.x,
  -(b.z + METER.pivot.z),
];

/** What the client needs to move the live parts. */
export const LIVE = {
  usual: { pivot: pivotOf(MTR_U) },
  ours: { pivot: pivotOf(MTR_O) },
};
