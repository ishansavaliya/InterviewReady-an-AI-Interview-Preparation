/**
 * Navigation Routes Component
 * Reusable navigation menu component that renders main application routes
 * Supports both desktop and mobile layouts through responsive styling
 */

import { MainRoutes } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

/**
 * Props for the NavigationRoutes component
 * @property isMobile - Optional boolean to toggle mobile-specific styling
 */
interface NavigationRoutesProps {
  isMobile?: boolean;
}

/**
 * NavigationRoutes Component
 * Renders a list of navigation links:
 * - Uses MainRoutes from helpers for route configuration
 * - Supports responsive layout (desktop/mobile)
 * - Includes active state styling for current route
 */
export const NavigationRoutes = ({
  isMobile = false,
}: NavigationRoutesProps) => {
  return (
    <ul
      className={cn(
        "flex items-center gap-6",
        isMobile && "items-start flex-col gap-8"
      )}
    >
      {/* Map through main routes to create navigation links */}
      {MainRoutes.map((route) => (
        <NavLink
          key={route.href}
          to={route.href}
          className={({ isActive }) =>
            cn(
              "text-base text-neutral-600",
              isActive && "text-neutral-900 font-semibold"
            )
          }
        >
          {route.label}
        </NavLink>
      ))}
    </ul>
  );
};
