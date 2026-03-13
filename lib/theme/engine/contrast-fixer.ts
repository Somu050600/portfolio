import { formatHex, converter, type RgbColor } from "culori";
import type { ThemeSpec } from "../schema/theme-spec";
import {
  adjustLightness,
  getContrastRatio,
  hexToOklch,
  meetsWCAG_AA,
  meetsWCAG_AAA,
} from "./color-utils";

const toRgb = converter("rgb") as (c: unknown) => RgbColor | null;

export interface ContrastFix {
  path: string;
  original: string;
  fixed: string;
  ratio: number;
}

/**
 * Composites a semi-transparent color over a background (Porter-Duff "over").
 */
export function compositeColor(foreground: string, background: string): string {
  const fg = toRgb(foreground);
  const bg = toRgb(background);
  if (!fg || !bg) return foreground;

  const fa = fg.alpha ?? 1;
  const r = (fg.r ?? 0) * fa + (bg.r ?? 0) * (1 - fa);
  const g = (fg.g ?? 0) * fa + (bg.g ?? 0) * (1 - fa);
  const b = (fg.b ?? 0) * fa + (bg.b ?? 0) * (1 - fa);

  return formatHex({ mode: "rgb", r, g, b }) ?? foreground;
}

function fixForegroundOnBackground(
  fg: string,
  bg: string,
  minRatio: number
): string {
  let current = fg;
  const bgOklch = hexToOklch(bg);
  const bgLight = bgOklch?.l ?? 0.5;
  // Dark bg → lighten fg; light bg → darken fg
  const step = bgLight < 0.5 ? 0.05 : -0.05;
  const maxIter = 40;

  for (let i = 0; i < maxIter; i++) {
    if (getContrastRatio(current, bg) >= minRatio) return current;
    current = adjustLightness(current, step);
  }
  return current;
}

/**
 * Validates and auto-fixes contrast for opaque and glass surfaces.
 * For glass, composites rgba surface over background to get effective color.
 */
export function fixContrast(
  theme: ThemeSpec,
  level: "AA" | "AAA"
): { theme: ThemeSpec; fixes: ContrastFix[] } {
  const fixes: ContrastFix[] = [];
  const minRatio = level === "AA" ? 4.5 : 7;
  const check = level === "AA" ? meetsWCAG_AA : meetsWCAG_AAA;
  const result = JSON.parse(JSON.stringify(theme)) as ThemeSpec;
  const bgBase = result.colors.background.base;

  // Primary foreground on primary base
  if (!check(result.colors.primary.foreground, result.colors.primary.base)) {
    const orig = result.colors.primary.foreground;
    const fixed = fixForegroundOnBackground(
      orig,
      result.colors.primary.base,
      minRatio
    );
    result.colors.primary.foreground = fixed;
    fixes.push({
      path: "colors.primary.foreground",
      original: orig,
      fixed,
      ratio: getContrastRatio(fixed, result.colors.primary.base),
    });
  }

  // Foreground on background
  if (!check(result.colors.foreground.base, bgBase)) {
    const orig = result.colors.foreground.base;
    const fixed = fixForegroundOnBackground(orig, bgBase, minRatio);
    result.colors.foreground.base = fixed;
    result.colors.foreground.subtle = fixed;
    result.colors.foreground.muted = fixed;
    fixes.push({
      path: "colors.foreground.base",
      original: orig,
      fixed,
      ratio: getContrastRatio(fixed, bgBase),
    });
  }

  // Glass surface: composite surface over background, then check foreground
  if (
    result.effects.material === "glass" ||
    result.effects.material === "frosted" ||
    result.effects.material === "translucent"
  ) {
    const effectiveSurface = compositeColor(
      result.colors.surface.glass,
      bgBase
    );
    if (!check(result.colors.foreground.base, effectiveSurface)) {
      const orig = result.colors.foreground.base;
      const fixed = fixForegroundOnBackground(
        orig,
        effectiveSurface,
        minRatio
      );
      result.colors.foreground.base = fixed;
      result.colors.foreground.subtle = fixed;
      result.colors.foreground.muted = fixed;
      fixes.push({
        path: "colors.foreground.base (on glass)",
        original: orig,
        fixed,
        ratio: getContrastRatio(fixed, effectiveSurface),
      });
    }
  }

  return { theme: result, fixes };
}
