import type { ThemeSpec } from "../schema/theme-spec";
import {
  baseSpacingValues,
  baseTypography,
  baseTransitions,
  createMeta,
} from "./shared";

export const corporateCrm: ThemeSpec = {
  meta: createMeta(
    "corporate-crm",
    "Corporate CRM",
    "corporate-sharp",
    false,
    ["light", "business", "sharp", "flat", "precise"]
  ),
  colors: {
    background: {
      base: "#ffffff",
      subtle: "#fafafa",
      muted: "#f5f5f5",
      type: "solid",
    },
    foreground: { base: "#000000", subtle: "#6b7280", muted: "#9ca3af" },
    primary: {
      base: "#f59e0b",
      hover: "#d97706",
      active: "#b45309",
      foreground: "#000000",
    },
    secondary: {
      base: "#6b7280",
      hover: "#4b5563",
      active: "#374151",
      foreground: "#ffffff",
    },
    accent: {
      base: "#f59e0b",
      hover: "#d97706",
      active: "#b45309",
      foreground: "#000000",
    },
    destructive: { base: "#ef4444", foreground: "#ffffff" },
    warning: { base: "#f59e0b", foreground: "#000000" },
    success: { base: "#22c55e", foreground: "#ffffff" },
    info: { base: "#3b82f6", foreground: "#ffffff" },
    border: {
      base: "#e5e7eb",
      subtle: "#d1d5db",
      strong: "#9ca3af",
      glass: "rgba(0,0,0,0.1)",
    },
    ring: "#f59e0b",
    surface: {
      base: "#ffffff",
      raised: "#ffffff",
      overlay: "rgba(0,0,0,0.5)",
      inset: "#f9fafb",
      glass: "rgba(255,255,255,0.95)",
      glassHover: "rgba(255,255,255,1)",
    },
    chart: {
      series: [
        "#f59e0b",
        "#6b7280",
        "#22c55e",
        "#3b82f6",
        "#ef4444",
        "#8b5cf6",
        "#06b6d4",
      ],
    },
  },
  typography: {
    ...baseTypography,
    fontFamily: {
      heading: '"Inter", "SF Pro Display", system-ui',
      body: '"Inter", system-ui',
      mono: '"JetBrains Mono", monospace',
    },
    headingStyle: {
      textTransform: "none",
      defaultWeight: "bold",
      defaultTracking: "tight",
    },
  },
  spacing: {
    density: 0.95,
    values: { ...baseSpacingValues },
  },
  borders: {
    radius: {
      none: "0px",
      sm: "2px",
      md: "4px",
      lg: "4px",
      xl: "4px",
      "2xl": "4px",
      full: "9999px",
    },
    width: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" },
    style: "solid",
    opacity: 1,
  },
  shadows: {
    none: "none",
    sm: "none",
    md: "none",
    lg: "none",
    xl: "none",
    "2xl": "none",
    inner: "none",
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
    density: "compact",
    cardPadding: "1rem",
    gap: { sm: "0.5rem", md: "0.75rem", lg: "1rem" },
    containerMaxWidth: "1400px",
  },
};
