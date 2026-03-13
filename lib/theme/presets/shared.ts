import type { ThemeSpec } from "../schema/theme-spec";

/** Layout gap scales aligned with density (compact | comfortable | spacious) */
export const baseLayoutGaps = {
  compact: { sm: "0.5rem", md: "1rem", lg: "1.5rem" },
  comfortable: { sm: "0.75rem", md: "1.25rem", lg: "2rem" },
  spacious: { sm: "1rem", md: "1.5rem", lg: "2.5rem" },
} as const;

/** Base spacing values shared across presets */
export const baseSpacingValues = {
  0: "0",
  px: "1px",
  0.5: "0.125rem",
  1: "0.25rem",
  1.5: "0.375rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
} as const;

/** Base typography shared across presets */
export const baseTypography = {
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeight: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
} as const;

/** Base transitions */
export const baseTransitions = {
  duration: {
    fastest: "75ms",
    fast: "150ms",
    normal: "200ms",
    slow: "300ms",
    slowest: "500ms",
  },
  easing: {
    linear: "linear",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
} as const;

export function createMeta(
  id: string,
  name: string,
  archetype: ThemeSpec["meta"]["archetype"],
  isDark: boolean,
  tags: string[]
) {
  const now = new Date().toISOString();
  return {
    id,
    name,
    archetype,
    isDark,
    tags,
    version: "1.0.0",
    createdAt: now,
    updatedAt: now,
  };
}
