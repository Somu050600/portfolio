import type { ThemeSpec } from "../schema/theme-spec";

/** Extract font family names from theme (e.g. "Space Grotesk" from '"Space Grotesk", sans-serif') */
function extractFontNames(fontStack: string): string[] {
  const match = fontStack.match(/"([^"]+)"/g);
  if (!match) return [];
  return match.map((m) => m.replace(/"/g, ""));
}

/** Google Fonts we support (preset themes use these) */
const GOOGLE_FONTS = new Set([
  "Inter",
  "Space Grotesk",
  "JetBrains Mono",
  "Nunito",
  "Fira Code",
  "Source Sans 3",
  "Source Code Pro",
  "Playfair Display",
  "Lora",
  "Courier Prime",
]);

export async function loadThemeFonts(theme: ThemeSpec): Promise<void> {
  if (typeof document === "undefined") return;

  const families = [
    theme.typography.fontFamily.heading,
    theme.typography.fontFamily.body,
    theme.typography.fontFamily.mono,
  ];

  const toLoad = new Set<string>();
  for (const stack of families) {
    for (const name of extractFontNames(stack)) {
      if (GOOGLE_FONTS.has(name)) {
        toLoad.add(name);
      }
    }
  }

  if (toLoad.size === 0) return;

  const familyParam = Array.from(toLoad)
    .map((f) => f.replace(/ /g, "+"))
    .join("|");

  const existing = document.querySelector(
    `link[href*="fonts.googleapis.com"][href*="${familyParam.slice(0, 20)}"]`
  );
  if (existing) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${familyParam}:wght@300;400;500;600;700;800&display=swap`;
  document.head.appendChild(link);
}
