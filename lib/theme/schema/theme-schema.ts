import { z } from "zod";
import type { ThemeSpec } from "./theme-spec";

// ─── Custom Validators ──────────────────────────────────────

const colorString = z
  .string()
  .refine(
    (val) =>
      /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(val) ||
      /^hsl\([^)]+\)$/.test(val) ||
      /^hsla\([^)]+\)$/.test(val) ||
      /^oklch\([^)]+\)$/.test(val) ||
      /^rgba?\([^)]+\)$/.test(val) ||
      val === "transparent",
    { message: "Invalid color: expected hex, hsl, oklch, or rgba" }
  );

const gradientString = z
  .string()
  .refine(
    (val) =>
      val.startsWith("linear-gradient(") ||
      val.startsWith("radial-gradient(") ||
      val.startsWith("conic-gradient("),
    { message: "Gradient must start with linear-gradient, radial-gradient, or conic-gradient" }
  );

const blurValue = z
  .string()
  .refine((val) => /^\d+(\.\d+)?(px|rem)$/.test(val) || val === "0" || val === "0px",
    { message: "Blur value must end with px or rem" }
  );

// ─── Schema Definitions ─────────────────────────────────────

const colorScaleSchema = z.object({
  base: colorString,
  hover: colorString,
  active: colorString,
  foreground: colorString,
});

const neutralScaleSchema = z.object({
  base: colorString,
  subtle: colorString,
  muted: colorString,
});

const backgroundSchema = neutralScaleSchema.extend({
  type: z.enum(["solid", "gradient", "mesh"]),
  gradient: z
    .object({
      value: gradientString,
      fallback: colorString,
    })
    .optional(),
});

const themeColorsSchema = z.object({
  background: backgroundSchema,
  foreground: neutralScaleSchema,
  primary: colorScaleSchema,
  secondary: colorScaleSchema,
  accent: colorScaleSchema,
  destructive: z.object({ base: colorString, foreground: colorString }),
  warning: z.object({ base: colorString, foreground: colorString }),
  success: z.object({ base: colorString, foreground: colorString }),
  info: z.object({ base: colorString, foreground: colorString }),
  border: z.object({
    base: colorString,
    subtle: colorString,
    strong: colorString,
    glass: colorString,
  }),
  ring: colorString,
  surface: z.object({
    base: colorString,
    raised: colorString,
    overlay: colorString,
    inset: colorString,
    glass: colorString,
    glassHover: colorString,
  }),
  chart: z.object({
    series: z.array(colorString).min(5).max(12),
  }),
});

const themeTypographySchema = z.object({
  fontFamily: z.object({
    heading: z.string(),
    body: z.string(),
    mono: z.string(),
  }),
  fontSize: z.object({
    xs: z.string(),
    sm: z.string(),
    base: z.string(),
    lg: z.string(),
    xl: z.string(),
    "2xl": z.string(),
    "3xl": z.string(),
    "4xl": z.string(),
    "5xl": z.string(),
  }),
  fontWeight: z.object({
    light: z.number(),
    normal: z.number(),
    medium: z.number(),
    semibold: z.number(),
    bold: z.number(),
    extrabold: z.number(),
  }),
  lineHeight: z.object({
    none: z.string(),
    tight: z.string(),
    snug: z.string(),
    normal: z.string(),
    relaxed: z.string(),
    loose: z.string(),
  }),
  letterSpacing: z.object({
    tighter: z.string(),
    tight: z.string(),
    normal: z.string(),
    wide: z.string(),
    wider: z.string(),
    widest: z.string(),
  }),
  headingStyle: z.object({
    textTransform: z.enum(["none", "uppercase", "capitalize"]),
    defaultWeight: z.enum([
      "light",
      "normal",
      "medium",
      "semibold",
      "bold",
      "extrabold",
    ]),
    defaultTracking: z.enum([
      "tighter",
      "tight",
      "normal",
      "wide",
      "wider",
      "widest",
    ]),
  }),
});

const spacingValuesSchema = z.object({
  0: z.string(),
  px: z.string(),
  0.5: z.string(),
  1: z.string(),
  1.5: z.string(),
  2: z.string(),
  3: z.string(),
  4: z.string(),
  5: z.string(),
  6: z.string(),
  8: z.string(),
  10: z.string(),
  12: z.string(),
  16: z.string(),
  20: z.string(),
  24: z.string(),
});

