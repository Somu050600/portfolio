"use client";

import { Slider } from "@/components/ui/slider";
import {
  RADIUS_SCALES,
  resolveRadiusScale,
} from "@/lib/theme/engine/radius-resolver";
import { usePlayground } from "@/lib/theme/playground/playground-store";
import type { ThemeBorders } from "@/lib/theme/schema/theme-spec";
import { cn } from "@/lib/utils";

const RADIUS_OPTIONS: (keyof typeof RADIUS_SCALES)[] = [
  "none",
  "minimal",
  "small",
  "medium",
  "large",
  "pill",
];

const BORDER_STYLES: ThemeBorders["style"][] = [
  "solid",
  "dashed",
  "dotted",
  "double",
  "none",
];

function inferRadiusScale(radius: ThemeBorders["radius"]): keyof typeof RADIUS_SCALES {
  const md = radius.md;
  for (const scale of RADIUS_OPTIONS) {
    const r = RADIUS_SCALES[scale];
    if (r.md === md) return scale;
  }
  return "medium";
}

export function BordersEditor() {
  const { theme, updateTheme } = usePlayground();
  const { borders } = theme;
  const currentScale = inferRadiusScale(borders.radius);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">Borders & Radius</h3>

      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">
          Radius scale
        </label>
        <div className="flex flex-wrap gap-1">
          {RADIUS_OPTIONS.map((scale) => (
            <button
              key={scale}
              type="button"
              onClick={() =>
                updateTheme({
                  borders: {
                    ...borders,
                    radius: resolveRadiusScale(scale),
                  },
                })
              }
              className={cn(
                "rounded px-2 py-1 text-xs capitalize transition-colors",
                currentScale === scale
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              {scale}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">
          Border style
        </label>
        <div className="flex flex-wrap gap-1">
          {BORDER_STYLES.map((style) => (
            <button
              key={style}
              type="button"
              onClick={() =>
                updateTheme({
                  borders: { ...borders, style },
                })
              }
              className={cn(
                "rounded px-2 py-1 text-xs capitalize transition-colors",
                borders.style === style
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">
          Border opacity: {Math.round(borders.opacity * 100)}%
        </label>
        <Slider
          value={[borders.opacity * 100]}
          min={0}
          max={100}
          step={5}
          onValueChange={([v]) =>
            updateTheme({
              borders: { ...borders, opacity: v / 100 },
            })
          }
        />
      </div>
    </div>
  );
}
