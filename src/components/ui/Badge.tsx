import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  className?: string;
}

export function Badge({ label, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-2.5 py-0.5 rounded text-xs font-mono text-text-secondary border border-border bg-bg-card",
        className
      )}
    >
      {label}
    </span>
  );
}
