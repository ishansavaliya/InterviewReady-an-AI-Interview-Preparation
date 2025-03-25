import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

// Type definition for Toaster props, extending the original Sonner component props
type ToasterProps = React.ComponentProps<typeof Sonner>;

// Custom toast notification component using Sonner
// Integrates with the application's theme system and styling
const Toaster = ({ ...props }: ToasterProps) => {
  // Get current theme from next-themes
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]} // Apply current theme to toasts
      className="toaster group" // Add group class for targeted styling
      toastOptions={{
        classNames: {
          // Style the toast container to match app theme
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          // Style the description text
          description: "group-[.toast]:text-muted-foreground",
          // Style action buttons for primary actions
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          // Style cancel buttons for secondary actions
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
