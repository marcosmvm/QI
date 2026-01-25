import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// ============================================
// XGROWTHOS - BADGE COMPONENT
// Brand Board v2.0 - Status Indicators
// ============================================

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors border",
  {
    variants: {
      variant: {
        default: "bg-steel/15 text-slate-900 dark:text-slate-200 border-steel/20",
        success: "bg-emerald-pro-400/15 text-emerald-pro-400 border-emerald-pro-400/20",
        warning: "bg-energy-orange/15 text-energy-orange border-energy-orange/20",
        error: "bg-alert-red/15 text-alert-red border-alert-red/20",
        info: "bg-emerald-pro-500/15 text-emerald-pro-500 border-emerald-pro-500/20",
        primary: "bg-emerald-pro-600/15 text-emerald-pro-600 border-emerald-pro-600/20",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px]",
        default: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  pulse?: boolean
}

function Badge({ className, variant, size, pulse, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {pulse && (
        <span
          className="w-1.5 h-1.5 rounded-full bg-current animate-pulse-dot"
        />
      )}
      {children}
    </div>
  )
}

export { Badge, badgeVariants }
