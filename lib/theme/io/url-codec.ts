import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";
import type { ThemeSpec } from "../schema/theme-spec";
import { parseTheme } from "../schema/theme-schema";

const URL_PREFIX = "t=";

/**
 * Encode theme to URL-safe string (compressed).
 */
export function encodeThemeToURL(theme: ThemeSpec): string {
  const json = JSON.stringify(theme);
  return URL_PREFIX + compressToEncodedURIComponent(json);
}

/**
 * Decode theme from URL string.
 */
export function decodeThemeFromURL(encoded: string): ThemeSpec {
  const compressed = encoded.startsWith(URL_PREFIX)
    ? encoded.slice(URL_PREFIX.length)
    : encoded;
  const json = decompressFromEncodedURIComponent(compressed);
  if (!json) throw new Error("Invalid or empty theme data");
  return parseTheme(JSON.parse(json));
}

/**
 * Encode theme diff (only changed values from base) to URL.
 */
export function encodeThemeDiffToURL(theme: ThemeSpec, base: ThemeSpec): string {
  const diff = computeThemeDiff(theme, base);
  const json = JSON.stringify(diff);
  return URL_PREFIX + compressToEncodedURIComponent(json);
}

/**
 * Decode theme diff from URL and merge with base.
 */
export function decodeThemeDiffFromURL(
  encoded: string,
  base: ThemeSpec
): ThemeSpec {
  const compressed = encoded.startsWith(URL_PREFIX)
    ? encoded.slice(URL_PREFIX.length)
    : encoded;
  const json = decompressFromEncodedURIComponent(compressed);
  if (!json) throw new Error("Invalid or empty theme data");
  const diff = JSON.parse(json) as Record<string, unknown>;
  return mergeThemeDiff(base, diff);
}

function computeThemeDiff(
  theme: ThemeSpec,
  base: ThemeSpec,
  path = ""
): Record<string, unknown> {
  const diff: Record<string, unknown> = {};
  const themeObj = theme as unknown as Record<string, unknown>;
  const baseObj = base as unknown as Record<string, unknown>;

  for (const key of Object.keys(themeObj)) {
    const fullPath = path ? `${path}.${key}` : key;
    const themeVal = themeObj[key];
    const baseVal = baseObj[key];

    if (themeVal === baseVal) continue;

    if (
      themeVal !== null &&
      typeof themeVal === "object" &&
      !Array.isArray(themeVal) &&
      baseVal !== null &&
      typeof baseVal === "object" &&
      !Array.isArray(baseVal)
    ) {
      const nested = computeThemeDiff(
        themeVal as unknown as ThemeSpec,
        baseVal as unknown as ThemeSpec,
        fullPath
      );
      if (Object.keys(nested).length > 0) {
        diff[key] = nested;
      }
    } else {
      diff[key] = themeVal;
    }
  }
  return diff;
}

function mergeThemeDiff(
  base: ThemeSpec,
  diff: Record<string, unknown>
): ThemeSpec {
  const result = JSON.parse(
    JSON.stringify(base)
  ) as unknown as Record<string, unknown>;
  return deepMerge(result, diff) as unknown as ThemeSpec;
}

function deepMerge(
  target: Record<string, unknown>,
  source: Record<string, unknown>
): Record<string, unknown> {
  for (const key of Object.keys(source)) {
    const srcVal = source[key];
    const tgtVal = target[key];

    if (
      srcVal !== null &&
      typeof srcVal === "object" &&
      !Array.isArray(srcVal) &&
      tgtVal !== null &&
      typeof tgtVal === "object" &&
      !Array.isArray(tgtVal)
    ) {
      target[key] = deepMerge(
        tgtVal as Record<string, unknown>,
        srcVal as Record<string, unknown>
      );
    } else {
      target[key] = srcVal;
    }
  }
  return target;
}
