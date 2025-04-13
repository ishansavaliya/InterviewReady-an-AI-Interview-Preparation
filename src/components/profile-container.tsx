/**
 * Profile Container Component
 * Handles user authentication state and profile display
 * Shows either a sign-in button or user profile button based on auth state
 */

import { useAuth, UserButton } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

/**
 * ProfileContainer Component
 * Manages user authentication UI:
 * - Loading state while auth is initializing
 * - Sign-in button for unauthenticated users
 * - User profile button for authenticated users
 */
export const ProfileContainer = () => {
  const { isSignedIn, isLoaded } = useAuth();

  // Show loading spinner while auth state is being determined
  if (!isLoaded) {
    return (
      <div className="flex items-center">
        <Loader className="min-w-4 min-h-4 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      {isSignedIn ? (
        // Show user profile button for authenticated users
        <UserButton afterSignOutUrl="/generate" />
      ) : (
        // Show sign-in button for unauthenticated users
        <Link to={"/signin"}>
          <Button size={"sm"}>Get Started</Button>
        </Link>
      )}
    </div>
  );
};
