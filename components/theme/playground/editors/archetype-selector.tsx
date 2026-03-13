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
  "synthwave",
  "valentine",
  "halloween",
  "forest",
  "luxury",
  "dracula",
  "aqua",
  "wireframe",
];

const ARCHETYPE_COLORS: Record<
  VisualArchetype,
  { c1: string; c2: string; c3: string; c4: string }
> = {
  "neon-dark": { c1: "#0a0a0a", c2: "#4ade80", c3: "#fb923c", c4: "#ffffff" },
  "clean-minimal": {
    c1: "#f5f5f0",
    c2: "#a3e635",
    c3: "#737373",
    c4: "#0a0a0a",
  },
  glassmorphic: {
    c1: "#fce7f3",
    c2: "#e9d5ff",
    c3: "#f97316",
    c4: "#a78bfa",
  },
  "corporate-sharp": {
    c1: "#ffffff",
    c2: "#f59e0b",
    c3: "#0a0a0a",
    c4: "#737373",
  },
  brutalist: { c1: "#1a1a1a", c2: "#ffffff", c3: "#404040", c4: "#0a0a0a" },
  "retro-warm": { c1: "#f5f0e8", c2: "#8b4513", c3: "#d4a574", c4: "#2d1810" },
  cyberpunk: { c1: "#0d0221", c2: "#ff00ff", c3: "#00ffff", c4: "#ffff00" },
  "pastel-soft": { c1: "#fef3c7", c2: "#a78bfa", c3: "#f9a8d4", c4: "#86efac" },
  monochrome: { c1: "#ffffff", c2: "#0a0a0a", c3: "#737373", c4: "#e5e5e5" },
  editorial: { c1: "#fafafa", c2: "#171717", c3: "#737373", c4: "#0a0a0a" },
  synthwave: { c1: "#1a0a2e", c2: "#f472b6", c3: "#a78bfa", c4: "#38bdf8" },
  valentine: { c1: "#fdf2f8", c2: "#ec4899", c3: "#f9a8d4", c4: "#831843" },
  halloween: { c1: "#0a0a0a", c2: "#f97316", c3: "#fbbf24", c4: "#7c2d12" },
  forest: { c1: "#0f172a", c2: "#22c55e", c3: "#15803d", c4: "#86efac" },
  luxury: { c1: "#0a0a0a", c2: "#ca8a04", c3: "#a16207", c4: "#fef3c7" },
  dracula: { c1: "#1e1e2e", c2: "#bd93f9", c3: "#ff79c6", c4: "#8be9fd" },
  aqua: { c1: "#f0f9ff", c2: "#0ea5e9", c3: "#0284c7", c4: "#7dd3fc" },
  wireframe: { c1: "#fafafa", c2: "#737373", c3: "#e5e5e5", c4: "#0a0a0a" },
  custom: { c1: "#e5e5e5", c2: "#737373", c3: "#a3a3a3", c4: "#525252" },
};

function MiniSwatch({
  colors,
}: {
  colors: { c1: string; c2: string; c3: string; c4: string };
}) {
  return (
    <div
      className="grid h-5 w-5 shrink-0 grid-cols-2 grid-rows-2 overflow-hidden rounded-[3px] border border-border/50"
      aria-hidden
    >
      <div style={{ backgroundColor: colors.c1 }} />
      <div style={{ backgroundColor: colors.c2 }} />
      <div style={{ backgroundColor: colors.c3 }} />
      <div style={{ backgroundColor: colors.c4 }} />
    </div>
  );
}

export function ArchetypeSelector({
  selected,
  onSelect,
}: {
  selected: VisualArchetype;
  onSelect: (archetype: VisualArchetype) => void;
}) {
  return (
    <div className="space-y-1.5">
      <h3 className="text-xs font-medium text-muted-foreground">Archetype</h3>
      <div className="grid max-h-52 grid-cols-3 gap-1 overflow-y-auto border p-1">
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
                "flex items-center gap-1.5 rounded px-1.5 py-1 text-left transition-colors hover:bg-muted/70",
                isSelected ? "bg-primary/15 ring-1 ring-primary" : "",
              )}
            >
              <MiniSwatch colors={colors} />
              <span className="truncate text-[11px] font-medium">
                {config.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
