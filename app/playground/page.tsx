"use client";

import {
  ActionBar,
  ArchetypePicker,
  PreviewPanel,
  ThemeCodePanel,
  ThemeGeneratorPanel,
} from "@/components/playground";
import { useTheme } from "@/lib/theme";
import { decodeThemeFromURL } from "@/lib/theme/io";
import type { HarmonyType } from "@/lib/theme/engine/color-utils";
import { generateTheme } from "@/lib/theme/engine/theme-generator";
import { presets } from "@/lib/theme/presets";
import { themeToCSS } from "@/lib/theme/resolver/css-resolver";
import type { ThemeSpec, VisualArchetype } from "@/lib/theme/schema/theme-spec";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { Suspense } from "react";

const DEFAULT_THEME = presets.find((p) => p.meta.id === "neon-dashboard") ?? presets[0];

function PlaygroundContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setCustomTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  const [playgroundTheme, setPlaygroundTheme] = React.useState<ThemeSpec>(
    () => DEFAULT_THEME,
  );

  const [generatorOptions, setGeneratorOptions] = React.useState<{
    archetype: VisualArchetype;
    baseHue: number;
    harmony: HarmonyType;
    isDark: boolean;
    saturation: "muted" | "normal" | "vivid";
    seed: string;
  }>({
    archetype: "neon-dark",
    baseHue: 120,
    harmony: "complementary",
    isDark: true,
    saturation: "normal",
    seed: "",
  });

  // Defer URL parsing until after mount to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;
    const themeParam = searchParams.get("theme");
    if (themeParam) {
      try {
        const decoded = decodeThemeFromURL(themeParam);
        setPlaygroundTheme(decoded);
        setGeneratorOptions((o) => ({
          ...o,
          archetype: decoded.meta.archetype,
          isDark: decoded.meta.isDark,
        }));
        return;
      } catch {
        /* fall through to archetype params */
      }
    }
    const archetype = searchParams.get("archetype") as VisualArchetype | null;
    const hue = searchParams.get("hue");
    const harmony = searchParams.get("harmony") as HarmonyType | null;
    const dark = searchParams.get("dark");
    if (archetype) setGeneratorOptions((o) => ({ ...o, archetype }));
    if (hue) setGeneratorOptions((o) => ({ ...o, baseHue: Number(hue) }));
    if (harmony) setGeneratorOptions((o) => ({ ...o, harmony }));
    if (dark !== null)
      setGeneratorOptions((o) => ({ ...o, isDark: dark !== "false" }));
  }, [mounted, searchParams]);

  const updateUrl = React.useCallback(
    (opts: typeof generatorOptions) => {
      const params = new URLSearchParams();
      params.set("archetype", opts.archetype);
      params.set("hue", String(opts.baseHue));
      params.set("harmony", opts.harmony);
      params.set("dark", String(opts.isDark));
      router.replace(`/playground?${params.toString()}`, { scroll: false });
    },
    [router],
  );

  const handleGenerate = React.useCallback(() => {
    const theme = generateTheme({
      ...generatorOptions,
      seed: generatorOptions.seed || undefined,
    });
    setPlaygroundTheme(theme);
    updateUrl(generatorOptions);
  }, [generatorOptions, updateUrl]);

  const handleArchetypeSelect = React.useCallback(
    (archetype: VisualArchetype) => {
      setGeneratorOptions((o) => ({ ...o, archetype }));
    },
    [],
  );

  const handleApplyToSite = React.useCallback(() => {
    setCustomTheme(playgroundTheme);
  }, [playgroundTheme, setCustomTheme]);

  const handleImport = React.useCallback((theme: ThemeSpec) => {
    setPlaygroundTheme(theme);
    setGeneratorOptions((o) => ({
      ...o,
      archetype: theme.meta.archetype,
      isDark: theme.meta.isDark,
    }));
  }, []);

  const previewCss = React.useMemo(
    () => themeToCSS(playgroundTheme, ".playground-preview"),
    [playgroundTheme],
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-2 text-3xl font-bold">Theme Playground</h1>
        <p className="mb-8 text-muted-foreground">
          Generate, tweak, and preview themes. Apply to site when ready.
        </p>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1 space-y-6">
            <ArchetypePicker
              selected={generatorOptions.archetype}
              onSelect={handleArchetypeSelect}
            />
            <ThemeGeneratorPanel
              options={generatorOptions}
              onChange={setGeneratorOptions}
              onGenerate={handleGenerate}
            />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <PreviewPanel theme={playgroundTheme} previewCss={previewCss} />
            <ThemeCodePanel theme={playgroundTheme} />
            <ActionBar
              theme={playgroundTheme}
              onApply={handleApplyToSite}
              onImport={handleImport}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PlaygroundPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <PlaygroundContent />
    </Suspense>
  );
}
