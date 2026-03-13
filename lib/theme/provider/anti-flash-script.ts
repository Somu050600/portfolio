import { presets } from "../presets";
import { themeToCSS } from "../resolver/css-resolver";

const STORAGE_KEY = "portfolio-theme";
const DEFAULT_THEME = "monochrome";

/**
 * Generates the anti-flash script content.
 * Runs before React hydrates to prevent flash of wrong theme.
 */
export function getAntiFlashScript(): string {
  const cssMap: Record<string, string> = {};
  for (const preset of presets) {
    cssMap[preset.meta.id] = themeToCSS(preset, ":root");
  }

  return `
(function() {
  try {
    var id = localStorage.getItem("${STORAGE_KEY}") || "${DEFAULT_THEME}";
    var map = ${JSON.stringify(cssMap)};
    var css = map[id];
    if (css) {
      var s = document.createElement("style");
      s.id = "theme-inline";
      s.textContent = css;
      document.documentElement.appendChild(s);
    }
    document.documentElement.setAttribute("data-theme", id);
  } catch (e) {}
})();
`.trim();
}
