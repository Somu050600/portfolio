"use client";

import { generateShadows } from "@/lib/theme/engine/theme-generator";
import { usePlayground } from "@/lib/theme/playground/playground-store";
import type { ThemeShadows } from "@/lib/theme/schema/theme-spec";
import { cn } from "@/lib/utils";

const SHADOW_STYLES: Array<{
  id: string;
  label: string;
  style: "none" | "subtle" | "soft" | "medium" | "dramatic" | "hard-offset";
}> = [
  { id: "none", label: "None", style: "none" },
  { id: "subtle", label: "Subtle", style: "subtle" },
  { id: "soft", label: "Soft", style: "soft" },
  { id: "medium", label: "Medium", style: "medium" },
  { id: "dramatic", label: "Dramatic", style: "dramatic" },
  { id: "hard-offset", label: "Hard", style: "hard-offset" },
];

function inferShadowStyle(shadows: ThemeShadows): string {
  if (shadows.sm === "none") return "none";
  if (shadows.sm?.includes("4px 4px 0")) return "hard-offset";
  if (shadows["2xl"]?.includes("96px")) return "dramatic";
  if (shadows["2xl"]?.includes("64px") && shadows.sm?.includes("2px 8px"))
    return "soft";
  if (shadows.md?.includes("6px")) return "subtle";
  return "medium";
}

export function ShadowsEditor() {
  const { theme, updateTheme } = usePlayground();
  const { shadows, colors } = theme;
  const isDark = theme.meta.isDark;
  const currentStyle = inferShadowStyle(shadows);
  const hasGlow =
    shadows.glow.primary !== "none" &&
    !shadows.glow.primary.includes("rgba(0,0,0,0)");

  const applyShadowStyle = (
    style: "none" | "subtle" | "soft" | "medium" | "dramatic" | "hard-offset",
    glow: boolean
  ) => {
    const newShadows = generateShadows(
      style,
      false,
      glow,
      colors.primary.base,
      colors.secondary.base,
      colors.accent.base,
      isDark
    );
    updateTheme({
      shadows: newShadows,
      effects: {
        ...theme.effects,
        glow: { ...theme.effects.glow, enabled: glow },
      },
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">Shadows</h3>

      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">
          Shadow style
        </label>
        <div className="flex flex-wrap gap-1">
          {SHADOW_STYLES.map(({ id, label, style }) => (
            <button
              key={id}
              type="button"
              onClick={() => applyShadowStyle(style, shadows.glow.primary !== "none")}
              className={cn(
                "rounded px-2 py-1 text-xs transition-colors",
                currentStyle === style
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">
          Glow
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() =>
              applyShadowStyle(
                currentStyle as "none" | "subtle" | "soft" | "medium" | "dramatic" | "hard-offset",
                true
              )
            }
            className={cn(
              "rounded px-2 py-1 text-xs transition-colors",
              hasGlow ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
            )}
          >
            On
          </button>
          <button
            type="button"
            onClick={() =>
              applyShadowStyle(
                currentStyle as "none" | "subtle" | "soft" | "medium" | "dramatic" | "hard-offset",
                false
              )
            }
            className={cn(
              "rounded px-2 py-1 text-xs transition-colors",
              !hasGlow ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
            )}
          >
            Off
          </button>
        </div>
      </div>
    </div>
  );
}
