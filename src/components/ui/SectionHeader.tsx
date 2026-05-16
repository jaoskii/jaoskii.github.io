import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  className?: string;
}

export function SectionHeader({ label, title, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", className)}>
      <span className="text-accent font-mono text-sm tracking-widest uppercase mb-3 block">
        {label}
      </span>
      <h2 className="text-3xl md:text-4xl font-semibold text-text-primary tracking-tight">
        {title}
      </h2>
      <div className="mt-4 h-px w-12 bg-accent opacity-60" />
    </div>
  );
}
