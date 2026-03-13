import { describe, it, expect } from "vitest";
import { generateTheme } from "../engine/theme-generator";
import { parseTheme, validateTheme } from "../schema/theme-schema";
import { meetsWCAG_AA } from "../engine/color-utils";
import { compositeColor } from "../engine/contrast-fixer";
import type { VisualArchetype } from "../schema/theme-spec";

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

describe("theme-generator", () => {
  describe("generateTheme", () => {
    it("produces valid ThemeSpec for each archetype", () => {
      for (const archetype of ARCHETYPES) {
        const theme = generateTheme({ archetype, seed: `test-${archetype}` });
        const result = validateTheme(theme);
        expect(result.success, `Archetype ${archetype} should produce valid theme`).toBe(
          true
        );
        expect(result.errors).toHaveLength(0);
      }
    });

    it("parses generated themes without throwing", () => {
      for (const archetype of ARCHETYPES) {
        const theme = generateTheme({ archetype, seed: `parse-${archetype}` });
        expect(() => parseTheme(theme)).not.toThrow();
      }
    });

    it("meets WCAG AA for primary foreground on primary base", () => {
      for (const archetype of ARCHETYPES) {
        const theme = generateTheme({ archetype, seed: `wcag-${archetype}` });
        expect(
          meetsWCAG_AA(theme.colors.primary.foreground, theme.colors.primary.base),
          `Archetype ${archetype}: primary fg on primary base`
        ).toBe(true);
      }
    });

    it("meets WCAG AA for foreground on background", () => {
      for (const archetype of ARCHETYPES) {
        const theme = generateTheme({ archetype, seed: `wcag-bg-${archetype}` });
        expect(
          meetsWCAG_AA(theme.colors.foreground.base, theme.colors.background.base),
          `Archetype ${archetype}: fg on bg`
        ).toBe(true);
      }
    });

    it("meets WCAG AA for glass surfaces when material is glass", () => {
      const theme = generateTheme({
        archetype: "glassmorphic",
        seed: "glass-wcag",
      });
      if (
        theme.effects.material === "glass" ||
        theme.effects.material === "frosted" ||
        theme.effects.material === "translucent"
      ) {
        const effectiveSurface = compositeColor(
          theme.colors.surface.glass,
          theme.colors.background.base
        );
        expect(
          meetsWCAG_AA(theme.colors.foreground.base, effectiveSurface)
        ).toBe(true);
      }
    });

    it("produces deterministic output with same seed", () => {
      const a = generateTheme({ archetype: "neon-dark", seed: "deterministic" });
      const b = generateTheme({ archetype: "neon-dark", seed: "deterministic" });
      expect(a.colors.primary.base).toBe(b.colors.primary.base);
      expect(a.colors.background.base).toBe(b.colors.background.base);
      expect(a.meta.name).toBe(b.meta.name);
    });

    it("respects archetype option", () => {
      const theme = generateTheme({
        archetype: "glassmorphic",
        seed: "archetype-check",
      });
      expect(theme.meta.archetype).toBe("glassmorphic");
      expect(theme.effects.material).toBe("glass");
      expect(theme.effects.backdrop.blur).not.toBe("0px");
    });

    it("respects isDark option", () => {
      const dark = generateTheme({
        archetype: "clean-minimal",
        isDark: true,
        seed: "dark-check",
      });
      const light = generateTheme({
        archetype: "clean-minimal",
        isDark: false,
        seed: "light-check",
      });
      expect(dark.meta.isDark).toBe(true);
      expect(light.meta.isDark).toBe(false);
    });

    it("respects baseHue option", () => {
      const theme = generateTheme({
        archetype: "neon-dark",
        baseHue: 120,
        seed: "hue-check",
      });
      expect(theme.colors.primary.base).toMatch(/^#[0-9a-f]{6}$/i);
      expect(theme.meta.name).toContain("120");
    });

    it("generates unique ids", () => {
      const themes = Array.from({ length: 5 }, () =>
        generateTheme({ archetype: "monochrome" })
      );
      const ids = new Set(themes.map((t) => t.meta.id));
      expect(ids.size).toBe(5);
    });
  });
});
