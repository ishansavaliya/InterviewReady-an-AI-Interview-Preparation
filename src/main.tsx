/**
 * Application Entry Point
 * This file initializes the React application and sets up the root providers
 */

// Import React core dependencies
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Import authentication provider
import { ClerkProvider } from "@clerk/clerk-react";

// Import application styles and components
import "./index.css";
import App from "./App.tsx";
import { ToasterProvider } from "./provider/toast-provider.tsx";

// Authentication Configuration
// Get the Clerk publishable key from environment variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Validate environment configuration
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

/**
 * Application Root Setup
 * Initialize the React application with necessary providers:
 * - StrictMode for development checks
 * - ClerkProvider for authentication
 * - ToasterProvider for notifications
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/generate">
      <App />
      <ToasterProvider />
    </ClerkProvider>
  </StrictMode>
);
