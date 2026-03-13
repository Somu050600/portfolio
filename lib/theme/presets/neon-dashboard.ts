import type { ThemeSpec } from "../schema/theme-spec";
import {
  baseLayoutGaps,
  baseSpacingValues,
  baseTypography,
  baseTransitions,
  createMeta,
} from "./shared";

export const neonDashboard: ThemeSpec = {
  meta: createMeta(
    "neon-dashboard",
    "Neon Dashboard",
    "neon-dark",
    true,
    ["dark", "neon", "data", "dense", "technical"]
  ),
  colors: {
    background: {
      base: "#0a0a0a",
      subtle: "#111111",
      muted: "#1a1a1a",
      type: "solid",
    },
    foreground: { base: "#f5f5f5", subtle: "#a3a3a3", muted: "#737373" },
    primary: {
      base: "#4ade80",
      hover: "#22c55e",
      active: "#16a34a",
      foreground: "#052e16",
    },
    secondary: {
      base: "#fb923c",
      hover: "#f97316",
      active: "#ea580c",
      foreground: "#431407",
    },
    accent: {
      base: "#ffffff",
      hover: "#e5e5e5",
      active: "#d4d4d4",
      foreground: "#0a0a0a",
    },
    destructive: { base: "#ef4444", foreground: "#ffffff" },
    warning: { base: "#f59e0b", foreground: "#000000" },
    success: { base: "#4ade80", foreground: "#052e16" },
    info: { base: "#38bdf8", foreground: "#0c4a6e" },
    border: {
      base: "#333333",
      subtle: "#262626",
      strong: "#525252",
      glass: "rgba(255,255,255,0.06)",
    },
    ring: "#4ade80",
    surface: {
      base: "#1a1a1a",
      raised: "#262626",
      overlay: "rgba(0,0,0,0.8)",
      inset: "#0f0f0f",
      glass: "rgba(255,255,255,0.03)",
      glassHover: "rgba(255,255,255,0.06)",
    },
    chart: {
      series: [
        "#4ade80",
        "#fb923c",
        "#ffffff",
        "#38bdf8",
        "#a78bfa",
        "#f472b6",
        "#fbbf24",
      ],
    },
  },
  typography: {
    ...baseTypography,
    fontFamily: {
      heading: '"Space Grotesk", sans-serif',
      body: '"Inter", sans-serif',
      mono: '"JetBrains Mono", monospace',
    },
    headingStyle: {
      textTransform: "uppercase",
      defaultWeight: "bold",
      defaultTracking: "wider",
    },
  },
  spacing: {
    density: 0.9,
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
      primary: "0 0 20px rgba(74, 222, 128, 0.3)",
      secondary: "0 0 20px rgba(251, 146, 60, 0.3)",
      accent: "0 0 20px rgba(255, 255, 255, 0.1)",
    },
  },
  effects: {
    backdrop: { blur: "0px", saturate: "1", brightness: "1" },
    material: "opaque",
    noise: { enabled: false, opacity: 0, size: "fine" },
    glow: {
      enabled: true,
      intensity: "medium",
      color: "rgba(74, 222, 128, 0.15)",
      spread: "15px",
    },
    tint: { color: "transparent", strength: 0 },
  },
  transitions: baseTransitions,
  layout: {
    density: "compact",
    cardPadding: "1.25rem",
    gap: baseLayoutGaps.compact,
    containerMaxWidth: "1400px",
  },
};
