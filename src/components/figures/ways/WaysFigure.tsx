import "@/components/iso/iso.css";
import "./ways.css";
import { ART, HEIGHT, LIVE, WIDTH } from "./geometry";
import WaysLive from "./WaysLive";

const LABELS = {
  usual:
    "Three bench instruments, a loudspeaker, a panel meter and a server, each on its own plate. Their cables run out to plugs lying loose on the floor, and the needle and lights flicker out of step.",
  ours: "The same loudspeaker, panel meter and server bolted to one base plate and wired in a chain to a single lamp. One beat lights all of them together and the meter holds a steady reading.",
};

/**
 * Server component: the static art is built here (geometry.ts), only the
 * moving parts are animated on the client (WaysLive). The home page passes
 * one per comparison card into AboutSection. The usual way is drawn on paper
 * (light), the Softexedge way on the dark featured card.
 */
export default function WaysFigure({ way }: { way: "usual" | "ours" }) {
  return (
    <div
      className="iso ways-figure"
      data-way={way}
      data-theme={way === "usual" ? "light" : undefined}
    >
      <WaysLive
        art={ART[way]}
        width={WIDTH}
        height={HEIGHT}
        label={LABELS[way]}
        way={way}
        pivot={LIVE[way].pivot}
      />
    </div>
  );
}
