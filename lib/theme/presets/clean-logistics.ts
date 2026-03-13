import type { ThemeSpec } from "../schema/theme-spec";
import {
  baseLayoutGaps,
  baseSpacingValues,
  baseTypography,
  baseTransitions,
  createMeta,
} from "./shared";

export const cleanLogistics: ThemeSpec = {
  meta: createMeta(
    "clean-logistics",
    "Clean Logistics",
    "clean-minimal",
    false,
    ["light", "warm", "minimal", "scandinavian", "airy"]
  ),
  colors: {
    background: {
      base: "#f5f5f0",
      subtle: "#fafaf7",
      muted: "#f0f0eb",
      type: "solid",
    },
    foreground: { base: "#1a1a1a", subtle: "#6b7280", muted: "#9ca3af" },
    primary: {
      base: "#a3e635",
      hover: "#84cc16",
      active: "#65a30d",
      foreground: "#1a1a1a",
    },
    secondary: {
      base: "#d8b4fe",
      hover: "#c084fc",
      active: "#a855f7",
      foreground: "#1a1a1a",
    },
    accent: {
      base: "#84cc16",
      hover: "#65a30d",
      active: "#4d7c0f",
      foreground: "#ffffff",
    },
    destructive: { base: "#ef4444", foreground: "#ffffff" },
    warning: { base: "#f59e0b", foreground: "#000000" },
    success: { base: "#22c55e", foreground: "#ffffff" },
    info: { base: "#3b82f6", foreground: "#ffffff" },
    border: {
      base: "#e5e5e0",
      subtle: "#e0e0db",
      strong: "#d4d4d0",
      glass: "rgba(255,255,255,0.5)",
    },
    ring: "#a3e635",
    surface: {
      base: "#ffffff",
      raised: "#ffffff",
      overlay: "rgba(0,0,0,0.5)",
      inset: "#f0f0eb",
      glass: "rgba(255,255,255,0.8)",
      glassHover: "rgba(255,255,255,0.9)",
    },
    chart: {
      series: [
        "#a3e635",
        "#d8b4fe",
        "#84cc16",
        "#3b82f6",
        "#f59e0b",
        "#06b6d4",
        "#ec4899",
      ],
    },
  },
  typography: {
    ...baseTypography,
    fontFamily: {
      heading: '"Source Sans 3", system-ui',
      body: '"Source Sans 3", system-ui',
      mono: '"Source Code Pro", monospace',
    },
    headingStyle: {
      textTransform: "none",
      defaultWeight: "medium",
      defaultTracking: "normal",
    },
  },
  spacing: {
    density: 1.05,
    values: { ...baseSpacingValues },
  },
  borders: {
    radius: {
      none: "0px",
      sm: "4px",
      md: "8px",
      lg: "12px",
      xl: "12px",
      "2xl": "16px",
      full: "9999px",
    },
    width: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" },
    style: "solid",
    opacity: 1,
  },
  shadows: {
    none: "none",
    sm: "0 1px 3px rgba(0,0,0,0.05)",
    md: "0 2px 6px rgba(0,0,0,0.06)",
    lg: "0 4px 12px rgba(0,0,0,0.07)",
    xl: "0 8px 24px rgba(0,0,0,0.08)",
    "2xl": "0 12px 32px rgba(0,0,0,0.1)",
    inner: "inset 0 1px 2px rgba(0,0,0,0.04)",
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
