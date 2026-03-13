import type { ThemeSpec } from "../schema/theme-spec";

const FONT_WEIGHT_MAP: Record<string, string> = {
  light: "var(--font-weight-light)",
  normal: "var(--font-weight-normal)",
  medium: "var(--font-weight-medium)",
  semibold: "var(--font-weight-semibold)",
  bold: "var(--font-weight-bold)",
  extrabold: "var(--font-weight-extrabold)",
};

const LETTER_SPACING_MAP: Record<string, string> = {
  tighter: "var(--letter-spacing-tighter)",
  tight: "var(--letter-spacing-tight)",
  normal: "var(--letter-spacing-normal)",
  wide: "var(--letter-spacing-wide)",
  wider: "var(--letter-spacing-wider)",
  widest: "var(--letter-spacing-widest)",
};

function set(map: Map<string, string>, key: string, value: string) {
  if (value != null && value !== "") {
    map.set(key, value);
  }
}

/**
 * Generates inline SVG noise texture (base64).
 * Size affects grain: fine=64, medium=32, coarse=16
 */
function generateNoiseSvg(size: "fine" | "medium" | "coarse"): string {
  const px = size === "fine" ? 64 : size === "medium" ? 32 : 16;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/**
 * Takes a ThemeSpec and returns a flat Map of CSS variable names to values.
 */
export function resolveThemeToVariables(theme: ThemeSpec): Map<string, string> {
  const vars = new Map<string, string>();
  const {
    colors,
    typography,
    spacing,
    borders,
    shadows,
    effects,
    transitions,
    layout,
  } = theme;

  // Colors - background
  set(vars, "--color-background-base", colors.background.base);
  set(vars, "--color-background-subtle", colors.background.subtle);
  set(vars, "--color-background-muted", colors.background.muted);
  if (colors.background.type !== "solid" && colors.background.gradient) {
    set(vars, "--bg-gradient", colors.background.gradient.value);
    set(
      vars,
      "--color-background-fallback",
      colors.background.gradient.fallback,
    );
  }

  // Colors - foreground
  set(vars, "--color-foreground-base", colors.foreground.base);
  set(vars, "--color-foreground-subtle", colors.foreground.subtle);
  set(vars, "--color-foreground-muted", colors.foreground.muted);

  // Colors - primary, secondary, accent
  set(vars, "--color-primary-base", colors.primary.base);
  set(vars, "--color-primary-hover", colors.primary.hover);
  set(vars, "--color-primary-active", colors.primary.active);
  set(vars, "--color-primary-foreground", colors.primary.foreground);
  set(vars, "--color-secondary-base", colors.secondary.base);
  set(vars, "--color-secondary-hover", colors.secondary.hover);
  set(vars, "--color-secondary-active", colors.secondary.active);
  set(vars, "--color-secondary-foreground", colors.secondary.foreground);
  set(vars, "--color-accent-base", colors.accent.base);
  set(vars, "--color-accent-hover", colors.accent.hover);
  set(vars, "--color-accent-active", colors.accent.active);
  set(vars, "--color-accent-foreground", colors.accent.foreground);

  // Semantic colors
  set(vars, "--color-destructive-base", colors.destructive.base);
  set(vars, "--color-destructive-foreground", colors.destructive.foreground);
  set(vars, "--color-warning-base", colors.warning.base);
  set(vars, "--color-warning-foreground", colors.warning.foreground);
  set(vars, "--color-success-base", colors.success.base);
  set(vars, "--color-success-foreground", colors.success.foreground);
  set(vars, "--color-info-base", colors.info.base);
  set(vars, "--color-info-foreground", colors.info.foreground);

  // Border
  set(vars, "--color-border-base", colors.border.base);
  set(vars, "--color-border-subtle", colors.border.subtle);
  set(vars, "--color-border-strong", colors.border.strong);
  set(vars, "--color-border-glass", colors.border.glass);
  set(vars, "--color-ring", colors.ring);

  // Surface
  set(vars, "--color-surface-base", colors.surface.base);
  set(vars, "--color-surface-raised", colors.surface.raised);
  set(vars, "--color-surface-overlay", colors.surface.overlay);
  set(vars, "--color-surface-inset", colors.surface.inset);
  set(vars, "--color-surface-glass", colors.surface.glass);
  set(vars, "--color-surface-glass-hover", colors.surface.glassHover);

  // Typography - font families
  set(vars, "--font-family-heading", typography.fontFamily.heading);
  set(vars, "--font-family-body", typography.fontFamily.body);
  set(vars, "--font-family-mono", typography.fontFamily.mono);

  // Typography - font weights
  set(vars, "--font-weight-light", String(typography.fontWeight.light));
  set(vars, "--font-weight-normal", String(typography.fontWeight.normal));
  set(vars, "--font-weight-medium", String(typography.fontWeight.medium));
  set(vars, "--font-weight-semibold", String(typography.fontWeight.semibold));
  set(vars, "--font-weight-bold", String(typography.fontWeight.bold));
  set(vars, "--font-weight-extrabold", String(typography.fontWeight.extrabold));

  // Typography - letter spacing
  Object.entries(typography.letterSpacing).forEach(([k, v]) => {
    set(vars, `--letter-spacing-${k}`, v);
  });

  // Heading style (resolved)
  set(vars, "--heading-text-transform", typography.headingStyle.textTransform);
  set(
    vars,
    "--heading-default-weight",
    FONT_WEIGHT_MAP[typography.headingStyle.defaultWeight] ??
      String(typography.fontWeight.bold),
  );
  set(
    vars,
    "--heading-default-tracking",
    LETTER_SPACING_MAP[typography.headingStyle.defaultTracking] ??
      typography.letterSpacing.normal,
  );

  // Borders
  Object.entries(borders.radius).forEach(([k, v]) => {
    set(vars, `--radius-${k}`, v);
  });
  Object.entries(borders.width).forEach(([k, v]) => {
    set(vars, `--border-width-${k}`, v);
  });
  set(vars, "--border-style", borders.style);

  // Shadows
  set(vars, "--shadow-none", shadows.none);
  set(vars, "--shadow-sm", shadows.sm);
  set(vars, "--shadow-md", shadows.md);
  set(vars, "--shadow-lg", shadows.lg);
  set(vars, "--shadow-xl", shadows.xl);
  set(vars, "--shadow-2xl", shadows["2xl"]);
  set(vars, "--shadow-inner", shadows.inner);
  set(vars, "--glow-primary", shadows.glow.primary);
  set(vars, "--glow-secondary", shadows.glow.secondary);
  set(vars, "--glow-accent", shadows.glow.accent);

  // Effects
  set(vars, "--backdrop-blur", effects.backdrop.blur);
  set(vars, "--backdrop-saturate", effects.backdrop.saturate);
  set(vars, "--backdrop-brightness", effects.backdrop.brightness);
  set(vars, "--noise-opacity", String(effects.noise.opacity));
  if (effects.noise.enabled) {
    set(vars, "--noise-image", generateNoiseSvg(effects.noise.size));
  }

  // Layout
  set(vars, "--card-padding", layout.cardPadding);
  set(vars, "--container-max-width", layout.containerMaxWidth);
  set(vars, "--gap-sm", layout.gap.sm);
  set(vars, "--gap-md", layout.gap.md);
  set(vars, "--gap-lg", layout.gap.lg);

  // Transitions
  Object.entries(transitions.duration).forEach(([k, v]) => {
    set(vars, `--transition-duration-${k}`, v);
  });

  return vars;
}

/**
 * Serializes the variable map into a CSS string.
 * Includes utility classes for glass, glow, noise, heading-style, bg-theme-gradient.
 */
export function serializeVariablesToCSS(
  variables: Map<string, string>,
  theme: ThemeSpec,
  selector = ":root",
): string {
  const lines: string[] = [];

  // CSS variables block
  lines.push(`${selector} {`);
  Array.from(variables.entries()).forEach(([key, value]) => {
    lines.push(`  ${key}: ${value};`);
  });
  lines.push("}");

  // Utility classes
  lines.push("");
  lines.push("/* Theme utility classes */");

  // Glassmorphism
  if (
    theme.effects.material === "glass" ||
    theme.effects.material === "frosted" ||
    theme.effects.material === "translucent"
  ) {
    lines.push(`
.surface-glass {
  background: var(--color-surface-glass);
  backdrop-filter: blur(var(--backdrop-blur)) saturate(var(--backdrop-saturate)) brightness(var(--backdrop-brightness));
  -webkit-backdrop-filter: blur(var(--backdrop-blur)) saturate(var(--backdrop-saturate)) brightness(var(--backdrop-brightness));
  border: var(--border-width-1) var(--border-style) var(--color-border-glass);
}
.surface-glass:hover {
  background: var(--color-surface-glass-hover);
}`);
  }

  // Noise overlay
  if (theme.effects.noise.enabled) {
    lines.push(`
.surface-noise {
  position: relative;
}
.surface-noise::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url(var(--noise-image));
  opacity: var(--noise-opacity);
  pointer-events: none;
  border-radius: inherit;
}`);
  }

  // Glow on hover
  if (theme.effects.glow.enabled) {
    lines.push(`
.glow-primary:hover {
  box-shadow: var(--glow-primary);
}
.glow-secondary:hover {
  box-shadow: var(--glow-secondary);
}
.glow-accent:hover {
  box-shadow: var(--glow-accent);
}`);
  }

  // Gradient background
  if (
    theme.colors.background.type !== "solid" &&
    theme.colors.background.gradient
  ) {
    lines.push(`
.bg-theme-gradient {
  background: var(--bg-gradient, var(--color-background-base));
}`);
  }

  // Heading style
  lines.push(`
.heading-style {
  text-transform: var(--heading-text-transform);
  font-weight: var(--heading-default-weight);
  letter-spacing: var(--heading-default-tracking);
  font-family: var(--font-family-heading);
}`);

  return lines.join("\n");
}

/**
 * Returns the full CSS for a theme (variables + utilities).
 * Use for injecting theme at runtime.
 */
export function themeToCSS(theme: ThemeSpec, selector = ":root"): string {
  const vars = resolveThemeToVariables(theme);
  return serializeVariablesToCSS(vars, theme, selector);
}
