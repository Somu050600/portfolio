import type { ThemeSpec } from "../schema/theme-spec";
import {
  baseLayoutGaps,
  baseSpacingValues,
  baseTypography,
  createMeta,
} from "./shared";

export const glassWellness: ThemeSpec = {
  meta: createMeta(
    "glass-wellness",
    "Glass Wellness",
    "glassmorphic",
    false,
    ["light", "glass", "gradient", "calm", "rounded", "dreamy"]
  ),
  colors: {
    background: {
      base: "#faf5ff",
      subtle: "#f3e8ff",
      muted: "#e9d5ff",
      type: "mesh",
      gradient: {
        value:
          "linear-gradient(135deg, #fce7f3 0%, #f3e8ff 30%, #e0e7ff 60%, #fed7aa 100%)",
        fallback: "#f5f0ff",
      },
    },
    foreground: { base: "#1f2937", subtle: "#4b5563", muted: "#9ca3af" },
    primary: {
      base: "#f97316",
      hover: "#ea580c",
      active: "#c2410c",
      foreground: "#ffffff",
    },
    secondary: {
      base: "#ec4899",
      hover: "#db2777",
      active: "#be185d",
      foreground: "#ffffff",
    },
    accent: {
      base: "#8b5cf6",
      hover: "#7c3aed",
      active: "#6d28d9",
      foreground: "#ffffff",
    },
    destructive: { base: "#ef4444", foreground: "#ffffff" },
    warning: { base: "#f59e0b", foreground: "#000000" },
    success: { base: "#10b981", foreground: "#ffffff" },
    info: { base: "#3b82f6", foreground: "#ffffff" },
    border: {
      base: "rgba(255, 255, 255, 0.5)",
      subtle: "rgba(255, 255, 255, 0.4)",
      strong: "rgba(255, 255, 255, 0.6)",
      glass: "rgba(255, 255, 255, 0.5)",
    },
    ring: "#f97316",
    surface: {
      base: "rgba(255, 255, 255, 0.35)",
      raised: "rgba(255, 255, 255, 0.45)",
      overlay: "rgba(255, 255, 255, 0.85)",
      inset: "rgba(255, 255, 255, 0.25)",
      glass: "rgba(255, 255, 255, 0.35)",
      glassHover: "rgba(255, 255, 255, 0.5)",
    },
    chart: {
      series: [
        "#f97316",
        "#ec4899",
        "#8b5cf6",
        "#10b981",
        "#3b82f6",
        "#f59e0b",
        "#06b6d4",
      ],
    },
  },
  typography: {
    ...baseTypography,
    fontFamily: {
      heading: '"Nunito", "SF Pro Rounded", sans-serif',
      body: '"Nunito", sans-serif',
      mono: '"Fira Code", monospace',
    },
    headingStyle: {
      textTransform: "none",
      defaultWeight: "semibold",
      defaultTracking: "normal",
    },
  },
  spacing: {
    density: 1.15,
    values: { ...baseSpacingValues },
  },
  borders: {
    radius: {
      none: "0px",
      sm: "12px",
      md: "16px",
      lg: "20px",
      xl: "24px",
      "2xl": "32px",
      full: "9999px",
    },
    width: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" },
    style: "solid",
    opacity: 0.5,
  },
  shadows: {
    none: "none",
    sm: "0 2px 8px rgba(0,0,0,0.04)",
    md: "0 4px 16px rgba(0,0,0,0.06)",
    lg: "0 8px 32px rgba(0,0,0,0.08)",
    xl: "0 16px 48px rgba(0,0,0,0.1)",
    "2xl": "0 24px 64px rgba(0,0,0,0.12)",
    inner: "inset 0 2px 4px rgba(0,0,0,0.04)",
    glow: {
      primary: "0 0 30px rgba(249, 115, 22, 0.15)",
      secondary: "0 0 30px rgba(236, 72, 153, 0.15)",
      accent: "0 0 30px rgba(139, 92, 246, 0.15)",
    },
  },
  effects: {
    backdrop: { blur: "20px", saturate: "1.8", brightness: "1.05" },
    material: "glass",
    noise: { enabled: true, opacity: 0.03, size: "fine" },
    glow: {
      enabled: true,
      intensity: "subtle",
      color: "rgba(249, 115, 22, 0.1)",
      spread: "20px",
    },
    tint: { color: "rgba(255, 255, 255, 0.5)", strength: 0.5 },
  },
  transitions: {
    duration: {
      fastest: "100ms",
      fast: "200ms",
      normal: "300ms",
      slow: "400ms",
      slowest: "600ms",
    },
    easing: {
      linear: "linear",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    },
  },
  layout: {
    density: "spacious",
    cardPadding: "1.5rem",
    gap: baseLayoutGaps.spacious,
    containerMaxWidth: "1200px",
  },
};
