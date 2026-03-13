import { nanoid } from "nanoid";
import seedrandom from "seedrandom";
import type { ThemeSpec, VisualArchetype } from "../schema/theme-spec";
import {
  baseSpacingValues,
  baseTypography,
  baseTransitions,
  createMeta,
} from "../presets/shared";
import { ARCHETYPE_CONFIGS } from "./archetypes";
import {
  adjustLightness,
  generateGradientMesh,
  generateHarmony,
  hexToRgba,
  oklchToHex,
  type HarmonyType,
} from "./color-utils";
import { fixContrast } from "./contrast-fixer";
import { resolveFontMood } from "./font-resolver";
import { resolveRadiusScale } from "./radius-resolver";

export interface GeneratorOptions {
  archetype?: VisualArchetype;
  baseHue?: number;
  harmony?: HarmonyType;
  isDark?: boolean;
  saturation?: "muted" | "normal" | "vivid";
  contrastMode?: "normal" | "high" | "highest";
  colorBlindSafe?: boolean;
  seed?: string;
}

const ARCHETYPES: VisualArchetype[] = [
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
].filter((a) => a !== "custom") as VisualArchetype[];

function pick<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function generateShadows(
  style: string,
  colored: boolean,
  glow: boolean,
  primaryHex: string,
  secondaryHex: string,
  accentHex: string,
  isDark: boolean
): ThemeSpec["shadows"] {
  const alpha = isDark ? 0.4 : 0.08;
  const base = `rgba(0,0,0,${alpha})`;

  const glowAlpha = glow ? (isDark ? 0.35 : 0.2) : 0;
  const primaryGlow = colored
    ? `0 0 20px ${hexToRgba(primaryHex, glowAlpha)}`
    : `0 0 20px rgba(0,0,0,${glowAlpha})`;
  const secondaryGlow = colored
    ? `0 0 20px ${hexToRgba(secondaryHex, glowAlpha)}`
    : primaryGlow;
  const accentGlow = colored
    ? `0 0 20px ${hexToRgba(accentHex, glowAlpha)}`
    : primaryGlow;

  switch (style) {
    case "none":
      return {
        none: "none",
        sm: "none",
        md: "none",
        lg: "none",
        xl: "none",
        "2xl": "none",
        inner: "none",
        glow: { primary: primaryGlow, secondary: secondaryGlow, accent: accentGlow },
      };
    case "hard-offset":
      return {
        none: "none",
        sm: `4px 4px 0 ${base}`,
        md: `8px 8px 0 ${base}`,
        lg: `12px 12px 0 ${base}`,
        xl: `16px 16px 0 ${base}`,
        "2xl": `24px 24px 0 ${base}`,
        inner: `inset 4px 4px 0 ${base}`,
        glow: { primary: primaryGlow, secondary: secondaryGlow, accent: accentGlow },
      };
    case "dramatic":
      return {
        none: "none",
        sm: `0 4px 12px ${base}`,
        md: `0 8px 24px ${base}`,
        lg: `0 16px 48px ${base}`,
        xl: `0 24px 64px ${base}`,
        "2xl": `0 32px 96px ${base}`,
        inner: `inset 0 4px 8px ${base}`,
        glow: { primary: primaryGlow, secondary: secondaryGlow, accent: accentGlow },
      };
    case "soft":
      return {
        none: "none",
        sm: `0 2px 8px rgba(0,0,0,${alpha * 0.5})`,
        md: `0 4px 16px rgba(0,0,0,${alpha * 0.6})`,
        lg: `0 8px 32px rgba(0,0,0,${alpha * 0.7})`,
        xl: `0 16px 48px rgba(0,0,0,${alpha * 0.8})`,
        "2xl": `0 24px 64px rgba(0,0,0,${alpha})`,
        inner: `inset 0 2px 4px rgba(0,0,0,${alpha * 0.3})`,
        glow: { primary: primaryGlow, secondary: secondaryGlow, accent: accentGlow },
      };
    case "subtle":
    default:
      return {
        none: "none",
        sm: `0 1px 2px rgba(0,0,0,${alpha * 0.5})`,
        md: `0 4px 6px rgba(0,0,0,${alpha * 0.6})`,
        lg: `0 10px 15px rgba(0,0,0,${alpha * 0.7})`,
        xl: `0 20px 25px rgba(0,0,0,${alpha * 0.8})`,
        "2xl": `0 25px 50px rgba(0,0,0,${alpha})`,
        inner: `inset 0 2px 4px rgba(0,0,0,${alpha * 0.3})`,
        glow: { primary: primaryGlow, secondary: secondaryGlow, accent: accentGlow },
      };
  }
}

