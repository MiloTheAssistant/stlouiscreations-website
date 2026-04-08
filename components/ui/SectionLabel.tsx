import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "text-primary text-xs font-display uppercase tracking-[0.2em] font-bold",
        className
      )}
    >
      {children}
    </span>
  );
}
