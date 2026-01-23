"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import { chartColors, chartTheme, gridProps, xAxisProps, yAxisProps } from "@/lib/chart-config"

// ============================================
// QUANTUM INSIGHTS - ENHANCED PERFORMANCE CHART
// Brand Board v1.0 - Dark Theme
// ============================================

interface DataPoint {
  date: string
  sent: number
  opened: number
  replied: number
}

interface PerformanceChartProps {
  data: DataPoint[]
  title?: string
  variant?: 'line' | 'area'
}

export function PerformanceChart({
  data,
  title = "Performance",
  variant = 'line'
}: PerformanceChartProps) {
  const ChartComponent = variant === 'area' ? AreaChart : LineChart

  return (
    <div className="chart-container">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-base font-semibold text-light-text dark:text-white">{title}</h3>
        <div className="mt-3 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span
              className="h-0.5 w-4 rounded"
              style={{ backgroundColor: chartColors.primary }}
            />
            <span className="text-xs text-light-text-muted dark:text-steel">Sent</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="h-0.5 w-4 rounded"
              style={{ backgroundColor: chartColors.secondary }}
            />
            <span className="text-xs text-light-text-muted dark:text-steel">Opened</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="h-0.5 w-4 rounded"
              style={{ backgroundColor: chartColors.tertiary }}
            />
            <span className="text-xs text-light-text-muted dark:text-steel">Replied</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ChartComponent
            data={data}
            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="sentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColors.primary} stopOpacity={0.3} />
                <stop offset="100%" stopColor={chartColors.primary} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="openedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColors.secondary} stopOpacity={0.3} />
                <stop offset="100%" stopColor={chartColors.secondary} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="repliedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={chartColors.tertiary} stopOpacity={0.3} />
                <stop offset="100%" stopColor={chartColors.tertiary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid {...gridProps} />
            <XAxis
              dataKey="date"
              {...xAxisProps}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              {...yAxisProps}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip
              contentStyle={chartTheme.tooltip.contentStyle}
              labelStyle={chartTheme.tooltip.labelStyle}
              itemStyle={chartTheme.tooltip.itemStyle}
            />
            {variant === 'area' ? (
              <>
                <Area
                  type="monotone"
                  dataKey="sent"
                  name="Sent"
                  stroke={chartColors.primary}
                  fill="url(#sentGradient)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="opened"
                  name="Opened"
                  stroke={chartColors.secondary}
                  fill="url(#openedGradient)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="replied"
                  name="Replied"
                  stroke={chartColors.tertiary}
                  fill="url(#repliedGradient)"
                  strokeWidth={2}
                />
              </>
            ) : (
              <>
                <Line
                  type="monotone"
                  dataKey="sent"
                  name="Sent"
                  stroke={chartColors.primary}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: chartColors.primary }}
                />
                <Line
                  type="monotone"
                  dataKey="opened"
                  name="Opened"
                  stroke={chartColors.secondary}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: chartColors.secondary }}
                />
                <Line
                  type="monotone"
                  dataKey="replied"
                  name="Replied"
                  stroke={chartColors.tertiary}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: chartColors.tertiary }}
                />
              </>
            )}
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
