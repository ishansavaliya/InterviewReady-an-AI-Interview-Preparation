/**
 * Header Component
 * Main application header with navigation and user controls
 * Provides responsive layout for desktop and mobile views
 */

import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { useLogout } from "@/hooks/useLogout";
import { LogOut, User, FileText, Moon, Sun, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { ToggleMode } from "@/components/toggle-mode";
import { Container } from "./container";
import { LogoContainer } from "./logo-container";
import { NavigationRoutes } from "./navigation-routes";
import { NavLink } from "react-router-dom";
import { ProfileContainer } from "./profile-container";
import { ToggleContainer } from "./toggle-container";
import { cn } from "@/lib/utils";

/**
 * Header Component
 * Renders the main application header with:
 * - Logo and branding
 * - Navigation menu (desktop)
 * - User profile controls
 * - Mobile menu toggle
 */
const Header = () => {
  const { isSignedIn } = useAuth();
  const { handleLogout } = useLogout();

  return (
    <header
      className={cn("w-full border-b duration-150 transition-all ease-in-out")}
    >
      <Container>
        <div className="flex items-center gap-4 w-full">
          {/* Logo Section */}
          <LogoContainer />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3">
            <NavigationRoutes />
          </nav>

          {/* User Controls */}
          <div className="ml-auto flex items-center gap-6">
            {/* Profile Section */}
            <ProfileContainer />

            {/* Mobile Menu Toggle */}
            <ToggleContainer />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
