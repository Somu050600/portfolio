"use client";

import * as React from "react";
import type { ThemeSpec } from "@/lib/theme/schema/theme-spec";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export function PreviewPanel({
  theme,
  previewCss,
}: {
  theme: ThemeSpec;
  previewCss: string;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let style = container.querySelector("style");
    if (!style) {
      style = document.createElement("style");
      style.setAttribute("data-playground-preview", "true");
      container.appendChild(style);
    }
    style.textContent = previewCss;
  }, [previewCss]);

  const isGlass =
    theme.effects.material === "glass" ||
    theme.effects.material === "frosted" ||
    theme.effects.material === "translucent";
  const hasGradient =
    theme.colors.background.type !== "solid" &&
    theme.colors.background.gradient;

  return (
    <div className="rounded-lg border bg-card p-4">
      <h2 className="mb-3 text-sm font-semibold">Preview</h2>
      <div
        ref={containerRef}
        className="playground-preview relative min-h-[320px] overflow-hidden rounded-lg border bg-background"
      >
        {hasGradient && (
          <div
            className="absolute inset-0 -z-10"
            style={{
              background: theme.colors.background.gradient?.value,
            }}
          />
        )}
        <div className="flex flex-col gap-4 p-6">
          <div>
            <h3
              className="heading-style mb-2 text-2xl"
              style={{ fontFamily: theme.typography.fontFamily.heading }}
            >
              Heading Style
            </h3>
            <p
              className="text-sm"
              style={{ fontFamily: theme.typography.fontFamily.body }}
            >
              Body text with {theme.meta.archetype} archetype.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="bg-primary text-primary-foreground">
              Primary
            </Button>
            <Button size="sm" variant="secondary">
              Secondary
            </Button>
            <Button size="sm" variant="outline">
              Outline
            </Button>
            {theme.effects.glow.enabled && (
              <Button size="sm" className="glow-primary">
                Glow
              </Button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>

          <Card className={isGlass ? "surface-glass" : ""}>
            <CardHeader className="pb-2">
              <h4 className="text-sm font-semibold">Card</h4>
            </CardHeader>
            <CardContent className="space-y-2">
              <Input placeholder="Input field" className="w-full" />
              <p className="text-xs text-muted-foreground">
                {isGlass ? "Glass surface" : "Opaque surface"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
