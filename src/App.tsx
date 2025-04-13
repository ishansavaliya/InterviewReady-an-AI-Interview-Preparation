/**
 * Main Application Component
 * This file serves as the root component that handles routing and layout structure
 */

// Import routing dependencies
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import layout components
import { PublicLayout } from "@/layouts/public-layout";
import AuthenticationLayout from "@/layouts/auth-layout";
import ProtectRoutes from "@/layouts/protected-routes";
import { MainLayout } from "@/layouts/main-layout";

// Import page components
import HomePage from "@/routes/home";
import { SignInPage } from "./routes/sign-in";
import { SignUpPage } from "./routes/sign-up";
import { Generate } from "./components/generate";
import { Dashboard } from "./routes/dashboard";
import { CreateEditPage } from "./routes/create-edit-page";
import { MockLoadPage } from "./routes/mock-load-page";
import { MockInterviewPage } from "./routes/mock-interview-page";
import { Feedback } from "./routes/feedback";
import { ComingSoon } from "./components/coming-soon";
import { ResumeBuilder } from "./resume/ResumeBuilder";
import Services from "./routes/services";
import ChatbotPage from "./chatbot";

/**
 * App Component
 * Defines the main routing structure of the application with three main sections:
 * 1. Public routes - Accessible to all users
 * 2. Authentication routes - For sign in and sign up
 * 3. Protected routes - Require authentication
 */
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes Section - Accessible to all users */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/services" element={<Services />} />
        </Route>

        {/* Authentication Routes Section - For user login and registration */}
        <Route element={<AuthenticationLayout />}>
          <Route path="/signin/*" element={<SignInPage />} />
          <Route path="/signup/*" element={<SignUpPage />} />
        </Route>

        {/* Protected Routes Section - Require user authentication */}
        <Route
          element={
            <ProtectRoutes>
              <MainLayout />
            </ProtectRoutes>
          }
        >
          {/* Resume Builder Route */}
          <Route path="/resume" element={<ResumeBuilder />} />

          {/* AI Chatbot Route */}
          <Route path="/chatbot" element={<ChatbotPage />} />

          {/* Interview Generation and Management Routes */}
          <Route element={<Generate />} path="/generate">
            <Route index element={<Dashboard />} />
            <Route path=":interviewId" element={<CreateEditPage />} />
            <Route path="interview/:interviewId" element={<MockLoadPage />} />
            <Route
              path="interview/:interviewId/start"
              element={<MockInterviewPage />}
            />
            <Route path="feedback/:interviewId" element={<Feedback />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
