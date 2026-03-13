"use client";

import {
  PlaygroundEditor,
  PlaygroundPreview,
  PlaygroundToolbar,
} from "@/components/theme/playground";
import { PlaygroundProvider } from "@/lib/theme/playground/playground-store";

export default function PlaygroundPage() {
  return (
    <PlaygroundProvider>
      <div className="flex min-h-0 flex-1 flex-col">
        <PlaygroundToolbar />
        <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-3">
          <div className="h-full overflow-auto border-r bg-muted/30g lg:col-span-1">
            <PlaygroundEditor />
          </div>
          <div className="h-full overflow-hidden lg:col-span-2">
            <PlaygroundPreview />
          </div>
        </div>
      </div>
    </PlaygroundProvider>
  );
}
