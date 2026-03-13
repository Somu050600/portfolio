"use client";

import { ARCHETYPE_CONFIGS } from "@/lib/theme/engine/archetypes";
import type { VisualArchetype } from "@/lib/theme/schema/theme-spec";
import { cn } from "@/lib/utils";

const ARCHETYPES: VisualArchetype[] = [
  "neon-dark",
  "clean-minimal",
  "glassmorphic",
  "corporate-sharp",
  "brutalist",
  "retro-warm",
  "cyberpunk",
  "pastel-soft",
  "monochrome",
  "editorial",
];

const ARCHETYPE_COLORS: Record<VisualArchetype, { bg: string; accent: string }> =
  {
    "neon-dark": { bg: "#0a0a0a", accent: "#4ade80" },
    "clean-minimal": { bg: "#f5f5f0", accent: "#a3e635" },
    glassmorphic: {
      bg: "linear-gradient(135deg, #fce7f3, #e9d5ff)",
      accent: "#f97316",
    },
    "corporate-sharp": { bg: "#ffffff", accent: "#f59e0b" },
    brutalist: { bg: "#1a1a1a", accent: "#ffffff" },
    "retro-warm": { bg: "#f5f0e8", accent: "#8b4513" },
    cyberpunk: { bg: "#0d0221", accent: "#ff00ff" },
    "pastel-soft": { bg: "#fef3c7", accent: "#a78bfa" },
    monochrome: { bg: "#ffffff", accent: "#0a0a0a" },
    editorial: { bg: "#fafafa", accent: "#171717" },
    custom: { bg: "#e5e5e5", accent: "#737373" },
  };

export function ArchetypeSelector({
  selected,
  onSelect,
}: {
  selected: VisualArchetype;
  onSelect: (archetype: VisualArchetype) => void;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">Archetype</h3>
      <div className="grid grid-cols-2 gap-2">
        {ARCHETYPES.map((id) => {
          const config = ARCHETYPE_CONFIGS[id];
          const colors = ARCHETYPE_COLORS[id];
          const isSelected = selected === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              className={cn(
                "flex flex-col overflow-hidden rounded-lg border-2 p-2 text-left transition-all hover:border-primary/50",
                isSelected ? "border-primary" : "border-transparent"
              )}
            >
              <div
                className="mb-1.5 h-10 w-full rounded-md"
                style={{
                  background: colors.bg,
                  boxShadow: `inset 0 0 0 1px ${colors.accent}20`,
                }}
              />
              <span className="text-xs font-medium">{config.name}</span>
              <span className="line-clamp-2 text-[10px] text-muted-foreground">
                {config.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
