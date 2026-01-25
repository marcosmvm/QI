import { cn } from "@/lib/utils"

// ============================================
// XGROWTHOS - ENHANCED PROGRESS RING
// Brand Board v2.0 - Colored Variants
// ============================================

type ColorVariant = 'cyan' | 'violet' | 'mint' | 'orange'

interface ProgressRingProps {
  value: number
  max?: number
  size?: number
  label?: string
  color?: ColorVariant
  className?: string
}

const colorMap: Record<ColorVariant, { stroke: string; text: string }> = {
  cyan: { stroke: '#00D4FF', text: 'text-emerald-pro-600' },
  violet: { stroke: '#7B61FF', text: 'text-emerald-pro-500' },
  mint: { stroke: '#00FFB2', text: 'text-emerald-pro-400' },
  orange: { stroke: '#FF6B35', text: 'text-energy-orange' },
}

export function ProgressRing({
  value,
  max = 100,
  size = 64,
  label,
  color = 'cyan',
  className,
}: ProgressRingProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const strokeWidth = 4
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const colors = colorMap[color]

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="#2A3F5F"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={colors.stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-500 ease-out"
          style={{
            filter: `drop-shadow(0 0 6px ${colors.stroke}40)`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("text-sm font-semibold", colors.text)}>
          {Math.round(percentage)}%
        </span>
        {label && (
          <span className="text-2xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
