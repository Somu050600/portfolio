"use client";

import { Slider } from "@/components/ui/slider";
import { usePlayground } from "@/lib/theme/playground/playground-store";
import type { ThemeBorders, VisualArchetype } from "@/lib/theme/schema/theme-spec";
import { cn } from "@/lib/utils";

const TWEAKABLE_ARCHETYPES: Array<{
  archetype: VisualArchetype;
  label: string;
}> = [
  { archetype: "glassmorphic", label: "Glassmorphic tweaks" },
  { archetype: "brutalist", label: "Brutalist tweaks" },
];

const BORDER_WIDTH_PRESETS: Record<string, ThemeBorders["width"]> = {
  thin: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" },
  medium: { 0: "0px", 1: "2px", 2: "4px", 4: "4px", 8: "8px" },
  thick: { 0: "0px", 1: "2px", 2: "4px", 4: "8px", 8: "8px" },
};

function inferBorderWidthPreset(width: ThemeBorders["width"]): string {
  if (width["1"] === "2px" && width["4"] === "8px") return "thick";
  if (width["1"] === "2px" && width["2"] === "4px") return "medium";
  return "thin";
}

export function ArchetypeTweaksEditor() {
  const { theme, updateTheme } = usePlayground();
  const config = TWEAKABLE_ARCHETYPES.find(
    (t) => t.archetype === theme.meta.archetype
  );

  if (!config) return null;

  if (config.archetype === "glassmorphic") {
    const blurPx = parseInt(theme.effects.backdrop.blur, 10) || 0;
    const saturate = parseFloat(theme.effects.backdrop.saturate) || 1;

    return (
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">{config.label}</h3>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">
            Blur: {blurPx}px
          </label>
          <Slider
            value={[blurPx]}
            min={0}
            max={32}
            step={2}
            onValueChange={([v]) =>
              updateTheme({
                effects: {
                  ...theme.effects,
                  backdrop: {
                    ...theme.effects.backdrop,
                    blur: `${v}px`,
                  },
                },
              })
            }
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">
            Saturate: {saturate.toFixed(1)}
          </label>
          <Slider
            value={[saturate * 10]}
            min={10}
            max={25}
            step={1}
            onValueChange={([v]) =>
              updateTheme({
                effects: {
                  ...theme.effects,
                  backdrop: {
                    ...theme.effects.backdrop,
                    saturate: String(v / 10),
                  },
                },
              })
            }
          />
        </div>
      </div>
    );
  }

  if (config.archetype === "brutalist") {
    const currentPreset = inferBorderWidthPreset(theme.borders.width);

    return (
      <div className="space-y-4">
        <h3 className="text-sm font-semibold">{config.label}</h3>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">
            Border emphasis
          </label>
          <div className="flex flex-wrap gap-1">
            {(["thin", "medium", "thick"] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() =>
                  updateTheme({
                    borders: {
                      ...theme.borders,
                      width: BORDER_WIDTH_PRESETS[p],
                    },
                  })
                }
                className={cn(
                  "rounded px-2 py-1 text-xs capitalize transition-colors",
                  currentPreset === p
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
