/**
 * Headings Component
 * Reusable heading component with optional description
 * Supports main and subheading styles with responsive text sizes
 */

import { cn } from "@/lib/utils";

/**
 * Props for the Headings component
 * @property title - Heading text to display
 * @property description - Optional description text below the heading
 * @property isSubHeading - Whether to use subheading style
 */
interface HeadingsProps {
  title: string;
  description?: string;
  isSubHeading?: boolean;
}

/**
 * Headings Component
 * Renders a heading with:
 * - Responsive text sizing
 * - Optional description
 * - Style variants for main and subheadings
 */
export const Headings = ({
  title,
  description,
  isSubHeading = false,
}: HeadingsProps) => {
  return (
    <div>
      {/* Main Heading */}
      <h2
        className={cn(
          "text-2xl md:text-3xl text-gray-800 font-semibold font-sans",
          isSubHeading && "text-lg md:text-xl"
        )}
      >
        {title}
      </h2>

      {/* Optional Description */}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};
