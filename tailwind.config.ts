import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Minimal Design System - Backgrounds
        background: {
          DEFAULT: "#FAFBFC",
          secondary: "#FFFFFF",
          hover: "#F4F5F7",
        },

        // Text colors
        foreground: {
          DEFAULT: "#111827",
          secondary: "#6B7280",
          muted: "#9CA3AF",
          placeholder: "#D1D5DB",
        },

        // Border colors
        border: {
          DEFAULT: "#E5E7EB",
          subtle: "#F3F4F6",
        },

        // Primary accent - Blue (used sparingly for actions)
        primary: {
          DEFAULT: "#3B82F6",
          hover: "#2563EB",
          light: "#EFF6FF",
          foreground: "#FFFFFF",
        },

        // Status colors (only for semantic meaning)
        success: {
          DEFAULT: "#10B981",
          light: "#D1FAE5",
          foreground: "#065F46",
        },
        warning: {
          DEFAULT: "#F59E0B",
          light: "#FEF3C7",
          foreground: "#92400E",
        },
        error: {
          DEFAULT: "#EF4444",
          light: "#FEE2E2",
          foreground: "#991B1B",
        },
        info: {
          DEFAULT: "#6366F1",
          light: "#E0E7FF",
          foreground: "#3730A3",
        },

        // Card styling
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#111827",
        },

        // Input styling
        input: {
          DEFAULT: "#FFFFFF",
          border: "#E5E7EB",
          focus: "#3B82F6",
        },

        // Muted backgrounds
        muted: {
          DEFAULT: "#F4F5F7",
          foreground: "#6B7280",
        },

        // Destructive actions
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },

        // Ring focus color
        ring: "#3B82F6",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["11px", { lineHeight: "16px" }],
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["13px", { lineHeight: "18px" }],
        base: ["14px", { lineHeight: "20px" }],
        lg: ["16px", { lineHeight: "24px" }],
        xl: ["20px", { lineHeight: "28px" }],
        "2xl": ["24px", { lineHeight: "32px" }],
        "3xl": ["32px", { lineHeight: "40px" }],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
      },
      boxShadow: {
        "xs": "0 1px 2px rgba(0, 0, 0, 0.04)",
        "sm": "0 1px 3px rgba(0, 0, 0, 0.06)",
        "card": "0 1px 3px rgba(0, 0, 0, 0.04)",
      },
      borderRadius: {
        DEFAULT: "6px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
      },
    },
  },
  plugins: [],
};

export default config;
