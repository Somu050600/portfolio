"use client";

import { usePlayground } from "@/lib/theme/playground/playground-store";
import { ArchetypeSelector } from "./editors/archetype-selector";
import { BordersEditor } from "./editors/borders-editor";
import { ColorEditor } from "./editors/color-editor";
import { ShadowsEditor } from "./editors/shadows-editor";
import { ArchetypeTweaksEditor } from "./editors/archetype-tweaks-editor";
import { EffectsEditor } from "./editors/effects-editor";
import { SpacingEditor } from "./editors/spacing-editor";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

function CollapsibleSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-medium hover:bg-muted/50"
      >
        {open ? (
          <ChevronDown className="h-4 w-4 shrink-0" />
        ) : (
          <ChevronRight className="h-4 w-4 shrink-0" />
        )}
        {title}
      </button>
      {open && <div className="px-3 pb-3">{children}</div>}
    </div>
  );
}

export function PlaygroundEditor() {
  const { theme, generateFromArchetype } = usePlayground();

  return (
    <div className="flex h-full flex-col overflow-y-auto max-h-[calc(100vh-100px)] border">
      <CollapsibleSection title="Archetype" defaultOpen={true}>
        <ArchetypeSelector
          selected={theme.meta.archetype}
          onSelect={generateFromArchetype}
        />
      </CollapsibleSection>
      <CollapsibleSection title="Colors" defaultOpen={true}>
        <ColorEditor />
      </CollapsibleSection>
      <CollapsibleSection title="Borders & Radius" defaultOpen={false}>
        <BordersEditor />
      </CollapsibleSection>
      <CollapsibleSection title="Shadows" defaultOpen={false}>
        <ShadowsEditor />
      </CollapsibleSection>
      <CollapsibleSection title="Spacing" defaultOpen={false}>
        <SpacingEditor />
      </CollapsibleSection>
      {["glassmorphic", "neon-dark", "cyberpunk", "synthwave"].includes(
        theme.meta.archetype,
      ) && (
        <CollapsibleSection title="Effects" defaultOpen={false}>
          <EffectsEditor />
        </CollapsibleSection>
      )}
      {["glassmorphic", "brutalist"].includes(theme.meta.archetype) && (
        <CollapsibleSection title="Archetype tweaks" defaultOpen={false}>
          <ArchetypeTweaksEditor />
        </CollapsibleSection>
      )}
    </div>
  );
}
