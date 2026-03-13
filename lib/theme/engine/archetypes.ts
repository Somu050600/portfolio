import type { VisualArchetype } from "../schema/theme-spec";
import type { HarmonyType } from "./color-utils";

export interface ArchetypeConfig {
  id: VisualArchetype;
  name: string;
  description: string;

  color: {
    isDark: boolean | "either";
    backgroundLightness: [number, number];
    foregroundLightness: [number, number];
    surfaceOffset: number;
    chromaRange: [number, number];
    harmony: HarmonyType[];
    accentCount: number;
  };

  borders: {
    radiusScale: "none" | "minimal" | "small" | "medium" | "large" | "pill";
    widthPreference: "none" | "hairline" | "thin" | "medium" | "thick";
    style: "solid" | "dashed" | "double" | "none";
    opacity: number;
  };

  shadows: {
    style: "none" | "subtle" | "soft" | "medium" | "dramatic" | "hard-offset";
    colored: boolean;
    glow: boolean;
    glowIntensity: "subtle" | "medium" | "strong";
  };

  effects: {
    material: "opaque" | "glass" | "frosted" | "translucent";
    blur: [number, number];
    noise: boolean;
    noiseOpacity: [number, number];
    glowEnabled: boolean;
    tintStrength: [number, number];
  };

  typography: {
    headingTextTransform: "none" | "uppercase" | "capitalize";
    headingWeight: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
    headingTracking: "tighter" | "tight" | "normal" | "wide" | "wider" | "widest";
    bodyWeight: "light" | "normal" | "medium";
    fontMood: "geometric" | "humanist" | "rounded" | "mono" | "serif" | "system";
  };

  layout: {
    density: "compact" | "comfortable" | "spacious";
    spacingMultiplier: number;
  };

  background: {
    type: "solid" | "gradient" | "mesh";
    gradientAngle?: number;
    gradientStops?: number;
  };
}

