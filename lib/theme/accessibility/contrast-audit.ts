import type { ThemeSpec } from "../schema/theme-spec";
import { getContrastRatio } from "../engine/color-utils";
import { compositeColor } from "../engine/contrast-fixer";

export interface ContrastPair {
  foreground: string;
  background: string;
  foregroundLabel: string;
  backgroundLabel: string;
  ratio: number;
  passesAA: boolean;
  passesAAA: boolean;
  isGlass?: boolean;
}

/**
 * Computes all relevant fg/bg contrast pairs for a theme.
 * Includes glass-composited surfaces when material is glass.
 */
export function computeContrastPairs(theme: ThemeSpec): ContrastPair[] {
  const pairs: ContrastPair[] = [];
  const { colors, effects } = theme;
  const bgBase = colors.background.base;

  const add = (
    fg: string,
    bg: string,
    fgLabel: string,
    bgLabel: string,
    isGlass = false
  ) => {
    const ratio = getContrastRatio(fg, bg);
    pairs.push({
      foreground: fg,
      background: bg,
      foregroundLabel: fgLabel,
      backgroundLabel: bgLabel,
      ratio,
      passesAA: ratio >= 4.5,
      passesAAA: ratio >= 7,
      isGlass,
    });
  };

  add(colors.foreground.base, bgBase, "Foreground", "Background");
  add(colors.foreground.subtle, bgBase, "Foreground subtle", "Background");
  add(colors.foreground.muted, bgBase, "Foreground muted", "Background");

  add(
    colors.primary.foreground,
    colors.primary.base,
    "Primary fg",
    "Primary"
  );
  add(
    colors.secondary.foreground,
    colors.secondary.base,
    "Secondary fg",
    "Secondary"
  );
  add(colors.accent.foreground, colors.accent.base, "Accent fg", "Accent");

  add(colors.foreground.base, colors.surface.base, "Foreground", "Surface");
  add(colors.foreground.base, colors.surface.raised, "Foreground", "Surface raised");

  add(
    colors.destructive.foreground,
    colors.destructive.base,
    "Destructive fg",
    "Destructive"
  );
  add(colors.warning.foreground, colors.warning.base, "Warning fg", "Warning");
  add(colors.success.foreground, colors.success.base, "Success fg", "Success");
  add(colors.info.foreground, colors.info.base, "Info fg", "Info");

  if (
    effects.material === "glass" ||
    effects.material === "frosted" ||
    effects.material === "translucent"
  ) {
    const effectiveGlass = compositeColor(colors.surface.glass, bgBase);
    add(
      colors.foreground.base,
      effectiveGlass,
      "Foreground",
      "Glass (composited)",
      true
    );
  }

  return pairs;
}
