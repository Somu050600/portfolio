import type { Config } from "tailwindcss";

const svgToDataUri = require("mini-svg-data-uri");

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: {
          DEFAULT: "var(--color-background-base)",
          subtle: "var(--color-background-subtle)",
          muted: "var(--color-background-muted)",
        },
        foreground: {
          DEFAULT: "var(--color-foreground-base)",
          subtle: "var(--color-foreground-subtle)",
          muted: "var(--color-foreground-muted)",
        },
        primary: {
          DEFAULT: "var(--color-primary-base)",
          hover: "var(--color-primary-hover)",
          active: "var(--color-primary-active)",
          foreground: "var(--color-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary-base)",
          hover: "var(--color-secondary-hover)",
          active: "var(--color-secondary-active)",
          foreground: "var(--color-secondary-foreground)",
        },
        accent: {
          DEFAULT: "var(--color-accent-base)",
          hover: "var(--color-accent-hover)",
          active: "var(--color-accent-active)",
          foreground: "var(--color-accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--color-destructive-base)",
          foreground: "var(--color-destructive-foreground)",
        },
        border: {
          DEFAULT: "var(--color-border-base)",
          subtle: "var(--color-border-subtle)",
          strong: "var(--color-border-strong)",
          glass: "var(--color-border-glass)",
        },
        surface: {
          DEFAULT: "var(--color-surface-base)",
          raised: "var(--color-surface-raised)",
          overlay: "var(--color-surface-overlay)",
          inset: "var(--color-surface-inset)",
          glass: "var(--color-surface-glass)",
        },
        ring: "var(--color-ring)",
        input: "var(--color-border-base)",
        muted: {
          DEFAULT: "var(--color-background-muted)",
          foreground: "var(--color-foreground-muted)",
        },
        popover: {
          DEFAULT: "var(--color-surface-raised)",
          foreground: "var(--color-foreground-base)",
        },
        card: {
          DEFAULT: "var(--color-surface-base)",
          foreground: "var(--color-foreground-base)",
        },
      },
      borderRadius: {
        none: "var(--radius-none)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        inner: "var(--shadow-inner)",
        glow: "var(--glow-primary)",
      },
      fontFamily: {
        heading: "var(--font-family-heading)",
        body: "var(--font-family-body)",
        mono: "var(--font-family-mono)",
      },
      backdropBlur: {
        theme: "var(--backdrop-blur)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          // "bg-grid": (value: any) => ({
          //   backgroundImage: `url("${svgToDataUri(
          //     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
          //   )}")`,
          // }),
          // "bg-grid-small": (value: any) => ({
          //   backgroundImage: `url("${svgToDataUri(
          //     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
          //   )}")`,
          // }),
          "bg-dot": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
} satisfies Config;

export default config;
