"use client";

import { Color, Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef } from "react";

const PAD = 20;
const SWAY = 0.55;
const REST_ANGLE = 2.4;

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform vec2 uCenter;
uniform vec2 uHalfSize;
uniform float uRadius;
uniform float uAngle;
uniform float uPx;
uniform vec3 uLineColor;
uniform vec3 uLineColor2;
uniform vec3 uBaseColor;
uniform float uIntensity;
uniform float uShineSize;
uniform float uShineFade;
uniform float uThickness;
uniform float uBaseWidth;

out vec4 fragColor;

float sdRoundedRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

float shapeSDF(vec2 p) { return sdRoundedRect(p, uHalfSize, uRadius); }

float gaussianLine(float d, float sigma) {
  float x = d / (sigma + 1e-6);
  float k = mix(1.0, 1.6, smoothstep(0.0, 1.5, x));
  return exp(-k * x * x);
}

void main() {
  vec2 p = gl_FragCoord.xy - uCenter;
  float d = shapeSDF(p);
  vec2 L = vec2(cos(uAngle), sin(uAngle));

  float base = (1.0 - smoothstep(0.0, uBaseWidth, abs(d))) * 0.45;

  vec2 nEll = normalize(p / (uHalfSize * uHalfSize) + 1e-6);
  float phi = acos(clamp(abs(dot(nEll, L)), 0.0, 1.0));
  float rim = 1.0 - smoothstep(uShineSize - uShineFade, uShineSize + uShineFade + 1e-4, phi);
  float line = gaussianLine(d, uThickness);
  float edgeClamp = 1.0 - smoothstep(0.5 * uPx, max(3.0 * uPx, 3.0 * uThickness), abs(d));
  float hi = line * rim * edgeClamp * uIntensity;

  float g = clamp(0.5 + 0.5 * (p.x / uHalfSize.x), 0.0, 1.0);
  vec3 lineCol = mix(uLineColor, uLineColor2, g);

  vec3 col = uBaseColor * base + lineCol * hi;
  float a = clamp(base + hi, 0.0, 1.0);
  fragColor = vec4(col, a);
}
`;

type ShaderProps = {
  radius: number;
  lineColor: string;
  lineColor2: string;
  baseColor: string;
  intensity: number;
  shineSize: number;
  shineFade: number;
  thickness: number;
  speed: number;
  proximity: number;
};

export default function SpecularBorder({
  radius = 20,
  lineColor = "#2E5BFF",
  lineColor2 = "#2E5BFF",
  baseColor = "#525252",
  intensity = 2.5,
  shineSize = 10,
  shineFade = 40,
  thickness = 3,
  speed = 1.2,
  proximity = 320,
}: Partial<ShaderProps>) {
  const hostRef = useRef<HTMLSpanElement>(null);
  const fxRef = useRef<HTMLSpanElement>(null);
  const propsRef = useRef<ShaderProps>({
    radius,
    lineColor,
    lineColor2,
    baseColor,
    intensity,
    shineSize,
    shineFade,
    thickness,
    speed,
    proximity,
  });

  useEffect(() => {
    propsRef.current = {
      radius,
      lineColor,
      lineColor2,
      baseColor,
      intensity,
      shineSize,
      shineFade,
      thickness,
      speed,
      proximity,
    };
  }, [
    radius,
    lineColor,
    lineColor2,
    baseColor,
    intensity,
    shineSize,
    shineFade,
    thickness,
    speed,
    proximity,
  ]);

  useEffect(() => {
    const host = hostRef.current;
    const fx = fxRef.current;
    if (!host || !fx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dpr = window.devicePixelRatio || 1;
    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
      dpr,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) delete geometry.attributes.uv;

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uCenter: { value: [0, 0] },
        uHalfSize: { value: [1, 1] },
        uRadius: { value: 0 },
        uAngle: { value: 2.4 },
        uPx: { value: dpr },
        uLineColor: { value: [1, 1, 1] },
        uLineColor2: { value: [1, 1, 1] },
        uBaseColor: { value: [0.32, 0.32, 0.32] },
        uIntensity: { value: 1 },
        uShineSize: { value: 0.17 },
        uShineFade: { value: 0.7 },
        uThickness: { value: 1 },
        uBaseWidth: { value: dpr },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    fx.appendChild(gl.canvas);

    const sizeRef = { w: 1, h: 1 };

    const lineC = new Color();
    const lineC2 = new Color();
    const baseC = new Color();

    // Last frame's animation state, so an out-of-band repaint (resize) can
    // redraw without waiting for the rAF loop.
    let lastAngle = REST_ANGLE;
    let lastBright = 0;

    const applyUniforms = (angleValue: number, brightValue: number) => {
      lastAngle = angleValue;
      lastBright = brightValue;
      const p = propsRef.current;
      lineC.set(p.lineColor);
      lineC2.set(p.lineColor2);
      baseC.set(p.baseColor);
      program.uniforms.uAngle.value = angleValue;
      program.uniforms.uRadius.value =
        Math.min(p.radius, Math.min(sizeRef.w, sizeRef.h) / 2) * dpr;
      program.uniforms.uLineColor.value = [lineC.r, lineC.g, lineC.b];
      program.uniforms.uLineColor2.value = [lineC2.r, lineC2.g, lineC2.b];
      program.uniforms.uBaseColor.value = [baseC.r, baseC.g, baseC.b];
      program.uniforms.uIntensity.value = p.intensity * brightValue;
      program.uniforms.uShineSize.value = (p.shineSize * Math.PI) / 180;
      program.uniforms.uShineFade.value = (p.shineFade * Math.PI) / 180;
      program.uniforms.uThickness.value = p.thickness * dpr;
      renderer.render({ scene: mesh });
    };

    const resize = () => {
      const w = host.offsetWidth;
      const h = host.offsetHeight;
      if (w === 0 || h === 0) return;
      sizeRef.w = w;
      sizeRef.h = h;
      renderer.setSize(w + PAD * 2, h + PAD * 2);
      program.uniforms.uCenter.value = [
        (PAD + w / 2) * dpr,
        (PAD + h / 2) * dpr,
      ];
      program.uniforms.uHalfSize.value = [(w / 2) * dpr, (h / 2) * dpr];
      // Repaint SYNCHRONOUSLY: setSize resets the canvas backing store to
      // transparent, and waiting for the next rAF tick to redraw shows a
      // cleared frame. Harmless for cards that only transform on hover, but
      // brand-strategy's showcase animates the card's WIDTH (flex) for 0.8s
      // while this border is up — the ResizeObserver fires every frame of
      // that, and the alternating clear/redraw read as blinking. Redrawing
      // here, at the last frame's angle/brightness, means no cleared frame is
      // ever presented. Also makes the reduced-motion path survive resizes,
      // which previously blanked it for good (no rAF loop there).
      applyUniforms(lastAngle, lastBright);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    let pointerAngle: number | null = null;
    let proximityT = 1;
    const onPointerMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
      const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
      const dist = Math.hypot(dx, dy);
      if (dist === 0) {
        const nx = (e.clientX - cx) / (rect.width / 2);
        const ny = (cy - e.clientY) / (rect.height / 2);
        pointerAngle =
          Math.atan2(2 / rect.height, -2 / rect.width) + nx * 0.3 + ny * 0.15;
      } else {
        pointerAngle = Math.atan2(cy - e.clientY, e.clientX - cx);
      }
      const t = Math.max(0, 1 - dist / Math.max(propsRef.current.proximity, 1));
      proximityT = t * t * (3 - 2 * t);
    };

    if (reduced) {
      applyUniforms(REST_ANGLE, 1);
      return () => {
        ro.disconnect();
        if (gl.canvas.parentNode === fx) fx.removeChild(gl.canvas);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    }

    window.addEventListener("pointermove", onPointerMove);

    let angle = REST_ANGLE;
    let idleAngle = REST_ANGLE;
    let bright = 0;
    let last = performance.now();
    let raf = 0;

    const update = (now: number) => {
      raf = requestAnimationFrame(update);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const p = propsRef.current;

      idleAngle += p.speed * dt;
      const base = pointerAngle != null ? pointerAngle : REST_ANGLE;
      const target = base + Math.sin(idleAngle) * SWAY;
      const diff = ((target - angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      angle += diff * (1 - Math.exp(-dt * 7));
      bright += (proximityT - bright) * (1 - Math.exp(-dt * 8));

      applyUniforms(angle, bright);
    };
    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      if (gl.canvas.parentNode === fx) fx.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <span
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-30"
    >
      <span
        ref={fxRef}
        className="pointer-events-none absolute -inset-5 [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full"
      />
    </span>
  );
}
