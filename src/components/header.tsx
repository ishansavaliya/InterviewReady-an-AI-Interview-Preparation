/**
 * Header Component
 * Main application header with navigation and user controls
 * Provides responsive layout for desktop and mobile views
 */

import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/clerk-react";
import { Container } from "./container";
import { LogoContainer } from "./logo-container";
import { NavigationRoutes } from "./navigation-routes";
import { NavLink } from "react-router-dom";
import { ProfileContainer } from "./profile-container";
import { ToggleContainer } from "./toggle-container";

/**
 * Header Component
 * Renders the main application header with:
 * - Logo and branding
 * - Navigation menu (desktop)
 * - User profile controls
 * - Mobile menu toggle
 */
const Header = () => {
  const { userId } = useAuth();

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
            {userId && (
              <NavLink
                to={"/generate"}
                className={({ isActive }) =>
                  cn(
                    "text-base text-neutral-600",
                    isActive && "text-neutral-900 font-semibold"
                  )
                }
              >
                Take An Interview
              </NavLink>
            )}
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
