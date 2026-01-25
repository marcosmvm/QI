import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ============================================
        // NEW BRAND SYSTEM - Greens + Blues
        // ============================================

        // Background Colors (CSS Variable mapped)
        bg: {
          DEFAULT: "var(--bg)",
          surface: "var(--bg-surface)",
          subtle: "var(--bg-surface-subtle)",
        },

        // Text Colors (CSS Variable mapped)
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },

        // Primary Greens
        primary: {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          800: "#166534",
          900: "#14532D",
          950: "#052E16",
          DEFAULT: "#059669",
          light: "#34D399",
          dark: "#047857",
        },

        // Accent Blues
        accent: {
          50: "#F0F9FF",
          100: "#E0F2FE",
          200: "#BAE6FD",
          300: "#7DD3FC",
          400: "#38BDF8",
          500: "#0EA5E9",
          600: "#0284C7",
          700: "#0369A1",
          800: "#075985",
          900: "#0C4A6E",
          DEFAULT: "#0EA5E9",
          light: "#7DD3FC",
          dark: "#0369A1",
        },

        // Status Colors
        success: {
          DEFAULT: "#22C55E",
          light: "rgba(34, 197, 94, 0.15)",
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#F59E0B",
          light: "rgba(245, 158, 11, 0.15)",
          foreground: "#0F172A",
        },
        error: {
          DEFAULT: "#EF4444",
          light: "rgba(239, 68, 68, 0.15)",
          foreground: "#FFFFFF",
        },
        info: {
          DEFAULT: "#0EA5E9",
          light: "rgba(14, 165, 233, 0.15)",
          foreground: "#FFFFFF",
        },

        // Border Colors
        border: {
          DEFAULT: "var(--border-default)",
          subtle: "var(--border-subtle)",
        },

        // Component-specific (shadcn compatibility)
        background: "var(--bg)",
        foreground: "var(--text-primary)",
        card: {
          DEFAULT: "var(--bg-surface)",
          foreground: "var(--text-primary)",
        },
        input: {
          DEFAULT: "var(--bg-surface)",
          border: "var(--border-default)",
        },
        muted: {
          DEFAULT: "var(--bg-surface-subtle)",
          foreground: "var(--text-muted)",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
        ring: "#059669",

        // Legacy color mappings for backward compatibility
        "emerald-pro": {
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
        },
        "xgrowth": {
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          800: "#166534",
          900: "#14532D",
          950: "#052E16",
        },
        "deep-space": "#020617",
        "midnight-blue": "#0F172A",
        graphite: "#334155",
        steel: "#64748B",
        "energy-orange": "#F59E0B",
        "alert-red": "#EF4444",
        "cyan-dark": "#0369A1",
        "cyan-light": "#38BDF8",
      },

      // ============================================
      // TYPOGRAPHY
      // ============================================
      fontFamily: {
        sans: ["var(--font-figtree)", "var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["var(--font-sora)", "var(--font-figtree)", "-apple-system", "sans-serif"],
        sora: ["var(--font-sora)", "sans-serif"],
        figtree: ["var(--font-figtree)", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },

      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1.1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
      },

      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        normal: "0",
        wide: "0.05em",
      },

      // ============================================
      // SHADOWS
      // ============================================
      boxShadow: {
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow-md)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        "glow-green": "0 0 20px rgba(5, 150, 105, 0.25)",
        "glow-green-lg": "0 0 40px rgba(5, 150, 105, 0.3)",
        "glow-blue": "0 0 20px rgba(14, 165, 233, 0.25)",
        "glow-blue-lg": "0 0 40px rgba(14, 165, 233, 0.3)",
      },

      // ============================================
      // BORDER RADIUS
      // ============================================
      borderRadius: {
        DEFAULT: "8px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
      },

      // ============================================
      // ANIMATIONS
      // ============================================
      transitionDuration: {
        DEFAULT: "200ms",
        fast: "150ms",
        slow: "300ms",
      },

      transitionTimingFunction: {
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },

      animation: {
        "fade-in-up": "fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        shimmer: "shimmer 1.5s ease-in-out infinite",
      },

      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },

      // ============================================
      // BACKGROUND GRADIENTS
      // ============================================
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(135deg, #059669 0%, #0EA5E9 100%)",
        "gradient-primary-dark": "linear-gradient(135deg, #22C55E 0%, #38BDF8 100%)",
        "hero-light": "linear-gradient(180deg, #ECFDF5 0%, #F9FBFF 50%, #F0F9FF 100%)",
        "hero-dark": "linear-gradient(180deg, rgba(5, 150, 105, 0.1) 0%, #020617 50%, rgba(14, 165, 233, 0.05) 100%)",
      },

      // ============================================
      // SPACING
      // ============================================
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },

      // ============================================
      // Z-INDEX
      // ============================================
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
    },
  },
  plugins: [
    function({ addUtilities }: { addUtilities: (utilities: Record<string, Record<string, string>>) => void }) {
      addUtilities({
        ".text-gradient": {
          background: "linear-gradient(135deg, #059669 0%, #0EA5E9 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        },
        ".metric-value": {
          "font-variant-numeric": "tabular-nums",
          "letter-spacing": "-0.03em",
        },
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      });
    },
  ],
};

export default config;
