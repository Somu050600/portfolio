// ─── Color Tokens ───────────────────────────────────────────

export interface ColorScale {
  base: string;
  hover: string;
  active: string;
  foreground: string;
}

export interface NeutralScale {
  base: string;
  subtle: string;
  muted: string;
}

export interface ThemeColors {
  background: NeutralScale & {
    type: "solid" | "gradient" | "mesh";
    gradient?: {
      value: string;
      fallback: string;
    };
  };

  foreground: NeutralScale;

  primary: ColorScale;
  secondary: ColorScale;
  accent: ColorScale;

  destructive: { base: string; foreground: string };
  warning: { base: string; foreground: string };
  success: { base: string; foreground: string };
  info: { base: string; foreground: string };

  border: {
    base: string;
    subtle: string;
    strong: string;
    glass: string;
  };

  ring: string;

  surface: {
    base: string;
    raised: string;
    overlay: string;
    inset: string;
    glass: string;
    glassHover: string;
  };

  chart: {
    series: string[];
  };
}

// ─── Typography Tokens ──────────────────────────────────────

export interface ThemeTypography {
  fontFamily: {
    heading: string;
    body: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    "4xl": string;
    "5xl": string;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
  };
  lineHeight: {
    none: string;
    tight: string;
    snug: string;
    normal: string;
    relaxed: string;
    loose: string;
  };
  letterSpacing: {
    tighter: string;
    tight: string;
    normal: string;
    wide: string;
    wider: string;
    widest: string;
  };
  headingStyle: {
    textTransform: "none" | "uppercase" | "capitalize";
    defaultWeight:
      | "light"
      | "normal"
      | "medium"
      | "semibold"
      | "bold"
      | "extrabold";
    defaultTracking:
      | "tighter"
      | "tight"
      | "normal"
      | "wide"
      | "wider"
      | "widest";
  };
}

// ─── Spacing Tokens ─────────────────────────────────────────

export interface ThemeSpacing {
  density: number;
  values: {
    0: string;
    px: string;
    0.5: string;
    1: string;
    1.5: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    8: string;
    10: string;
    12: string;
    16: string;
    20: string;
    24: string;
  };
}

// ─── Border Tokens ──────────────────────────────────────────

export interface ThemeBorders {
  radius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
    full: string;
  };
  width: {
    0: string;
    1: string;
    2: string;
    4: string;
    8: string;
  };
  style: "solid" | "dashed" | "dotted" | "double" | "none";
  opacity: number;
}

// ─── Shadow Tokens ──────────────────────────────────────────

export interface ThemeShadows {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  inner: string;
  glow: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

// ─── Surface Effect Tokens ─────────────────────────────────

export interface ThemeSurfaceEffects {
  backdrop: {
    blur: string;
    saturate: string;
    brightness: string;
  };
  material: "opaque" | "glass" | "frosted" | "translucent";
  noise: {
    enabled: boolean;
    opacity: number;
    size: "fine" | "medium" | "coarse";
  };
  glow: {
    enabled: boolean;
    intensity: "subtle" | "medium" | "strong";
    color: string;
    spread: string;
  };
  tint: {
    color: string;
    strength: number;
  };
}

// ─── Transition Tokens ──────────────────────────────────────

export interface ThemeTransitions {
  duration: {
    fastest: string;
    fast: string;
    normal: string;
    slow: string;
    slowest: string;
  };
  easing: {
    linear: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
    spring: string;
  };
}

// ─── Layout Density Tokens ──────────────────────────────────

export interface ThemeLayout {
  density: "compact" | "comfortable" | "spacious";
  cardPadding: string;
  gap: {
    sm: string;
    md: string;
    lg: string;
  };
  containerMaxWidth: string;
}

// ─── Accessibility Metadata ─────────────────────────────────

export interface ThemeA11y {
  contrastMode: "normal" | "high" | "highest";
  reducedMotion: boolean;
  colorBlindSafe: boolean;
  colorBlindType?: "protanopia" | "deuteranopia" | "tritanopia";
}

// ─── Theme Metadata ─────────────────────────────────────────

export type VisualArchetype =
  | "neon-dark"
  | "clean-minimal"
  | "glassmorphic"
  | "corporate-sharp"
  | "brutalist"
  | "retro-warm"
  | "cyberpunk"
  | "pastel-soft"
  | "monochrome"
  | "editorial"
  | "custom";

export interface ThemeMeta {
  id: string;
  name: string;
  description?: string;
  author?: string;
  version: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isDark: boolean;
  archetype: VisualArchetype;
}

// ─── Full Theme Spec ────────────────────────────────────────

export interface ThemeSpec {
  meta: ThemeMeta;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  borders: ThemeBorders;
  shadows: ThemeShadows;
  effects: ThemeSurfaceEffects;
  transitions: ThemeTransitions;
  layout: ThemeLayout;
  a11y?: ThemeA11y;
}
