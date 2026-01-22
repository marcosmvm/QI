'use client'

import { useEffect, useState } from 'react'
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react"
import { type MetricStatus } from "@/types"

// ============================================
// QUANTUM INSIGHTS - ENHANCED METRICS CARD
// Brand Board v1.0 - With Number Animation
// ============================================

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
}: MetricsCardProps) {
  const [displayValue, setDisplayValue] = useState(0)

  // Parse numeric value from string or number
  const numericValue = typeof value === 'string'
    ? parseFloat(value.replace(/[^0-9.-]/g, '')) || 0
    : value

  // Animate number on mount
  useEffect(() => {
    if (loading || numericValue === 0) {
      setDisplayValue(0)
      return
    }

    const duration = 1000
    const steps = 30
    const increment = numericValue / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        setDisplayValue(numericValue)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [numericValue, loading])

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
    ? 'text-neon-mint'
    : change && change < 0
      ? 'text-alert-red'
      : 'text-steel'

  if (loading) {
    return (
      <div className={cn("card-stat p-6", className)}>
        <div className="flex justify-between items-start">
          <div className="space-y-3 flex-1">
            <div className="skeleton h-3 w-24" />
            <div className="skeleton h-9 w-32" />
            <div className="skeleton h-3 w-20" />
          </div>
          <div className="skeleton h-10 w-10 rounded-lg" />
        </div>
      </div>
    )
  }

  return (
    <div className={cn("card-stat p-6 group", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-medium text-steel uppercase tracking-wide mb-2">
            {title}
          </p>
          <p className="text-3xl font-bold text-white metric-value">
            {formatValue(displayValue)}
            {suffix && <span className="text-lg text-steel ml-1">{suffix}</span>}
          </p>
          {change !== undefined && (
            <div className={cn("flex items-center gap-1 mt-2 text-sm", trendColor)}>
              <TrendIcon className="w-4 h-4" />
              <span className="font-medium">
                {change > 0 ? '+' : ''}{change}%
              </span>
              <span className="text-steel ml-1 text-xs">{changeLabel}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-graphite/50 flex items-center justify-center text-steel group-hover:text-electric-cyan group-hover:bg-graphite transition-all duration-200">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  )
}
