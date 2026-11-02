import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

/** Aviso visible para datos que el ministerio aún no ha entregado. */
export function PendingNote({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border border-dashed border-gold/60 bg-ivory px-4 py-3 text-sm text-night/80",
        className,
      )}
    >
      <Clock className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden />
      <div>{children}</div>
    </div>
  );
}
