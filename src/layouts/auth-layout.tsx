/**
 * Authentication Layout Component
 * Specialized layout for authentication pages (sign-in, sign-up)
 * Provides a clean, centered design with background image
 */

import { Outlet } from "react-router-dom";

/**
 * AuthenticationLayout Component
 * Creates a full-screen layout for authentication pages:
 * - Centers content vertically and horizontally
 * - Adds a semi-transparent background image
 * - Prevents scrolling to maintain clean appearance
 */
const AuthenticationLayout = () => {
  return (
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center relative">
      {/* Background Image with Opacity */}
      <img
        src="/assets/img/bg.png"
        className="absolute w-full h-full object-cover opacity-20"
        alt=""
      />

      {/* Authentication Form Content */}
      <Outlet />
    </div>
  );
};

export default AuthenticationLayout;
