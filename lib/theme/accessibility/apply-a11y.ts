import type { ThemeSpec } from "../schema/theme-spec";
import { adjustLightness } from "../engine/color-utils";

/**
 * Applies high contrast mode to a theme.
 * - Foreground subtle/muted → closer to base for readability
 * - Border subtle → closer to base
 * - Glass surfaces → higher opacity for better contrast
 */
export function applyHighContrast(
  theme: ThemeSpec,
  level: "high" | "highest"
): ThemeSpec {
  const result = JSON.parse(JSON.stringify(theme)) as ThemeSpec;
  const isDark = theme.meta.isDark;
  const shift = level === "highest" ? 0.15 : 0.08;

  // Foreground: subtle and muted closer to base
  result.colors.foreground.subtle = adjustLightness(
    result.colors.foreground.base,
    isDark ? -shift : shift
  );
  result.colors.foreground.muted = adjustLightness(
    result.colors.foreground.base,
    isDark ? -shift * 1.5 : shift * 1.5
  );

  // Border: subtle closer to base
  result.colors.border.subtle = adjustLightness(
    result.colors.border.base,
    isDark ? shift : -shift
  );

  // Glass: increase opacity for better contrast
  if (
    result.effects.material === "glass" ||
    result.effects.material === "frosted" ||
    result.effects.material === "translucent"
  ) {
    const currentGlass = result.colors.surface.glass;
    const boost = level === "highest" ? 0.4 : 0.2;
    const rgbaMatch = currentGlass.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (rgbaMatch) {
      const r = rgbaMatch[1];
      const g = rgbaMatch[2];
      const b = rgbaMatch[3];
      const currentAlpha = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1;
      const alpha = Math.min(1, currentAlpha + boost);
      result.colors.surface.glass = `rgba(${r},${g},${b},${alpha})`;
      result.colors.surface.glassHover = `rgba(${r},${g},${b},${Math.min(1, alpha + 0.1)})`;
    }
    result.effects.tint.strength = Math.min(1, result.effects.tint.strength + boost);
  }

  return result;
}

/**
 * Returns theme with reduced motion (all durations 0).
 */
export function applyReducedMotion(theme: ThemeSpec): ThemeSpec {
  const result = JSON.parse(JSON.stringify(theme)) as ThemeSpec;
  Object.keys(result.transitions.duration).forEach((k) => {
    (result.transitions.duration as Record<string, string>)[k] = "0ms";
  });
  return result;
}
