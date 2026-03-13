# Playground Editors Expansion — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Borders & Radius, Shadows, Spacing, Effects (contextual), and Archetype Tweaks (contextual) editors to the Theme Playground. Keep current preview.

**Architecture:** New editor components under `components/theme/playground/editors/`. Each editor uses `usePlayground()` and `updateTheme()` for partial updates. Collapsible sections in `playground-editor.tsx`; Effects and Archetype Tweaks conditionally rendered based on `theme.meta.archetype`.

**Tech Stack:** React, Tailwind, shadcn/ui (add Slider if needed), existing theme schema/resolver.

---

## Task 1: Add Slider UI component

**Files:**
- Create: `components/ui/slider.tsx` (shadcn slider)
- Modify: `components.json` — run `npx shadcn@latest add slider` or add manually

**Step 1:** Add shadcn slider

```bash
npx shadcn@latest add slider --yes
```

**Step 2:** Verify slider renders

Open playground, add temporary `<Slider />` in ColorEditor, confirm it shows. Remove after.

**Step 3:** Commit

```bash
git add components/ui/slider.tsx
git commit -m "chore: add shadcn slider component"
```

---

## Task 2: Borders & Radius editor

**Files:**
- Create: `components/theme/playground/editors/borders-editor.tsx`
- Modify: `components/theme/playground/playground-editor.tsx` — add CollapsibleSection
- Modify: `components/theme/playground/index.ts` — export BordersEditor

**Step 1:** Create borders-editor.tsx

- Radius scale: 6 preset buttons (none, minimal, small, medium, large, pill) — map to `resolveRadiusScale()` from `lib/theme/engine/radius-resolver.ts`
- Border style: dropdown/buttons for solid | dashed | dotted | double | none
- Border opacity: Slider 0–100 → `borders.opacity`
- On change: `updateTheme({ borders: { ...theme.borders, radius: resolved, style, opacity } })`

**Step 2:** Wire into playground-editor.tsx

Add `<CollapsibleSection title="Borders & Radius"><BordersEditor /></CollapsibleSection>` after Colors.

**Step 3:** Export from index

Add `export { BordersEditor } from "./editors/borders-editor"` to `components/theme/playground/index.ts`.

**Step 4:** Commit

```bash
git add components/theme/playground/editors/borders-editor.tsx components/theme/playground/playground-editor.tsx components/theme/playground/index.ts
git commit -m "feat(playground): add Borders & Radius editor"
```

---

## Task 3: Shadows editor

**Files:**
- Create: `components/theme/playground/editors/shadows-editor.tsx`
- Modify: `components/theme/playground/playground-editor.tsx`
- Modify: `components/theme/playground/index.ts`

**Step 1:** Create shadows-editor.tsx

- Shadow style: preset buttons (none, subtle, soft, medium, dramatic, hard-offset)
- Glow: toggles for primary/secondary/accent glow (use `shadows.glow.*` — if "none" string, glow off)
- Glow intensity: subtle | medium | strong — stored in `effects.glow.intensity` (shadows and effects are related; check theme-generator for mapping)
- Map presets to shadow values — either import/copy logic from theme-generator `generateShadows()` or create a small preset map

**Step 2:** Wire into playground-editor

Add after Borders & Radius.

**Step 3:** Export and commit

---

## Task 4: Spacing editor

**Files:**
- Create: `components/theme/playground/editors/spacing-editor.tsx`
- Modify: `components/theme/playground/playground-editor.tsx`
- Modify: `components/theme/playground/index.ts`

**Step 1:** Create spacing-editor.tsx

- Density: Slider 0.7–1.2 (or 3 options: compact, comfortable, spacious) → `layout.density` and `spacing.density`
- Gap scale: inputs or preset for sm/md/lg → `layout.gap.sm`, `layout.gap.md`, `layout.gap.lg`
- Card padding: input → `layout.cardPadding`

**Step 2:** Wire and commit

---

## Task 5: Effects editor (contextual)

**Files:**
- Create: `components/theme/playground/editors/effects-editor.tsx`
- Modify: `components/theme/playground/playground-editor.tsx`

**Step 1:** Define archetypes that show Effects

```ts
const EFFECTS_ARCHETYPES: VisualArchetype[] = ["glassmorphic", "neon-dark", "cyberpunk"];
```

**Step 2:** Create effects-editor.tsx

- Backdrop blur: Slider 0–24px → `effects.backdrop.blur`
- Noise: toggle + opacity slider → `effects.noise.enabled`, `effects.noise.opacity`
- Glow: toggle + intensity (subtle|medium|strong) → `effects.glow.enabled`, `effects.glow.intensity`
- Tint strength: Slider 0–1 → `effects.tint.strength`
- Show only when `EFFECTS_ARCHETYPES.includes(theme.meta.archetype)`

**Step 3:** Wire as conditional CollapsibleSection

```tsx
{EFFECTS_ARCHETYPES.includes(theme.meta.archetype) && (
  <CollapsibleSection title="Effects">
    <EffectsEditor />
  </CollapsibleSection>
)}
```

**Step 4:** Commit

---

## Task 6: Archetype Tweaks editor (contextual)

**Files:**
- Create: `components/theme/playground/editors/archetype-tweaks-editor.tsx`
- Modify: `components/theme/playground/playground-editor.tsx`

**Step 1:** Define archetype → tweaks mapping

```ts
const ARCHETYPE_TWEAKS: Record<VisualArchetype, { label: string; show: boolean }> = {
  glassmorphic: { label: "Glassmorphic tweaks", show: true },
  brutalist: { label: "Brutalist tweaks", show: true },
  // ... others: show: false
};
```

**Step 2:** Create archetype-tweaks-editor.tsx

- For glassmorphic: blur slider, opacity slider, tint strength
- For brutalist: border width emphasis (thin | medium | thick)
- Render different controls based on `theme.meta.archetype`

**Step 3:** Wire as conditional section

**Step 4:** Commit

---

## Task 7: Polish and test

**Files:**
- Modify: `components/theme/playground/playground-editor.tsx` — ensure section order: Archetype, Colors, Borders, Shadows, Spacing, Effects (cond), Archetype Tweaks (cond)

**Step 1:** Verify all editors update theme and preview reflects changes

**Step 2:** Test archetype switch — Effects and Archetype Tweaks appear/disappear correctly

**Step 3:** Commit

```bash
git add -A
git commit -m "chore(playground): polish editor order and conditional sections"
```

---

## Execution Handoff

Plan complete and saved to `docs/plans/2025-03-11-playground-editors-implementation.md`.

**Two execution options:**

1. **Subagent-Driven (this session)** — I dispatch fresh subagent per task, review between tasks, fast iteration
2. **Parallel Session (separate)** — Open new session with executing-plans, batch execution with checkpoints

**Which approach?**
