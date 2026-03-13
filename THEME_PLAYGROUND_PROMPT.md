# Theme Playground — Cursor Implementation Prompt

> Copy this entire prompt into Cursor's composer. It references the THEME_SYSTEM_PLAN.md architecture doc. Make sure Phases 1-4 (schema, resolver, provider, engine) are implemented before building this playground.

---

## PROMPT START

You are building a **Theme Playground** page for a Next.js + Tailwind CSS portfolio site. This is a feature-rich, interactive visual theme editor — similar in spirit to [tweakcn.com/editor/theme](https://tweakcn.com/editor/theme) and [daisyui.com/theme-generator](https://daisyui.com/theme-generator/) — but extended with our custom **Visual Archetype** system, **glassmorphism** support, **gradient mesh backgrounds**, **neon glow effects**, and **AI-powered theme generation**.

The theme system architecture is defined in `THEME_SYSTEM_PLAN.md`. The core types are in `src/lib/theme/schema/theme-spec.ts` (ThemeSpec, VisualArchetype, ThemeSurfaceEffects, etc.), the generation engine is in `src/lib/theme/engine/`, the resolver is in `src/lib/theme/resolver/`, and the provider is in `src/lib/theme/provider/`.

---

## Page Route & Layout

Create the playground at `src/app/playground/page.tsx`.

The layout should be a **three-panel design** (resizable):

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Toolbar / Action Bar (sticky top)                                       │
│  [Logo] [Undo] [Redo] [Reset] [Random] [Random within Archetype]        │
│  ─────────── spacer ───────────                                          │
│  [Import] [Export ▾] [Share URL] [Copy CSS] [Apply to Site]              │
├────────────────────┬─────────────────────────────────────┬───────────────┤
│                    │                                     │               │
│   Editor Panel     │     Live Preview Panel              │  Code Panel   │
│   (left sidebar)   │     (center, largest)               │  (right,      │
│   ~320px width     │     (flexible)                      │   collapsible)│
│                    │                                     │               │
│   - Archetype      │     - Component Showcase            │  - CSS Vars   │
│   - Colors         │     - Typography Showcase           │  - JSON       │
│   - Typography     │     - Color Palette Grid            │  - Tailwind   │
│   - Borders        │     - Accessibility Report          │  - shadcn     │
│   - Shadows        │                                     │               │
│   - Effects        │     Tab navigation between views    │  Tab nav      │
│   - Layout         │                                     │               │
│                    │                                     │               │
├────────────────────┴─────────────────────────────────────┴───────────────┤
│  Status Bar (sticky bottom)                                              │
│  [Contrast: AA ✓] [Colors: 12] [Archetype: glassmorphic] [Dark Mode: off]│
└──────────────────────────────────────────────────────────────────────────┘
```

On mobile, collapse to a **tab-based layout** where Editor, Preview, and Code are separate full-screen tabs.

---

## 1. Toolbar / Action Bar

**File:** `src/components/theme/playground-toolbar.tsx`

A sticky top bar with:

### Left side:
- **Logo/Title:** "Theme Playground" with a small palette icon
- **Undo / Redo:** Track theme state history (use a simple array of ThemeSpec snapshots, max 50). Keyboard shortcuts: `Cmd+Z` / `Cmd+Shift+Z`
- **Reset:** Reset to the last saved/loaded theme. Show confirmation dialog
- **Randomize (dice icon):** Call `generateTheme()` with NO constraints — fully random archetype, hue, harmony, dark/light. Button should have a satisfying animation (spin the dice icon)
- **Randomize within Archetype (constrained dice):** Call `generateTheme({ archetype: currentArchetype })` — keeps the current archetype but randomizes everything else. This is the "give me another variation" button

### Right side:
- **Import button:** Opens a modal with:
  - File upload (accepts `.json` files)
  - Paste JSON textarea
  - Paste CSS variables textarea
  - "Import from URL" input field (decodes theme from URL param)
- **Export dropdown** (click to expand):
  - "Download JSON" — downloads `theme-{name}.json` file
  - "Download CSS" — downloads `theme-{name}.css` with all variables + utility classes
  - "Copy Tailwind v4 CSS" — copies `@theme { ... }` block to clipboard
  - "Copy Tailwind v3 Config" — copies the `theme.extend` JS object
  - "Copy shadcn/ui CSS" — copies shadcn-compatible CSS variables
  - "Export to Figma" — copies Figma-compatible design tokens JSON
- **Share URL button:** Generates a compressed URL with `lz-string` encoding of the theme diff (relative to a base theme), copies to clipboard, shows toast "Link copied!"
- **Copy CSS button:** Quick one-click copy of the generated CSS variables block
- **Apply to Site button (primary/accent style):** Applies the current playground theme to the actual portfolio site via the ThemeProvider. Shows confirmation: "Apply this theme to your portfolio?"

---

## 2. Editor Panel (Left Sidebar)

**File:** `src/components/theme/playground-editor.tsx`

A scrollable sidebar with collapsible accordion sections. Each section header shows its name and a small visual indicator of the current state (e.g., color dot for the Colors section, radius preview circle for Borders).

### 2.1 Archetype Selector

**File:** `src/components/theme/archetype-selector.tsx`

At the TOP of the editor panel, before all other sections.

- Display a **horizontal scrolling row of archetype cards** (or a 2-column grid if space permits)
- Each card is ~80x100px with:
  - A **mini color swatch strip** (4-5 dots showing bg, primary, secondary, accent, surface)
  - The archetype name (e.g., "Neon Dark", "Glassmorphic", "Brutalist")
  - A subtle description tooltip on hover
- **Selected archetype** has a highlighted border/ring
- Clicking an archetype calls `generateTheme({ archetype: selectedArchetype })` and replaces the entire playground state
- Include a **"Custom" option** that doesn't regenerate — just unlocks all constraints
- Below the cards, show the current archetype's description text in a muted caption

All 11 archetypes must be represented: `neon-dark`, `clean-minimal`, `glassmorphic`, `corporate-sharp`, `brutalist`, `retro-warm`, `cyberpunk`, `pastel-soft`, `monochrome`, `editorial`, `custom`.

### 2.2 Theme Presets Row

**File:** `src/components/theme/preset-picker.tsx`

Below the archetype selector, show a row of **saved preset themes** as clickable swatches:

- Show the 5 built-in presets: Neon Dashboard, Clean Logistics, Glass Wellness, Corporate CRM, Monochrome
- Show any **user-saved themes** from localStorage (with a delete button on hover)
- A **"+ Save Current"** button at the end to save the current playground state as a named preset
- Each swatch shows 4 color dots (bg, primary, secondary, accent) and the theme name below

### 2.3 Colors Section

**File:** `src/components/theme/color-editor.tsx`

An accordion section titled "Colors" with a palette icon.

Organize into **sub-groups with clear labels**:

**Primary Colors:**
- Primary: Background color picker + Foreground color picker (shown as a pair)
- Secondary: Background + Foreground pair
- Accent: Background + Foreground pair

**Base Colors:**
- Background: Base + Subtle + Muted (3 pickers, or 1 picker with auto-generate for subtle/muted)
- Foreground: Base + Subtle + Muted
- Surface: Base + Raised + Overlay + Inset

**Semantic Colors:**
- Destructive: Background + Foreground
- Warning: Background + Foreground
- Success: Background + Foreground
- Info: Background + Foreground

**Border & Ring:**
- Border: Base + Subtle + Strong + Glass
- Ring color
- Input border color (if separate)

**Chart Colors:**
- 5-8 color swatches in a row, each individually editable
- "Auto-generate from primary" button that derives chart colors from the primary hue using harmony offsets

**Sidebar Colors** (if the portfolio has a sidebar):
- Toggle "Sync with main" — when on, sidebar mirrors main colors; when off, shows independent pickers for sidebar bg, fg, primary, accent, border, ring

**For EACH color picker:**
- Use a proper color picker component (hue wheel + saturation/lightness square, like the shadcn color picker or `react-colorful`)
- Show the current value as: hex input, HSL input, OKLCH input (toggle between formats with a dropdown)
- Show a **contrast ratio badge** next to foreground colors: "4.8:1 AA ✓" or "3.2:1 AA ✗" in red
- Support **typing hex values directly** into the input
- Support **copy color on click** (copies hex to clipboard, shows toast)

**Color generation helpers at the top of the section:**
- **"Generate Palette from Hue" button:** Shows a hue slider (0-360) + harmony type dropdown. Clicking "Generate" fills in all colors from the selected hue + harmony. This is the quick way to create a cohesive palette.
- **Saturation slider:** Global saturation multiplier (muted → vivid) — adjusts all accent colors' chroma proportionally
- **Dark/Light toggle:** Inverts the background/foreground lightness values (generates a matching dark or light variant)

### 2.4 Typography Section

**File:** `src/components/theme/typography-editor.tsx`

Accordion section titled "Typography" with a type icon.

**Font Families:**
- Heading font: Searchable dropdown of Google Fonts + system fonts. Show a live preview of the selected font next to the dropdown. Popular choices pinned at top: Inter, Space Grotesk, Nunito, Playfair Display, JetBrains Mono, SF Pro, system-ui
- Body font: Same dropdown
- Mono font: Same dropdown, filtered to monospace fonts
- **"Match from archetype"** button: auto-selects the font mood's default fonts

**Heading Style:**
- Text Transform: Toggle buttons → `none` | `UPPERCASE` | `Capitalize`
- Default Weight: Slider or dropdown → light / normal / medium / semibold / bold / extrabold
- Default Tracking (letter-spacing): Slider → tighter / tight / normal / wide / wider / widest
- Live preview text below: "The quick brown fox" rendered with current heading style

**Font Sizes:**
- A visual scale showing xs through 5xl as stacked text lines, each with an editable rem value
- "Scale ratio" input (e.g., 1.25 = major third) — auto-generates the entire size scale from a base + ratio
- Base font size input (default: 1rem / 16px)

**Font Weights:**
- 6 weight values, each editable: light, normal, medium, semibold, bold, extrabold
- Usually kept as standard 300/400/500/600/700/800 but can be customized

**Line Heights:**
- 6 values: none through loose, each editable

### 2.5 Borders Section

**File:** `src/components/theme/border-editor.tsx`

Accordion section titled "Borders & Radius" with a rounded-square icon.

**Border Radius:**
- A **visual slider row** showing 7 radius tokens (none → full) as actual rounded squares that update live
- Quick preset buttons: "Sharp (0px)" | "Subtle (4px)" | "Medium (8px)" | "Rounded (16px)" | "Pill (999px)"
- Each token individually editable with a px input
- **A live preview box** that shows a card with the current `lg` radius applied

**Border Width:**
- Slider: 0 | 1 | 2 | 4 | 8 px
- Visual preview showing the selected width on a card border

**Border Style:**
- Toggle buttons: solid | dashed | dotted | double | none

**Border Opacity:**
- Slider 0-100% — particularly important for glassmorphic themes where borders are semi-transparent
- Show the current glass border preview when opacity < 100%

### 2.6 Shadows Section

**File:** `src/components/theme/shadow-editor.tsx`

Accordion section titled "Shadows & Glow" with a layers icon.

**Shadow Scale:**
- Visual stack of 6 cards (none → 2xl) showing the actual shadow applied
- Click each to expand inline editor: offsetX, offsetY, blur, spread, color, opacity
- Quick presets: "None" | "Subtle" | "Soft" | "Elevated" | "Dramatic" | "Hard Offset (Brutalist)"

**Glow Effects:**
- Toggle: "Enable glow effects" (on/off)
- Glow Primary: color picker + spread slider + intensity slider. Live preview of a button with glow
- Glow Secondary: same
- Glow Accent: same
- Quick presets: "Neon" (strong, vivid) | "Soft" (subtle, diffused) | "Off"

**Inner Shadow:**
- Editable inner shadow value with live preview on an input field

### 2.7 Surface Effects Section

**File:** `src/components/theme/effects-editor.tsx`

Accordion section titled "Surface Effects" with a sparkles icon. **This section is what makes our system unique vs. tweakcn/daisyUI.**

**Material Type:**
- Toggle buttons with icons: `Opaque` | `Glass` | `Frosted` | `Translucent`
- Switching to glass/frosted automatically enables the backdrop section below
- When switching TO glass from opaque, auto-adjust surface colors to rgba values

**Backdrop Filter (enabled when material != opaque):**
- **Blur slider:** 0px → 30px with live preview card showing the frosted effect against a colorful background
- **Saturate slider:** 1.0 → 2.0
- **Brightness slider:** 0.8 → 1.2
- A combined preview showing a glass card over a gradient background

**Noise Texture:**
- Toggle: "Enable noise grain" (on/off)
- Opacity slider: 0% → 15%
- Size: fine | medium | coarse (toggle buttons)
- Live preview showing the noise on a card surface

**Surface Tint:**
- Color picker for tint color
- Strength slider: 0% → 100%

**Background Type:**
- Toggle buttons: `Solid` | `Gradient` | `Mesh`
- When Gradient or Mesh is selected, show:
  - Gradient angle slider (0-360°)
  - Color stops (2-5 color pickers in a row, with + button to add more)
  - "Generate from palette" button: auto-creates a gradient from the theme's primary/secondary/accent colors
  - Live preview of the gradient as the page background

### 2.8 Layout & Spacing Section

**File:** `src/components/theme/layout-editor.tsx`

Accordion section titled "Layout" with a grid icon.

**Density:**
- Toggle buttons: `Compact` | `Comfortable` | `Spacious`
- Each adjusts: card padding, gap sizes, spacing density multiplier

**Card Padding:** Slider → 0.75rem to 2.5rem

**Gap Scale:**
- sm / md / lg gap inputs

**Container Max Width:** Input with presets: 1000px | 1200px | 1400px | 1600px

**Spacing Density Multiplier:** Slider 0.7 → 1.4 (multiplies all spacing values)

---

## 3. Live Preview Panel (Center)

**File:** `src/components/theme/playground-preview.tsx`

The largest panel. Contains **tabbed views** at the top:

### Tab Navigation:
`[Components]` `[Dashboard]` `[Cards & Forms]` `[Typography]` `[Color Palette]` `[Accessibility]`

All preview content renders inside a **scoped container** that applies the playground theme via inline CSS variables — it MUST NOT affect the main site theme:

```tsx
<div
  className="preview-scope"
  style={inlineThemeVariables}
  data-archetype={currentTheme.meta.archetype}
>
  {/* If gradient background */}
  {currentTheme.colors.background.type !== 'solid' && (
    <div className="absolute inset-0 bg-theme-gradient -z-10 rounded-xl" />
  )}
  <PreviewContent />
</div>
```

### 3.1 Components Tab (Default)

**File:** `src/components/theme/showcase/components-showcase.tsx`

A dense showcase of UI components, similar to tweakcn's card showcase. Organize into a masonry/grid layout:

**Row 1 — Buttons & Badges:**
- Primary button, Secondary button, Accent button, Destructive button, Outline button, Ghost button
- Each in default + hover + disabled states
- Badges: default, secondary, destructive, outline
- If glow is enabled, show a "Glow Button" variant with the glow effect on hover

**Row 2 — Cards:**
- **Standard Card:** bg-surface, border, shadow, with title + description + button. Apply heading-style to title.
- **Glass Card (conditional):** If `material === 'glass'`, show a frosted glass card with backdrop-blur against a colorful mini-gradient background strip
- **Stat Card:** Large number ($15,231), label, percentage change badge (like tweakcn's revenue card)
- **Pricing Card:** Plan name, price, feature list, CTA button

**Row 3 — Form Elements:**
- Text input (default + focused + error states)
- Select dropdown
- Checkbox + Radio + Toggle switch
- Textarea
- Date picker (calendar component)
- Search input with icon

**Row 4 — Data Display:**
- Table with headers, rows, alternating colors, sorting icons (like tweakcn's payments table)
- Progress bar (using primary color)
- Avatar group
- Tooltip demo

**Row 5 — Feedback & Overlays:**
- Alert (info, success, warning, destructive)
- Toast notification preview
- Modal/dialog preview (inline, not actually overlaying)
- Skeleton loading state

**Row 6 — Navigation:**
- Tab bar (3-4 tabs, one active)
- Breadcrumbs
- Pagination
- Sidebar mini-preview (if applicable)

**Row 7 — Chart Preview:**
- A small bar chart or line chart using the theme's `colors.chart.series` palette
- Simple, just enough to verify the chart colors work together

### 3.2 Dashboard Tab

**File:** `src/components/theme/showcase/dashboard-showcase.tsx`

A **mini dashboard layout** similar to tweakcn's dashboard preview — this gives users a realistic feel for how the theme would look in an actual app:

- Top stats row: 4 stat cards (revenue, users, orders, growth) with icons and trend arrows
- A chart section: simple bar chart or area chart using chart series colors
- A recent items table: 5 rows with status badges
- A sidebar mock (just the navigation items)

This should be a realistic, data-rich preview — not just isolated components.

### 3.3 Cards & Forms Tab

**File:** `src/components/theme/showcase/cards-forms-showcase.tsx`

Dedicated views for these most-used patterns:

- Login/signup card (like tweakcn's "Create an account" card)
- Settings form card with various inputs
- Profile card with avatar, name, role, stats
- Chat/messaging UI (like tweakcn's message card)
- Cookie settings card
- Team members list card
- Pricing comparison (3 tiers side by side)

### 3.4 Typography Tab

**File:** `src/components/theme/showcase/typography-showcase.tsx`

- Full heading hierarchy: h1 through h6 with the heading-style applied
- Body text paragraph with the body font
- Monospace code block
- Text styles: bold, italic, strikethrough, link, small, large
- A side-by-side comparison: heading vs. body font in a realistic article layout
- Letter spacing visualization
- Line height visualization

### 3.5 Color Palette Tab

**File:** `src/components/theme/showcase/color-palette-showcase.tsx`

Similar to tweakcn's "Color Palette" view:

- **Full palette grid:** Every color token displayed as a swatch with:
  - Color preview (circle or rounded square)
  - Token name (e.g., "primary.base")
  - Hex/rgba value
  - Click to copy
- **Grouped by category:** Background, Foreground, Primary, Secondary, Accent, Semantic, Border, Surface, Chart
- **Contrast matrix:** For each foreground/background pair, show:
  - The contrast ratio (e.g., "7.2:1")
  - WCAG level badge: "AAA" (green), "AA" (yellow), "Fail" (red)
  - A text preview on that background
- **For glass themes:** Show the "effective contrast" — composited glass surface over background

### 3.6 Accessibility Tab

**File:** `src/components/theme/showcase/accessibility-showcase.tsx`

- **Contrast Audit Matrix:** Every foreground/background pair in a grid
  - Rows: all foreground colors
  - Columns: all background/surface colors
  - Cell: contrast ratio + pass/fail badge
  - Highlight cells that fail AA in red
- **Color Blindness Simulation:** Show the full color palette as seen by:
  - Normal vision
  - Protanopia (red-blind)
  - Deuteranopia (green-blind)
  - Tritanopia (blue-blind)
  - Rendered as 4 side-by-side palettes
- **Text readability samples:** Show body text on various backgrounds at different sizes
- **Focus state preview:** Tab through interactive elements, show focus ring visibility
- **Overall score:** "Your theme scores AA on all pairs" or "3 pairs fail AA — click to see"

---

## 4. Code Panel (Right Sidebar, Collapsible)

**File:** `src/components/theme/playground-code.tsx`

A collapsible right panel with tabbed code views. Toggle visibility with a `</>` button in the toolbar.

### Tabs:

**CSS Variables tab:**
- Full generated CSS wrapped in `:root { ... }` (for light) and `.dark { ... }` (if applicable)
- Includes the utility classes (.surface-glass, .glow-primary, .heading-style, etc.)
- Syntax highlighted (use a simple CSS highlighter or Prism)
- "Copy" button at top right

**JSON tab:**
- Full ThemeSpec JSON, prettified
- Syntax highlighted
- "Copy" and "Download" buttons

**Tailwind tab:**
- For Tailwind v4: `@theme { ... }` CSS block
- Toggle: "v4 (CSS)" | "v3 (JS config)"
- "Copy" button

**shadcn/ui tab:**
- CSS variables formatted in shadcn/ui's expected format (HSL-based)
- "Copy" button

Each tab should have a **format toggle** in the header:
- Color format: `hex` | `hsl` | `oklch` | `rgb`

---

## 5. Status Bar (Bottom)

**File:** `src/components/theme/playground-status.tsx`

A thin bottom bar showing at-a-glance info:

- **Contrast status:** "AA ✓ All pass" (green) or "AA ✗ 3 issues" (red, clickable → jumps to accessibility tab)
- **Color count:** "12 unique colors"
- **Current archetype:** "glassmorphic" with archetype icon
- **Dark mode status:** sun/moon icon + "Light" or "Dark"
- **Theme name:** editable inline text field showing the theme's `meta.name`
- **Unsaved changes indicator:** Orange dot if the current state differs from the last saved state

---

## 6. State Management

**File:** `src/lib/theme/playground/playground-store.ts`

Use React context (or Zustand if already in the project) for playground state:

```ts
interface PlaygroundState {
  // Current theme being edited
  currentTheme: ThemeSpec;

  // History for undo/redo
  history: ThemeSpec[];
  historyIndex: number;

  // UI state
  activePreviewTab: 'components' | 'dashboard' | 'cards' | 'typography' | 'palette' | 'accessibility';
  activeCodeTab: 'css' | 'json' | 'tailwind' | 'shadcn';
  colorFormat: 'hex' | 'hsl' | 'oklch' | 'rgb';
  isCodePanelOpen: boolean;
  editorExpandedSections: Set<string>;

  // Saved presets
  userPresets: ThemeSpec[];

  // Actions
  updateTheme: (partial: DeepPartial<ThemeSpec>) => void;  // merges partial update
  setTheme: (theme: ThemeSpec) => void;                     // full replace (adds to history)
  undo: () => void;
  redo: () => void;
  resetToDefault: () => void;
  generateRandom: () => void;
  generateRandomWithinArchetype: () => void;
  savePreset: (name: string) => void;
  deletePreset: (id: string) => void;
  importTheme: (source: string, format: 'json' | 'css' | 'url') => void;
  exportTheme: (format: 'json' | 'css' | 'tailwind-v4' | 'tailwind-v3' | 'shadcn') => string;
}
```

**Key behavior:**
- Every change to `currentTheme` pushes to history (debounced — batch rapid slider changes into one history entry)
- URL syncs with key params: `?archetype=glassmorphic&hue=280&dark=false` (lightweight, not full theme)
- User presets persist to localStorage under `portfolio-playground-presets`
- The playground's scoped theme does NOT affect the global ThemeProvider — only "Apply to Site" does that

---

## 7. Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Cmd/Ctrl + Z` | Undo |
| `Cmd/Ctrl + Shift + Z` | Redo |
| `Cmd/Ctrl + S` | Save current as preset |
| `Cmd/Ctrl + C` (when code panel focused) | Copy current code tab |
| `Cmd/Ctrl + Shift + R` | Randomize theme |
| `Cmd/Ctrl + E` | Toggle code panel |
| `1-6` keys (when not in input) | Switch preview tabs |

---

## 8. Animations & Polish

- **Theme transition:** When switching themes/archetypes, apply a brief 300ms crossfade on the preview panel (opacity transition)
- **Color picker:** Smooth slider movement, no jank
- **Randomize button:** Dice icon does a quick spin animation on click
- **Glass card preview:** Show an animated gradient moving slowly behind the glass cards to demonstrate the frosted effect
- **Glow preview:** Pulse animation on glow elements to show the effect
- **Copy feedback:** Brief green checkmark flash replacing the copy icon, then revert after 2s
- **Responsive:** On viewports < 1024px, switch to a tab layout (Editor | Preview | Code as full-screen tabs)

---

## 9. Technical Requirements

- Use **shadcn/ui components** for the playground's own UI (the editor controls, buttons, dialogs, etc.)
- Use **`react-colorful`** for color pickers (lightweight, accessible)
- Use **Radix UI primitives** for accordion, tabs, dialog, dropdown, slider, toggle
- Preview panel must use **scoped CSS variables** (not the global ThemeProvider)
- All color math (conversions, contrast checking) uses the functions from `src/lib/theme/engine/color-utils.ts`
- Theme generation uses `generateTheme()` from `src/lib/theme/engine/theme-generator.ts`
- Theme validation uses `validateTheme()` from `src/lib/theme/schema/theme-schema.ts`
- Code generation uses the resolver from `src/lib/theme/resolver/css-resolver.ts`
- Import/export uses functions from `src/lib/theme/io/`

---

## 10. Files to Create

```
src/app/playground/
├── page.tsx                              # Main playground page
└── layout.tsx                            # Playground-specific layout (no main site chrome)

src/components/theme/playground/
├── playground-toolbar.tsx                # Top action bar
├── playground-editor.tsx                 # Left sidebar with all editor sections
├── playground-preview.tsx                # Center preview panel with tabs
├── playground-code.tsx                   # Right code panel
├── playground-status.tsx                 # Bottom status bar
│
├── editors/
│   ├── archetype-selector.tsx            # Visual archetype picker grid
│   ├── preset-picker.tsx                 # Saved theme presets row
│   ├── color-editor.tsx                  # Full color editing section
│   ├── color-picker-field.tsx            # Reusable: label + color picker + contrast badge + hex input
│   ├── palette-generator.tsx             # Hue slider + harmony type → generate palette
│   ├── typography-editor.tsx             # Font families, sizes, heading style
│   ├── font-picker.tsx                   # Searchable Google Fonts dropdown with preview
│   ├── border-editor.tsx                 # Radius, width, style, opacity
│   ├── shadow-editor.tsx                 # Shadow scale + glow effects
│   ├── effects-editor.tsx                # Surface material, backdrop, noise, tint, background type
│   ├── gradient-editor.tsx               # Gradient angle + color stops editor
│   └── layout-editor.tsx                 # Density, spacing, gaps, container width
│
├── showcase/
│   ├── components-showcase.tsx           # Buttons, badges, inputs, tables, alerts
│   ├── dashboard-showcase.tsx            # Mini dashboard layout
│   ├── cards-forms-showcase.tsx          # Login card, settings form, pricing, chat
│   ├── typography-showcase.tsx           # Heading hierarchy, body text, code
│   ├── color-palette-showcase.tsx        # All swatches + contrast ratios
│   ├── accessibility-showcase.tsx        # Contrast matrix + colorblind sim
│   └── chart-preview.tsx                 # Simple chart using theme chart colors
│
├── shared/
│   ├── contrast-badge.tsx                # "4.5:1 AA ✓" badge component
│   ├── color-swatch.tsx                  # Color circle/square with label + copy
│   ├── section-accordion.tsx             # Reusable collapsible section
│   ├── slider-with-value.tsx             # Slider + numeric input side by side
│   ├── toggle-button-group.tsx           # Segmented control / radio group visual
│   └── code-block.tsx                    # Syntax-highlighted copyable code
│
└── playground-store.ts                   # State management (context or Zustand)
```

---

## 11. Implementation Order

Build in this sequence, testing each step before moving on:

1. **Playground page shell** — 3-panel layout with resizable panels, tab navigation, responsive breakpoint
2. **Playground store** — state management, undo/redo, history tracking
3. **Archetype selector** — visual cards, clicking generates a theme
4. **Color editor** — all color pickers with contrast badges, palette generator
5. **Components showcase** — the main preview with all UI components
6. **Typography editor** — font pickers, heading style controls
7. **Border + Shadow editors** — radius/width/shadow controls
8. **Effects editor** — glassmorphism, noise, glow, background gradient
9. **Code panel** — all 4 tabs with syntax highlighting and copy
10. **Dashboard + Cards tabs** — realistic preview layouts
11. **Color palette + Accessibility tabs** — contrast matrix, colorblind sim
12. **Toolbar** — import/export/share/randomize
13. **Preset picker** — save/load user presets
14. **Status bar** — contrast status, metadata display
15. **Polish** — animations, transitions, keyboard shortcuts, mobile responsive

---

## 12. Key UX Principles

- **Every change is instantly visible** in the preview. No "Apply" button for individual edits — live updates only.
- **The preview IS the product.** It should occupy the most screen real estate. Editor and code panels are secondary.
- **Progressive disclosure.** Don't overwhelm — collapsed accordion sections. Most common options (archetype, colors) at top. Advanced options (effects, layout) lower.
- **Generate first, tweak second.** The archetype selector + randomize buttons should make it effortless to get a good starting point. Manual editing is for refinement.
- **Always show contrast.** Every foreground/background pair should have a visible contrast indicator. Never let the user accidentally create an inaccessible theme.
- **Copy everything.** Every color, every code block, every token name should be copyable with a click.
- **Glass needs special treatment.** When the material is "glass", the preview must show the frosted effect against an actual gradient/colorful background — not against a flat color. Otherwise it just looks like a semi-transparent card.

---

## PROMPT END
