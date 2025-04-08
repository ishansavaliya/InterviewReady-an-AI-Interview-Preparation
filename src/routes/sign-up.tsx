/**
 * Sign Up Route Component
 * Handles new user registration using Clerk's SignUp component
 * Provides a secure and customizable sign-up experience
 */

import { SignUp } from "@clerk/clerk-react";

/**
 * SignUpPage Component
 * Renders the Clerk SignUp component with custom path configuration
 */
export const SignUpPage = () => {
  return <SignUp path="/signup" />;
};
