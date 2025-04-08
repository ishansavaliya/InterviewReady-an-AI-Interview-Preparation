/**
 * Toast Notification Provider
 * This component provides toast notifications throughout the application
 * using the Sonner toast library
 */

import { Toaster } from "@/components/ui/sonner";

/**
 * ToasterProvider Component
 * Configures and renders the global toast notification system
 * with custom styling and positioning
 */
export const ToasterProvider = () => {
  return (
    <Toaster
      theme="light" // Light theme for notifications
      richColors // Enable rich color palette
      position="top-right" // Position notifications in top-right corner
      className="bg-neutral-100 shadow-lg" // Custom styling for notifications
    />
  );
};
