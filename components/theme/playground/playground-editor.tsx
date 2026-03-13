"use client";

import { usePlayground } from "@/lib/theme/playground/playground-store";
import { ArchetypeSelector } from "./editors/archetype-selector";
import { ColorEditor } from "./editors/color-editor";
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
    <div className="flex h-full flex-col overflow-auto">
      <CollapsibleSection title="Archetype" defaultOpen={true}>
        <ArchetypeSelector
          selected={theme.meta.archetype}
          onSelect={generateFromArchetype}
        />
      </CollapsibleSection>
      <CollapsibleSection title="Colors" defaultOpen={true}>
        <ColorEditor />
      </CollapsibleSection>
    </div>
  );
}
