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
        // Brand Colors (Quantum Insights Dark Theme)
        "deep-space": "#0A1628",
        "electric-cyan": "#00D4FF",
        "cyan-dark": "#00B8D9",
        "quantum-violet": "#7B61FF",
        "midnight-blue": "#1A2D4A",
        "neon-mint": "#00FFB2",
        "energy-orange": "#FF6B35",
        "silver": "#E8EDF5",
        "steel": "#94A3B8",
        "graphite": "#334155",

        // Dark Theme Semantic Mappings
        background: {
          DEFAULT: "#0A1628",
          secondary: "#1A2D4A",
          hover: "#243B5C",
        },

        // Text colors (light on dark)
        foreground: {
          DEFAULT: "#FFFFFF",
          secondary: "#E8EDF5",
          muted: "#94A3B8",
          placeholder: "#64748B",
        },

        // Border colors
        border: {
          DEFAULT: "#334155",
          subtle: "#1E3A5F",
        },

        // Primary accent - Electric Cyan
        primary: {
          DEFAULT: "#00D4FF",
          hover: "#00B8D9",
          light: "rgba(0, 212, 255, 0.1)",
          foreground: "#0A1628",
        },

        // Status colors (dark theme optimized)
        success: {
          DEFAULT: "#00FFB2",
          light: "rgba(0, 255, 178, 0.1)",
          foreground: "#0A1628",
        },
        warning: {
          DEFAULT: "#FF6B35",
          light: "rgba(255, 107, 53, 0.1)",
          foreground: "#0A1628",
        },
        error: {
          DEFAULT: "#EF4444",
          light: "rgba(239, 68, 68, 0.1)",
          foreground: "#FFFFFF",
        },
        info: {
          DEFAULT: "#7B61FF",
          light: "rgba(123, 97, 255, 0.1)",
          foreground: "#FFFFFF",
        },

        // Card styling (dark glassmorphism)
        card: {
          DEFAULT: "rgba(26, 45, 74, 0.6)",
          foreground: "#FFFFFF",
        },

        // Input styling
        input: {
          DEFAULT: "#1A2D4A",
          border: "#334155",
          focus: "#00D4FF",
        },

        // Muted backgrounds
        muted: {
          DEFAULT: "rgba(26, 45, 74, 0.4)",
          foreground: "#94A3B8",
        },

        // Destructive actions
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },

        // Ring focus color
        ring: "#00D4FF",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        sora: ["Sora", "system-ui", "sans-serif"],
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
        bold: "700",
      },
      boxShadow: {
        "xs": "0 1px 2px rgba(0, 0, 0, 0.2)",
        "sm": "0 1px 3px rgba(0, 0, 0, 0.3)",
        "card": "0 4px 6px rgba(0, 0, 0, 0.25)",
        "glow-cyan": "0 0 20px rgba(0, 212, 255, 0.3)",
        "glow-cyan-sm": "0 0 10px rgba(0, 212, 255, 0.2)",
        "glow-violet": "0 0 20px rgba(123, 97, 255, 0.3)",
        "glow-mint": "0 0 20px rgba(0, 255, 178, 0.3)",
      },
      borderRadius: {
        DEFAULT: "6px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
