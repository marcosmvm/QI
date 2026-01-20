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
        // New Modern Light Theme Colors
        background: {
          DEFAULT: "#F5F7FA",
          secondary: "#FFFFFF",
          tertiary: "#EEF2F6",
          card: "#FFFFFF",
        },

        // Primary - Fresh Green
        primary: {
          DEFAULT: "#4ADE80",
          light: "#86EFAC",
          dark: "#22C55E",
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          foreground: "#FFFFFF",
        },

        // Secondary - Navy Blue
        secondary: {
          DEFAULT: "#1E3A5F",
          light: "#2D4A6F",
          dark: "#0F2847",
          foreground: "#FFFFFF",
        },

        // Accent - Soft Blue
        accent: {
          DEFAULT: "#60A5FA",
          light: "#93C5FD",
          dark: "#3B82F6",
          foreground: "#FFFFFF",
        },

        // Legacy brand colors (kept for compatibility)
        "electric-cyan": "#00D4FF",
        "cyan": {
          DEFAULT: "#00D4FF",
          light: "#33DDFF",
          dark: "#00A8CC",
        },
        "quantum-violet": "#7B61FF",
        "violet": {
          DEFAULT: "#7B61FF",
          light: "#9580FF",
          dark: "#6248CC",
        },

        // Status colors
        success: {
          DEFAULT: "#22C55E",
          light: "#86EFAC",
          dark: "#16A34A",
        },
        warning: {
          DEFAULT: "#F59E0B",
          light: "#FCD34D",
          dark: "#D97706",
        },
        error: {
          DEFAULT: "#EF4444",
          light: "#FCA5A5",
          dark: "#DC2626",
        },
        info: {
          DEFAULT: "#3B82F6",
          light: "#93C5FD",
          dark: "#2563EB",
        },

        // Text colors
        "text-primary": "#1E293B",
        "text-secondary": "#475569",
        "text-muted": "#94A3B8",
        "text-light": "#CBD5E1",

        // Border colors
        border: {
          DEFAULT: "#E2E8F0",
          light: "#F1F5F9",
          dark: "#CBD5E1",
        },

        // Special colors from design
        navy: {
          DEFAULT: "#1E3A5F",
          light: "#2D4A6F",
          dark: "#0F2847",
        },
        cream: "#FDF8F3",
        peach: "#FECACA",
        mint: "#D1FAE5",

        // Legacy semantic colors
        "deep-space": "#0F172A",
        "midnight-blue": "#1E293B",
        silver: "#1E293B",
        steel: "#94A3B8",
        graphite: "#E2E8F0",
        "neon-mint": "#22C55E",
        "energy-orange": "#F59E0B",
        rose: {
          DEFAULT: "#EF4444",
          light: "#F87171",
          dark: "#DC2626",
        },

        // Card and popover
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#1E293B",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#1E293B",
        },
        muted: {
          DEFAULT: "#F5F7FA",
          foreground: "#64748B",
        },
        input: "#F1F5F9",
        ring: "#4ADE80",
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
        "gradient-light": "linear-gradient(180deg, #FFFFFF 0%, #F5F7FA 100%)",
        "gradient-subtle": "linear-gradient(180deg, #F5F7FA 0%, #FFFFFF 100%)",
        "gradient-card": "linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)",
        "gradient-primary": "linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)",
        "gradient-secondary": "linear-gradient(135deg, #1E3A5F 0%, #2D4A6F 100%)",
        "gradient-accent": "linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)",
        "glow-green": "radial-gradient(ellipse at top right, rgba(74, 222, 128, 0.1) 0%, transparent 50%)",
        "glow-blue": "radial-gradient(ellipse at bottom left, rgba(96, 165, 250, 0.08) 0%, transparent 50%)",
      },
      boxShadow: {
        "xs": "0 1px 2px rgba(0, 0, 0, 0.04)",
        "sm": "0 2px 4px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)",
        "md": "0 4px 8px rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.06)",
        "lg": "0 8px 16px rgba(0, 0, 0, 0.06), 0 4px 8px rgba(0, 0, 0, 0.04)",
        "xl": "0 16px 32px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.04)",
        "card": "0 2px 8px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.02)",
        "card-hover": "0 4px 12px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.04)",
        "primary": "0 4px 12px rgba(74, 222, 128, 0.3)",
        "secondary": "0 4px 12px rgba(30, 58, 95, 0.2)",
        "glow-sm": "0 0 10px rgba(74, 222, 128, 0.15)",
        "glow-md": "0 0 15px rgba(74, 222, 128, 0.2)",
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "count-up": "count-up 0.5s ease-out",
        "pulse-subtle": "pulse-subtle 2s ease-in-out infinite",
        "bounce-soft": "bounce-soft 2s ease-in-out infinite",
      },
      keyframes: {
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
        "count-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.1)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      borderRadius: {
        "xl": "12px",
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "24px",
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
      },
    },
  },
  plugins: [],
};

export default config;
