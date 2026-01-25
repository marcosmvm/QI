'use client'

import { useEffect, useState, useRef } from 'react'
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react"
import { type MetricStatus } from "@/types"
import { motion, useInView } from 'framer-motion'

// ============================================
// XGROWTHOS - PREMIUM METRICS CARD
// Brand Board v2.0 - With Enhanced Animations
// ============================================

type AccentColor = 'cyan' | 'violet' | 'mint' | 'orange'

interface MetricsCardProps {
  title: string
  value: string | number
  suffix?: string
  change?: number
  changeLabel?: string
  status?: MetricStatus
  icon?: LucideIcon
  loading?: boolean
  className?: string
  accent?: AccentColor
  delay?: number
}

const accentClasses: Record<AccentColor, string> = {
  cyan: 'accent-cyan',
  violet: 'accent-violet',
  mint: 'accent-mint',
  orange: 'accent-orange',
}

export function MetricsCard({
  title,
  value,
  suffix = "",
  change,
  changeLabel = "vs last week",
  icon: Icon,
  loading = false,
  className,
  accent = 'cyan',
  delay = 0,
}: MetricsCardProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  // Parse numeric value from string or number
  const numericValue = typeof value === 'string'
    ? parseFloat(value.replace(/[^0-9.-]/g, '')) || 0
    : value

  // Animate number when in view
  useEffect(() => {
    if (loading || numericValue === 0 || hasAnimated || !isInView) {
      if (!isInView) return
      setDisplayValue(loading ? 0 : numericValue)
      return
    }

    setHasAnimated(true)
    const duration = 1500
    const startTime = Date.now()

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      // Ease out cubic for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * numericValue

      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(numericValue)
      }
    }

    requestAnimationFrame(animate)
  }, [numericValue, loading, isInView, hasAnimated])

  // Format value preserving original format
  const formatValue = (val: number) => {
    if (typeof value === 'string') {
      if (value.includes('%')) return `${val.toFixed(1)}%`
      if (value.includes('$')) return `$${val.toLocaleString()}`
      if (value.includes('K')) return `${(val / 1000).toFixed(1)}K`
      if (value.includes('M')) return `${(val / 1000000).toFixed(1)}M`
    }
    return val.toLocaleString()
  }

  const TrendIcon = change && change > 0
    ? TrendingUp
    : change && change < 0
      ? TrendingDown
      : Minus

  const trendColor = change && change > 0
    ? 'text-emerald-pro-400'
    : change && change < 0
      ? 'text-alert-red'
      : 'text-slate-700 dark:text-slate-400'

  if (loading) {
    return (
      <div className={cn("metric-card-premium p-6", accentClasses[accent], className)}>
        <div className="flex justify-between items-start">
          <div className="space-y-3 flex-1">
            <div className="skeleton-premium h-3 w-24" />
            <div className="skeleton-premium h-9 w-32" />
            <div className="skeleton-premium h-3 w-20" />
          </div>
          <div className="skeleton-premium h-10 w-10 rounded-lg" />
        </div>
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={cn(
        "metric-card-premium p-6 group",
        accentClasses[accent],
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-medium text-slate-700 dark:text-slate-400 uppercase tracking-wide mb-2">
            {title}
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white metric-value">
            {formatValue(displayValue)}
            {suffix && <span className="text-lg text-slate-700 dark:text-slate-400 ml-1">{suffix}</span>}
          </p>
          {change !== undefined && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: delay + 0.3 }}
              className={cn("flex items-center gap-1 mt-2 text-sm", trendColor)}
            >
              <TrendIcon className="w-4 h-4" />
              <span className="font-medium">
                {change > 0 ? '+' : ''}{change}%
              </span>
              <span className="text-slate-700 dark:text-slate-400 ml-1 text-xs">{changeLabel}</span>
            </motion.div>
          )}
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-graphite/50 flex items-center justify-center text-slate-700 dark:text-slate-400 group-hover:text-emerald-pro-600 group-hover:bg-emerald-pro-600/10 group-hover:border group-hover:border-emerald-pro-600/30 transition-all duration-200">
            <Icon className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
          </div>
        )}
      </div>
    </motion.div>
  )
}
