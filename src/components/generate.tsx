/**
 * Generate Component
 * Layout wrapper for interview generation and management
 * Provides consistent padding and structure for child routes
 */

import { Outlet } from "react-router-dom";

/**
 * Generate Component
 * Renders a layout container:
 * - Responsive padding for different screen sizes
 * - Nested route content through Outlet
 */
export const Generate = () => {
  return (
    <div className="flex-col md:px-12">
      <Outlet />
    </div>
  );
};
