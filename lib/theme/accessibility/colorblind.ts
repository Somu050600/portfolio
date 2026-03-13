import { hexToOklch, oklchToHex } from "../engine/color-utils";

/**
 * Checks if two colors are distinguishable for common colorblind types.
 * Uses luminance difference as a proxy - colorblind users rely more on brightness.
 * Red/green combos with similar luminance are problematic for protanopia/deuteranopia.
 */
export function isColorblindSafe(
  color1: string,
  color2: string,
  minLuminanceDiff = 0.15
): boolean {
  const c1 = hexToOklch(color1);
  const c2 = hexToOklch(color2);
  if (!c1 || !c2) return true;
  const luminanceDiff = Math.abs(c1.l - c2.l);
  return luminanceDiff >= minLuminanceDiff;
}

/**
 * Adjusts a color to increase luminance difference from another (for colorblind safety).
 */
export function adjustForColorblind(
  color: string,
  reference: string,
  minDiff: number
): string {
  const c = hexToOklch(color);
  const ref = hexToOklch(reference);
  if (!c || !ref) return color;

  const diff = Math.abs(c.l - ref.l);
  if (diff >= minDiff) return color;

  const direction = c.l > ref.l ? 1 : -1;
  const newL = Math.max(0, Math.min(1, c.l + direction * (minDiff - diff)));
  return oklchToHex(newL, c.c, c.h);
}
