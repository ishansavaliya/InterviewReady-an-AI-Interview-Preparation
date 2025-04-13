/**
 * Education Component
 * Manages educational background entries in the resume
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResumeContext } from "../context/ResumeContext";
import { Trash2, Plus } from "lucide-react";

interface EducationProps {
  onPrevious: () => void;
  onNext: () => void;
}

// Empty education entry template
const emptyEducation = {
  degree: "",
  institution: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
  grade: "",
  percentage: "",
  percentileRank: "",
};

export const Education = ({ onPrevious, onNext }: EducationProps) => {
  const { resumeData, addEducation, updateEducation, removeEducation } =
    useResumeContext();

  const { education } = resumeData;
  const [newEntry, setNewEntry] = useState(emptyEducation);
  const [editing, setEditing] = useState(false);

  // Handle input changes for new entry
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new education entry
  const handleAddEducation = () => {
    addEducation(newEntry);
    setNewEntry(emptyEducation);
    setEditing(false);
  };

  // Update an existing education entry
  const handleUpdateEducation = (
    id: string,
    field: string,
    value: string | boolean
  ) => {
    updateEducation(id, { [field]: value });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Education</h2>
      <p className="text-gray-500 mb-6">Add your educational background.</p>

      {/* Existing education entries */}
      {education.length > 0 && (
        <div className="mb-6 space-y-6">
          {education.map((edu) => (
            <div key={edu.id} className="border p-4 rounded-md relative">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 text-gray-400 hover:text-red-500"
                onClick={() => removeEducation(edu.id)}
              >
                <Trash2 size={18} />
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                  <Input
                    id={`degree-${edu.id}`}
                    value={edu.degree}
                    onChange={(e) =>
                      handleUpdateEducation(edu.id, "degree", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                  <Input
                    id={`institution-${edu.id}`}
                    value={edu.institution}
                    onChange={(e) =>
                      handleUpdateEducation(
                        edu.id,
                        "institution",
                        e.target.value
                      )
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="mb-4">
                <Label htmlFor={`location-${edu.id}`}>Location</Label>
                <Input
                  id={`location-${edu.id}`}
                  value={edu.location}
                  onChange={(e) =>
                    handleUpdateEducation(edu.id, "location", e.target.value)
                  }
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label htmlFor={`grade-${edu.id}`}>Grade</Label>
                  <Input
                    id={`grade-${edu.id}`}
                    value={edu.grade || ""}
                    onChange={(e) =>
                      handleUpdateEducation(edu.id, "grade", e.target.value)
                    }
                    className="mt-1"
                    placeholder="e.g., A, B+"
                  />
                </div>
                <div>
                  <Label htmlFor={`percentage-${edu.id}`}>Percentage</Label>
                  <Input
                    id={`percentage-${edu.id}`}
                    value={edu.percentage || ""}
                    onChange={(e) =>
                      handleUpdateEducation(
                        edu.id,
                        "percentage",
                        e.target.value
                      )
                    }
                    className="mt-1"
                    placeholder="e.g., 85%"
                  />
                </div>
                <div>
                  <Label htmlFor={`percentileRank-${edu.id}`}>Percentile</Label>
                  <Input
                    id={`percentileRank-${edu.id}`}
                    value={edu.percentileRank || ""}
                    onChange={(e) =>
                      handleUpdateEducation(
                        edu.id,
                        "percentileRank",
                        e.target.value
                      )
                    }
                    className="mt-1"
                    placeholder="e.g., 95th"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form for adding new education */}
      {editing ? (
        <div className="border p-4 rounded-md mb-6">
          <h3 className="font-medium mb-4">Add new education</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                name="degree"
                value={newEntry.degree}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="institution">Institution</Label>
              <Input
                id="institution"
                name="institution"
                value={newEntry.institution}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="grade">Grade</Label>
              <Input
                id="grade"
                name="grade"
                value={newEntry.grade}
                onChange={handleChange}
                className="mt-1"
                placeholder="e.g., A, B+"
              />
            </div>
            <div>
              <Label htmlFor="percentage">Percentage</Label>
              <Input
                id="percentage"
                name="percentage"
                value={newEntry.percentage}
                onChange={handleChange}
                className="mt-1"
                placeholder="e.g., 85%"
              />
            </div>
            <div>
              <Label htmlFor="percentileRank">Percentile</Label>
              <Input
                id="percentileRank"
                name="percentileRank"
                value={newEntry.percentileRank}
                onChange={handleChange}
                className="mt-1"
                placeholder="e.g., 95th"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEditing(false);
                setNewEntry(emptyEducation);
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAddEducation}
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
          <span>Add Education</span>
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
