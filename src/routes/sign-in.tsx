/**
 * Sign In Route Component
 * Handles user authentication using Clerk's SignIn component
 * Provides a secure and customizable sign-in experience
 */

import { SignIn } from "@clerk/clerk-react";

/**
 * SignInPage Component
 * Renders the Clerk SignIn component with custom path configuration
 */
export const SignInPage = () => {
  return <SignIn path="/signin" />;
};
