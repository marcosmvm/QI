import { cn } from "@/lib/utils";

type BadgeVariant = "success" | "warning" | "error" | "info" | "pending" | "active";

interface StatusBadgeProps {
  variant: BadgeVariant;
  label?: string;
  className?: string;
}

const variantConfig: Record<BadgeVariant, { dot: string; text: string; label: string }> = {
  success: {
    dot: "bg-success",
    text: "text-success",
    label: "Success",
  },
  warning: {
    dot: "bg-warning",
    text: "text-warning",
    label: "Warning",
  },
  error: {
    dot: "bg-error",
    text: "text-error",
    label: "Error",
  },
  info: {
    dot: "bg-info",
    text: "text-info",
    label: "Info",
  },
  pending: {
    dot: "bg-foreground-muted",
    text: "text-foreground-muted",
    label: "Pending",
  },
  active: {
    dot: "bg-primary",
    text: "text-primary",
    label: "Active",
  },
};

export function StatusBadge({
  variant,
  label,
  className,
}: StatusBadgeProps) {
  const config = variantConfig[variant];
  const displayLabel = label || config.label;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium",
        config.text,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
      {displayLabel}
    </span>
  );
}
