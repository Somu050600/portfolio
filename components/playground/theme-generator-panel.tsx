"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { VisualArchetype } from "@/lib/theme/schema/theme-spec";
import type { HarmonyType } from "@/lib/theme/engine/color-utils";
import { Shuffle } from "lucide-react";

const HARMONIES: HarmonyType[] = [
  "complementary",
  "analogous",
  "triadic",
  "split-complementary",
  "tetradic",
];

export function ThemeGeneratorPanel({
  options,
  onChange,
  onGenerate,
}: {
  options: {
    archetype: VisualArchetype;
    baseHue: number;
    harmony: HarmonyType;
    isDark: boolean;
    saturation: "muted" | "normal" | "vivid";
    seed: string;
  };
  onChange: (o: typeof options) => void;
  onGenerate: () => void;
}) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <h2 className="mb-4 text-sm font-semibold">Generate</h2>

      <div className="space-y-4">
        <div>
          <Label className="text-xs">Base hue</Label>
          <input
            type="range"
            min={0}
            max={360}
            value={options.baseHue}
            onChange={(e) =>
              onChange({ ...options, baseHue: Number(e.target.value) })
            }
            className="mt-1 w-full"
          />
          <span className="text-xs text-muted-foreground">{options.baseHue}°</span>
        </div>

        <div>
          <Label className="text-xs">Harmony</Label>
          <select
            value={options.harmony}
            onChange={(e) =>
              onChange({ ...options, harmony: e.target.value as HarmonyType })
            }
            className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
          >
            {HARMONIES.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isDark"
            checked={options.isDark}
            onChange={(e) =>
              onChange({ ...options, isDark: e.target.checked })
            }
          />
          <Label htmlFor="isDark" className="text-xs">
            Dark mode
          </Label>
        </div>

        <div>
          <Label className="text-xs">Saturation</Label>
          <select
            value={options.saturation}
            onChange={(e) =>
              onChange({
                ...options,
                saturation: e.target.value as "muted" | "normal" | "vivid",
              })
            }
            className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
          >
            <option value="muted">Muted</option>
            <option value="normal">Normal</option>
            <option value="vivid">Vivid</option>
          </select>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              onChange({
                ...options,
                seed: Math.random().toString(36).slice(2),
              })
            }
          >
            <Shuffle className="mr-1 h-4 w-4" />
            Randomize
          </Button>
          <Button size="sm" onClick={onGenerate} className="flex-1">
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
}
