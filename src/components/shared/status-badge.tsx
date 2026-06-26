import { statusLabels } from "@/constants/feedback";
import { cn } from "@/lib/utils";
import type { FeedbackStatus } from "@/types/api";

const styles: Record<FeedbackStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  IN_REVIEW: "bg-sky-100 text-sky-800",
  RESOLVED: "bg-emerald-100 text-emerald-800",
  REJECTED: "bg-rose-100 text-rose-800",
};

export function StatusBadge({ status }: { status: FeedbackStatus }) {
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", styles[status])}>
      {statusLabels[status]}
    </span>
  );
}
