"use client";

import * as React from "react";
import type { ThemeSpec } from "@/lib/theme/schema/theme-spec";
import { themeToCSS } from "@/lib/theme/resolver/css-resolver";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export function ThemeCodePanel({ theme }: { theme: ThemeSpec }) {
  const [copied, setCopied] = React.useState<"json" | "css" | null>(null);

  const json = React.useMemo(
    () => JSON.stringify(theme, null, 2),
    [theme]
  );
  const css = React.useMemo(
    () => themeToCSS(theme, ":root"),
    [theme]
  );

  const copy = async (text: string, type: "json" | "css") => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="rounded-lg border bg-card p-4">
      <h2 className="mb-3 text-sm font-semibold">Code</h2>
      <div className="space-y-4">
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">JSON</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2"
              onClick={() => copy(json, "json")}
            >
              {copied === "json" ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <pre className="max-h-40 overflow-auto rounded-md border bg-muted/50 p-3 text-xs">
            {json.slice(0, 500)}...
          </pre>
        </div>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">CSS Variables</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2"
              onClick={() => copy(css, "css")}
            >
              {copied === "css" ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <pre className="max-h-40 overflow-auto rounded-md border bg-muted/50 p-3 text-xs">
            {css.slice(0, 600)}...
          </pre>
        </div>
      </div>
    </div>
  );
}
