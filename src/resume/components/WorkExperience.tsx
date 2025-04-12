/**
 * WorkExperience Component
 * Manages work history entries in the resume
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
// Remove the Checkbox import until it's installed
// import { Checkbox } from "@/components/ui/checkbox";
import { useResumeContext } from "../context/ResumeContext";
import { Trash2, Plus } from "lucide-react";

interface WorkExperienceProps {
  onPrevious: () => void;
  onNext: () => void;
}

// Empty experience entry template
const emptyExperience = {
  position: "",
  company: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
};

export const WorkExperience = ({ onPrevious, onNext }: WorkExperienceProps) => {
  const {
    resumeData,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
  } = useResumeContext();

  const { workExperience } = resumeData;
  const [newEntry, setNewEntry] = useState(emptyExperience);
  const [editing, setEditing] = useState(false);

  // Handle input changes for new entry
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkbox change for "current position"
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEntry((prev) => ({ ...prev, current: e.target.checked }));
  };

  // Add a new work experience entry
  const handleAddExperience = () => {
    addWorkExperience(newEntry);
    setNewEntry(emptyExperience);
    setEditing(false);
  };

  // Update an existing work experience entry
  const handleUpdateExperience = (
    id: string,
    field: string,
    value: string | boolean
  ) => {
    updateWorkExperience(id, { [field]: value });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Work experience</h2>
      <p className="text-gray-500 mb-6">Add your relevant work history.</p>

      {/* Existing work experience entries */}
      {workExperience.length > 0 && (
        <div className="mb-6 space-y-6">
          {workExperience.map((exp) => (
            <div key={exp.id} className="border p-4 rounded-md relative">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 text-gray-400 hover:text-red-500"
                onClick={() => removeWorkExperience(exp.id)}
              >
                <Trash2 size={18} />
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor={`position-${exp.id}`}>Position</Label>
                  <Input
                    id={`position-${exp.id}`}
                    value={exp.position}
                    onChange={(e) =>
                      handleUpdateExperience(exp.id, "position", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor={`company-${exp.id}`}>Company</Label>
                  <Input
                    id={`company-${exp.id}`}
                    value={exp.company}
                    onChange={(e) =>
                      handleUpdateExperience(exp.id, "company", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="mb-4">
                <Label htmlFor={`location-${exp.id}`}>Location</Label>
                <Input
                  id={`location-${exp.id}`}
                  value={exp.location}
                  onChange={(e) =>
                    handleUpdateExperience(exp.id, "location", e.target.value)
                  }
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                  <Input
                    id={`startDate-${exp.id}`}
                    type="month"
                    value={exp.startDate}
                    onChange={(e) =>
                      handleUpdateExperience(
                        exp.id,
                        "startDate",
                        e.target.value
                      )
                    }
                    className="mt-1"
                  />
                </div>
                {!exp.current && (
                  <div>
                    <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                    <Input
                      id={`endDate-${exp.id}`}
                      type="month"
                      value={exp.endDate}
                      onChange={(e) =>
                        handleUpdateExperience(
                          exp.id,
                          "endDate",
                          e.target.value
                        )
                      }
                      className="mt-1"
                    />
                  </div>
                )}
              </div>

              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onChange={(e) =>
                    handleUpdateExperience(exp.id, "current", e.target.checked)
                  }
                  className="h-4 w-4 text-emerald-500 rounded border-gray-300 focus:ring-emerald-500"
                />
                <Label htmlFor={`current-${exp.id}`} className="ml-2">
                  I currently work here
                </Label>
              </div>

              <div className="mb-4">
                <Label htmlFor={`description-${exp.id}`}>Description</Label>
                <Textarea
                  id={`description-${exp.id}`}
                  value={exp.description}
                  onChange={(e) =>
                    handleUpdateExperience(
                      exp.id,
                      "description",
                      e.target.value
                    )
                  }
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form for adding new experience */}
      {editing ? (
        <div className="border p-4 rounded-md mb-6">
          <h3 className="font-medium mb-4">Add new experience</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                name="position"
                value={newEntry.position}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={newEntry.company}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
          </div>

          <div className="mb-4">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={newEntry.location}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="month"
                value={newEntry.startDate}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            {!newEntry.current && (
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="month"
                  value={newEntry.endDate}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            )}
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="current"
              name="current"
              checked={newEntry.current}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-emerald-500 rounded border-gray-300 focus:ring-emerald-500"
            />
            <Label htmlFor="current" className="ml-2">
              I currently work here
            </Label>
          </div>

          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={newEntry.description}
              onChange={handleChange}
              className="mt-1"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEditing(false);
                setNewEntry(emptyExperience);
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAddExperience}
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
          <span>Add Work Experience</span>
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
