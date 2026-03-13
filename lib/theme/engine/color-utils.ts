import {
  converter,
  formatHex,
  formatHex8,
  wcagContrast,
  type Oklch,
  type RgbColor,
} from "culori";

const toOklch = converter("oklch");
const toRgb = converter("rgb") as (c: unknown) => RgbColor | null;

export type HarmonyType =
  | "complementary"
  | "analogous"
  | "triadic"
  | "split-complementary"
  | "tetradic";

export function hexToOklch(hex: string): { l: number; c: number; h: number } | null {
  const c = toOklch(hex) as Oklch | undefined;
  if (!c || c.mode !== "oklch") return null;
  return { l: c.l, c: c.c ?? 0, h: c.h ?? 0 };
}

export function oklchToHex(l: number, c: number, h: number): string {
  const color = toRgb({ mode: "oklch", l, c, h });
  if (!color) return "#000000";
  return formatHex(color);
}

export function hexToRgba(hex: string, alpha: number): string {
  const color = toRgb(hex);
  if (!color) return `rgba(0,0,0,${alpha})`;
  const r = Math.round((color.r ?? 0) * 255);
  const g = Math.round((color.g ?? 0) * 255);
  const b = Math.round((color.b ?? 0) * 255);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function adjustLightness(color: string, amount: number): string {
  const c = toOklch(color) as Oklch | undefined;
  if (!c || c.mode !== "oklch") return color;
  const l = Math.max(0, Math.min(1, (c.l ?? 0) + amount));
  return oklchToHex(l, c.c ?? 0, c.h ?? 0);
}

export function adjustChroma(color: string, amount: number): string {
  const c = toOklch(color) as Oklch | undefined;
  if (!c || c.mode !== "oklch") return color;
  const chroma = Math.max(0, (c.c ?? 0) + amount);
  return oklchToHex(c.l ?? 0.5, chroma, c.h ?? 0);
}

export function rotateHue(color: string, degrees: number): string {
  const c = toOklch(color) as Oklch | undefined;
  if (!c || c.mode !== "oklch") return color;
  let h = (c.h ?? 0) + degrees;
  while (h < 0) h += 360;
  while (h >= 360) h -= 360;
  return oklchToHex(c.l ?? 0.5, c.c ?? 0, h);
}

export function setAlpha(color: string, alpha: number): string {
  const rgb = toRgb(color);
  if (!rgb) return `rgba(0,0,0,${alpha})`;
  return formatHex8({ ...rgb, alpha });
}

export function getContrastRatio(foreground: string, background: string): number {
  const ratio = wcagContrast(foreground, background);
  return ratio ?? 0;
}

export function meetsWCAG_AA(fg: string, bg: string): boolean {
  return getContrastRatio(fg, bg) >= 4.5;
}

export function meetsWCAG_AAA(fg: string, bg: string): boolean {
  return getContrastRatio(fg, bg) >= 7;
}

const HARMONY_OFFSETS: Record<HarmonyType, number[]> = {
  complementary: [180],
  analogous: [-30, 30],
  triadic: [120, 240],
  "split-complementary": [150, 210],
  tetradic: [90, 180, 270],
};

export function generateHarmony(baseHue: number, type: HarmonyType): number[] {
  const offsets = HARMONY_OFFSETS[type];
  return [baseHue, ...offsets.map((o) => (baseHue + o + 360) % 360)];
}

export function generateGradientMesh(
  hues: number[],
  lightness: number,
  chroma: number
): string {
  const stops = hues
    .map((h, i) => {
      const hex = oklchToHex(lightness, chroma, h);
      const pct = Math.round((i / (hues.length - 1)) * 100);
      return `${hex} ${pct}%`;
    })
    .join(", ");
  return `linear-gradient(135deg, ${stops})`;
}
