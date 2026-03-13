"use client";

import { HexColorPicker } from "react-colorful";
import { generateTheme } from "@/lib/theme/engine/theme-generator";
import { usePlayground } from "@/lib/theme/playground/playground-store";
import {
  getContrastRatio,
  meetsWCAG_AA,
  meetsWCAG_AAA,
} from "@/lib/theme/engine/color-utils";
import { ContrastBadge } from "../shared/contrast-badge";
import { ColorSwatch } from "../shared/color-swatch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Palette } from "lucide-react";
import { useState } from "react";

const TOKENS = [
  { key: "primary", label: "Primary" },
  { key: "secondary", label: "Secondary" },
  { key: "accent", label: "Accent" },
  { key: "background", label: "Background" },
] as const;

export function ColorEditor() {
  const { theme, updateTheme } = usePlayground();
  const [activeToken, setActiveToken] = useState<(typeof TOKENS)[number]["key"]>("primary");

  const active = TOKENS.find((t) => t.key === activeToken) ?? TOKENS[0];
  const currentColor =
    active.key === "background"
      ? theme.colors.background.base
      : theme.colors[active.key as "primary" | "secondary" | "accent"].base;
  const fgColor =
    active.key === "background"
      ? theme.colors.foreground.base
      : theme.colors[active.key as "primary" | "secondary" | "accent"].foreground;

  const ratio = getContrastRatio(fgColor, currentColor);
  const meetsAA = meetsWCAG_AA(fgColor, currentColor);
  const meetsAAA = meetsWCAG_AAA(fgColor, currentColor);

  const handleColorChange = (hex: string) => {
    if (active.key === "background") {
      updateTheme({
        colors: {
          ...theme.colors,
          background: {
            ...theme.colors.background,
            base: hex,
            subtle: hex,
            muted: hex,
          },
        },
      });
    } else {
      const key = active.key as "primary" | "secondary" | "accent";
      updateTheme({
        colors: {
          ...theme.colors,
          [key]: {
            ...theme.colors[key],
            base: hex,
          },
        },
      });
    }
  };

  const handleGeneratePalette = () => {
    const generated = generateTheme({
      archetype: theme.meta.archetype,
      isDark: theme.meta.isDark,
      baseHue: Math.floor(Math.random() * 360),
      seed: Math.random().toString(36).slice(2),
    });
    updateTheme({ colors: generated.colors });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Colors</h3>
        <Button
          variant="outline"
          size="sm"
          className="h-7 gap-1 px-2 text-xs"
          onClick={handleGeneratePalette}
          title="Generate new color palette (keeps borders, shadows, etc.)"
        >
          <Palette className="h-3.5 w-3.5" />
          Generate palette
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {TOKENS.map((t) => {
          const hex =
            t.key === "background"
              ? theme.colors.background.base
              : theme.colors[t.key as "primary" | "secondary" | "accent"].base;
          const isActive = activeToken === t.key;
          return (
            <div
              key={t.key}
              role="button"
              tabIndex={0}
              onClick={() => setActiveToken(t.key)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveToken(t.key);
                }
              }}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-lg border-2 px-2 py-1.5 text-left transition-all",
                isActive ? "border-primary" : "border-transparent hover:border-muted"
              )}
            >
              <div
                className="h-6 w-6 shrink-0 rounded border border-border"
                style={{ backgroundColor: hex }}
                aria-hidden
              />
              <span className="text-xs font-medium">{t.label}</span>
            </div>
          );
        })}
      </div>
      {activeToken && (
        <>
          <div className="rounded-lg border p-2">
            <HexColorPicker
              color={currentColor}
              onChange={handleColorChange}
              className="!w-full !h-32"
            />
          </div>
          <div className="flex items-center gap-2">
            <ColorSwatch color={currentColor} size="md" />
            <span className="font-mono text-xs text-muted-foreground">
              {currentColor}
            </span>
            <ContrastBadge ratio={ratio} meetsAA={meetsAA} meetsAAA={meetsAAA} />
          </div>
        </>
      )}
    </div>
  );
}
