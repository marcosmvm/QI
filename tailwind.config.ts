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
        // Light Mode Base Colors
        "light-bg": "#FFFFFF",
        "light-bg-secondary": "#F8FAFC",
        "light-bg-tertiary": "#F1F5F9",

        // Legacy dark colors (keep for reference/transition)
        "deep-space": "#0F172A",
        "midnight-blue": "#1E293B",

        // Primary accent - Electric Cyan (unchanged)
        "electric-cyan": "#00D4FF",
        "cyan": {
          DEFAULT: "#00D4FF",
          light: "#33DDFF",
          dark: "#00A8CC",
        },

        // Secondary accent - Quantum Violet (unchanged)
        "quantum-violet": "#7B61FF",
        "violet": {
          DEFAULT: "#7B61FF",
          light: "#9580FF",
          dark: "#6248CC",
        },

        // Status colors (unchanged)
        "neon-mint": "#00FFB2",
        "success": {
          DEFAULT: "#10B981",
          light: "#34D399",
          dark: "#059669",
        },
        "energy-orange": "#F59E0B",
        "warning": {
          DEFAULT: "#F59E0B",
          light: "#FBBF24",
          dark: "#D97706",
        },
        "rose": {
          DEFAULT: "#EF4444",
          light: "#F87171",
          dark: "#DC2626",
        },

        // Text colors - Light Mode
        "silver": "#0F172A",
        "steel": "#64748B",
        "graphite": "#E2E8F0",

        // Semantic color mapping - Light Mode
        primary: {
          DEFAULT: "#00D4FF",
          foreground: "#FFFFFF",
          50: "#E6FAFF",
          100: "#CCF5FF",
          200: "#99EBFF",
          300: "#66E1FF",
          400: "#33D8FF",
          500: "#00D4FF",
          600: "#00A8CC",
          700: "#007A99",
        },
        secondary: {
          DEFAULT: "#7B61FF",
          foreground: "#FFFFFF",
        },
        background: "#FFFFFF",
        foreground: "#0F172A",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#0F172A",
        },
        border: "#E2E8F0",
        muted: {
          DEFAULT: "#F8FAFC",
          foreground: "#64748B",
        },
        accent: {
          DEFAULT: "#7B61FF",
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#0F172A",
        },
        input: "#F1F5F9",
        ring: "#00D4FF",
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
        },
      },
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-light": "linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)",
        "gradient-subtle-light": "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)",
        "glow-cyan": "radial-gradient(ellipse at top right, rgba(0, 212, 255, 0.08) 0%, transparent 50%)",
        "glow-violet": "radial-gradient(ellipse at bottom left, rgba(123, 97, 255, 0.06) 0%, transparent 50%)",
        "accent-gradient": "linear-gradient(90deg, #00D4FF, #7B61FF)",
      },
      boxShadow: {
        "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "md": "0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.06)",
        "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.05)",
        "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.08)",
        "card": "0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 4px 12px rgba(0, 0, 0, 0.1)",
        "glow-sm": "0 0 10px rgba(0, 212, 255, 0.15)",
        "glow-md": "0 0 15px rgba(0, 212, 255, 0.2)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 2s ease-in-out infinite",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "shimmer": "shimmer 2s infinite",
        "orbital": "orbital 20s linear infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(0, 212, 255, 0.2)" },
          "50%": { boxShadow: "0 0 30px rgba(0, 212, 255, 0.4)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(-10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "orbital": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      borderRadius: {
        "xl": "12px",
        "2xl": "16px",
        "3xl": "24px",
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
