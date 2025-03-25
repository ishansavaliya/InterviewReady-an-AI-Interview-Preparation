import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/lib/utils";

// Provider that must wrap all tooltips
// Manages global tooltip settings like delay and skip delays
const TooltipProvider = TooltipPrimitive.Provider;

// Root component that manages the state of the tooltip
const Tooltip = TooltipPrimitive.Root;

// Element that triggers the tooltip when hovered or focused
const TooltipTrigger = TooltipPrimitive.Trigger;

// Content container for the tooltip
// Includes styling, positioning and animations
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset} // Space between tooltip and trigger
    className={cn(
      // Styling for tooltip with animations based on entrance/exit and position
      "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// Export all tooltip components for use in other files
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
