import { presets } from "../presets";
import { parseTheme, validateTheme } from "../schema/theme-schema";
import type { ThemeSpec } from "../schema/theme-spec";

/**
 * Import theme from JSON string. Throws on invalid JSON or schema.
 */
export function importFromJSON(json: string): ThemeSpec {
  const parsed = JSON.parse(json) as unknown;
  return parseTheme(parsed);
}

/**
 * Import theme from JSON with validation. Returns { success, theme?, errors }.
 */
export function importFromJSONSafe(
  json: string,
): { success: true; theme: ThemeSpec } | { success: false; errors: string[] } {
  try {
    const parsed = JSON.parse(json) as unknown;
    const result = validateTheme(parsed);
    if (result.success) {
      return { success: true, theme: parseTheme(parsed) };
    }
    return { success: false, errors: result.errors };
  } catch (e) {
    return {
      success: false,
      errors: [e instanceof Error ? e.message : "Invalid JSON"],
    };
  }
}

const CSS_VAR_MAP: Record<string, string> = {
  "--color-background-base": "colors.background.base",
  "--color-background-subtle": "colors.background.subtle",
  "--color-background-muted": "colors.background.muted",
  "--color-foreground-base": "colors.foreground.base",
  "--color-foreground-subtle": "colors.foreground.subtle",
  "--color-foreground-muted": "colors.foreground.muted",
  "--color-primary-base": "colors.primary.base",
  "--color-primary-foreground": "colors.primary.foreground",
  "--color-secondary-base": "colors.secondary.base",
  "--color-secondary-foreground": "colors.secondary.foreground",
  "--color-accent-base": "colors.accent.base",
  "--color-accent-foreground": "colors.accent.foreground",
  "--color-destructive-base": "colors.destructive.base",
  "--color-destructive-foreground": "colors.destructive.foreground",
  "--color-border-base": "colors.border.base",
  "--color-ring": "colors.ring",
  "--color-surface-base": "colors.surface.base",
  "--color-surface-glass": "colors.surface.glass",
  "--bg-gradient": "colors.background.gradient.value",
};

function setNested(obj: Record<string, unknown>, path: string, value: string) {
  const parts = path.split(".");
  let current: Record<string, unknown> = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    if (!(key in current)) current[key] = {};
    current = current[key] as Record<string, unknown>;
  }
  current[parts[parts.length - 1]] = value;
}

/**
 * Import partial theme from CSS string (extracts variables).
 */
export function importFromCSS(css: string): Partial<ThemeSpec> {
  const base = presets[0];
  const partial: Record<string, unknown> = JSON.parse(
    JSON.stringify({ colors: base.colors }),
  );

  const varRegex = /(--[a-z0-9-]+)\s*:\s*([^;]+)/g;
  let m: RegExpExecArray | null;
  while ((m = varRegex.exec(css)) !== null) {
    const [, name, value] = m;
    const trimmed = value.trim();
    const path = CSS_VAR_MAP[name];
    if (path) {
      setNested(partial, path, trimmed);
    }
  }

  return partial as Partial<ThemeSpec>;
}

/**
 * VSCode theme format: { colors: { "editor.background": "#fff", ... } }
 */
export function importFromVSCodeTheme(json: string): Partial<ThemeSpec> {
  const vsc: { colors?: Record<string, string> } = JSON.parse(json);
  if (!vsc.colors) return {};

  const map: Record<string, string> = {
    "editor.background": "colors.background.base",
    "editor.foreground": "colors.foreground.base",
    "button.background": "colors.primary.base",
    "button.foreground": "colors.primary.foreground",
    "input.background": "colors.surface.base",
    "input.border": "colors.border.base",
  };

  const base = presets[0];
  const partial: Record<string, unknown> = JSON.parse(
    JSON.stringify({ colors: base.colors }),
  );

  for (const [vsKey, value] of Object.entries(vsc.colors)) {
    const path = map[vsKey];
    if (path) setNested(partial, path, value);
  }

  return partial as Partial<ThemeSpec>;
}
