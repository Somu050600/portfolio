"use client";

import { useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export function ColorSwatch({
  color,
  size = "md",
  className,
  showCopy = true,
}: {
  color: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  showCopy?: boolean;
}) {
  const { toast } = useToast();

  const copy = useCallback(() => {
    if (!showCopy) return;
    navigator.clipboard.writeText(color);
    toast({ title: "Copied", description: color });
  }, [color, showCopy, toast]);

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "rounded border border-border transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring",
        size === "sm" && "h-6 w-6",
        size === "md" && "h-8 w-8",
        size === "lg" && "h-10 w-10",
        className
      )}
      style={{ backgroundColor: color }}
      title={showCopy ? `Click to copy ${color}` : color}
    />
  );
}
