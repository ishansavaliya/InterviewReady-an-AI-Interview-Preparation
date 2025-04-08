/**
 * Main Layout Component
 * Primary layout wrapper for authenticated pages
 * Provides a consistent structure with header, main content area, and footer
 */

import { Container } from "@/components/container";
import { Footer } from "@/components/footer";

import Header from "@/components/header";
import { Outlet } from "react-router-dom";

/**
 * MainLayout Component
 * Creates the main application structure:
 * - Full-height layout with flex column
 * - Consistent header and footer
 * - Scrollable main content area
 * - Container for content width control
 */
export const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Main Navigation Header */}
      <Header />

      {/* Main Content Area with Container */}
      <Container className="flex-grow">
        <main className="flex-grow">
          {/* Child Route Content */}
          <Outlet />
        </main>
      </Container>

      {/* Site Footer */}
      <Footer />
    </div>
  );
};
