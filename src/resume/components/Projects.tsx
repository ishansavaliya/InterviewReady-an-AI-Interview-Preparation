/**
 * Projects Component
 * Manages project entries in the resume
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeContext } from "../context/ResumeContext";
import { Trash2, Plus, Github, Globe } from "lucide-react";

interface ProjectsProps {
  onPrevious: () => void;
  onNext: () => void;
}

// Empty project entry template
const emptyProject = {
  title: "",
  description: "",
  technologies: "",
  githubUrl: "",
  liveUrl: "",
  startDate: "",
  endDate: "",
  current: false,
};

export const Projects = ({ onPrevious, onNext }: ProjectsProps) => {
  const { resumeData, addProject, updateProject, removeProject } =
    useResumeContext();

  const { projects } = resumeData;
  const [newEntry, setNewEntry] = useState(emptyProject);
  const [editing, setEditing] = useState(false);

  // Handle input changes for new entry
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkbox change for "current project"
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEntry((prev) => ({ ...prev, current: e.target.checked }));
  };

  // Add a new project entry
  const handleAddProject = () => {
    // Validate that required fields are filled
    if (!newEntry.title.trim()) {
      alert("Please enter a project title");
      return;
    }

    // Add to context directly
    addProject(newEntry);

    // Reset form
    setNewEntry(emptyProject);
    setEditing(false);
  };

  // Update an existing project entry
  const handleUpdateProject = (
    id: string,
    field: string,
    value: string | boolean
  ) => {
    updateProject(id, { [field]: value });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Projects</h2>
      <p className="text-gray-500 mb-6">
        Add your notable projects to showcase your practical skills and
        achievements.
      </p>

      {/* Existing project entries */}
      {projects.length > 0 && (
        <div className="mb-6 space-y-6">
          {projects.map((project) => (
            <div key={project.id} className="border p-4 rounded-md relative">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 text-gray-400 hover:text-red-500"
                onClick={() => removeProject(project.id)}
              >
                <Trash2 size={18} />
              </Button>

              <div className="mb-4">
                <Label htmlFor={`title-${project.id}`}>Project Title</Label>
                <Input
                  id={`title-${project.id}`}
                  value={project.title}
                  onChange={(e) =>
                    handleUpdateProject(project.id, "title", e.target.value)
                  }
                  className="mt-1"
                />
              </div>

              <div className="mb-4">
                <Label htmlFor={`technologies-${project.id}`}>
                  Technologies Used
                </Label>
                <Input
                  id={`technologies-${project.id}`}
                  value={project.technologies}
                  onChange={(e) =>
                    handleUpdateProject(
                      project.id,
                      "technologies",
                      e.target.value
                    )
                  }
                  className="mt-1"
                  placeholder="e.g., React, Node.js, MongoDB"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label
                    htmlFor={`githubUrl-${project.id}`}
                    className="flex items-center gap-1"
                  >
                    <Github size={16} /> GitHub URL
                  </Label>
                  <Input
                    id={`githubUrl-${project.id}`}
                    value={project.githubUrl}
                    onChange={(e) =>
                      handleUpdateProject(
                        project.id,
                        "githubUrl",
                        e.target.value
                      )
                    }
                    className="mt-1"
                    placeholder="https://github.com/username/project"
                  />
                </div>
                <div>
                  <Label
                    htmlFor={`liveUrl-${project.id}`}
                    className="flex items-center gap-1"
                  >
                    <Globe size={16} /> Live Demo URL
                  </Label>
                  <Input
                    id={`liveUrl-${project.id}`}
                    value={project.liveUrl}
                    onChange={(e) =>
                      handleUpdateProject(project.id, "liveUrl", e.target.value)
                    }
                    className="mt-1"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor={`startDate-${project.id}`}>Start Date</Label>
                  <Input
                    id={`startDate-${project.id}`}
                    type="month"
                    value={project.startDate}
                    onChange={(e) =>
                      handleUpdateProject(
                        project.id,
                        "startDate",
                        e.target.value
                      )
                    }
                    className="mt-1"
                  />
                </div>
                {!project.current && (
                  <div>
                    <Label htmlFor={`endDate-${project.id}`}>End Date</Label>
                    <Input
                      id={`endDate-${project.id}`}
                      type="month"
                      value={project.endDate}
                      onChange={(e) =>
                        handleUpdateProject(
                          project.id,
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
                  id={`current-${project.id}`}
                  checked={project.current}
                  onChange={(e) =>
                    handleUpdateProject(project.id, "current", e.target.checked)
                  }
                  className="h-4 w-4 text-emerald-500 rounded border-gray-300 focus:ring-emerald-500"
                />
                <Label htmlFor={`current-${project.id}`} className="ml-2">
                  This is an ongoing project
                </Label>
              </div>

              <div className="mb-4">
                <Label htmlFor={`description-${project.id}`}>Description</Label>
                <Textarea
                  id={`description-${project.id}`}
                  value={project.description}
                  onChange={(e) =>
                    handleUpdateProject(
                      project.id,
                      "description",
                      e.target.value
                    )
                  }
                  className="mt-1"
                  rows={3}
                  placeholder="Describe the project, your role, and key achievements"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form for adding new project */}
      {editing ? (
        <div className="border p-4 rounded-md mb-6">
          <h3 className="font-medium mb-4">Add new project</h3>

          <div className="mb-4">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              name="title"
              value={newEntry.title}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="technologies">Technologies Used</Label>
            <Input
              id="technologies"
              name="technologies"
              value={newEntry.technologies}
              onChange={handleChange}
              className="mt-1"
              placeholder="e.g., React, Node.js, MongoDB"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="githubUrl" className="flex items-center gap-1">
                <Github size={16} /> GitHub URL
              </Label>
              <Input
                id="githubUrl"
                name="githubUrl"
                value={newEntry.githubUrl}
                onChange={handleChange}
                className="mt-1"
                placeholder="https://github.com/username/project"
              />
            </div>
            <div>
              <Label htmlFor="liveUrl" className="flex items-center gap-1">
                <Globe size={16} /> Live Demo URL
              </Label>
              <Input
                id="liveUrl"
                name="liveUrl"
                value={newEntry.liveUrl}
                onChange={handleChange}
                className="mt-1"
                placeholder="https://example.com"
              />
            </div>
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
              This is an ongoing project
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
              placeholder="Describe the project, your role, and key achievements"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEditing(false);
                setNewEntry(emptyProject);
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAddProject}
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
          <span>Add Project</span>
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
