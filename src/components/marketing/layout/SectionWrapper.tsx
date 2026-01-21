import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "dark" | "gradient" | "accent";
  padding?: "sm" | "md" | "lg" | "xl";
  id?: string;
}

export function SectionWrapper({
  children,
  className,
  variant = "default",
  padding = "lg",
  id,
}: SectionWrapperProps) {
  const variants = {
    default: "bg-deep-space",
    dark: "bg-midnight-blue/50",
    gradient: "bg-gradient-to-b from-deep-space to-midnight-blue",
    accent: "bg-midnight-blue",
  };

  const paddings = {
    sm: "py-8 sm:py-12",
    md: "py-12 sm:py-16",
    lg: "py-16 sm:py-24",
    xl: "py-24 sm:py-32",
  };

  return (
    <section
      id={id}
      className={cn(variants[variant], paddings[padding], className)}
    >
      {children}
    </section>
  );
}