const themeSpacingSchema = z.object({
  density: z.number().min(0.5).max(2),
  values: spacingValuesSchema,
});

const themeBordersSchema = z.object({
  radius: z.object({
    none: z.string(),
    sm: z.string(),
    md: z.string(),
    lg: z.string(),
    xl: z.string(),
    "2xl": z.string(),
    full: z.string(),
  }),
  width: z.object({
    0: z.string(),
    1: z.string(),
    2: z.string(),
    4: z.string(),
    8: z.string(),
  }),
  style: z.enum(["solid", "dashed", "dotted", "double", "none"]),
  opacity: z.number().min(0).max(1),
});

const themeShadowsSchema = z.object({
  none: z.string(),
  sm: z.string(),
  md: z.string(),
  lg: z.string(),
  xl: z.string(),
  "2xl": z.string(),
  inner: z.string(),
  glow: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.string(),
  }),
});

const themeSurfaceEffectsSchema = z.object({
  backdrop: z.object({
    blur: blurValue,
    saturate: z.string(),
    brightness: z.string(),
  }),
  material: z.enum(["opaque", "glass", "frosted", "translucent"]),
  noise: z.object({
    enabled: z.boolean(),
    opacity: z.number().min(0).max(1),
    size: z.enum(["fine", "medium", "coarse"]),
  }),
  glow: z.object({
    enabled: z.boolean(),
    intensity: z.enum(["subtle", "medium", "strong"]),
    color: colorString,
    spread: z.string(),
  }),
  tint: z.object({
    color: colorString,
    strength: z.number().min(0).max(1),
  }),
});

const themeTransitionsSchema = z.object({
  duration: z.object({
    fastest: z.string(),
    fast: z.string(),
    normal: z.string(),
    slow: z.string(),
    slowest: z.string(),
  }),
  easing: z.object({
    linear: z.string(),
    easeIn: z.string(),
    easeOut: z.string(),
    easeInOut: z.string(),
    spring: z.string(),
  }),
});

const themeLayoutSchema = z.object({
  density: z.enum(["compact", "comfortable", "spacious"]),
  cardPadding: z.string(),
  gap: z.object({
    sm: z.string(),
    md: z.string(),
    lg: z.string(),
  }),
  containerMaxWidth: z.string(),
});

const themeA11ySchema = z.object({
  contrastMode: z.enum(["normal", "high", "highest"]),
  reducedMotion: z.boolean(),
  colorBlindSafe: z.boolean(),
  colorBlindType: z
    .enum(["protanopia", "deuteranopia", "tritanopia"])
    .optional(),
});

const visualArchetypeSchema = z.enum([
  "neon-dark",
  "clean-minimal",
  "glassmorphic",
  "corporate-sharp",
  "brutalist",
  "retro-warm",
  "cyberpunk",
  "pastel-soft",
  "monochrome",
  "editorial",
  "custom",
]);

const themeMetaSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  author: z.string().optional(),
  version: z.string(),
  tags: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
  isDark: z.boolean(),
  archetype: visualArchetypeSchema,
});

// ─── Full Theme Schema ───────────────────────────────────────

export const themeSpecSchema = z.object({
  meta: themeMetaSchema,
  colors: themeColorsSchema,
  typography: themeTypographySchema,
  spacing: themeSpacingSchema,
  borders: themeBordersSchema,
  shadows: themeShadowsSchema,
  effects: themeSurfaceEffectsSchema,
  transitions: themeTransitionsSchema,
  layout: themeLayoutSchema,
  a11y: themeA11ySchema.optional(),
});

// ─── Partial Theme Schema (for merge/import) ─────────────────

export const partialThemeSchema = themeSpecSchema.partial();

// ─── Exports ────────────────────────────────────────────────

export function parseTheme(input: unknown): ThemeSpec {
  return themeSpecSchema.parse(input) as ThemeSpec;
}

export function validateTheme(input: unknown): {
  success: boolean;
  errors: string[];
} {
  const result = themeSpecSchema.safeParse(input);
  if (result.success) {
    return { success: true, errors: [] };
  }
  const errors = result.error.issues.map(
    (e) => `${e.path.join(".")}: ${e.message}`
  );
  return { success: false, errors };
}
