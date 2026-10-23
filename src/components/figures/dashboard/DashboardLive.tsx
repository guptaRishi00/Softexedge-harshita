"use client";

import { useCallback, useRef } from "react";
import type { Flat, Projection } from "@/components/iso/iso-kit";
import { follow, useInView, useLoop, useStillness } from "@/components/iso/react/live";
import { CHART, needlePath, TRACK_LEN, trendPoint } from "./frame";
import { readoutOf, VISITS_MAX, WINDOW, weekEnding } from "./model";

/** Seconds between days while the figure tours on its own. */
const DAY_SECONDS = 2.8;
/** Easing time constant for every moving part. */
const EASE = 0.45;
/** After a key press the tour waits this long before moving on by itself. */
const KEY_PAUSE = 8;

interface Props {
  /** Static SVG built on the server (geometry.ts). */
  art: string;
  width: number;
  height: number;
  label: string;
  projection: Projection;
  /** Screen vector of one world unit along +x (fader travel). */
  ex: Flat;
  start: number;
}

interface Pose {
  heights: number[];
  convs: number[];
  gauge: number;
  mix: number[];
}

const poseOf = (day: number): Pose => {
  const week = weekEnding(day);
  return {
    heights: week.map((d) => Math.max(0.6, (d.visits / VISITS_MAX) * (CHART.top - CHART.base))),
    convs: week.map((d) => d.conversion),
    gauge: week[WINDOW - 1].conversion,
    mix: [...week[WINDOW - 1].mix],
  };
};

const fixed = (value: number) => Math.round(value * 100) / 100;

/**
 * Moves the console: each day the screen's bars and trend shift to the new
 * rolling week, the faders slide to that day's channel mix, the gauge needle
 * swings to its conversion rate; the day is announced to screen readers.
 * Tours on its own while on screen; hover or focus pauses it, ← / → step a
 * day. Reduced motion: no tour, and keys jump straight to the new day.
 */
export default function DashboardLive({ art, width, height, label, projection, ex, start }: Props) {
  const anchor = useRef<HTMLDivElement>(null);
  const inView = useInView(anchor);
  const still = useStillness();
  const status = useRef<HTMLOutputElement>(null);

  const day = useRef(start);
  const target = useRef<Pose>(poseOf(start));
  const shown = useRef<Pose>(poseOf(start));
  const clock = useRef(0);
  const held = useRef(false);
  const pausedUntil = useRef(0);
  const blinkTimer = useRef(0);

  const write = useCallback(() => {
    const root = anchor.current;
    if (!root) return;
    const pose = shown.current;
    pose.heights.forEach((h, i) => {
      const bar = root.querySelector(`[data-bar="${i}"]`);
      bar?.setAttribute("y", String(fixed(-(CHART.base + h))));
      bar?.setAttribute("height", String(fixed(h)));
    });
    const points = pose.convs.map((c, i) => trendPoint(i, c));
    root.querySelector('[data-part="trend"]')?.setAttribute("d", `M${points.map(([u, v]) => `${u} ${v}`).join("L")}`);
    points.forEach(([u, v], i) => {
      const dot = root.querySelector(`[data-dot="${i}"]`);
      dot?.setAttribute("cx", String(u));
      dot?.setAttribute("cy", String(v));
    });
    root.querySelector('[data-part="needle"]')?.setAttribute("d", needlePath(pose.gauge, projection));
    pose.mix.forEach((share, i) => {
      const travel = share * TRACK_LEN;
      root.querySelector(`[data-cap="${i}"]`)?.setAttribute("transform", `translate(${fixed(ex[0] * travel)} ${fixed(ex[1] * travel)})`);
    });
  }, [ex, projection]);

  const settle = (dt: number, calm: boolean) => {
    const from = shown.current;
    const to = target.current;
    let moving = false;
    const ease = (a: number, b: number) => {
      const next = follow(a, b, dt, EASE, calm);
      if (next !== b) moving = true;
      return next;
    };
    shown.current = {
      heights: from.heights.map((h, i) => ease(h, to.heights[i])),
      convs: from.convs.map((c, i) => ease(c, to.convs[i])),
      gauge: ease(from.gauge, to.gauge),
      mix: from.mix.map((m, i) => ease(m, to.mix[i])),
    };
    return moving;
  };

  const goTo = useCallback(
    (next: number) => {
      day.current = next;
      target.current = poseOf(next);
      const text = readoutOf(weekEnding(next)[WINDOW - 1]);
      if (status.current) status.current.textContent = text;
      const led = anchor.current?.querySelector('[data-part="led"]');
      if (led) {
        led.setAttribute("data-blink", "");
        window.clearTimeout(blinkTimer.current);
        blinkTimer.current = window.setTimeout(() => led.removeAttribute("data-blink"), 260);
      }
    },
    [],
  );

  const kick = useLoop((dt, calm) => {
    const touring = !calm && !held.current && performance.now() > pausedUntil.current;
    if (touring) {
      clock.current += dt;
      if (clock.current >= DAY_SECONDS) {
        clock.current = 0;
        goTo(day.current + 1);
      }
    }
    const moving = settle(dt, calm);
    if (moving || calm) write();
    return touring || moving;
  }, inView && !still);

  const step = (by: number) => {
    goTo(day.current + by);
    clock.current = 0;
    pausedUntil.current = performance.now() + KEY_PAUSE * 1000;
    kick();
  };

  const hold = (on: boolean) => {
    held.current = on;
    if (!on) {
      clock.current = 0;
      kick();
    }
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: a keyboard-driven figure, not a form, so <fieldset> would be the wrong element
    <div
      ref={anchor}
      className="iso-stage dash-stage"
      // biome-ignore lint/a11y/noNoninteractiveTabindex: focusable so ← / → can step the days; announced via the role and label
      tabIndex={0}
      role="group"
      aria-label={`${label} Use the left and right arrow keys to step through the days.`}
      onPointerEnter={() => hold(true)}
      onPointerLeave={() => hold(false)}
      onFocus={() => hold(true)}
      onBlur={() => hold(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          step(event.key === "ArrowRight" ? 1 : -1);
        }
      }}
    >
      <svg
        className="iso-svg"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={label}
        focusable="false"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static SVG built on the server from our own geometry (geometry.ts); no user input reaches it
        dangerouslySetInnerHTML={{ __html: art }}
      />
      <output ref={status} className="sr-only" aria-live="polite" />
    </div>
  );
}
