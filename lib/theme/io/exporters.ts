import { themeToCSS } from "../resolver/css-resolver";
import type { ThemeSpec } from "../schema/theme-spec";

/**
 * Export theme as JSON string.
 */
export function exportAsJSON(theme: ThemeSpec): string {
  return JSON.stringify(theme, null, 2);
}

/**
 * Export theme as CSS (variables + utility classes).
 */
export function exportAsCSS(theme: ThemeSpec, selector = ":root"): string {
  return themeToCSS(theme, selector);
}

/**
 * Export as Tailwind-ready CSS (variables only, no utility classes).
 */
export function exportAsTailwindCSS(theme: ThemeSpec): string {
  const vars = themeToCSS(theme, ":root").split(
    "/* Theme utility classes */",
  )[0];
  return vars?.trim() ?? themeToCSS(theme, ":root");
}

/**
 * Export as Tailwind config extend block (JS/TS).
 */
export function exportAsTailwindConfig(theme: ThemeSpec): string {
  const lines: string[] = [
    "// Add to tailwind.config.ts theme.extend",
    "colors: {",
    `  background: { DEFAULT: '${theme.colors.background.base}', subtle: '${theme.colors.background.subtle}', muted: '${theme.colors.background.muted}' },`,
    `  foreground: { DEFAULT: '${theme.colors.foreground.base}', subtle: '${theme.colors.foreground.subtle}', muted: '${theme.colors.foreground.muted}' },`,
    `  primary: { DEFAULT: '${theme.colors.primary.base}', foreground: '${theme.colors.primary.foreground}' },`,
    `  secondary: { DEFAULT: '${theme.colors.secondary.base}', foreground: '${theme.colors.secondary.foreground}' },`,
    `  accent: { DEFAULT: '${theme.colors.accent.base}', foreground: '${theme.colors.accent.foreground}' },`,
    `  destructive: { DEFAULT: '${theme.colors.destructive.base}', foreground: '${theme.colors.destructive.foreground}' },`,
    `  muted: { DEFAULT: '${theme.colors.background.muted}', foreground: '${theme.colors.foreground.muted}' },`,
    `  border: '${theme.colors.border.base}',`,
    `  ring: '${theme.colors.ring}',`,
    `  input: '${theme.colors.border.base}',`,
    `  card: { DEFAULT: '${theme.colors.surface.base}', foreground: '${theme.colors.foreground.base}' },`,
    "}",
    "borderRadius: {",
    ...Object.entries(theme.borders.radius).map(([k, v]) => `  ${k}: '${v}',`),
    "}",
  ];
  return lines.join("\n");
}

/**
 * Export as Shadcn-compatible CSS (uses same variable names as shadcn/ui).
 */
export function exportAsShadcnCSS(theme: ThemeSpec): string {
  return exportAsCSS(theme, ":root");
}
