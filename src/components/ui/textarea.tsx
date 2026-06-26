import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-32 w-full resize-y rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm outline-none transition placeholder:text-[var(--muted-foreground)] focus:border-teal-600 focus:ring-2 focus:ring-teal-100",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
