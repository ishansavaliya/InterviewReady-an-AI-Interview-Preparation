import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Define badge styling variants using class-variance-authority
// Base styles include flex layout, rounded corners, padding, and focus states
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Primary badge with brand colors
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        // Secondary badge with muted colors
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // Destructive badge for error/warning states
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        // Outline variant with transparent background
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Type definition for Badge component props
// Combines HTML div attributes with variant props
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

// Badge component that renders a small indicator/label
// Accepts variant prop to change appearance and standard HTML div attributes
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

// Export the Badge component and its variants for use in other files
export { Badge, badgeVariants };
