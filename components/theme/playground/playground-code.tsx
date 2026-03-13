"use client";

import { Button } from "@/components/ui/button";
import { themeToCSS } from "@/lib/theme/resolver/css-resolver";
import { usePlayground } from "@/lib/theme/playground/playground-store";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function PlaygroundCode() {
  const { theme } = usePlayground();
  const [copied, setCopied] = useState(false);

  const css = themeToCSS(theme, ".preview-scope");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b px-3 py-2">
        <span className="text-sm font-medium">CSS Variables</span>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="mr-7">
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </>
          )}
        </Button>
      </div>
      <pre className="flex-1 overflow-auto p-4 text-xs">
        <code className="text-muted-foreground">{css}</code>
      </pre>
    </div>
  );
}
