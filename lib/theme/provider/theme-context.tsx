"use client";

import * as React from "react";
import type {
  ThemeSpec,
  ThemeMeta,
  VisualArchetype,
} from "../schema/theme-spec";

export interface ThemeContextValue {
  currentTheme: ThemeSpec;
  availableThemes: ThemeMeta[];
  isLoading: boolean;

  setTheme: (themeId: string) => void;
  setCustomTheme: (theme: ThemeSpec) => void;
  resetToDefault: () => void;

  getThemeById: (id: string) => ThemeSpec | undefined;
  isDark: boolean;
  archetype: VisualArchetype;

  isGlass: boolean;
  hasGradientBg: boolean;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export function useThemeContext(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}

export { ThemeContext };
