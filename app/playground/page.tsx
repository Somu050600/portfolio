"use client";

import {
  PlaygroundCode,
  PlaygroundEditor,
  PlaygroundPreview,
  PlaygroundToolbar,
} from "@/components/theme/playground";
import { PlaygroundProvider } from "@/lib/theme/playground/playground-store";
import { Group, Panel, Separator } from "react-resizable-panels";

export default function PlaygroundPage() {
  return (
    <PlaygroundProvider>
      <div className="flex min-h-0 flex-1 flex-col">
        <PlaygroundToolbar />
        <Group
          orientation="horizontal"
          className="min-h-0 flex-1"
          defaultLayout={{ editor: 1, preview: 2, code: 1 }}
        >
          <Panel id="editor" minSize={15} maxSize={40}>
            <div className="h-full overflow-auto border-r bg-muted/30">
              <PlaygroundEditor />
            </div>
          </Panel>
          <Separator className="w-1 bg-border hover:bg-primary/20 data-[resize-handle-active]:bg-primary/40" />
          <Panel id="preview" minSize={30} maxSize={60}>
            <div className="h-full overflow-hidden">
              <PlaygroundPreview />
            </div>
          </Panel>
          <Separator className="w-1 bg-border hover:bg-primary/20 data-[resize-handle-active]:bg-primary/40" />
          <Panel id="code" minSize={15} maxSize={40}>
            <div className="h-full overflow-hidden border-l bg-muted/30">
              <PlaygroundCode />
            </div>
          </Panel>
        </Group>
      </div>
    </PlaygroundProvider>
  );
}
