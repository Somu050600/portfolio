"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/lib/theme";
import { exportAsJSON } from "@/lib/theme/io";
import { usePlayground } from "@/lib/theme/playground/playground-store";
import { Check, Download, RotateCcw, Undo2, Redo2 } from "lucide-react";
import { useState } from "react";

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function PlaygroundToolbar() {
  const {
    theme,
    undo,
    redo,
    generateRandom,
    canUndo,
    canRedo,
  } = usePlayground();
  const { setCustomTheme } = useTheme();
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    setCustomTheme(theme);
    setApplied(true);
    setTimeout(() => setApplied(false), 2000);
  };

  const handleExportJSON = () => {
    const blob = new Blob([exportAsJSON(theme)], {
      type: "application/json",
    });
    downloadBlob(blob, `theme-${theme.meta.id}.json`);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border-b px-4 py-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={undo}
        disabled={!canUndo}
        title="Undo"
      >
        <Undo2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={redo}
        disabled={!canRedo}
        title="Redo"
      >
        <Redo2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={generateRandom}
        title="Randomize theme"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Randomize
      </Button>

      <div className="mx-2 h-6 w-px bg-border" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleExportJSON}>
            Export JSON
          </DropdownMenuItem>
          <DropdownMenuItem disabled className="opacity-60">
            <span className="text-muted-foreground">Figma — Coming soon</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button size="sm" onClick={handleApply}>
        {applied ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Applied
          </>
        ) : (
          "Apply to site"
        )}
      </Button>
    </div>
  );
}
