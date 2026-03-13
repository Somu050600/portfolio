declare module "culori" {
  export interface RgbColor {
    mode?: "rgb";
    r?: number;
    g?: number;
    b?: number;
    alpha?: number;
  }

  export interface Oklch {
    mode: "oklch";
    l: number;
    c?: number;
    h?: number;
  }

  export function converter(
    mode: string
  ): (color: unknown) => RgbColor | Oklch | Record<string, unknown> | null;
  export function formatHex(color: unknown): string;
  export function formatHex8(color: unknown): string;
  export function wcagContrast(a: string, b: string): number;
  export function parse(c: string): Record<string, unknown> | undefined;
}
