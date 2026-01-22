import { cn } from "@/lib/utils"

// ============================================
// QUANTUM INSIGHTS - SKELETON LOADING COMPONENTS
// Brand Board v1.0 - Loading States
// ============================================

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'title' | 'avatar' | 'button' | 'card'
}

export function Skeleton({ className, variant = 'text', ...props }: SkeletonProps) {
  const variants = {
    text: 'h-4 w-full',
    title: 'h-6 w-3/4',
    avatar: 'h-10 w-10 rounded-full',
    button: 'h-10 w-24',
    card: 'h-32 w-full',
  }

  return (
    <div
      className={cn(
        "skeleton",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

// Pre-built skeleton layouts
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("card-base p-6 space-y-4", className)}>
      <Skeleton variant="title" />
      <Skeleton variant="text" />
      <Skeleton variant="text" className="w-2/3" />
    </div>
  )
}

export function SkeletonTable({ rows = 5, className }: { rows?: number; className?: string }) {
  return (
    <div className={cn("table-container", className)}>
      <div className="p-4 border-b border-graphite">
        <div className="flex gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} variant="text" className="w-24" />
          ))}
        </div>
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="p-4 border-b border-graphite/50">
          <div className="flex gap-4">
            <Skeleton variant="text" className="w-32" />
            <Skeleton variant="text" className="w-20" />
            <Skeleton variant="text" className="w-24" />
            <Skeleton variant="text" className="w-16" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function SkeletonMetricCard({ className }: { className?: string }) {
  return (
    <div className={cn("card-stat p-6", className)}>
      <div className="flex justify-between items-start">
        <div className="space-y-3 flex-1">
          <Skeleton variant="text" className="w-24" />
          <Skeleton className="h-9 w-32" />
          <Skeleton variant="text" className="w-20" />
        </div>
        <Skeleton variant="avatar" />
      </div>
    </div>
  )
}

export function SkeletonList({ items = 3, className }: { items?: number; className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton variant="avatar" className="h-8 w-8" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" className="w-3/4" />
            <Skeleton variant="text" className="w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function SkeletonChart({ className }: { className?: string }) {
  return (
    <div className={cn("chart-container", className)}>
      <Skeleton variant="title" className="mb-6" />
      <div className="h-64 flex items-end gap-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex-1"
            style={{ height: `${Math.random() * 80 + 20}%` }}
          />
        ))}
      </div>
    </div>
  )
}