export const ARCHETYPE_CONFIGS: Record<VisualArchetype, ArchetypeConfig> = {
  "neon-dark": {
    id: "neon-dark",
    name: "Neon Dark",
    description: "Dark bg, neon accents, data-dense",
    color: {
      isDark: true,
      backgroundLightness: [0.05, 0.12],
      foregroundLightness: [0.92, 0.98],
      surfaceOffset: 0.04,
      chromaRange: [0.15, 0.3],
      harmony: ["complementary", "triadic"],
      accentCount: 3,
    },
    borders: {
      radiusScale: "medium",
      widthPreference: "thin",
      style: "solid",
      opacity: 1,
    },
    shadows: {
      style: "none",
      colored: false,
      glow: true,
      glowIntensity: "medium",
    },
    effects: {
      material: "opaque",
      blur: [0, 0],
      noise: false,
      noiseOpacity: [0, 0],
      glowEnabled: true,
      tintStrength: [0, 0],
    },
    typography: {
      headingTextTransform: "uppercase",
      headingWeight: "bold",
      headingTracking: "wider",
      bodyWeight: "normal",
      fontMood: "geometric",
    },
    layout: { density: "compact", spacingMultiplier: 0.9 },
    background: { type: "solid" },
  },

  "clean-minimal": {
    id: "clean-minimal",
    name: "Clean Minimal",
    description: "Warm white, subtle, Scandinavian",
    color: {
      isDark: false,
      backgroundLightness: [0.95, 0.98],
      foregroundLightness: [0.1, 0.2],
      surfaceOffset: 0.02,
      chromaRange: [0.08, 0.18],
      harmony: ["analogous"],
      accentCount: 2,
    },
    borders: {
      radiusScale: "small",
      widthPreference: "thin",
      style: "solid",
      opacity: 1,
    },
    shadows: {
      style: "subtle",
      colored: false,
      glow: false,
      glowIntensity: "subtle",
    },
    effects: {
      material: "opaque",
      blur: [0, 0],
      noise: false,
      noiseOpacity: [0, 0],
      glowEnabled: false,
      tintStrength: [0, 0],
    },
    typography: {
      headingTextTransform: "none",
      headingWeight: "medium",
      headingTracking: "normal",
      bodyWeight: "normal",
      fontMood: "humanist",
    },
    layout: { density: "comfortable", spacingMultiplier: 1 },
    background: { type: "solid" },
  },

  glassmorphic: {
    id: "glassmorphic",
    name: "Glassmorphic",
    description: "Frosted glass, gradients, dreamy",
    color: {
      isDark: "either",
      backgroundLightness: [0.85, 0.96],
      foregroundLightness: [0.2, 0.35],
      surfaceOffset: 0.05,
      chromaRange: [0.08, 0.18],
      harmony: ["analogous", "triadic"],
      accentCount: 3,
    },
    borders: {
      radiusScale: "large",
      widthPreference: "thin",
      style: "solid",
      opacity: 0.35,
    },
    shadows: {
      style: "soft",
      colored: true,
      glow: true,
      glowIntensity: "subtle",
    },
    effects: {
      material: "glass",
      blur: [12, 24],
      noise: true,
      noiseOpacity: [0.02, 0.06],
      glowEnabled: true,
      tintStrength: [0.3, 0.6],
    },
    typography: {
      headingTextTransform: "none",
      headingWeight: "semibold",
      headingTracking: "normal",
      bodyWeight: "normal",
      fontMood: "rounded",
    },
    layout: { density: "spacious", spacingMultiplier: 1.15 },
    background: {
      type: "gradient",
      gradientAngle: 135,
      gradientStops: 4,
    },
  },

  "corporate-sharp": {
    id: "corporate-sharp",
    name: "Corporate Sharp",
    description: "Pure white, precise borders, no-nonsense",
    color: {
      isDark: false,
      backgroundLightness: [0.98, 1.0],
      foregroundLightness: [0, 0.15],
      surfaceOffset: 0.01,
      chromaRange: [0.08, 0.18],
      harmony: ["analogous"],
      accentCount: 2,
    },
    borders: {
      radiusScale: "none",
      widthPreference: "thin",
      style: "solid",
      opacity: 1,
    },
    shadows: {
      style: "none",
      colored: false,
      glow: false,
      glowIntensity: "subtle",
    },
    effects: {
      material: "opaque",
      blur: [0, 0],
      noise: false,
      noiseOpacity: [0, 0],
      glowEnabled: false,
      tintStrength: [0, 0],
    },
    typography: {
      headingTextTransform: "none",
      headingWeight: "bold",
      headingTracking: "tight",
      bodyWeight: "normal",
      fontMood: "geometric",
    },
    layout: { density: "compact", spacingMultiplier: 0.95 },
    background: { type: "solid" },
  },

  brutalist: {
    id: "brutalist",
    name: "Brutalist",
    description: "Raw, exposed structure, heavy borders",
    color: {
      isDark: "either",
      backgroundLightness: [0.1, 0.95],
      foregroundLightness: [0.05, 0.95],
      surfaceOffset: 0.05,
      chromaRange: [0, 0.05],
      harmony: ["complementary"],
      accentCount: 1,
    },
    borders: {
      radiusScale: "none",
      widthPreference: "thick",
      style: "solid",
      opacity: 1,
    },
    shadows: {
      style: "hard-offset",
      colored: false,
      glow: false,
      glowIntensity: "medium",
    },
    effects: {
      material: "opaque",
      blur: [0, 0],
      noise: false,
      noiseOpacity: [0, 0],
      glowEnabled: false,
      tintStrength: [0, 0],
    },
    typography: {
      headingTextTransform: "uppercase",
      headingWeight: "extrabold",
      headingTracking: "wide",
      bodyWeight: "normal",
      fontMood: "mono",
    },
    layout: { density: "compact", spacingMultiplier: 0.9 },
    background: { type: "solid" },
  },

  "retro-warm": {
    id: "retro-warm",
    name: "Retro Warm",
    description: "Vintage tones, serif type, paper-like",
    color: {
      isDark: false,
      backgroundLightness: [0.9, 0.96],
      foregroundLightness: [0.15, 0.25],
      surfaceOffset: 0.03,
      chromaRange: [0.05, 0.12],
      harmony: ["analogous"],
      accentCount: 2,
    },
    borders: {
      radiusScale: "minimal",
      widthPreference: "thin",
      style: "solid",
      opacity: 1,
    },
    shadows: {
      style: "subtle",
      colored: false,
      glow: false,
      glowIntensity: "subtle",
    },
    effects: {
      material: "opaque",
      blur: [0, 0],
      noise: true,
      noiseOpacity: [0.03, 0.08],
      glowEnabled: false,
      tintStrength: [0, 0],
    },
    typography: {
      headingTextTransform: "none",
      headingWeight: "normal",
      headingTracking: "normal",
      bodyWeight: "normal",
      fontMood: "serif",
    },
    layout: { density: "comfortable", spacingMultiplier: 1 },
    background: { type: "solid" },
  },

  cyberpunk: {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "High chroma neons, dark backgrounds",
    color: {
      isDark: true,
      backgroundLightness: [0.02, 0.08],
      foregroundLightness: [0.9, 0.98],
      surfaceOffset: 0.04,
      chromaRange: [0.25, 0.37],
      harmony: ["complementary", "tetradic"],
      accentCount: 4,
    },
    borders: {
      radiusScale: "minimal",
      widthPreference: "thin",
      style: "solid",
      opacity: 1,
    },
    shadows: {
      style: "none",
      colored: false,
      glow: true,
      glowIntensity: "strong",
    },
    effects: {
      material: "opaque",
      blur: [0, 0],
      noise: false,
      noiseOpacity: [0, 0],
      glowEnabled: true,
      tintStrength: [0, 0],
    },
    typography: {
      headingTextTransform: "uppercase",
      headingWeight: "extrabold",
      headingTracking: "widest",
      bodyWeight: "normal",
      fontMood: "mono",
    },
    layout: { density: "compact", spacingMultiplier: 0.9 },
    background: { type: "solid" },
  },

  "pastel-soft": {
    id: "pastel-soft",
    name: "Pastel Soft",
    description: "Muted pastels, rounded everything",
    color: {
      isDark: false,
      backgroundLightness: [0.92, 0.98],
      foregroundLightness: [0.2, 0.4],
      surfaceOffset: 0.03,
      chromaRange: [0.04, 0.1],
      harmony: ["analogous"],
      accentCount: 3,
    },
    borders: {
      radiusScale: "large",
      widthPreference: "none",
      style: "solid",
      opacity: 1,
    },
    shadows: {
      style: "soft",
      colored: true,
      glow: false,
      glowIntensity: "subtle",
    },
    effects: {
      material: "opaque",
      blur: [0, 0],
      noise: false,
      noiseOpacity: [0, 0],
      glowEnabled: false,
      tintStrength: [0, 0],
    },
    typography: {
      headingTextTransform: "none",
      headingWeight: "normal",
      headingTracking: "normal",
      bodyWeight: "normal",
      fontMood: "rounded",
    },
    layout: { density: "spacious", spacingMultiplier: 1.2 },
    background: { type: "solid" },
  },

  monochrome: {
    id: "monochrome",
    name: "Monochrome",
    description: "Single hue exploration",
    color: {
      isDark: "either",
      backgroundLightness: [0.1, 0.95],
      foregroundLightness: [0.05, 0.95],
      surfaceOffset: 0.03,
      chromaRange: [0, 0.03],
      harmony: ["complementary"],
      accentCount: 1,
    },
    borders: {
      radiusScale: "small",
      widthPreference: "thin",
      style: "solid",
      opacity: 1,
    },
    shadows: {
      style: "medium",
      colored: false,
      glow: false,
      glowIntensity: "subtle",
    },
    effects: {
      material: "opaque",
      blur: [0, 0],
      noise: false,
      noiseOpacity: [0, 0],
      glowEnabled: false,
      tintStrength: [0, 0],
    },
    typography: {
      headingTextTransform: "none",
      headingWeight: "bold",
      headingTracking: "normal",
      bodyWeight: "normal",
      fontMood: "geometric",
    },
    layout: { density: "comfortable", spacingMultiplier: 1 },
    background: { type: "solid" },
  },

  synthwave: {
    id: "synthwave",
    name: "Synthwave",
    description: "Retro neon, purple-pink gradients",
    color: {
      isDark: true,
      backgroundLightness: [0.05, 0.12],
      foregroundLightness: [0.9, 0.98],
      surfaceOffset: 0.04,
      chromaRange: [0.2, 0.35],
      harmony: ["complementary", "triadic"],
      accentCount: 3,
    },
    borders: {
      radiusScale: "medium",
      widthPreference: "thin",
      style: "solid",
      opacity: 1,
    },
    shadows: {
      style: "none",
      colored: true,
      glow: true,
      glowIntensity: "medium",
    },
    effects: {
      material: "opaque",
      blur: [0, 0],
      noise: false,
      noiseOpacity: [0, 0],
      glowEnabled: true,
      tintStrength: [0, 0],
    },
    typography: {
      headingTextTransform: "uppercase",
      headingWeight: "bold",
      headingTracking: "wider",
      bodyWeight: "normal",
      fontMood: "geometric",
    },
    layout: { density: "compact", spacingMultiplier: 0.95 },
    background: { type: "gradient", gradientAngle: 160, gradientStops: 4 },
  },

  valentine: {
    id: "valentine",
    name: "Valentine",
    description: "Soft pinks, romantic",
    color: {
      isDark: false,
      backgroundLightness: [0.96, 0.99],
      foregroundLightness: [0.2, 0.4],
      surfaceOffset: 0.02,
      chromaRange: [0.08, 0.18],
      harmony: ["analogous"],
      accentCount: 2,
    },
    borders: {
      radiusScale: "large",
      widthPreference: "thin",
      style: "solid",
      opacity: 1,
    },
    shadows: {
      style: "soft",
      colored: true,
      glow: false,
      glowIntensity: "subtle",
    },
    effects: {
      material: "opaque",
      blur: [0, 0],
      noise: false,
      noiseOpacity: [0, 0],
      glowEnabled: false,
      tintStrength: [0, 0],
    },
    typography: {
      headingTextTransform: "none",
      headingWeight: "semibold",
      headingTracking: "normal",
      bodyWeight: "normal",
      fontMood: "rounded",
    },
    layout: { density: "comfortable", spacingMultiplier: 1.05 },
    background: { type: "solid" },
  },

  halloween: {
    id: "halloween",
    name: "Halloween",
    description: "Orange, black, spooky",
    color: {
      isDark: true,
      backgroundLightness: [0.05, 0.1],
      foregroundLightness: [0.9, 0.98],
      surfaceOffset: 0.04,
      chromaRange: [0.15, 0.28],
      harmony: ["complementary"],
      accentCount: 2,
    },
    borders: {
      radiusScale: "small",
      widthPreference: "thin",
      style: "solid",
      opacity: 1,
    },
    shadows: {
      style: "medium",
      colored: true,
      glow: false,
      glowIntensity: "subtle",
    },
    effects: {
      material: "opaque",
      blur: [0, 0],
      noise: false,
      noiseOpacity: [0, 0],
      glowEnabled: false,
      tintStrength: [0, 0],
    },
    typography: {
      headingTextTransform: "uppercase",
      headingWeight: "bold",
      headingTracking: "wide",
      bodyWeight: "normal",
      fontMood: "geometric",
    },
    layout: { density: "compact", spacingMultiplier: 0.95 },
    background: { type: "solid" },
  },

  forest: {
    id: "forest",
    name: "Forest",
    description: "Deep greens, nature",
    color: {
      isDark: true,
      backgroundLightness: [0.06, 0.12],
      foregroundLightness: [0.88, 0.96],
      surfaceOffset: 0.04,
      chromaRange: [0.1, 0.2],
      harmony: ["analogous"],
      accentCount: 2,
    },
    borders: {
      radiusScale: "medium",
      widthPreference: "thin",
      style: "solid",
      opacity: 1,
    },
    shadows: {
      style: "subtle",
      colored: false,
      glow: false,
      glowIntensity: "subtle",
    },
    effects: {
      material: "opaque",
      blur: [0, 0],
      noise: false,
      noiseOpacity: [0, 0],
      glowEnabled: false,
      tintStrength: [0, 0],
    },
    typography: {
      headingTextTransform: "none",
      headingWeight: "semibold",
      headingTracking: "normal",
      bodyWeight: "normal",
      fontMood: "humanist",
    },
    layout: { density: "comfortable", spacingMultiplier: 1 },
    background: { type: "solid" },
  },

  luxury: {
    id: "luxury",
    name: "Luxury",
    description: "Dark, gold accents, premium",
    color: {
      isDark: true,
      backgroundLightness: [0.04, 0.09],
      foregroundLightness: [0.9, 0.98],
      surfaceOffset: 0.04,
      chromaRange: [0.08, 0.18],
      harmony: ["analogous"],
      accentCount: 2,
    },
    borders: {
      radiusScale: "small",
      widthPreference: "thin",
      style: "solid",
      opacity: 1,
    },
    shadows: {
      style: "medium",
      colored: false,
      glow: false,
      glowIntensity: "subtle",
    },
    effects: {
      material: "opaque",
      blur: [0, 0],
      noise: false,
      noiseOpacity: [0, 0],
      glowEnabled: false,
      tintStrength: [0, 0],
    },
    typography: {
      headingTextTransform: "none",
      headingWeight: "semibold",
      headingTracking: "normal",
      bodyWeight: "normal",
      fontMood: "serif",
    },
    layout: { density: "comfortable", spacingMultiplier: 1.05 },
    background: { type: "solid" },
  },

  dracula: {
    id: "dracula",
    name: "Dracula",
    description: "Purple-pink, dark",
    color: {
      isDark: true,
      backgroundLightness: [0.06, 0.12],
      foregroundLightness: [0.9, 0.98],
      surfaceOffset: 0.04,
      chromaRange: [0.15, 0.28],
      harmony: ["complementary"],
      accentCount: 3,
    },
    borders: {
      radiusScale: "medium",
      widthPreference: "thin",
      style: "solid",
      opacity: 1,
    },
    shadows: {
      style: "none",
      colored: false,
      glow: false,
      glowIntensity: "subtle",
    },
    effects: {
      material: "opaque",
      blur: [0, 0],
      noise: false,
      noiseOpacity: [0, 0],
      glowEnabled: false,
      tintStrength: [0, 0],
    },
    typography: {
      headingTextTransform: "none",
      headingWeight: "medium",
      headingTracking: "normal",
      bodyWeight: "normal",
      fontMood: "humanist",
    },
    layout: { density: "comfortable", spacingMultiplier: 1 },
    background: { type: "solid" },
  },

  aqua: {
    id: "aqua",
    name: "Aqua",
    description: "Blues, oceanic",
    color: {
      isDark: false,
      backgroundLightness: [0.92, 0.98],
      foregroundLightness: [0.15, 0.3],
      surfaceOffset: 0.03,
      chromaRange: [0.1, 0.2],
      harmony: ["analogous"],
      accentCount: 2,
    },
    borders: {
      radiusScale: "medium",
      widthPreference: "thin",
      style: "solid",
      opacity: 1,
    },
    shadows: {
      style: "soft",
      colored: false,
      glow: false,
      glowIntensity: "subtle",
    },
    effects: {
      material: "opaque",
      blur: [0, 0],
      noise: false,
      noiseOpacity: [0, 0],
      glowEnabled: false,
      tintStrength: [0, 0],
    },
    typography: {
      headingTextTransform: "none",
      headingWeight: "semibold",
      headingTracking: "normal",
      bodyWeight: "normal",
      fontMood: "humanist",
    },
    layout: { density: "comfortable", spacingMultiplier: 1 },
    background: { type: "solid" },
  },

  wireframe: {
    id: "wireframe",
    name: "Wireframe",
    description: "Minimal grey, structural",
    color: {
      isDark: false,
      backgroundLightness: [0.96, 0.99],
      foregroundLightness: [0.1, 0.25],
      surfaceOffset: 0.02,
      chromaRange: [0, 0.03],
      harmony: ["complementary"],
      accentCount: 1,
    },
    borders: {
      radiusScale: "none",
      widthPreference: "thin",
      style: "solid",
      opacity: 1,
    },
    shadows: {
      style: "none",
      colored: false,
      glow: false,
      glowIntensity: "subtle",
    },
    effects: {
      material: "opaque",
      blur: [0, 0],
      noise: false,
      noiseOpacity: [0, 0],
      glowEnabled: false,
      tintStrength: [0, 0],
    },
    typography: {
      headingTextTransform: "none",
      headingWeight: "medium",
      headingTracking: "normal",
      bodyWeight: "normal",
      fontMood: "mono",
    },
    layout: { density: "compact", spacingMultiplier: 0.95 },
    background: { type: "solid" },
  },

  editorial: {
    id: "editorial",
    name: "Editorial",
    description: "Magazine-inspired, strong typography",
    color: {
      isDark: false,
      backgroundLightness: [0.95, 0.99],
      foregroundLightness: [0.05, 0.2],
      surfaceOffset: 0.02,
      chromaRange: [0, 0.08],
      harmony: ["analogous"],
      accentCount: 1,
    },
    borders: {
      radiusScale: "none",
      widthPreference: "thin",
      style: "solid",
      opacity: 1,
    },
    shadows: {
      style: "none",
      colored: false,
      glow: false,
      glowIntensity: "subtle",
    },
    effects: {
      material: "opaque",
      blur: [0, 0],
      noise: false,
      noiseOpacity: [0, 0],
      glowEnabled: false,
      tintStrength: [0, 0],
    },
    typography: {
      headingTextTransform: "none",
      headingWeight: "extrabold",
      headingTracking: "tight",
      bodyWeight: "light",
      fontMood: "serif",
    },
    layout: { density: "spacious", spacingMultiplier: 1.1 },
    background: { type: "solid" },
  },

  custom: {
    id: "custom",
    name: "Custom",
    description: "User-defined, no constraints",
    color: {
      isDark: "either",
      backgroundLightness: [0.1, 0.95],
      foregroundLightness: [0.05, 0.95],
      surfaceOffset: 0.04,
      chromaRange: [0, 0.35],
      harmony: ["complementary", "analogous", "triadic"],
      accentCount: 3,
    },
    borders: {
      radiusScale: "medium",
      widthPreference: "thin",
      style: "solid",
      opacity: 1,
    },
    shadows: {
      style: "medium",
      colored: true,
      glow: false,
      glowIntensity: "medium",
    },
    effects: {
      material: "opaque",
      blur: [0, 12],
      noise: false,
      noiseOpacity: [0, 0.05],
      glowEnabled: false,
      tintStrength: [0, 0.5],
    },
    typography: {
      headingTextTransform: "none",
      headingWeight: "semibold",
      headingTracking: "normal",
      bodyWeight: "normal",
      fontMood: "system",
    },
    layout: { density: "comfortable", spacingMultiplier: 1 },
    background: { type: "solid" },
  },
};
