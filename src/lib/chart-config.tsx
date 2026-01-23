// ============================================
// XGROWTHOS - CHART CONFIGURATION
// Recharts theme configuration for consistent styling
// Light Theme Default with Dark Mode Support
// ============================================

export const chartColors = {
  // Primary data series (emerald green)
  primary: '#059669',      // emerald-pro-600
  // Secondary data series (lighter green)
  secondary: '#10b981',    // emerald-pro-500
  // Tertiary (positive trends)
  tertiary: '#22c55e',     // xgrowth-500
  // Quaternary (warnings)
  quaternary: '#f59e0b',   // amber
  // Neutral
  neutral: '#64748b',      // slate-500
  // Error
  error: '#ef4444',        // red-500
  // Success
  success: '#22c55e',      // green-500
}

export const chartAreaFills = {
  primary: 'rgba(5, 150, 105, 0.1)',
  secondary: 'rgba(16, 185, 129, 0.1)',
  tertiary: 'rgba(34, 197, 94, 0.1)',
  quaternary: 'rgba(245, 158, 11, 0.1)',
}

export const chartGradients = {
  primary: {
    id: 'primaryGradient',
    stops: [
      { offset: '0%', color: '#059669', opacity: 0.3 },
      { offset: '100%', color: '#059669', opacity: 0 },
    ],
  },
  secondary: {
    id: 'secondaryGradient',
    stops: [
      { offset: '0%', color: '#10b981', opacity: 0.3 },
      { offset: '100%', color: '#10b981', opacity: 0 },
    ],
  },
  tertiary: {
    id: 'tertiaryGradient',
    stops: [
      { offset: '0%', color: '#22c55e', opacity: 0.3 },
      { offset: '100%', color: '#22c55e', opacity: 0 },
    ],
  },
}

// Light mode chart theme (default)
export const chartTheme = {
  // Grid
  grid: {
    stroke: '#e2e8f0',
    strokeDasharray: '3 3',
  },
  // Axes
  axis: {
    stroke: '#e2e8f0',
    tick: {
      fill: '#64748b',
      fontSize: 12,
    },
  },
  // Tooltip (light mode)
  tooltip: {
    contentStyle: {
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      padding: '12px',
    },
    labelStyle: {
      color: '#0f172a',
      fontWeight: 600,
      marginBottom: '8px',
      fontSize: '14px',
    },
    itemStyle: {
      color: '#334155',
      fontSize: '13px',
      padding: '2px 0',
    },
  },
  // Legend
  legend: {
    wrapperStyle: {
      paddingTop: '16px',
    },
    itemStyle: {
      color: '#64748b',
      fontSize: '13px',
    },
  },
}

// Dark mode chart theme
export const chartThemeDark = {
  grid: {
    stroke: '#2d4a2d',
    strokeDasharray: '3 3',
  },
  axis: {
    stroke: '#2d4a2d',
    tick: {
      fill: '#9ca3af',
      fontSize: 12,
    },
  },
  tooltip: {
    contentStyle: {
      backgroundColor: '#1a2e1a',
      border: '1px solid #2d4a2d',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      padding: '12px',
    },
    labelStyle: {
      color: '#ffffff',
      fontWeight: 600,
      marginBottom: '8px',
      fontSize: '14px',
    },
    itemStyle: {
      color: '#e8e8ed',
      fontSize: '13px',
      padding: '2px 0',
    },
  },
  legend: {
    wrapperStyle: {
      paddingTop: '16px',
    },
    itemStyle: {
      color: '#9ca3af',
      fontSize: '13px',
    },
  },
}

// Recharts-compatible tooltip content style
export const tooltipStyle = {
  contentStyle: chartTheme.tooltip.contentStyle,
  labelStyle: chartTheme.tooltip.labelStyle,
  itemStyle: chartTheme.tooltip.itemStyle,
}

// Custom tooltip component for Recharts
interface TooltipPayloadItem {
  name: string;
  value: number;
  color: string;
  dataKey: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  formatter?: (value: number, name: string) => string;
}

export const CustomTooltip = ({ active, payload, label, formatter }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="bg-white dark:bg-midnight-blue border border-border-default dark:border-graphite rounded-lg p-3 shadow-lg"
        style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
      >
        <p className="text-light-text dark:text-white font-semibold text-sm mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p
            key={index}
            className="text-sm py-0.5"
            style={{ color: entry.color }}
          >
            {entry.name}: {formatter ? formatter(entry.value, entry.name) : entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    )
  }
  return null
}

// Common axis props (light mode)
export const xAxisProps = {
  stroke: chartTheme.axis.stroke,
  tick: chartTheme.axis.tick,
  axisLine: { stroke: chartTheme.axis.stroke },
  tickLine: { stroke: chartTheme.axis.stroke },
}

export const yAxisProps = {
  stroke: chartTheme.axis.stroke,
  tick: chartTheme.axis.tick,
  axisLine: { stroke: chartTheme.axis.stroke },
  tickLine: { stroke: chartTheme.axis.stroke },
}

// Common grid props
export const gridProps = {
  stroke: chartTheme.grid.stroke,
  strokeDasharray: chartTheme.grid.strokeDasharray,
  vertical: false,
}

// Helper function to format numbers
export const formatNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }
  return value.toLocaleString()
}

// Helper function to format percentage
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`
}

// Helper function to format currency
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}
