import { cn } from "@/lib/utils";

// Skeleton loading component
// Creates a pulsing placeholder element for content that is loading
// Used to improve perceived performance and reduce layout shifts
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
