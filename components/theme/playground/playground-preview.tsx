"use client";

import { themeToCSS } from "@/lib/theme/resolver/css-resolver";
import { usePlayground } from "@/lib/theme/playground/playground-store";
import { ComponentsShowcase } from "./showcase/components-showcase";

export function PlaygroundPreview() {
  const { theme } = usePlayground();
  const css = themeToCSS(theme, ".preview-scope");

  return (
    <div className="flex h-full flex-col overflow-auto bg-background">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="preview-scope min-h-full bg-background">
        <ComponentsShowcase />
      </div>
    </div>
  );
}
