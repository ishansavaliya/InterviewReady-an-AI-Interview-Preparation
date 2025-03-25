/**
 * Coming Soon Component
 * Placeholder page for features or sections under development
 * Provides a user-friendly message and navigation back to home
 */

import { Container } from "./container";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

/**
 * ComingSoon Component
 * Displays a "coming soon" message with:
 * - Large heading
 * - Descriptive text
 * - Navigation button to home page
 */
export const ComingSoon = () => {
  return (
    <Container className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        {/* Main Heading */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">Coming Soon</h1>

        {/* Description Text */}
        <p className="text-xl text-gray-600 mb-8">
          We're working hard to bring you something amazing. Stay tuned!
        </p>

        {/* Navigation Button */}
        <Link to="/">
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
            Back to Home
          </Button>
        </Link>
      </div>
    </Container>
  );
};
