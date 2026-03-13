"use client";

import { HexColorPicker } from "react-colorful";
import { usePlayground } from "@/lib/theme/playground/playground-store";
import {
  getContrastRatio,
  meetsWCAG_AA,
  meetsWCAG_AAA,
} from "@/lib/theme/engine/color-utils";
import { ContrastBadge } from "../shared/contrast-badge";
import { ColorSwatch } from "../shared/color-swatch";
import { cn } from "@/lib/utils";
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

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold">Colors</h3>
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
