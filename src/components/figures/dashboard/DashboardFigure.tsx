import "@/components/iso/iso.css";
import DashboardLive from "./DashboardLive";
import "./dashboard.css";
import { ART, HEIGHT, LIVE, WIDTH } from "./geometry";
import { START_DAY } from "./model";

const LABEL =
  "An isometric analytics console on a bench plate: a monitor whose screen charts a rolling week of visits as bars with a conversion trend line, a fader panel with one fader per traffic channel (search, ads, social), and a dial gauge reading the conversion rate.";

/**
 * Server component: the static art is built here (geometry.ts), only the
 * moving parts are animated on the client (DashboardLive). Rendered by the
 * home page and passed to AboutSection as its `visual`. Shown bare on the
 * white section: no kit card (Plate), so no corner labels and no border.
 */
export default function DashboardFigure() {
  return (
    <div className="iso dash-figure" data-theme="light">
      <DashboardLive art={ART} width={WIDTH} height={HEIGHT} label={LABEL} projection={LIVE.projection} ex={LIVE.ex} start={START_DAY} />
    </div>
  );
}
