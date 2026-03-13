import { describe, expect, it } from "vitest";
import {
  decodeThemeDiffFromURL,
  decodeThemeFromURL,
  encodeThemeDiffToURL,
  encodeThemeToURL,
  exportAsCSS,
  exportAsJSON,
  importFromJSON,
  importFromJSONSafe,
} from "../io";
import { monochrome, neonDashboard } from "../presets";

describe("theme io", () => {
  describe("exportAsJSON / importFromJSON", () => {
    it("round-trips theme without loss", () => {
      const json = exportAsJSON(neonDashboard);
      const imported = importFromJSON(json);
      expect(imported.meta.id).toBe(neonDashboard.meta.id);
      expect(imported.colors.primary.base).toBe(
        neonDashboard.colors.primary.base,
      );
      expect(imported.effects.material).toBe(neonDashboard.effects.material);
    });
  });

  describe("importFromJSONSafe", () => {
    it("returns success for valid JSON", () => {
      const result = importFromJSONSafe(exportAsJSON(neonDashboard));
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.theme.meta.id).toBe(neonDashboard.meta.id);
      }
    });

    it("returns errors for invalid JSON", () => {
      const result = importFromJSONSafe("not json");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });

    it("returns errors for invalid schema", () => {
      const result = importFromJSONSafe('{"meta":{"id":"x"}}');
      expect(result.success).toBe(false);
    });
  });

  describe("exportAsCSS", () => {
    it("outputs valid CSS with :root", () => {
      const css = exportAsCSS(neonDashboard);
      expect(css).toContain(":root {");
      expect(css).toContain("--color-primary-base");
      expect(css).toContain(neonDashboard.colors.primary.base);
    });
  });

  describe("URL codec", () => {
    it("round-trips theme via URL encoding", () => {
      const encoded = encodeThemeToURL(neonDashboard);
      expect(encoded).toMatch(/^t=/);
      const decoded = decodeThemeFromURL(encoded);
      expect(decoded.meta.id).toBe(neonDashboard.meta.id);
      expect(decoded.colors.primary.base).toBe(
        neonDashboard.colors.primary.base,
      );
    });

    it("decodes theme with t= prefix stripped", () => {
      const encoded = encodeThemeToURL(monochrome);
      const decoded = decodeThemeFromURL(encoded);
      expect(decoded.meta.archetype).toBe("monochrome");
    });

    it("round-trips theme diff", () => {
      const base = monochrome;
      const theme = {
        ...neonDashboard,
        meta: { ...neonDashboard.meta, id: "custom" },
      };
      const encoded = encodeThemeDiffToURL(theme, base);
      const decoded = decodeThemeDiffFromURL(encoded, base);
      expect(decoded.colors.primary.base).toBe(theme.colors.primary.base);
    });
  });
});