export function generateTheme(options?: GeneratorOptions): ThemeSpec {
  const rng = options?.seed ? seedrandom(options.seed) : Math.random;
  const archetype = options?.archetype ?? pick(ARCHETYPES, rng);
  const config = ARCHETYPE_CONFIGS[archetype];

  const isDark =
    options?.isDark ??
    (config.color.isDark === "either" ? rng() > 0.5 : config.color.isDark);

  const baseHue = options?.baseHue ?? rng() * 360;
  const harmonyType =
    options?.harmony ?? pick(config.color.harmony, rng);
  const hues = generateHarmony(baseHue, harmonyType);

  const chromaMult =
    options?.saturation === "muted"
      ? 0.6
      : options?.saturation === "vivid"
        ? 1.3
        : 1;
  const [chromaMin, chromaMax] = config.color.chromaRange.map(
    (c) => c * chromaMult
  );
  const chroma = lerp(chromaMin, chromaMax, rng());

  const [bgLMin, bgLMax] = config.color.backgroundLightness;
  const bgLightness = lerp(bgLMin, bgLMax, rng());
  const bgBase = oklchToHex(bgLightness, chroma * 0.05, baseHue);
  const bgSubtle = adjustLightness(bgBase, isDark ? 0.02 : -0.02);
  const bgMuted = adjustLightness(bgBase, isDark ? 0.04 : -0.04);

  const [fgLMin, fgLMax] = config.color.foregroundLightness;
  const fgLightness = lerp(fgLMin, fgLMax, rng());
  const fgBase = oklchToHex(fgLightness, chroma * 0.1, baseHue);
  const fgSubtle = adjustLightness(fgBase, isDark ? -0.1 : 0.1);
  const fgMuted = adjustLightness(fgBase, isDark ? -0.2 : 0.2);

  const accentCount = Math.min(config.color.accentCount, hues.length);
  const primaryHex = oklchToHex(
    isDark ? 0.75 : 0.55,
    chroma,
    hues[0]
  );
  const secondaryHex =
    accentCount >= 2
      ? oklchToHex(isDark ? 0.7 : 0.5, chroma * 0.9, hues[1] ?? hues[0])
      : primaryHex;
  const accentHex =
    accentCount >= 3
      ? oklchToHex(isDark ? 0.8 : 0.6, chroma * 0.8, hues[2] ?? hues[0])
      : secondaryHex;

  const primaryFg = isDark ? "#052e16" : "#ffffff";
  const secondaryFg = isDark ? "#431407" : "#ffffff";
  const accentFg = isDark ? "#0a0a0a" : "#ffffff";

  const surfaceOffset = config.color.surfaceOffset;
  const surfaceBase = adjustLightness(bgBase, isDark ? surfaceOffset : -surfaceOffset);
  const surfaceRaised = adjustLightness(surfaceBase, isDark ? 0.03 : -0.03);
  const surfaceInset = adjustLightness(bgBase, isDark ? -0.02 : 0.02);

  const borderBase = adjustLightness(surfaceBase, isDark ? 0.15 : -0.15);
  const borderSubtle = adjustLightness(borderBase, isDark ? -0.05 : 0.05);
  const borderStrong = adjustLightness(borderBase, isDark ? 0.1 : -0.1);

  const isGlass =
    config.effects.material === "glass" ||
    config.effects.material === "frosted" ||
    config.effects.material === "translucent";

  const glassAlpha = isGlass ? lerp(0.35, 0.6, rng()) : 0.5;
  const glassColor = isDark
    ? hexToRgba("#ffffff", glassAlpha * 0.15)
    : hexToRgba("#ffffff", glassAlpha);
  const glassHover = isDark
    ? hexToRgba("#ffffff", glassAlpha * 0.25)
    : hexToRgba("#ffffff", Math.min(1, glassAlpha + 0.15));

  const borderGlass = isGlass
    ? (isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.35)")
    : borderBase;

  let background: ThemeSpec["colors"]["background"] = {
    base: bgBase,
    subtle: bgSubtle,
    muted: bgMuted,
    type: "solid",
  };

  if (config.background.type === "gradient" || config.background.type === "mesh") {
    const angle = config.background.gradientAngle ?? 135;
    const stops = config.background.gradientStops ?? 4;
    const meshHues = hues.slice(0, Math.min(stops, hues.length));
    const meshLightness = isDark ? 0.15 : 0.92;
    const gradientValue = generateGradientMesh(
      meshHues,
      meshLightness,
      chroma * 0.3
    );
    background = {
      ...background,
      type: "gradient",
      gradient: {
        value: gradientValue,
        fallback: bgBase,
      },
    };
  }

  const radius = resolveRadiusScale(config.borders.radiusScale);
  const fonts = resolveFontMood(config.typography.fontMood);

  const [blurMin, blurMax] = config.effects.blur;
  const blur = blurMin === blurMax ? `${blurMin}px` : `${lerp(blurMin, blurMax, rng())}px`;

  const [tintMin, tintMax] = config.effects.tintStrength;
  const tintStrength = lerp(tintMin, tintMax, rng());

  const [noiseMin, noiseMax] = config.effects.noiseOpacity;
  const noiseOpacity = config.effects.noise
    ? lerp(noiseMin, noiseMax, rng())
    : 0;

  const glowSpread =
    config.shadows.glowIntensity === "strong"
      ? "25px"
      : config.shadows.glowIntensity === "medium"
        ? "15px"
        : "10px";

  const extraHues = hues.length >= 4
    ? hues.slice(3, 7).map((h) => oklchToHex(0.6, chroma * 0.7, h))
    : Array.from({ length: 4 }, (_, i) =>
        oklchToHex(0.6, chroma * 0.7, (baseHue + (i + 1) * 60) % 360)
      );
  const chartSeries = [
    primaryHex,
    secondaryHex,
    accentHex,
    ...extraHues,
  ].slice(0, 7);

  const densityMult = config.layout.spacingMultiplier;
  const cardPadding =
    config.layout.density === "compact"
      ? "1rem"
      : config.layout.density === "spacious"
        ? "1.5rem"
        : "1.25rem";
  const gapSm = config.layout.density === "compact" ? "0.5rem" : "0.75rem";
  const gapMd = config.layout.density === "compact" ? "1rem" : "1.25rem";
  const gapLg = config.layout.density === "compact" ? "1.5rem" : "2rem";

  let theme: ThemeSpec = {
    meta: createMeta(
      `gen-${nanoid(8)}`,
      `${config.name} (${Math.round(baseHue)}°)`,
      archetype,
      isDark,
      [archetype, isDark ? "dark" : "light", "generated"]
    ),
    colors: {
      background,
      foreground: { base: fgBase, subtle: fgSubtle, muted: fgMuted },
      primary: {
        base: primaryHex,
        hover: adjustLightness(primaryHex, -0.05),
        active: adjustLightness(primaryHex, -0.1),
        foreground: primaryFg,
      },
      secondary: {
        base: secondaryHex,
        hover: adjustLightness(secondaryHex, -0.05),
        active: adjustLightness(secondaryHex, -0.1),
        foreground: secondaryFg,
      },
      accent: {
        base: accentHex,
        hover: adjustLightness(accentHex, -0.05),
        active: adjustLightness(accentHex, -0.1),
        foreground: accentFg,
      },
      destructive: { base: "#ef4444", foreground: "#ffffff" },
      warning: { base: "#f59e0b", foreground: "#000000" },
      success: { base: "#22c55e", foreground: "#ffffff" },
      info: { base: "#3b82f6", foreground: "#ffffff" },
      border: {
        base: borderBase,
        subtle: borderSubtle,
        strong: borderStrong,
        glass: borderGlass,
      },
      ring: primaryHex,
      surface: {
        base: isGlass ? glassColor : surfaceBase,
        raised: isGlass ? glassHover : surfaceRaised,
        overlay: isGlass ? hexToRgba(isDark ? "#000" : "#fff", 0.85) : surfaceRaised,
        inset: isGlass ? hexToRgba(isDark ? "#000" : "#fff", 0.3) : surfaceInset,
        glass: glassColor,
        glassHover: glassHover,
      },
      chart: { series: chartSeries },
    },
    typography: {
      ...baseTypography,
      fontFamily: fonts,
      headingStyle: {
        textTransform: config.typography.headingTextTransform,
        defaultWeight: config.typography.headingWeight,
        defaultTracking: config.typography.headingTracking,
      },
    },
    spacing: {
      density: 0.9 * densityMult,
      values: { ...baseSpacingValues },
    },
    borders: {
      radius,
      width: {
        0: "0px",
        1: config.borders.widthPreference === "thick" ? "2px" : "1px",
        2: config.borders.widthPreference === "thick" ? "4px" : "2px",
        4: "4px",
        8: "8px",
      },
      style: config.borders.style,
      opacity: config.borders.opacity,
    },
    shadows: generateShadows(
      config.shadows.style,
      config.shadows.colored,
      config.shadows.glow,
      primaryHex,
      secondaryHex,
      accentHex,
      isDark
    ),
    effects: {
      backdrop: {
        blur: isGlass ? blur : "0px",
        saturate: isGlass ? "1.5" : "1",
        brightness: isGlass ? "1.05" : "1",
      },
      material: config.effects.material,
      noise: {
        enabled: config.effects.noise,
        opacity: noiseOpacity,
        size: "fine",
      },
      glow: {
        enabled: config.effects.glowEnabled,
        intensity: config.shadows.glowIntensity,
        color: hexToRgba(primaryHex, 0.2),
        spread: glowSpread,
      },
      tint: {
        color: isGlass ? "rgba(255,255,255,0.5)" : "transparent",
        strength: tintStrength,
      },
    },
    transitions: baseTransitions,
    layout: {
      density: config.layout.density,
      cardPadding,
      gap: { sm: gapSm, md: gapMd, lg: gapLg },
      containerMaxWidth: "1400px",
    },
  };

  const contrastLevel =
    options?.contrastMode === "highest"
      ? "AAA"
      : options?.contrastMode === "high"
        ? "AA"
        : "AA";
  const { theme: fixedTheme } = fixContrast(theme, contrastLevel);
  return fixedTheme;
}
