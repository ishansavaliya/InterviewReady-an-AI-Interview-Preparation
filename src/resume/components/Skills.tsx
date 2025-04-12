/**
 * Skills Component
 * Manages skills and proficiency levels in the resume
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Remove the Slider import until it's installed
// import { Slider } from "@/components/ui/slider";
import { useResumeContext } from "../context/ResumeContext";
import { Trash2, Plus } from "lucide-react";

interface SkillsProps {
  onPrevious: () => void;
  onNext: () => void;
}

// Empty skill entry template
const emptySkill = {
  name: "",
  level: 3,
};

export const Skills = ({ onPrevious, onNext }: SkillsProps) => {
  const { resumeData, addSkill, updateSkill, removeSkill } = useResumeContext();

  const { skills } = resumeData;
  const [newSkill, setNewSkill] = useState(emptySkill);
  const [editing, setEditing] = useState(false);

  // Handle input changes for new skill
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "level") {
      setNewSkill((prev) => ({ ...prev, [name]: parseInt(value, 10) }));
    } else {
      setNewSkill((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Add a new skill
  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      addSkill(newSkill);
      setNewSkill(emptySkill);
      setEditing(false);
    }
  };

  // Get skill level text
  const getSkillLevelText = (level: number) => {
    switch (level) {
      case 1:
        return "Beginner";
      case 2:
        return "Elementary";
      case 3:
        return "Intermediate";
      case 4:
        return "Advanced";
      case 5:
        return "Expert";
      default:
        return "Intermediate";
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Skills</h2>
      <p className="text-gray-500 mb-6">
        Add your key skills and proficiency levels.
      </p>

      {/* Existing skills list */}
      {skills.length > 0 && (
        <div className="mb-6 space-y-4">
          {skills.map((skill) => (
            <div key={skill.id} className="border p-4 rounded-md relative">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 text-gray-400 hover:text-red-500"
                onClick={() => removeSkill(skill.id)}
              >
                <Trash2 size={18} />
              </Button>

              <div className="mb-4">
                <Label htmlFor={`name-${skill.id}`}>Skill</Label>
                <Input
                  id={`name-${skill.id}`}
                  value={skill.name}
                  onChange={(e) =>
                    updateSkill(skill.id, { name: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              <div className="mb-2">
                <div className="flex justify-between mb-1">
                  <Label htmlFor={`level-${skill.id}`}>Proficiency</Label>
                  <span className="text-sm text-gray-500">
                    {getSkillLevelText(skill.level)}
                  </span>
                </div>
                <Input
                  id={`level-${skill.id}`}
                  type="range"
                  min={1}
                  max={5}
                  value={skill.level}
                  onChange={(e) =>
                    updateSkill(skill.id, {
                      level: parseInt(e.target.value, 10),
                    })
                  }
                  className="mt-1"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form for adding new skill */}
      {editing ? (
        <div className="border p-4 rounded-md mb-6">
          <h3 className="font-medium mb-4">Add new skill</h3>

          <div className="mb-4">
            <Label htmlFor="name">Skill</Label>
            <Input
              id="name"
              name="name"
              value={newSkill.name}
              onChange={handleChange}
              className="mt-1"
              placeholder="e.g., JavaScript, Project Management, etc."
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <Label htmlFor="level">Proficiency</Label>
              <span className="text-sm text-gray-500">
                {getSkillLevelText(newSkill.level)}
              </span>
            </div>
            <Input
              id="level"
              name="level"
              type="range"
              min={1}
              max={5}
              value={newSkill.level}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEditing(false);
                setNewSkill(emptySkill);
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAddSkill}
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              Add
            </Button>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          onClick={() => setEditing(true)}
          className="mb-6 flex items-center gap-1"
          variant="outline"
        >
          <Plus size={16} />
          <span>Add Skill</span>
        </Button>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button type="button" onClick={onPrevious} variant="outline">
          Previous
        </Button>
        <Button
          type="button"
          onClick={onNext}
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
