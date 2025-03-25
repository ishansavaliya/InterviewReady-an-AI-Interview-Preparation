import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

// Separator component with forwarded ref based on Radix UI's separator primitive
// Can be oriented horizontally or vertically and has accessible attributes
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative} // When true, indicates the separator is purely visual
      orientation={orientation} // Determines whether the separator is horizontal or vertical
      className={cn(
        "shrink-0 bg-border", // Base styling with theme border color
        // Conditional styling based on orientation:
        // - Horizontal: full width, 1px height
        // - Vertical: full height, 1px width
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
