"use client";

import { cn } from "@/lib/utils";

export function ContrastBadge({
  ratio,
  meetsAA,
  meetsAAA,
  className,
}: {
  ratio: number;
  meetsAA: boolean;
  meetsAAA: boolean;
  className?: string;
}) {
  const label =
    meetsAAA ? "AAA ✓" : meetsAA ? "AA ✓" : ratio >= 3 ? "Fail" : "Fail";
  const variant = meetsAAA ? "success" : meetsAA ? "pass" : "fail";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium",
        variant === "success" && "bg-green-500/20 text-green-700 dark:text-green-400",
        variant === "pass" && "bg-blue-500/20 text-blue-700 dark:text-blue-400",
        variant === "fail" && "bg-red-500/20 text-red-700 dark:text-red-400",
        className
      )}
      title={`Contrast ratio: ${ratio.toFixed(1)}:1`}
    >
      {ratio.toFixed(1)}:1 {label}
    </span>
  );
}
