/**
 * Protected Routes Component
 * Route guard component that ensures authentication
 * Redirects unauthenticated users to sign-in page
 */

import { LoaderPage } from "@/routes/loader-page";
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

/**
 * ProtectRoutes Component
 * Wraps protected routes with authentication checks:
 * - Shows loading state while checking auth status
 * - Redirects to sign-in if user is not authenticated
 * - Renders children only for authenticated users
 *
 * @param children - React components to render for authenticated users
 * @returns Protected route content or redirect
 */
const ProtectRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, isSignedIn } = useAuth();

  // Show loading state while checking authentication
  if (!isLoaded) {
    return <LoaderPage />;
  }

  // Redirect to sign-in if user is not authenticated
  if (!isSignedIn) {
    return <Navigate to={"/signin"} replace />;
  }

  // Render protected content for authenticated users
  return children;
};

export default ProtectRoutes;
