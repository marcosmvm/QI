// ============================================
// QUANTUM INSIGHTS - CHART CONFIGURATION
// Recharts theme configuration for consistent styling
// ============================================

export const chartColors = {
  // Primary data series
  primary: '#00D4FF',      // electric-cyan
  // Secondary data series
  secondary: '#7B61FF',    // quantum-violet
  // Tertiary (positive trends)
  tertiary: '#00FFB2',     // neon-mint
  // Quaternary (warnings)
  quaternary: '#FF6B35',   // energy-orange
  // Neutral
  neutral: '#9CA3AF',      // steel
  // Error
  error: '#FF4757',        // alert-red
}

export const chartAreaFills = {
  primary: 'rgba(0, 212, 255, 0.1)',
  secondary: 'rgba(123, 97, 255, 0.1)',
  tertiary: 'rgba(0, 255, 178, 0.1)',
  quaternary: 'rgba(255, 107, 53, 0.1)',
}

export const chartGradients = {
  primary: {
    id: 'primaryGradient',
    stops: [
      { offset: '0%', color: '#00D4FF', opacity: 0.3 },
      { offset: '100%', color: '#00D4FF', opacity: 0 },
    ],
  },
  secondary: {
    id: 'secondaryGradient',
    stops: [
      { offset: '0%', color: '#7B61FF', opacity: 0.3 },
      { offset: '100%', color: '#7B61FF', opacity: 0 },
    ],
  },
  tertiary: {
    id: 'tertiaryGradient',
    stops: [
      { offset: '0%', color: '#00FFB2', opacity: 0.3 },
      { offset: '100%', color: '#00FFB2', opacity: 0 },
    ],
  },
}

export const chartTheme = {
  // Grid
  grid: {
    stroke: '#2A3F5F',
    strokeDasharray: '3 3',
  },
  // Axes
  axis: {
    stroke: '#2A3F5F',
    tick: {
      fill: '#9CA3AF',
      fontSize: 12,
    },
  },
  // Tooltip
  tooltip: {
    contentStyle: {
      backgroundColor: '#1A2D4A',
      border: '1px solid #2A3F5F',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      padding: '12px',
    },
    labelStyle: {
      color: '#FFFFFF',
      fontWeight: 600,
      marginBottom: '8px',
      fontSize: '14px',
    },
    itemStyle: {
      color: '#E8E8ED',
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
      color: '#9CA3AF',
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
        className="bg-midnight-blue border border-graphite rounded-lg p-3 shadow-lg"
        style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)' }}
      >
        <p className="text-white font-semibold text-sm mb-2">{label}</p>
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

// Common axis props
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
