import type { ThemeSpec } from "../schema/theme-spec";
import {
  baseLayoutGaps,
  baseSpacingValues,
  baseTypography,
  baseTransitions,
  createMeta,
} from "./shared";

/** Light monochrome (existing B&W light) */
export const monochromeLight: ThemeSpec = {
  meta: createMeta("monochrome", "Monochrome", "monochrome", false, [
    "light",
    "monochrome",
    "minimal",
    "bw",
  ]),
  colors: {
    background: {
      base: "#ffffff",
      subtle: "#fafafa",
      muted: "#f5f5f5",
      type: "solid",
    },
    foreground: { base: "#0a0a0a", subtle: "#737373", muted: "#a3a3a3" },
    primary: {
      base: "#0a0a0a",
      hover: "#262626",
      active: "#404040",
      foreground: "#fafafa",
    },
    secondary: {
      base: "#f5f5f5",
      hover: "#e5e5e5",
      active: "#d4d4d4",
      foreground: "#0a0a0a",
    },
    accent: {
      base: "#f5f5f5",
      hover: "#e5e5e5",
      active: "#d4d4d4",
      foreground: "#0a0a0a",
    },
    destructive: { base: "#ef4444", foreground: "#ffffff" },
    warning: { base: "#f59e0b", foreground: "#000000" },
    success: { base: "#22c55e", foreground: "#ffffff" },
    info: { base: "#3b82f6", foreground: "#ffffff" },
    border: {
      base: "#e5e5e5",
      subtle: "#d4d4d4",
      strong: "#a3a3a3",
      glass: "rgba(255,255,255,0.5)",
    },
    ring: "#0a0a0a",
    surface: {
      base: "#ffffff",
      raised: "#fafafa",
      overlay: "rgba(0,0,0,0.5)",
      inset: "#f5f5f5",
      glass: "rgba(255,255,255,0.8)",
      glassHover: "rgba(255,255,255,0.9)",
    },
    chart: {
      series: [
        "#0a0a0a",
        "#525252",
        "#737373",
        "#a3a3a3",
        "#d4d4d4",
        "#404040",
        "#262626",
      ],
    },
  },
  typography: {
    ...baseTypography,
    fontFamily: {
      heading: '"Inter", system-ui',
      body: '"Inter", system-ui',
      mono: '"JetBrains Mono", monospace',
    },
    headingStyle: {
      textTransform: "none",
      defaultWeight: "bold",
      defaultTracking: "normal",
    },
  },
  spacing: {
    density: 1.0,
    values: { ...baseSpacingValues },
  },
  borders: {
    radius: {
      none: "0px",
      sm: "4px",
      md: "8px",
      lg: "12px",
      xl: "16px",
      "2xl": "20px",
      full: "9999px",
    },
    width: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" },
    style: "solid",
    opacity: 1,
  },
  shadows: {
    none: "none",
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 6px rgba(0,0,0,0.07)",
    lg: "0 10px 15px rgba(0,0,0,0.1)",
    xl: "0 20px 25px rgba(0,0,0,0.1)",
    "2xl": "0 25px 50px rgba(0,0,0,0.15)",
    inner: "inset 0 2px 4px rgba(0,0,0,0.05)",
    glow: {
      primary: "0 0 0 transparent",
      secondary: "0 0 0 transparent",
      accent: "0 0 0 transparent",
    },
  },
  effects: {
    backdrop: { blur: "0px", saturate: "1", brightness: "1" },
    material: "opaque",
    noise: { enabled: false, opacity: 0, size: "fine" },
    glow: {
      enabled: false,
      intensity: "subtle",
      color: "transparent",
      spread: "0px",
    },
    tint: { color: "transparent", strength: 0 },
  },
  transitions: baseTransitions,
  layout: {
    density: "comfortable",
    cardPadding: "1.5rem",
    gap: baseLayoutGaps.comfortable,
    containerMaxWidth: "1280px",
  },
};

