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
        // Primary backgrounds
        "deep-space": "#0A1628",
        "midnight-blue": "#1A2D4A",

        // Accent colors
        "electric-cyan": "#00D4FF",
        "quantum-violet": "#7B61FF",

        // Status colors
        "neon-mint": "#00FFB2",
        "energy-orange": "#FF6B35",

        // Text colors
        "silver": "#E8EDF5",
        "steel": "#94A3B8",
        "graphite": "#334155",

        // Semantic color mapping
        primary: {
          DEFAULT: "#00D4FF",
          foreground: "#0A1628",
        },
        secondary: {
          DEFAULT: "#7B61FF",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#00FFB2",
          foreground: "#0A1628",
        },
        warning: {
          DEFAULT: "#FF6B35",
          foreground: "#FFFFFF",
        },
        background: "#0A1628",
        foreground: "#FFFFFF",
        card: {
          DEFAULT: "#1A2D4A",
          foreground: "#FFFFFF",
        },
        border: "#334155",
        muted: {
          DEFAULT: "#1A2D4A",
          foreground: "#94A3B8",
        },
        accent: {
          DEFAULT: "#00D4FF",
          foreground: "#0A1628",
        },
      },
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-quantum": "linear-gradient(135deg, #0A1628 0%, #1A2D4A 50%, #0A1628 100%)",
        "glow-cyan": "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)",
        "glow-violet": "radial-gradient(circle, rgba(123,97,255,0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        "glow-sm": "0 0 10px rgba(0, 212, 255, 0.3)",
        "glow-md": "0 0 20px rgba(0, 212, 255, 0.4)",
        "glow-lg": "0 0 30px rgba(0, 212, 255, 0.5)",
        "glow-violet": "0 0 20px rgba(123, 97, 255, 0.4)",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 10px rgba(0, 212, 255, 0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(0, 212, 255, 0.6)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
