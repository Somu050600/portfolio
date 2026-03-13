"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  encodeThemeToURL,
  exportAsCSS,
  exportAsJSON,
  importFromJSONSafe,
} from "@/lib/theme/io";
import type { ThemeSpec } from "@/lib/theme/schema/theme-spec";
import { Check, Download, Share2, Upload } from "lucide-react";
import * as React from "react";

export function ActionBar({
  theme,
  onApply,
  onImport,
}: {
  theme: ThemeSpec;
  onApply: () => void;
  onImport?: (theme: ThemeSpec) => void;
}) {
  const [applied, setApplied] = React.useState(false);
  const [shared, setShared] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleApply = () => {
    onApply();
    setApplied(true);
    setTimeout(() => setApplied(false), 2000);
  };

  const handleExportJSON = () => {
    const blob = new Blob([exportAsJSON(theme)], {
      type: "application/json",
    });
    downloadBlob(blob, `theme-${theme.meta.id}.json`);
  };

  const handleExportCSS = () => {
    const blob = new Blob([exportAsCSS(theme)], { type: "text/css" });
    downloadBlob(blob, `theme-${theme.meta.id}.css`);
  };

  const handleShare = async () => {
    const encoded = encodeThemeToURL(theme);
    const url = `${typeof window !== "undefined" ? window.location.origin : ""}/playground?theme=${encodeURIComponent(encoded)}`;
    await navigator.clipboard.writeText(url);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onImport) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = importFromJSONSafe(reader.result as string);
      if (result.success) {
        onImport(result.theme);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handlePaste = async () => {
    if (!onImport) return;
    try {
      const text = await navigator.clipboard.readText();
      const result = importFromJSONSafe(text);
      if (result.success) {
        onImport(result.theme);
      }
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={handleApply}>
        {applied ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Applied
          </>
        ) : (
          "Apply to site"
        )}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleExportJSON}>
            Export JSON
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportCSS}>
            Export CSS
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {onImport && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="hidden"
            onChange={handleFileChange}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
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
        </>
      )}

      <Button variant="outline" onClick={handleShare}>
        {shared ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Copied
          </>
        ) : (
          <>
            <Share2 className="mr-2 h-4 w-4" />
            Share URL
          </>
        )}
      </Button>
    </div>
  );
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
