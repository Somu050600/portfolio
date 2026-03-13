"use client";

import { PlaygroundCode } from "@/components/theme/playground/playground-code";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "@/lib/theme";
import { exportAsJSON, importFromJSONSafe } from "@/lib/theme/io";
import { usePlayground } from "@/lib/theme/playground/playground-store";
import {
  Check,
  Code2,
  Download,
  Redo2,
  RotateCcw,
  Undo2,
  Upload,
} from "lucide-react";
import { useRef, useState } from "react";

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function PlaygroundToolbar() {
  const { theme, setTheme, undo, redo, generateRandom, canUndo, canRedo } =
    usePlayground();
  const { setCustomTheme } = useTheme();
  const { toast } = useToast();
  const [applied, setApplied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = importFromJSONSafe(reader.result as string);
      if (result.success) {
        setTheme(result.theme);
        toast({ title: "Theme imported" });
      } else {
        toast({
          title: "Import failed",
          description: result.errors.join(", "),
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const result = importFromJSONSafe(text);
      if (result.success) {
        setTheme(result.theme);
        toast({ title: "Theme imported" });
      } else {
        toast({
          title: "Import failed",
          description: result.errors.join(", "),
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Import failed",
        description: "Could not read clipboard",
        variant: "destructive",
      });
    }
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
            <Upload className="mr-2 h-4 w-4" />
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

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleFileChange}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Import
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
            From file
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handlePaste}>
            From clipboard
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

      <Sheet>
        <SheetTrigger asChild className="ml-auto">
          <Button variant="outline" size="sm">
            <Code2 className="mr-2 h-4 w-4" />
            View code
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex w-full flex-col p-0 sm:max-w-xl"
        >
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <PlaygroundCode />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
