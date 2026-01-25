import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ============================================
// XGROWTHOS - ENHANCED BUTTON COMPONENT
// Brand Board v2.0 - Light/Dark Theme
// ============================================

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-pro-600 focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-emerald-pro-600 text-white dark:bg-xgrowth-500 dark:text-green-950 hover:shadow-glow-cyan hover:-translate-y-0.5 active:translate-y-0",
        destructive:
          "bg-alert-red text-light-text dark:text-white hover:bg-alert-red/90",
        outline:
          "border border-emerald-pro-600 text-emerald-pro-600 bg-transparent hover:bg-emerald-pro-600/10 hover:shadow-glow-cyan-sm",
        secondary:
          "bg-light-bg-secondary dark:bg-graphite text-light-text-secondary dark:text-silver hover:bg-emerald-pro-600/10 dark:hover:bg-slate hover:text-light-text dark:hover:text-white",
        ghost:
          "text-light-text-muted dark:text-steel hover:bg-light-bg-secondary dark:hover:bg-graphite/50 hover:text-light-text dark:hover:text-white",
        link:
          "text-emerald-pro-600 underline-offset-4 hover:underline",
        // Premium glow variant - pulsing glow effect
        glow:
          "bg-emerald-pro-600 text-white dark:bg-xgrowth-500 dark:text-green-950 btn-pulse-glow hover:-translate-y-0.5 active:translate-y-0 hover:shadow-glow-cyan-xl",
        // Premium shine variant - sweep animation
        shine:
          "bg-emerald-pro-600 text-white dark:bg-xgrowth-500 dark:text-green-950 btn-shine hover:shadow-glow-cyan-lg hover:-translate-y-0.5 active:translate-y-0",
        // Emerald glow variant (renamed from glowViolet)
        glowEmerald:
          "bg-emerald-pro-500 text-white dark:bg-xgrowth-400 dark:text-green-950 hover:shadow-glow-cyan-lg hover:-translate-y-0.5 active:translate-y-0",
        // Glass variant - glassmorphism button
        glass:
          "bg-light-bg-secondary dark:bg-midnight-blue/60 text-light-text dark:text-white border border-emerald-pro-600/20 backdrop-blur-sm hover:bg-emerald-pro-600/5 dark:hover:bg-midnight-blue/80 hover:border-emerald-pro-600/40 hover:shadow-glow-cyan-sm",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-12 px-8 py-3",
        xl: "h-14 px-10 py-4 text-base",
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
            <span className="spinner" />
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
