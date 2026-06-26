import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-10 w-full rounded-md border border-[var(--border)] bg-white px-3 text-sm outline-none transition placeholder:text-[var(--muted-foreground)] focus:border-teal-600 focus:ring-2 focus:ring-teal-100",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
