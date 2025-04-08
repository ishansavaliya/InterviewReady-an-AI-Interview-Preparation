/**
 * Container Component
 * Reusable layout container component
 * Provides consistent padding and width constraints
 * Supports responsive design with mobile-first approach
 */

import { cn } from "@/lib/utils";

/**
 * Props for the Container component
 * @property children - Child elements to render inside the container
 * @property className - Optional additional CSS classes
 */
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Container Component
 * Renders a responsive container:
 * - Centered layout with max-width
 * - Responsive padding for different screen sizes
 * - Custom class support for styling flexibility
 */
export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={cn("container mx-auto px-4 md:px-8 py-4 w-full", className)}
    >
      {children}
    </div>
  );
};
