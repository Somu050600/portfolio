import type { ThemeBorders } from "../schema/theme-spec";

export const RADIUS_SCALES: Record<
  string,
  ThemeBorders["radius"]
> = {
  none: {
    none: "0px",
    sm: "0px",
    md: "0px",
    lg: "2px",
    xl: "2px",
    "2xl": "4px",
    full: "9999px",
  },
  minimal: {
    none: "0px",
    sm: "2px",
    md: "4px",
    lg: "4px",
    xl: "6px",
    "2xl": "8px",
    full: "9999px",
  },
  small: {
    none: "0px",
    sm: "4px",
    md: "6px",
    lg: "8px",
    xl: "12px",
    "2xl": "16px",
    full: "9999px",
  },
  medium: {
    none: "0px",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    "2xl": "20px",
    full: "9999px",
  },
  large: {
    none: "0px",
    sm: "8px",
    md: "16px",
    lg: "20px",
    xl: "24px",
    "2xl": "32px",
    full: "9999px",
  },
  pill: {
    none: "0px",
    sm: "12px",
    md: "20px",
    lg: "28px",
    xl: "36px",
    "2xl": "44px",
    full: "9999px",
  },
};

export function resolveRadiusScale(
  scale: keyof typeof RADIUS_SCALES
): ThemeBorders["radius"] {
  return RADIUS_SCALES[scale] ?? RADIUS_SCALES.medium;
}
