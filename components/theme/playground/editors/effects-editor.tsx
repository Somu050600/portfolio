"use client";

import { Slider } from "@/components/ui/slider";
import { usePlayground } from "@/lib/theme/playground/playground-store";
import type { VisualArchetype } from "@/lib/theme/schema/theme-spec";
import { cn } from "@/lib/utils";

const EFFECTS_ARCHETYPES: VisualArchetype[] = [
  "glassmorphic",
  "neon-dark",
  "cyberpunk",
];

const GLOW_INTENSITIES = ["subtle", "medium", "strong"] as const;

export function EffectsEditor() {
  const { theme, updateTheme } = usePlayground();
  const { effects } = theme;

  if (!EFFECTS_ARCHETYPES.includes(theme.meta.archetype)) {
    return null;
  }

  const blurPx = parseInt(effects.backdrop.blur, 10) || 0;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">Effects</h3>

      {(theme.meta.archetype === "glassmorphic" ||
        effects.material === "glass" ||
        effects.material === "frosted") && (
        <>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Backdrop blur: {blurPx}px
            </label>
            <Slider
              value={[blurPx]}
              min={0}
              max={24}
              step={2}
              onValueChange={([v]) =>
                updateTheme({
                  effects: {
                    ...effects,
                    backdrop: {
                      ...effects.backdrop,
                      blur: `${v}px`,
                    },
                  },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Tint strength: {Math.round(effects.tint.strength * 100)}%
            </label>
            <Slider
              value={[effects.tint.strength * 100]}
              min={0}
              max={100}
              step={5}
              onValueChange={([v]) =>
                updateTheme({
                  effects: {
                    ...effects,
                    tint: { ...effects.tint, strength: v / 100 },
                  },
                })
              }
            />
          </div>
        </>
      )}

      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">
          Noise
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              updateTheme({
                effects: {
                  ...effects,
                  noise: { ...effects.noise, enabled: true },
                },
              })
            }
            className={cn(
              "rounded px-2 py-1 text-xs transition-colors",
              effects.noise.enabled
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            )}
          >
            On
          </button>
          <button
            type="button"
            onClick={() =>
              updateTheme({
                effects: {
                  ...effects,
                  noise: { ...effects.noise, enabled: false },
                },
              })
            }
            className={cn(
              "rounded px-2 py-1 text-xs transition-colors",
              !effects.noise.enabled
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            )}
          >
            Off
          </button>
        </div>
        {effects.noise.enabled && (
          <div className="pt-1">
            <label className="text-xs text-muted-foreground">
              Opacity: {Math.round(effects.noise.opacity * 100)}%
            </label>
            <Slider
              value={[effects.noise.opacity * 100]}
              min={0}
              max={20}
              step={1}
              onValueChange={([v]) =>
                updateTheme({
                  effects: {
                    ...effects,
                    noise: { ...effects.noise, opacity: v / 100 },
                  },
                })
              }
            />
          </div>
        )}
      </div>

      {(theme.meta.archetype === "neon-dark" ||
        theme.meta.archetype === "cyberpunk") && (
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">
            Glow intensity
          </label>
          <div className="flex flex-wrap gap-1">
            {GLOW_INTENSITIES.map((i) => (
              <button
                key={i}
                type="button"
                onClick={() =>
                  updateTheme({
                    effects: {
                      ...effects,
                      glow: { ...effects.glow, intensity: i },
                    },
                  })
                }
                className={cn(
                  "rounded px-2 py-1 text-xs capitalize transition-colors",
                  effects.glow.intensity === i
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                {i}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
