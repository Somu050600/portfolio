import { describe, it, expect } from "vitest";
import {
  applyHighContrast,
  applyReducedMotion,
  computeContrastPairs,
  isColorblindSafe,
} from "../accessibility";
import { neonDashboard, glassWellness } from "../presets";

describe("accessibility", () => {
  describe("applyHighContrast", () => {
    it("adjusts foreground subtle/muted closer to base", () => {
      const result = applyHighContrast(neonDashboard, "high");
      expect(result.colors.foreground.subtle).not.toBe(
        neonDashboard.colors.foreground.subtle
      );
    });

    it("increases glass opacity when material is glass", () => {
      const result = applyHighContrast(glassWellness, "high");
      expect(result.colors.surface.glass).toContain("rgba");
      const match = result.colors.surface.glass.match(/,\s*([\d.]+)\)$/);
      expect(match).toBeTruthy();
      const alpha = parseFloat(match![1]);
      expect(alpha).toBeGreaterThan(0.45);
    });
  });

  describe("applyReducedMotion", () => {
    it("sets all transition durations to 0ms", () => {
      const result = applyReducedMotion(neonDashboard);
      Object.values(result.transitions.duration).forEach((d) => {
        expect(d).toBe("0ms");
      });
    });
  });

  describe("computeContrastPairs", () => {
    it("returns pairs for opaque theme", () => {
      const pairs = computeContrastPairs(neonDashboard);
      expect(pairs.length).toBeGreaterThan(10);
      expect(pairs.some((p) => p.foregroundLabel === "Foreground")).toBe(true);
      expect(pairs.some((p) => p.backgroundLabel === "Background")).toBe(true);
    });

    it("includes glass-composited pair for glass theme", () => {
      const pairs = computeContrastPairs(glassWellness);
      const glassPair = pairs.find((p) => p.isGlass);
      expect(glassPair).toBeDefined();
      expect(glassPair?.backgroundLabel).toContain("Glass");
    });
  });

  describe("isColorblindSafe", () => {
    it("returns true for high luminance difference", () => {
      expect(isColorblindSafe("#000000", "#ffffff")).toBe(true);
    });

    it("returns false for similar luminance", () => {
      expect(isColorblindSafe("#ff0000", "#00ff00", 0.3)).toBe(false);
    });
  });
});
