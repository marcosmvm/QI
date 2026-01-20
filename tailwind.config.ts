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
        // GoHighLevel-inspired primary backgrounds
        "deep-space": "#07223d",
        "midnight-blue": "#0a2e52",
        "slate-900": "#031631",
        "slate-800": "#0d3a66",

        // Primary accent - Vibrant blue (GoHighLevel blue)
        "primary-blue": {
          DEFAULT: "#0b81ff",
          light: "#3d9aff",
          dark: "#0066cc",
        },

        // Secondary accent - Golden yellow
        "accent-yellow": {
          DEFAULT: "#ffb902",
          light: "#ffc933",
          dark: "#e6a600",
        },

        // Legacy naming (backward compatibility)
        "electric-cyan": "#0b81ff",
        "quantum-violet": "#6366f1",
        "azure": {
          DEFAULT: "#0b81ff",
          light: "#3d9aff",
          dark: "#0066cc",
        },
        "teal": {
          DEFAULT: "#14b8a6",
          light: "#2dd4bf",
          dark: "#0d9488",
        },
        "amber": {
          DEFAULT: "#ffb902",
          light: "#ffc933",
          dark: "#e6a600",
        },

        // Status colors - Clear, professional
        "neon-mint": "#22c55e",
        "emerald": {
          DEFAULT: "#22c55e",
          light: "#4ade80",
          dark: "#16a34a",
        },
        "energy-orange": "#f97316",
        "rose": {
          DEFAULT: "#ef4444",
          light: "#f87171",
          dark: "#dc2626",
        },

        // Text colors - High contrast
        "silver": "#f8fafc",
        "steel": "#94a3b8",
        "graphite": "#334155",
        "slate-400": "#94a3b8",
        "slate-500": "#64748b",
        "slate-600": "#475569",

        // Semantic color mapping
        primary: {
          DEFAULT: "#0b81ff",
          foreground: "#ffffff",
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#3d9aff",
          500: "#0b81ff",
          600: "#0066cc",
          700: "#0052a3",
        },
        secondary: {
          DEFAULT: "#ffb902",
          foreground: "#07223d",
        },
        success: {
          DEFAULT: "#22c55e",
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: "#f97316",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
        background: "#07223d",
        foreground: "#f8fafc",
        card: {
          DEFAULT: "#0a2e52",
          foreground: "#f8fafc",
        },
        border: "rgba(255, 255, 255, 0.1)",
        muted: {
          DEFAULT: "#0d3a66",
          foreground: "#94a3b8",
        },
        accent: {
          DEFAULT: "#ffb902",
          foreground: "#07223d",
        },
        popover: {
          DEFAULT: "#0a2e52",
          foreground: "#f8fafc",
        },
        input: "rgba(255, 255, 255, 0.1)",
        ring: "#0b81ff",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        "open-sans": ["Open Sans", "sans-serif"],
        sora: ["Poppins", "sans-serif"],
        inter: ["Open Sans", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-quantum": "linear-gradient(160deg, #031631 0%, #07223d 40%, #0a2e52 100%)",
        "gradient-subtle": "linear-gradient(180deg, #07223d 0%, #031631 100%)",
        "gradient-card": "linear-gradient(145deg, rgba(10, 46, 82, 0.95) 0%, rgba(7, 34, 61, 0.98) 100%)",
        "glow-blue": "radial-gradient(ellipse at top right, rgba(11, 129, 255, 0.1) 0%, transparent 50%)",
        "glow-yellow": "radial-gradient(ellipse at bottom left, rgba(255, 185, 2, 0.08) 0%, transparent 50%)",
        "glow-cyan": "radial-gradient(ellipse at top right, rgba(11, 129, 255, 0.1) 0%, transparent 50%)",
        "glow-teal": "radial-gradient(ellipse at bottom left, rgba(20, 184, 166, 0.06) 0%, transparent 50%)",
        "glow-violet": "radial-gradient(ellipse at center, rgba(99, 102, 241, 0.06) 0%, transparent 60%)",
        "accent-gradient": "linear-gradient(90deg, #0b81ff, #ffb902)",
        "accent-gradient-vertical": "linear-gradient(180deg, #0b81ff, #ffb902)",
        "button-primary": "linear-gradient(135deg, #0b81ff 0%, #0066cc 100%)",
        "button-accent": "linear-gradient(135deg, #ffb902 0%, #e6a600 100%)",
      },
      boxShadow: {
        "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
        "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        "glow-sm": "0 0 15px rgba(11, 129, 255, 0.15)",
        "glow-md": "0 0 25px rgba(11, 129, 255, 0.2)",
        "glow-lg": "0 0 40px rgba(11, 129, 255, 0.25)",
        "glow-blue": "0 0 20px rgba(11, 129, 255, 0.25)",
        "glow-yellow": "0 0 20px rgba(255, 185, 2, 0.25)",
        "glow-teal": "0 0 20px rgba(20, 184, 166, 0.2)",
        "glow-violet": "0 0 20px rgba(99, 102, 241, 0.2)",
        "card": "0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 10px 20px -5px rgba(0, 0, 0, 0.2), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
        "inner-glow": "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 2s ease-in-out infinite",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "shimmer": "shimmer 2s infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(11, 129, 255, 0.2)" },
          "50%": { boxShadow: "0 0 25px rgba(11, 129, 255, 0.4)" },
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
