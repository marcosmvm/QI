import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ============================================
// XGROWTHOS - BUTTON COMPONENT
// New Brand System: Greens + Blues
// ============================================

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary - Gradient CTAs (main actions)
        default:
          "bg-gradient-to-r from-emerald-600 to-sky-500 text-white shadow-sm hover:from-emerald-700 hover:to-sky-600 hover:-translate-y-0.5 active:translate-y-0 dark:from-emerald-500 dark:to-sky-400 dark:hover:from-emerald-400 dark:hover:to-sky-300",
        // Destructive - Red actions
        destructive:
          "bg-red-500 text-white hover:bg-red-600 dark:bg-red-500 dark:text-slate-950",
        // Outline - Secondary actions
        outline:
          "border border-emerald-200 text-emerald-700 bg-transparent hover:bg-emerald-50 dark:border-emerald-500/60 dark:text-emerald-300 dark:hover:bg-emerald-500/10",
        // Secondary - Subtle actions
        secondary:
          "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",
        // Ghost - Minimal visual emphasis
        ghost:
          "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800",
        // Link - Text only
        link:
          "text-emerald-600 underline-offset-4 hover:underline dark:text-emerald-400",
        // Glow - Enhanced gradient with glow effect
        glow:
          "bg-gradient-to-r from-emerald-600 to-sky-500 text-white shadow-sm hover:shadow-glow-green hover:-translate-y-0.5 active:translate-y-0 dark:from-emerald-500 dark:to-sky-400",
        // Glass - Glassmorphism effect
        glass:
          "bg-white/80 dark:bg-slate-900/60 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-900/80 hover:border-emerald-300 dark:hover:border-emerald-500/50",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-11 px-6 py-3",
        xl: "h-12 px-8 py-3 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
