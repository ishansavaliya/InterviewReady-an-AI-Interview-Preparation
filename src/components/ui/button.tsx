import * as React from "react";
import { Slot } from "@radix-ui/react-slot"; // For component composition
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Define button styling variants using class-variance-authority
// Base styles include flex layout, rounded corners, focus states, and SVG handling
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      // Visual style variants
      variant: {
        // Primary button with brand colors
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // Destructive button for delete/warning actions
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        // Outlined button with border and transparent background
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        // Secondary button with muted styling
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // Ghost button that only shows on hover
        ghost: "hover:bg-accent hover:text-accent-foreground",
        // Link button that appears as text with underline on hover
        link: "text-primary underline-offset-4 hover:underline",
      },
      // Size variants for different button dimensions
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10", // Square button for icons
      },
    },
    // Default styling if no variant is specified
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Type definition for Button component props
// Combines HTML button attributes with variant props and asChild option
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean; // When true, button will render its children directly using Slot
}

// Button component with forwarded ref
// Supports all HTML button attributes plus variant, size, and asChild props
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Use Slot if asChild is true, otherwise use regular button element
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// Export the Button component and its variants for use in other files
export { Button, buttonVariants };
