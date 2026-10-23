"use client";

import { useRef } from "react";
import {
  follow,
  useInView,
  useLoop,
  useStillness,
} from "@/components/iso/react/live";
import { needleOf, REST } from "./frame";

/** One shared beat for every part of the Softexedge way, in seconds. */
const BEAT = 1.6;
/** How long a lit part stays on after its beat. */
const FLASH = 0.22;

interface Props {
  /** Static SVG built on the server (geometry.ts). */
  art: string;
  width: number;
  height: number;
  label: string;
  way: "usual" | "ours";
  /** The meter's pivot in its face coordinates. */
  pivot: [number, number];
}

/** Each usual-way part keeps its own clock: these never line up. */
const SPEAKER_PERIOD = 1.13;
const LED_PERIODS = [0.71, 1.37, 0.93, 1.81, 0.57];

const on = (el: Element | null | undefined, value: boolean) => {
  if (!el) return;
  if (value) el.setAttribute("data-on", "");
  else el.removeAttribute("data-on");
};

/**
 * Moves one comparison figure. The usual way: the meter needle wanders, the
 * speaker and each LED blink on unrelated clocks. The Softexedge way: one
 * beat lights the speaker, every LED and the lamp together, and the needle
 * holds a steady reading with a small lift on each beat. Runs only while on
 * screen; under reduced motion the server-drawn rest pose stays.
 */
export default function WaysLive({
  art,
  width,
  height,
  label,
  way,
  pivot,
}: Props) {
  const anchor = useRef<HTMLDivElement>(null);
  const inView = useInView(anchor);
  const still = useStillness();
  const clock = useRef(0);
  const reading = useRef(REST[way]);

  useLoop((dt, calm) => {
    const root = anchor.current;
    if (!root || calm) return false;
    clock.current += dt;
    const t = clock.current;
    const needle = root.querySelector('[data-part="needle"]');
    const cap = root.querySelector('[data-part="cap"]');
    const leds = root.querySelectorAll("[data-led]");

    if (way === "usual") {
      const wander =
        0.5 +
        0.26 * Math.sin(t * 1.7) +
        0.14 * Math.sin(t * 4.3 + 1) +
        0.06 * Math.sin(t * 9.1 + 2);
      reading.current = follow(reading.current, wander, dt, 0.12);
      on(cap, t % SPEAKER_PERIOD < FLASH);
      leds.forEach((led, i) => {
        on(led, (t + i * 0.37) % LED_PERIODS[i] < FLASH * 0.8);
      });
    } else {
      const phase = t % BEAT;
      const lit = phase < FLASH;
      reading.current = follow(
        reading.current,
        REST.ours + (lit ? 0.05 : 0),
        dt,
        0.18,
      );
      on(cap, lit);
      leds.forEach((led) => {
        on(led, lit);
      });
      on(root.querySelector('[data-part="lamp"]'), lit);
    }
    needle?.setAttribute("d", needleOf(pivot, reading.current));
    return true;
  }, inView && !still);

  return (
    <div
      ref={anchor}
      className="iso-stage ways-stage"
      data-running={inView && !still ? "" : undefined}
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
    </div>
  );
}
