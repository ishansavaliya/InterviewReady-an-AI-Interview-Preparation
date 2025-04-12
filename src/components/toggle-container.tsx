/**
 * Toggle Container Component
 * Mobile navigation menu using a slide-out sheet
 * Provides responsive navigation for smaller screens
 */

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavigationRoutes } from "./navigation-routes";
import { useAuth } from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

/**
 * ToggleContainer Component
 * Renders a mobile-friendly navigation menu:
 * - Slide-out sheet for mobile view
 * - Hamburger menu trigger
 * - Navigation links with active state
 * - Conditional interview link for authenticated users
 */
export const ToggleContainer = () => {
  const { userId } = useAuth();
  return (
    <Sheet>
      {/* Mobile Menu Trigger */}
      <SheetTrigger className="block md:hidden">
        <Menu />
      </SheetTrigger>

      {/* Slide-out Content */}
      <SheetContent>
        <SheetHeader>
          <SheetTitle />
        </SheetHeader>

        {/* Navigation Links */}
        <nav className="gap-6 flex flex-col items-start">
          {/* Main Navigation Routes */}
          <NavigationRoutes isMobile />
        </nav>
      </SheetContent>
    </Sheet>
  );
};
