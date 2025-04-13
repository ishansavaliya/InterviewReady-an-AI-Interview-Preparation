import React from "react";
import { Button } from "@/components/ui/button";
import { techRoles, skillCategories } from "../utils/prompts";
import { MapPin, Lightbulb, ChevronDown } from "lucide-react";

interface ChatOptionsProps {
  onRoadmapSelect: (role: string) => void;
  onSkillsSelect: (skill: string) => void;
}

const ChatOptions: React.FC<ChatOptionsProps> = ({
  onRoadmapSelect,
  onSkillsSelect,
}) => {
  const [showRoadmaps, setShowRoadmaps] = React.useState(false);
  const [showSkills, setShowSkills] = React.useState(false);

  return (
    <div className="flex flex-col space-y-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 border-t border-b border-purple-200">
      <div className="flex flex-wrap gap-3 justify-center">
        <Button
          variant="outline"
          className="bg-white hover:bg-purple-100 border-purple-300 text-purple-800 hover:text-purple-900 shadow-sm font-medium gap-2 px-4"
          onClick={() => {
            setShowRoadmaps(!showRoadmaps);
            setShowSkills(false);
          }}
        >
          <MapPin className="h-4 w-4" />
          Career Roadmaps
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              showRoadmaps ? "rotate-180" : ""
            }`}
          />
        </Button>
        <Button
          variant="outline"
          className="bg-white hover:bg-purple-100 border-purple-300 text-purple-800 hover:text-purple-900 shadow-sm font-medium gap-2 px-4"
          onClick={() => {
            setShowSkills(!showSkills);
            setShowRoadmaps(false);
          }}
        >
          <Lightbulb className="h-4 w-4" />
          Skills Assessment
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              showSkills ? "rotate-180" : ""
            }`}
          />
        </Button>
      </div>

      {showRoadmaps && (
        <div className="flex flex-wrap gap-2 justify-center pt-2 animate-in slide-in-from-top-2 duration-300">
          <h3 className="text-sm font-medium w-full mb-2 text-center text-purple-800">
            Select a career path:
          </h3>
          <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
            {techRoles.map((role) => (
              <Button
                key={role}
                variant="outline"
                size="sm"
                className="bg-white text-purple-700 hover:bg-purple-100 border-purple-200 shadow-sm"
                onClick={() => {
                  onRoadmapSelect(role);
                  setShowRoadmaps(false);
                }}
              >
                {role}
              </Button>
            ))}
          </div>
        </div>
      )}

      {showSkills && (
        <div className="flex flex-wrap gap-2 justify-center pt-2 animate-in slide-in-from-top-2 duration-300">
          <h3 className="text-sm font-medium w-full mb-2 text-center text-purple-800">
            Select skills category:
          </h3>
          <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
            {skillCategories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className="bg-white text-purple-700 hover:bg-purple-100 border-purple-200 shadow-sm"
                onClick={() => {
                  onSkillsSelect(category);
                  setShowSkills(false);
                }}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatOptions;
