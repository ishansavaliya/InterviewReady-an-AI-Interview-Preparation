/**
 * Toggle Container Component
 * Mobile navigation menu using a slide-out sheet
 * Provides responsive navigation for smaller screens
 */

import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Container } from "./container";
import { LogoContainer } from "./logo-container";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useLogout } from "@/hooks/useLogout";
import { LogOut, User, FileText, Briefcase } from "lucide-react";
import { ToggleMode } from "@/components/toggle-mode";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavigationRoutes } from "./navigation-routes";

/**
 * ToggleContainer Component
 * Renders a mobile-friendly navigation menu:
 * - Slide-out sheet for mobile view
 * - Hamburger menu trigger
 * - Navigation links with active state
 * - Conditional interview link for authenticated users
 */
export const ToggleContainer = () => {
  const { isSignedIn } = useAuth();
  const { handleLogout } = useLogout();
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
