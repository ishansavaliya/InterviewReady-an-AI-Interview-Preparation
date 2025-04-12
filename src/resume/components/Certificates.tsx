/**
 * Certificates Component
 * Manages certifications and credentials in the resume
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResumeContext } from "../context/ResumeContext";
import { Trash2, Plus, Link as LinkIcon } from "lucide-react";

interface CertificatesProps {
  onPrevious: () => void;
}

// Empty certificate entry template
const emptyCertificate = {
  name: "",
  issuer: "",
  date: "",
  url: "",
};

export const Certificates = ({ onPrevious }: CertificatesProps) => {
  const { resumeData, addCertificate, updateCertificate, removeCertificate } =
    useResumeContext();

  const { certificates } = resumeData;
  const [newEntry, setNewEntry] = useState(emptyCertificate);
  const [editing, setEditing] = useState(false);

  // Handle input changes for new entry
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new certificate
  const handleAddCertificate = () => {
    addCertificate(newEntry);
    setNewEntry(emptyCertificate);
    setEditing(false);
  };

  // Update an existing certificate
  const handleUpdateCertificate = (
    id: string,
    field: string,
    value: string
  ) => {
    updateCertificate(id, { [field]: value });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Certificates</h2>
      <p className="text-gray-500 mb-6">
        Add your professional certifications and credentials to showcase your
        expertise.
      </p>

      {/* Existing certificate entries */}
      {certificates.length > 0 && (
        <div className="mb-6 space-y-4">
          {certificates.map((cert) => (
            <div key={cert.id} className="border p-4 rounded-md relative">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 text-gray-400 hover:text-red-500"
                onClick={() => removeCertificate(cert.id)}
              >
                <Trash2 size={18} />
              </Button>

              <div className="mb-4">
                <Label htmlFor={`name-${cert.id}`}>Certificate Name</Label>
                <Input
                  id={`name-${cert.id}`}
                  value={cert.name}
                  onChange={(e) =>
                    updateCertificate(cert.id, { name: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor={`issuer-${cert.id}`}>
                    Issuing Organization
                  </Label>
                  <Input
                    id={`issuer-${cert.id}`}
                    value={cert.issuer}
                    onChange={(e) =>
                      handleUpdateCertificate(cert.id, "issuer", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor={`date-${cert.id}`}>Issue Date</Label>
                  <Input
                    id={`date-${cert.id}`}
                    type="month"
                    value={cert.date}
                    onChange={(e) =>
                      handleUpdateCertificate(cert.id, "date", e.target.value)
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="mb-4">
                <Label
                  htmlFor={`url-${cert.id}`}
                  className="flex items-center gap-1"
                >
                  <LinkIcon size={16} /> Certificate URL
                </Label>
                <Input
                  id={`url-${cert.id}`}
                  value={cert.url}
                  onChange={(e) =>
                    handleUpdateCertificate(cert.id, "url", e.target.value)
                  }
                  className="mt-1"
                  placeholder="https://example.com/certificate"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Form for adding new certificate */}
      {editing ? (
        <div className="border p-4 rounded-md mb-6">
          <h3 className="font-medium mb-4">Add new certificate</h3>

          <div className="mb-4">
            <Label htmlFor="name">Certificate Name</Label>
            <Input
              id="name"
              name="name"
              value={newEntry.name}
              onChange={handleChange}
              className="mt-1"
              placeholder="e.g., AWS Certified Solutions Architect"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="issuer">Issuing Organization</Label>
              <Input
                id="issuer"
                name="issuer"
                value={newEntry.issuer}
                onChange={handleChange}
                className="mt-1"
                placeholder="e.g., Amazon Web Services"
              />
            </div>
            <div>
              <Label htmlFor="date">Issue Date</Label>
              <Input
                id="date"
                name="date"
                type="month"
                value={newEntry.date}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
          </div>

          <div className="mb-4">
            <Label htmlFor="url" className="flex items-center gap-1">
              <LinkIcon size={16} /> Certificate URL
            </Label>
            <Input
              id="url"
              name="url"
              value={newEntry.url}
              onChange={handleChange}
              className="mt-1"
              placeholder="https://example.com/certificate"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEditing(false);
                setNewEntry(emptyCertificate);
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAddCertificate}
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
          <span>Add Certificate</span>
        </Button>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button type="button" onClick={onPrevious} variant="outline">
          Previous
        </Button>
        <Button
          type="button"
          onClick={() => {
            // Show success message
            alert("Resume completed! You can now download it as PDF or DOCX.");
          }}
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          Finish
        </Button>
      </div>
    </div>
  );
};
