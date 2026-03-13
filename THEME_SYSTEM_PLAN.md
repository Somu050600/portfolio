# Theme System Architecture — Implementation Plan

> A scalable, generic theming engine for a Next.js + Tailwind portfolio (and eventually a standalone library).

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Visual Archetype Reference](#2-visual-archetype-reference)
3. [Architecture Overview](#3-architecture-overview)
4. [Phase 1 — Theme Specification & Token Schema](#4-phase-1--theme-specification--token-schema)
5. [Phase 2 — CSS Variable Resolver & Tailwind Integration](#5-phase-2--css-variable-resolver--tailwind-integration)
6. [Phase 3 — Theme Provider (React Context)](#6-phase-3--theme-provider-react-context)
7. [Phase 4 — Theme Generation Engine & Visual Archetypes](#7-phase-4--theme-generation-engine--visual-archetypes)
8. [Phase 5 — Playground UI](#8-phase-5--playground-ui)
9. [Phase 6 — Import / Export / Sharing](#9-phase-6--import--export--sharing)
10. [Phase 7 — Accessibility & Contrast Modes](#10-phase-7--accessibility--contrast-modes)
11. [Phase 8 — Library Extraction](#11-phase-8--library-extraction)
12. [Folder Structure](#12-folder-structure)
13. [Existing Tools & References](#13-existing-tools--references)
14. [Cursor-Specific Workflow Tips](#14-cursor-specific-workflow-tips)

---

## 1. Project Overview

### Goal

Replace the current black/white toggle with a full theming engine that supports:

- Unlimited user-defined themes (colors, typography, borders, shadows, spacing, motion, surface effects)
- **Visual archetypes** — complete aesthetic identities (not just color swaps) including glassmorphism, neon-cyber, soft-organic, corporate-neutral, brutalist, and more
- A random theme generator with color-theory constraints
- A live playground to tweak and preview themes
- Import/export themes as JSON (and optionally CSS / Tailwind config)
- Accessibility-first contrast modes (WCAG AA / AAA)
- A clean separation of concerns so the core can be extracted into an npm package later

### Non-Goals (for now)

- Per-component theming (e.g., a card with a different theme than the page) — keep it global first
- Server-side theme generation API
- Theme marketplace / database backend

---

## 2. Visual Archetype Reference

These four reference designs define the core aesthetic categories the system must be able to express. Every token in the schema, every personality in the generator, exists to reproduce these kinds of looks and everything in between.

### Archetype A — "Neon Dashboard" (Image 1: Check Box dark dashboard)

```
VISUAL DNA:
- Background:     Near-black (#0a0a0a – #1a1a1a), very dark charcoal surfaces
- Surface cards:  Dark gray (#1e1e1e – #2a2a2a) with subtle 1px borders (#333)
- Primary accent: Neon green (#4ade80 / #22c55e) — used for charts, active states, positive indicators
- Secondary:      Neon orange (#f97316 / #fb923c) — used for warnings, secondary data, contrast pops
- Tertiary:       White (#ffffff) — used sparingly for high-priority labels and data points
- Typography:     ALL-CAPS headings (heavy tracking, bold weight), mono-influenced body text
- Borders:        Subtle 1px borders on cards (#333), no heavy outlines, border-radius ~12-16px
- Shadows:        Minimal — relies on border/bg contrast rather than elevation
- Charts/Data:    Color-coded with neon green, orange, white dots and bars
- Icons:          Outlined style, subtle gray, placed in circular dark containers
- Layout:         Dense data layout, grid-based, cards with internal padding
- Overall feel:   Technical, data-driven, premium dark mode, "hacker meets designer"
```

**Key tokens this archetype exercises:**
- `colors.primary` (neon green), `colors.secondary` (neon orange)
- `colors.surface.base` vs `colors.background.base` (subtle elevation via color, not shadow)
- `borders.width` (thin 1px), `borders.radius` (medium-rounded ~12px)
- `typography.fontWeight` (heavy for headings), `typography.letterSpacing` (wide for caps)
- `effects.glow` (subtle neon glow on active elements)

---

### Archetype B — "Clean Logistics" (Image 2: Package tracking light theme)

```
VISUAL DNA:
- Background:     Off-white / warm gray (#f5f5f0 – #fafaf7), very slightly warm tint
- Surface cards:  Pure white (#ffffff) with soft 1px borders (#e5e5e0)
- Primary accent: Lime/chartreuse green (#a3e635 / #84cc16) — status badges, progress bars
- Secondary:      Lavender/muted purple (#d8b4fe) — "packed" status badge
- Text:           Near-black (#1a1a1a) for headings, medium gray (#6b7280) for secondary
- Typography:     Clean sans-serif, medium weight headings, normal body text
- Borders:        Crisp 1px borders (#e0e0db), dashed borders for selected items, radius ~8-12px
- Shadows:        Very subtle (0 1px 3px rgba(0,0,0,0.05)), clean elevation
- Interactive:    Pill-shaped buttons/tabs with bg fill for active state
- Icons:          Outlined, small, paired with text labels
- Layout:         Two-column (list + map), clean whitespace, breathing room
- Overall feel:   Professional, Scandinavian minimalism, "clean desk" aesthetic
```

**Key tokens this archetype exercises:**
- `colors.background.base` (warm off-white vs pure white)
- `colors.border.subtle` (very light, warm gray)
- `borders.radius` (medium — 8-12px, pill for buttons)
- `shadows` (extremely subtle, almost flat)
- `typography.fontWeight` (medium, not heavy)
- `effects.backdrop` (none — this is flat/opaque design)

---

### Archetype C — "Glassmorphic Wellness" (Image 3: Sense meditation app)

```
VISUAL DNA:
- Background:     Gradient mesh — soft pinks, lavenders, peach (#fce7f3, #e9d5ff, #fed7aa blended)
                   This is NOT a solid color; it's a multi-stop gradient or noise texture
- Surface cards:  Frosted glass — white at 40-60% opacity, heavy backdrop-blur (12-20px)
                   Borders: 1px solid rgba(255,255,255,0.3) — the "glass edge"
- Primary accent: Warm coral/orange (#f97316 – gradient to #ec4899)
- Text:           Dark gray (#374151) on glass, near-black (#111827) for headings
- Typography:     Rounded sans-serif (SF Pro Rounded, Nunito, etc.), light-to-medium weight
                   Headings use normal case, generous size hierarchy
- Borders:        Very soft — 1px rgba(255,255,255,0.2-0.4), radius ~16-24px (very rounded)
- Shadows:        Soft, colored shadows (e.g., 0 8px 32px rgba(0,0,0,0.08))
                   Some elements have subtle colored glow
- Images:         Soft, dreamy, watercolor-like images with rounded corners
- Interactive:    Translucent buttons, hover reveals more opacity
- Sidebar:        Glass panel with blurred background showing through
- Overall feel:   Calm, dreamy, iOS/macOS-inspired, "morning meditation" aesthetic
```

**Key tokens this archetype exercises:**
- `effects.backdrop.blur` (12-20px), `effects.backdrop.opacity` (0.4-0.6)
- `effects.backdrop.tint` (white or light color tint on glass)
- `colors.background.gradient` (multi-color gradient mesh)
- `borders.radius` (large — 16-24px)
- `borders.width` (1px), border COLOR (semi-transparent white)
- `colors.border.glass` (rgba white borders for glassmorphism)
- `shadows` (large, soft, low opacity, possibly colored)
- `typography.fontFamily.heading` (rounded sans-serif)
- NEW TOKEN NEEDED: `effects.noise` (subtle noise texture on glass)
- NEW TOKEN NEEDED: `colors.background.type` ('solid' | 'gradient' | 'mesh')

---

### Archetype D — "Corporate CRM" (Image 4: BizLink CRM dashboard)

```
VISUAL DNA:
- Background:     Pure white (#ffffff) — stark, no warmth
- Surface cards:  White (#ffffff) with definite 1px borders (#e5e7eb), some with left-side color accent
- Primary accent: Warm orange/amber (#f59e0b) — "Add customer" button, status highlights
- Text:           Pure black (#000000) for headings, gray (#6b7280) for secondary
- Typography:     Sharp, geometric sans-serif (Inter, etc.), high contrast between heading/body sizes
                   Clean number typography for stats
- Borders:        Precise 1px borders (#d1d5db), ZERO or very small radius (0-4px), grid lines visible
- Shadows:        None or extremely minimal — relies on borders for structure
- Cards:          Kanban-style cards with structured data layout, hover state shows selection
- Selected state: Warm amber/orange background fill on selected card
- Stats:          Large numbers, minimal decoration, sparkline charts
- Layout:         3-column with sidebar, dense information, structured grid
- Overall feel:   No-nonsense, business tool, "spreadsheet meets design system"
```

**Key tokens this archetype exercises:**
- `borders.radius` (none-to-tiny: 0-4px)
- `borders.width` (consistent 1px everywhere, maybe 2px for emphasis)
- `colors.border.base` (clearly visible, not subtle)
- `shadows` (none — flat design, border-driven hierarchy)
- `typography.fontWeight` (sharp contrast: light body, bold headlines)
- `typography.letterSpacing` (normal/tight — no wide tracking)
- `effects.backdrop` (none — fully opaque surfaces)

---

### Archetype Summary Matrix

| Property             | A: Neon Dashboard      | B: Clean Logistics    | C: Glassmorphic       | D: Corporate CRM      |
| -------------------- | ---------------------- | --------------------- | --------------------- | ---------------------- |
| **Mode**             | Dark                   | Light (warm)          | Light (gradient)      | Light (stark)          |
| **Background**       | Near-black #0a0a0a     | Warm off-white #f5f5f0| Gradient mesh         | Pure white #ffffff     |
| **Surface**          | Dark gray + border     | White + subtle border | Frosted glass + blur  | White + crisp border   |
| **Primary**          | Neon green #4ade80     | Lime green #a3e635    | Coral-orange gradient | Warm amber #f59e0b     |
| **Secondary**        | Neon orange #f97316    | Muted purple #d8b4fe  | Pink #ec4899          | Gray #6b7280           |
| **Border radius**    | 12-16px                | 8-12px (pill buttons) | 16-24px               | 0-4px                  |
| **Border width**     | 1px subtle             | 1px subtle            | 1px glass edge        | 1px precise            |
| **Border color**     | #333 (dark subtle)     | #e0e0db (warm gray)   | rgba(255,255,255,0.3) | #d1d5db (cool gray)    |
| **Shadows**          | None/glow              | Very subtle           | Soft + large + colored| None                   |
| **Typography**       | Caps, bold, mono hints | Clean sans, medium    | Rounded sans, light   | Sharp geometric, bold  |
| **Letter spacing**   | Wide (0.05-0.1em)      | Normal                | Normal                | Tight-to-normal        |
| **Surface effects**  | Subtle neon glow       | Flat/opaque           | Backdrop blur + noise | Flat/opaque            |
| **Overall density**  | Dense                  | Comfortable           | Airy                  | Dense                  |

---

## 3. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Your Next.js App                         │
│                                                                 │
│  ┌───────────────┐   ┌──────────────┐   ┌───────────────────┐  │
│  │  Components    │   │  Playground  │   │  Theme Switcher   │  │
│  │  (consume      │   │  UI          │   │  UI               │  │
│  │   semantic     │   │              │   │                   │  │
│  │   tokens)      │   └──────┬───────┘   └────────┬──────────┘  │
│  └───────┬───────┘          │                     │             │
│          │                  │                     │             │
│          ▼                  ▼                     ▼             │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              ThemeProvider (React Context)                │   │
│  │  - current ThemeSpec in state                            │   │
│  │  - setTheme(), randomTheme(), exportTheme()              │   │
│  │  - persists selection to localStorage / URL              │   │
│  └──────────────────────────┬──────────────────────────────┘   │
│                             │                                   │
│                             ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              CSS Variable Resolver                       │   │
│  │  ThemeSpec JSON  →  CSS custom properties on :root       │   │
│  │  (also generates Tailwind @theme overrides)              │   │
│  │  + dynamic <style> for glassmorphism, gradients, glow    │   │
│  └──────────────────────────┬──────────────────────────────┘   │
│                             │                                   │
│                             ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Theme Generation Engine                     │   │
│  │  - Color harmony algorithms (OKLCH color space)          │   │
│  │  - Contrast ratio validation (WCAG 2.1)                  │   │
│  │  - Visual Archetype system (not just "personality")      │   │
│  │  - Surface effect generators (glass, glow, flat, etc.)   │   │
│  │  - Random theme with constraints                         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Theme Spec (TypeScript types + Zod schema)  │   │
│  │  - The single source of truth for what a "theme" IS      │   │
│  │  - Includes surface effects, gradients, glassmorphism    │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Key Principle

**A theme is just a JSON object conforming to a TypeScript interface.** Everything else — UI, generation, persistence, export — is tooling around that data structure. The schema must be rich enough to express glassmorphism, neon glow, gradient backgrounds, and flat corporate styles from the same token set.

---

## 4. Phase 1 — Theme Specification & Token Schema

> **Goal:** Define the TypeScript types and Zod validation schema that describe every themeable property, including surface effects, glassmorphism, gradients, and glow.

### 4.1 Create the Token Interface

**File:** `src/lib/theme/schema/theme-spec.ts`

```ts
// ─── Color Tokens ───────────────────────────────────────────

export interface ColorScale {
  base: string;       // primary use
  hover: string;      // interactive hover state
  active: string;     // interactive active/pressed state
  foreground: string; // text on top of this color
}

export interface NeutralScale {
  base: string;
  subtle: string;     // slightly different from base
  muted: string;      // de-emphasized
}

export interface ThemeColors {
  background: NeutralScale & {
    // Support for gradient / mesh backgrounds (Archetype C)
    type: 'solid' | 'gradient' | 'mesh';
    gradient?: {
      // CSS gradient string, e.g., "linear-gradient(135deg, #fce7f3, #e9d5ff, #fed7aa)"
      value: string;
      // Fallback solid color for contexts that can't render gradients
      fallback: string;
    };
  };

  foreground: NeutralScale;

  primary: ColorScale;
  secondary: ColorScale;
  accent: ColorScale;

  // Semantic status colors
  destructive: { base: string; foreground: string };
  warning: { base: string; foreground: string };
  success: { base: string; foreground: string };
  info: { base: string; foreground: string };

  border: {
    base: string;
    subtle: string;
    strong: string;
    // For glassmorphism: semi-transparent borders (Archetype C)
    glass: string;   // e.g., "rgba(255, 255, 255, 0.2)"
  };

  ring: string; // focus ring color

  surface: {
    base: string;       // default card/container bg
    raised: string;     // elevated card
    overlay: string;    // modal/popover backdrop
    inset: string;      // sunken/inset areas (e.g., code blocks)
    // For glassmorphism: semi-transparent surface (Archetype C)
    glass: string;      // e.g., "rgba(255, 255, 255, 0.5)"
    glassHover: string; // hover state: slightly more opaque
  };

  // Chart / data visualization palette (Archetype A)
  chart: {
    series: string[];  // Array of 5-8 colors for data series
  };
}

// ─── Typography Tokens ──────────────────────────────────────

export interface ThemeTypography {
  fontFamily: {
    heading: string;     // e.g., "Inter", "SF Pro Rounded", "Space Grotesk"
    body: string;        // e.g., "Inter", "Nunito", "system-ui"
    mono: string;        // e.g., "JetBrains Mono", "Fira Code"
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
  };
  fontWeight: {
    light: number;       // 300
    normal: number;      // 400
    medium: number;      // 500
    semibold: number;    // 600
    bold: number;        // 700
    extrabold: number;   // 800
  };
  lineHeight: {
    none: string;        // 1
    tight: string;       // 1.25
    snug: string;        // 1.375
    normal: string;      // 1.5
    relaxed: string;     // 1.625
    loose: string;       // 2
  };
  letterSpacing: {
    tighter: string;     // -0.05em
    tight: string;       // -0.025em
    normal: string;      // 0em
    wide: string;        // 0.025em
    wider: string;       // 0.05em
    widest: string;      // 0.1em  (for all-caps headings, Archetype A)
  };

  // Heading style preferences (Archetype A uses ALL-CAPS, D uses sentence case)
  headingStyle: {
    textTransform: 'none' | 'uppercase' | 'capitalize';
    defaultWeight: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
    defaultTracking: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest';
  };
}

// ─── Spacing Tokens ─────────────────────────────────────────

export interface ThemeSpacing {
  // Scale multiplier: 1.0 = default, 0.8 = dense, 1.2 = airy
  density: number;
  values: {
    0: string;
    px: string;
    0.5: string;
    1: string;
    1.5: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    8: string;
    10: string;
    12: string;
    16: string;
    20: string;
    24: string;
  };
}

// ─── Border Tokens ──────────────────────────────────────────

export interface ThemeBorders {
  radius: {
    none: string;        // 0px
    sm: string;          // 2-4px
    md: string;          // 6-8px
    lg: string;          // 12-16px
    xl: string;          // 20-24px
    '2xl': string;       // 28-32px
    full: string;        // 9999px (pill)
  };
  width: {
    0: string;
    1: string;           // standard border
    2: string;           // emphasis border
    4: string;           // heavy border (Archetype: brutalist)
    8: string;           // ultra heavy
  };
  style: 'solid' | 'dashed' | 'dotted' | 'double' | 'none';
  // Default border opacity — useful for glass themes where borders are semi-transparent
  opacity: number;       // 0-1, default 1. Set <1 for glass borders.
}

// ─── Shadow Tokens ──────────────────────────────────────────

export interface ThemeShadows {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
  // Colored / glow shadows (Archetype A: neon glow, Archetype C: soft colored)
  glow: {
    primary: string;     // e.g., "0 0 20px rgba(74, 222, 128, 0.3)"
    secondary: string;
    accent: string;
  };
}

// ─── Surface Effect Tokens (NEW — critical for archetypes) ──

export interface ThemeSurfaceEffects {
  // Glassmorphism settings (Archetype C)
  backdrop: {
    blur: string;          // e.g., "12px", "20px", "0px" (disabled)
    saturate: string;      // e.g., "1.5", "1.8", "1" (disabled)
    brightness: string;    // e.g., "1.1", "1", "0.8"
  };

  // Surface material type — determines how cards/containers render
  material: 'opaque' | 'glass' | 'frosted' | 'translucent';

  // Noise/grain texture overlay (Archetype C: subtle grain on glass)
  noise: {
    enabled: boolean;
    opacity: number;       // 0-0.15 typically
    size: 'fine' | 'medium' | 'coarse';
  };

  // Glow effects (Archetype A: neon elements)
  glow: {
    enabled: boolean;
    intensity: 'subtle' | 'medium' | 'strong';
    // Applied to primary-colored elements on hover/active
    color: string;         // defaults to primary color with low alpha
    spread: string;        // e.g., "10px", "20px"
  };

  // Overlay color on surfaces (tint on glass surfaces)
  tint: {
    color: string;         // e.g., "rgba(255,255,255,0.5)" for light glass tint
    strength: number;      // 0-1
  };
}

// ─── Transition Tokens ──────────────────────────────────────

export interface ThemeTransitions {
  duration: {
    fastest: string;       // 75ms
    fast: string;          // 150ms
    normal: string;        // 200ms
    slow: string;          // 300ms
    slowest: string;       // 500ms
  };
  easing: {
    linear: string;
    easeIn: string;
    easeOut: string;
    easeInOut: string;
    spring: string;        // cubic-bezier for springy feel
  };
}

// ─── Layout Density Tokens ──────────────────────────────────

export interface ThemeLayout {
  // How tight or spacious the overall layout feels
  density: 'compact' | 'comfortable' | 'spacious';
  // Card internal padding scale
  cardPadding: string;     // e.g., "1rem", "1.5rem", "2rem"
  // Gap between grid/flex items
  gap: {
    sm: string;
    md: string;
    lg: string;
  };
  // Container max width
  containerMaxWidth: string;
}

// ─── Accessibility Metadata ─────────────────────────────────

export interface ThemeA11y {
  contrastMode: 'normal' | 'high' | 'highest';
  reducedMotion: boolean;
  colorBlindSafe: boolean;
  colorBlindType?: 'protanopia' | 'deuteranopia' | 'tritanopia';
}

// ─── Theme Metadata ─────────────────────────────────────────

export type VisualArchetype =
  | 'neon-dark'        // Archetype A: dark bg, neon accents, data-dense
  | 'clean-minimal'    // Archetype B: warm white, subtle, Scandinavian
  | 'glassmorphic'     // Archetype C: frosted glass, gradients, dreamy
  | 'corporate-sharp'  // Archetype D: pure white, precise borders, no-nonsense
  | 'brutalist'        // Raw, exposed structure, heavy borders, mono type
  | 'retro-warm'       // Vintage tones, serif type, paper-like textures
  | 'cyberpunk'        // High chroma neons, dark backgrounds, glitch aesthetics
  | 'pastel-soft'      // Muted pastels, rounded everything, gentle
  | 'monochrome'       // Single hue exploration, dramatic light/dark
  | 'editorial'        // Magazine-inspired, strong typography, minimal color
  | 'custom';          // User-defined, no archetype constraints

export interface ThemeMeta {
  id: string;
  name: string;
  description?: string;
  author?: string;
  version: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isDark: boolean;
  archetype: VisualArchetype;    // which archetype this theme belongs to
}

// ─── Full Theme Spec ────────────────────────────────────────

export interface ThemeSpec {
  meta: ThemeMeta;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  borders: ThemeBorders;
  shadows: ThemeShadows;
  effects: ThemeSurfaceEffects;   // NEW
  transitions: ThemeTransitions;
  layout: ThemeLayout;            // NEW
  a11y?: ThemeA11y;
}
```

### 4.2 Create the Zod Validation Schema

**File:** `src/lib/theme/schema/theme-schema.ts`

- Mirror every interface above as a Zod schema
- Use `z.object()` for each section
- Add color string validation — accept hex (#rrggbb, #rgb), HSL (hsl(...)), OKLCH (oklch(...)), and rgba (rgba(...))
- Validate gradient strings (must start with `linear-gradient`, `radial-gradient`, or `conic-gradient`)
- Validate blur values (must end with `px` or `rem`)
- Export a `parseTheme(input: unknown): ThemeSpec` function that validates + returns typed data
- Export a `validateTheme(input: unknown): { success: boolean; errors: string[] }` for the playground UI
- Export a `partialThemeSchema` for partial theme import/merge scenarios

### 4.3 Create Default Theme Presets

**File:** `src/lib/theme/presets/index.ts`

Create one preset for each of the four reference archetypes, plus a monochrome fallback:

| Preset Name        | Archetype        | Description                                                        |
| ------------------- | ---------------- | ------------------------------------------------------------------ |
| `neon-dashboard`    | `neon-dark`      | Image 1 — Dark bg, neon green + orange, dense, ALL-CAPS headings   |
| `clean-logistics`   | `clean-minimal`  | Image 2 — Warm off-white, lime green, subtle borders, airy         |
| `glass-wellness`    | `glassmorphic`   | Image 3 — Gradient mesh bg, frosted glass cards, rounded, dreamy   |
| `corporate-crm`     | `corporate-sharp`| Image 4 — Pure white, amber accent, sharp borders, flat            |
| `monochrome`        | `monochrome`     | Existing B&W ported to the new schema                              |

Each preset is a `ThemeSpec` object in its own file, re-exported from the index.

#### Preset: `neon-dashboard.ts` (Archetype A reference values)

```ts
const neonDashboard: ThemeSpec = {
  meta: {
    id: 'neon-dashboard',
    name: 'Neon Dashboard',
    archetype: 'neon-dark',
    isDark: true,
    tags: ['dark', 'neon', 'data', 'dense', 'technical'],
    version: '1.0.0',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  colors: {
    background: {
      base: '#0a0a0a', subtle: '#111111', muted: '#1a1a1a',
      type: 'solid',
    },
    foreground: { base: '#f5f5f5', subtle: '#a3a3a3', muted: '#737373' },
    primary: { base: '#4ade80', hover: '#22c55e', active: '#16a34a', foreground: '#052e16' },
    secondary: { base: '#fb923c', hover: '#f97316', active: '#ea580c', foreground: '#431407' },
    accent: { base: '#ffffff', hover: '#e5e5e5', active: '#d4d4d4', foreground: '#0a0a0a' },
    destructive: { base: '#ef4444', foreground: '#ffffff' },
    warning: { base: '#f59e0b', foreground: '#000000' },
    success: { base: '#4ade80', foreground: '#052e16' },
    info: { base: '#38bdf8', foreground: '#0c4a6e' },
    border: { base: '#333333', subtle: '#262626', strong: '#525252', glass: 'rgba(255,255,255,0.06)' },
    ring: '#4ade80',
    surface: {
      base: '#1a1a1a', raised: '#262626', overlay: 'rgba(0,0,0,0.8)',
      inset: '#0f0f0f', glass: 'rgba(255,255,255,0.03)', glassHover: 'rgba(255,255,255,0.06)',
    },
    chart: { series: ['#4ade80', '#fb923c', '#ffffff', '#38bdf8', '#a78bfa', '#f472b6', '#fbbf24'] },
  },
  typography: {
    fontFamily: { heading: '"Space Grotesk", sans-serif', body: '"Inter", sans-serif', mono: '"JetBrains Mono", monospace' },
    fontSize: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem', '5xl': '3rem' },
    fontWeight: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800 },
    lineHeight: { none: '1', tight: '1.25', snug: '1.375', normal: '1.5', relaxed: '1.625', loose: '2' },
    letterSpacing: { tighter: '-0.05em', tight: '-0.025em', normal: '0em', wide: '0.025em', wider: '0.05em', widest: '0.1em' },
    headingStyle: { textTransform: 'uppercase', defaultWeight: 'bold', defaultTracking: 'wider' },
  },
  spacing: {
    density: 0.9,
    values: { 0: '0', px: '1px', 0.5: '0.125rem', 1: '0.25rem', 1.5: '0.375rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem', 5: '1.25rem', 6: '1.5rem', 8: '2rem', 10: '2.5rem', 12: '3rem', 16: '4rem', 20: '5rem', 24: '6rem' },
  },
  borders: {
    radius: { none: '0px', sm: '4px', md: '8px', lg: '12px', xl: '16px', '2xl': '20px', full: '9999px' },
    width: { 0: '0px', 1: '1px', 2: '2px', 4: '4px', 8: '8px' },
    style: 'solid',
    opacity: 1,
  },
  shadows: {
    none: 'none', sm: '0 1px 2px rgba(0,0,0,0.3)', md: '0 4px 6px rgba(0,0,0,0.3)',
    lg: '0 10px 15px rgba(0,0,0,0.3)', xl: '0 20px 25px rgba(0,0,0,0.3)',
    '2xl': '0 25px 50px rgba(0,0,0,0.5)', inner: 'inset 0 2px 4px rgba(0,0,0,0.3)',
    glow: {
      primary: '0 0 20px rgba(74, 222, 128, 0.3)',
      secondary: '0 0 20px rgba(251, 146, 60, 0.3)',
      accent: '0 0 20px rgba(255, 255, 255, 0.1)',
    },
  },
  effects: {
    backdrop: { blur: '0px', saturate: '1', brightness: '1' },
    material: 'opaque',
    noise: { enabled: false, opacity: 0, size: 'fine' },
    glow: { enabled: true, intensity: 'medium', color: 'rgba(74, 222, 128, 0.15)', spread: '15px' },
    tint: { color: 'transparent', strength: 0 },
  },
  transitions: {
    duration: { fastest: '75ms', fast: '150ms', normal: '200ms', slow: '300ms', slowest: '500ms' },
    easing: { linear: 'linear', easeIn: 'cubic-bezier(0.4, 0, 1, 1)', easeOut: 'cubic-bezier(0, 0, 0.2, 1)', easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)', spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
  },
  layout: {
    density: 'compact',
    cardPadding: '1.25rem',
    gap: { sm: '0.5rem', md: '1rem', lg: '1.5rem' },
    containerMaxWidth: '1400px',
  },
};
```

#### Preset: `glass-wellness.ts` (Archetype C reference values)

```ts
const glassWellness: ThemeSpec = {
  meta: {
    id: 'glass-wellness',
    name: 'Glass Wellness',
    archetype: 'glassmorphic',
    isDark: false,
    tags: ['light', 'glass', 'gradient', 'calm', 'rounded', 'dreamy'],
    version: '1.0.0',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  colors: {
    background: {
      base: '#faf5ff',
      subtle: '#f3e8ff',
      muted: '#e9d5ff',
      type: 'mesh',
      gradient: {
        value: 'linear-gradient(135deg, #fce7f3 0%, #f3e8ff 30%, #e0e7ff 60%, #fed7aa 100%)',
        fallback: '#f5f0ff',
      },
    },
    foreground: { base: '#1f2937', subtle: '#4b5563', muted: '#9ca3af' },
    primary: { base: '#f97316', hover: '#ea580c', active: '#c2410c', foreground: '#ffffff' },
    secondary: { base: '#ec4899', hover: '#db2777', active: '#be185d', foreground: '#ffffff' },
    accent: { base: '#8b5cf6', hover: '#7c3aed', active: '#6d28d9', foreground: '#ffffff' },
    destructive: { base: '#ef4444', foreground: '#ffffff' },
    warning: { base: '#f59e0b', foreground: '#000000' },
    success: { base: '#10b981', foreground: '#ffffff' },
    info: { base: '#3b82f6', foreground: '#ffffff' },
    border: {
      base: 'rgba(0, 0, 0, 0.08)',
      subtle: 'rgba(0, 0, 0, 0.04)',
      strong: 'rgba(0, 0, 0, 0.15)',
      glass: 'rgba(255, 255, 255, 0.35)',
    },
    ring: '#f97316',
    surface: {
      base: 'rgba(255, 255, 255, 0.55)',
      raised: 'rgba(255, 255, 255, 0.7)',
      overlay: 'rgba(255, 255, 255, 0.85)',
      inset: 'rgba(255, 255, 255, 0.3)',
      glass: 'rgba(255, 255, 255, 0.45)',
      glassHover: 'rgba(255, 255, 255, 0.6)',
    },
    chart: { series: ['#f97316', '#ec4899', '#8b5cf6', '#10b981', '#3b82f6', '#f59e0b', '#06b6d4'] },
  },
  typography: {
    fontFamily: { heading: '"Nunito", "SF Pro Rounded", sans-serif', body: '"Nunito", sans-serif', mono: '"Fira Code", monospace' },
    fontSize: { xs: '0.75rem', sm: '0.875rem', base: '1rem', lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem', '3xl': '1.875rem', '4xl': '2.25rem', '5xl': '3rem' },
    fontWeight: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800 },
    lineHeight: { none: '1', tight: '1.25', snug: '1.375', normal: '1.5', relaxed: '1.625', loose: '2' },
    letterSpacing: { tighter: '-0.05em', tight: '-0.025em', normal: '0em', wide: '0.025em', wider: '0.05em', widest: '0.1em' },
    headingStyle: { textTransform: 'none', defaultWeight: 'semibold', defaultTracking: 'normal' },
  },
  spacing: {
    density: 1.15,
    values: { 0: '0', px: '1px', 0.5: '0.125rem', 1: '0.25rem', 1.5: '0.375rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem', 5: '1.25rem', 6: '1.5rem', 8: '2rem', 10: '2.5rem', 12: '3rem', 16: '4rem', 20: '5rem', 24: '6rem' },
  },
  borders: {
    radius: { none: '0px', sm: '8px', md: '16px', lg: '20px', xl: '24px', '2xl': '32px', full: '9999px' },
    width: { 0: '0px', 1: '1px', 2: '2px', 4: '4px', 8: '8px' },
    style: 'solid',
    opacity: 0.35,
  },
  shadows: {
    none: 'none',
    sm: '0 2px 8px rgba(0,0,0,0.04)',
    md: '0 4px 16px rgba(0,0,0,0.06)',
    lg: '0 8px 32px rgba(0,0,0,0.08)',
    xl: '0 16px 48px rgba(0,0,0,0.1)',
    '2xl': '0 24px 64px rgba(0,0,0,0.12)',
    inner: 'inset 0 2px 4px rgba(0,0,0,0.04)',
    glow: {
      primary: '0 0 30px rgba(249, 115, 22, 0.15)',
      secondary: '0 0 30px rgba(236, 72, 153, 0.15)',
      accent: '0 0 30px rgba(139, 92, 246, 0.15)',
    },
  },
  effects: {
    backdrop: { blur: '16px', saturate: '1.6', brightness: '1.05' },
    material: 'glass',
    noise: { enabled: true, opacity: 0.03, size: 'fine' },
    glow: { enabled: true, intensity: 'subtle', color: 'rgba(249, 115, 22, 0.1)', spread: '20px' },
    tint: { color: 'rgba(255, 255, 255, 0.5)', strength: 0.5 },
  },
  transitions: {
    duration: { fastest: '100ms', fast: '200ms', normal: '300ms', slow: '400ms', slowest: '600ms' },
    easing: { linear: 'linear', easeIn: 'cubic-bezier(0.4, 0, 1, 1)', easeOut: 'cubic-bezier(0, 0, 0.2, 1)', easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)', spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
  },
  layout: {
    density: 'spacious',
    cardPadding: '1.5rem',
    gap: { sm: '0.75rem', md: '1.25rem', lg: '2rem' },
    containerMaxWidth: '1200px',
  },
};
```

Create similar full presets for `clean-logistics` (Archetype B) and `corporate-crm` (Archetype D) following the visual DNA described in Section 2.

### 4.4 Tasks Checklist

- [ ] Create `theme-spec.ts` with all interfaces (including new `ThemeSurfaceEffects`, `ThemeLayout`, gradient bg, glass tokens)
- [ ] Create `theme-schema.ts` with Zod validation (validate rgba strings, gradient syntax, blur values)
- [ ] Create `parseTheme()` and `validateTheme()` utilities
- [ ] Build 5 preset themes: `neon-dashboard`, `clean-logistics`, `glass-wellness`, `corporate-crm`, `monochrome`
- [ ] Write unit tests: validate all presets against schema, reject invalid themes, test partial theme merging
- [ ] **Milestone:** All 5 presets pass validation, TypeScript is fully typed, each preset visually represents its reference image when manually applied

---

## 5. Phase 2 — CSS Variable Resolver & Tailwind Integration

> **Goal:** Convert a `ThemeSpec` JSON into CSS custom properties and wire them into Tailwind, including glassmorphism utility classes and gradient backgrounds.

### 5.1 The Resolver Function

**File:** `src/lib/theme/resolver/css-resolver.ts`

```ts
/**
 * Takes a ThemeSpec and returns a flat Map of CSS variable names to values.
 *
 * Standard tokens:
 *   --color-background-base    → #0a0a0a
 *   --color-primary-base       → #3b82f6
 *   --radius-md                → 0.5rem
 *   --shadow-lg                → 0 10px 15px -3px rgba(0,0,0,.1)
 *   --font-family-heading      → "Inter", sans-serif
 *   --transition-duration-fast → 150ms
 *
 * New effect tokens:
 *   --backdrop-blur            → 16px
 *   --backdrop-saturate        → 1.6
 *   --surface-glass            → rgba(255,255,255,0.45)
 *   --border-glass             → rgba(255,255,255,0.35)
 *   --glow-primary             → 0 0 20px rgba(74,222,128,0.3)
 *   --noise-opacity            → 0.03
 *   --bg-gradient              → linear-gradient(135deg, ...)
 */
export function resolveThemeToVariables(theme: ThemeSpec): Map<string, string>;

/**
 * Takes the variable map and serializes it into a CSS string.
 * Also generates utility classes for glassmorphism, glow, noise.
 */
export function serializeVariablesToCSS(
  variables: Map<string, string>,
  theme: ThemeSpec,
  selector?: string
): string;
```

### 5.2 Generated Utility Classes

The resolver should also output utility classes that components can use:

```css
/* Auto-generated by resolver based on theme.effects */

/* Glassmorphism surface class */
.surface-glass {
  background: var(--surface-glass);
  backdrop-filter: blur(var(--backdrop-blur)) saturate(var(--backdrop-saturate)) brightness(var(--backdrop-brightness));
  -webkit-backdrop-filter: blur(var(--backdrop-blur)) saturate(var(--backdrop-saturate));
  border: var(--border-width-1) var(--border-style) var(--border-glass);
}

.surface-glass:hover {
  background: var(--surface-glass-hover);
}

/* Noise texture overlay (pseudo-element) */
.surface-noise::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,...");  /* inline SVG noise */
  opacity: var(--noise-opacity);
  pointer-events: none;
  border-radius: inherit;
}

/* Glow effect on hover */
.glow-primary:hover {
  box-shadow: var(--glow-primary);
}

/* Gradient background (applied to body or main container) */
.bg-theme-gradient {
  background: var(--bg-gradient, var(--color-background-base));
}

/* Heading style utility */
.heading-style {
  text-transform: var(--heading-text-transform);
  font-weight: var(--heading-default-weight);
  letter-spacing: var(--heading-default-tracking);
  font-family: var(--font-family-heading);
}
```

### 5.3 Tailwind Configuration

**Tailwind v4 (CSS-first config):**

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* Colors — all semantic */
  --color-background: var(--color-background-base);
  --color-background-subtle: var(--color-background-subtle);
  --color-background-muted: var(--color-background-muted);
  --color-foreground: var(--color-foreground-base);
  --color-foreground-subtle: var(--color-foreground-subtle);
  --color-foreground-muted: var(--color-foreground-muted);
  --color-primary: var(--color-primary-base);
  --color-primary-hover: var(--color-primary-hover);
  --color-primary-foreground: var(--color-primary-foreground);
  --color-secondary: var(--color-secondary-base);
  --color-secondary-hover: var(--color-secondary-hover);
  --color-secondary-foreground: var(--color-secondary-foreground);
  --color-accent: var(--color-accent-base);
  --color-accent-hover: var(--color-accent-hover);
  --color-accent-foreground: var(--color-accent-foreground);
  --color-destructive: var(--color-destructive-base);
  --color-destructive-foreground: var(--color-destructive-foreground);
  --color-border: var(--color-border-base);
  --color-border-subtle: var(--color-border-subtle);
  --color-border-glass: var(--color-border-glass);
  --color-ring: var(--color-ring);
  --color-surface: var(--color-surface-base);
  --color-surface-raised: var(--color-surface-raised);
  --color-surface-overlay: var(--color-surface-overlay);
  --color-surface-inset: var(--color-surface-inset);
  --color-surface-glass: var(--color-surface-glass);

  /* Border radius */
  --radius-none: var(--radius-none);
  --radius-sm: var(--radius-sm);
  --radius-md: var(--radius-md);
  --radius-lg: var(--radius-lg);
  --radius-xl: var(--radius-xl);
  --radius-2xl: var(--radius-2xl);
  --radius-full: var(--radius-full);

  /* Shadows */
  --shadow-sm: var(--shadow-sm);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);

  /* Font families */
  --font-heading: var(--font-family-heading);
  --font-body: var(--font-family-body);
  --font-mono: var(--font-family-mono);
}
```

**Tailwind v3 (JS config):**

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        background: { DEFAULT: 'var(--color-background-base)', subtle: 'var(--color-background-subtle)', muted: 'var(--color-background-muted)' },
        foreground: { DEFAULT: 'var(--color-foreground-base)', subtle: 'var(--color-foreground-subtle)', muted: 'var(--color-foreground-muted)' },
        primary: { DEFAULT: 'var(--color-primary-base)', hover: 'var(--color-primary-hover)', foreground: 'var(--color-primary-foreground)' },
        secondary: { DEFAULT: 'var(--color-secondary-base)', hover: 'var(--color-secondary-hover)', foreground: 'var(--color-secondary-foreground)' },
        accent: { DEFAULT: 'var(--color-accent-base)', hover: 'var(--color-accent-hover)', foreground: 'var(--color-accent-foreground)' },
        destructive: { DEFAULT: 'var(--color-destructive-base)', foreground: 'var(--color-destructive-foreground)' },
        border: { DEFAULT: 'var(--color-border-base)', subtle: 'var(--color-border-subtle)', strong: 'var(--color-border-strong)', glass: 'var(--color-border-glass)' },
        surface: { DEFAULT: 'var(--color-surface-base)', raised: 'var(--color-surface-raised)', overlay: 'var(--color-surface-overlay)', inset: 'var(--color-surface-inset)', glass: 'var(--color-surface-glass)' },
        ring: 'var(--color-ring)',
      },
      borderRadius: {
        none: 'var(--radius-none)', sm: 'var(--radius-sm)', md: 'var(--radius-md)',
        lg: 'var(--radius-lg)', xl: 'var(--radius-xl)', '2xl': 'var(--radius-2xl)', full: 'var(--radius-full)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)', md: 'var(--shadow-md)', lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)', glow: 'var(--glow-primary)',
      },
      fontFamily: {
        heading: 'var(--font-family-heading)', body: 'var(--font-family-body)', mono: 'var(--font-family-mono)',
      },
      backdropBlur: { theme: 'var(--backdrop-blur)' },
    },
  },
};
```

### 5.4 Component Refactoring Guide

```diff
// CARD COMPONENT — works for ALL archetypes
- <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
+ <div className="bg-surface border border-border rounded-lg shadow-md p-[var(--card-padding)]">

// GLASS CARD — for glassmorphic archetypes
+ <div className="surface-glass rounded-xl shadow-lg p-[var(--card-padding)]">

// HEADING — adapts to ALL-CAPS (A), normal (B,C), sharp (D)
- <h2 className="text-2xl font-bold tracking-tight">
+ <h2 className="text-2xl heading-style">

// BUTTON — primary
- <button className="bg-blue-500 text-white rounded-md px-4 py-2">
+ <button className="bg-primary text-primary-foreground rounded-md px-4 py-2 hover:bg-primary-hover">

// DATA VISUALIZATION — neon glow on hover (Archetype A)
+ <div className="glow-primary transition-shadow">
```

### 5.5 Tasks Checklist

- [ ] Implement `resolveThemeToVariables()` — handle all token types (effects, layout, glass, gradient)
- [ ] Implement `serializeVariablesToCSS()` — include utility classes for glass, glow, noise, heading-style
- [ ] Generate inline SVG noise texture based on `theme.effects.noise`
- [ ] Handle gradient background: set `--bg-gradient` variable when `background.type !== 'solid'`
- [ ] Update Tailwind config to consume all CSS variables
- [ ] Update `globals.css` with the `@theme` mapping
- [ ] Audit every component — replace hardcoded colors/radii/shadows with semantic tokens
- [ ] Add `surface-glass`, `glow-primary`, `heading-style`, `bg-theme-gradient` utility classes
- [ ] Test: switch between all 5 presets manually to confirm everything works — especially glassmorphism and neon glow
- [ ] **Milestone:** All 5 reference themes visually working with zero component code changes between them

---

## 6. Phase 3 — Theme Provider (React Context)

> **Goal:** Runtime theme switching via React context, with persistence.

### 6.1 ThemeContext

**File:** `src/lib/theme/provider/theme-context.tsx`

```ts
interface ThemeContextValue {
  // State
  currentTheme: ThemeSpec;
  availableThemes: ThemeMeta[];
  isLoading: boolean;

  // Actions
  setTheme: (themeId: string) => void;
  setCustomTheme: (theme: ThemeSpec) => void;
  resetToDefault: () => void;

  // Utils
  getThemeById: (id: string) => ThemeSpec | undefined;
  isDark: boolean;
  archetype: VisualArchetype;

  // Surface effect helpers
  isGlass: boolean;      // shorthand for effects.material === 'glass'
  hasGradientBg: boolean; // shorthand for colors.background.type !== 'solid'
}
```

### 6.2 ThemeProvider Component

**File:** `src/lib/theme/provider/theme-provider.tsx`

Responsibilities:
1. Load saved theme ID from localStorage on mount
2. Resolve the ThemeSpec from presets or custom storage
3. Call `serializeVariablesToCSS()` and inject via `<style>` tag (includes utilities)
4. Update `<html>` element: `data-theme` attribute, `data-archetype` attribute, `class` (dark: support)
5. Conditionally apply gradient background to `<body>` when `background.type !== 'solid'`
6. Load Google Fonts dynamically if the theme uses non-system fonts
7. Expose context value
8. On theme change: update CSS, persist to localStorage, optionally update URL param

```tsx
// Usage in layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="neon-dashboard" storageKey="portfolio-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 6.3 Dynamic Font Loading

**File:** `src/lib/theme/provider/font-loader.ts`

When a theme uses a custom Google Font (e.g., "Space Grotesk", "Nunito"), dynamically load it:

```ts
export async function loadThemeFonts(theme: ThemeSpec): Promise<void> {
  const families = [
    theme.typography.fontFamily.heading,
    theme.typography.fontFamily.body,
    theme.typography.fontFamily.mono,
  ];
  // Parse font names, check if already loaded, inject <link> to Google Fonts if needed
  // Use document.fonts.check() to avoid redundant loads
}
```

### 6.4 useTheme Hook

**File:** `src/lib/theme/provider/use-theme.ts`

```ts
export function useTheme(): ThemeContextValue;
```

### 6.5 SSR / Hydration Considerations (Next.js specific)

- Use a `<script>` tag in `<head>` (via `next/script` with `beforeInteractive` strategy) that reads localStorage and sets CSS variables BEFORE React hydrates — prevents flash of wrong theme (FOWT)
- For gradient backgrounds: set the gradient CSS on `<body>` in the inline script too
- Store just the theme ID in localStorage, not the full spec
- Use `suppressHydrationWarning` on `<html>`

### 6.6 Tasks Checklist

- [ ] Create ThemeContext and ThemeProvider (with archetype/glass/gradient helpers)
- [ ] Create useTheme hook
- [ ] Implement dynamic font loading for custom Google Fonts
- [ ] Add the anti-flash `<script>` for SSR (including gradient bg)
- [ ] Integrate into `layout.tsx`
- [ ] Build a basic theme switcher dropdown to test all 5 presets
- [ ] Verify: switch between neon-dashboard → glass-wellness → corporate-crm, theme persists; no flash
- [ ] Verify: glassmorphism renders correctly (backdrop-filter, semi-transparent surfaces)
- [ ] Verify: gradient mesh background renders on glass-wellness theme
- [ ] **Milestone:** Runtime switching between all 5 drastically different themes works seamlessly

---

## 7. Phase 4 — Theme Generation Engine & Visual Archetypes

> **Goal:** Algorithmically generate valid, aesthetically pleasing themes across ALL visual archetypes.

### 7.1 Color Space Utilities

**File:** `src/lib/theme/engine/color-utils.ts`

Work in **OKLCH** color space. Implement or use `culori`:

```ts
function hexToOklch(hex: string): { l: number; c: number; h: number };
function oklchToHex(l: number, c: number, h: number): string;
function hexToRgba(hex: string, alpha: number): string;
function adjustLightness(color: string, amount: number): string;
function adjustChroma(color: string, amount: number): string;
function rotateHue(color: string, degrees: number): string;
function setAlpha(color: string, alpha: number): string;
function getContrastRatio(foreground: string, background: string): number;
function meetsWCAG_AA(fg: string, bg: string): boolean;
function meetsWCAG_AAA(fg: string, bg: string): boolean;
function generateHarmony(baseHue: number, type: HarmonyType): number[];
function generateGradientMesh(hues: number[], lightness: number, chroma: number): string;
```

### 7.2 Visual Archetype Configuration System

**File:** `src/lib/theme/engine/archetypes.ts`

Each archetype defines a complete set of constraints for the generator:

```ts
export interface ArchetypeConfig {
  id: VisualArchetype;
  name: string;
  description: string;

  color: {
    isDark: boolean | 'either';
    backgroundLightness: [number, number]; // OKLCH L range
    foregroundLightness: [number, number];
    surfaceOffset: number;
    chromaRange: [number, number];
    harmony: HarmonyType[];
    accentCount: number;
  };

  borders: {
    radiusScale: 'none' | 'minimal' | 'small' | 'medium' | 'large' | 'pill';
    widthPreference: 'none' | 'hairline' | 'thin' | 'medium' | 'thick';
    style: 'solid' | 'dashed' | 'double' | 'none';
    opacity: number;
  };

  shadows: {
    style: 'none' | 'subtle' | 'soft' | 'medium' | 'dramatic' | 'hard-offset';
    colored: boolean;
    glow: boolean;
    glowIntensity: 'subtle' | 'medium' | 'strong';
  };

  effects: {
    material: 'opaque' | 'glass' | 'frosted' | 'translucent';
    blur: [number, number];
    noise: boolean;
    noiseOpacity: [number, number];
    glowEnabled: boolean;
    tintStrength: [number, number];
  };

  typography: {
    headingTextTransform: 'none' | 'uppercase' | 'capitalize';
    headingWeight: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
    headingTracking: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest';
    bodyWeight: 'light' | 'normal' | 'medium';
    fontMood: 'geometric' | 'humanist' | 'rounded' | 'mono' | 'serif' | 'system';
  };

  layout: {
    density: 'compact' | 'comfortable' | 'spacious';
    spacingMultiplier: number;
  };

  background: {
    type: 'solid' | 'gradient' | 'mesh';
    gradientAngle?: number;
    gradientStops?: number;
  };
}
```

#### All 11 Archetype Configs:

| Archetype          | Dark?  | Chroma     | Radius    | Shadows      | Effects        | Typography          | Density   |
| ------------------ | ------ | ---------- | --------- | ------------ | -------------- | ------------------- | --------- |
| `neon-dark`        | Yes    | High vivid | Medium    | None/glow    | Glow           | CAPS, bold, wide    | Compact   |
| `clean-minimal`    | No     | Moderate   | Small     | Subtle       | Opaque         | Normal, medium      | Comfortable|
| `glassmorphic`     | Either | Moderate   | Large     | Soft+colored | Glass+blur+noise| Rounded, semibold  | Spacious  |
| `corporate-sharp`  | No     | Moderate   | None      | None         | Opaque         | Sharp, bold, tight  | Compact   |
| `brutalist`        | Either | Near-zero  | None      | Hard-offset  | Opaque         | CAPS, extrabold, mono| Compact  |
| `retro-warm`       | No     | Low-muted  | Minimal   | Subtle       | Noise (paper)  | Normal, serif       | Comfortable|
| `cyberpunk`        | Yes    | MAX vivid  | Minimal   | None/glow    | Glow (strong)  | CAPS, extrabold, mono| Compact  |
| `pastel-soft`      | No     | Low pastel | Large     | Soft+colored | Opaque         | Normal, rounded     | Spacious  |
| `monochrome`       | Either | Near-zero  | Small     | Medium       | Opaque         | Bold, geometric     | Comfortable|
| `editorial`        | No     | Near-zero  | None      | None         | Opaque         | Extrabold, serif    | Spacious  |
| `custom`           | Either | Full range | Any       | Any          | Any            | Any                 | Any       |

Full config objects for each archetype should be defined in `archetypes.ts` following the patterns shown in the `ArchetypeConfig` interface above. Key implementation details for each:

**`neon-dark`:** backgroundLightness [0.05, 0.12], chromaRange [0.15, 0.30], glow enabled, uppercase headings, geometric font mood, harmony preference for complementary/triadic.

**`clean-minimal`:** backgroundLightness [0.95, 0.98], chromaRange [0.08, 0.18], no glow, opaque material, humanist font mood, analogous harmony.

**`glassmorphic`:** backgroundLightness [0.85, 0.96], glass material, blur [12, 24], noise enabled (opacity 0.02-0.06), tintStrength [0.3, 0.6], rounded font mood, gradient mesh background with 4 stops.

**`corporate-sharp`:** backgroundLightness [0.98, 1.0], none radius, no shadows, opaque material, geometric font mood, tight heading tracking.

**`brutalist`:** chromaRange [0.0, 0.05], none radius, thick borders (2-4px), hard-offset shadows, mono font mood, uppercase extrabold headings.

**`retro-warm`:** chromaRange [0.05, 0.12], minimal radius, noise enabled (paper grain 0.03-0.08), serif font mood, analogous harmony with warm hues.

**`cyberpunk`:** backgroundLightness [0.02, 0.08], chromaRange [0.25, 0.37] (maximum neons), strong glow, mono font mood, widest heading tracking.

**`pastel-soft`:** chromaRange [0.04, 0.10], large radius, no borders, soft colored shadows, rounded font mood, spacious layout.

**`monochrome`:** chromaRange [0.0, 0.03], small radius, medium shadows, geometric font mood.

**`editorial`:** chromaRange [0.0, 0.08], none radius, no shadows, serif font mood, extrabold headings with tight tracking, spacious layout.

### 7.3 Font Mood → Font Family Resolver

**File:** `src/lib/theme/engine/font-resolver.ts`

```ts
const FONT_FAMILIES: Record<string, { heading: string; body: string; mono: string }> = {
  geometric:  { heading: '"Inter", "SF Pro Display", system-ui', body: '"Inter", system-ui', mono: '"JetBrains Mono", monospace' },
  humanist:   { heading: '"Source Sans 3", system-ui', body: '"Source Sans 3", system-ui', mono: '"Source Code Pro", monospace' },
  rounded:    { heading: '"Nunito", "SF Pro Rounded", system-ui', body: '"Nunito", system-ui', mono: '"Fira Code", monospace' },
  mono:       { heading: '"Space Mono", "JetBrains Mono", monospace', body: '"JetBrains Mono", monospace', mono: '"JetBrains Mono", monospace' },
  serif:      { heading: '"Playfair Display", "Georgia", serif', body: '"Lora", "Georgia", serif', mono: '"Courier Prime", monospace' },
  system:     { heading: 'system-ui, sans-serif', body: 'system-ui, sans-serif', mono: 'ui-monospace, monospace' },
};
```

### 7.4 Theme Generator

**File:** `src/lib/theme/engine/theme-generator.ts`

```ts
interface GeneratorOptions {
  archetype?: VisualArchetype;     // defaults to random
  baseHue?: number;                // 0-360
  harmony?: HarmonyType;           // overrides archetype default
  isDark?: boolean;                // overrides archetype default
  saturation?: 'muted' | 'normal' | 'vivid';
  contrastMode?: 'normal' | 'high' | 'highest';
  colorBlindSafe?: boolean;
  seed?: string;
}

export function generateTheme(options?: GeneratorOptions): ThemeSpec;
```

**Generation algorithm:**

1. Select archetype → load config from `ARCHETYPE_CONFIGS`
2. Pick base hue → generate harmony hues
3. Assign color roles (primary, secondary, accent)
4. Generate background (solid, gradient, or mesh depending on archetype)
5. Generate surfaces (opaque or glass rgba values)
6. Generate border colors (solid or glass rgba)
7. Generate interactive states (hover, active lightness shifts)
8. Generate shadows based on archetype style (none/subtle/soft/hard-offset/glow)
9. Resolve typography from font mood + archetype constraints
10. Generate border radius from archetype's radiusScale
11. Set up effects (backdrop blur, noise, glow)
12. Validate all contrast pairs (including glass surface compositing)
13. Auto-fix any failing contrast
14. Generate metadata (name, tags, isDark, archetype)

### 7.5 Border Radius Scale Resolver

```ts
const RADIUS_SCALES: Record<string, ThemeBorders['radius']> = {
  none:    { none: '0px', sm: '0px', md: '0px', lg: '2px', xl: '2px', '2xl': '4px', full: '9999px' },
  minimal: { none: '0px', sm: '2px', md: '4px', lg: '4px', xl: '6px', '2xl': '8px', full: '9999px' },
  small:   { none: '0px', sm: '4px', md: '6px', lg: '8px', xl: '12px', '2xl': '16px', full: '9999px' },
  medium:  { none: '0px', sm: '4px', md: '8px', lg: '12px', xl: '16px', '2xl': '20px', full: '9999px' },
  large:   { none: '0px', sm: '8px', md: '16px', lg: '20px', xl: '24px', '2xl': '32px', full: '9999px' },
  pill:    { none: '0px', sm: '12px', md: '20px', lg: '28px', xl: '36px', '2xl': '44px', full: '9999px' },
};
```

### 7.6 Contrast Auto-Fixer (Glass-Aware)

**File:** `src/lib/theme/engine/contrast-fixer.ts`

```ts
/**
 * Validates contrast for BOTH opaque and glass surfaces.
 * For glass, composites rgba surface over background to get effective color.
 */
export function fixContrast(
  theme: ThemeSpec,
  level: 'AA' | 'AAA'
): { theme: ThemeSpec; fixes: ContrastFix[] };

/**
 * Composites a semi-transparent color over a background.
 */
export function compositeColor(foreground: string, background: string): string;
```

### 7.7 Tasks Checklist

- [ ] Install `culori`
- [ ] Implement color utilities (hex ↔ oklch ↔ rgba, compositing)
- [ ] Implement WCAG contrast with glass compositing
- [ ] Implement harmony generation (all 5 types)
- [ ] Implement gradient mesh generation
- [ ] Define all 11 archetype configs
- [ ] Implement font mood → font family resolver
- [ ] Implement radius scale resolver
- [ ] Implement shadow style generator (none, subtle, soft, hard-offset, glow)
- [ ] Implement `generateTheme()` with archetype-aware generation
- [ ] Implement `fixContrast()` with glass compositing
- [ ] Implement colorblind simulation
- [ ] Write tests: every archetype generates valid, visually distinct themes
- [ ] **Milestone:** `generateTheme({ archetype: 'glassmorphic' })` → frosted glass; `generateTheme({ archetype: 'neon-dark' })` → dark neon; etc.

---

## 8. Phase 5 — Playground UI

> **Goal:** Interactive page to select archetypes, generate, tweak, preview, and save themes.

### 8.1 Components to Build

```
PlaygroundPage
├── ArchetypePicker              (visual cards for each archetype with thumbnail)
│
├── ThemeGeneratorPanel
│   ├── ArchetypeSelector        (dropdown or visual grid)
│   ├── HarmonySelector          (complementary, analogous, etc.)
│   ├── BaseHueSlider            (0-360 with color wheel)
│   ├── DarkModeToggle
│   ├── SaturationSelector       (muted / normal / vivid)
│   ├── ContrastModeSelector     (normal / high / highest)
│   ├── RandomizeButton          (fully random)
│   ├── RandomWithinArchetype    (random, same archetype)
│   └── GenerateButton
│
├── ThemeEditorPanel
│   ├── ColorTokenEditor         (color pickers per semantic token)
│   ├── TypographyEditor         (font family, weight, tracking)
│   ├── HeadingStyleEditor       (text-transform, weight, tracking)
│   ├── BorderEditor             (radius, width, style, opacity)
│   ├── ShadowEditor             (previewers, glow toggle)
│   ├── SurfaceEffectsEditor     (backdrop blur, noise, glow, material)
│   ├── BackgroundEditor         (solid/gradient/mesh, gradient config)
│   ├── LayoutDensityEditor      (compact/comfortable/spacious)
│   └── SpacingEditor            (density multiplier)
│
├── PreviewPanel
│   ├── ComponentShowcase        (buttons, cards, inputs, badges, nav)
│   │   ├── GlassCardPreview     (if material === 'glass')
│   │   ├── GlowButtonPreview   (if glow enabled)
│   │   ├── DataVizPreview      (chart with theme colors)
│   │   └── FormPreview
│   ├── TypographyShowcase      (heading hierarchy with headingStyle)
│   ├── ColorPaletteDisplay     (all colors + contrast ratios)
│   └── AccessibilityReport     (WCAG pass/fail, colorblind preview)
│
├── ThemeCodePanel
│   ├── JSONView                (raw ThemeSpec, copyable)
│   ├── CSSVariablesView        (generated CSS, copyable)
│   └── TailwindConfigView      (Tailwind extend block, copyable)
│
└── ActionBar
    ├── SaveThemeButton
    ├── ExportButton            (download JSON / CSS)
    ├── ImportButton            (upload JSON)
    ├── ShareButton             (copy URL with encoded theme)
    └── ApplyToSiteButton
```

### 8.2 Live Preview Architecture

Scoped preview that doesn't affect the main site:

```tsx
<div
  style={getInlineStylesFromTheme(playgroundTheme)}
  className="preview-container"
  data-archetype={playgroundTheme.meta.archetype}
>
  {playgroundTheme.colors.background.type !== 'solid' && (
    <div className="absolute inset-0 bg-theme-gradient -z-10" />
  )}
  <ComponentShowcase />
</div>
```

### 8.3 URL State

```
/playground?archetype=glassmorphic&hue=280&harmony=analogous&dark=false
```

### 8.4 Tasks Checklist

- [ ] Create playground route
- [ ] Build ArchetypePicker with visual cards
- [ ] Build all editor panels (including surface effects, background, heading style)
- [ ] Build preview with glass card, glow button, data viz
- [ ] Build code panel with copy-to-clipboard
- [ ] Implement scoped preview
- [ ] Implement URL state
- [ ] Add accessibility report
- [ ] **Milestone:** Full playground loop — pick archetype → generate → tweak → preview → save/export

---

## 9. Phase 6 — Import / Export / Sharing

> **Goal:** Themes can be moved in and out of the system in multiple formats.

### 9.1 Export/Import

**File:** `src/lib/theme/io/exporters.ts` and `importers.ts`

```ts
// Exporters
export function exportAsJSON(theme: ThemeSpec): string;
export function exportAsCSS(theme: ThemeSpec): string;
export function exportAsTailwindCSS(theme: ThemeSpec): string;
export function exportAsTailwindConfig(theme: ThemeSpec): string;
export function exportAsShadcnCSS(theme: ThemeSpec): string;

// Importers
export function importFromJSON(json: string): ThemeSpec;
export function importFromCSS(css: string): Partial<ThemeSpec>;
export function importFromVSCodeTheme(json: string): Partial<ThemeSpec>;
```

### 9.2 URL Sharing

**File:** `src/lib/theme/io/url-codec.ts`

```ts
export function encodeThemeToURL(theme: ThemeSpec): string;
export function decodeThemeFromURL(url: string): ThemeSpec;
export function encodeThemeDiffToURL(theme: ThemeSpec, base: ThemeSpec): string;
export function decodeThemeDiffFromURL(url: string, base: ThemeSpec): ThemeSpec;
```

Use `lz-string` for compression.

### 9.3 Tasks Checklist

- [ ] Implement all exporters (including glass utilities, gradients, glow in CSS export)
- [ ] Implement all importers
- [ ] Implement URL codec with `lz-string`
- [ ] Test round-trip: export → import → identical theme (including effects and gradients)
- [ ] **Milestone:** Themes can be exported, shared, and re-imported without loss

---

## 10. Phase 7 — Accessibility & Contrast Modes

> **Goal:** First-class accessibility across ALL archetypes.

### 10.1 Key Requirements

- **High contrast mode:** override subtle/muted variants, increase border contrast, ensure AAA (7:1)
- **Reduced motion:** set all durations to 0ms, respect `prefers-reduced-motion`
- **Colorblind safety:** avoid red/green combos, use brightness differences
- **Glass accessibility:** increase tint/opacity on glass surfaces for high contrast; provide `prefers-contrast: more` fallback that disables glass
- **Contrast audit component:** matrix of all fg/bg pairs, with glass-composited values

### 10.2 Tasks Checklist

- [ ] Implement high contrast adjustments (including glass surface opacity increase)
- [ ] Implement reduced motion
- [ ] Implement colorblind-safe constraints
- [ ] Implement `prefers-contrast: more` fallback for glass
- [ ] Build ContrastAuditMatrix (with glass compositing)
- [ ] **Milestone:** WCAG 2.1 AA compliant across ALL archetypes

---

## 11. Phase 8 — Library Extraction

### 11.1 Package Split

```
packages/
├── theme-spec/          → @yourname/theme-spec
│   ├── types            (ThemeSpec, VisualArchetype)
│   ├── schema           (Zod validation)
│   ├── resolver         (ThemeSpec → CSS variables + utilities)
│   └── presets          (built-in themes)
│
├── theme-engine/        → @yourname/theme-engine
│   ├── color-utils      (OKLCH, contrast, compositing)
│   ├── generator        (generateTheme())
│   ├── archetypes       (all 11 configs)
│   ├── contrast-fixer   (glass-aware)
│   ├── font-resolver    (mood → stacks)
│   └── radius-resolver  (scale → values)
│
└── theme-react/         → @yourname/theme-react
    ├── provider         (ThemeProvider, useTheme, font loader)
    ├── playground       (ready-made components)
    └── components       (ThemeSwitcher, ArchetypePicker, ContrastAudit)
```

### 11.2 Tasks Checklist

- [ ] Set up Turborepo
- [ ] Extract all 3 packages
- [ ] Write READMEs with archetype visual examples
- [ ] Set up Changesets
- [ ] **Milestone:** Portfolio consumes packages as dependencies

---

## 12. Folder Structure

```
src/
├── app/
│   ├── layout.tsx                     # wraps with ThemeProvider
│   ├── page.tsx                       # portfolio home
│   ├── playground/
│   │   └── page.tsx                   # theme playground
│   └── globals.css                    # @theme mapping + utility classes
│
├── components/
│   ├── ui/                            # existing UI components
│   └── theme/
│       ├── theme-switcher.tsx
│       ├── archetype-picker.tsx       # visual archetype grid
│       ├── theme-generator-panel.tsx
│       ├── theme-editor-panel.tsx
│       ├── surface-effects-editor.tsx # blur, noise, glow, material
│       ├── background-editor.tsx      # solid/gradient/mesh
│       ├── heading-style-editor.tsx
│       ├── preview-panel.tsx
│       ├── component-showcase.tsx     # glass card, glow button, data viz
│       ├── color-palette-display.tsx
│       ├── contrast-audit-matrix.tsx  # with glass compositing
│       ├── theme-code-panel.tsx
│       └── colorblind-preview.tsx
│
├── lib/
│   └── theme/
│       ├── schema/
│       │   ├── theme-spec.ts          # all interfaces + effects + layout + glass
│       │   └── theme-schema.ts        # Zod (rgba, gradient, blur validation)
│       │
│       ├── resolver/
│       │   ├── css-resolver.ts        # ThemeSpec → CSS vars + glass/glow utilities
│       │   ├── tailwind-mapper.ts
│       │   └── heading-utility.ts
│       │
│       ├── provider/
│       │   ├── theme-context.tsx       # with isGlass, hasGradientBg
│       │   ├── theme-provider.tsx      # font loading, gradient bg, effects
│       │   ├── use-theme.ts
│       │   ├── anti-flash-script.ts
│       │   └── font-loader.ts
│       │
│       ├── engine/
│       │   ├── color-utils.ts         # OKLCH, compositing
│       │   ├── archetypes.ts          # all 11 archetype configs
│       │   ├── theme-generator.ts     # archetype-aware generation
│       │   ├── contrast-fixer.ts      # glass-aware WCAG
│       │   ├── colorblind-sim.ts
│       │   ├── font-resolver.ts       # mood → font stacks
│       │   ├── radius-resolver.ts     # scale → values
│       │   └── gradient-generator.ts  # mesh / linear generation
│       │
│       ├── io/
│       │   ├── exporters.ts           # JSON/CSS/Tailwind (with effects)
│       │   ├── importers.ts           # JSON/CSS/VS Code
│       │   └── url-codec.ts
│       │
│       └── presets/
│           ├── index.ts
│           ├── neon-dashboard.ts      # Archetype A
│           ├── clean-logistics.ts     # Archetype B
│           ├── glass-wellness.ts      # Archetype C
│           ├── corporate-crm.ts       # Archetype D
│           └── monochrome.ts
│
└── types/
    └── theme.d.ts
```

---

## 13. Existing Tools & References

### Libraries

| Library            | Purpose                                      | Install              |
| ------------------ | -------------------------------------------- | -------------------- |
| `culori`           | OKLCH color math, manipulation, compositing   | `npm i culori`       |
| `zod`              | Runtime validation                           | `npm i zod`          |
| `lz-string`        | URL theme compression                        | `npm i lz-string`    |
| `nuqs`             | URL search param state (Next.js)             | `npm i nuqs`         |
| `nanoid`           | Unique theme IDs                             | `npm i nanoid`       |
| `seedrandom`       | Seeded RNG for reproducible generation       | `npm i seedrandom`   |

### References

- **shadcn/ui theming:** HSL CSS variable patterns
- **Radix Colors:** Accessible color scale generation
- **Material Design 3 (Material You):** Dynamic color from seed
- **Apple HIG (visionOS):** Glass materials, vibrancy, backdrop blur
- **Open Props:** CSS custom property baseline
- **WCAG 2.1:** AA (4.5:1), AAA (7:1)
- **APCA:** Next-gen contrast for WCAG 3.0

### Color Theory

| Harmony              | Offsets          | Best for Archetypes              |
| -------------------- | ---------------- | -------------------------------- |
| Complementary        | +180°            | Neon, Cyberpunk, Corporate       |
| Analogous            | ±30°             | Glass, Clean, Pastel, Retro      |
| Triadic              | +120°, +240°     | Glass, Neon, Cyberpunk           |
| Split-complementary  | +150°, +210°     | Clean, Neon                      |
| Tetradic             | +90°,+180°,+270° | Cyberpunk                        |

---

## 14. Cursor-Specific Workflow Tips

### Suggested Prompts

**Phase 1:**
> "Create `src/lib/theme/schema/theme-spec.ts` with full ThemeSpec interfaces — including ThemeSurfaceEffects (glassmorphism), ThemeLayout, gradient backgrounds, glass borders/surfaces, chart colors, heading style, and VisualArchetype type. Then create `theme-schema.ts` with Zod schemas validating rgba, gradients, blur values. Finally create 5 presets (neon-dashboard, clean-logistics, glass-wellness, corporate-crm, monochrome) matching the visual archetypes in the plan."

**Phase 2:**
> "Create `src/lib/theme/resolver/css-resolver.ts` generating CSS vars AND utility classes for glassmorphism (.surface-glass with backdrop-filter), neon glow (.glow-primary), noise (.surface-noise), gradient bg (.bg-theme-gradient), heading style (.heading-style). Update Tailwind config + globals.css."

**Phase 3:**
> "Create ThemeProvider + useTheme. Inject CSS vars + utilities, persist to localStorage, prevent SSR flash, dynamically load Google Fonts, apply gradient background, expose isGlass/hasGradientBg helpers."

**Phase 4:**
> "Define all 11 archetype configs. Implement generateTheme() taking an archetype and producing a complete ThemeSpec — gradient mesh for glassmorphic, neon glow for cyberpunk, hard-offset shadows for brutalist, correct font mood. Include glass-aware WCAG contrast validation."

### Testing

```
"Write vitest tests covering:
 - All 11 archetypes generate valid themes (Zod + WCAG AA)
 - Glass themes have blur > 0, material === 'glass'
 - Neon themes have glow enabled, isDark === true
 - Corporate themes have radius ≈ 0, no shadows
 - Brutalist themes have thick borders, mono fonts
 - Round-trip: generate → export → import → identical"
```

---

## Summary: Execution Order

| Phase | What                                    | Depends On | Est. Effort |
| ----- | --------------------------------------- | ---------- | ----------- |
| 1     | Theme Spec + Zod + 5 Presets            | —          | 2-3 days    |
| 2     | CSS Resolver + Tailwind + Glass/Glow    | Phase 1    | 2-3 days    |
| 3     | ThemeProvider + Font Loading             | Phase 2    | 1-2 days    |
| 4     | Generation Engine + 11 Archetypes       | Phase 1    | 3-4 days    |
| 5     | Playground UI + Archetype Picker        | Phase 3, 4 | 4-6 days    |
| 6     | Import / Export / Sharing               | Phase 1    | 1-2 days    |
| 7     | Accessibility (incl. glass a11y)        | Phase 4    | 2-3 days    |
| 8     | Library extraction                      | All        | 2-3 days    |

**Total estimate: ~3-4 weeks.** The archetype system and glassmorphism add complexity, but they're what make this genuinely useful vs. just another color switcher.

Start with Phase 1. The schema is the foundation — pay special attention to `ThemeSurfaceEffects` and `ThemeColors.background.gradient` since those enable the most dramatic visual variations.
