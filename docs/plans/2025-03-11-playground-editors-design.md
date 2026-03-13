# Playground Editors Expansion — Design Document

**Date:** 2025-03-11  
**Status:** Approved

## Goal

Expand the Theme Playground left-panel editors beyond Archetype and Colors. Add Borders & Radius, Shadows, Spacing, Effects (contextual), and Archetype Tweaks (contextual). Keep the current simple preview; grid preview deferred to Phase 2.

## Decisions

| Topic | Decision |
|-------|----------|
| Editor order | Most-used first: Colors → Borders/Radius → Shadows → Spacing |
| Effects | Contextual — shown when archetype uses them (glass, neon, etc.) |
| Archetype tweaks | Separate collapsible section, only when archetype has extra controls |
| Preview | Phase 1: keep current simple showcase. Phase 2: grid with Standard components |

## Editor Sections (Order)

1. **Archetype** *(existing)* — Visual cards, generates theme on click
2. **Colors** *(existing)* — Primary, secondary, accent, background + contrast badges
3. **Borders & Radius** *(new)* — Radius scale presets, border width, style, opacity
4. **Shadows** *(new)* — Shadow presets, glow intensity
5. **Spacing** *(new)* — Density slider, gap scale
6. **Effects** *(new, contextual)* — Blur, noise, glow, tint — when archetype uses effects
7. **Archetype Tweaks** *(new, contextual)* — Glassmorphic tweaks, Brutalist tweaks, etc.

## Archetype → Contextual Visibility

| Archetype | Effects | Archetype Tweaks |
|-----------|---------|------------------|
| glassmorphic | Yes (blur, noise, tint) | Yes (glass-specific) |
| neon-dark, cyberpunk | Yes (glow) | No |
| brutalist | No | Yes (border emphasis) |
| clean-minimal, corporate-sharp, etc. | No | No |

## Technical Notes

- ThemeSpec: `borders`, `shadows`, `effects`, `layout` (spacing) — all exist
- `RADIUS_SCALES` in `lib/theme/engine/radius-resolver.ts`: none, minimal, small, medium, large, pill
- Shadow styles in theme-generator: none, subtle, soft, medium, dramatic, hard-offset
- Effects: `backdrop.blur`, `noise.enabled/opacity`, `glow.enabled/intensity`, `tint.strength`
- No Slider UI component — add shadcn slider or use `input[type="range"]`
