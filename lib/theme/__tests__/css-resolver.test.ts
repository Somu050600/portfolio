import { describe, it, expect } from "vitest";
import {
  resolveThemeToVariables,
  serializeVariablesToCSS,
  themeToCSS,
} from "../resolver/css-resolver";
import { neonDashboard, glassWellness, monochrome } from "../presets";

describe("css-resolver", () => {
  describe("resolveThemeToVariables", () => {
    it("returns map with color variables", () => {
      const vars = resolveThemeToVariables(monochrome);
      expect(vars.get("--color-background-base")).toBe("#ffffff");
      expect(vars.get("--color-primary-base")).toBe("#0a0a0a");
    });

    it("includes gradient for glass theme", () => {
      const vars = resolveThemeToVariables(glassWellness);
      expect(vars.get("--bg-gradient")).toContain("linear-gradient");
    });

    it("includes glow for neon theme", () => {
      const vars = resolveThemeToVariables(neonDashboard);
      expect(vars.get("--glow-primary")).toContain("rgba");
    });
  });

  describe("serializeVariablesToCSS", () => {
    it("outputs valid CSS with :root block", () => {
      const vars = resolveThemeToVariables(monochrome);
      const css = serializeVariablesToCSS(vars, monochrome, ":root");
      expect(css).toContain(":root {");
      expect(css).toContain("--color-background-base:");
      expect(css).toContain(".heading-style");
    });

    it("includes surface-glass for glass theme", () => {
      const vars = resolveThemeToVariables(glassWellness);
      const css = serializeVariablesToCSS(vars, glassWellness);
      expect(css).toContain(".surface-glass");
      expect(css).toContain("backdrop-filter");
    });

    it("includes bg-theme-gradient for gradient theme", () => {
      const vars = resolveThemeToVariables(glassWellness);
      const css = serializeVariablesToCSS(vars, glassWellness);
      expect(css).toContain(".bg-theme-gradient");
    });
  });

  describe("themeToCSS", () => {
    it("returns full CSS for theme", () => {
      const css = themeToCSS(monochrome);
      expect(css).toContain(":root {");
      expect(css).toContain("--color-background-base");
      expect(css).toContain(".heading-style");
    });
  });
});
