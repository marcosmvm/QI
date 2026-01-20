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
        // Quantum Insights Brand Colors (from CLAUDE.md)
        "deep-space": "#0A1628",
        "midnight-blue": "#1A2D4A",
        "slate-900": "#0A1628",
        "slate-800": "#1A2D4A",

        // Primary accent - Electric Cyan
        "electric-cyan": "#00D4FF",
        "cyan": {
          DEFAULT: "#00D4FF",
          light: "#33DDFF",
          dark: "#00A8CC",
        },

        // Secondary accent - Quantum Violet
        "quantum-violet": "#7B61FF",
        "violet": {
          DEFAULT: "#7B61FF",
          light: "#9580FF",
          dark: "#6248CC",
        },

        // Status colors
        "neon-mint": "#00FFB2",
        "success": {
          DEFAULT: "#00FFB2",
          light: "#33FFC4",
          dark: "#00CC8E",
        },
        "energy-orange": "#FF6B35",
        "warning": {
          DEFAULT: "#FF6B35",
          light: "#FF8A5C",
          dark: "#CC5529",
        },
        "rose": {
          DEFAULT: "#ef4444",
          light: "#f87171",
          dark: "#dc2626",
        },

        // Text colors - High contrast
        "silver": "#E8EDF5",
        "steel": "#94A3B8",
        "graphite": "#334155",
        "slate-400": "#94A3B8",
        "slate-500": "#64748b",
        "slate-600": "#475569",

        // Semantic color mapping
        primary: {
          DEFAULT: "#00D4FF",
          foreground: "#0A1628",
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
          foreground: "#ffffff",
        },
        background: "#0A1628",
        foreground: "#E8EDF5",
        card: {
          DEFAULT: "#1A2D4A",
          foreground: "#E8EDF5",
        },
        border: "#334155",
        muted: {
          DEFAULT: "#1A2D4A",
          foreground: "#94A3B8",
        },
        accent: {
          DEFAULT: "#7B61FF",
          foreground: "#ffffff",
        },
        popover: {
          DEFAULT: "#1A2D4A",
          foreground: "#E8EDF5",
        },
        input: "rgba(255, 255, 255, 0.1)",
        ring: "#00D4FF",
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#ffffff",
        },
      },
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-quantum": "linear-gradient(160deg, #0A1628 0%, #1A2D4A 50%, #0A1628 100%)",
        "gradient-subtle": "linear-gradient(180deg, #0A1628 0%, #1A2D4A 100%)",
        "gradient-card": "linear-gradient(145deg, rgba(26, 45, 74, 0.95) 0%, rgba(10, 22, 40, 0.98) 100%)",
        "glow-cyan": "radial-gradient(ellipse at top right, rgba(0, 212, 255, 0.15) 0%, transparent 50%)",
        "glow-violet": "radial-gradient(ellipse at bottom left, rgba(123, 97, 255, 0.1) 0%, transparent 50%)",
        "glow-mint": "radial-gradient(ellipse at center, rgba(0, 255, 178, 0.08) 0%, transparent 60%)",
        "accent-gradient": "linear-gradient(90deg, #00D4FF, #7B61FF)",
        "accent-gradient-vertical": "linear-gradient(180deg, #00D4FF, #7B61FF)",
        "button-primary": "linear-gradient(135deg, #00D4FF 0%, #00A8CC 100%)",
        "button-secondary": "linear-gradient(135deg, #7B61FF 0%, #6248CC 100%)",
      },
      boxShadow: {
        "sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        "lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
        "xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        "glow-sm": "0 0 15px rgba(0, 212, 255, 0.2)",
        "glow-md": "0 0 25px rgba(0, 212, 255, 0.3)",
        "glow-lg": "0 0 40px rgba(0, 212, 255, 0.35)",
        "glow-cyan": "0 0 20px rgba(0, 212, 255, 0.3)",
        "glow-violet": "0 0 20px rgba(123, 97, 255, 0.25)",
        "glow-mint": "0 0 20px rgba(0, 255, 178, 0.25)",
        "card": "0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        "card-hover": "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 212, 255, 0.15)",
        "inner-glow": "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
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
