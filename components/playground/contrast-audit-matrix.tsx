"use client";

import * as React from "react";
import type { ThemeSpec } from "@/lib/theme/schema/theme-spec";
import { computeContrastPairs } from "@/lib/theme/accessibility";
import { Check, X } from "lucide-react";

export function ContrastAuditMatrix({ theme }: { theme: ThemeSpec }) {
  const pairs = React.useMemo(() => computeContrastPairs(theme), [theme]);

  const passCount = pairs.filter((p) => p.passesAA).length;
  const aaCount = pairs.filter((p) => p.passesAAA).length;

  return (
    <div className="rounded-lg border bg-card p-4">
      <h2 className="mb-3 text-sm font-semibold">Contrast audit</h2>
      <div className="mb-3 flex gap-4 text-xs text-muted-foreground">
        <span>
          AA (4.5:1): {passCount}/{pairs.length}
        </span>
        <span>
          AAA (7:1): {aaCount}/{pairs.length}
        </span>
      </div>
      <div className="max-h-64 overflow-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b text-left">
              <th className="py-1.5 font-medium">Pair</th>
              <th className="py-1.5 font-medium">Ratio</th>
              <th className="py-1.5 font-medium">AA</th>
              <th className="py-1.5 font-medium">AAA</th>
            </tr>
          </thead>
          <tbody>
            {pairs.map((p, i) => (
              <tr key={i} className="border-b border-border/50">
                <td className="py-1.5">
                  <span className="font-medium">{p.foregroundLabel}</span>
                  <span className="text-muted-foreground"> on </span>
                  <span className="font-medium">{p.backgroundLabel}</span>
                  {p.isGlass && (
                    <span className="ml-1 text-muted-foreground">(glass)</span>
                  )}
                </td>
                <td className="py-1.5">{p.ratio.toFixed(1)}:1</td>
                <td className="py-1.5">
                  {p.passesAA ? (
                    <Check className="inline h-3.5 w-3.5 text-green-600" />
                  ) : (
                    <X className="inline h-3.5 w-3.5 text-destructive" />
                  )}
                </td>
                <td className="py-1.5">
                  {p.passesAAA ? (
                    <Check className="inline h-3.5 w-3.5 text-green-600" />
                  ) : (
                    <X className="inline h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
