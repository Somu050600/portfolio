"use client";

import { usePlayground } from "@/lib/theme/playground/playground-store";
import type { ThemeLayout } from "@/lib/theme/schema/theme-spec";
import { cn } from "@/lib/utils";

const DENSITY_OPTIONS: ThemeLayout["density"][] = [
  "compact",
  "comfortable",
  "spacious",
];

const DENSITY_MULTIPLIERS: Record<ThemeLayout["density"], number> = {
  compact: 0.85,
  comfortable: 1,
  spacious: 1.15,
};

const CARD_PADDING_PRESETS = ["1rem", "1.25rem", "1.5rem", "2rem"] as const;

const GAP_PRESETS = [
  { label: "Compact", sm: "0.5rem", md: "1rem", lg: "1.5rem" },
  { label: "Comfortable", sm: "0.75rem", md: "1.25rem", lg: "2rem" },
  { label: "Spacious", sm: "1rem", md: "1.5rem", lg: "2.5rem" },
] as const;

export function SpacingEditor() {
  const { theme, updateTheme } = usePlayground();
  const { layout, spacing } = theme;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">Spacing</h3>

      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">
          Density
        </label>
        <div className="flex flex-wrap gap-1">
          {DENSITY_OPTIONS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() =>
                updateTheme({
                  layout: { ...layout, density: d },
                  spacing: {
                    ...spacing,
                    density: DENSITY_MULTIPLIERS[d],
                  },
                })
              }
              className={cn(
                "rounded px-2 py-1 text-xs capitalize transition-colors",
                layout.density === d
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">
          Card padding
        </label>
        <div className="flex flex-wrap gap-1">
          {CARD_PADDING_PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() =>
                updateTheme({
                  layout: { ...layout, cardPadding: p },
                })
              }
              className={cn(
                "rounded px-2 py-1 text-xs transition-colors",
                layout.cardPadding === p
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground">
          Gap scale
        </label>
        <div className="flex flex-wrap gap-1">
          {GAP_PRESETS.map((g) => (
            <button
              key={g.label}
              type="button"
              onClick={() =>
                updateTheme({
                  layout: {
                    ...layout,
                    gap: { sm: g.sm, md: g.md, lg: g.lg },
                  },
                })
              }
              className={cn(
                "rounded px-2 py-1 text-xs transition-colors",
                layout.gap.sm === g.sm && layout.gap.md === g.md
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
