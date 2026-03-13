export const FONT_FAMILIES: Record<
  string,
  { heading: string; body: string; mono: string }
> = {
  geometric: {
    heading: '"Inter", "SF Pro Display", system-ui',
    body: '"Inter", system-ui',
    mono: '"JetBrains Mono", monospace',
  },
  humanist: {
    heading: '"Source Sans 3", system-ui',
    body: '"Source Sans 3", system-ui',
    mono: '"Source Code Pro", monospace',
  },
  rounded: {
    heading: '"Nunito", "SF Pro Rounded", system-ui',
    body: '"Nunito", system-ui',
    mono: '"Fira Code", monospace',
  },
  mono: {
    heading: '"Space Mono", "JetBrains Mono", monospace',
    body: '"JetBrains Mono", monospace',
    mono: '"JetBrains Mono", monospace',
  },
  serif: {
    heading: '"Playfair Display", "Georgia", serif',
    body: '"Lora", "Georgia", serif',
    mono: '"Courier Prime", monospace',
  },
  system: {
    heading: "system-ui, sans-serif",
    body: "system-ui, sans-serif",
    mono: "ui-monospace, monospace",
  },
};

export function resolveFontMood(
  mood: keyof typeof FONT_FAMILIES
): { heading: string; body: string; mono: string } {
  return FONT_FAMILIES[mood] ?? FONT_FAMILIES.system;
}
