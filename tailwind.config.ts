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
        // ============================================
        // BRAND BOARD v1.0 - PRIMARY PALETTE
        // ============================================

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

        // ============================================
        // SEMANTIC COLOR MAPPINGS
        // ============================================
        background: {
          DEFAULT: "#0A1628",
          elevated: "#1A2D4A",
          hover: "#2A3F5F",
        },

        border: {
          DEFAULT: "#2A3F5F",
          light: "#3D5A80",
          cyan: "rgba(0, 212, 255, 0.3)",
        },

        foreground: {
          DEFAULT: "#FFFFFF",
          secondary: "#E8E8ED",
          muted: "#9CA3AF",
        },

        // Semantic Status Colors
        primary: {
          DEFAULT: "#00D4FF",
          hover: "rgba(0, 212, 255, 0.9)",
          light: "rgba(0, 212, 255, 0.15)",
          foreground: "#0A1628",
        },
        secondary: {
          DEFAULT: "#7B61FF",
          light: "rgba(123, 97, 255, 0.15)",
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#00FFB2",
          light: "rgba(0, 255, 178, 0.15)",
          foreground: "#0A1628",
        },
        warning: {
          DEFAULT: "#FF6B35",
          light: "rgba(255, 107, 53, 0.15)",
          foreground: "#0A1628",
        },
        destructive: {
          DEFAULT: "#FF4757",
          light: "rgba(255, 71, 87, 0.15)",
          foreground: "#FFFFFF",
        },
        info: {
          DEFAULT: "#7B61FF",
          light: "rgba(123, 97, 255, 0.15)",
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

      // ============================================
      // TYPOGRAPHY
      // ============================================
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["Sora", "Inter", "-apple-system", "sans-serif"],
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
        // Glow effects
        "glow-cyan": "0 0 20px rgba(0, 212, 255, 0.25)",
        "glow-cyan-sm": "0 0 10px rgba(0, 212, 255, 0.2)",
        "glow-cyan-lg": "0 0 30px rgba(0, 212, 255, 0.35)",
        "glow-violet": "0 0 20px rgba(123, 97, 255, 0.25)",
        "glow-mint": "0 0 20px rgba(0, 255, 178, 0.25)",

        // Depth shadows
        "depth-sm": "0 1px 2px rgba(0, 0, 0, 0.3)",
        "depth-md": "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2)",
        "depth-lg": "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2)",
        "depth-xl": "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)",

        // Focus ring
        "focus-ring": "0 0 0 3px rgba(0, 212, 255, 0.2)",

        // Card hover
        "card-hover": "0 8px 25px -5px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 212, 255, 0.08)",
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
        "gradient-cyan-violet": "linear-gradient(135deg, #00D4FF 0%, #7B61FF 100%)",
        "gradient-dark": "linear-gradient(180deg, #0A1628 0%, #0D1B2A 100%)",
        "gradient-card": "linear-gradient(145deg, rgba(26, 45, 74, 0.8) 0%, rgba(26, 45, 74, 0.4) 100%)",
        "ambient-glow": `
          radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 212, 255, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse 60% 40% at 80% 50%, rgba(123, 97, 255, 0.05) 0%, transparent 50%)
        `,
      },
    },
  },
  plugins: [
    // Custom plugin for additional utilities
    function({ addUtilities }: { addUtilities: (utilities: Record<string, Record<string, string>>) => void }) {
      addUtilities({
        // Text gradient
        ".text-gradient": {
          "background": "linear-gradient(135deg, #00D4FF 0%, #7B61FF 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          "background-clip": "text",
        },
        // Metric value styling
        ".metric-value": {
          "font-variant-numeric": "tabular-nums",
          "letter-spacing": "-0.03em",
        },
        // Glass effect
        ".glass": {
          "background": "rgba(26, 45, 74, 0.6)",
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
