/**
 * Logo Container Component
 * Displays the application logo with navigation to home page
 * Provides consistent branding across the application
 */

import { Link } from "react-router-dom";

/**
 * LogoContainer Component
 * Renders the application logo:
 * - Links to home page
 * - Maintains aspect ratio
 * - Ensures minimum dimensions
 */
export const LogoContainer = () => {
  return (
    <Link to={"/"}>
      <img
        src="/assets/svg/logo.svg"
        alt="InterviewReady Logo"
        className="min-w-10 min-h-10 object-contain"
      />
    </Link>
  );
};
