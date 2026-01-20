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
        // Primary backgrounds - deeper, richer navy
        "deep-space": "#080F1D",
        "midnight-blue": "#111D2E",
        "slate-900": "#0F172A",
        "slate-800": "#1E293B",

        // Legacy naming (for backward compatibility)
        "electric-cyan": "#3B82F6",
        "quantum-violet": "#8B5CF6",

        // New refined accent colors
        "azure": {
          DEFAULT: "#3B82F6",
          light: "#60A5FA",
          dark: "#2563EB",
        },
        "teal": {
          DEFAULT: "#14B8A6",
          light: "#2DD4BF",
          dark: "#0D9488",
        },
        "amber": {
          DEFAULT: "#F59E0B",
          light: "#FBBF24",
          dark: "#D97706",
        },

        // Status colors - professional tones
        "neon-mint": "#10B981",
        "emerald": {
          DEFAULT: "#10B981",
          light: "#34D399",
          dark: "#059669",
        },
        "energy-orange": "#F97316",
        "rose": {
          DEFAULT: "#F43F5E",
          light: "#FB7185",
          dark: "#E11D48",
        },

        // Text colors - refined hierarchy
        "silver": "#F1F5F9",
        "steel": "#94A3B8",
        "graphite": "#475569",
        "slate-400": "#94A3B8",
        "slate-500": "#64748B",
        "slate-600": "#475569",

        // Semantic color mapping
        primary: {
          DEFAULT: "#3B82F6",
          foreground: "#FFFFFF",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
        },
        secondary: {
          DEFAULT: "#8B5CF6",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#10B981",
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#F59E0B",
          foreground: "#0F172A",
        },
        destructive: {
          DEFAULT: "#F43F5E",
          foreground: "#FFFFFF",
        },
        background: "#080F1D",
        foreground: "#F1F5F9",
        card: {
          DEFAULT: "#111D2E",
          foreground: "#F1F5F9",
        },
        border: "rgba(148, 163, 184, 0.15)",
        muted: {
          DEFAULT: "#1E293B",
          foreground: "#94A3B8",
        },
        accent: {
          DEFAULT: "#3B82F6",
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#111D2E",
          foreground: "#F1F5F9",
        },
        input: "rgba(148, 163, 184, 0.15)",
        ring: "#3B82F6",
      },
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-quantum": "linear-gradient(160deg, #080F1D 0%, #111D2E 40%, #0F172A 100%)",
        "gradient-subtle": "linear-gradient(180deg, #0F172A 0%, #080F1D 100%)",
        "gradient-card": "linear-gradient(135deg, rgba(17, 29, 46, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)",
        "glow-cyan": "radial-gradient(ellipse at top right, rgba(59, 130, 246, 0.08) 0%, transparent 50%)",
        "glow-teal": "radial-gradient(ellipse at bottom left, rgba(20, 184, 166, 0.06) 0%, transparent 50%)",
        "glow-violet": "radial-gradient(ellipse at center, rgba(139, 92, 246, 0.06) 0%, transparent 60%)",
        "accent-gradient": "linear-gradient(90deg, #3B82F6, #14B8A6)",
        "accent-gradient-vertical": "linear-gradient(180deg, #3B82F6, #14B8A6)",
      },
      boxShadow: {
        "glow-sm": "0 0 15px rgba(59, 130, 246, 0.15)",
        "glow-md": "0 0 25px rgba(59, 130, 246, 0.2)",
        "glow-lg": "0 0 40px rgba(59, 130, 246, 0.25)",
        "glow-teal": "0 0 20px rgba(20, 184, 166, 0.2)",
        "glow-violet": "0 0 20px rgba(139, 92, 246, 0.2)",
        "card": "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2)",
        "card-hover": "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2)",
        "inner-glow": "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
      },
      animation: {
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 2s ease-in-out infinite",
        "fade-in": "fade-in 0.4s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
        "slide-in-right": "slide-in-right 0.4s ease-out",
        "shimmer": "shimmer 2s infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(59, 130, 246, 0.2)" },
          "50%": { boxShadow: "0 0 30px rgba(59, 130, 246, 0.35)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(-8px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
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