/** Dark monochrome (existing B&W dark) */
export const monochromeDark: ThemeSpec = {
  meta: createMeta("monochrome-dark", "Monochrome Dark", "monochrome", true, [
    "dark",
    "monochrome",
    "minimal",
    "bw",
  ]),
  colors: {
    background: {
      base: "#0a0a0a",
      subtle: "#171717",
      muted: "#262626",
      type: "solid",
    },
    foreground: { base: "#fafafa", subtle: "#a3a3a3", muted: "#737373" },
    primary: {
      base: "#fafafa",
      hover: "#e5e5e5",
      active: "#d4d4d4",
      foreground: "#0a0a0a",
    },
    secondary: {
      base: "#262626",
      hover: "#404040",
      active: "#525252",
      foreground: "#fafafa",
    },
    accent: {
      base: "#262626",
      hover: "#404040",
      active: "#525252",
      foreground: "#fafafa",
    },
    destructive: { base: "#ef4444", foreground: "#ffffff" },
    warning: { base: "#f59e0b", foreground: "#000000" },
    success: { base: "#22c55e", foreground: "#ffffff" },
    info: { base: "#3b82f6", foreground: "#ffffff" },
    border: {
      base: "#262626",
      subtle: "#404040",
      strong: "#525252",
      glass: "rgba(255,255,255,0.06)",
    },
    ring: "#fafafa",
    surface: {
      base: "#171717",
      raised: "#262626",
      overlay: "rgba(0,0,0,0.8)",
      inset: "#0a0a0a",
      glass: "rgba(255,255,255,0.03)",
      glassHover: "rgba(255,255,255,0.06)",
    },
    chart: {
      series: [
        "#fafafa",
        "#a3a3a3",
        "#737373",
        "#525252",
        "#404040",
        "#d4d4d4",
        "#e5e5e5",
      ],
    },
  },
  typography: {
    ...baseTypography,
    fontFamily: {
      heading: '"Inter", system-ui',
      body: '"Inter", system-ui',
      mono: '"JetBrains Mono", monospace',
    },
    headingStyle: {
      textTransform: "none",
      defaultWeight: "bold",
      defaultTracking: "normal",
    },
  },
  spacing: {
    density: 1.0,
    values: { ...baseSpacingValues },
  },
  borders: {
    radius: {
      none: "0px",
      sm: "4px",
      md: "8px",
      lg: "12px",
      xl: "16px",
      "2xl": "20px",
      full: "9999px",
    },
    width: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" },
    style: "solid",
    opacity: 1,
  },
  shadows: {
    none: "none",
    sm: "0 1px 2px rgba(0,0,0,0.3)",
    md: "0 4px 6px rgba(0,0,0,0.3)",
    lg: "0 10px 15px rgba(0,0,0,0.3)",
    xl: "0 20px 25px rgba(0,0,0,0.3)",
    "2xl": "0 25px 50px rgba(0,0,0,0.5)",
    inner: "inset 0 2px 4px rgba(0,0,0,0.3)",
    glow: {
      primary: "0 0 0 transparent",
      secondary: "0 0 0 transparent",
      accent: "0 0 0 transparent",
    },
  },
  effects: {
    backdrop: { blur: "0px", saturate: "1", brightness: "1" },
    material: "opaque",
    noise: { enabled: false, opacity: 0, size: "fine" },
    glow: {
      enabled: false,
      intensity: "subtle",
      color: "transparent",
      spread: "0px",
    },
    tint: { color: "transparent", strength: 0 },
  },
  transitions: baseTransitions,
  layout: {
    density: "comfortable",
    cardPadding: "1.5rem",
    gap: baseLayoutGaps.comfortable,
    containerMaxWidth: "1280px",
  },
};

/** Default monochrome (light) - matches plan's "monochrome" preset */
export const monochrome: ThemeSpec = monochromeLight;
