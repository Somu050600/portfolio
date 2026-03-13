"use client";

import * as React from "react";
import { ThemeContext } from "./theme-context";
import { themeToCSS } from "../resolver/css-resolver";
import { loadThemeFonts } from "./font-loader";
import { presets } from "../presets";
import type { ThemeSpec } from "../schema/theme-spec";

const STORAGE_KEY_CUSTOM = "portfolio-theme-custom";

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = "monochrome",
  storageKey = "portfolio-theme",
}: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = React.useState<ThemeSpec>(() => {
    if (typeof window === "undefined") {
      return presets.find((p) => p.meta.id === defaultTheme) ?? presets[0];
    }
    return presets.find((p) => p.meta.id === defaultTheme) ?? presets[0];
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const styleRef = React.useRef<HTMLStyleElement | null>(null);

  const getThemeById = React.useCallback((id: string): ThemeSpec | undefined => {
    const preset = presets.find((p) => p.meta.id === id);
    if (preset) return preset;
    if (id === "custom" && typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY_CUSTOM);
        if (stored) return JSON.parse(stored) as ThemeSpec;
      } catch {
        /* ignore */
      }
    }
    return undefined;
  }, []);

  const applyTheme = React.useCallback((theme: ThemeSpec) => {
    const css = themeToCSS(theme, ":root");

    if (typeof document === "undefined") return;

    // Reuse theme-inline from anti-flash script, or create theme-dynamic
    let style: HTMLStyleElement | null =
      styleRef.current ?? (document.getElementById("theme-inline") as HTMLStyleElement | null);
    if (!style) {
      style = document.createElement("style");
      style.id = "theme-dynamic";
      document.head.appendChild(style);
    }
    styleRef.current = style;
    style.textContent = css;
    style.setAttribute("data-theme-id", theme.meta.id);

    document.documentElement.setAttribute("data-theme", theme.meta.id);
    document.documentElement.setAttribute(
      "data-archetype",
      theme.meta.archetype
    );
    document.documentElement.classList.toggle("dark", theme.meta.isDark);

    if (theme.colors.background.type !== "solid" && theme.colors.background.gradient) {
      document.body.classList.add("bg-theme-gradient");
    } else {
      document.body.classList.remove("bg-theme-gradient");
    }
  }, []);

  const setTheme = React.useCallback(
    (themeId: string) => {
      const theme = getThemeById(themeId);
      if (!theme) return;

      setCurrentTheme(theme);
      applyTheme(theme);
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, themeId);
      }
      loadThemeFonts(theme);
    },
    [getThemeById, applyTheme, storageKey]
  );

  const setCustomTheme = React.useCallback(
    (theme: ThemeSpec) => {
      setCurrentTheme(theme);
      applyTheme(theme);
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, "custom");
        localStorage.setItem(STORAGE_KEY_CUSTOM, JSON.stringify(theme));
      }
      loadThemeFonts(theme);
    },
    [applyTheme, storageKey]
  );

  const resetToDefault = React.useCallback(() => {
    setTheme(defaultTheme);
  }, [setTheme, defaultTheme]);

  React.useEffect(() => {
    const storedId =
      typeof window !== "undefined"
        ? localStorage.getItem(storageKey) || defaultTheme
        : defaultTheme;
    const theme = getThemeById(storedId) ?? presets.find((p) => p.meta.id === defaultTheme) ?? presets[0];
    setCurrentTheme(theme);
    applyTheme(theme);
    loadThemeFonts(theme);
    setIsLoading(false);
  }, [storageKey, defaultTheme, getThemeById, applyTheme]);

  const value: React.ComponentProps<typeof ThemeContext.Provider>["value"] = {
    currentTheme,
    availableThemes: presets.map((p) => p.meta),
    isLoading,
    setTheme,
    setCustomTheme,
    resetToDefault,
    getThemeById,
    isDark: currentTheme.meta.isDark,
    archetype: currentTheme.meta.archetype,
    isGlass:
      currentTheme.effects.material === "glass" ||
      currentTheme.effects.material === "frosted" ||
      currentTheme.effects.material === "translucent",
    hasGradientBg: currentTheme.colors.background.type !== "solid",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
