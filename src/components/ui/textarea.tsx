import * as React from "react";

import { cn } from "@/lib/utils";

// Textarea component with forwarded ref
// A styled multi-line text input with consistent design language
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        // Base styling for textarea with comprehensive states:
        // - Minimum height to ensure usability
        // - Normal, focused, disabled states
        // - Border, padding, and text styling
        // - Responsive text size (base on mobile, smaller on desktop)
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
