import { describe, it, expect } from "vitest";
import {
  parseTheme,
  validateTheme,
  partialThemeSchema,
  themeSpecSchema,
} from "../schema/theme-schema";
import {
  neonDashboard,
  glassWellness,
  cleanLogistics,
  corporateCrm,
  monochrome,
  presets,
} from "../presets";

describe("theme-schema", () => {
  describe("parseTheme", () => {
    it("parses all 5 presets successfully", () => {
      expect(() => parseTheme(neonDashboard)).not.toThrow();
      expect(() => parseTheme(glassWellness)).not.toThrow();
      expect(() => parseTheme(cleanLogistics)).not.toThrow();
      expect(() => parseTheme(corporateCrm)).not.toThrow();
      expect(() => parseTheme(monochrome)).not.toThrow();
    });

    it("returns typed ThemeSpec", () => {
      const theme = parseTheme(neonDashboard);
      expect(theme.meta.id).toBe("neon-dashboard");
      expect(theme.meta.archetype).toBe("neon-dark");
      expect(theme.colors.primary.base).toBe("#4ade80");
      expect(theme.effects.material).toBe("opaque");
    });
  });

  describe("validateTheme", () => {
    it("returns success for valid presets", () => {
      for (const preset of presets) {
        const result = validateTheme(preset);
        expect(result.success).toBe(true);
        expect(result.errors).toHaveLength(0);
      }
    });

    it("returns errors for invalid theme", () => {
      const result = validateTheme({
        meta: { id: "bad" },
        colors: {},
      });
      expect(result.success).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it("rejects invalid color strings", () => {
      const invalidTheme = {
        ...neonDashboard,
        colors: {
          ...neonDashboard.colors,
          primary: {
            ...neonDashboard.colors.primary,
            base: "not-a-color",
          },
        },
      };
      const result = validateTheme(invalidTheme);
      expect(result.success).toBe(false);
      expect(result.errors.some((e) => e.includes("color"))).toBe(true);
    });

    it("rejects invalid gradient (when gradient is provided)", () => {
      const invalidGradient = {
        ...glassWellness,
        colors: {
          ...glassWellness.colors,
          background: {
            ...glassWellness.colors.background,
            gradient: {
              value: "invalid-gradient",
              fallback: "#fff",
            },
          },
        },
      };
      const result = validateTheme(invalidGradient);
      expect(result.success).toBe(false);
    });

    it("rejects chart with too few colors", () => {
      const invalidChart = {
        ...neonDashboard,
        colors: {
          ...neonDashboard.colors,
          chart: { series: ["#fff", "#000"] },
        },
      };
      const result = validateTheme(invalidChart);
      expect(result.success).toBe(false);
    });
  });

  describe("partialThemeSchema", () => {
    it("accepts empty object (all keys optional)", () => {
      const result = partialThemeSchema.safeParse({});
      expect(result.success).toBe(true);
    });

    it("accepts partial override when provided keys are valid", () => {
      const partial = {
        meta: {
          ...neonDashboard.meta,
          name: "Custom Neon",
          id: "custom-neon",
        },
      };
      const result = partialThemeSchema.safeParse(partial);
      expect(result.success).toBe(true);
    });
  });
});
