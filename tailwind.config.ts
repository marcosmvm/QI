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
        // XGROWTHOS BRAND PALETTE
        // ============================================

        // Primary Brand Colors (Green)
        "xgrowth": {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",  // Primary dark mode accent
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        "emerald-pro": {
          400: "#34d399",
          500: "#10b981",
          600: "#059669",  // Primary light mode accent
          700: "#047857",
        },

        // ============================================
        // LIGHT MODE COLORS (Default)
        // ============================================

        // Light backgrounds
        "light-bg": "#ffffff",
        "light-bg-secondary": "#f0fdf4",
        "light-bg-elevated": "#ffffff",
        "light-surface": "#f8fafc",

        // Light text
        "light-text": "#0f172a",
        "light-text-secondary": "#334155",
        "light-text-muted": "#64748b",

        // ============================================
        // DARK MODE COLORS (Legacy support)
        // ============================================

        // Dark backgrounds
        "deep-space": "#080c08",
        "midnight-blue": "#0a0f0a",
        "graphite": "#1a2e1a",
        "slate": "#2d4a2d",

        // Dark text
        "white": "#FFFFFF",
        "silver": "#E8E8ED",
        "steel": "#9CA3AF",
        "muted-text": "#6B7280",

        // Legacy accent colors (for backward compatibility)
        "electric-cyan": "#22c55e",
        "quantum-violet": "#059669",
        "neon-mint": "#4ade80",
        "energy-orange": "#FF6B35",
        "alert-red": "#FF4757",

        // ============================================
        // SEMANTIC COLOR MAPPINGS
        // ============================================
        background: {
          DEFAULT: "#ffffff",
          elevated: "#f8fafc",
          hover: "#f0fdf4",
        },

        border: {
          DEFAULT: "#e2e8f0",
          light: "#f1f5f9",
          green: "rgba(34, 197, 94, 0.3)",
        },

        foreground: {
          DEFAULT: "#0f172a",
          secondary: "#334155",
          muted: "#64748b",
        },

        // Semantic Status Colors
        primary: {
          DEFAULT: "#059669",
          hover: "#047857",
          light: "rgba(5, 150, 105, 0.15)",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#22c55e",
          light: "rgba(34, 197, 94, 0.15)",
          foreground: "#ffffff",
        },
        success: {
          DEFAULT: "#22c55e",
          light: "rgba(34, 197, 94, 0.15)",
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: "#FF6B35",
          light: "rgba(255, 107, 53, 0.15)",
          foreground: "#0f172a",
        },
        destructive: {
          DEFAULT: "#FF4757",
          light: "rgba(255, 71, 87, 0.15)",
          foreground: "#ffffff",
        },
        info: {
          DEFAULT: "#059669",
          light: "rgba(5, 150, 105, 0.15)",
          foreground: "#ffffff",
        },

        // Component-specific
        card: {
          DEFAULT: "#ffffff",
          hover: "#f8fafc",
          foreground: "#0f172a",
        },
        input: {
          DEFAULT: "#ffffff",
          focus: "#f0fdf4",
          border: "#e2e8f0",
        },
        muted: {
          DEFAULT: "#f8fafc",
          foreground: "#64748b",
        },

        ring: "#059669",
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
        // Body Text
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],  // 10px
        xs: ["0.75rem", { lineHeight: "1rem" }],          // 12px
        sm: ["0.875rem", { lineHeight: "1.25rem" }],      // 14px
        base: ["1rem", { lineHeight: "1.5rem" }],         // 16px
        lg: ["1.125rem", { lineHeight: "1.75rem" }],      // 18px

        // Headings
        xl: ["1.25rem", { lineHeight: "1.75rem" }],       // 20px - h5
        "2xl": ["1.5rem", { lineHeight: "2rem" }],        // 24px - h4/h3
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],   // 30px - h2
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],     // 36px - h1
        "5xl": ["3rem", { lineHeight: "1.1" }],           // 48px - hero
        "6xl": ["3.75rem", { lineHeight: "1" }],          // 60px - hero large

        // Metric Numbers (Dashboard)
        "metric-sm": ["1.25rem", { lineHeight: "1.5rem", fontWeight: "700" }],
        "metric-md": ["1.5rem", { lineHeight: "1.75rem", fontWeight: "700" }],
        "metric-lg": ["2.25rem", { lineHeight: "2.5rem", fontWeight: "700" }],
        "metric-xl": ["3rem", { lineHeight: "1", fontWeight: "700" }],
      },

      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },

      letterSpacing: {
        tighter: "-0.03em",
        tight: "-0.02em",
        normal: "0",
        wide: "0.05em",
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
      // SHADOWS & EFFECTS
      // ============================================
      boxShadow: {
        // Light mode shadows
        "soft": "0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)",
        "soft-md": "0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.06)",
        "soft-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.06)",
        "soft-xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.06)",

        // Green glow effects (for dark mode)
        "glow-green": "0 0 20px rgba(34, 197, 94, 0.25)",
        "glow-green-sm": "0 0 10px rgba(34, 197, 94, 0.2)",
        "glow-green-lg": "0 0 30px rgba(34, 197, 94, 0.35)",
        "glow-green-xl": "0 0 50px rgba(34, 197, 94, 0.5), 0 0 100px rgba(34, 197, 94, 0.2)",
        "glow-emerald": "0 0 20px rgba(5, 150, 105, 0.25)",
        "glow-emerald-lg": "0 0 30px rgba(5, 150, 105, 0.35)",

        // Legacy cyan glow (mapped to green)
        "glow-cyan": "0 0 20px rgba(34, 197, 94, 0.25)",
        "glow-cyan-sm": "0 0 10px rgba(34, 197, 94, 0.2)",
        "glow-cyan-lg": "0 0 30px rgba(34, 197, 94, 0.35)",
        "glow-cyan-xl": "0 0 50px rgba(34, 197, 94, 0.5), 0 0 100px rgba(34, 197, 94, 0.2)",
        "glow-violet": "0 0 20px rgba(5, 150, 105, 0.25)",
        "glow-violet-lg": "0 0 30px rgba(5, 150, 105, 0.35)",
        "glow-mint": "0 0 20px rgba(74, 222, 128, 0.25)",
        "glow-mint-lg": "0 0 30px rgba(74, 222, 128, 0.35)",

        // Depth shadows (light mode)
        "depth-sm": "0 1px 2px rgba(0, 0, 0, 0.05)",
        "depth-md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
        "depth-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05)",
        "depth-xl": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",

        // Focus ring
        "focus-ring": "0 0 0 3px rgba(5, 150, 105, 0.2)",

        // Card effects - light mode
        "card-hover": "0 8px 25px -5px rgba(0, 0, 0, 0.1), 0 0 20px rgba(5, 150, 105, 0.08)",
        "card-glow": "0 0 0 1px rgba(5, 150, 105, 0.15), 0 8px 30px -5px rgba(0, 0, 0, 0.1)",
        "card-glow-active": "0 0 0 1px rgba(5, 150, 105, 0.4), 0 0 30px rgba(5, 150, 105, 0.15), 0 12px 40px -10px rgba(0, 0, 0, 0.15)",

        // Inner glow for buttons
        "inner-glow-green": "inset 0 1px 0 0 rgba(34, 197, 94, 0.2)",
        "inner-glow-cyan": "inset 0 1px 0 0 rgba(34, 197, 94, 0.2)",
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
      // ANIMATIONS & TRANSITIONS
      // ============================================
      transitionDuration: {
        DEFAULT: "200ms",
        fast: "150ms",
        slow: "300ms",
        slower: "500ms",
      },

      transitionTimingFunction: {
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
      },

      animation: {
        // Skeleton shimmer
        "shimmer": "shimmer 1.5s ease-in-out infinite",
        // Fade in up
        "fade-in-up": "fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        // Scale in
        "scale-in": "scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        // Subtle float
        "float": "float 6s ease-in-out infinite",
        // Pulse dot (for live badges)
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        // Spin (for loaders)
        "spin-slow": "spin 1.5s linear infinite",
        // Gradient orb floating
        "orb-float": "orb-float 20s ease-in-out infinite",
        "orb-float-reverse": "orb-float 25s ease-in-out infinite reverse",
        "orb-pulse": "orb-pulse 8s ease-in-out infinite",
        // Button shine sweep
        "shine": "shine 3s ease-in-out infinite",
        // Glow pulse for CTAs
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        // Chart bar grow
        "bar-grow": "bar-grow 0.6s ease-out forwards",
      },

      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.2)" },
        },
        "orb-float": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "25%": { transform: "translate(30px, 30px) scale(1.05)" },
          "50%": { transform: "translate(15px, -20px) scale(0.95)" },
          "75%": { transform: "translate(-20px, 15px) scale(1.02)" },
        },
        "orb-pulse": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        shine: {
          "0%": { left: "-100%" },
          "50%, 100%": { left: "100%" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)" },
          "50%": { boxShadow: "0 0 35px rgba(34, 197, 94, 0.5)" },
        },
        "bar-grow": {
          "0%": { transform: "scaleY(0)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(1)", transformOrigin: "bottom" },
        },
      },

      // ============================================
      // BACKDROP BLUR
      // ============================================
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        DEFAULT: "8px",
        md: "12px",
        lg: "16px",
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

      // ============================================
      // BACKGROUND IMAGE (GRADIENTS)
      // ============================================
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        // XGrowthOS gradients
        "gradient-green": "linear-gradient(135deg, #059669 0%, #10b981 100%)",
        "gradient-green-dark": "linear-gradient(135deg, #22c55e 0%, #4ade80 100%)",
        // Legacy (mapped to green)
        "gradient-cyan-violet": "linear-gradient(135deg, #059669 0%, #10b981 100%)",
        // Light backgrounds
        "gradient-light": "linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)",
        "gradient-card-light": "linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 253, 244, 0.6) 100%)",
        // Dark backgrounds
        "gradient-dark": "linear-gradient(180deg, #080c08 0%, #0a0f0a 100%)",
        "gradient-card": "linear-gradient(145deg, rgba(26, 46, 26, 0.8) 0%, rgba(26, 46, 26, 0.4) 100%)",
        // Ambient glows
        "ambient-glow": `
          radial-gradient(ellipse 80% 50% at 50% -20%, rgba(5, 150, 105, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse 60% 40% at 80% 50%, rgba(34, 197, 94, 0.05) 0%, transparent 50%)
        `,
        "ambient-glow-light": `
          radial-gradient(ellipse 80% 50% at 50% -20%, rgba(5, 150, 105, 0.05) 0%, transparent 50%),
          radial-gradient(ellipse 60% 40% at 80% 50%, rgba(34, 197, 94, 0.03) 0%, transparent 50%)
        `,
      },
    },
  },
  plugins: [
    // Custom plugin for additional utilities
    function({ addUtilities }: { addUtilities: (utilities: Record<string, Record<string, string>>) => void }) {
      addUtilities({
        // Text gradient (green)
        ".text-gradient": {
          "background": "linear-gradient(135deg, #059669 0%, #10b981 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        },
        ".text-gradient-green": {
          "background": "linear-gradient(135deg, #22c55e 0%, #4ade80 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        },
        // Metric value styling
        ".metric-value": {
          "font-variant-numeric": "tabular-nums",
          "letter-spacing": "-0.03em",
        },
        // Glass effect - light mode
        ".glass": {
          "background": "rgba(255, 255, 255, 0.8)",
          "backdrop-filter": "blur(8px)",
          "-webkit-backdrop-filter": "blur(8px)",
        },
        ".glass-dark": {
          "background": "rgba(26, 46, 26, 0.6)",
          "backdrop-filter": "blur(8px)",
          "-webkit-backdrop-filter": "blur(8px)",
        },
        // Hide scrollbar
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      })
    },
  ],
};

export default config;
