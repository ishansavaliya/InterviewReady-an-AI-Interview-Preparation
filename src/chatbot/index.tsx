import React from "react";
import ChatInterface from "./components/ChatInterface";
import { Briefcase, GraduationCap, BookOpen, BrainCircuit } from "lucide-react";

const ChatbotPage: React.FC = () => {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold text-purple-800">
            CareerBot{" "}
            <span className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
              AI Powered
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get personalized career advice, learning roadmaps, and skill
            assessments from our AI assistant. Ask about tech careers, required
            skills, or get guidance on your professional development.
          </p>
        </div>

        <div className="h-[700px] border-2 border-purple-200 rounded-lg shadow-lg overflow-hidden">
          <ChatInterface />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          <div className="flex flex-col items-center p-5 bg-purple-50 rounded-lg hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-3">
              <BrainCircuit className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-purple-800">Career Paths</h3>
            <p className="text-sm text-center mt-2">
              Explore different tech career paths and find the right fit for
              your skills and interests
            </p>
          </div>

          <div className="flex flex-col items-center p-5 bg-purple-50 rounded-lg hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-3">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-purple-800">Learning Roadmaps</h3>
            <p className="text-sm text-center mt-2">
              Get step-by-step learning plans tailored to your career goals and
              current skill level
            </p>
          </div>

          <div className="flex flex-col items-center p-5 bg-purple-50 rounded-lg hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-3">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-purple-800">Skill Assessment</h3>
            <p className="text-sm text-center mt-2">
              Identify which technical and soft skills to develop for your
              target career path
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
