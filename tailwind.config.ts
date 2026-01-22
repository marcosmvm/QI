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
        // Brand Board v1.0 - Primary Palette

        // Backgrounds (Dark Theme)
        "deep-space": "#0A1628",
        "midnight-blue": "#1A2D4A",
        "graphite": "#2A3F5F",
        "slate": "#3D5A80",

        // Text Colors
        "white": "#FFFFFF",
        "silver": "#E8E8ED",
        "steel": "#9CA3AF",
        "muted-text": "#6B7280",

        // Accent Colors
        "electric-cyan": "#00D4FF",
        "quantum-violet": "#7B61FF",
        "neon-mint": "#00FFB2",
        "energy-orange": "#FF6B35",
        "alert-red": "#FF4757",

        // Semantic Color Mappings
        background: {
          DEFAULT: "#0A1628",
          elevated: "#1A2D4A",
          hover: "#2A3F5F",
        },

        border: {
          DEFAULT: "#2A3F5F",
          light: "#3D5A80",
        },

        foreground: {
          DEFAULT: "#FFFFFF",
          secondary: "#E8E8ED",
          muted: "#9CA3AF",
        },

        // Semantic Status Colors
        primary: {
          DEFAULT: "#00D4FF",
          hover: "#00D4FF/90",
          foreground: "#0A1628",
        },
        secondary: {
          DEFAULT: "#7B61FF",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#00FFB2",
          light: "rgba(0, 255, 178, 0.2)",
          foreground: "#0A1628",
        },
        warning: {
          DEFAULT: "#FF6B35",
          light: "rgba(255, 107, 53, 0.2)",
          foreground: "#0A1628",
        },
        destructive: {
          DEFAULT: "#FF4757",
          light: "rgba(255, 71, 87, 0.2)",
          foreground: "#FFFFFF",
        },
        info: {
          DEFAULT: "#7B61FF",
          light: "rgba(123, 97, 255, 0.2)",
          foreground: "#FFFFFF",
        },

        // Component-specific
        card: {
          DEFAULT: "#1A2D4A",
          hover: "#2A3F5F",
          foreground: "#FFFFFF",
        },
        input: {
          DEFAULT: "#1A2D4A",
          focus: "#2A3F5F",
          border: "#2A3F5F",
        },
        muted: {
          DEFAULT: "#1A2D4A",
          foreground: "#9CA3AF",
        },

        ring: "#00D4FF",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        // Body Text
        "2xs": ["0.75rem", { lineHeight: "1rem" }],      // 12px
        xs: ["0.75rem", { lineHeight: "1rem" }],         // 12px
        sm: ["0.875rem", { lineHeight: "1.25rem" }],     // 14px
        base: ["1rem", { lineHeight: "1.5rem" }],        // 16px
        lg: ["1.125rem", { lineHeight: "1.75rem" }],     // 18px

        // Headings
        xl: ["1.25rem", { lineHeight: "1.75rem" }],      // 20px - h5
        "2xl": ["1.5rem", { lineHeight: "2rem" }],       // 24px - h4/h3
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],  // 30px - h2
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],    // 36px - h1

        // Metric Numbers
        "metric-sm": ["1.25rem", { lineHeight: "1.5rem" }],   // 20px
        "metric-md": ["1.5rem", { lineHeight: "1.75rem" }],   // 24px
        "metric-lg": ["2.25rem", { lineHeight: "2.5rem" }],   // 36px
        "metric-xl": ["3rem", { lineHeight: "1" }],           // 48px
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(0, 212, 255, 0.3)",
        "glow-cyan-sm": "0 0 10px rgba(0, 212, 255, 0.2)",
        "glow-violet": "0 0 20px rgba(123, 97, 255, 0.3)",
        "glow-mint": "0 0 20px rgba(0, 255, 178, 0.3)",
        "focus-ring": "0 0 0 1px rgba(0, 212, 255, 0.5)",
      },
      borderRadius: {
        DEFAULT: "8px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
      },
      transitionDuration: {
        DEFAULT: "200ms",
        fast: "150ms",
        slow: "300ms",
      },
    },
  },
  plugins: [],
};

export default config;
