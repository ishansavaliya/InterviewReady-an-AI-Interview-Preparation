/**
 * PersonalInfo Component
 * Collects basic personal and contact information for the resume
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResumeContext } from "../context/ResumeContext";
import { Plus, Trash2, Linkedin, Github, Globe } from "lucide-react";

interface PersonalInfoProps {
  onNext: () => void;
}

// Empty link template
const emptyLink = {
  label: "",
  url: "",
};

export const PersonalInfo = ({ onNext }: PersonalInfoProps) => {
  const {
    resumeData,
    updatePersonalInfo,
    addPersonalLink,
    updatePersonalLink,
    removePersonalLink,
  } = useResumeContext();
  const { personalInfo } = resumeData;

  const [photo, setPhoto] = useState<File | null>(null);
  const [newLink, setNewLink] = useState(emptyLink);
  const [addingLink, setAddingLink] = useState(false);

  // Handle photo upload
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPhoto(file);

      // Create a data URL for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle photo removal
  const handleRemovePhoto = () => {
    setPhoto(null);
    updatePersonalInfo({ photo: null });
  };

  // Handle all input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  // Handle new link input changes
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLink((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new custom link
  const handleAddLink = () => {
    if (newLink.label && newLink.url) {
      addPersonalLink(newLink);
      setNewLink(emptyLink);
      setAddingLink(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Personal info</h2>
      <p className="text-gray-500 mb-6">Tell us about yourself.</p>

      {/* Photo upload section */}
      <div className="mb-6">
        <Label htmlFor="photo">Your photo</Label>
        <div className="mt-2 flex items-center gap-4">
          <div className="relative">
            <Input
              id="photo"
              type="file"
              className="sr-only"
              onChange={handlePhotoChange}
              accept="image/*"
            />
            <Label
              htmlFor="photo"
              className="cursor-pointer inline-block px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Choose File
            </Label>
            <span className="ml-2 text-sm text-gray-500">
              {photo ? photo.name : "No file chosen"}
            </span>
          </div>
          {personalInfo.photo && (
            <Button type="button" variant="outline" onClick={handleRemovePhoto}>
              Remove
            </Button>
          )}
        </div>
      </div>

      {/* Name fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={personalInfo.firstName}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={personalInfo.lastName}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
      </div>

      {/* Job title field */}
      <div className="mb-4">
        <Label htmlFor="jobTitle">Job title</Label>
        <Input
          id="jobTitle"
          name="jobTitle"
          value={personalInfo.jobTitle}
          onChange={handleChange}
          className="mt-1"
        />
      </div>

      {/* Location fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={personalInfo.city}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            name="country"
            value={personalInfo.country}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
      </div>

      {/* Contact fields */}
      <div className="mb-4">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          value={personalInfo.phone}
          onChange={handleChange}
          className="mt-1"
        />
      </div>

      <div className="mb-6">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={personalInfo.email}
          onChange={handleChange}
          className="mt-1"
        />
      </div>

      {/* Social Media Section */}
      <h3 className="text-lg font-medium mb-3">Social Media & Links</h3>

      <div className="mb-4">
        <Label htmlFor="linkedin" className="flex items-center gap-1">
          <Linkedin size={16} /> LinkedIn Profile
        </Label>
        <Input
          id="linkedin"
          name="linkedin"
          type="url"
          value={personalInfo.linkedin}
          onChange={handleChange}
          className="mt-1"
          placeholder="https://linkedin.com/in/username"
        />
      </div>

      <div className="mb-4">
        <Label htmlFor="github" className="flex items-center gap-1">
          <Github size={16} /> GitHub Profile
        </Label>
        <Input
          id="github"
          name="github"
          type="url"
          value={personalInfo.github}
          onChange={handleChange}
          className="mt-1"
          placeholder="https://github.com/username"
        />
      </div>

      <div className="mb-6">
        <Label htmlFor="website" className="flex items-center gap-1">
          <Globe size={16} /> Personal Website
        </Label>
        <Input
          id="website"
          name="website"
          type="url"
          value={personalInfo.website}
          onChange={handleChange}
          className="mt-1"
          placeholder="https://yourwebsite.com"
        />
      </div>

      {/* Additional links section */}
      {personalInfo.additionalLinks.length > 0 && (
        <div className="mb-4">
          <Label>Additional Links</Label>
          <div className="space-y-3 mt-2">
            {personalInfo.additionalLinks.map((link) => (
              <div key={link.id} className="flex items-center gap-2">
                <Input
                  value={link.label}
                  onChange={(e) =>
                    updatePersonalLink(link.id, { label: e.target.value })
                  }
                  placeholder="Link Label"
                  className="flex-1"
                />
                <Input
                  value={link.url}
                  onChange={(e) =>
                    updatePersonalLink(link.id, { url: e.target.value })
                  }
                  placeholder="https://example.com"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removePersonalLink(link.id)}
                  className="text-red-500"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {addingLink ? (
        <div className="mb-6 border p-3 rounded-md">
          <div className="flex items-center gap-2 mb-3">
            <Input
              name="label"
              value={newLink.label}
              onChange={handleLinkChange}
              placeholder="Link Label (e.g., Portfolio)"
              className="flex-1"
            />
            <Input
              name="url"
              value={newLink.url}
              onChange={handleLinkChange}
              placeholder="https://example.com"
              className="flex-1"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setAddingLink(false);
                setNewLink(emptyLink);
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleAddLink}
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              Add
            </Button>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setAddingLink(true)}
          className="mb-6 flex items-center gap-1"
        >
          <Plus size={16} />
          <span>Add Custom Link</span>
        </Button>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-end">
        <Button
          onClick={onNext}
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
