/**
 * Public Layout Component
 * Main layout wrapper for public pages of the application
 * Includes header, footer, and authentication handler
 */

import { Footer } from "@/components/footer";
import Header from "@/components/header";
import AuthHanlder from "@/handlers/auth-handler";
import { Outlet } from "react-router-dom";

/**
 * PublicLayout Component
 * Provides the base structure for public pages:
 * - Handles user authentication state
 * - Displays common header and footer
 * - Renders child routes in the main content area
 */
export const PublicLayout = () => {
  return (
    <div className="w-full">
      {/* Authentication Handler - Manages user state and data synchronization */}
      <AuthHanlder />

      {/* Main Navigation Header */}
      <Header />

      {/* Child Route Content */}
      <Outlet />

      {/* Site Footer */}
      <Footer />
    </div>
  );
};
